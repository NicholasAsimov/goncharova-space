import { createHash } from "node:crypto";
import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { createReadStream } from "node:fs";
import { access, copyFile, mkdir, readFile, readdir, stat, writeFile } from "node:fs/promises";
import { basename, dirname, extname, join, relative, resolve } from "node:path";
import { URL } from "node:url";
import { createServer as createViteServer } from "vite";
import {
  reviewAccounts,
  reviewColors,
  reviewMoods,
  reviewMotifs,
  reviewRealms,
  reviewStatuses,
  type AdminState,
  type ApplyPreview,
  type CuratedItem,
  type PendingQueue,
  type PendingQueueItem,
  type QueueItem,
  type ReviewColor,
  type RealmManifest,
  type ReviewAccount,
  type ReviewMediaType,
  type ReviewMood,
  type ReviewMotif,
  type ReviewRealm,
  type UpdateQueuePayload,
} from "../src/shared/admin.ts";

interface MetadataShape {
  post_url?: string;
  post_shortcode?: string;
  url?: string;
  date?: string;
  post_date?: string;
  description?: string;
  caption?: string;
}

const ROOT = process.cwd();
const ARCHIVE_ROOT = join(ROOT, "archive");
const RAW_ROOT = join(ARCHIVE_ROOT, "raw");
const CURATED_ROOT = join(ARCHIVE_ROOT, "curated");
const REVIEW_ROOT = join(ARCHIVE_ROOT, "review");
const MANIFESTS_ROOT = join(ARCHIVE_ROOT, "manifests");
const PENDING_PATH = join(REVIEW_ROOT, "pending.json");
const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);
const VIDEO_EXTENSIONS = new Set([".mp4", ".mov", ".webm"]);
const moodSet = new Set<string>(reviewMoods);
const colorSet = new Set<string>(reviewColors);
const motifSet = new Set<string>(reviewMotifs);

await ensureArchiveState();

const vite = await createViteServer({
  server: { middlewareMode: true, hmr: false },
  appType: "spa",
});

const server = createServer(async (req, res) => {
  const requestUrl = new URL(req.url ?? "/", "http://localhost");

  try {
    if (requestUrl.pathname.startsWith("/api/admin/")) {
      await handleApi(req, res, requestUrl);
      return;
    }

    if (requestUrl.pathname.startsWith("/__archive/")) {
      await serveArchiveFile(res, requestUrl.pathname.replace("/__archive/", ""));
      return;
    }

    vite.middlewares(req, res, async () => {
      const template = await readFile(join(ROOT, "index.html"), "utf8");
      const html = await vite.transformIndexHtml(requestUrl.pathname, template);
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(html);
    });
  } catch (error) {
    vite.ssrFixStacktrace(error as Error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: error instanceof Error ? error.message : String(error) }));
  }
});

const port = Number(process.env.PORT ?? 3000);
const host = process.env.HOST ?? "127.0.0.1";
server.listen(port, host, () => {
  console.log(`admin server listening on http://${host}:${port}`);
});

async function handleApi(req: IncomingMessage, res: ServerResponse, requestUrl: URL) {
  const method = req.method ?? "GET";
  const path = requestUrl.pathname;

  if (method === "GET" && path === "/api/admin/state") {
    return json(res, 200, await buildAdminState());
  }

  if (method === "POST" && path === "/api/admin/import") {
    const imported = await importRawMedia();
    return json(res, 200, { imported, ...(await buildAdminState()) });
  }

  if (method === "PATCH" && path.startsWith("/api/admin/pending/")) {
    const id = decodeURIComponent(path.replace("/api/admin/pending/", ""));
    const payload = await readJsonBody<UpdateQueuePayload>(req);
    await updatePendingItem(id, payload);
    return json(res, 200, await buildAdminState());
  }

  if (method === "POST" && path === "/api/admin/apply-preview") {
    return json(res, 200, await createApplyPreview());
  }

  if (method === "POST" && path === "/api/admin/apply") {
    const result = await applyApprovedItems();
    return json(res, 200, { result, ...(await buildAdminState()) });
  }

  if (method === "GET" && path.startsWith("/api/admin/manifests/")) {
    const realm = decodeURIComponent(path.replace("/api/admin/manifests/", ""));
    if (!reviewRealms.includes(realm as ReviewRealm)) {
      return json(res, 404, { error: `unknown realm ${realm}` });
    }
    return json(res, 200, await readRealmManifest(realm as ReviewRealm));
  }

  return json(res, 404, { error: "not found" });
}

async function buildAdminState(): Promise<AdminState> {
  const pending = await readPendingQueue();
  const manifests = await Promise.all(reviewRealms.map((realm) => readRealmManifest(realm)));
  const sortedQueue = [...pending.items].sort(compareBySourceDateDesc);
  const summary = {
    total: pending.items.length,
    pending: pending.items.filter((item) => item.status === "pending").length,
    approved: pending.items.filter((item) => item.status === "approved").length,
    rejected: pending.items.filter((item) => item.status === "rejected").length,
    skipped: pending.items.filter((item) => item.status === "skipped").length,
    curated: manifests.reduce((sum, manifest) => sum + manifest.items.length, 0),
  };

  return {
    queue: sortedQueue.map(withPreviewUrls),
    manifests,
    summary,
  };
}

async function importRawMedia(): Promise<number> {
  const manifests = await Promise.all(reviewRealms.map((realm) => readRealmManifest(realm)));
  const knownSourcePaths = new Set<string>([
    ...manifests.flatMap((manifest) => manifest.items.map((item) => item.sourcePath)),
  ]);

  const discovered: PendingQueueItem[] = [];
  for (const account of reviewAccounts) {
    const accountDir = join(RAW_ROOT, account);
    try {
      await access(accountDir);
    } catch {
      continue;
    }
    const files = await walk(accountDir);
    for (const filePath of files) {
      if (!isSupportedMedia(filePath)) continue;
      const sourcePath = relative(ROOT, filePath);
      if (knownSourcePaths.has(sourcePath)) continue;
      const metadata = await readMetadataForMedia(filePath);
      if (!metadata) {
        console.warn(`warning: missing metadata for ${sourcePath}`);
        continue;
      }
      discovered.push(await createPendingItem(account, filePath, metadata));
    }
  }

  discovered.sort(compareBySourceDateDesc);
  await writePendingQueue({ items: discovered });

  return discovered.length;
}

async function updatePendingItem(id: string, payload: UpdateQueuePayload): Promise<void> {
  const pending = await readPendingQueue();
  const item = pending.items.find((entry) => entry.id === id);
  if (!item) {
    throw new Error(`pending item ${id} not found`);
  }

  if (payload.note !== undefined) item.note = String(payload.note);
  if (payload.sourceUrl !== undefined) item.sourceUrl = String(payload.sourceUrl);
  if (payload.moods !== undefined) item.moods = sanitizeTags(payload.moods, moodSet) as ReviewMood[];
  if (payload.colors !== undefined) item.colors = sanitizeTags(payload.colors, colorSet) as ReviewColor[];
  if (payload.motifs !== undefined) item.motifs = sanitizeTags(payload.motifs, motifSet) as ReviewMotif[];
  if (payload.selectedRealm !== undefined) {
    if (payload.selectedRealm !== "" && !reviewRealms.includes(payload.selectedRealm as ReviewRealm)) {
      throw new Error(`unsupported realm ${payload.selectedRealm}`);
    }
    item.selectedRealm = (payload.selectedRealm || null) as ReviewRealm | null;
  }
  if (payload.status !== undefined) {
    if (!reviewStatuses.includes(payload.status)) {
      throw new Error(`unsupported status ${payload.status}`);
    }
    item.status = payload.status;
  }
  item.updatedAt = new Date().toISOString();

  await writePendingQueue(pending);
}

async function createApplyPreview(): Promise<ApplyPreview> {
  const pending = await readPendingQueue();
  const approved = pending.items.filter(
    (item): item is PendingQueueItem & { selectedRealm: ReviewRealm } =>
      item.status === "approved" && item.selectedRealm !== null,
  );

  const operations: ApplyPreview["operations"] = [];
  const destinationCache = new Map<string, string>();

  for (const item of approved) {
    const destination = await getUniqueDestination(
      join(CURATED_ROOT, item.selectedRealm),
      basename(item.sourcePath),
      destinationCache,
    );
    operations.push({
      id: item.id,
      realm: item.selectedRealm,
      sourcePath: item.sourcePath,
      destinationPath: relative(ROOT, destination),
    });
  }

  return {
    approvedCount: approved.length,
    operations,
  };
}

async function applyApprovedItems(): Promise<{ applied: number }> {
  const pending = await readPendingQueue();
  const manifests = new Map<ReviewRealm, RealmManifest>();
  for (const realm of reviewRealms) {
    manifests.set(realm, await readRealmManifest(realm));
  }

  const destinationCache = new Map<string, string>();
  const remaining: PendingQueueItem[] = [];
  let applied = 0;

  for (const item of pending.items) {
    if (item.status !== "approved" || !item.selectedRealm) {
      remaining.push(item);
      continue;
    }

    const destination = await getUniqueDestination(
      join(CURATED_ROOT, item.selectedRealm),
      basename(item.sourcePath),
      destinationCache,
    );

    await mkdir(dirname(destination), { recursive: true });
    await copyFile(join(ROOT, item.sourcePath), destination);

    const manifest = manifests.get(item.selectedRealm);
    if (!manifest) {
      throw new Error(`realm manifest ${item.selectedRealm} not loaded`);
    }

    const curatedItem: CuratedItem = {
      id: item.id,
      account: item.account,
      realm: item.selectedRealm,
      sourcePath: item.sourcePath,
      sourceUrl: item.sourceUrl,
      note: item.note,
      moods: item.moods,
      colors: item.colors,
      motifs: item.motifs,
      fileName: basename(destination),
      curatedPath: relative(ROOT, destination),
      createdAt: new Date().toISOString(),
    };

    manifest.items.push(curatedItem);
    applied += 1;
  }

  for (const realm of reviewRealms) {
    const manifest = manifests.get(realm);
    if (manifest) {
      await writeRealmManifest(realm, manifest);
    }
  }

  pending.items = remaining;
  await writePendingQueue(pending);

  return { applied };
}

async function createPendingItem(
  account: ReviewAccount,
  absolutePath: string,
  metadata: MetadataShape,
): Promise<PendingQueueItem> {
  const sourcePath = relative(ROOT, absolutePath);
  const mediaType: ReviewMediaType = VIDEO_EXTENSIONS.has(extname(absolutePath).toLowerCase())
    ? "video"
    : "image";
  const sourceDate = normalizeMetadataDate(metadata.post_date || metadata.date);

  if (!sourceDate) {
    throw new Error(`missing metadata date for ${sourcePath}`);
  }

  return {
    id: createHash("sha1").update(sourcePath).digest("hex").slice(0, 12),
    account,
    sourcePath,
    sourceUrl: metadata.post_url || metadata.url || "",
    sourceDate,
    caption: metadata.description || metadata.caption || "",
    note: "",
    moods: [],
    colors: [],
    motifs: [],
    selectedRealm: null,
    status: "pending",
    mediaType,
    postKey: metadata.post_shortcode || basename(absolutePath, extname(absolutePath)),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

function withPreviewUrls(item: PendingQueueItem): QueueItem {
  return {
    ...item,
    previewUrl: archiveUrl(item.sourcePath),
  };
}

function compareBySourceDateDesc(a: PendingQueueItem, b: PendingQueueItem): number {
  const dateDiff = Date.parse(b.sourceDate) - Date.parse(a.sourceDate);
  if (dateDiff !== 0) return dateDiff;

  const aDir = dirname(a.sourcePath);
  const bDir = dirname(b.sourcePath);
  if (aDir === bDir) {
    const itemDiff = extractFolderItemIndex(a.sourcePath) - extractFolderItemIndex(b.sourcePath);
    if (itemDiff !== 0) return itemDiff;
  }

  return a.sourcePath.localeCompare(b.sourcePath);
}

function extractFolderItemIndex(sourcePath: string): number {
  const name = basename(sourcePath, extname(sourcePath));
  const match = name.match(/_(\d+)$/);
  return match ? Number.parseInt(match[1], 10) : Number.MAX_SAFE_INTEGER;
}

async function readMetadataForMedia(filePath: string): Promise<MetadataShape | null> {
  const metadataPath = `${filePath}.json`;
  try {
    const text = await readFile(metadataPath, "utf8");
    return JSON.parse(text) as MetadataShape;
  } catch {
    return null;
  }
}

function normalizeMetadataDate(value?: string): string {
  if (!value) return "";
  return value.includes("T") ? value : value.replace(" ", "T");
}

async function ensureArchiveState(): Promise<void> {
  await mkdir(RAW_ROOT, { recursive: true });
  await mkdir(CURATED_ROOT, { recursive: true });
  await mkdir(REVIEW_ROOT, { recursive: true });
  await mkdir(MANIFESTS_ROOT, { recursive: true });

  for (const account of reviewAccounts) {
    await mkdir(join(RAW_ROOT, account), { recursive: true });
  }

  for (const realm of reviewRealms) {
    await mkdir(join(CURATED_ROOT, realm), { recursive: true });
    const manifestPath = join(MANIFESTS_ROOT, `${realm}.json`);
    try {
      await access(manifestPath);
    } catch {
      await writeRealmManifest(realm, { realm, items: [] });
    }
  }

  try {
    await access(PENDING_PATH);
  } catch {
    await writePendingQueue({ items: [] });
  }
}

async function readPendingQueue(): Promise<PendingQueue> {
  const text = await readFile(PENDING_PATH, "utf8");
  return JSON.parse(text) as PendingQueue;
}

async function writePendingQueue(data: PendingQueue): Promise<void> {
  await writeFile(PENDING_PATH, JSON.stringify(data, null, 2) + "\n");
}

async function readRealmManifest(realm: ReviewRealm): Promise<RealmManifest> {
  const text = await readFile(join(MANIFESTS_ROOT, `${realm}.json`), "utf8");
  return JSON.parse(text) as RealmManifest;
}

async function writeRealmManifest(realm: ReviewRealm, data: RealmManifest): Promise<void> {
  await writeFile(join(MANIFESTS_ROOT, `${realm}.json`), JSON.stringify(data, null, 2) + "\n");
}

async function walk(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)));
    } else {
      files.push(fullPath);
    }
  }

  return files;
}

function isSupportedMedia(filePath: string): boolean {
  const extension = extname(filePath).toLowerCase();
  return IMAGE_EXTENSIONS.has(extension) || VIDEO_EXTENSIONS.has(extension);
}

async function getUniqueDestination(
  dir: string,
  fileName: string,
  cache: Map<string, string>,
): Promise<string> {
  const cacheKey = `${dir}:${fileName}`;
  const cached = cache.get(cacheKey);
  if (cached) return cached;

  const extension = extname(fileName);
  const base = basename(fileName, extension);
  let candidate = join(dir, fileName);
  let index = 2;

  while (true) {
    try {
      await stat(candidate);
      candidate = join(dir, `${base}-${index}${extension}`);
      index += 1;
    } catch {
      cache.set(cacheKey, candidate);
      return candidate;
    }
  }
}

async function serveArchiveFile(res: ServerResponse, relativeArchivePath: string): Promise<void> {
  const decoded = decodeURIComponent(relativeArchivePath);
  const absolute = resolve(ARCHIVE_ROOT, decoded);
  if (!absolute.startsWith(ARCHIVE_ROOT)) {
    json(res, 403, { error: "forbidden" });
    return;
  }

  try {
    const info = await stat(absolute);
    if (!info.isFile()) throw new Error("not a file");
    res.writeHead(200, { "Content-Type": contentTypeFor(absolute) });
    createReadStream(absolute).pipe(res);
  } catch {
    json(res, 404, { error: "file not found" });
  }
}

function archiveUrl(relativePath: string): string {
  return `/__archive/${relative(ARCHIVE_ROOT, join(ROOT, relativePath)).split("\\").join("/")}`;
}

function contentTypeFor(filePath: string): string {
  const extension = extname(filePath).toLowerCase();
  if (IMAGE_EXTENSIONS.has(extension)) {
    if (extension === ".png") return "image/png";
    if (extension === ".webp") return "image/webp";
    if (extension === ".gif") return "image/gif";
    return "image/jpeg";
  }
  if (extension === ".mp4") return "video/mp4";
  if (extension === ".mov") return "video/quicktime";
  if (extension === ".webm") return "video/webm";
  return "application/octet-stream";
}

async function readJsonBody<T>(req: IncomingMessage): Promise<T> {
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  if (chunks.length === 0) return {} as T;
  return JSON.parse(Buffer.concat(chunks).toString("utf8")) as T;
}

function json<T>(res: ServerResponse, status: number, data: T): void {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(data));
}

function sanitizeTags(values: unknown, allowed: Set<string>): string[] {
  if (!Array.isArray(values)) return [];
  return values.filter((value): value is string => typeof value === "string" && allowed.has(value));
}

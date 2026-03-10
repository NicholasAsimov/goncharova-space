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
  type AdminState,
  type ApproveItemPayload,
  type CuratedItem,
  type HiddenList,
  type HideItemsPayload,
  type RealmManifest,
  type ReviewAccount,
  type ReviewColor,
  type ReviewItem,
  type ReviewMediaType,
  type ReviewMood,
  type ReviewMotif,
  type ReviewRealm,
  type ReviewStatus,
  type UnhideItemPayload,
} from "../src/shared/admin.ts";

interface MetadataShape {
  post_url?: string;
  post_shortcode?: string;
  shortcode?: string;
  url?: string;
  date?: string;
  post_date?: string;
  description?: string;
  caption?: string;
  type?: string;
}

const ROOT = process.cwd();
const ARCHIVE_ROOT = join(ROOT, "archive");
const RAW_ROOT = join(ARCHIVE_ROOT, "raw");
const CURATED_ROOT = join(ARCHIVE_ROOT, "curated");
const REVIEW_ROOT = join(ARCHIVE_ROOT, "review");
const MANIFESTS_ROOT = join(ARCHIVE_ROOT, "manifests");
const HIDDEN_PATH = join(REVIEW_ROOT, "hidden.json");
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

  if (method === "POST" && path === "/api/admin/approve") {
    const payload = await readJsonBody<ApproveItemPayload>(req);
    await approveItem(payload);
    return json(res, 200, await buildAdminState());
  }

  if (method === "POST" && path === "/api/admin/hide") {
    const payload = await readJsonBody<HideItemsPayload>(req);
    await hideItems(payload.sourcePaths ?? []);
    return json(res, 200, await buildAdminState());
  }

  if (method === "POST" && path === "/api/admin/unhide") {
    const payload = await readJsonBody<UnhideItemPayload>(req);
    await unhideItem(payload.sourcePath);
    return json(res, 200, await buildAdminState());
  }

  return json(res, 404, { error: "not found" });
}

async function buildAdminState(): Promise<AdminState> {
  const manifests = await Promise.all(reviewRealms.map((realm) => readRealmManifest(realm)));
  const hidden = await readHiddenList();
  const hiddenSet = new Set(hidden.items);
  const approvedBySource = new Map<string, CuratedItem>();

  for (const manifest of manifests) {
    for (const item of manifest.items) {
      approvedBySource.set(item.sourcePath, item);
    }
  }

  const items: ReviewItem[] = [];

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
      const metadata = await readMetadataForMedia(filePath);
      if (!metadata) {
        console.warn(`warning: missing metadata for ${sourcePath}`);
        continue;
      }

      items.push(createReviewItem(account, filePath, metadata, approvedBySource.get(sourcePath), hiddenSet.has(sourcePath)));
    }
  }

  items.sort(compareReviewItems);

  return {
    items,
    manifests,
    hidden: hidden.items,
    summary: {
      total: items.length,
      available: items.filter((item) => item.status === "available").length,
      approved: items.filter((item) => item.status === "approved").length,
      hidden: items.filter((item) => item.status === "hidden").length,
    },
  };
}

async function approveItem(payload: ApproveItemPayload): Promise<void> {
  if (!reviewRealms.includes(payload.selectedRealm)) {
    throw new Error(`unsupported realm ${payload.selectedRealm}`);
  }

  const sourcePath = payload.sourcePath;
  const absoluteSource = join(ROOT, sourcePath);
  await stat(absoluteSource);

  const manifests = new Map<ReviewRealm, RealmManifest>();
  for (const realm of reviewRealms) {
    manifests.set(realm, await readRealmManifest(realm));
  }

  for (const manifest of manifests.values()) {
    manifest.items = manifest.items.filter((item) => item.sourcePath !== sourcePath);
  }

  const destination = await getUniqueDestination(join(CURATED_ROOT, payload.selectedRealm), basename(sourcePath));
  await mkdir(dirname(destination), { recursive: true });
  await copyFile(absoluteSource, destination);

  const manifest = manifests.get(payload.selectedRealm);
  if (!manifest) {
    throw new Error(`realm manifest ${payload.selectedRealm} not loaded`);
  }

  manifest.items.push({
    id: createHash("sha1").update(sourcePath).digest("hex").slice(0, 12),
    account: inferAccountFromSourcePath(sourcePath),
    realm: payload.selectedRealm,
    sourcePath,
    sourceUrl: payload.sourceUrl,
    note: payload.note,
    moods: sanitizeTags(payload.moods, moodSet) as ReviewMood[],
    colors: sanitizeTags(payload.colors, colorSet) as ReviewColor[],
    motifs: sanitizeTags(payload.motifs, motifSet) as ReviewMotif[],
    fileName: basename(destination),
    curatedPath: relative(ROOT, destination),
    createdAt: new Date().toISOString(),
  });

  for (const realm of reviewRealms) {
    const nextManifest = manifests.get(realm);
    if (nextManifest) await writeRealmManifest(realm, nextManifest);
  }

  const hidden = await readHiddenList();
  hidden.items = hidden.items.filter((item) => item !== sourcePath);
  await writeHiddenList(hidden);
}

async function hideItems(sourcePaths: string[]): Promise<void> {
  const hidden = await readHiddenList();
  const next = new Set(hidden.items);
  const manifests = await Promise.all(reviewRealms.map((realm) => readRealmManifest(realm)));
  const approvedSet = new Set(manifests.flatMap((manifest) => manifest.items.map((item) => item.sourcePath)));

  for (const sourcePath of sourcePaths) {
    if (typeof sourcePath !== "string" || sourcePath === "") continue;
    if (approvedSet.has(sourcePath)) continue;
    next.add(sourcePath);
  }

  await writeHiddenList({ items: [...next].sort() });
}

async function unhideItem(sourcePath: string): Promise<void> {
  const hidden = await readHiddenList();
  hidden.items = hidden.items.filter((item) => item !== sourcePath);
  await writeHiddenList(hidden);
}

function createReviewItem(
  account: ReviewAccount,
  absolutePath: string,
  metadata: MetadataShape,
  curatedItem?: CuratedItem,
  isHidden = false,
): ReviewItem {
  const sourcePath = relative(ROOT, absolutePath);
  const mediaType: ReviewMediaType = VIDEO_EXTENSIONS.has(extname(absolutePath).toLowerCase())
    ? "video"
    : "image";
  const sourceDate = selectMetadataDate(metadata);

  if (!sourceDate) {
    throw new Error(`missing metadata date for ${sourcePath}`);
  }

  let status: ReviewStatus = "available";
  if (curatedItem) status = "approved";
  else if (isHidden) status = "hidden";

  return {
    id: createHash("sha1").update(sourcePath).digest("hex").slice(0, 12),
    account,
    sourcePath,
    sourceUrl: curatedItem?.sourceUrl || metadata.post_url || metadata.url || "",
    sourceDate,
    caption: metadata.description || metadata.caption || "",
    note: curatedItem?.note || "",
    moods: curatedItem?.moods || [],
    colors: curatedItem?.colors || [],
    motifs: curatedItem?.motifs || [],
    realm: curatedItem?.realm || null,
    status,
    mediaType,
    postKey: metadata.shortcode || metadata.post_shortcode || basename(absolutePath, extname(absolutePath)),
    previewUrl: archiveUrl(sourcePath),
    curatedPath: curatedItem?.curatedPath || null,
  };
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
    await access(HIDDEN_PATH);
  } catch {
    await writeHiddenList({ items: [] });
  }
}

async function readHiddenList(): Promise<HiddenList> {
  const text = await readFile(HIDDEN_PATH, "utf8");
  return JSON.parse(text) as HiddenList;
}

async function writeHiddenList(data: HiddenList): Promise<void> {
  await writeFile(HIDDEN_PATH, JSON.stringify({ items: [...new Set(data.items)].sort() }, null, 2) + "\n");
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

async function getUniqueDestination(dir: string, fileName: string): Promise<string> {
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

function inferAccountFromSourcePath(sourcePath: string): ReviewAccount {
  return sourcePath.includes("/visuartist/") ? "visuartist" : "kategonc";
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

function normalizeMetadataDate(value?: string): string {
  if (!value) return "";
  return value.includes("T") ? value : value.replace(" ", "T");
}

function selectMetadataDate(metadata: MetadataShape): string {
  if (metadata.type === "highlight") {
    return normalizeMetadataDate(metadata.date || metadata.post_date);
  }

  return normalizeMetadataDate(metadata.post_date || metadata.date);
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

function compareReviewItems(a: ReviewItem, b: ReviewItem): number {
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

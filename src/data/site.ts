import mirrorMeta from "./realms/mirror/meta";
import orchardMeta from "./realms/orchard/meta";
import playMeta from "./realms/play/meta";
import practiceMeta, { practiceProjects } from "./realms/practice/meta";
import studioMeta from "./realms/studio/meta";
import type { MediaItem, MediaKind, Realm, RealmSlug, Work } from "./schema";

interface CuratedManifestItem {
  id: string;
  account: string;
  realm: "studio" | "orchard" | "mirror" | "practice" | "play";
  sourcePath: string;
  sourceUrl: string;
  note: string;
  moods: string[];
  colors: string[];
  motifs: string[];
  fileName: string;
  curatedPath: string;
  width: number;
  height: number;
  poster?: string;
  createdAt: string;
}

interface CuratedManifest {
  realm: CuratedManifestItem["realm"];
  items: CuratedManifestItem[];
}

const curatedAssetModules = import.meta.glob(
  "../../archive/curated/**/*.{jpg,jpeg,png,webp,gif,mp4,mov,webm}",
  { import: "default" },
) as Record<string, () => Promise<string>>;

const curatedManifestModules = import.meta.glob("../../archive/manifests/*.json", {
  eager: true,
  import: "default",
}) as Record<string, CuratedManifest>;

function assetModulePath(archivePath: string): string {
  return `../../${archivePath}`;
}

const curatedAssetCache = new Map<string, Promise<string>>();

function extensionToMediaKind(fileName: string): MediaKind {
  return /\.(mp4|mov|webm)$/i.test(fileName) ? "video" : "image";
}

function realmTitleCase(slug: RealmSlug): string {
  return slug.charAt(0).toUpperCase() + slug.slice(1);
}

function parseSourceDate(sourcePath: string): string {
  const match = sourcePath.match(/(\d{4})-(\d{2})-(\d{2})/);
  if (!match) return "";

  const [, year, month, day] = match;
  const date = new Date(`${year}-${month}-${day}T00:00:00Z`);

  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

function deriveCuratedTitle(item: CuratedManifestItem): string {
  const motif = item.motifs[0];
  const mood = item.moods[0];
  const sourceDate = parseSourceDate(item.sourcePath);

  if (motif && sourceDate) {
    return `${realmTitleCase(item.realm as RealmSlug)} ${motif} study, ${sourceDate}`;
  }

  if (mood && sourceDate) {
    return `${realmTitleCase(item.realm as RealmSlug)} ${mood} study, ${sourceDate}`;
  }

  return `${realmTitleCase(item.realm as RealmSlug)} study ${item.fileName}`;
}

function deriveCuratedSummary(item: CuratedManifestItem): string {
  if (item.note.trim()) return item.note.trim();

  const fragments = [
    item.moods.length > 0 ? item.moods.join(", ") : "",
    item.colors.length > 0 ? item.colors.join(", ") : "",
    item.motifs.length > 0 ? item.motifs.join(", ") : "",
  ].filter(Boolean);

  if (fragments.length === 0) {
    return `Curated archive piece from Kate's ${item.realm} realm.`;
  }

  return `Curated archive piece shaped by ${fragments.join(" / ")}.`;
}

function deriveCuratedTags(item: CuratedManifestItem): string[] {
  return [...item.moods, ...item.colors, ...item.motifs];
}

function createCuratedMedia(item: CuratedManifestItem): MediaItem {
  return {
    src: item.curatedPath,
    alt: item.note.trim() || deriveCuratedTitle(item),
    kind: extensionToMediaKind(item.fileName),
    width: item.width,
    height: item.height,
    poster: item.poster,
  };
}

function createCuratedWork(item: CuratedManifestItem): Work {
  const media = createCuratedMedia(item);
  const sourceDate = parseSourceDate(item.sourcePath);

  return {
    slug: `${item.realm}-${item.id}`,
    title: deriveCuratedTitle(item),
    year: sourceDate ? sourceDate.slice(-4) : "",
    medium: media.kind === "video" ? "Moving image" : "Curated image",
    summary: deriveCuratedSummary(item),
    tags: deriveCuratedTags(item),
    realmSlug: item.realm as RealmSlug,
    archiveHref: item.sourceUrl,
    media: [media],
  };
}

function getManifest(realm: CuratedManifestItem["realm"]): CuratedManifest {
  const manifestPath = `../../archive/manifests/${realm}.json`;
  const manifest = curatedManifestModules[manifestPath];

  if (!manifest) {
    throw new Error(`missing curated manifest for ${realm}`);
  }

  return manifest;
}

const curatedWorksByRealm: Record<Exclude<RealmSlug, "practice">, Work[]> = {
  studio: getManifest("studio").items.map(createCuratedWork),
  orchard: getManifest("orchard").items.map(createCuratedWork),
  mirror: getManifest("mirror").items.map(createCuratedWork),
  play: getManifest("play").items.map(createCuratedWork),
};

const realms: Realm[] = [
  {
    slug: "studio",
    name: studioMeta.name,
    subtitle: studioMeta.subtitle,
    intro: studioMeta.description,
    coverMedia: curatedWorksByRealm.studio[0]?.media[0] ?? practiceProjects[13].coverImage,
  },
  {
    slug: "orchard",
    name: orchardMeta.name,
    subtitle: orchardMeta.subtitle,
    intro: orchardMeta.description,
    coverMedia: curatedWorksByRealm.orchard[0]?.media[0] ?? practiceProjects[6].coverImage,
  },
  {
    slug: "mirror",
    name: mirrorMeta.name,
    subtitle: mirrorMeta.subtitle,
    intro: mirrorMeta.description,
    coverMedia: curatedWorksByRealm.mirror[0]?.media[0] ?? practiceProjects[0].coverImage,
  },
  {
    slug: "practice",
    name: practiceMeta.name,
    subtitle: practiceMeta.subtitle,
    intro:
      "UX/UI and product thinking as part of the same visual practice. Structure, trust, and interaction live here without losing tenderness.",
    coverMedia: practiceMeta.coverMedia,
  },
  {
    slug: "play",
    name: playMeta.name,
    subtitle: playMeta.subtitle,
    intro: playMeta.description,
    coverMedia: curatedWorksByRealm.play[0]?.media[0] ?? practiceProjects[5].coverImage,
  },
];

const practiceWorks: Work[] = practiceProjects.map((project) => ({
  slug: project.slug,
  title: project.title,
  year: project.year,
  medium: project.medium,
  summary: project.summary,
  tags: project.tags,
  realmSlug: "practice",
  archiveHref: project.archiveHref,
  media: project.media,
  blocks: project.blocks,
}));

const works: Work[] = [
  ...curatedWorksByRealm.studio,
  ...curatedWorksByRealm.orchard,
  ...curatedWorksByRealm.mirror,
  ...practiceWorks,
  ...curatedWorksByRealm.play,
];

export const siteManifest: { realms: Realm[]; works: Work[] } = {
  realms,
  works,
};

export function asset(path: string): string {
  return encodeURI(path);
}

export function isLazyAssetPath(path: string): boolean {
  return path.startsWith("archive/curated/");
}

export function resolveLazyAssetPath(path: string): Promise<string> {
  if (!isLazyAssetPath(path)) {
    return Promise.resolve(asset(path));
  }

  const existing = curatedAssetCache.get(path);
  if (existing) return existing;

  const importer = curatedAssetModules[assetModulePath(path)];
  if (!importer) {
    throw new Error(`missing curated asset import for ${path}`);
  }

  const next = importer().then((resolvedPath) => encodeURI(resolvedPath));
  curatedAssetCache.set(path, next);
  return next;
}

export function getRealms(): Realm[] {
  return siteManifest.realms;
}

export function getRealmBySlug(slug: string): Realm | undefined {
  return siteManifest.realms.find((realm) => realm.slug === slug);
}

export function getWorks(): Work[] {
  return siteManifest.works;
}

export function getWorkBySlug(slug: string): Work | undefined {
  return siteManifest.works.find((work) => work.slug === slug);
}

export function isCaseStudyWork(work: Pick<Work, "realmSlug">): boolean {
  return work.realmSlug === "practice";
}

export function getWorkHref(work: Pick<Work, "slug" | "realmSlug">): string {
  return isCaseStudyWork(work) ? `/case-study/${work.slug}` : `/artworks/${work.slug}`;
}

export function getWorksForRealm(slug: string): Work[] {
  return siteManifest.works.filter(
    (work) =>
      work.realmSlug === slug ||
      work.relatedRealmSlugs?.includes(slug as RealmSlug),
  );
}

export function getRelatedWorks(slug: string): Work[] {
  const work = getWorkBySlug(slug);
  if (!work) return [];

  return siteManifest.works
    .filter((candidate) => candidate.slug !== slug && candidate.realmSlug === work.realmSlug)
    .slice(0, 3);
}

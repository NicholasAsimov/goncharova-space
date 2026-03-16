import type { JSX } from "solid-js";
import type { MediaItem } from "./data/schema";
import {
  asset,
  getRealmBySlug,
  getWorkBySlug,
  getWorksForRealm,
  isCaseStudyWork,
  isLazyAssetPath,
  resolveLazyAssetPath,
} from "./data/site";

export type ManagedRouteKind = "realm" | "work";

type VideoPreloadMode = "poster" | "metadata" | "loadeddata";

interface MediaPreloadTarget {
  media: MediaItem;
  mode?: VideoPreloadMode;
}

export interface ManagedRouteDetails {
  kind: ManagedRouteKind;
  title: string;
  eyebrow: string;
  description: string;
  mediaTargets: MediaPreloadTarget[];
}

const resolvedPathCache = new Map<string, Promise<string>>();
const preloadCache = new Map<string, Promise<void>>();

export function getManagedWorkSlug(path: string): string | null {
  if (path.startsWith("/case-study/")) return path.replace("/case-study/", "");
  if (path.startsWith("/artworks/")) return path.replace("/artworks/", "");
  return null;
}

export function getManagedRouteKind(path: string): ManagedRouteKind | null {
  if (path.startsWith("/realm/")) return "realm";
  if (getManagedWorkSlug(path)) return "work";
  return null;
}

export function getManagedRouteDetails(path: string): ManagedRouteDetails | null {
  if (path.startsWith("/realm/")) {
    const realmSlug = path.replace("/realm/", "");
    const realm = getRealmBySlug(realmSlug);
    if (!realm) return null;

    const works = getWorksForRealm(realmSlug);
    const heroMode: VideoPreloadMode | undefined =
      realm.coverMedia.kind === "video" ? "loadeddata" : undefined;
    const mediaTargets: MediaPreloadTarget[] = [
      { media: realm.coverMedia, mode: heroMode },
      ...works
        .map((work) => work.media[0])
        .filter((media): media is MediaItem => Boolean(media))
        .map((media): MediaPreloadTarget => {
          const mode: VideoPreloadMode | undefined = media.kind === "video" ? "poster" : undefined;
          return { media, mode };
        }),
    ];

    return {
      kind: "realm",
      title: realm.name,
      eyebrow: "Entering realm",
      description: "The wall gathers itself before you enter.",
      mediaTargets,
    };
  }

  const workSlug = getManagedWorkSlug(path);
  if (workSlug) {
    const work = getWorkBySlug(workSlug);
    if (!work) return null;
    const isCaseStudy = isCaseStudyWork(work);

    return {
      kind: "work",
      title: work.title,
      eyebrow: isCaseStudy ? "Opening dossier" : "Entering artwork",
      description: isCaseStudy
        ? "The project opens with context first."
        : "The study steps quietly into view.",
      mediaTargets: work.media.map((media, index) => ({
        media,
        mode:
          media.kind !== "video"
            ? undefined
            : index === 0
              ? "loadeddata"
              : index < 5
                ? "metadata"
                : "poster",
      })),
    };
  }

  return null;
}

export async function preloadManagedRoute(path: string): Promise<void> {
  const details = getManagedRouteDetails(path);
  if (!details) return;

  await runLimited(details.mediaTargets, 6, (target) => preloadMediaTarget(target));
}

export async function resolveMediaAssetPath(path: string): Promise<string> {
  const existing = resolvedPathCache.get(path);
  if (existing) return existing;

  const next = isLazyAssetPath(path) ? resolveLazyAssetPath(path) : Promise.resolve(asset(path));
  resolvedPathCache.set(path, next);
  return next;
}

export function createMediaAspectStyle(media: MediaItem): JSX.CSSProperties {
  return {
    "--asset-ratio": `${media.width} / ${media.height}`,
  };
}

async function preloadMediaTarget(target: MediaPreloadTarget): Promise<void> {
  const media = target.media;
  if (media.kind === "image") {
    const src = await resolveMediaAssetPath(media.src);
    await preloadImage(src);
    return;
  }

  const mode = target.mode ?? "poster";
  const posterSrc = media.poster ? await resolveMediaAssetPath(media.poster) : undefined;

  if (mode === "poster" && posterSrc) {
    await preloadImage(posterSrc);
    return;
  }

  const src = await resolveMediaAssetPath(media.src);
  await preloadVideo(src, mode, posterSrc);
}

function preloadImage(src: string): Promise<void> {
  const key = `image:${src}`;
  const existing = preloadCache.get(key);
  if (existing) return existing;

  const next = new Promise<void>((resolve, reject) => {
    const image = new Image();
    image.decoding = "async";
    image.onload = async () => {
      try {
        if (typeof image.decode === "function") {
          await image.decode();
        }
      } catch {
        // decoding may reject even when the image is usable
      }
      resolve();
    };
    image.onerror = () => reject(new Error(`failed to preload image ${src}`));
    image.src = src;
  }).catch((error) => {
    preloadCache.delete(key);
    throw error;
  });

  preloadCache.set(key, next);
  return next;
}

function preloadVideo(src: string, mode: VideoPreloadMode, posterSrc?: string): Promise<void> {
  const key = `video:${mode}:${src}`;
  const existing = preloadCache.get(key);
  if (existing) return existing;

  const next = new Promise<void>((resolve, reject) => {
    const video = document.createElement("video");
    video.muted = true;
    video.playsInline = true;
    video.preload = mode === "loadeddata" ? "auto" : "metadata";
    if (posterSrc) video.poster = posterSrc;

    const cleanup = () => {
      video.removeAttribute("src");
      video.load();
    };

    const eventName = mode === "loadeddata" ? "loadeddata" : "loadedmetadata";

    video.addEventListener(
      eventName,
      () => {
        cleanup();
        resolve();
      },
      { once: true },
    );

    video.addEventListener(
      "error",
      () => {
        cleanup();
        reject(new Error(`failed to preload video ${src}`));
      },
      { once: true },
    );

    video.src = src;
    video.load();
  }).catch((error) => {
    preloadCache.delete(key);
    throw error;
  });

  preloadCache.set(key, next);
  return next;
}

async function runLimited<T>(items: T[], limit: number, worker: (item: T) => Promise<void>): Promise<void> {
  if (items.length === 0) return;

  let nextIndex = 0;
  const concurrency = Math.min(limit, items.length);
  const workers = Array.from({ length: concurrency }, async () => {
    while (nextIndex < items.length) {
      const current = items[nextIndex];
      nextIndex += 1;
      if (!current) continue;
      await worker(current);
    }
  });

  const results = await Promise.allSettled(workers);
  const rejected = results.find((result): result is PromiseRejectedResult => result.status === "rejected");
  if (rejected) throw rejected.reason;
}

import { execFile as execFileCallback } from "node:child_process";
import { stat } from "node:fs/promises";
import { basename, dirname, extname, join, relative } from "node:path";
import { promisify } from "node:util";

const execFile = promisify(execFileCallback);

const VIDEO_EXTENSIONS = new Set([".mp4", ".mov", ".webm"]);

interface FfprobeStream {
  width?: number;
  height?: number;
}

interface FfprobeResponse {
  streams?: FfprobeStream[];
}

export interface MediaMetadataResult {
  width: number;
  height: number;
  poster?: string;
}

export function isVideoPath(filePath: string): boolean {
  return VIDEO_EXTENSIONS.has(extname(filePath).toLowerCase());
}

export function toPosixPath(path: string): string {
  return path.split("\\").join("/");
}

export function toRootRelativePath(root: string, absolutePath: string): string {
  return toPosixPath(relative(root, absolutePath));
}

export async function probeMedia(filePath: string): Promise<Omit<MediaMetadataResult, "poster">> {
  await stat(filePath);

  const { stdout } = await execFile("ffprobe", [
    "-v",
    "error",
    "-select_streams",
    "v:0",
    "-show_entries",
    "stream=width,height",
    "-of",
    "json",
    filePath,
  ]);

  const parsed = JSON.parse(stdout) as FfprobeResponse;
  const stream = parsed.streams?.[0];
  const width = Number(stream?.width);
  const height = Number(stream?.height);

  if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0) {
    throw new Error(`ffprobe returned invalid dimensions for ${filePath}`);
  }

  return { width, height };
}

export function getVideoPosterPath(filePath: string): string {
  return join(dirname(filePath), `${basename(filePath, extname(filePath))}-poster.jpg`);
}

export async function ensureVideoPoster(
  filePath: string,
  options?: { force?: boolean },
): Promise<string> {
  const posterPath = getVideoPosterPath(filePath);

  if (!options?.force) {
    try {
      await stat(posterPath);
      return posterPath;
    } catch {
      // fall through and generate
    }
  }

  await execFile("ffmpeg", [
    "-y",
    "-v",
    "error",
    "-ss",
    "0.2",
    "-i",
    filePath,
    "-frames:v",
    "1",
    "-q:v",
    "2",
    posterPath,
  ]);

  await stat(posterPath);
  return posterPath;
}

export async function readMediaMetadata(
  root: string,
  filePath: string,
  options?: { forcePoster?: boolean },
): Promise<MediaMetadataResult> {
  const metadata = await probeMedia(filePath);

  if (!isVideoPath(filePath)) {
    return metadata;
  }

  const posterPath = await ensureVideoPoster(filePath, { force: options?.forcePoster });
  return {
    ...metadata,
    poster: toRootRelativePath(root, posterPath),
  };
}

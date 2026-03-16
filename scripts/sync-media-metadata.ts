import { readFile, readdir, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import ts from "typescript";
import { readMediaMetadata } from "./media-metadata.ts";

const ROOT = process.cwd();
const MANIFESTS_ROOT = join(ROOT, "archive", "manifests");
const PRACTICE_ROOT = join(ROOT, "src", "data", "realms", "practice");

interface CuratedManifestItem {
  curatedPath: string;
  width?: number;
  height?: number;
  poster?: string;
}

interface CuratedManifest {
  realm: string;
  items: CuratedManifestItem[];
}

async function main(): Promise<void> {
  await syncCuratedManifests();
  await syncPracticeMetaFiles();
}

async function syncCuratedManifests(): Promise<void> {
  const files = (await readdir(MANIFESTS_ROOT)).filter((file) => file.endsWith(".json"));

  for (const file of files) {
    const manifestPath = join(MANIFESTS_ROOT, file);
    const manifest = JSON.parse(await readFile(manifestPath, "utf8")) as CuratedManifest;

    for (const item of manifest.items) {
      const metadata = await readMediaMetadata(ROOT, resolve(ROOT, item.curatedPath));
      item.width = metadata.width;
      item.height = metadata.height;

      if (metadata.poster) item.poster = metadata.poster;
      else delete item.poster;
    }

    await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  }
}

async function syncPracticeMetaFiles(): Promise<void> {
  const files = await collectPracticeMetaFiles(PRACTICE_ROOT);

  for (const filePath of files) {
    const sourceText = await readFile(filePath, "utf8");
    const importMap = extractAssetImports(sourceText);
    const sourceFile = ts.createSourceFile(filePath, sourceText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
    const replacements: Array<{ start: number; end: number; text: string }> = [];

    const visit = async (node: ts.Node): Promise<void> => {
      if (ts.isObjectLiteralExpression(node)) {
        const srcIdentifier = getSrcIdentifier(node);
        const kind = getKindLiteral(node);

        if (srcIdentifier && kind && importMap.has(srcIdentifier)) {
          const absoluteAssetPath = resolve(dirname(filePath), importMap.get(srcIdentifier)!);
          const metadata = await readMediaMetadata(ROOT, absoluteAssetPath);
          const original = sourceText.slice(node.getStart(sourceFile), node.getEnd());
          const updated = upsertMediaObjectLiteral(original, metadata.width, metadata.height);

          if (updated !== original) {
            replacements.push({
              start: node.getStart(sourceFile),
              end: node.getEnd(),
              text: updated,
            });
          }
        }
      }

      for (const child of node.getChildren(sourceFile)) {
        await visit(child);
      }
    };

    await visit(sourceFile);

    if (replacements.length === 0) continue;

    let nextText = sourceText;
    for (const replacement of replacements.sort((a, b) => b.start - a.start)) {
      nextText = `${nextText.slice(0, replacement.start)}${replacement.text}${nextText.slice(replacement.end)}`;
    }

    await writeFile(filePath, nextText);
  }
}

async function collectPracticeMetaFiles(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await collectPracticeMetaFiles(fullPath)));
      continue;
    }

    if (entry.name !== "meta.ts") continue;
    if (fullPath === join(PRACTICE_ROOT, "meta.ts")) continue;
    files.push(fullPath);
  }

  return files;
}

function extractAssetImports(sourceText: string): Map<string, string> {
  const imports = new Map<string, string>();
  const pattern = /const\s+(\w+)\s*=\s*new URL\("(.+?)",\s*import\.meta\.url\)\.href;/g;

  for (const match of sourceText.matchAll(pattern)) {
    const identifier = match[1];
    const relativePath = match[2];
    if (identifier && relativePath) imports.set(identifier, relativePath);
  }

  return imports;
}

function getSrcIdentifier(node: ts.ObjectLiteralExpression): string | null {
  const property = node.properties.find(
    (item): item is ts.PropertyAssignment =>
      ts.isPropertyAssignment(item) && ts.isIdentifier(item.name) && item.name.text === "src",
  );

  if (!property || !ts.isIdentifier(property.initializer)) return null;
  return property.initializer.text;
}

function getKindLiteral(node: ts.ObjectLiteralExpression): string | null {
  const property = node.properties.find(
    (item): item is ts.PropertyAssignment =>
      ts.isPropertyAssignment(item) && ts.isIdentifier(item.name) && item.name.text === "kind",
  );

  if (!property || !ts.isStringLiteralLike(property.initializer)) return null;
  return property.initializer.text;
}

function upsertMediaObjectLiteral(sourceText: string, width: number, height: number): string {
  let next = upsertNumericProperty(sourceText, "width", width);
  next = upsertNumericProperty(next, "height", height);
  return next;
}

function upsertNumericProperty(sourceText: string, name: string, value: number): string {
  const propertyPattern = new RegExp(`(^|\\n)([ \\t]*)${name}:\\s*\\d+,?`, "m");

  if (propertyPattern.test(sourceText)) {
    return sourceText.replace(propertyPattern, `$1$2${name}: ${value},`);
  }

  if (!sourceText.includes("\n")) {
    return sourceText.replace(/\s*\}$/, `, ${name}: ${value} }`);
  }

  return sourceText.replace(/\n([ \t]*)\}$/, `\n$1  ${name}: ${value},\n$1}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

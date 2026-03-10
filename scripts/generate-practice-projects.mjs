import fs from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();
const sourceRoot = path.join(
  repoRoot,
  "public/resources/notion_portfolio",
);
const projectsDir = path.join(sourceRoot, "Portfolio - Kate/Projects");
const portfolioHtmlPath = path.join(
  sourceRoot,
  "Portfolio - Kate c2d3d511751243d6b7e412fdc51d7be3.html",
);
const csvPath = path.join(
  sourceRoot,
  "Portfolio - Kate/Projects 7629a46583ee40ba942290e8c5fcb985.csv",
);
const outputRoot = path.join(repoRoot, "src/data/realms/practice");

const projectMetadata = {
  "Social Media Projects": {
    year: "2025",
    medium: "branding / campaign visuals",
    title: "Social Media Projects",
  },
  "Spin Records - Vinyl Website": {
    year: "2025",
    medium: "website / editorial commerce",
    title: "Spin Records - Vinyl Website",
  },
  "Finance app": {
    year: "2025",
    medium: "product / mobile UX",
    title: "Finance App",
  },
  CuriVerse: {
    year: "2025",
    medium: "playful product / mobile learning",
    title: "CuriVerse",
  },
  Onsual: {
    year: "2025",
    medium: "digital product / brand restraint",
    title: "Onsual",
  },
  "Firstmovr x Colgate-Palmolive": {
    year: "2025",
    medium: "campaign / AI generation",
    title: "Firstmovr x Colgate-Palmolive",
  },
  "Future Lab Merchandise": {
    year: "2025",
    medium: "brand system / merchandise",
    title: "Future Lab Merchandise",
  },
  "Typographic Poster Designs": {
    year: "2025",
    medium: "graphic / poster studies",
    title: "Typographic Poster Designs",
  },
  "Experimental Poster Design": {
    year: "2025",
    medium: "graphic experiment / image distortion",
    title: "Experimental Poster Design",
  },
  "MoreMoneyMoreLove (Email Newsletter)": {
    year: "2025",
    medium: "email campaign / commerce story",
    title: "MoreMoneyMoreLove",
  },
  "Linn Plakat - event app": {
    year: "2024",
    medium: "event discovery / mobile UX",
    title: "Linn Plakat - Event App",
  },
  "Elara jewellery website": {
    year: "2024",
    medium: "luxury e-commerce / web",
    title: "Elara Jewellery Website",
  },
  "EduFlex-Code8 Hackathon": {
    year: "2024",
    medium: "hackathon product concept",
    title: "EduFlex Code8 Hackathon",
  },
  "The soul codes - Logo": {
    year: "2024",
    medium: "identity / symbolic mark-making",
    title: "The Soul Codes - Logo",
  },
};

function readFile(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function cleanDir(dirPath) {
  if (!fs.existsSync(dirPath)) return;
  for (const entry of fs.readdirSync(dirPath, { withFileTypes: true })) {
    if (entry.name === "meta.ts" || entry.name === "types.ts") continue;
    fs.rmSync(path.join(dirPath, entry.name), { recursive: true, force: true });
  }
}

function decodeHtml(value) {
  return value
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) =>
      String.fromCharCode(parseInt(code, 16)),
    )
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function stripTags(value) {
  return decodeHtml(value.replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeInlineText(value) {
  return decodeHtml(value).replace(/\s+/g, " ");
}

function slugify(value) {
  return value
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .toLowerCase()
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function escapeTs(value) {
  return JSON.stringify(value);
}

function parseCsvTags(csvText) {
  const rows = csvText.replace(/^\uFEFF/, "").trim().split(/\r?\n/);
  const tagMap = new Map();
  for (const row of rows.slice(1)) {
    const match = row.match(/^(.+?),(?:"(.*)"|(.*))$/);
    if (!match) continue;
    const title = match[1];
    const tagsRaw = match[2] ?? match[3] ?? "";
    const tags = tagsRaw
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
    tagMap.set(title, tags);
  }
  return tagMap;
}

function parsePortfolioOrder(html) {
  const matches = [
    ...html.matchAll(
      /<a href="Portfolio%20-%20Kate\/Projects\/([^"]+?\.html)">[\s\S]*?<\/a>/g,
    ),
  ];
  return matches.map((match) => decodeURIComponent(match[1]));
}

function getPageBody(html) {
  const match = html.match(/<div class="page-body">([\s\S]*?)<\/div><\/article>/);
  if (!match) {
    throw new Error("Could not locate .page-body");
  }
  return match[1];
}

function mergeSpan(target, marks) {
  if (marks.bold) target.bold = true;
  if (marks.italic) target.italic = true;
  if (marks.underline) target.underline = true;
  if (marks.code) target.code = true;
  if (marks.href) target.href = marks.href;
}

function pushTextSpan(spans, text, marks) {
  const normalized = normalizeInlineText(text);
  if (!normalized) return;
  const previous = spans[spans.length - 1];
  const sameMarks =
    previous &&
    !previous.break &&
    previous.bold === !!marks.bold &&
    previous.italic === !!marks.italic &&
    previous.underline === !!marks.underline &&
    previous.code === !!marks.code &&
    (previous.href ?? "") === (marks.href ?? "");

  if (sameMarks) {
    previous.text += normalized;
    return;
  }

  const span = { text: normalized };
  mergeSpan(span, marks);
  spans.push(span);
}

function trimRichText(spans) {
  const next = spans.map((span) => ({ ...span }));
  while (next[0]?.text && next[0].text.trim() === "") next.shift();
  while (next[next.length - 1]?.text && next[next.length - 1].text.trim() === "") next.pop();
  if (next[0]?.text) next[0].text = next[0].text.replace(/^\s+/, "");
  if (next[next.length - 1]?.text) {
    next[next.length - 1].text = next[next.length - 1].text.replace(/\s+$/, "");
  }
  return next.filter((span) => span.break || span.text);
}

function parseInlineHtml(fragment, inheritedMarks = {}) {
  const spans = [];
  const tokenRegex = /<\/?[^>]+>|[^<]+/g;
  const stack = [inheritedMarks];

  for (const match of fragment.matchAll(tokenRegex)) {
    const token = match[0];

    if (token.startsWith("</")) {
      if (stack.length > 1) stack.pop();
      continue;
    }

    if (token.startsWith("<")) {
      const tagMatch = token.match(/^<\s*([a-z0-9]+)\b/i);
      const tag = tagMatch?.[1]?.toLowerCase();
      if (!tag) continue;
      if (tag === "br") {
        spans.push({ break: true });
        continue;
      }
      const current = { ...stack[stack.length - 1] };
      if (tag === "strong" || tag === "b") current.bold = true;
      if (tag === "em" || tag === "i") current.italic = true;
      if (tag === "u") current.underline = true;
      if (tag === "code") current.code = true;
      if (tag === "a") {
        const hrefMatch = token.match(/\bhref="([^"]+)"/i);
        if (hrefMatch) current.href = decodeHtml(hrefMatch[1]);
      }
      stack.push(current);
      continue;
    }

    pushTextSpan(spans, token, stack[stack.length - 1]);
  }

  return trimRichText(spans);
}

function richTextToPlainText(spans) {
  return spans
    .map((span) => (span.break ? " " : span.text ?? ""))
    .join("")
    .replace(/\s+/g, " ")
    .trim();
}

function extractBlocks(html, title) {
  const body = getPageBody(html);
  const tokens = [
    ...body.matchAll(/<(h1|h2|h3|p|ul|figure)\b[^>]*>[\s\S]*?<\/\1>|<hr\b[^>]*>/g),
  ];

  const blocks = [];
  let currentHeading = "";

  for (const match of tokens) {
    const token = match[0];
    if (token.startsWith("<hr")) {
      blocks.push({ type: "divider" });
      continue;
    }

    if (token.startsWith("<h1") || token.startsWith("<h2") || token.startsWith("<h3")) {
      const level = Number(token.slice(2, 3));
      const inner = token.replace(/^<h[1-3][^>]*>/, "").replace(/<\/h[1-3]>$/, "");
      const content = parseInlineHtml(inner);
      const heading = richTextToPlainText(content);
      if (!heading) continue;
      currentHeading = heading;
      blocks.push({ type: "heading", level, content });
      continue;
    }

    if (token.startsWith("<p")) {
      const inner = token.replace(/^<p[^>]*>/, "").replace(/<\/p>$/, "");
      const content = parseInlineHtml(inner);
      const text = richTextToPlainText(content);
      if (!text) continue;
      blocks.push({ type: "paragraph", content });
      continue;
    }

    if (token.startsWith("<ul")) {
      const items = [...token.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/g)]
        .map((item) => parseInlineHtml(item[1]))
        .filter((item) => richTextToPlainText(item));
      if (items.length === 0) continue;
      const previous = blocks[blocks.length - 1];
      if (previous?.type === "list") {
        previous.items.push(...items);
      } else {
        blocks.push({ type: "list", items });
      }
      continue;
    }

    if (token.startsWith("<figure")) {
      const link = token.match(/<a href="([^"]+)"/);
      if (!link) continue;
      const href = decodeURIComponent(link[1]);
      if (/^https?:\/\//.test(href)) continue;
      const baseName = path.basename(href, path.extname(href));
      blocks.push({
        type: "image",
        sourceHref: href,
        heading: currentHeading,
        title,
        baseName,
      });
    }
  }

  return blocks;
}

function summarize(blocks, title) {
  const paragraph = blocks.find(
    (block) =>
      block.type === "paragraph" &&
      richTextToPlainText(block.content).length > 30,
  );
  if (paragraph) return richTextToPlainText(paragraph.content);

  const heading = blocks.find((block) => block.type === "heading");
  if (heading) return `${title} case study.`;

  return `${title} case study from Kate's portfolio.`;
}

function makeAltText(title, heading, index) {
  if (index === 1) return `Cover image for ${title}.`;
  if (heading) return `${heading} from ${title}.`;
  return `Case study image ${index} from ${title}.`;
}

function buildFileSlug(raw, fallback, used) {
  const base = slugify(raw) || slugify(fallback) || "image";
  let value = base;
  let suffix = 2;
  while (used.has(value)) {
    value = `${base}-${suffix}`;
    suffix += 1;
  }
  used.add(value);
  return value;
}

function renderBlock(block, importNameByFile) {
  if (block.type === "heading") {
    return `  { type: "heading", level: ${block.level}, content: ${renderRichTextSpans(block.content)} },`;
  }
  if (block.type === "paragraph") {
    return `  { type: "paragraph", content: ${renderRichTextSpans(block.content)} },`;
  }
  if (block.type === "list") {
    const items = block.items.map((item) => renderRichTextSpans(item)).join(", ");
    return `  { type: "list", items: [${items}] },`;
  }
  if (block.type === "divider") {
    return `  { type: "divider" },`;
  }
  if (block.type === "image") {
    return `  { type: "image", media: { src: ${importNameByFile.get(block.outputName)}, alt: ${escapeTs(block.alt)}, kind: "image" } },`;
  }
  throw new Error(`Unhandled block type ${block.type}`);
}

function renderRichTextSpans(spans) {
  const rendered = spans
    .map((span) => {
      const props = [];
      if (span.break) props.push("break: true");
      if (span.text !== undefined) props.push(`text: ${escapeTs(span.text)}`);
      if (span.bold) props.push("bold: true");
      if (span.italic) props.push("italic: true");
      if (span.underline) props.push("underline: true");
      if (span.code) props.push("code: true");
      if (span.href) props.push(`href: ${escapeTs(span.href)}`);
      return `{ ${props.join(", ")} }`;
    })
    .join(", ");
  return `[${rendered}]`;
}

function renderProjectModule(project) {
  const imports = project.assets
    .map(
      (asset, index) =>
        `const image${index + 1} = new URL(${escapeTs(`./${asset.outputName}`)}, import.meta.url).href;`,
    )
    .join("\n");
  const importNameByFile = new Map(
    project.assets.map((asset, index) => [asset.outputName, `image${index + 1}`]),
  );
  const blocks = project.blocks
    .map((block) => renderBlock(block, importNameByFile))
    .join("\n");

  return `import type { PracticeProject } from "../types";

${imports}

const project: PracticeProject = {
  slug: ${escapeTs(project.slug)},
  title: ${escapeTs(project.title)},
  year: ${escapeTs(project.year)},
  medium: ${escapeTs(project.medium)},
  summary: ${escapeTs(project.summary)},
  tags: [${project.tags.map((tag) => escapeTs(tag)).join(", ")}],
  archiveHref: ${escapeTs(project.archiveHref)},
  coverImage: {
    src: image1,
    alt: ${escapeTs(project.assets[0].alt)},
    kind: "image",
  },
  media: [
${project.assets
  .map(
    (asset, index) =>
      `    { src: image${index + 1}, alt: ${escapeTs(asset.alt)}, kind: "image" },`,
  )
  .join("\n")}
  ],
  blocks: [
${blocks}
  ],
};

export default project;
`;
}

function main() {
  const portfolioHtml = readFile(portfolioHtmlPath);
  const orderedFiles = parsePortfolioOrder(portfolioHtml);
  const tagsByTitle = parseCsvTags(readFile(csvPath));

  for (const entry of fs.readdirSync(outputRoot, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    if (entry.name.startsWith(".")) continue;
    cleanDir(path.join(outputRoot, entry.name));
  }

  for (const projectHtmlFile of orderedFiles) {
    const projectHtmlPath = path.join(projectsDir, projectHtmlFile);
    const html = readFile(projectHtmlPath);
    const rawTitle = decodeHtml(
      html.match(/<title>([^<]+)<\/title>/)?.[1] ?? projectHtmlFile,
    );
    const metadata = projectMetadata[rawTitle] ?? {
      year: "2025",
      medium: "case study",
      title: rawTitle,
    };
    const slug = slugify(metadata.title);
    const projectDir = path.join(outputRoot, slug);
    ensureDir(projectDir);

    const blocks = extractBlocks(html, metadata.title);
    const imageBlocks = blocks.filter((block) => block.type === "image");
    if (imageBlocks.length === 0) {
      throw new Error(`No figure images found for ${rawTitle}`);
    }

    const usedFileSlugs = new Set();
    const assets = imageBlocks.map((block, index) => {
      const extension = path.extname(block.sourceHref);
      const semantic =
        index === 0
          ? "cover"
          : block.heading || block.baseName || `image-${index + 1}`;
      const label = buildFileSlug(semantic, block.baseName, usedFileSlugs);
      const outputName = `${String(index + 1).padStart(2, "0")}-${label}${extension}`;
      const sourcePath = path.join(projectsDir, block.sourceHref);
      const targetPath = path.join(projectDir, outputName);
      fs.copyFileSync(sourcePath, targetPath);
      const alt = makeAltText(metadata.title, block.heading, index + 1);
      block.outputName = outputName;
      block.alt = alt;
      return {
        outputName,
        alt,
      };
    });

    const project = {
      slug,
      title: metadata.title,
      year: metadata.year,
      medium: metadata.medium,
      summary: summarize(blocks, metadata.title),
      tags: tagsByTitle.get(rawTitle) ?? [],
      archiveHref: `/resources/notion_portfolio/Portfolio - Kate/Projects/${projectHtmlFile}`,
      assets,
      blocks,
    };

    fs.writeFileSync(
      path.join(projectDir, "meta.ts"),
      renderProjectModule(project),
      "utf8",
    );
  }
}

main();

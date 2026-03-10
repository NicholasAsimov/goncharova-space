import practiceMeta, { practiceProjects } from "./realms/practice/meta";
import type { Realm, RealmSlug, Work } from "./schema";

const realms: Realm[] = [
  {
    slug: "studio",
    name: "Studio",
    subtitle: "drawings, marks, visual studies",
    intro:
      "A room for sketches, posters, symbols, and graphic instincts. This is where line, texture, and mood arrive before they explain themselves.",
    coverMedia: {
      src: "/resources/notion_portfolio/Portfolio - Kate/Projects/The soul codes - Logo/the_soul_codes_mockup_list_(1).png",
      alt: "Logo studies and symbolic forms from Kate's visual studio.",
      kind: "image",
    },
  },
  {
    slug: "orchard",
    name: "Orchard",
    subtitle: "flowers, color, citrus, still life energy",
    intro:
      "Color stories, soft branding, campaign fragments, and objects with warmth. The orchard is where fruit, paper, petals, and graphic rhythm meet.",
    coverMedia: {
      src: "/resources/notion_portfolio/Portfolio - Kate/Projects/Future Lab Merchandise/Curiosity_11zon.png",
      alt: "Colorful merchandise graphic with a warm citrus energy.",
      kind: "image",
    },
  },
  {
    slug: "rooms",
    name: "Rooms",
    subtitle: "atmosphere, objects, editorial spaces",
    intro:
      "Worlds built from interiors, objects, fashion touches, and spatial quiet. These works feel like stepping into light, fabric, shadow, and placement.",
    coverMedia: {
      src: "/resources/notion_portfolio/Portfolio - Kate/Projects/Elara jewellery website/Main_ready.png",
      alt: "Jewellery editorial interface evoking an intimate interior space.",
      kind: "image",
    },
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
    name: "Play",
    subtitle: "experiments, motion, image collisions",
    intro:
      "The experimental corner: AI-assisted campaigns, bolder graphic motion, and image-making that behaves more like improvisation than layout.",
    coverMedia: {
      src: "/resources/notion_portfolio/Portfolio - Kate/Projects/Firstmovr x Colgate-Palmolive/image 3.png",
      alt: "Bright campaign image full of layered digital play.",
      kind: "image",
    },
  },
];

const works: Work[] = practiceProjects.map((project) => ({
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

export const siteManifest: { realms: Realm[]; works: Work[] } = {
  realms,
  works,
};

export function asset(path: string): string {
  return encodeURI(path);
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

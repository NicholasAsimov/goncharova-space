export type RealmSlug =
  | "studio"
  | "orchard"
  | "mirror"
  | "practice"
  | "play";

export type MediaKind = "image" | "video";

export interface MediaItem {
  src: string;
  alt: string;
  kind: MediaKind;
  caption?: string;
}

export interface RichTextSpan {
  text?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  code?: boolean;
  href?: string;
  break?: boolean;
}

export type CaseStudyBlock =
  | {
      type: "heading";
      level: 1 | 2 | 3;
      content: RichTextSpan[];
    }
  | {
      type: "paragraph";
      content: RichTextSpan[];
    }
  | {
      type: "list";
      items: RichTextSpan[][];
    }
  | {
      type: "image";
      media: MediaItem;
    }
  | {
      type: "divider";
    };

export interface Realm {
  slug: RealmSlug;
  name: string;
  subtitle: string;
  intro: string;
  coverMedia: MediaItem;
}

export interface Work {
  slug: string;
  title: string;
  year: string;
  medium: string;
  summary: string;
  tags: string[];
  realmSlug: RealmSlug;
  relatedRealmSlugs?: RealmSlug[];
  archiveHref?: string;
  media: MediaItem[];
  blocks?: CaseStudyBlock[];
}

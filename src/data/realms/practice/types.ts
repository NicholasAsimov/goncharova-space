import type { CaseStudyBlock, MediaItem } from "../../schema";

export interface PracticeProject {
  slug: string;
  title: string;
  year: string;
  medium: string;
  summary: string;
  tags: string[];
  archiveHref?: string;
  coverImage: MediaItem;
  media: MediaItem[];
  blocks: CaseStudyBlock[];
}

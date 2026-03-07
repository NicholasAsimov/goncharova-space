export const reviewAccounts = ["kategonc", "visuartist"] as const;
export const reviewRealms = ["studio", "orchard", "mirror", "practice", "play"] as const;
export const reviewStatuses = ["pending", "approved", "rejected", "skipped"] as const;
export const reviewMediaTypes = ["image", "video"] as const;
export const reviewMoods = [
  "tender",
  "sunlit",
  "golden-hour",
  "sunset",
  "cinematic",
  "dreamy",
  "intimate",
  "playful",
  "still",
  "romantic",
  "melancholic",
  "bold",
] as const;
export const reviewColors = [
  "cream",
  "blush",
  "terracotta",
  "citrus",
  "gold",
  "amber",
  "sky",
  "olive",
  "charcoal",
  "ink",
  "rose",
] as const;
export const reviewMotifs = [
  "flowers",
  "citrus",
  "table",
  "window",
  "mirror",
  "hands",
  "paper",
  "fabric",
  "portrait",
  "street",
  "room",
  "water",
] as const;

export type ReviewAccount = (typeof reviewAccounts)[number];
export type ReviewRealm = (typeof reviewRealms)[number];
export type ReviewStatus = (typeof reviewStatuses)[number];
export type ReviewMediaType = (typeof reviewMediaTypes)[number];
export type ReviewMood = (typeof reviewMoods)[number];
export type ReviewColor = (typeof reviewColors)[number];
export type ReviewMotif = (typeof reviewMotifs)[number];

export interface PendingQueueItem {
  id: string;
  account: ReviewAccount;
  sourcePath: string;
  sourceUrl: string;
  sourceDate: string;
  caption: string;
  note: string;
  moods: ReviewMood[];
  colors: ReviewColor[];
  motifs: ReviewMotif[];
  selectedRealm: ReviewRealm | null;
  status: ReviewStatus;
  mediaType: ReviewMediaType;
  postKey: string;
  createdAt: string;
  updatedAt: string;
}

export interface QueueItem extends PendingQueueItem {
  previewUrl: string;
}

export interface PendingQueue {
  items: PendingQueueItem[];
}

export interface CuratedItem {
  id: string;
  account: ReviewAccount;
  realm: ReviewRealm;
  sourcePath: string;
  sourceUrl: string;
  note: string;
  moods: ReviewMood[];
  colors: ReviewColor[];
  motifs: ReviewMotif[];
  fileName: string;
  curatedPath: string;
  createdAt: string;
}

export interface RealmManifest {
  realm: ReviewRealm;
  items: CuratedItem[];
}

export interface AdminSummary {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  skipped: number;
  curated: number;
}

export interface AdminState {
  queue: QueueItem[];
  manifests: RealmManifest[];
  summary: AdminSummary;
}

export interface ApplyPreviewOperation {
  id: string;
  realm: ReviewRealm;
  sourcePath: string;
  destinationPath: string;
}

export interface ApplyPreview {
  approvedCount: number;
  operations: ApplyPreviewOperation[];
}

export interface UpdateQueuePayload {
  status?: ReviewStatus;
  selectedRealm?: ReviewRealm | "";
  note?: string;
  moods?: ReviewMood[];
  colors?: ReviewColor[];
  motifs?: ReviewMotif[];
  sourceUrl?: string;
}

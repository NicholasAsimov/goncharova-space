import type {
  AdminState,
  ApplyPreview,
  ReviewColor,
  ReviewMood,
  ReviewMotif,
  ReviewRealm,
  ReviewStatus,
} from "./types";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(path, {
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    ...init,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export function fetchAdminState(): Promise<AdminState> {
  return request("/api/admin/state");
}

export function importRawMedia(): Promise<AdminState & { imported: number }> {
  return request("/api/admin/import", { method: "POST" });
}

export function updateQueueItem(
  id: string,
  payload: {
    status?: ReviewStatus;
    selectedRealm?: ReviewRealm | "";
    note?: string;
    moods?: ReviewMood[];
    colors?: ReviewColor[];
    motifs?: ReviewMotif[];
    sourceUrl?: string;
  },
): Promise<AdminState> {
  return request(`/api/admin/pending/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export function fetchApplyPreview(): Promise<ApplyPreview> {
  return request("/api/admin/apply-preview", {
    method: "POST",
  });
}

export function applyApproved(): Promise<{ result: { applied: number } } & AdminState> {
  return request("/api/admin/apply", {
    method: "POST",
  });
}

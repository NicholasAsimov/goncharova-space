import type {
  AdminState,
  ApproveItemPayload,
  HideItemsPayload,
  UnhideItemPayload,
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

export function approveItem(payload: ApproveItemPayload): Promise<AdminState> {
  return request("/api/admin/approve", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function hideItems(payload: HideItemsPayload): Promise<AdminState> {
  return request("/api/admin/hide", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function unhideItem(payload: UnhideItemPayload): Promise<AdminState> {
  return request("/api/admin/unhide", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

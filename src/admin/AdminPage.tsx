import { For, Match, Show, Switch, createEffect, createMemo, createSignal, onMount } from "solid-js";
import { approveItem, fetchAdminState, hideItems, unhideItem } from "./api";
import {
  reviewAccounts,
  reviewColors,
  reviewMoods,
  reviewMotifs,
  type AdminState,
  type ReviewAccount,
  type ReviewColor,
  type ReviewItem,
  type ReviewMood,
  type ReviewMotif,
  type ReviewRealm,
  type ReviewStatus,
} from "./types";
import mirrorMeta from "../data/realms/mirror/meta";
import orchardMeta from "../data/realms/orchard/meta";
import playMeta from "../data/realms/play/meta";
import practiceMeta from "../data/realms/practice/meta";
import studioMeta from "../data/realms/studio/meta";

const realms = [studioMeta, orchardMeta, mirrorMeta, practiceMeta, playMeta] as const;
const allStatuses = ["available", "approved", "hidden"] as const;
const PAGE_SIZE = 60;

function formatDate(value: string) {
  return new Date(value).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function formatShortDate(value: string) {
  return new Date(value).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function toggleValue<T>(current: readonly T[], value: T) {
  return current.includes(value) ? current.filter((entry) => entry !== value) : [...current, value];
}

export default function AdminPage() {
  let gridPane: HTMLDivElement | undefined;

  const [state, setState] = createSignal<AdminState | null>(null);
  const [error, setError] = createSignal("");
  const [loading, setLoading] = createSignal(true);
  const [busyAction, setBusyAction] = createSignal("");
  const [viewMode, setViewMode] = createSignal<"grid" | "detail">("grid");
  const [selectedSourcePath, setSelectedSourcePath] = createSignal("");
  const [selectedPaths, setSelectedPaths] = createSignal<string[]>([]);
  const [visibleStatuses, setVisibleStatuses] = createSignal<ReviewStatus[]>(["available"]);
  const [accountFilter, setAccountFilter] = createSignal<ReviewAccount | "all">("all");
  const [currentPage, setCurrentPage] = createSignal(1);
  const [gridScrollTop, setGridScrollTop] = createSignal(0);
  const [noteDraft, setNoteDraft] = createSignal("");
  const [realmDraft, setRealmDraft] = createSignal<ReviewRealm | "">("");
  const [urlDraft, setUrlDraft] = createSignal("");
  const [moodsDraft, setMoodsDraft] = createSignal<ReviewMood[]>([]);
  const [colorsDraft, setColorsDraft] = createSignal<ReviewColor[]>([]);
  const [motifsDraft, setMotifsDraft] = createSignal<ReviewMotif[]>([]);

  const items = createMemo(() => state()?.items ?? []);
  const selectedPathSet = createMemo(() => new Set(selectedPaths()));
  const filteredItems = createMemo(() =>
    items().filter((item) => {
      if (!visibleStatuses().includes(item.status)) return false;
      if (accountFilter() !== "all" && item.account !== accountFilter()) return false;
      return true;
    }),
  );
  const totalPages = createMemo(() => Math.max(1, Math.ceil(filteredItems().length / PAGE_SIZE)));
  const pagedItems = createMemo(() => {
    const page = Math.min(currentPage(), totalPages());
    const start = (page - 1) * PAGE_SIZE;
    return filteredItems().slice(start, start + PAGE_SIZE);
  });
  const selectedItem = createMemo(() =>
    items().find((item) => item.sourcePath === selectedSourcePath()) ?? null,
  );

  createEffect(() => {
    const maxPage = totalPages();
    setCurrentPage((page) => (page > maxPage ? maxPage : page));
  });

  createEffect(() => {
    const item = selectedItem();
    if (!item) return;
    setNoteDraft(item.note ?? "");
    setRealmDraft(item.realm ?? "");
    setUrlDraft(item.sourceUrl ?? "");
    setMoodsDraft(item.moods ?? []);
    setColorsDraft(item.colors ?? []);
    setMotifsDraft(item.motifs ?? []);
  });

  onMount(async () => {
    await refreshState();
  });

  async function refreshState(nextState?: AdminState) {
    try {
      setLoading(true);
      setError("");
      const resolved = nextState ?? (await fetchAdminState());
      setState(resolved);
      setSelectedPaths((current) =>
        current.filter((sourcePath) =>
          resolved.items.some((item) => item.sourcePath === sourcePath && item.status === "available"),
        ),
      );
      setSelectedSourcePath((current) => {
        if (current && resolved.items.some((item) => item.sourcePath === current)) return current;
        return resolved.items[0]?.sourcePath ?? "";
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }

  async function runAction<T>(label: string, fn: () => Promise<T>) {
    try {
      setBusyAction(label);
      setError("");
      return await fn();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      return undefined;
    } finally {
      setBusyAction("");
    }
  }

  function applyNextState(nextState: AdminState, nextMode: "grid" | "detail" = viewMode()) {
    setState(nextState);
    setSelectedPaths((current) =>
      current.filter((sourcePath) =>
        nextState.items.some((item) => item.sourcePath === sourcePath && item.status === "available"),
      ),
    );
    setSelectedSourcePath((current) => {
      if (current && nextState.items.some((item) => item.sourcePath === current)) return current;
      return nextState.items[0]?.sourcePath ?? "";
    });
    setViewMode(nextMode);
  }

  function openDetail(item: ReviewItem) {
    setGridScrollTop(gridPane?.scrollTop ?? 0);
    setSelectedSourcePath(item.sourcePath);
    setViewMode("detail");
  }

  function backToGrid() {
    setViewMode("grid");
    const nextScrollTop = gridScrollTop();
    window.setTimeout(() => {
      gridPane?.scrollTo({ top: nextScrollTop });
    }, 0);
  }

  function toggleStatusVisibility(status: ReviewStatus) {
    setVisibleStatuses((current) => {
      const next = toggleValue(current, status);
      return next.length === 0 ? [status] : next;
    });
    setCurrentPage(1);
  }

  function showAllStatuses() {
    setVisibleStatuses([...allStatuses]);
    setCurrentPage(1);
  }

  function showDefaultStatuses() {
    setVisibleStatuses(["available"]);
    setCurrentPage(1);
  }

  function toggleSelection(sourcePath: string) {
    setSelectedPaths((current) => toggleValue(current, sourcePath));
  }

  async function handleBulkHide() {
    const sourcePaths = [...selectedPaths()];
    if (sourcePaths.length === 0) return;
    const nextState = await runAction("hide-selected", () =>
      hideItems({ sourcePaths }),
    );
    if (nextState) {
      setSelectedPaths([]);
      applyNextState(nextState, "grid");
    }
  }

  async function handleApprove() {
    const item = selectedItem();
    const realm = realmDraft();
    if (!item || !realm) {
      setError("Choose a realm before approving an item.");
      return;
    }

    const note = noteDraft();
    const moods = [...moodsDraft()];
    const colors = [...colorsDraft()];
    const motifs = [...motifsDraft()];
    const sourceUrl = urlDraft();

    const nextState = await runAction("approve", () =>
      approveItem({
        sourcePath: item.sourcePath,
        selectedRealm: realm,
        note,
        moods,
        colors,
        motifs,
        sourceUrl,
      }),
    );

    if (nextState) {
      applyNextState(nextState, "grid");
      backToGrid();
    }
  }

  async function handleHideCurrent() {
    const item = selectedItem();
    if (!item) return;
    const nextState = await runAction("hide", () =>
      hideItems({ sourcePaths: [item.sourcePath] }),
    );
    if (nextState) {
      applyNextState(nextState, "grid");
      backToGrid();
    }
  }

  async function handleUnhideCurrent() {
    const item = selectedItem();
    if (!item) return;
    const nextState = await runAction("unhide", () =>
      unhideItem({ sourcePath: item.sourcePath }),
    );
    if (nextState) {
      applyNextState(nextState, "grid");
      backToGrid();
    }
  }

  function chooseRealm(realm: ReviewRealm) {
    setRealmDraft(realm);
  }

  function toggleMood(mood: ReviewMood) {
    setMoodsDraft((current) => toggleValue(current, mood));
  }

  function toggleColor(color: ReviewColor) {
    setColorsDraft((current) => toggleValue(current, color));
  }

  function toggleMotif(motif: ReviewMotif) {
    setMotifsDraft((current) => toggleValue(current, motif));
  }

  return (
    <div class={`page admin-page ${viewMode() === "grid" ? "is-grid" : "is-detail"}`}>
      <Show when={error()}>
        <section class="admin-alert">{error()}</section>
      </Show>

      <section class="admin-toolbar">
        <div class="admin-title-block">
          <h1>Archive</h1>
          <p class="admin-toolbar-copy">
            Grid first. Pick the pieces that belong in Kate&apos;s world.
          </p>
        </div>
        <div class="admin-toolbar-status">
          <CompactStat label="Total" value={state()?.summary.total ?? 0} />
          <CompactStat label="Available" value={state()?.summary.available ?? 0} />
          <CompactStat label="Approved" value={state()?.summary.approved ?? 0} />
          <CompactStat label="Hidden" value={state()?.summary.hidden ?? 0} />
        </div>
        <div class="admin-actions">
          <button class="button" onClick={() => void refreshState()} disabled={busyAction() !== "" || loading()}>
            Refresh
          </button>
        </div>
      </section>

      <Show when={!loading()} fallback={<section class="admin-empty">Loading archive...</section>}>
        <Switch>
          <Match when={viewMode() === "grid"}>
            <section class="admin-grid-shell">
              <div class="admin-grid-controls">
                <div class="filter-cluster">
                  <span class="admin-filter-label">Status</span>
                  <div class="filter-chip-row">
                    <button
                      class={`filter-chip ${visibleStatuses().length === allStatuses.length ? "is-selected" : ""}`}
                      onClick={showAllStatuses}
                    >
                      All
                    </button>
                    <For each={allStatuses}>
                      {(status) => (
                        <button
                          class={`filter-chip ${visibleStatuses().includes(status) ? "is-selected" : ""}`}
                          onClick={() => toggleStatusVisibility(status)}
                        >
                          {status}
                        </button>
                      )}
                    </For>
                    <button
                      class={`filter-chip ${visibleStatuses().length === 1 && visibleStatuses()[0] === "available" ? "is-selected" : ""}`}
                      onClick={showDefaultStatuses}
                    >
                      Available only
                    </button>
                  </div>
                </div>

                <div class="filter-cluster">
                  <span class="admin-filter-label">Account</span>
                  <div class="filter-chip-row">
                        <button
                          class={`filter-chip ${accountFilter() === "all" ? "is-selected" : ""}`}
                          onClick={() => {
                            setAccountFilter("all");
                            setCurrentPage(1);
                          }}
                        >
                          All
                        </button>
                    <For each={reviewAccounts}>
                      {(account) => (
                        <button
                          class={`filter-chip ${accountFilter() === account ? "is-selected" : ""}`}
                          onClick={() => {
                            setAccountFilter(account);
                            setCurrentPage(1);
                          }}
                        >
                          {account}
                        </button>
                      )}
                    </For>
                  </div>
                </div>
              </div>

              <Show when={selectedPaths().length > 0}>
                <div class="admin-selection-bar admin-panel">
                  <span>{selectedPaths().length} selected</span>
                  <div class="admin-selection-actions">
                    <button
                      class="button button-dark"
                      onClick={handleBulkHide}
                      disabled={busyAction() !== ""}
                    >
                      Hide selected
                    </button>
                    <button class="button button-ghost" onClick={() => setSelectedPaths([])}>
                      Clear
                    </button>
                  </div>
                </div>
              </Show>

              <Show
                when={filteredItems().length > 0}
                fallback={<div class="admin-empty">No items match the current filters.</div>}
              >
                <div class="admin-pagination">
                  <span>
                    Page {currentPage()} / {totalPages()} · {filteredItems().length} items
                  </span>
                  <div class="admin-pagination-actions">
                    <button
                      class="button button-ghost"
                      onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                      disabled={currentPage() <= 1}
                    >
                      Previous
                    </button>
                    <button
                      class="button button-ghost"
                      onClick={() => setCurrentPage((page) => Math.min(totalPages(), page + 1))}
                      disabled={currentPage() >= totalPages()}
                    >
                      Next
                    </button>
                  </div>
                </div>
                <div class="admin-grid" ref={gridPane}>
                  <For each={pagedItems()}>
                    {(item) => (
                      <div
                        class={`admin-tile status-${item.status} ${selectedPathSet().has(item.sourcePath) ? "is-selected" : ""}`}
                        onClick={() => openDetail(item)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            openDetail(item);
                          }
                        }}
                        role="button"
                        tabindex="0"
                      >
                        <Show when={item.status === "available"}>
                          <button
                            class={`admin-select-toggle ${selectedPathSet().has(item.sourcePath) ? "is-selected" : ""}`}
                            onClick={(event) => {
                              event.stopPropagation();
                              toggleSelection(item.sourcePath);
                            }}
                            aria-label={`Select ${item.postKey}`}
                          >
                            <span class="admin-select-toggle-mark" aria-hidden="true" />
                          </button>
                        </Show>

                        <div class="admin-tile-media">
                          <Switch>
                            <Match when={item.mediaType === "video"}>
                              <video src={item.previewUrl} muted playsinline preload="metadata" />
                            </Match>
                            <Match when={true}>
                              <img src={item.previewUrl} alt={item.postKey} loading="lazy" />
                            </Match>
                          </Switch>
                          <div class="admin-tile-meta">
                            <div class="admin-badge-row">
                              <span class="admin-badge">{item.account}</span>
                              <span class={`admin-badge admin-badge-status status-${item.status}`}>
                                {item.status}
                              </span>
                              <Show when={item.realm}>
                                {(realm) => <span class="admin-badge admin-badge-realm">{realm()}</span>}
                              </Show>
                            </div>
                            <div class="admin-tile-copy">
                              <strong>{item.caption || item.postKey}</strong>
                              <span>{formatShortDate(item.sourceDate)}</span>
                            </div>
                          </div>
                          <Show when={item.mediaType === "video"}>
                            <span class="admin-video-chip">Video</span>
                          </Show>
                        </div>
                      </div>
                    )}
                  </For>
                </div>
              </Show>
            </section>
          </Match>

          <Match when={true}>
            <Show when={selectedItem()} fallback={<div class="admin-empty">Choose an item from the grid.</div>}>
              {(item) => (
                <section class="admin-detail-shell">
                  <div class="admin-detail-toolbar">
                    <button class="button button-ghost" onClick={backToGrid}>
                      Back to grid
                    </button>
                    <div class="admin-detail-toolbar-copy">
                      <strong>{item().postKey}</strong>
                      <span>{item().status}</span>
                    </div>
                  </div>

                  <div class="admin-layout">
                    <div class="admin-panel admin-media-column">
                      <div class="admin-media-frame">
                        <Switch>
                          <Match when={item().mediaType === "video"}>
                            <video src={item().previewUrl} controls playsinline />
                          </Match>
                          <Match when={true}>
                            <img src={item().previewUrl} alt={item().postKey} />
                          </Match>
                        </Switch>
                      </div>
                    </div>

                    <div class="admin-meta-column">
                      <div class="admin-panel admin-meta-panel">
                        <p class="eyebrow">Post details</p>
                        <div class="admin-meta-stack">
                          <MetaLine label="Account" value={item().account} />
                          <MetaLine label="Post key" value={item().postKey} />
                          <MetaLine label="Post date" value={formatDate(item().sourceDate)} />
                          <MetaLine label="Status" value={item().status} />
                        </div>
                      </div>

                      <Show when={item().caption}>
                        <div class="admin-panel admin-caption-panel">
                          <p class="eyebrow">Caption</p>
                          <p class="admin-caption">{item().caption}</p>
                        </div>
                      </Show>

                      <div class="admin-panel admin-caption-panel">
                        <p class="eyebrow">Source path</p>
                        <p class="admin-caption">{item().sourcePath}</p>
                      </div>
                    </div>

                    <div class="admin-actions-column">
                      <div class="admin-panel admin-panel-realms">
                        <p class="eyebrow">Assign realm</p>
                        <div class="realm-pill-grid">
                          <For each={realms}>
                            {(realm) => (
                              <button
                                class={`realm-pill ${realmDraft() === realm.slug ? "is-selected" : ""}`}
                                onClick={() => chooseRealm(realm.slug)}
                              >
                                <strong>{realm.name}</strong>
                                <span>{realm.subtitle}</span>
                              </button>
                            )}
                          </For>
                        </div>
                      </div>

                      <div class="admin-panel admin-panel-editor">
                        <div class="admin-field admin-field-url">
                          <span>Source URL</span>
                          <input value={urlDraft()} onInput={(event) => setUrlDraft(event.currentTarget.value)} />
                        </div>

                        <TagGroup
                          label="Vibes"
                          values={reviewMoods}
                          selected={moodsDraft()}
                          onToggle={toggleMood}
                        />
                        <TagGroup
                          label="Colors"
                          values={reviewColors}
                          selected={colorsDraft()}
                          onToggle={toggleColor}
                        />
                        <TagGroup
                          label="Motifs"
                          values={reviewMotifs}
                          selected={motifsDraft()}
                          onToggle={toggleMotif}
                        />

                        <div class="admin-field admin-field-note">
                          <span>Optional note</span>
                          <textarea
                            value={noteDraft()}
                            onInput={(event) => setNoteDraft(event.currentTarget.value)}
                          />
                        </div>

                        <div class="admin-decision-row">
                          <button
                            class="button button-dark"
                            onClick={() => void handleApprove()}
                            disabled={busyAction() !== "" || realmDraft() === ""}
                          >
                            {item().status === "approved" ? "Save changes" : "Approve"}
                          </button>
                          <Show when={item().status === "hidden"}>
                            <button
                              class="button button-ghost"
                              onClick={() => void handleUnhideCurrent()}
                              disabled={busyAction() !== ""}
                            >
                              Unhide
                            </button>
                          </Show>
                          <Show when={item().status !== "hidden"}>
                            <button
                              class="button button-ghost"
                              onClick={() => void handleHideCurrent()}
                              disabled={busyAction() !== ""}
                            >
                              Hide
                            </button>
                          </Show>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              )}
            </Show>
          </Match>
        </Switch>
      </Show>
    </div>
  );
}

function CompactStat(props: { label: string; value: number }) {
  return (
    <div class="admin-stat-pill">
      <span>{props.label}</span>
      <strong>{props.value}</strong>
    </div>
  );
}

function MetaLine(props: { label: string; value: string }) {
  return (
    <div class="meta-line">
      <span>{props.label}</span>
      <strong>{props.value}</strong>
    </div>
  );
}

function TagGroup<T extends string>(props: {
  label: string;
  values: readonly T[];
  selected: readonly T[];
  onToggle: (value: T) => void;
}) {
  return (
    <div class="tag-group">
      <span class="tag-group-label">{props.label}</span>
      <div class="tag-pill-grid">
        <For each={props.values}>
          {(value) => (
            <button
              class={`tag-pill ${(props.selected ?? []).includes(value) ? "is-selected" : ""}`}
              onClick={() => props.onToggle(value)}
            >
              {value}
            </button>
          )}
        </For>
      </div>
    </div>
  );
}

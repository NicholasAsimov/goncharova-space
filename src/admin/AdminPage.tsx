import { For, Match, Show, Switch, createEffect, createMemo, createSignal, onMount } from "solid-js";
import {
  applyApproved,
  fetchAdminState,
  fetchApplyPreview,
  importRawMedia,
  updateQueueItem,
} from "./api";
import {
  reviewColors,
  reviewMoods,
  reviewMotifs,
  type AdminState,
  type ApplyPreview,
  type QueueItem,
  type ReviewColor,
  type ReviewMood,
  type ReviewMotif,
  type ReviewRealm,
} from "./types";
import mirrorMeta from "../data/realms/mirror/meta";
import orchardMeta from "../data/realms/orchard/meta";
import playMeta from "../data/realms/play/meta";
import practiceMeta from "../data/realms/practice/meta";
import studioMeta from "../data/realms/studio/meta";

const realms = [studioMeta, orchardMeta, mirrorMeta, practiceMeta, playMeta] as const;

function formatDate(value: string) {
  return new Date(value).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function nextReviewIndex(items: QueueItem[], currentId?: string) {
  if (items.length === 0) return 0;

  const pendingIndex = items.findIndex((item) => item.status === "pending");
  if (pendingIndex !== -1) return pendingIndex;

  const currentIndex = items.findIndex((item) => item.id === currentId);
  return currentIndex === -1 ? 0 : currentIndex;
}

export default function AdminPage() {
  const [state, setState] = createSignal<AdminState | null>(null);
  const [error, setError] = createSignal<string>("");
  const [loading, setLoading] = createSignal(true);
  const [currentId, setCurrentId] = createSignal<string>("");
  const [noteDraft, setNoteDraft] = createSignal("");
  const [realmDraft, setRealmDraft] = createSignal<ReviewRealm | "">("");
  const [urlDraft, setUrlDraft] = createSignal("");
  const [moodsDraft, setMoodsDraft] = createSignal<ReviewMood[]>([]);
  const [colorsDraft, setColorsDraft] = createSignal<ReviewColor[]>([]);
  const [motifsDraft, setMotifsDraft] = createSignal<ReviewMotif[]>([]);
  const [preview, setPreview] = createSignal<ApplyPreview | null>(null);
  const [busyAction, setBusyAction] = createSignal("");

  const queue = createMemo(() => state()?.queue ?? []);
  const currentIndex = createMemo(() => nextReviewIndex(queue(), currentId()));
  const currentItem = createMemo(() => queue()[currentIndex()]);
  const stagedItems = createMemo(() => queue().filter((item) => item.status === "approved"));

  createEffect(() => {
    const item = currentItem();
    if (!item) return;
    setCurrentId(item.id);
    setNoteDraft(item.note ?? "");
    setRealmDraft(item.selectedRealm ?? "");
    setUrlDraft(item.sourceUrl);
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
      setCurrentId((current) => resolved.queue.find((item) => item.id === current)?.id ?? resolved.queue[nextReviewIndex(resolved.queue)]?.id ?? "");
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

  function applyNextState(nextState: AdminState) {
    setPreview(null);
    setState(nextState);
    setCurrentId((current) => nextState.queue.find((item) => item.id === current)?.id ?? currentId());
  }

  async function updateCurrent(status: "pending" | "approved" | "rejected" | "skipped") {
    const item = currentItem();
    if (!item) return;
    if (status === "approved" && !realmDraft()) {
      setError("Choose a realm before approving an item.");
      return;
    }

    const payload = {
      status,
      note: noteDraft(),
      sourceUrl: urlDraft(),
      selectedRealm: realmDraft(),
      moods: moodsDraft(),
      colors: colorsDraft(),
      motifs: motifsDraft(),
    };

    const nextState = await runAction(status, () => updateQueueItem(item.id, payload));
    if (nextState) {
      applyNextState(nextState);
    }
  }

  async function handleImport() {
    const nextState = await runAction("import", importRawMedia);
    if (nextState) {
      applyNextState(nextState);
    }
  }

  async function handlePreview() {
    const nextPreview = await runAction("preview", fetchApplyPreview);
    if (nextPreview) setPreview(nextPreview);
  }

  async function handleApply() {
    const nextState = await runAction("apply", applyApproved);
    if (nextState) {
      applyNextState(nextState);
    }
  }

  function moveCursor(delta: number) {
    const items = queue();
    if (items.length === 0) return;
    const next = (currentIndex() + delta + items.length) % items.length;
    setCurrentId(items[next].id);
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
    <div class="page admin-page">
      <Show when={error()}>
        <section class="admin-alert">{error()}</section>
      </Show>

      <Show when={state()} fallback={<section class="admin-empty">Loading admin state...</section>}>
        {(resolved) => (
          <>
            <section class="admin-toolbar">
              <div class="admin-title-block">
                <p class="eyebrow">Review workstation</p>
                <h1>Queue</h1>
                <p class="admin-toolbar-copy">
                  {resolved().summary.pending} pending / {resolved().summary.approved} staged /{" "}
                  {resolved().summary.curated} curated
                </p>
              </div>
              <div class="admin-toolbar-status">
                <CompactStat label="Queue" value={resolved().summary.total} />
                <CompactStat label="Pending" value={resolved().summary.pending} />
                <CompactStat label="Staged" value={resolved().summary.approved} />
                <CompactStat label="Rejected" value={resolved().summary.rejected} />
                <CompactStat label="Skipped" value={resolved().summary.skipped} />
                <CompactStat label="Curated" value={resolved().summary.curated} />
              </div>
              <div class="admin-actions">
                <button class="button" onClick={handleImport} disabled={busyAction() !== ""}>
                  Rebuild from raw
                </button>
                <button class="button" onClick={handlePreview} disabled={stagedItems().length === 0 || busyAction() !== ""}>
                  Preview apply
                </button>
                <button class="button button-dark" onClick={handleApply} disabled={stagedItems().length === 0 || busyAction() !== ""}>
                  Apply approved
                </button>
              </div>
            </section>

            <section class="admin-layout">
              <Show
                when={currentItem()}
                fallback={<div class="admin-empty">No pending media yet. Import raw media to start.</div>}
              >
                {(item) => (
                  <>
                    <div class="admin-panel admin-media-column">
                      <div class="admin-preview-toolbar">
                        <button class="button button-ghost" onClick={() => moveCursor(-1)}>
                          Previous
                        </button>
                        <span>
                          {queue().length === 0 ? "0 / 0" : `${currentIndex() + 1} / ${queue().length}`}
                        </span>
                        <button class="button button-ghost" onClick={() => moveCursor(1)}>
                          Next
                        </button>
                      </div>

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
                          <div class="admin-caption">{item().caption}</div>
                        </div>
                      </Show>
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
                        <label class="admin-field admin-field-url">
                          <span>Source URL</span>
                          <input
                            value={urlDraft()}
                            onInput={(event) => setUrlDraft(event.currentTarget.value)}
                            placeholder="https://www.instagram.com/p/..."
                          />
                        </label>

                        <TagGroup
                          title="Vibes"
                          values={reviewMoods}
                          selected={moodsDraft()}
                          onToggle={toggleMood}
                        />

                        <TagGroup
                          title="Colors"
                          values={reviewColors}
                          selected={colorsDraft()}
                          onToggle={toggleColor}
                        />

                        <TagGroup
                          title="Motifs"
                          values={reviewMotifs}
                          selected={motifsDraft()}
                          onToggle={toggleMotif}
                        />

                        <label class="admin-field admin-field-note">
                          <span>Optional note</span>
                          <textarea
                            rows="3"
                            value={noteDraft()}
                            onInput={(event) => setNoteDraft(event.currentTarget.value)}
                            placeholder="anything the tags miss..."
                          />
                        </label>

                        <div class="admin-decision-row">
                          <button class="button button-dark" onClick={() => updateCurrent("approved")} disabled={!currentItem() || busyAction() !== ""}>
                            Approve to stage
                          </button>
                          <button class="button" onClick={() => updateCurrent("skipped")} disabled={!currentItem() || busyAction() !== ""}>
                            Skip
                          </button>
                          <button class="button" onClick={() => updateCurrent("rejected")} disabled={!currentItem() || busyAction() !== ""}>
                            Reject
                          </button>
                          <button class="button button-ghost" onClick={() => updateCurrent("pending")} disabled={!currentItem() || busyAction() !== ""}>
                            Reset
                          </button>
                        </div>
                      </div>

                      <div class="admin-panel admin-panel-staged">
                        <p class="eyebrow">Staged changes</p>
                        <p class="admin-panel-copy">
                          {stagedItems().length} item{stagedItems().length === 1 ? "" : "s"} waiting to be applied.
                        </p>
                        <Show when={preview()}>
                          {(resolvedPreview) => (
                            <div class="apply-preview-list">
                              <For each={resolvedPreview().operations.slice(0, 8)}>
                                {(operation) => (
                                  <div class="apply-preview-item">
                                    <strong>{operation.realm}</strong>
                                    <span>{operation.destinationPath}</span>
                                  </div>
                                )}
                              </For>
                              <Show when={resolvedPreview().operations.length > 8}>
                                <p class="admin-panel-copy">
                                  +{resolvedPreview().operations.length - 8} more staged operations
                                </p>
                              </Show>
                            </div>
                          )}
                        </Show>
                      </div>
                    </div>
                  </>
                )}
              </Show>
            </section>
          </>
        )}
      </Show>

      <Show when={loading()}>
        <div class="admin-loading">Refreshing admin state...</div>
      </Show>
    </div>
  );
}

function toggleValue<T extends string>(values: T[], value: T): T[] {
  const safeValues = values ?? [];
  return safeValues.includes(value)
    ? safeValues.filter((entry) => entry !== value)
    : [...safeValues, value];
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
  title: string;
  values: readonly T[];
  selected?: T[];
  onToggle: (value: T) => void;
}) {
  const selected = () => props.selected ?? [];

  return (
    <div class="tag-group">
      <span class="tag-group-label">{props.title}</span>
      <div class="tag-pill-grid">
        <For each={props.values}>
          {(value) => (
            <button
              class={`tag-pill ${selected().includes(value) ? "is-selected" : ""}`}
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

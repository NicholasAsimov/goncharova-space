import { A, Route, Router, useLocation, useNavigate, useParams } from "@solidjs/router";
import {
  For,
  Show,
  createContext,
  createEffect,
  createResource,
  createSignal,
  onCleanup,
  onMount,
  useContext,
} from "solid-js";
import type { Accessor, JSX, ParentProps } from "solid-js";
import AdminPage from "./admin/AdminPage";
import type { CaseStudyBlock, MediaItem, RealmSlug, RichTextSpan, Work } from "./data/schema";
import {
  asset,
  getRealmBySlug,
  getRealms,
  getWorkBySlug,
  getWorksForRealm,
  getRelatedWorks,
  isLazyAssetPath,
  siteManifest,
} from "./data/site";
import {
  createMediaAspectStyle,
  getManagedRouteDetails,
  getManagedRouteKind,
  preloadManagedRoute,
  resolveMediaAssetPath,
  type ManagedRouteKind,
} from "./route-media";

type CitrusVariant = "lemon" | "orange";
type TransitionSource = "initial" | "navigate" | "history";

interface MediaRenderOptions {
  class?: string;
  autoplay?: boolean;
  loading?: "eager" | "lazy";
  preload?: "none" | "metadata" | "auto";
}

interface TransitionProfile {
  coverMs: number;
  minMs: number;
  revealMs: number;
}

interface InterludeState {
  token: number;
  variant: CitrusVariant;
  kind: ManagedRouteKind;
  title: string;
  eyebrow: string;
  description: string;
  phase: "covering" | "revealing";
  revealMs: number;
}

type CitrusGlyphKind = "leaf" | "petal" | "blossom";

interface RealmCue {
  label: string;
  value: string;
}

interface RoomWhisper {
  eyebrow: string;
  title: string;
  cues: RealmCue[];
}

const REALM_SENSORY_NOTES: Record<RealmSlug, string[]> = {
  studio: ["graphite dust", "paper grain", "quiet pigment"],
  orchard: ["zest release", "petal hush", "warm table light"],
  mirror: ["soft glow", "private gaze", "silk shadow"],
  practice: ["clear rhythm", "warm systems", "measured light"],
  play: ["spark drift", "elastic motion", "bright collision"],
};

const ROOM_WHISPERS: Record<RealmSlug, RoomWhisper> = {
  studio: {
    eyebrow: "Room cues",
    title: "Marks arrive before explanation.",
    cues: [
      { label: "Surface", value: "paper grain + chalk dust" },
      { label: "Light", value: "north-window calm" },
      { label: "Gesture", value: "sketches staying soft-edged" },
    ],
  },
  orchard: {
    eyebrow: "Gathering notes",
    title: "Zest, petals, and window light are doing the welcoming.",
    cues: [
      { label: "Scent", value: "citrus peel + soft blossom" },
      { label: "Light", value: "late-afternoon gold" },
      { label: "Gesture", value: "abundance kept tender" },
    ],
  },
  mirror: {
    eyebrow: "Room cues",
    title: "The air stays luminous and inward-facing.",
    cues: [
      { label: "Surface", value: "powdered light + satin hush" },
      { label: "Light", value: "silver dusk glow" },
      { label: "Gesture", value: "selfhood, held gently" },
    ],
  },
  practice: {
    eyebrow: "Room cues",
    title: "Structure stays warm while everything aligns.",
    cues: [
      { label: "Surface", value: "grid lines with softness" },
      { label: "Light", value: "clear morning focus" },
      { label: "Gesture", value: "systems made humane" },
    ],
  },
  play: {
    eyebrow: "Room cues",
    title: "Motion behaves like a bright little dare.",
    cues: [
      { label: "Surface", value: "collage sparks + blur" },
      { label: "Light", value: "electric shimmer" },
      { label: "Gesture", value: "curiosity, left loose" },
    ],
  },
};

const PRELOAD_TIMEOUT_MS = 6500;
const RouteRevealContext = createContext<Accessor<boolean>>();

function useRouteReveal(): Accessor<boolean> {
  return useContext(RouteRevealContext) ?? (() => true);
}

function pickNextVariant(previous: CitrusVariant | null): CitrusVariant {
  const candidate: CitrusVariant = Math.random() < 0.5 ? "lemon" : "orange";
  if (!previous || candidate !== previous) return candidate;
  return previous === "lemon" ? "orange" : "lemon";
}

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function waitForPaint(): Promise<void> {
  return new Promise((resolve) => requestAnimationFrame(() => resolve()));
}

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T | null> {
  return Promise.race([promise, wait(ms).then(() => null)]);
}

function getTransitionProfile(kind: ManagedRouteKind, source: TransitionSource, reduceMotion: boolean): TransitionProfile {
  if (reduceMotion) {
    return source === "history"
      ? { coverMs: 0, minMs: 140, revealMs: 180 }
      : kind === "realm"
        ? { coverMs: 80, minMs: 260, revealMs: 220 }
        : { coverMs: 40, minMs: 200, revealMs: 180 };
  }

  if (source === "history") {
    return kind === "realm"
      ? { coverMs: 150, minMs: 920, revealMs: 380 }
      : { coverMs: 110, minMs: 640, revealMs: 300 };
  }

  return kind === "realm"
    ? { coverMs: 320, minMs: 1760, revealMs: 620 }
    : { coverMs: 190, minMs: 980, revealMs: 420 };
}

function getRealmSensoryNotes(realmSlug: RealmSlug): string[] {
  return REALM_SENSORY_NOTES[realmSlug];
}

function buildInterludeNotes(state: InterludeState): string[] {
  const baseNotes =
    state.variant === "orange"
      ? ["zest release", "amber glow"]
      : ["pith light", "petal hush"];

  return [...baseNotes, state.kind === "realm" ? "threshold opening" : "piece surfacing"];
}

function buildCitrusOrbitGlyphs(variant: CitrusVariant): Array<{
  kind: CitrusGlyphKind;
  style: JSX.CSSProperties;
}> {
  const glyphs =
    variant === "orange"
      ? [
          {
            kind: "leaf" as const,
            left: "17%",
            top: "20%",
            size: "1.95rem",
            delay: "140ms",
            rotation: "-22deg",
            driftX: "0.3rem",
            driftY: "-0.8rem",
          },
          {
            kind: "petal" as const,
            left: "84%",
            top: "25%",
            size: "1.3rem",
            delay: "300ms",
            rotation: "24deg",
            driftX: "-0.25rem",
            driftY: "-0.55rem",
          },
          {
            kind: "blossom" as const,
            left: "78%",
            top: "74%",
            size: "1.05rem",
            delay: "200ms",
            rotation: "0deg",
            driftX: "-0.2rem",
            driftY: "0.45rem",
          },
        ]
      : [
          {
            kind: "leaf" as const,
            left: "21%",
            top: "24%",
            size: "1.75rem",
            delay: "120ms",
            rotation: "-18deg",
            driftX: "0.24rem",
            driftY: "-0.68rem",
          },
          {
            kind: "petal" as const,
            left: "81%",
            top: "19%",
            size: "1.15rem",
            delay: "280ms",
            rotation: "18deg",
            driftX: "-0.18rem",
            driftY: "-0.48rem",
          },
          {
            kind: "blossom" as const,
            left: "73%",
            top: "71%",
            size: "0.95rem",
            delay: "240ms",
            rotation: "0deg",
            driftX: "-0.16rem",
            driftY: "0.38rem",
          },
        ];

  return glyphs.map((glyph) => ({
    kind: glyph.kind,
    style: {
      "--glyph-left": glyph.left,
      "--glyph-top": glyph.top,
      "--glyph-size": glyph.size,
      "--glyph-delay": glyph.delay,
      "--glyph-rotation": glyph.rotation,
      "--glyph-drift-x": glyph.driftX,
      "--glyph-drift-y": glyph.driftY,
    },
  }));
}

function buildCitrusScentMotes(variant: CitrusVariant): JSX.CSSProperties[] {
  const motes =
    variant === "orange"
      ? [
          { left: "28%", bottom: "26%", size: "0.48rem", delay: "180ms", drift: "-1.2rem" },
          { left: "38%", bottom: "18%", size: "0.34rem", delay: "320ms", drift: "-1rem" },
          { left: "64%", bottom: "22%", size: "0.42rem", delay: "240ms", drift: "-1.1rem" },
          { left: "74%", bottom: "30%", size: "0.28rem", delay: "400ms", drift: "-0.86rem" },
        ]
      : [
          { left: "31%", bottom: "24%", size: "0.38rem", delay: "200ms", drift: "-0.95rem" },
          { left: "43%", bottom: "18%", size: "0.28rem", delay: "340ms", drift: "-0.76rem" },
          { left: "61%", bottom: "21%", size: "0.34rem", delay: "260ms", drift: "-0.9rem" },
          { left: "70%", bottom: "29%", size: "0.24rem", delay: "420ms", drift: "-0.66rem" },
        ];

  return motes.map((mote) => ({
    "--mote-left": mote.left,
    "--mote-bottom": mote.bottom,
    "--mote-size": mote.size,
    "--mote-delay": mote.delay,
    "--mote-drift-y": mote.drift,
  }));
}

function RoomWhisperCard(props: {
  realmSlug: RealmSlug;
  compact?: boolean;
  eyebrow?: string;
}): JSX.Element {
  const whisper = () => ROOM_WHISPERS[props.realmSlug];

  return (
    <aside class={`room-whisper room-whisper-${props.realmSlug} ${props.compact ? "is-compact" : ""}`.trim()}>
      <div class="room-whisper-topline">
        <p class="room-whisper-eyebrow">{props.eyebrow ?? whisper().eyebrow}</p>
        <div class="room-whisper-glyph" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </div>
      <p class="room-whisper-title">{whisper().title}</p>
      <dl class="room-whisper-list">
        <For each={whisper().cues}>
          {(cue) => (
            <div>
              <dt>{cue.label}</dt>
              <dd>{cue.value}</dd>
            </div>
          )}
        </For>
      </dl>
    </aside>
  );
}

function getGalleryPieceShape(media: MediaItem): "portrait" | "landscape" | "square" {
  const ratio = media.width / media.height;

  if (ratio > 1.15) return "landscape";
  if (ratio < 0.84) return "portrait";
  return "square";
}

function RealmGallery(props: { works: Work[] }): JSX.Element {
  return (
    <section class="realm-gallery" aria-label="Realm works gallery">
      <For each={props.works}>
        {(work, index) => {
          const leadMedia = work.media[0]!;
          const pieceShape = getGalleryPieceShape(leadMedia);

          return (
            <A
              href={`/work/${work.slug}`}
              class={`gallery-piece gallery-piece-${pieceShape} ${leadMedia.kind === "video" ? "gallery-piece-video" : "gallery-piece-image"}`}
            >
              <figure class="gallery-piece-media" style={createMediaAspectStyle(leadMedia)}>
                {renderMediaAsset(leadMedia, {
                  autoplay: leadMedia.kind === "video",
                  preload: leadMedia.kind === "video" ? "metadata" : undefined,
                  loading: index() < 4 ? "eager" : "lazy",
                })}
                <div class="gallery-piece-overlay">
                  <div class="gallery-piece-card">
                    <p class="gallery-piece-kicker">
                      {work.year} / {work.medium}
                    </p>
                    <h3>{work.title}</h3>
                  </div>
                </div>
              </figure>
            </A>
          );
        }}
      </For>
    </section>
  );
}

function RootShell(props: ParentProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const isAdmin = () => location.pathname === "/admin";
  const initialDetails = getManagedRouteDetails(location.pathname);
  const initialVariant = initialDetails ? pickNextVariant(null) : null;
  const initialProfile = initialDetails
    ? getTransitionProfile(initialDetails.kind, "initial", false)
    : null;
  const [prefersReducedMotion, setPrefersReducedMotion] = createSignal(false);
  const [lastVariant, setLastVariant] = createSignal<CitrusVariant | null>(initialVariant);
  const [contentHidden, setContentHidden] = createSignal(Boolean(initialDetails));
  const [pendingTargetPath, setPendingTargetPath] = createSignal<string | null>(null);
  const isRouteRevealed = () => !contentHidden();
  const [interludeState, setInterludeState] = createSignal<InterludeState | null>(
    initialDetails && initialVariant
      ? {
          token: 1,
          variant: initialVariant,
          kind: initialDetails.kind,
          title: initialDetails.title,
          eyebrow: initialDetails.eyebrow,
          description: initialDetails.description,
          phase: "covering",
          revealMs: initialProfile?.revealMs ?? 620,
        }
      : null,
  );
  let activeToken = initialDetails ? 1 : 0;
  let pendingCommit: { path: string; resolve: () => void } | null = null;
  let observedPath = location.pathname;

  createEffect(() => {
    const path = location.pathname;
    let title = "Kate Goncharova — Living Studio";

    if (path === "/admin") {
      title = "Kate Goncharova — Curation Admin";
    }

    if (path.startsWith("/realm/")) {
      const slug = path.replace("/realm/", "");
      const realm = getRealmBySlug(slug);
      if (realm) title = `${realm.name} — Kate Goncharova`;
    }

    if (path.startsWith("/work/")) {
      const slug = path.replace("/work/", "");
      const work = getWorkBySlug(slug);
      if (work) title = `${work.title} — Kate Goncharova`;
    }

    document.title = title;
  });

  createEffect(() => {
    if (isAdmin()) return;
    if (!interludeState()) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    onCleanup(() => {
      document.body.style.overflow = previousOverflow;
    });
  });

  createEffect(() => {
    const path = location.pathname;

    if (pendingCommit?.path === path) {
      pendingCommit.resolve();
      pendingCommit = null;
    }

    if (path === observedPath) return;
    observedPath = path;

    if (path === pendingTargetPath()) return;
    if (isAdmin()) return;

    const details = getManagedRouteDetails(path);
    if (!details) return;

    void revealCurrentPath(path, details.kind, "history");
  });

  onMount(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncReducedMotion = () => setPrefersReducedMotion(query.matches);
    syncReducedMotion();
    query.addEventListener("change", syncReducedMotion);
    document.addEventListener("click", handleShellClick, true);
    onCleanup(() => {
      query.removeEventListener("change", syncReducedMotion);
      document.removeEventListener("click", handleShellClick, true);
    });

    if (initialDetails) {
      void revealCurrentPath(location.pathname, initialDetails.kind, "initial", {
        token: 1,
        variant: initialVariant ?? "lemon",
      });
    }
  });

  function buildInterludeState(
    path: string,
    token: number,
    variant: CitrusVariant,
    revealMs: number,
  ): InterludeState | null {
    const details = getManagedRouteDetails(path);
    if (!details) return null;

    return {
      token,
      variant,
      kind: details.kind,
      title: details.title,
      eyebrow: details.eyebrow,
      description: details.description,
      phase: "covering",
      revealMs,
    };
  }

  async function waitForManagedCommit(path: string): Promise<void> {
    if (location.pathname === path) return;
    await new Promise<void>((resolve) => {
      pendingCommit = { path, resolve };
    });
  }

  async function warmRoute(path: string): Promise<void> {
    await withTimeout(
      preloadManagedRoute(path).catch((error) => {
        console.error(error);
      }),
      PRELOAD_TIMEOUT_MS,
    );
  }

  async function revealCurrentPath(
    path: string,
    kind: ManagedRouteKind,
    source: TransitionSource,
    seed?: { token: number; variant: CitrusVariant },
  ): Promise<void> {
    const token = seed?.token ?? ++activeToken;
    const variant = seed?.variant ?? pickNextVariant(lastVariant());
    const profile = getTransitionProfile(kind, source, prefersReducedMotion());
    const nextState = buildInterludeState(path, token, variant, profile.revealMs);
    if (!nextState) {
      setContentHidden(false);
      setInterludeState(null);
      return;
    }

    const startedAt = performance.now();
    setLastVariant(variant);
    setInterludeState(nextState);
    setPendingTargetPath(null);
    setContentHidden(true);

    await Promise.all([wait(profile.coverMs), warmRoute(path)]);

    if (token !== activeToken) return;

    const remaining = profile.minMs - (performance.now() - startedAt);
    if (remaining > 0) await wait(remaining);
    if (token !== activeToken) return;

    await waitForPaint();
    if (token !== activeToken) return;

    setContentHidden(false);
    setInterludeState((current) =>
      current && current.token === token ? { ...current, phase: "revealing" } : current,
    );
    await wait(profile.revealMs);
    if (token !== activeToken) return;

    setInterludeState(null);
  }

  async function transitionToPath(path: string): Promise<void> {
    if (path === location.pathname) return;

    const details = getManagedRouteDetails(path);
    if (!details) {
      navigate(path);
      return;
    }

    const token = ++activeToken;
    const variant = pickNextVariant(lastVariant());
    const profile = getTransitionProfile(details.kind, "navigate", prefersReducedMotion());
    const nextState = buildInterludeState(path, token, variant, profile.revealMs);
    if (!nextState) {
      navigate(path);
      return;
    }

    const startedAt = performance.now();
    setLastVariant(variant);
    setInterludeState(nextState);
    setPendingTargetPath(path);

    await wait(profile.coverMs);
    if (token !== activeToken) return;

    await warmRoute(path);
    if (token !== activeToken) return;

    setContentHidden(true);
    const committed = waitForManagedCommit(path);
    navigate(path);
    await committed;
    if (token !== activeToken) return;

    await waitForPaint();
    if (token !== activeToken) return;

    const remaining = profile.minMs - (performance.now() - startedAt);
    if (remaining > 0) await wait(remaining);
    if (token !== activeToken) return;

    setContentHidden(false);
    setInterludeState((current) =>
      current && current.token === token ? { ...current, phase: "revealing" } : current,
    );
    await wait(profile.revealMs);
    if (token !== activeToken) return;

    setPendingTargetPath(null);
    setInterludeState(null);
  }

  function handleShellClick(event: MouseEvent): void {
    if (isAdmin()) return;
    if (event.defaultPrevented) return;
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const target = event.target;
    if (!(target instanceof Element)) return;

    const anchor = target.closest("a");
    if (!anchor) return;
    if (anchor.target && anchor.target !== "_self") return;
    if (anchor.hasAttribute("download")) return;

    const destination = new URL(anchor.href, window.location.href);
    if (destination.origin !== window.location.origin) return;
    if (!getManagedRouteKind(destination.pathname)) return;
    if (destination.pathname === location.pathname) return;

    event.preventDefault();
    void transitionToPath(destination.pathname);
  }

  return (
    <RouteRevealContext.Provider value={isRouteRevealed}>
      <div class={`site-shell ${isAdmin() ? "site-shell-admin" : ""}`}>
        <Show when={!isAdmin() && interludeState()}>
          {(state) => <CitrusInterlude state={state()} />}
        </Show>
        <Show when={!isAdmin()}>
          <div class="ambient ambient-left" aria-hidden="true" />
          <div class="ambient ambient-right" aria-hidden="true" />
        </Show>
        <header class={`site-header ${isAdmin() ? "site-header-admin" : ""}`}>
          <A href="/" class="wordmark">
            kate
          </A>
          <Show
            when={!isAdmin()}
            fallback={<div class="admin-header-label">local curation admin</div>}
          >
            <nav class="site-nav" aria-label="Primary">
              <For each={getRealms()}>
                {(realm) => (
                  <A href={`/realm/${realm.slug}`} class="nav-link">
                    {realm.name}
                  </A>
                )}
              </For>
            </nav>
          </Show>
        </header>
        <main
          class={`site-main ${isAdmin() ? "site-main-admin" : ""} ${contentHidden() ? "site-main-concealed" : ""}`}
        >
          {props.children}
        </main>
      </div>
    </RouteRevealContext.Provider>
  );
}

function renderResolvedMediaAsset(
  media: MediaItem,
  src: string,
  posterSrc?: string,
  options?: MediaRenderOptions,
): JSX.Element {
  if (media.kind === "video") {
    const autoplay = options?.autoplay ?? true;
    return (
      <video
        class={options?.class}
        src={src}
        poster={posterSrc}
        aria-label={media.alt}
        width={media.width}
        height={media.height}
        muted
        playsinline
        loop
        preload={options?.preload ?? (autoplay ? "metadata" : "none")}
        autoplay={autoplay}
      />
    );
  }

  return (
    <img
      class={options?.class}
      src={src}
      alt={media.alt}
      width={media.width}
      height={media.height}
      loading={options?.loading ?? "lazy"}
      decoding="async"
    />
  );
}

function LazyMediaAsset(props: {
  media: MediaItem;
  options?: MediaRenderOptions;
}): JSX.Element {
  const [assetPaths] = createResource(
    () => `${props.media.src}|${props.media.poster ?? ""}`,
    async (key) => {
      const separatorIndex = key.indexOf("|");
      const src = separatorIndex === -1 ? key : key.slice(0, separatorIndex);
      const poster = separatorIndex === -1 ? "" : key.slice(separatorIndex + 1);

      return {
        src: await resolveMediaAssetPath(src),
        poster: poster ? await resolveMediaAssetPath(poster) : undefined,
      };
    },
  );

  return (
    <Show when={assetPaths()}>
      {(resolved) =>
        renderResolvedMediaAsset(props.media, resolved().src, resolved().poster, props.options)
      }
    </Show>
  );
}

function renderMediaAsset(
  media: MediaItem,
  options?: MediaRenderOptions,
): JSX.Element {
  if (isLazyAssetPath(media.src) || (media.poster && isLazyAssetPath(media.poster))) {
    return <LazyMediaAsset media={media} options={options} />;
  }

  return renderResolvedMediaAsset(
    media,
    asset(media.src),
    media.poster ? asset(media.poster) : undefined,
    options,
  );
}

function CitrusInterlude(props: { state: InterludeState }): JSX.Element {
  const segments = () => buildCitrusSegments(props.state.variant === "orange" ? 8 : 6, props.state.variant);
  const crumbs = () => buildCitrusCrumbs(props.state.variant);
  const notes = () => buildInterludeNotes(props.state);
  const orbitGlyphs = () => buildCitrusOrbitGlyphs(props.state.variant);
  const scentMotes = () => buildCitrusScentMotes(props.state.variant);

  return (
    <div
      class={`citrus-interlude citrus-interlude-${props.state.kind} citrus-interlude-${props.state.variant} ${props.state.phase === "revealing" ? "is-revealing" : ""}`}
      style={{ "--overlay-reveal-ms": `${props.state.revealMs}ms` }}
      role="status"
      aria-live="polite"
      aria-label={`${props.state.eyebrow}: ${props.state.title}`}
    >
      <div class="citrus-interlude-haze citrus-interlude-haze-left" aria-hidden="true" />
      <div class="citrus-interlude-haze citrus-interlude-haze-right" aria-hidden="true" />
      <div class="citrus-interlude-grain" aria-hidden="true" />

      <div class="citrus-interlude-stage">
        <div class="citrus-interlude-fruit-shell" aria-hidden="true">
          <div class="citrus-interlude-aura citrus-interlude-aura-outer" />
          <div class="citrus-interlude-aura citrus-interlude-aura-inner" />
          <div class="citrus-interlude-scent">
            <For each={scentMotes()}>
              {(mote) => <span class="citrus-scent-mote" style={mote} />}
            </For>
          </div>
          <div class="citrus-interlude-orbit">
            <For each={orbitGlyphs()}>
              {(glyph) => <span class={`citrus-orbit-glyph citrus-orbit-glyph-${glyph.kind}`} style={glyph.style} />}
            </For>
          </div>
          <div class="citrus-interlude-cut-line" />
          <svg
            class="citrus-interlude-fruit"
            viewBox="0 0 240 240"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle class="citrus-ring citrus-ring-outer" cx="120" cy="120" r="100" />
            <circle class="citrus-ring citrus-ring-inner" cx="120" cy="120" r="87" />
            <circle class="citrus-ring citrus-ring-core" cx="120" cy="120" r="16" />

            <For each={segments()}>
              {(segment) => (
                <g class="citrus-segment" style={segment.style}>
                  <path class="citrus-segment-fill" d={segment.path} />
                  <path class="citrus-segment-vein" d={segment.veinPath} />
                </g>
              )}
            </For>
          </svg>

          <div class="citrus-crumbs">
            <For each={crumbs()}>
              {(crumb) => <span class="citrus-crumb" style={crumb} />}
            </For>
          </div>
        </div>

        <div class="citrus-interlude-copy">
          <p class="citrus-interlude-eyebrow">{props.state.eyebrow}</p>
          <h2>{props.state.title}</h2>
          <p>{props.state.description}</p>
          <div class="citrus-interlude-notes" aria-hidden="true">
            <For each={notes()}>
              {(note) => <span class="citrus-interlude-note">{note}</span>}
            </For>
          </div>
          <div class="citrus-interlude-progress" aria-hidden="true">
            <span class="citrus-interlude-progress-beam" />
          </div>
        </div>
      </div>
    </div>
  );
}

function buildCitrusSegments(segmentCount: number, variant: CitrusVariant): Array<{
  path: string;
  veinPath: string;
  style: JSX.CSSProperties;
}> {
  const sliceAngle = 360 / segmentCount;
  const gap = variant === "orange" ? 7 : 9;

  return Array.from({ length: segmentCount }, (_, index) => {
    const startAngle = -90 + index * sliceAngle + gap / 2;
    const endAngle = startAngle + sliceAngle - gap;
    const midAngle = (startAngle + endAngle) / 2;
    const midRadians = (midAngle * Math.PI) / 180;
    const splitDistance = variant === "orange" ? 12 : 9;
    const splitX = Math.cos(midRadians) * splitDistance;
    const splitY = Math.sin(midRadians) * splitDistance;
    const fallDistance = Math.sin(midRadians) > 0 ? (variant === "orange" ? 62 : 48) : -14;
    const driftX = Math.cos(midRadians) * (variant === "orange" ? 18 : 12);
    const tilt = `${Math.cos(midRadians) * 8 + (Math.sin(midRadians) > 0 ? 10 : -4)}deg`;
    const outerPoint = polarPoint(120, 120, 78, midAngle);
    const innerPoint = polarPoint(120, 120, 23, midAngle);

    return {
      path: describeRingSegment(120, 120, 24, 81, startAngle, endAngle),
      veinPath: `M ${innerPoint.x.toFixed(2)} ${innerPoint.y.toFixed(2)} L ${outerPoint.x.toFixed(2)} ${outerPoint.y.toFixed(2)}`,
      style: {
        "--segment-delay": `${index * 48}ms`,
        "--segment-split-x": `${splitX.toFixed(2)}px`,
        "--segment-split-y": `${splitY.toFixed(2)}px`,
        "--segment-drift-x": `${driftX.toFixed(2)}px`,
        "--segment-fall-y": `${fallDistance.toFixed(2)}px`,
        "--segment-tilt": tilt,
      },
    };
  });
}

function buildCitrusCrumbs(variant: CitrusVariant): JSX.CSSProperties[] {
  const crumbs = variant === "orange" ? 5 : 3;

  return Array.from({ length: crumbs }, (_, index) => ({
    "--crumb-delay": `${220 + index * 70}ms`,
    "--crumb-left": `${36 + index * 11}%`,
    "--crumb-size": `${variant === "orange" ? 0.6 : 0.48 + index * 0.04}rem`,
  }));
}

function describeRingSegment(
  cx: number,
  cy: number,
  innerRadius: number,
  outerRadius: number,
  startAngle: number,
  endAngle: number,
): string {
  const startOuter = polarPoint(cx, cy, outerRadius, startAngle);
  const endOuter = polarPoint(cx, cy, outerRadius, endAngle);
  const endInner = polarPoint(cx, cy, innerRadius, endAngle);
  const startInner = polarPoint(cx, cy, innerRadius, startAngle);
  const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

  return [
    `M ${startOuter.x.toFixed(2)} ${startOuter.y.toFixed(2)}`,
    `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${endOuter.x.toFixed(2)} ${endOuter.y.toFixed(2)}`,
    `L ${endInner.x.toFixed(2)} ${endInner.y.toFixed(2)}`,
    `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${startInner.x.toFixed(2)} ${startInner.y.toFixed(2)}`,
    "Z",
  ].join(" ");
}

function polarPoint(cx: number, cy: number, radius: number, angle: number): { x: number; y: number } {
  const radians = (angle * Math.PI) / 180;
  return {
    x: cx + Math.cos(radians) * radius,
    y: cy + Math.sin(radians) * radius,
  };
}

function HomePage() {
  const realms = getRealms();

  return (
    <div class="page page-home">
      <section class="hero">
        <div class="hero-copy">
          <p class="eyebrow">Living Studio</p>
          <h1>
            Her space is made of paper, sunlight, citrus, flowers, rooms, and
            image-making.
          </h1>
          <p class="hero-text">
            Kate Goncharova is an artist-shaped visual world: drawings,
            photographs, branding, product thinking, tender studies, and visual
            experiments living together instead of asking permission from one
            another.
          </p>
          <div class="hero-actions">
            <A href="/realm/studio" class="button button-dark">
              Enter the studio
            </A>
            <A href="/realm/orchard" class="button">
              Follow the citrus trail
            </A>
          </div>
          <div class="hero-notes">
            <p class="hero-notes-label">Harvest notes</p>
            <div class="hero-notes-row">
              <For each={getRealmSensoryNotes("orchard")}>
                {(note) => <span>{note}</span>}
              </For>
            </div>
          </div>
        </div>

        <div class="still-life" aria-hidden="true">
          <div class="still-life-sun" />
          <div class="still-life-table" />
          <div class="branch branch-main" />
          <div class="leaf leaf-one" />
          <div class="leaf leaf-two" />
          <div class="fruit fruit-orange" />
          <div class="fruit fruit-lemon" />
          <div class="citrus-slice" />
          <div class="petal petal-one" />
          <div class="petal petal-two" />
          <div class="blossom-cluster">
            <span class="blossom blossom-one" />
            <span class="blossom blossom-two" />
            <span class="blossom blossom-three" />
          </div>
          <div class="seed-row">
            <span class="seed seed-one" />
            <span class="seed seed-two" />
            <span class="seed seed-three" />
          </div>
          <div class="note-card">
            <span>touch-first</span>
            <span>tender + sunlit</span>
          </div>
        </div>
      </section>

      <section class="realm-grid-section">
        <div class="section-heading">
          <p class="eyebrow">Portals</p>
          <h2>Five rooms in one kingdom</h2>
        </div>
        <div class="realm-grid">
          <For each={realms}>
            {(realm) => (
              <A href={`/realm/${realm.slug}`} class="realm-card">
                <figure class="realm-card-media">
                  {renderMediaAsset(realm.coverMedia)}
                </figure>
                <div class="realm-card-copy">
                  <p class="realm-card-kicker">{realm.subtitle}</p>
                  <h3>{realm.name}</h3>
                  <p>{realm.intro}</p>
                  <div class="realm-card-notes">
                    <For each={getRealmSensoryNotes(realm.slug).slice(0, 2)}>
                      {(note) => <span>{note}</span>}
                    </For>
                  </div>
                </div>
              </A>
            )}
          </For>
        </div>
      </section>

      <section class="quote-band">
        <p>
          “Visual sensitivity” is the medium. Design is only one branch of the
          same practice.
        </p>
      </section>

      <section class="featured-strip">
        <div class="section-heading">
          <p class="eyebrow">Featured works</p>
          <h2>Editorial fragments from the living studio</h2>
        </div>
        <div class="featured-grid">
          <For each={siteManifest.works.slice(0, 6)}>
            {(work) => (
              <A href={`/work/${work.slug}`} class="work-tile">
                {renderMediaAsset(work.media[0])}
                <div class="work-tile-copy">
                  <span>{work.year}</span>
                  <strong>{work.title}</strong>
                </div>
              </A>
            )}
          </For>
        </div>
      </section>
    </div>
  );
}

function RealmPage() {
  const params = useParams();
  const realmSlug = () => params.realmSlug ?? "";
  const realm = () => getRealmBySlug(realmSlug());
  const works = () => getWorksForRealm(realmSlug());

  return (
    <Show when={realm()} fallback={<NotFoundPage />}>
      {(resolvedRealm) => (
        <div class="page page-realm">
          <section class="realm-hero">
            <div class="realm-hero-copy">
              <p class="eyebrow">{resolvedRealm().subtitle}</p>
              <h1>{resolvedRealm().name}</h1>
              <p>{resolvedRealm().intro}</p>
              <RoomWhisperCard realmSlug={resolvedRealm().slug} />
            </div>
            <figure class="realm-hero-figure" style={createMediaAspectStyle(resolvedRealm().coverMedia)}>
              {renderMediaAsset(resolvedRealm().coverMedia, { loading: "eager" })}
            </figure>
          </section>

          <section class="section-heading">
            <p class="eyebrow">Works in this realm</p>
            <h2>{works().length} pieces gathered here</h2>
          </section>

          <RealmGallery works={works()} />
        </div>
      )}
    </Show>
  );
}

function renderRichText(spans: RichTextSpan[]): JSX.Element[] {
  return spans.map((span) => {
    if (span.break) return <br />;

    let node: JSX.Element = span.href ? (
      <a href={span.href} target="_blank" rel="noreferrer">
        {span.text}
      </a>
    ) : (
      <>{span.text}</>
    );

    if (span.code) node = <code>{node}</code>;
    if (span.underline) node = <u>{node}</u>;
    if (span.italic) node = <em>{node}</em>;
    if (span.bold) node = <strong>{node}</strong>;
    return node;
  });
}

function richTextToPlainText(spans: RichTextSpan[]): string {
  return spans
    .map((span) => (span.break ? " " : span.text ?? ""))
    .join("")
    .replace(/\s+/g, " ")
    .trim();
}

function groupCaseStudyBlocks(blocks: CaseStudyBlock[]) {
  const sections: { chapter: boolean; blocks: CaseStudyBlock[] }[] = [];
  let current: { chapter: boolean; blocks: CaseStudyBlock[] } | null = null;

  for (const block of blocks) {
    const isChapterStart = block.type === "heading" && block.level === 1;

    if (!current || isChapterStart) {
      if (current && current.blocks.length > 0) {
        sections.push(current);
      }
      current = { chapter: isChapterStart, blocks: [block] };
      continue;
    }

    current.blocks.push(block);
  }

  if (current && current.blocks.length > 0) {
    sections.push(current);
  }

  return sections;
}

function annotateCaseStudySections(blocks: CaseStudyBlock[]) {
  let chapterIndex = 0;

  return groupCaseStudyBlocks(blocks).map((section, toneIndex) => {
    const isChapter = section.chapter;
    if (isChapter) chapterIndex += 1;

    return {
      ...section,
      toneIndex,
      chapterIndex: isChapter ? chapterIndex : null,
    };
  });
}

function renderImageFigure(
  block: Extract<CaseStudyBlock, { type: "image" }>,
): JSX.Element {
  return (
    <figure class="case-study-figure">
      {renderMediaAsset(block.media, { autoplay: false })}
      <Show when={block.media.caption}>
        <figcaption>{block.media.caption}</figcaption>
      </Show>
    </figure>
  );
}

function renderCaseStudyBlock(block: CaseStudyBlock): JSX.Element {
  switch (block.type) {
    case "heading":
      if (block.level === 1) {
        return (
          <h2 class="case-study-heading case-study-heading-h1">
            {renderRichText(block.content)}
          </h2>
        );
      }
      if (block.level === 2) {
        return (
          <h3 class="case-study-heading case-study-heading-h2">
            {renderRichText(block.content)}
          </h3>
        );
      }
      return (
        <h4 class="case-study-heading case-study-heading-h3">
          {renderRichText(block.content)}
        </h4>
      );
    case "paragraph":
      return <p class="case-study-paragraph">{renderRichText(block.content)}</p>;
    case "list":
      return (
        <ul class="case-study-list">
          <For each={block.items}>
            {(item) => <li>{renderRichText(item)}</li>}
          </For>
        </ul>
      );
    case "image":
      return renderImageFigure(block);
    case "divider":
      return <hr class="case-study-divider" />;
  }
}

function renderCaseStudySection(section: {
  chapter: boolean;
  blocks: CaseStudyBlock[];
  toneIndex: number;
  chapterIndex: number | null;
}): JSX.Element {
  const nodes: JSX.Element[] = [];
  let imageGroup: Extract<CaseStudyBlock, { type: "image" }>[] = [];
  let galleryCount = 0;

  const flushImages = () => {
    if (imageGroup.length === 0) return;

    const isShowcase = section.chapter && galleryCount === 0;

    if (imageGroup.length === 1) {
      if (isShowcase) {
        nodes.push(
          <div class="case-study-gallery case-study-gallery-solo case-study-gallery-showcase">
            {renderImageFigure(imageGroup[0])}
          </div>,
        );
      } else {
        nodes.push(renderImageFigure(imageGroup[0]));
      }
    } else {
      const galleryClass =
        imageGroup.length === 2
          ? "case-study-gallery-pair"
          : imageGroup.length === 3
            ? "case-study-gallery-triptych"
            : "case-study-gallery-grid";

      nodes.push(
        <div
          class={`case-study-gallery ${galleryClass} ${isShowcase ? "case-study-gallery-showcase" : ""}`}
        >
          <For each={imageGroup}>{(block) => renderImageFigure(block)}</For>
        </div>,
      );
    }

    galleryCount += 1;
    imageGroup = [];
  };

  const hasChapterHeading =
    section.chapter &&
    section.blocks[0]?.type === "heading" &&
    section.blocks[0].level === 1;

  let remainingBlocks = section.blocks;

  if (hasChapterHeading) {
    const chapterHeading = section.blocks[0] as Extract<
      CaseStudyBlock,
      { type: "heading" }
    >;

    nodes.push(
      <header class="case-study-chapter-header">
        <p class="case-study-chapter-kicker">
          Chapter {String(section.chapterIndex ?? 1).padStart(2, "0")}
        </p>
        {renderCaseStudyBlock(chapterHeading)}
      </header>,
    );

    remainingBlocks = section.blocks.slice(1);
  }

  const chapterIntro: JSX.Element[] = [];

  while (section.chapter && remainingBlocks[0]?.type === "paragraph") {
    chapterIntro.push(renderCaseStudyBlock(remainingBlocks[0]));
    remainingBlocks = remainingBlocks.slice(1);
  }

  if (chapterIntro.length > 0) {
    nodes.push(<div class="case-study-chapter-intro">{chapterIntro}</div>);
  }

  for (const block of remainingBlocks) {
    if (block.type === "image") {
      imageGroup.push(block);
      continue;
    }

    flushImages();
    nodes.push(renderCaseStudyBlock(block));
  }

  flushImages();

  return (
    <section
      class={`case-study-section ${section.chapter ? `case-study-section-chapter case-study-section-tone-${section.toneIndex % 4}` : "case-study-section-neutral"}`}
    >
      {nodes}
    </section>
  );
}

function WorkPage() {
  const params = useParams();
  const workSlug = () => params.workSlug ?? "";
  const work = () => getWorkBySlug(workSlug());
  const isRouteVisible = useRouteReveal();
  const [heroSlideIndex, setHeroSlideIndex] = createSignal(0);

  createEffect(() => {
    const resolved = work();
    if (!resolved || !isRouteVisible()) return;

    setHeroSlideIndex(0);

    const slides = resolved.media.slice(0, 5);
    if (slides.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const introSlides = slides.slice(1, 4).map((_, index) => index + 1);
    const timers: number[] = [];
    let elapsed = 1450;

    for (const slideIndex of introSlides) {
      timers.push(window.setTimeout(() => setHeroSlideIndex(slideIndex), elapsed));
      elapsed += 720;
    }

    timers.push(window.setTimeout(() => setHeroSlideIndex(0), elapsed));

    onCleanup(() => {
      for (const timer of timers) window.clearTimeout(timer);
    });
  });

  return (
    <Show when={work()} fallback={<NotFoundPage />}>
      {(resolvedWork) => {
        const realm = () => getRealmBySlug(resolvedWork().realmSlug);
        const related = () => getRelatedWorks(resolvedWork().slug);
        const heroSlides = () => resolvedWork().media.slice(0, 5);
        const displayBlocks = () => {
          const blocks = [...(resolvedWork().blocks ?? [])];

          if (
            blocks[0]?.type === "heading" &&
            richTextToPlainText(blocks[0].content).toLowerCase() === "cover"
          ) {
            blocks.shift();
          }

          if (
            blocks[0]?.type === "image" &&
            blocks[0].media.src === resolvedWork().media[0].src
          ) {
            blocks.shift();
          }

          while (blocks[0]?.type === "divider") {
            blocks.shift();
          }

          return blocks;
        };
        const caseStudySections = () => annotateCaseStudySections(displayBlocks());

        return (
          <div class="page page-work">
            <section class="work-hero">
              <div class="work-hero-gallery">
                <div class="work-hero-stage">
                  <For each={heroSlides()}>
                    {(media, index) => (
                      <figure
                        class={`work-hero-media ${index() === heroSlideIndex() ? "is-active" : ""}`}
                      >
                        {renderMediaAsset(media, {
                          autoplay: index() === heroSlideIndex(),
                          loading: index() === 0 ? "eager" : "lazy",
                        })}
                      </figure>
                    )}
                  </For>

                  <Show when={heroSlides().length > 1}>
                    <div class="work-hero-progress" aria-label="Gallery slides">
                      <For each={heroSlides()}>
                        {(_, index) => (
                          <button
                            type="button"
                            class={`work-hero-dot ${index() === heroSlideIndex() ? "is-active" : ""}`}
                            aria-label={`Show slide ${index() + 1}`}
                            aria-pressed={index() === heroSlideIndex()}
                            onClick={() => setHeroSlideIndex(index())}
                          />
                        )}
                      </For>
                    </div>
                  </Show>
                </div>
              </div>

              <div class="work-meta">
                <div class="work-meta-main">
                  <p class="eyebrow">
                    <Show when={realm()}>
                      {(resolvedRealm) => (
                        <A href={`/realm/${resolvedRealm().slug}`}>
                          {resolvedRealm().name}
                        </A>
                      )}
                    </Show>
                  </p>
                  <h1>{resolvedWork().title}</h1>
                  <p class="work-summary">{resolvedWork().summary}</p>
                </div>
                <div class="work-meta-side">
                  <p class="work-meta-label">Project dossier</p>
                  <dl class="work-facts">
                    <div>
                      <dt>Year</dt>
                      <dd>{resolvedWork().year}</dd>
                    </div>
                    <div>
                      <dt>Medium</dt>
                      <dd>{resolvedWork().medium}</dd>
                    </div>
                    <div>
                      <dt>Focus</dt>
                      <dd class="work-facts-tags">
                        <For each={resolvedWork().tags}>
                          {(tag, index) => (
                            <>
                              <span>{tag}</span>
                              <Show when={index() < resolvedWork().tags.length - 1}>
                                <span class="work-facts-separator"> / </span>
                              </Show>
                            </>
                          )}
                        </For>
                      </dd>
                    </div>
                  </dl>
                  <Show when={realm()}>
                    {(resolvedRealm) => (
                      <RoomWhisperCard
                        realmSlug={resolvedRealm().slug}
                        compact
                        eyebrow="Room cues"
                      />
                    )}
                  </Show>
                </div>
              </div>
            </section>

            <Show
              when={displayBlocks().length > 0}
              fallback={
                <section class="media-mosaic">
                  <For each={resolvedWork().media.slice(1)}>
                    {(media) => (
                      <figure class="media-card">
                        {renderMediaAsset(media)}
                        <Show when={media.caption}>
                          <figcaption>{media.caption}</figcaption>
                        </Show>
                      </figure>
                    )}
                  </For>
                </section>
              }
            >
              <section class="case-study-flow">
                <For each={caseStudySections()}>
                  {(section) => renderCaseStudySection(section)}
                </For>
              </section>
            </Show>

            <Show when={related().length > 0}>
              <section class="related-section">
                <div class="related-shell">
                  <div class="related-header">
                    <p class="eyebrow">Nearby pieces</p>
                    <h2>Other works in Kate&apos;s orbit</h2>
                    <p class="related-copy">
                      Adjacent studies from the same visual world.
                    </p>
                  </div>
                  <div class="related-grid">
                  <For each={related()}>
                    {(item, index) => (
                      <A
                        href={`/work/${item.slug}`}
                        class={`related-card related-card-tone-${index() % 3}`}
                      >
                        <figure class="related-card-media">
                          {renderMediaAsset(item.media[0])}
                        </figure>
                        <div class="related-card-copy">
                          <p class="related-card-kicker">
                            {item.year} / {item.medium}
                          </p>
                          <h3>{item.title}</h3>
                          <p>{item.summary}</p>
                        </div>
                      </A>
                    )}
                  </For>
                  </div>
                </div>
              </section>
            </Show>
          </div>
        );
      }}
    </Show>
  );
}

function NotFoundPage() {
  return (
    <div class="page page-not-found">
      <div class="not-found-card">
        <p class="eyebrow">Not found</p>
        <h1>This room does not exist yet.</h1>
        <p>
          The living studio is still growing. Return to the home scene and enter
          a different portal.
        </p>
        <A href="/" class="button button-dark">
          Back to the studio
        </A>
      </div>
    </div>
  );
}

export default function App(): JSX.Element {
  return (
    <Router root={RootShell}>
      <Route path="/" component={HomePage} />
      <Route path="/admin" component={AdminPage} />
      <Route path="/realm/:realmSlug" component={RealmPage} />
      <Route path="/work/:workSlug" component={WorkPage} />
      <Route path="*all" component={NotFoundPage} />
    </Router>
  );
}

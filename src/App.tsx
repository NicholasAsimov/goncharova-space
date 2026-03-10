import { A, Route, Router, useLocation, useParams } from "@solidjs/router";
import { For, Show, createEffect, createSignal, onCleanup } from "solid-js";
import type { JSX, ParentProps } from "solid-js";
import AdminPage from "./admin/AdminPage";
import type { CaseStudyBlock, MediaItem, RichTextSpan } from "./data/schema";
import {
  asset,
  getRealmBySlug,
  getRealms,
  getWorkBySlug,
  getWorksForRealm,
  getRelatedWorks,
  siteManifest,
} from "./data/site";

function RootShell(props: ParentProps) {
  const location = useLocation();
  const isAdmin = () => location.pathname === "/admin";

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

  return (
    <div class={`site-shell ${isAdmin() ? "site-shell-admin" : ""}`}>
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
      <main class={`site-main ${isAdmin() ? "site-main-admin" : ""}`}>{props.children}</main>
    </div>
  );
}

function renderMediaAsset(
  media: MediaItem,
  options?: {
    class?: string;
    autoplay?: boolean;
  },
): JSX.Element {
  if (media.kind === "video") {
    return (
      <video
        class={options?.class}
        src={asset(media.src)}
        aria-label={media.alt}
        muted
        playsinline
        loop
        preload="metadata"
        autoplay={options?.autoplay ?? true}
      />
    );
  }

  return (
    <img
      class={options?.class}
      src={asset(media.src)}
      alt={media.alt}
    />
  );
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
        </div>

        <div class="still-life" aria-hidden="true">
          <div class="still-life-sun" />
          <div class="fruit fruit-orange" />
          <div class="fruit fruit-lemon" />
          <div class="petal petal-one" />
          <div class="petal petal-two" />
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
            </div>
            <figure class="realm-hero-figure">
              {renderMediaAsset(resolvedRealm().coverMedia)}
            </figure>
          </section>

          <section class="section-heading">
            <p class="eyebrow">Works in this realm</p>
            <h2>{works().length} pieces gathered here</h2>
          </section>

          <section class="work-stack">
            <For each={works()}>
              {(work) => (
                <A href={`/work/${work.slug}`} class="work-panel">
                  <figure class="work-panel-media">
                    {renderMediaAsset(work.media[0])}
                  </figure>
                  <div class="work-panel-copy">
                    <p class="panel-kicker">
                      {work.year} / {work.medium}
                    </p>
                    <h3>{work.title}</h3>
                    <p>{work.summary}</p>
                    <div class="tag-row">
                      <For each={work.tags}>
                        {(tag) => <span>{tag}</span>}
                      </For>
                    </div>
                  </div>
                </A>
              )}
            </For>
          </section>
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
  const [heroSlideIndex, setHeroSlideIndex] = createSignal(0);

  createEffect(() => {
    const resolved = work();
    if (!resolved) return;

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
                        {renderMediaAsset(media)}
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

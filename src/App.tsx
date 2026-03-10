import { A, Route, Router, useLocation, useParams } from "@solidjs/router";
import { For, Show, createEffect, createSignal, onCleanup } from "solid-js";
import type { JSX, ParentProps } from "solid-js";
import AdminPage from "./admin/AdminPage";
import type { CaseStudyBlock, RichTextSpan } from "./data/schema";
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
                  <img src={asset(realm.coverMedia.src)} alt={realm.coverMedia.alt} />
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
                <img src={asset(work.media[0].src)} alt={work.media[0].alt} />
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
              <img
                src={asset(resolvedRealm().coverMedia.src)}
                alt={resolvedRealm().coverMedia.alt}
              />
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
                    <img src={asset(work.media[0].src)} alt={work.media[0].alt} />
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

function renderImageFigure(
  block: Extract<CaseStudyBlock, { type: "image" }>,
): JSX.Element {
  return (
    <figure class="case-study-figure">
      <img src={asset(block.media.src)} alt={block.media.alt} />
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
}): JSX.Element {
  const nodes: JSX.Element[] = [];
  let imageGroup: Extract<CaseStudyBlock, { type: "image" }>[] = [];

  const flushImages = () => {
    if (imageGroup.length === 0) return;

    if (imageGroup.length === 1) {
      nodes.push(renderImageFigure(imageGroup[0]));
    } else {
      const galleryClass =
        imageGroup.length === 2
          ? "case-study-gallery-pair"
          : imageGroup.length === 3
            ? "case-study-gallery-triptych"
            : "case-study-gallery-grid";

      nodes.push(
        <div class={`case-study-gallery ${galleryClass}`}>
          <For each={imageGroup}>{(block) => renderImageFigure(block)}</For>
        </div>,
      );
    }

    imageGroup = [];
  };

  for (const block of section.blocks) {
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
      class={`case-study-section ${section.chapter ? "case-study-section-chapter" : ""}`}
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

    const timer = window.setInterval(() => {
      setHeroSlideIndex((current) => (current + 1) % slides.length);
    }, 4500);

    onCleanup(() => window.clearInterval(timer));
  });

  return (
    <Show when={work()} fallback={<NotFoundPage />}>
      {(resolvedWork) => {
        const realm = () => getRealmBySlug(resolvedWork().realmSlug);
        const related = () => getRelatedWorks(resolvedWork().slug);
        const heroSlides = () => resolvedWork().media.slice(0, 5);
        const caseStudySections = () => groupCaseStudyBlocks(displayBlocks());
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
                        <img src={asset(media.src)} alt={media.alt} />
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
                  <dl class="work-facts">
                    <div>
                      <dt>Year</dt>
                      <dd>{resolvedWork().year}</dd>
                    </div>
                    <div>
                      <dt>Medium</dt>
                      <dd>{resolvedWork().medium}</dd>
                    </div>
                  </dl>
                  <div class="work-tag-cluster">
                    <For each={resolvedWork().tags}>
                      {(tag) => <span>{tag}</span>}
                    </For>
                  </div>
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
                        <img src={asset(media.src)} alt={media.alt} />
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
                <div class="section-heading">
                  <p class="eyebrow">Nearby pieces</p>
                  <h2>Other works in Kate&apos;s orbit</h2>
                </div>
                <div class="featured-grid">
                  <For each={related()}>
                    {(item) => (
                      <A href={`/work/${item.slug}`} class="work-tile">
                        <img src={asset(item.media[0].src)} alt={item.media[0].alt} />
                        <div class="work-tile-copy">
                          <span>{item.year}</span>
                          <strong>{item.title}</strong>
                        </div>
                      </A>
                    )}
                  </For>
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

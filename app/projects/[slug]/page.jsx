import fs from "fs";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";
import { encodeAsset, getAdjacentProjects, getAllProjects, getProjectBySlug } from "@/lib/projects";
import SiteHeader from "@/components/site-header";

const IMAGE_EXTENSIONS = [".png", ".jpg", ".jpeg", ".webp", ".gif"];

function naturalSort(a, b) {
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });
}

function getProjectGallery(project, limit = 15) {
  const directory = path.join(process.cwd(), "public", project.mediaDir);
  if (!fs.existsSync(directory)) return [project.cover];

  const files = fs
    .readdirSync(directory)
    .filter((file) => IMAGE_EXTENSIONS.includes(path.extname(file).toLowerCase()))
    .sort(naturalSort)
    .map((file) => `/${path.posix.join(project.mediaDir, file).replace(/\\/g, "/")}`);

  return Array.from(new Set([project.cover, ...files])).slice(0, limit);
}

export async function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.title} — Kate Goncharova`,
    description: project.brief,
  };
}

export default async function ProjectCasePage({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const gallery = getProjectGallery(project);
  const { previous, next } = getAdjacentProjects(project.slug);

  return (
    <main className="min-h-screen bg-[#f6f5f1] text-black">
      <SiteHeader />

      <section className="mx-auto w-full max-w-[1400px] px-4 pb-8 pt-8 md:px-8">
        <p className="text-xs uppercase tracking-[0.14em] text-[#292929]">
          {project.year} · {project.discipline}
        </p>
        <a
          className="mt-3 inline-block text-[11px] uppercase tracking-[0.14em] text-[#292929] underline-offset-4 hover:underline"
          href={encodeAsset(project.archiveHtml)}
          target="_blank"
          rel="noreferrer"
        >
          Original archive
        </a>
        <h1 className="mt-3 text-[clamp(2.1rem,8vw,7rem)] font-black leading-[0.85] uppercase tracking-[-0.03em]">{project.title}</h1>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#292929] md:text-base">{project.brief}</p>
      </section>

      <section className="mx-auto w-full max-w-[1400px] px-4 md:px-8">
        <figure className="overflow-hidden rounded-[28px] border border-black/15 bg-white p-2 shadow-[0_14px_32px_rgba(0,0,0,0.12)]">
          <img className="h-[56vh] w-full rounded-[22px] object-cover md:h-[72vh]" src={encodeAsset(project.cover)} alt={project.title} />
        </figure>
      </section>

      <section className="mx-auto mt-6 grid w-full max-w-[1400px] gap-3 px-4 md:grid-cols-3 md:px-8">
        <article className="rounded-2xl border border-black/12 bg-[#e4e3dd] p-4">
          <p className="text-[11px] uppercase tracking-[0.14em] text-[#292929]">Scope</p>
          <p className="mt-2 text-sm text-[#292929]">{project.tags.join(" · ")}</p>
        </article>
        <article className="rounded-2xl border border-black/12 bg-[#ffcb41] p-4">
          <p className="text-[11px] uppercase tracking-[0.14em] text-[#292929]">Role</p>
          <p className="mt-2 text-sm text-[#292929]">Visual Marketing Designer</p>
        </article>
        <article className="rounded-2xl border border-black/12 bg-[#ff8fca] p-4">
          <p className="text-[11px] uppercase tracking-[0.14em] text-[#292929]">Focus</p>
          <p className="mt-2 text-sm text-[#292929]">Art direction, interface language, narrative rhythm.</p>
        </article>
      </section>

      <section className="mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-3 px-4 py-6 md:grid-cols-12 md:px-8">
        {gallery.map((image, index) => {
          const desktopClass = index % 5 === 0 ? "md:col-span-12" : index % 2 === 0 ? "md:col-span-7" : "md:col-span-5";
          return (
            <figure
              key={`${project.slug}-${image}`}
              className={`overflow-hidden rounded-2xl border border-black/12 bg-white p-2 ${desktopClass}`}
            >
              <img
                className={`w-full rounded-xl object-cover ${index % 5 === 0 ? "h-[58vh]" : "h-[40vh]"}`}
                src={encodeAsset(image)}
                alt={`${project.title} case study visual ${index + 1}`}
                loading="lazy"
              />
            </figure>
          );
        })}
      </section>

      <section className="mx-auto grid w-full max-w-[1400px] gap-3 px-4 pb-12 md:grid-cols-2 md:px-8">
        <Link
          href={`/projects/${previous.slug}`}
          className="rounded-2xl border border-black/15 bg-[#e4e3dd] p-4 transition hover:bg-[#dddbd2]"
        >
          <p className="text-[11px] uppercase tracking-[0.14em] text-[#292929]">Previous</p>
          <p className="mt-2 text-xl font-black uppercase leading-tight">{previous.title}</p>
        </Link>
        <Link href={`/projects/${next.slug}`} className="rounded-2xl border border-black/15 bg-[#e4e3dd] p-4 transition hover:bg-[#dddbd2]">
          <p className="text-[11px] uppercase tracking-[0.14em] text-[#292929]">Next</p>
          <p className="mt-2 text-xl font-black uppercase leading-tight">{next.title}</p>
        </Link>
      </section>
    </main>
  );
}

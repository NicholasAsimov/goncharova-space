import fs from "fs";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";
import { encodeAsset, getAdjacentProjects, getAllProjects, getProjectBySlug } from "@/lib/projects";

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
    <main className="min-h-screen bg-[#edece3] text-[#12310e]">
      <header className="sticky top-0 z-50 border-b border-[#d6d4c9] bg-[#edece3]/90 backdrop-blur-sm">
        <div className="mx-auto flex h-16 w-full max-w-[1400px] items-center justify-between px-4 md:px-8">
          <Link href="/" className="font-display text-xs uppercase tracking-[0.2em]">
            Kate Goncharova
          </Link>
          <div className="hidden items-center gap-5 md:flex">
            <Link className="text-xs uppercase tracking-[0.14em] text-[#4e6050] hover:text-[#12310e]" href="/#projects">
              All projects
            </Link>
            <a
              className="text-xs uppercase tracking-[0.14em] text-[#4e6050] hover:text-[#12310e]"
              href={encodeAsset(project.archiveHtml)}
              target="_blank"
              rel="noreferrer"
            >
              Original archive
            </a>
          </div>
        </div>
      </header>

      <section className="mx-auto w-full max-w-[1400px] px-4 pb-8 pt-8 md:px-8">
        <p className="text-xs uppercase tracking-[0.14em] text-[#607063]">
          {project.year} · {project.discipline}
        </p>
        <h1 className="mt-3 font-display text-[clamp(2.1rem,8vw,7rem)] leading-[0.85] uppercase">{project.title}</h1>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#3f5444] md:text-base">{project.brief}</p>
      </section>

      <section className="mx-auto w-full max-w-[1400px] px-4 md:px-8">
        <figure className="overflow-hidden rounded-[28px] border border-[#d2cfc3] bg-white/70 p-2 shadow-[0_12px_30px_rgba(20,40,20,0.08)]">
          <img className="h-[56vh] w-full rounded-[22px] object-cover md:h-[72vh]" src={encodeAsset(project.cover)} alt={project.title} />
        </figure>
      </section>

      <section className="mx-auto mt-6 grid w-full max-w-[1400px] gap-3 px-4 md:grid-cols-3 md:px-8">
        <article className="rounded-2xl border border-[#d2cfc3] bg-white/70 p-4">
          <p className="text-[11px] uppercase tracking-[0.14em] text-[#68786d]">Scope</p>
          <p className="mt-2 text-sm text-[#38503d]">{project.tags.join(" · ")}</p>
        </article>
        <article className="rounded-2xl border border-[#d2cfc3] bg-white/70 p-4">
          <p className="text-[11px] uppercase tracking-[0.14em] text-[#68786d]">Role</p>
          <p className="mt-2 text-sm text-[#38503d]">Visual Marketing Designer</p>
        </article>
        <article className="rounded-2xl border border-[#d2cfc3] bg-white/70 p-4">
          <p className="text-[11px] uppercase tracking-[0.14em] text-[#68786d]">Focus</p>
          <p className="mt-2 text-sm text-[#38503d]">Art direction, interface language, narrative rhythm.</p>
        </article>
      </section>

      <section className="mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-3 px-4 py-6 md:grid-cols-12 md:px-8">
        {gallery.map((image, index) => {
          const desktopClass = index % 5 === 0 ? "md:col-span-12" : index % 2 === 0 ? "md:col-span-7" : "md:col-span-5";
          return (
            <figure
              key={`${project.slug}-${image}`}
              className={`overflow-hidden rounded-2xl border border-[#d2cfc3] bg-white/70 p-2 ${desktopClass}`}
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
          className="rounded-2xl border border-[#d2cfc3] bg-white/70 p-4 transition hover:border-[#9bb39d]"
        >
          <p className="text-[11px] uppercase tracking-[0.14em] text-[#68786d]">Previous</p>
          <p className="mt-2 font-display text-xl uppercase leading-tight">{previous.title}</p>
        </Link>
        <Link href={`/projects/${next.slug}`} className="rounded-2xl border border-[#d2cfc3] bg-white/70 p-4 transition hover:border-[#9bb39d]">
          <p className="text-[11px] uppercase tracking-[0.14em] text-[#68786d]">Next</p>
          <p className="mt-2 font-display text-xl uppercase leading-tight">{next.title}</p>
        </Link>
      </section>
    </main>
  );
}

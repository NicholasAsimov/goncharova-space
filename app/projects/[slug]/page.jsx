import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import { getAdjacentProjects, getAllProjects, getProjectBySlug } from "@/lib/projects";
import ProjectCaseContent from "@/components/project-case-content";

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
      <ProjectCaseContent project={project} gallery={gallery} previous={previous} next={next} />
    </main>
  );
}

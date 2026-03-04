"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { encodeAsset } from "@/lib/projects";

const EASE_OUT_EXPO = [0.22, 1, 0.36, 1];

export default function ProjectCaseContent({ project, gallery, previous, next }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, ease: EASE_OUT_EXPO }}
    >
      <motion.section
        className="mx-auto w-full max-w-[1400px] px-4 pb-8 pt-8 md:px-8"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.08, ease: EASE_OUT_EXPO }}
      >
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
      </motion.section>

      <motion.section
        className="mx-auto w-full max-w-[1400px] px-4 md:px-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.72, delay: 0.14, ease: EASE_OUT_EXPO }}
      >
        <figure className="overflow-hidden rounded-[28px] border border-black/15 bg-white p-2 shadow-[0_14px_32px_rgba(0,0,0,0.12)]">
          <motion.img
            className="h-[56vh] w-full rounded-[22px] object-cover md:h-[72vh]"
            src={encodeAsset(project.cover)}
            alt={project.title}
            initial={{ opacity: 0.2, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
          />
        </figure>
      </motion.section>

      <motion.section
        className="mx-auto mt-6 grid w-full max-w-[1400px] gap-3 px-4 md:grid-cols-3 md:px-8"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.62, ease: EASE_OUT_EXPO }}
      >
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
      </motion.section>

      <section className="mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-3 px-4 py-6 md:grid-cols-12 md:px-8">
        {gallery.map((image, index) => {
          const desktopClass = index % 5 === 0 ? "md:col-span-12" : index % 2 === 0 ? "md:col-span-7" : "md:col-span-5";
          return (
            <motion.figure
              key={`${project.slug}-${image}`}
              className={`overflow-hidden rounded-2xl border border-black/12 bg-white p-2 ${desktopClass}`}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.22 }}
              transition={{ duration: 0.58, delay: Math.min(index * 0.03, 0.22), ease: EASE_OUT_EXPO }}
            >
              <img
                className={`w-full rounded-xl object-cover ${index % 5 === 0 ? "h-[58vh]" : "h-[40vh]"}`}
                src={encodeAsset(image)}
                alt={`${project.title} case study visual ${index + 1}`}
                loading="lazy"
              />
            </motion.figure>
          );
        })}
      </section>

      <motion.section
        className="mx-auto grid w-full max-w-[1400px] gap-3 px-4 pb-12 md:grid-cols-2 md:px-8"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.62, ease: EASE_OUT_EXPO }}
      >
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
      </motion.section>
    </motion.div>
  );
}

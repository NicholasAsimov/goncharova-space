"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { encodeAsset, getAllProjects } from "@/lib/projects";

const ALL_PROJECTS = getAllProjects();

const HERO_ART_SLUGS = [
  "curiverse",
  "onsual",
  "future-lab-merchandise",
  "finance-app",
  "firstmovr-colgate-palmolive",
  "experimental-poster-design",
];

const BRAND_COLORS = ["#fd1e1f", "#ff8fca", "#ffcb41", "#0015d4", "#e4e3dd", "#dddbd2"];
const EASE_OUT_EXPO = [0.22, 1, 0.36, 1];

const DEFAULT_FEATURED = ALL_PROJECTS.filter((project) =>
  [
    "social-media-projects",
    "spin-records-vinyl-website",
    "curiverse",
    "firstmovr-colgate-palmolive",
    "typographic-poster-designs",
    "elara-jewellery-website",
  ].includes(project.slug),
);

export function getProjectsBySlugs(slugs) {
  return slugs.map((slug) => ALL_PROJECTS.find((project) => project.slug === slug)).filter(Boolean);
}

export function HeroArtCloud({ slugs = HERO_ART_SLUGS, className = "" }) {
  const heroArt = useMemo(() => getProjectsBySlugs(slugs), [slugs]);

  return (
    <motion.div
      className={`relative h-[480px] w-full overflow-hidden rounded-[26px] border border-black/10 bg-white md:h-[620px] ${className}`}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.75, ease: EASE_OUT_EXPO }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,#ffcb41_0,transparent_30%),radial-gradient(circle_at_83%_20%,#ff8fca_0,transparent_33%),radial-gradient(circle_at_50%_92%,#0015d4_0,transparent_38%)] opacity-80" />
      <div className="absolute -left-14 -top-16 h-44 w-44 rounded-full bg-[#fd1e1f] blur-2xl" />
      <div className="absolute -bottom-14 right-4 h-52 w-52 rounded-full bg-[#ffcb41] blur-2xl" />

      {heroArt.map((project, index) => {
        const positions = [
          "left-[4%] top-[9%] w-[47%]",
          "right-[6%] top-[6%] w-[40%]",
          "left-[14%] top-[39%] w-[37%]",
          "right-[12%] top-[35%] w-[44%]",
          "left-[8%] bottom-[6%] w-[39%]",
          "right-[6%] bottom-[8%] w-[34%]",
        ];

        return (
          <motion.div
            key={project.slug}
            className={`absolute ${positions[index % positions.length]} art-float overflow-hidden rounded-2xl border border-black/15 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.2)]`}
            style={{ animationDelay: `${index * 250}ms` }}
            initial={{ opacity: 0, y: 20, scale: 0.94 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, delay: index * 0.06, ease: EASE_OUT_EXPO }}
          >
            <Link href={`/projects/${project.slug}`} className="block h-full w-full">
              <img
                src={encodeAsset(project.cover)}
                alt={project.title}
                className="h-full w-full object-cover transition duration-700 hover:scale-105"
              />
            </Link>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

export function WorkShowcase({
  projects = ALL_PROJECTS,
  title = "Tiny fraction of my work",
  id,
}) {
  const safeProjects = projects.length ? projects : ALL_PROJECTS;
  const [activeIndex, setActiveIndex] = useState(0);
  const active = safeProjects[activeIndex % safeProjects.length];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % safeProjects.length);
    }, 3400);

    return () => clearInterval(timer);
  }, [safeProjects.length]);

  return (
    <motion.section
      id={id}
      className="border-t border-black/10"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
    >
      <div className="mx-auto w-full max-w-[1500px] px-4 py-16 md:px-8 md:py-24">
        <motion.h2
          className="text-balance text-[clamp(2.1rem,5.2vw,5rem)] font-black uppercase leading-[0.92] tracking-[-0.03em] text-black"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.55 }}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
        >
          {title}
        </motion.h2>

        <motion.div
          className="mt-7 overflow-hidden rounded-full border border-black/20 bg-white py-2"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.62, delay: 0.05, ease: EASE_OUT_EXPO }}
        >
          <div className="marquee-track flex min-w-max items-center gap-2 px-2">
            {[...safeProjects, ...safeProjects].map((project, idx) => (
              <span
                key={`${project.slug}-${idx}`}
                className="rounded-full border border-black/15 bg-[#f6f5f1] px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.16em] text-[#292929]"
              >
                {project.title}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="mt-6 grid gap-4 lg:grid-cols-12"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
        >
          <Link
            href={`/projects/${active.slug}`}
            className="group relative block overflow-hidden rounded-[24px] border border-black/20 bg-black lg:col-span-8"
          >
            <motion.img
              key={active.slug}
              src={encodeAsset(active.cover)}
              alt={active.title}
              className="h-[44vh] w-full object-cover transition duration-700 group-hover:scale-[1.03] md:h-[62vh]"
              initial={{ opacity: 0.2, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.52, ease: EASE_OUT_EXPO }}
            />
            <div className="absolute inset-x-0 bottom-0 border-t border-white/25 bg-black/70 px-5 py-4 backdrop-blur-sm md:px-6">
              <p className="text-[10px] uppercase tracking-[0.18em] text-[#e7e7df]">{active.year} · {active.discipline}</p>
              <p className="mt-1 text-xl font-black uppercase tracking-[-0.01em] text-[#f6f5f1] md:text-3xl">{active.title}</p>
            </div>
          </Link>

          <aside className="max-h-[62vh] overflow-auto rounded-[24px] border border-black/15 bg-white lg:col-span-4">
            {safeProjects.map((project, index) => {
              const isActive = index === activeIndex;
              return (
                <Link
                  key={project.slug}
                  href={`/projects/${project.slug}`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  className={`group flex items-center justify-between gap-3 border-b border-black/8 px-4 py-3 text-[11px] uppercase tracking-[0.13em] transition md:px-5 md:py-3.5 ${
                    isActive ? "bg-black text-[#f6f5f1]" : "text-[#292929] hover:bg-[#e4e3dd]"
                  }`}
                >
                  <span className="max-w-[80%] overflow-hidden text-ellipsis whitespace-nowrap">{project.title}</span>
                  <span className={`text-[10px] ${isActive ? "text-[#dddbd2]" : "text-[#555]"}`}>{project.year}</span>
                </Link>
              );
            })}
          </aside>
        </motion.div>
      </div>
    </motion.section>
  );
}

export function FeaturedCards({ projects = DEFAULT_FEATURED, id }) {
  return (
    <motion.section
      id={id}
      className="border-t border-black/10"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
    >
      <div className="mx-auto w-full max-w-[1500px] px-4 py-16 md:px-8 md:py-20">
        <div className="grid gap-4 lg:grid-cols-2">
          {projects.map((project, index) => {
            const bg = BRAND_COLORS[index % BRAND_COLORS.length];
            const dark = bg === "#0015d4" || bg === "#fd1e1f";

            return (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, delay: (index % 2) * 0.08, ease: EASE_OUT_EXPO }}
              >
                <Link
                  href={`/projects/${project.slug}`}
                  className="group grid overflow-hidden rounded-[26px] border border-black/15 md:grid-cols-[1.2fr_1fr]"
                  style={{ backgroundColor: bg }}
                >
                  <figure className="relative min-h-[220px] overflow-hidden border-b border-black/10 md:min-h-[280px] md:border-b-0 md:border-r">
                    <img
                      src={encodeAsset(project.cover)}
                      alt={project.title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                    />
                  </figure>

                  <div className="flex flex-col justify-between p-4 md:p-5">
                    <div>
                      <p className={`text-[10px] uppercase tracking-[0.16em] ${dark ? "text-white/85" : "text-black/70"}`}>
                        {project.year} · {project.discipline}
                      </p>
                      <h3
                        className={`mt-2 text-[clamp(1.3rem,2.5vw,2.2rem)] font-black uppercase leading-[0.92] tracking-[-0.02em] ${
                          dark ? "text-white" : "text-black"
                        }`}
                      >
                        {project.title}
                      </h3>
                      <p className={`mt-2 text-sm leading-relaxed ${dark ? "text-white/88" : "text-black/76"}`}>{project.brief}</p>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={`${project.slug}-${tag}`}
                          className={`rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] ${
                            dark ? "border-white/35 text-white" : "border-black/20 text-black"
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}

export function GardenMosaic() {
  const projects = ALL_PROJECTS;

  return (
    <motion.section
      className="border-t border-black/10"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
    >
      <div className="mx-auto w-full max-w-[1500px] px-4 py-16 md:px-8 md:py-24">
        <motion.div
          className="mb-8 flex items-end justify-between gap-4"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.65, ease: EASE_OUT_EXPO }}
        >
          <h2 className="text-[clamp(2rem,5vw,4.8rem)] font-black uppercase leading-[0.9] tracking-[-0.03em] text-black">
            Garden
          </h2>
          <p className="text-[11px] uppercase tracking-[0.18em] text-[#292929]">color studies + experiments</p>
        </motion.div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {projects.map((project, index) => {
            const accent = BRAND_COLORS[index % BRAND_COLORS.length];
            return (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: (index % 8) * 0.035, ease: EASE_OUT_EXPO }}
              >
                <Link href={`/projects/${project.slug}`} className="group overflow-hidden rounded-2xl border border-black/15 bg-white">
                  <figure className="relative overflow-hidden">
                    <img
                      src={encodeAsset(project.cover)}
                      alt={project.title}
                      className="h-52 w-full object-cover transition duration-700 group-hover:scale-105 md:h-60"
                    />
                    <div
                      className="absolute left-2 top-2 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-black"
                      style={{ backgroundColor: accent }}
                    >
                      {project.year}
                    </div>
                  </figure>
                  <div className="border-t border-black/10 p-3">
                    <p className="text-[11px] uppercase tracking-[0.12em] text-[#292929]">{project.title}</p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}

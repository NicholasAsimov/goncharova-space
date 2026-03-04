"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import TopNav from "@/components/top-nav";
import { encodeAsset, getAllProjects } from "@/lib/projects";

const EASE_OUT_EXPO = [0.22, 1, 0.36, 1];

const WORK_SLUGS = [
  "firstmovr-colgate-palmolive",
  "curiverse",
  "linn-plakat-event-app",
  "onsual",
];

const SECONDARY_THUMBS = {
  "firstmovr-colgate-palmolive":
    "/resources/notion_portfolio/Portfolio - Kate/Projects/Firstmovr x Colgate-Palmolive/image 3.png",
  curiverse: "/resources/notion_portfolio/Portfolio - Kate/Projects/CuriVerse/image 4.png",
  "linn-plakat-event-app": "/resources/notion_portfolio/Portfolio - Kate/Projects/Linn Plakat - event app/new_pe.png",
  onsual: "/resources/notion_portfolio/Portfolio - Kate/Projects/Onsual/image 2.png",
};

const TILE_COLORS = ["#1336ff", "#f98bd0", "#ffc93d", "#1336ff"];
const FLOWER_STYLES = [
  { petal: "#ffd84d", center: "#ff3b30" },
  { petal: "#1336ff", center: "#ffffff" },
  { petal: "#ff3b30", center: "#ffd84d" },
  { petal: "#ffd84d", center: "#ff3b30" },
];
const CARD_LAYOUTS = [
  {
    main: "absolute right-[4%] top-[10%] h-[78%] w-[63%] rounded-[10px] object-cover",
    side: "absolute left-[8%] top-[12%] h-[76%] w-[43%] -rotate-[8deg] rounded-[10px] object-cover border border-black/10 shadow-[0_8px_20px_rgba(0,0,0,0.14)]",
  },
  {
    main: "absolute left-[7%] top-[10%] h-[78%] w-[65%] rounded-[10px] object-cover",
    side: "absolute right-[8%] top-[15%] h-[74%] w-[41%] rotate-[7deg] rounded-[10px] object-cover border border-black/10 shadow-[0_8px_20px_rgba(0,0,0,0.14)]",
  },
  {
    main: "absolute right-[7%] top-[11%] h-[77%] w-[64%] rounded-[10px] object-cover",
    side: "absolute left-[10%] top-[16%] h-[69%] w-[39%] -rotate-[6deg] rounded-[10px] object-cover border border-black/10 shadow-[0_8px_20px_rgba(0,0,0,0.14)]",
  },
  {
    main: "absolute left-[6%] top-[11%] h-[78%] w-[63%] rounded-[10px] object-cover",
    side: "absolute right-[9%] top-[13%] h-[71%] w-[41%] rotate-[6deg] rounded-[10px] object-cover border border-black/10 shadow-[0_8px_20px_rgba(0,0,0,0.14)]",
  },
];

function FlowerGlyph({ petal = "#ffd84d", center = "#ff5a46" }) {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
      <circle cx="12" cy="4.5" r="3.1" fill={petal} />
      <circle cx="17.2" cy="7.2" r="3.1" fill={petal} />
      <circle cx="18" cy="12" r="3.1" fill={petal} />
      <circle cx="17.2" cy="16.8" r="3.1" fill={petal} />
      <circle cx="12" cy="19.5" r="3.1" fill={petal} />
      <circle cx="6.8" cy="16.8" r="3.1" fill={petal} />
      <circle cx="6" cy="12" r="3.1" fill={petal} />
      <circle cx="6.8" cy="7.2" r="3.1" fill={petal} />
      <circle cx="12" cy="12" r="2.1" fill={center} />
    </svg>
  );
}

export default function WorksPage() {
  const projects = WORK_SLUGS.map((slug) => getAllProjects().find((project) => project.slug === slug)).filter(Boolean);

  return (
    <main className="min-h-screen bg-[#e9e8e5] text-black">
      <TopNav />

      <section className="mx-auto w-full max-w-[920px] px-4 pb-20 pt-10 md:pt-14">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: EASE_OUT_EXPO }}
        >
          <h1 className="font-serif text-[clamp(2.35rem,4.8vw,3.35rem)] leading-[0.92] tracking-[-0.03em] text-[#1e1e1e]">
            Tiny fraction of my work
          </h1>
          <p className="mt-2 font-serif text-[20px] leading-[1.22] text-[#4e4e49] md:text-[20px]">
            Teaming with founders to propel their next product breakthrough, design that is functional and beautiful.
          </p>
        </motion.div>

        <div className="mt-5 space-y-3">
          {projects.map((project, index) => (
            <motion.article
              key={project.slug}
              className={`grid items-stretch gap-[14px] ${
                index % 2 === 0 ? "grid-cols-[1fr_140px]" : "grid-cols-[140px_1fr]"
              }`}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.32 }}
              transition={{ duration: 0.62, delay: index * 0.04, ease: EASE_OUT_EXPO }}
            >
              <Link
                href={`/projects/${project.slug}`}
                className={`group overflow-hidden rounded-[16px] border border-black/8 bg-[#ecebe7] p-1.5 transition hover:border-black/20 ${
                  index % 2 === 0 ? "" : "col-start-2"
                }`}
              >
                <div className="relative aspect-[2.2/1] overflow-hidden rounded-[11px] bg-[#dddcd6]">
                  <div className="absolute inset-0 bg-gradient-to-b from-white/35 to-black/5" />
                  <img
                    src={encodeAsset(project.cover)}
                    alt={project.title}
                    className={`${CARD_LAYOUTS[index % CARD_LAYOUTS.length].main} transition duration-700 group-hover:scale-[1.02]`}
                  />
                  <img
                    src={encodeAsset(SECONDARY_THUMBS[project.slug] ?? project.cover)}
                    alt=""
                    aria-hidden="true"
                    className={CARD_LAYOUTS[index % CARD_LAYOUTS.length].side}
                  />
                </div>
                <div className="px-1 pb-0.5 pt-1.5">
                  <p className="text-[11.5px] tracking-[-0.01em] text-[#2d2d2b]">{project.title}</p>
                  <p className="text-[8.6px] uppercase tracking-[0.12em] text-[#908f89]">{project.discipline}</p>
                </div>
              </Link>

              <div className={`grid grid-rows-[140px_140px] gap-[14px] ${index % 2 === 0 ? "" : "col-start-1 row-start-1"}`}>
                <div
                  className="flex items-center justify-center rounded-[18px]"
                  style={{ backgroundColor: TILE_COLORS[index % TILE_COLORS.length] }}
                >
                  <FlowerGlyph
                    petal={FLOWER_STYLES[index % FLOWER_STYLES.length].petal}
                    center={FLOWER_STYLES[index % FLOWER_STYLES.length].center}
                  />
                </div>
                <div className="rounded-[18px] border border-black/6 bg-[#efeee9]" />
              </div>
            </motion.article>
          ))}
        </div>

        <motion.p
          className="mt-7 flex items-center justify-center gap-2 text-[9px] tracking-[0.03em] text-[#8a8984]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.85 }}
          transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
        >
          <span className="text-[#ff4a43]">✿</span>
          More to come soon...
        </motion.p>
      </section>
    </main>
  );
}

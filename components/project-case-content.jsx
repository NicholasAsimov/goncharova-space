"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { encodeAsset } from "@/lib/projects";
import TopNav from "@/components/top-nav";

const EASE_OUT_EXPO = [0.22, 1, 0.36, 1];

function CaseFrame({ src, alt, className = "", imageClassName = "", delay = 0 }) {
  return (
    <motion.figure
      className={`overflow-hidden rounded-[20px] border border-black/12 bg-[#e8e7e2] p-2 ${className}`}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.62, delay, ease: EASE_OUT_EXPO }}
    >
      <img src={encodeAsset(src)} alt={alt} loading="lazy" className={`h-full w-full rounded-[14px] bg-[#e8e7e2] object-contain ${imageClassName}`} />
    </motion.figure>
  );
}

export default function ProjectCaseContent({ project, gallery, previous, next }) {
  const visuals = Array.from(new Set([project.cover, ...gallery]));
  const heroMain = visuals[0];
  const heroStack = visuals.slice(1, 3);
  const infoVisual = visuals[3] ?? heroMain;
  const storyVisuals = visuals.slice(4);

  const groups = [];
  for (let index = 0; index < storyVisuals.length; index += 3) {
    groups.push({
      lead: storyVisuals[index],
      pair: storyVisuals.slice(index + 1, index + 3),
    });
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}>
      <TopNav />

      <motion.section
        className="mx-auto w-full max-w-[1020px] px-4 pb-7 pt-6 md:px-8 md:pt-10"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.68, ease: EASE_OUT_EXPO }}
      >
        <div className="grid gap-6 border-b border-black/10 pb-7 md:grid-cols-[1.12fr_0.88fr] md:pb-8">
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] text-[#5f5f5b]">{project.year} · {project.discipline}</p>
            <h1 className="mt-3 text-balance font-serif text-[clamp(2rem,6vw,4.5rem)] leading-[0.92] tracking-[-0.02em] text-black">
              {project.title}
            </h1>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={`${project.slug}-${tag}`} className="rounded-full border border-black/15 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-[#292929]">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-4 md:pt-1">
            <p className="text-sm leading-relaxed text-[#3b3b38] md:text-[15px]">{project.brief}</p>
            <a
              className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-[#292929] underline-offset-4 hover:underline"
              href={encodeAsset(project.archiveHtml)}
              target="_blank"
              rel="noreferrer"
            >
              Open original archive
            </a>
          </div>
        </div>
      </motion.section>

      <section className="mx-auto w-full max-w-[1020px] px-4 md:px-8">
        <div className="grid gap-4 md:grid-cols-[1.62fr_1fr]">
          <CaseFrame
            src={heroMain}
            alt={`${project.title} hero`}
            className="aspect-[16/10] md:aspect-[16/9]"
            imageClassName="h-full w-full"
            delay={0.05}
          />

          <div className="grid gap-4">
            {heroStack.map((image, index) => (
              <CaseFrame
                key={`${project.slug}-hero-side-${image}`}
                src={image}
                alt={`${project.title} preview ${index + 1}`}
                className="aspect-[16/9]"
                imageClassName="h-full w-full"
                delay={0.1 + index * 0.05}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto mt-4 w-full max-w-[1020px] px-4 md:px-8">
        <div className="grid gap-4 md:grid-cols-[0.92fr_1.08fr]">
          <motion.article
            className="rounded-[20px] border border-black/12 bg-white p-5 md:p-6 md:min-h-[220px]"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.62, ease: EASE_OUT_EXPO }}
          >
            <p className="text-[10px] uppercase tracking-[0.16em] text-[#686864]">Case Study Notes</p>
            <p className="mt-3 font-serif text-[26px] leading-[1.2] tracking-[-0.01em] text-black md:text-[30px]">
              Design that is clear, emotional, and impossible to ignore.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-[#3b3b38] md:text-[15px]">
              This project explores brand narrative through composition rhythm, content hierarchy, and visual consistency across touchpoints.
            </p>
          </motion.article>

          <CaseFrame src={infoVisual} alt={`${project.title} detail`} className="aspect-[16/9]" imageClassName="h-full w-full" delay={0.1} />
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1020px] px-4 pb-10 pt-4 md:px-8 md:pb-14">
        <div className="space-y-4">
          {groups.map((group, groupIndex) => (
            <div key={`${project.slug}-group-${groupIndex}`} className="space-y-4">
              <CaseFrame
                src={group.lead}
                alt={`${project.title} visual ${groupIndex * 3 + 5}`}
                className={groupIndex % 2 === 0 ? "aspect-[16/9]" : "aspect-[16/10]"}
                imageClassName="h-full w-full"
                delay={0.02}
              />

              {group.pair.length > 0 && (
                <div className={`grid gap-4 ${group.pair.length === 1 ? "grid-cols-1" : "md:grid-cols-2"}`}>
                  {group.pair.map((image, imageIndex) => (
                    <CaseFrame
                      key={`${project.slug}-pair-${groupIndex}-${image}`}
                      src={image}
                      alt={`${project.title} visual ${groupIndex * 3 + imageIndex + 6}`}
                      className="aspect-[16/10]"
                      imageClassName="h-full w-full"
                      delay={0.08 + imageIndex * 0.05}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <motion.section
        className="mx-auto w-full max-w-[1020px] px-4 pb-14 md:px-8 md:pb-20"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.68, ease: EASE_OUT_EXPO }}
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Link href={`/projects/${previous.slug}`} className="group relative min-h-[220px] overflow-hidden rounded-[22px] border border-black/15">
            <img
              src={encodeAsset(previous.cover)}
              alt={previous.title}
              className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/38 to-black/10" />
            <div className="relative flex h-full flex-col justify-between p-5 text-white md:p-6">
              <p className="text-[10px] uppercase tracking-[0.16em] text-white/80">Previous Project</p>
              <div>
                <p className="font-serif text-[clamp(1.4rem,2.5vw,2rem)] leading-tight tracking-[-0.01em]">{previous.title}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.14em] text-white/85">← explore</p>
              </div>
            </div>
          </Link>

          <Link href={`/projects/${next.slug}`} className="group relative min-h-[220px] overflow-hidden rounded-[22px] border border-black/15">
            <img
              src={encodeAsset(next.cover)}
              alt={next.title}
              className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/38 to-black/10" />
            <div className="relative flex h-full flex-col justify-between p-5 text-white md:p-6">
              <p className="text-[10px] uppercase tracking-[0.16em] text-white/80">Next Project</p>
              <div className="text-right">
                <p className="font-serif text-[clamp(1.4rem,2.5vw,2rem)] leading-tight tracking-[-0.01em]">{next.title}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.14em] text-white/85">explore →</p>
              </div>
            </div>
          </Link>
        </div>
      </motion.section>
    </motion.div>
  );
}

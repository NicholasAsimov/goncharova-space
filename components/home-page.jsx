"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { encodeAsset, getAllProjects } from "@/lib/projects";
import TopNav from "@/components/top-nav";

const PROJECTS = getAllProjects();

const HOME_MARQUEE = PROJECTS.filter((project) =>
  [
    "firstmovr-colgate-palmolive",
    "social-media-projects",
    "future-lab-merchandise",
    "typographic-poster-designs",
    "experimental-poster-design",
    "moremoneymorelove-email-newsletter",
    "spin-records-vinyl-website",
    "finance-app",
    "curiverse",
    "onsual",
    "linn-plakat-event-app",
    "elara-jewellery-website",
  ].includes(project.slug),
);

const EASE_OUT_EXPO = [0.22, 1, 0.36, 1];

function RainbowMark() {
  return (
    <svg viewBox="0 0 56 36" className="mx-auto h-7 w-10" fill="none" aria-hidden="true">
      <path d="M6 30C6 17.85 15.85 8 28 8C40.15 8 50 17.85 50 30" stroke="#ff3b30" strokeWidth="4" strokeLinecap="round" />
      <path d="M14 30C14 22.27 20.27 16 28 16C35.73 16 42 22.27 42 30" stroke="#ff3b30" strokeWidth="4" strokeLinecap="round" />
      <path d="M22 30C22 26.68 24.68 24 28 24C31.32 24 34 26.68 34 30" stroke="#ff3b30" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

function BagMark() {
  return (
    <svg viewBox="0 0 32 32" className="mx-auto h-14 w-14" fill="none" aria-hidden="true">
      <path d="M8 11H24L22 26H10L8 11Z" stroke="#ff3b30" strokeWidth="2" strokeLinejoin="round" />
      <path d="M12 11V9.5C12 7.57 13.57 6 15.5 6H16.5C18.43 6 20 7.57 20 9.5V11" stroke="#ff3b30" strokeWidth="2" />
      <path d="M12 16H20" stroke="#ff3b30" strokeWidth="2" strokeLinecap="round" />
      <path d="M16 14V18" stroke="#ff3b30" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function PreviewStrip() {
  const trackItems = [...HOME_MARQUEE, ...HOME_MARQUEE];
  const [ratios, setRatios] = useState({});

  const onImageLoad = (imageKey) => (event) => {
    const { naturalWidth, naturalHeight } = event.currentTarget;
    if (!naturalWidth || !naturalHeight) return;
    const nextRatio = naturalWidth / naturalHeight;

    setRatios((current) => {
      if (current[imageKey] === nextRatio) return current;
      return { ...current, [imageKey]: nextRatio };
    });
  };

  return (
    <motion.section
      className="relative pb-12 md:pb-16"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.75, ease: EASE_OUT_EXPO }}
    >
      <div className="relative mx-auto mt-4 w-full overflow-hidden md:mt-8">
        <div className="marquee-track flex w-max gap-3 pl-2 md:gap-4 md:pl-4">
          {trackItems.map((project, idx) => (
            (() => {
              const imageKey = project.cover;
              const ratio = ratios[imageKey] ?? 1.35;
              return (
            <Link
              key={`${project.slug}-${idx}`}
              href={`/projects/${project.slug}`}
              className="group relative h-[210px] w-[calc(210px*var(--ratio))] shrink-0 overflow-hidden rounded-[16px] bg-[#d7d7d7] md:h-[248px] md:w-[calc(248px*var(--ratio))]"
              style={{ "--ratio": ratio }}
            >
              <img
                src={encodeAsset(project.cover)}
                alt={project.title}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                onLoad={onImageLoad(imageKey)}
              />
            </Link>
              );
            })()
          ))}
        </div>
      </div>
    </motion.section>
  );
}

export default function HomePage() {
  return (
    <main className="overflow-x-clip bg-[#e9e8e5] text-black">
      <section className="relative">
        <TopNav animated />

        <motion.div
          className="pointer-events-none absolute -left-[132px] top-[164px] w-[360px] sm:-left-[104px] sm:w-[460px] md:-left-[44px] md:top-[146px] md:w-[592px]"
          aria-hidden="true"
          initial={{ opacity: 0, x: -80, scale: 0.94 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1.05, delay: 0.12, ease: EASE_OUT_EXPO }}
        >
          <img src="/resources/reference/flower-blue.svg" alt="" className="h-auto w-full" />
        </motion.div>
        <motion.div
          className="pointer-events-none absolute -right-[132px] top-[162px] w-[360px] sm:-right-[104px] sm:w-[460px] md:-right-[44px] md:top-[144px] md:w-[592px]"
          aria-hidden="true"
          initial={{ opacity: 0, x: 80, scale: 0.94 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1.05, delay: 0.12, ease: EASE_OUT_EXPO }}
        >
          <img src="/resources/reference/flower-red.svg" alt="" className="h-auto w-full" />
        </motion.div>

        <motion.div
          className="relative z-10 mx-auto mt-10 w-full max-w-[600px] px-5 text-center md:mt-11"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.1, delayChildren: 0.2 },
            },
          }}
        >
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.65, ease: EASE_OUT_EXPO }}>
            <RainbowMark />
          </motion.div>
          <motion.p
            className="mt-2 text-[18px] font-medium tracking-[-0.03em]"
            variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.65, ease: EASE_OUT_EXPO }}
          >
            Hi, I&apos;m Kate
          </motion.p>

          <motion.h1
            className="mt-3 font-serif text-[44px] leading-[1.05] tracking-[-0.6px] text-black sm:text-[52px] sm:leading-[1.06] md:text-[56px] md:leading-[1.08] xl:text-[60px] xl:leading-[70px] xl:tracking-[-0.8px]"
            variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
          >
            Visual and
            <br />
            Product designer
            <br />
            <span className="whitespace-nowrap">you can count on</span>
          </motion.h1>

          <motion.p
            className="mx-auto mt-5 max-w-[522px] text-[16px] leading-[1.4] tracking-[-0.03em] text-[#444] sm:text-[18px]"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
          >
            Simplicity is my superpower. I turn complex ideas into
            <br className="hidden md:block" />
            experiences users love and investors trust. I help SaaS, AI, and
            <br className="hidden md:block" />
            Dev founders craft story-driven brands and products.
          </motion.p>

          <motion.div
            className="mx-auto mt-6 h-px w-full max-w-[600px] border-t border-dashed border-black/14"
            variants={{ hidden: { opacity: 0, scaleX: 0.84 }, visible: { opacity: 1, scaleX: 1 } }}
            transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
          />

          <motion.a
            href="mailto:ekaterinagoncharovaa@gmail.com"
            className="mt-7 inline-flex min-w-[158px] items-center justify-center rounded-[24px] bg-black px-5 py-[9px] text-[18px] font-medium leading-[1.4] text-white transition hover:opacity-85"
            variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.65, ease: EASE_OUT_EXPO }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            Chat with me
          </motion.a>

          <motion.div
            className="mt-16"
            variants={{ hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.72, ease: EASE_OUT_EXPO }}
          >
            <BagMark />
            <p className="mt-2 font-serif text-[24px] leading-[36px] tracking-[-0.4px]">Step into my digital home</p>
          </motion.div>
        </motion.div>
      </section>

      <PreviewStrip />
    </main>
  );
}

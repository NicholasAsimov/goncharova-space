"use client";

import Link from "next/link";
import { encodeAsset, getAllProjects } from "@/lib/projects";

const PROJECTS = getAllProjects();

const HOME_PREVIEWS = PROJECTS.filter((project) =>
  [
    "social-media-projects",
    "spin-records-vinyl-website",
    "finance-app",
    "curiverse",
    "onsual",
    "firstmovr-colgate-palmolive",
  ].includes(project.slug),
);

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

function HomeHeader() {
  return (
    <header className="pt-8 md:pt-9">
      <div className="mx-auto flex w-full max-w-[340px] items-center justify-center gap-7 text-[22px] leading-none text-[#ff3b30] md:gap-8">
        <Link href="/works" className="text-sm font-medium lowercase tracking-[-0.01em] hover:opacity-70">
          works
        </Link>

        <Link href="/" className="font-script text-[56px] lowercase leading-[0.7] tracking-[-0.05em] hover:opacity-70" aria-label="home">
          kate
        </Link>

        <Link href="/garden" className="text-sm font-medium lowercase tracking-[-0.01em] hover:opacity-70">
          garden
        </Link>
      </div>
    </header>
  );
}

function PreviewStrip() {
  return (
    <section className="relative border-t border-black/10 bg-black pt-0 pb-10 md:pb-16">
      <div className="mx-auto -mt-8 w-full max-w-[1540px] px-2 md:-mt-10 md:px-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {HOME_PREVIEWS.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group overflow-hidden rounded-[16px] border border-white/10 bg-[#1d1d1d]"
            >
              <img
                src={encodeAsset(project.cover)}
                alt={project.title}
                className="h-[190px] w-full object-cover transition duration-700 group-hover:scale-105 md:h-[210px]"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <main className="overflow-x-clip bg-[#e9e8e5] text-black">
      <section className="relative min-h-[96svh]">
        <HomeHeader />

        <div
          className="pointer-events-none absolute -left-[132px] top-[164px] w-[360px] sm:-left-[104px] sm:w-[460px] md:-left-[44px] md:top-[146px] md:w-[592px]"
          aria-hidden="true"
        >
          <img src="/resources/reference/flower-blue.svg" alt="" className="h-auto w-full" />
        </div>
        <div
          className="pointer-events-none absolute -right-[132px] top-[162px] w-[360px] sm:-right-[104px] sm:w-[460px] md:-right-[44px] md:top-[144px] md:w-[592px]"
          aria-hidden="true"
        >
          <img src="/resources/reference/flower-red.svg" alt="" className="h-auto w-full" />
        </div>

        <div className="relative z-10 mx-auto mt-10 w-full max-w-[600px] px-5 text-center md:mt-11">
          <RainbowMark />
          <p className="mt-2 text-[18px] font-medium tracking-[-0.03em]">Hi, I&apos;m Kate</p>

          <h1 className="mt-3 font-serif text-[44px] leading-[1.05] tracking-[-0.6px] text-black sm:text-[52px] sm:leading-[1.06] md:text-[56px] md:leading-[1.08] xl:text-[60px] xl:leading-[70px] xl:tracking-[-0.8px]">
            Visual and
            <br />
            Product designer
            <br />
            <span className="whitespace-nowrap">you can count on</span>
          </h1>

          <p className="mx-auto mt-5 max-w-[522px] text-[16px] leading-[1.4] tracking-[-0.03em] text-[#444] sm:text-[18px]">
            Simplicity is my superpower. I turn complex ideas into
            <br className="hidden md:block" />
            experiences users love and investors trust. I help SaaS, AI, and
            <br className="hidden md:block" />
            Dev founders craft story-driven brands and products.
          </p>

          <div className="mx-auto mt-6 h-px w-full max-w-[600px] border-t border-dashed border-black/14" />

          <a
            href="mailto:ekaterinagoncharovaa@gmail.com"
            className="mt-7 inline-flex min-w-[158px] items-center justify-center rounded-[24px] bg-black px-5 py-[9px] text-[18px] font-medium leading-[1.4] text-white transition hover:opacity-85"
          >
            Chat with me
          </a>

          <div className="mt-16">
            <BagMark />
            <p className="mt-2 font-serif text-[24px] leading-[36px] tracking-[-0.4px]">Step into my digital home</p>
          </div>
        </div>
      </section>

      <PreviewStrip />
    </main>
  );
}

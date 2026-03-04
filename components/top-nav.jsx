"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const EASE_OUT_EXPO = [0.22, 1, 0.36, 1];

export default function TopNav({ animated = false, className = "pt-8 md:pt-9" }) {
  const HeaderTag = animated ? motion.header : "header";
  const animationProps = animated
    ? {
        initial: { opacity: 0, y: -16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.7, ease: EASE_OUT_EXPO },
      }
    : {};

  return (
    <HeaderTag className={className} {...animationProps}>
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
    </HeaderTag>
  );
}

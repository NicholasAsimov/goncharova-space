"use client";

import dynamic from "next/dynamic";

const HomePageClient = dynamic(() => import("@/components/home-page"), {
  ssr: false,
});

export default function HomePageShell() {
  return <HomePageClient />;
}

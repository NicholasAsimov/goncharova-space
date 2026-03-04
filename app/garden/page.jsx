import SiteHeader from "@/components/site-header";
import { GardenMosaic, HeroArtCloud } from "@/components/work-sections";

export default function GardenPage() {
  return (
    <main className="min-h-screen bg-[#f6f5f1] text-black">
      <SiteHeader />

      <section className="mx-auto w-full max-w-[1500px] px-4 pb-12 pt-10 md:px-8 md:pt-16">
        <div className="grid items-end gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <p className="font-serif text-lg italic text-[#292929] md:text-2xl">Colorful experiments</p>
            <h1 className="mt-2 text-balance text-[clamp(2.7rem,7.6vw,8.2rem)] font-black uppercase leading-[0.85] tracking-[-0.04em] text-black">
              Garden of visual studies
            </h1>
            <p className="mt-4 max-w-3xl text-[clamp(1rem,1.25vw,1.2rem)] leading-relaxed text-[#292929]">
              A living board of art direction snapshots, composition tests, and visual energy pulled from Kate&apos;s case
              studies.
            </p>
          </div>

          <div className="lg:col-span-5">
            <HeroArtCloud className="md:h-[540px]" />
          </div>
        </div>
      </section>

      <GardenMosaic />
    </main>
  );
}

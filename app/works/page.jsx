import SiteHeader from "@/components/site-header";
import { FeaturedCards, WorkShowcase } from "@/components/work-sections";

export default function WorksPage() {
  return (
    <main className="min-h-screen bg-[#f6f5f1] text-black">
      <SiteHeader />
      <WorkShowcase id="works" title="All Works" />
      <FeaturedCards id="featured" />
    </main>
  );
}

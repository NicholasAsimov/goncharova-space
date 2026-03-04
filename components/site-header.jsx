import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-[#f6f5f1]/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 w-full max-w-[1500px] items-center justify-between px-4 md:h-16 md:px-8">
        <Link href="/" className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black">
          Kate Goncharova
        </Link>

        <nav className="flex items-center gap-4 text-[11px] uppercase tracking-[0.14em] text-[#292929] md:gap-6">
          <Link href="/" className="hover:opacity-70">
            home
          </Link>
          <Link href="/works" className="hover:opacity-70">
            works
          </Link>
          <Link href="/garden" className="hover:opacity-70">
            garden
          </Link>
        </nav>
      </div>
    </header>
  );
}

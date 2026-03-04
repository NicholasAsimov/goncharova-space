import Link from "next/link";
import { encodeAsset, getAllProjects } from "@/lib/projects";

const education = [
  {
    period: "2025 - Present",
    degree: "BA Communication and Media Science",
    school: "Corvinus University of Budapest",
  },
  {
    period: "2020 - 2023",
    degree: "MA Design and Technology",
    school: "Estonian Academy of Arts",
  },
  {
    period: "2014 - 2018",
    degree: "BA International Relations",
    school: "Tallinn University of Technology",
  },
];

const certificates = [
  {
    label: "Responsive Web Design (2024)",
    href: "https://www.freecodecamp.org/certification/kategonc/responsive-web-design",
  },
  {
    label: "UX Research Workshop: Navigating Research Biases (2024)",
    href: "https://credsverse.com/credentials/3c4213ea-9521-4e49-b82e-7b407dec8644",
  },
  {
    label: "IBM Design Thinking course (2023)",
    href: "https://www.credly.com/badges/095e2436-6481-4916-8e33-914493a0e936/public_url",
  },
  {
    label: "Introduction to User Interviews (2023)",
    href: "https://verified.sertifier.com/en/verify/58000514285591/",
  },
];

export default function HomePage() {
  const projects = getAllProjects();

  return (
    <main className="min-h-screen bg-[#edece3] text-[#12310e]">
      <header className="sticky top-0 z-50 border-b border-[#d6d4c9] bg-[#edece3]/90 backdrop-blur-sm">
        <div className="mx-auto flex h-16 w-full max-w-[1400px] items-center justify-between px-4 md:px-8">
          <Link href="/" className="font-display text-xs uppercase tracking-[0.2em]">
            Kate Goncharova
          </Link>
          <nav className="hidden items-center gap-5 md:flex">
            <a className="text-xs uppercase tracking-[0.14em] text-[#4e6050] hover:text-[#12310e]" href="#projects">
              Projects
            </a>
            <a className="text-xs uppercase tracking-[0.14em] text-[#4e6050] hover:text-[#12310e]" href="#about">
              About
            </a>
            <a className="text-xs uppercase tracking-[0.14em] text-[#4e6050] hover:text-[#12310e]" href="#education">
              Education
            </a>
            <a className="text-xs uppercase tracking-[0.14em] text-[#4e6050] hover:text-[#12310e]" href="#contact">
              Contact
            </a>
          </nav>
        </div>
      </header>

      <section className="mx-auto grid w-full max-w-[1400px] items-end gap-8 px-4 pb-10 pt-8 md:px-8 lg:min-h-[calc(100svh-64px)] lg:grid-cols-[1fr_380px] lg:pt-10">
        <div>
          <p className="font-script text-[clamp(1.4rem,3.4vw,2.8rem)] leading-[0.9] text-[#233f1d]">
            I design like it matters, because it does.
          </p>
          <h1 className="mt-3 font-display text-[clamp(2.4rem,8.8vw,8.4rem)] leading-[0.82] tracking-[-0.025em] uppercase">
            Visual
            <br />
            Marketing
            <br />
            Designer
            <br />
            UX/UI
            <br />
            AI-Driven
            <br />
            Design
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#3f5444] md:text-base">
            Visual marketing designer focused on expressive digital experiences where strategy, art direction and human
            clarity meet.
          </p>
        </div>

        <div className="relative">
          <div className="absolute -right-2 -top-2 h-20 w-20 rounded-full bg-[#42caed]" />
          <div className="absolute -bottom-3 -left-2 h-14 w-14 rounded-full bg-[#d10508]" />
          <figure className="relative overflow-hidden rounded-[28px] border border-[#d4d1c6] bg-white/70 p-2 shadow-[0_12px_30px_rgba(20,40,20,0.08)]">
            <img
              className="h-[420px] w-full rounded-[22px] object-cover sm:h-[520px]"
              src={encodeAsset(
                "/resources/notion_portfolio/Portfolio - Kate/22089172_805484206280387_8400206914532469237_n.jpg"
              )}
              alt="Ekaterina Goncharova portrait"
            />
          </figure>
        </div>
      </section>

      <section id="projects" className="mx-auto w-full max-w-[1400px] px-4 pb-8 md:px-8">
        <div className="mb-4 border-b border-[#cfcbbf] pb-3">
          <p className="font-display text-sm uppercase tracking-[0.12em]">Case studies</p>
        </div>

        <ul className="divide-y divide-[#cfcbbf] border-y border-[#cfcbbf]">
          {projects.map((project, index) => (
            <li key={project.slug}>
              <Link
                href={`/projects/${project.slug}`}
                className="group grid items-center gap-3 py-3 md:grid-cols-[56px_minmax(0,1fr)_220px_26px]"
              >
                <span className="text-xs uppercase tracking-[0.16em] text-[#6a786d]">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-display text-[clamp(1.1rem,2.4vw,2.4rem)] leading-[0.92] uppercase">{project.title}</h3>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-[#657569]">
                    {project.year} · {project.discipline}
                  </p>
                </div>
                <figure className="hidden overflow-hidden rounded-xl border border-[#d3d0c6] bg-white/70 md:block">
                  <img className="h-24 w-full object-cover transition duration-300 group-hover:scale-[1.04]" src={encodeAsset(project.cover)} alt="" />
                </figure>
                <span className="text-2xl leading-none text-[#6a786d] transition group-hover:translate-x-1 group-hover:text-[#12310e]">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section id="about" className="mx-auto grid w-full max-w-[1400px] gap-5 px-4 py-8 md:px-8 lg:grid-cols-2">
        <article className="rounded-3xl border border-[#d2cfc3] bg-white/70 p-6">
          <p className="text-xs uppercase tracking-[0.14em] text-[#5e6d61]">About</p>
          <h2 className="mt-3 font-display text-[clamp(1.8rem,4vw,3.4rem)] leading-[0.9] uppercase">
            Design that feels clear, emotional and impossible to ignore.
          </h2>
        </article>
        <article className="rounded-3xl border border-[#d2cfc3] bg-[#f4f2ea] p-6">
          <p className="text-sm leading-relaxed text-[#38503d]">
            I create visuals and product experiences that turn complex ideas into stories people instantly understand.
            My work spans UX/UI, brand systems and AI-assisted campaigns across startups, global events and innovation
            teams.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[#38503d]">
            The goal is always the same: make the experience memorable, useful and visually alive.
          </p>
        </article>
      </section>

      <section id="education" className="mx-auto grid w-full max-w-[1400px] gap-5 px-4 py-6 md:px-8 lg:grid-cols-2">
        <article className="rounded-3xl border border-[#d2cfc3] bg-white/70 p-6">
          <p className="text-xs uppercase tracking-[0.14em] text-[#5e6d61]">Education</p>
          <ul className="mt-4 space-y-3">
            {education.map((item) => (
              <li key={item.school} className="border-t border-[#d6d3c8] pt-3 first:border-t-0 first:pt-0">
                <p className="text-[11px] uppercase tracking-[0.14em] text-[#68786d]">{item.period}</p>
                <h3 className="mt-1 font-display text-lg leading-tight uppercase">{item.degree}</h3>
                <p className="mt-1 text-sm text-[#425948]">{item.school}</p>
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-3xl border border-[#d2cfc3] bg-[#f4f2ea] p-6">
          <p className="text-xs uppercase tracking-[0.14em] text-[#5e6d61]">Certificates</p>
          <ul className="mt-4 space-y-3">
            {certificates.map((item) => (
              <li key={item.label}>
                <a className="text-sm text-[#334b3a] underline underline-offset-4 hover:text-[#12310e]" href={item.href} target="_blank" rel="noreferrer">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section id="contact" className="mx-auto w-full max-w-[1400px] px-4 pb-14 pt-8 md:px-8">
        <div className="rounded-[36px] border border-[#d2cfc3] bg-[#0f250c] p-6 text-[#edece3] md:p-10">
          <p className="text-xs uppercase tracking-[0.14em] text-[#c6c4b8]">Available for collaborations and full-time roles</p>
          <h2 className="mt-3 max-w-[11ch] font-display text-[clamp(2rem,7vw,5.6rem)] leading-[0.86] uppercase">
            Let&apos;s create visual work people remember instantly.
          </h2>
          <a
            className="mt-5 inline-block text-[clamp(1.1rem,2.5vw,2.1rem)] underline decoration-[#788973] underline-offset-8"
            href="mailto:ekaterinagoncharovaa@gmail.com"
          >
            ekaterinagoncharovaa@gmail.com
          </a>
          <div className="mt-6 flex flex-wrap gap-2">
            <a
              className="rounded-full border border-[#485f44] px-4 py-2 text-xs uppercase tracking-[0.11em] text-[#d6d4c8] hover:border-[#8ea488]"
              href="https://www.linkedin.com/in/ekaterinagoncharova/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
            <a
              className="rounded-full border border-[#485f44] px-4 py-2 text-xs uppercase tracking-[0.11em] text-[#d6d4c8] hover:border-[#8ea488]"
              href="/resources/ekaterina_goncharova_cv.pdf"
              target="_blank"
              rel="noreferrer"
            >
              Resume PDF
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

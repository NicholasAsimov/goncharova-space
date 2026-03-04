const PROJECTS = [
  {
    title: "Social Media Projects",
    icon: "🧑🏼‍💻",
    image: "resources/notion_portfolio/Portfolio - Kate/Projects/Social Media Projects/2834c4e7-9605-4a34-824d-1fc06a1c8a14.png",
    caseStudy: "resources/notion_portfolio/Portfolio - Kate/Projects/Social Media Projects 313f27ef1ff780618a65cc147471906f.html",
    tags: ["Branding", "Social media"],
  },
  {
    title: "Spin Records - Vinyl Website",
    icon: "📀",
    image: "resources/notion_portfolio/Portfolio - Kate/Projects/Spin Records - Vinyl Website/image.png",
    caseStudy: "resources/notion_portfolio/Portfolio - Kate/Projects/Spin Records - Vinyl Website 310f27ef1ff78098865bfe0a372ee456.html",
    tags: ["Graphic design", "Website Design"],
  },
  {
    title: "Finance app",
    icon: "💵",
    image: "resources/notion_portfolio/Portfolio - Kate/Projects/Finance app/image.png",
    caseStudy: "resources/notion_portfolio/Portfolio - Kate/Projects/Finance app 310f27ef1ff780b78db8dae164b68a19.html",
    tags: ["UX/UI", "Application design"],
  },
  {
    title: "CuriVerse",
    icon: "🔮",
    image: "resources/notion_portfolio/Portfolio - Kate/Projects/CuriVerse/image.png",
    caseStudy: "resources/notion_portfolio/Portfolio - Kate/Projects/CuriVerse 30bf27ef1ff7807abb01fe3c9d99e29e.html",
    tags: ["UX/UI", "Application design", "Mobile app"],
  },
  {
    title: "Onsual",
    icon: "❇️",
    image: "resources/notion_portfolio/Portfolio - Kate/Projects/Onsual/image.png",
    caseStudy: "resources/notion_portfolio/Portfolio - Kate/Projects/Onsual 2c3f27ef1ff780debd52e557763365a5.html",
    tags: ["UX/UI", "Website Design", "iOS app"],
  },
  {
    title: "Firstmovr x Colgate-Palmolive",
    icon: "🦷",
    image: "resources/notion_portfolio/Portfolio - Kate/Projects/Firstmovr x Colgate-Palmolive/image 7.png",
    caseStudy: "resources/notion_portfolio/Portfolio - Kate/Projects/Firstmovr x Colgate-Palmolive 2c3f27ef1ff7809687c1d196a70be691.html",
    tags: ["AI Generation", "Branding", "Social media"],
  },
  {
    title: "Future Lab Merchandise",
    icon: "👕",
    image: "resources/notion_portfolio/Portfolio - Kate/Projects/Future Lab Merchandise/image.png",
    caseStudy: "resources/notion_portfolio/Portfolio - Kate/Projects/Future Lab Merchandise 2b5f27ef1ff780749668de1cc502ef97.html",
    tags: ["Branding"],
  },
  {
    title: "Typographic Poster Designs",
    icon: "👀",
    image: "resources/notion_portfolio/Portfolio - Kate/Projects/Typographic Poster Designs/Free_Poster_Frame_Mockup_2.jpg",
    caseStudy: "resources/notion_portfolio/Portfolio - Kate/Projects/Typographic Poster Designs 2b5f27ef1ff7802c8fcdc80f068b9cd0.html",
    tags: ["Graphic design"],
  },
  {
    title: "Experimental Poster Design",
    icon: "🔖",
    image: "resources/notion_portfolio/Portfolio - Kate/Projects/Experimental Poster Design/Posters-1.webp",
    caseStudy: "resources/notion_portfolio/Portfolio - Kate/Projects/Experimental Poster Design 210f27ef1ff78036b2dac812a478733a.html",
    tags: ["Midjourney", "Graphic design"],
  },
  {
    title: "MoreMoneyMoreLove (Email Newsletter)",
    icon: "📩",
    image: "resources/notion_portfolio/Portfolio - Kate/Projects/MoreMoneyMoreLove (Email Newsletter)/first.png",
    caseStudy: "resources/notion_portfolio/Portfolio - Kate/Projects/MoreMoneyMoreLove (Email Newsletter) 174f27ef1ff780738893f1ff60853fea.html",
    tags: ["Graphic design", "E-commerce"],
  },
  {
    title: "Linn Plakat - event app",
    icon: "🎪",
    image: "resources/notion_portfolio/Portfolio - Kate/Projects/Linn Plakat - event app/MAIN.png",
    caseStudy: "resources/notion_portfolio/Portfolio - Kate/Projects/Linn Plakat - event app 34999bc414ca4ae6b3a06be35d1edba0.html",
    tags: ["UX/UI", "Mobile app", "iOS app"],
  },
  {
    title: "Elara jewellery website",
    icon: "💍",
    image: "resources/notion_portfolio/Portfolio - Kate/Projects/Elara jewellery website/Main_ready.png",
    caseStudy: "resources/notion_portfolio/Portfolio - Kate/Projects/Elara jewellery website 4b5a8c6c92384a3380cfec06cd57074e.html",
    tags: ["UX/UI", "Website Design", "E-commerce"],
  },
  {
    title: "EduFlex-Code8 Hackathon",
    icon: "💡",
    image: "resources/notion_portfolio/Portfolio - Kate/Projects/EduFlex-Code8 Hackathon/Launchscreen_and_onboarding_(1).png",
    caseStudy: "resources/notion_portfolio/Portfolio - Kate/Projects/EduFlex-Code8 Hackathon faecb7aebd9f488e9f5b2eea7f4749e9.html",
    tags: ["UX/UI", "Mobile app", "Dashboard"],
  },
  {
    title: "The soul codes - Logo",
    icon: "〰️",
    image: "resources/notion_portfolio/Portfolio - Kate/Projects/The soul codes - Logo/the_soul_codes_mockup_list_(1).png",
    caseStudy: "resources/notion_portfolio/Portfolio - Kate/Projects/The soul codes - Logo 80a867de3757433ea1afb6782296ff97.html",
    tags: ["Graphic design", "Logo", "Social media"],
  },
];

const projectsRoot = document.getElementById("groups");

function asset(path) {
  return encodeURI(path);
}

function toneFor(tag) {
  const t = tag.toLowerCase();
  if (t.includes("social")) return "social";
  if (t.includes("branding")) return "branding";
  if (t.includes("graphic")) return "graphic";
  if (t.includes("ux/ui") || t.includes("ux")) return "ux";
  if (t.includes("app") || t.includes("ios")) return "app";
  if (t.includes("website") || t.includes("web")) return "web";
  if (t.includes("ai") || t.includes("midjourney")) return "ai";
  if (t.includes("dashboard")) return "dashboard";
  if (t.includes("logo")) return "logo";
  return "default";
}

function renderProjects() {
  projectsRoot.innerHTML = "";

  PROJECTS.forEach((project) => {
    const card = document.createElement("a");
    card.className = "project-card reveal";
    card.href = asset(project.caseStudy);
    card.setAttribute("aria-label", `${project.title} case study`);

    const tags = project.tags
      .map((tag) => `<span class="project-tag" data-tone="${toneFor(tag)}">${tag}</span>`)
      .join("");

    card.innerHTML = `
      <figure class="project-media">
        <img src="${asset(project.image)}" alt="${project.title}" loading="lazy" />
      </figure>
      <div class="project-body">
        <p class="project-title"><span class="project-icon">${project.icon}</span><b>${project.title}</b></p>
        <div class="project-tags">${tags}</div>
      </div>
    `;

    projectsRoot.append(card);
  });
}

function setupReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}

renderProjects();
setupReveal();

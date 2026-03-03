const ALL_PROJECTS = [
  {
    title: "The soul codes - Logo",
    tags: ["Graphic design", "Logo", "Social media"],
    cover: "resources/notion_portfolio/Portfolio - Kate/Projects/The soul codes - Logo/the_soul_codes_mockup_list_(1).png",
  },
  {
    title: "Linn Plakat - event app",
    tags: ["Mobile app", "UX/UI", "iOS app"],
    cover: "resources/notion_portfolio/Portfolio - Kate/Projects/Linn Plakat - event app/MAIN.png",
  },
  {
    title: "Elara jewellery website",
    tags: ["E-commerce", "UX/UI", "Website Design"],
    cover: "resources/notion_portfolio/Portfolio - Kate/Projects/Elara jewellery website/Main_ready.png",
  },
  {
    title: "EduFlex-Code8 Hackathon",
    tags: ["Dashboard", "Mobile app", "UX/UI"],
    cover: "resources/notion_portfolio/Portfolio - Kate/Projects/EduFlex-Code8 Hackathon/Final.png",
  },
  {
    title: "MoreMoneyMoreLove (Email Newsletter)",
    tags: ["E-commerce", "Graphic design"],
    cover: "resources/notion_portfolio/Portfolio - Kate/Projects/MoreMoneyMoreLove (Email Newsletter)/first.png",
  },
  {
    title: "Experimental Poster Design",
    tags: ["Graphic design", "Midjourney"],
    cover: "resources/notion_portfolio/Portfolio - Kate/Projects/Experimental Poster Design/Posters-1.webp",
  },
  {
    title: "Future Lab Merchandise",
    tags: ["Branding"],
    cover: "resources/notion_portfolio/Portfolio - Kate/Projects/Future Lab Merchandise/Tote-Bag-Green-3_11zon.jpg",
  },
  {
    title: "Typographic Poster Designs",
    tags: ["Graphic design"],
    cover: "resources/notion_portfolio/Portfolio - Kate/Projects/Typographic Poster Designs/You-called-mockup.jpg",
  },
  {
    title: "Firstmovr x Colgate-Palmolive",
    tags: ["AI Generation", "Branding", "Social media"],
    cover: "resources/notion_portfolio/Portfolio - Kate/Projects/Firstmovr x Colgate-Palmolive/image 10.png",
  },
  {
    title: "Onsual",
    tags: ["UX/UI", "Website Design", "iOS app"],
    cover: "resources/notion_portfolio/Portfolio - Kate/Projects/Onsual/image 4.png",
  },
  {
    title: "CuriVerse",
    tags: ["Application design", "Mobile app", "UX/UI"],
    cover: "resources/notion_portfolio/Portfolio - Kate/Projects/CuriVerse/image 7.png",
  },
  {
    title: "Finance app",
    tags: ["Application design", "UX/UI"],
    cover: "resources/notion_portfolio/Portfolio - Kate/Projects/Finance app/image 11.png",
  },
  {
    title: "Spin Records - Vinyl Website",
    tags: ["Graphic design", "Website Design"],
    cover: "resources/notion_portfolio/Portfolio - Kate/Projects/Spin Records - Vinyl Website/image 15.png",
  },
  {
    title: "Social Media Projects",
    tags: ["Branding", "Social media"],
    cover: "resources/notion_portfolio/Portfolio - Kate/Projects/Social Media Projects/Screenshot_2025-11-24_at_23.45.27.png",
  },
];

const ARTWORKS = [
  ["Typographic Poster Designs", "graphic", "resources/notion_portfolio/Portfolio - Kate/Projects/Typographic Poster Designs/Anxiety-Poster.jpg"],
  ["Typographic Poster Designs", "graphic", "resources/notion_portfolio/Portfolio - Kate/Projects/Typographic Poster Designs/Scream.jpg"],
  ["Typographic Poster Designs", "graphic", "resources/notion_portfolio/Portfolio - Kate/Projects/Typographic Poster Designs/Schrei.jpg"],
  ["Experimental Poster Design", "graphic ai", "resources/notion_portfolio/Portfolio - Kate/Projects/Experimental Poster Design/Panic-Disorder.png"],
  ["Experimental Poster Design", "graphic ai", "resources/notion_portfolio/Portfolio - Kate/Projects/Experimental Poster Design/Social-Anxiety.png"],
  ["Future Lab Merchandise", "branding graphic", "resources/notion_portfolio/Portfolio - Kate/Projects/Future Lab Merchandise/Tote-Bag-Green-3_11zon.jpg"],
  ["The soul codes - Logo", "branding graphic", "resources/notion_portfolio/Portfolio - Kate/Projects/The soul codes - Logo/the_soul_codes_mockup_list_(1).png"],
  ["Spin Records - Vinyl Website", "graphic", "resources/notion_portfolio/Portfolio - Kate/Projects/Spin Records - Vinyl Website/image 14.png"],
  ["MoreMoneyMoreLove", "graphic", "resources/notion_portfolio/Portfolio - Kate/Projects/MoreMoneyMoreLove (Email Newsletter)/first.png"],
  ["Firstmovr x Colgate-Palmolive", "social ai branding", "resources/notion_portfolio/Portfolio - Kate/Projects/Firstmovr x Colgate-Palmolive/image 10.png"],
  ["Firstmovr x Colgate-Palmolive", "social ai", "resources/notion_portfolio/Portfolio - Kate/Projects/Firstmovr x Colgate-Palmolive/image 7.png"],
  ["Social Media Projects", "social branding", "resources/notion_portfolio/Portfolio - Kate/Projects/Social Media Projects/Screenshot_2025-11-24_at_23.45.27.png"],
  ["Social Media Projects", "social", "resources/notion_portfolio/Portfolio - Kate/Projects/Social Media Projects/Screenshot_2026-02-26_at_15.10.23.png"],
  ["Elara jewellery website", "branding", "resources/notion_portfolio/Portfolio - Kate/Projects/Elara jewellery website/Main_ready.png"],
];

const masonry = document.getElementById("masonry");
const strip = document.getElementById("project-strip");
const filters = document.getElementById("filters");

function assetPath(path) {
  return encodeURI(path);
}

function renderMasonry(filter = "all") {
  masonry.innerHTML = "";
  const data = ARTWORKS.filter((item) => filter === "all" || item[1].includes(filter));

  data.forEach(([project, type, path]) => {
    const card = document.createElement("article");
    card.className = "work";

    const media = document.createElement("img");
    media.loading = "lazy";
    media.src = assetPath(path);
    media.alt = `${project} artwork`;

    const cap = document.createElement("div");
    cap.className = "work-caption";
    cap.innerHTML = `<strong>${project}</strong><span>${type.replaceAll(" ", " • ")}</span>`;

    card.append(media, cap);
    masonry.append(card);
  });
}

function renderProjects() {
  strip.innerHTML = "";

  ALL_PROJECTS.forEach((project) => {
    const article = document.createElement("article");
    article.className = "project-card";
    article.innerHTML = `
      <img src="${assetPath(project.cover)}" alt="${project.title} cover" loading="lazy" />
      <div class="project-copy">
        <h3>${project.title}</h3>
        <p class="project-tags">${project.tags.join(" • ")}</p>
      </div>
    `;
    strip.append(article);
  });
}

function setupFilter() {
  filters.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-filter]");
    if (!button) return;

    document.querySelectorAll(".chip").forEach((chip) => chip.classList.remove("active"));
    button.classList.add("active");
    renderMasonry(button.dataset.filter);
  });
}

function setupReveal() {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll(".reveal").forEach((node) => io.observe(node));
}

renderMasonry();
renderProjects();
setupFilter();
setupReveal();

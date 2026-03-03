const GROUPS = [
  {
    title: "Graphic Design",
    subtitle: "Posters, layouts, and experimental visuals.",
    color: "#ffd8c4",
    items: [
      ["Typographic Poster Designs", "Poster Series", "resources/notion_portfolio/Portfolio - Kate/Projects/Typographic Poster Designs/Anxiety-Poster.jpg"],
      ["Typographic Poster Designs", "Poster Series", "resources/notion_portfolio/Portfolio - Kate/Projects/Typographic Poster Designs/Scream.jpg"],
      ["Experimental Poster Design", "Experimental", "resources/notion_portfolio/Portfolio - Kate/Projects/Experimental Poster Design/Panic-Disorder.png"],
      ["Experimental Poster Design", "Experimental", "resources/notion_portfolio/Portfolio - Kate/Projects/Experimental Poster Design/Social-Anxiety.png"],
      ["MoreMoneyMoreLove", "Email Design", "resources/notion_portfolio/Portfolio - Kate/Projects/MoreMoneyMoreLove (Email Newsletter)/first.png"],
      ["Spin Records - Vinyl Website", "Web Visual", "resources/notion_portfolio/Portfolio - Kate/Projects/Spin Records - Vinyl Website/image 14.png"],
    ],
  },
  {
    title: "SMM",
    subtitle: "Content systems, social feeds, and campaign visuals.",
    color: "#ffe7b5",
    items: [
      ["Social Media Projects", "Brand Feed", "resources/notion_portfolio/Portfolio - Kate/Projects/Social Media Projects/Screenshot_2025-11-24_at_23.45.27.png"],
      ["Social Media Projects", "Brand Feed", "resources/notion_portfolio/Portfolio - Kate/Projects/Social Media Projects/Screenshot_2026-02-26_at_15.10.23.png"],
      ["Social Media Projects", "Campaign", "resources/notion_portfolio/Portfolio - Kate/Projects/Social Media Projects/2834c4e7-9605-4a34-824d-1fc06a1c8a14.png"],
      ["Social Media Projects", "Reels/Stories", "resources/notion_portfolio/Portfolio - Kate/Projects/Social Media Projects/8.png"],
      ["Firstmovr x Colgate-Palmolive", "Social Creative", "resources/notion_portfolio/Portfolio - Kate/Projects/Firstmovr x Colgate-Palmolive/image 7.png"],
      ["Firstmovr x Colgate-Palmolive", "Social Creative", "resources/notion_portfolio/Portfolio - Kate/Projects/Firstmovr x Colgate-Palmolive/image 3.png"],
    ],
  },
  {
    title: "Branding",
    subtitle: "Identity systems and branded assets.",
    color: "#d7efd7",
    items: [
      ["The soul codes - Logo", "Logo System", "resources/notion_portfolio/Portfolio - Kate/Projects/The soul codes - Logo/the_soul_codes_mockup_list_(1).png"],
      ["The soul codes - Logo", "Logo System", "resources/notion_portfolio/Portfolio - Kate/Projects/The soul codes - Logo/The_soul_codes_mockup_(1).png"],
      ["Future Lab Merchandise", "Merch", "resources/notion_portfolio/Portfolio - Kate/Projects/Future Lab Merchandise/Tote-Bag-Green-3_11zon.jpg"],
      ["Future Lab Merchandise", "Merch", "resources/notion_portfolio/Portfolio - Kate/Projects/Future Lab Merchandise/Tote-Bag-Orange-3_11zon.jpg"],
      ["Elara jewellery website", "Brand + Web", "resources/notion_portfolio/Portfolio - Kate/Projects/Elara jewellery website/Main_ready.png"],
      ["Spin Records - Vinyl Website", "Brand + Web", "resources/notion_portfolio/Portfolio - Kate/Projects/Spin Records - Vinyl Website/image 15.png"],
    ],
  },
  {
    title: "AI-Driven Design",
    subtitle: "Prompted generation refined into production-ready visuals.",
    color: "#d7e8ff",
    items: [
      ["Firstmovr x Colgate-Palmolive", "AI Campaign", "resources/notion_portfolio/Portfolio - Kate/Projects/Firstmovr x Colgate-Palmolive/image 10.png"],
      ["Firstmovr x Colgate-Palmolive", "AI Campaign", "resources/notion_portfolio/Portfolio - Kate/Projects/Firstmovr x Colgate-Palmolive/image 8.png"],
      ["Firstmovr x Colgate-Palmolive", "AI Campaign", "resources/notion_portfolio/Portfolio - Kate/Projects/Firstmovr x Colgate-Palmolive/image 5.png"],
      ["Experimental Poster Design", "AI Poster", "resources/notion_portfolio/Portfolio - Kate/Projects/Experimental Poster Design/Posters-1.webp"],
      ["Experimental Poster Design", "AI Poster", "resources/notion_portfolio/Portfolio - Kate/Projects/Experimental Poster Design/Claustrophobia.png"],
    ],
  },
  {
    title: "UX/UI",
    subtitle: "Interface and product design studies.",
    color: "#eadcff",
    items: [
      ["Linn Plakat - event app", "App Design", "resources/notion_portfolio/Portfolio - Kate/Projects/Linn Plakat - event app/MAIN.png"],
      ["CuriVerse", "Mobile App", "resources/notion_portfolio/Portfolio - Kate/Projects/CuriVerse/image 7.png"],
      ["Finance app", "Product UI", "resources/notion_portfolio/Portfolio - Kate/Projects/Finance app/image 11.png"],
      ["Onsual", "Website + App", "resources/notion_portfolio/Portfolio - Kate/Projects/Onsual/image 4.png"],
      ["EduFlex-Code8 Hackathon", "Dashboard", "resources/notion_portfolio/Portfolio - Kate/Projects/EduFlex-Code8 Hackathon/Final.png"],
      ["Elara jewellery website", "E-commerce UI", "resources/notion_portfolio/Portfolio - Kate/Projects/Elara jewellery website/Screens.png"],
    ],
  },
];

const groupsRoot = document.getElementById("groups");

function asset(path) {
  return encodeURI(path);
}

function pickClass(ratio) {
  if (ratio >= 1.75) return "wide";
  if (ratio >= 1.15) return "landscape";
  if (ratio <= 0.85) return "portrait";
  return "square";
}

function renderGroups() {
  groupsRoot.innerHTML = "";

  GROUPS.forEach((group, groupIndex) => {
    const section = document.createElement("section");
    section.className = `group ${groupIndex % 2 ? "rhythm-b" : "rhythm-a"}`;

    const panel = document.createElement("aside");
    panel.className = "group-panel reveal";
    panel.style.background = group.color;
    panel.innerHTML = `
      <small class="group-index">${String(groupIndex + 1).padStart(2, "0")}</small>
      <h3>${group.title}</h3>
      <p>${group.subtitle}</p>
    `;

    const wall = document.createElement("div");
    wall.className = "group-wall";

    group.items.forEach(([project, label, path], index) => {
      const figure = document.createElement("figure");
      figure.className = "piece reveal";
      if (index === 0) figure.classList.add("hero");

      figure.innerHTML = `
        <img src="${asset(path)}" alt="${project}" loading="lazy" />
        <figcaption><strong>${project}</strong><span>${label}</span></figcaption>
      `;

      if (index > 0) {
        const img = figure.querySelector("img");
        img.addEventListener("load", () => {
          const ratio = img.naturalWidth / img.naturalHeight;
          figure.classList.add(pickClass(ratio));
        });
      }

      wall.append(figure);
    });

    section.append(panel, wall);
    groupsRoot.append(section);
  });
}

function setupReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}

renderGroups();
setupReveal();

import type { PracticeProject } from "../types";

const image1 = new URL("./01-cover.png", import.meta.url).href;
const image2 = new URL("./02-the-soul-2.png", import.meta.url).href;
const image3 = new URL("./03-the-soul-codes-mockup-1.png", import.meta.url).href;
const image4 = new URL("./04-the-soul-1.png", import.meta.url).href;
const image5 = new URL("./05-the-soul.png", import.meta.url).href;

const project: PracticeProject = {
  slug: "the-soul-codes-logo",
  title: "The Soul Codes - Logo",
  year: "2024",
  medium: "identity / symbolic mark-making",
  summary: "The Soul Codes - Logo case study from Kate's portfolio.",
  tags: ["Graphic design", "Logo", "Social media"],
  archiveHref: "/resources/notion_portfolio/Portfolio - Kate/Projects/The soul codes - Logo 80a867de3757433ea1afb6782296ff97.html",
  coverImage: {
    src: image1,
    alt: "Cover image for The Soul Codes - Logo.",
    kind: "image",
    width: 4000,
    height: 3000,
  },
  media: [
    { src: image1, alt: "Cover image for The Soul Codes - Logo.", kind: "image", width: 4000, height: 3000 },
    { src: image2, alt: "Case study image 2 from The Soul Codes - Logo.", kind: "image", width: 1920, height: 1080 },
    { src: image3, alt: "Case study image 3 from The Soul Codes - Logo.", kind: "image", width: 4000, height: 3000 },
    { src: image4, alt: "Case study image 4 from The Soul Codes - Logo.", kind: "image", width: 1920, height: 1080 },
    { src: image5, alt: "Case study image 5 from The Soul Codes - Logo.", kind: "image", width: 1920, height: 1080 },
  ],
  blocks: [
  { type: "image", media: { src: image1, alt: "Cover image for The Soul Codes - Logo.", kind: "image", width: 4000, height: 3000 } },
  { type: "image", media: { src: image2, alt: "Case study image 2 from The Soul Codes - Logo.", kind: "image", width: 1920, height: 1080 } },
  { type: "image", media: { src: image3, alt: "Case study image 3 from The Soul Codes - Logo.", kind: "image", width: 4000, height: 3000 } },
  { type: "image", media: { src: image4, alt: "Case study image 4 from The Soul Codes - Logo.", kind: "image", width: 1920, height: 1080 } },
  { type: "image", media: { src: image5, alt: "Case study image 5 from The Soul Codes - Logo.", kind: "image", width: 1920, height: 1080 } },
  ],
};

export default project;

import type { PracticeProject } from "../types";

const image1 = new URL("./01-cover.png", import.meta.url).href;
const image2 = new URL("./02-email-newsletter-version-1.png", import.meta.url).href;
const image3 = new URL("./03-email-newsletter-version-2.png", import.meta.url).href;

const project: PracticeProject = {
  slug: "moremoneymorelove",
  title: "MoreMoneyMoreLove",
  year: "2025",
  medium: "email campaign / commerce story",
  summary: "MoreMoneyMoreLove case study.",
  tags: ["E-commerce", "Graphic design"],
  archiveHref: "/resources/notion_portfolio/Portfolio - Kate/Projects/MoreMoneyMoreLove (Email Newsletter) 174f27ef1ff780738893f1ff60853fea.html",
  coverImage: {
    src: image1,
    alt: "Cover image for MoreMoneyMoreLove.",
    kind: "image",
  },
  media: [
    { src: image1, alt: "Cover image for MoreMoneyMoreLove.", kind: "image" },
    { src: image2, alt: "Email Newsletter Version 1 from MoreMoneyMoreLove.", kind: "image" },
    { src: image3, alt: "Email Newsletter Version 2 from MoreMoneyMoreLove.", kind: "image" },
  ],
  blocks: [
  { type: "heading", level: 2, content: [{ text: "Cover" }] },
  { type: "image", media: { src: image1, alt: "Cover image for MoreMoneyMoreLove.", kind: "image" } },
  { type: "divider" },
  { type: "heading", level: 3, content: [{ text: "Email Newsletter Version 1" }] },
  { type: "image", media: { src: image2, alt: "Email Newsletter Version 1 from MoreMoneyMoreLove.", kind: "image" } },
  { type: "divider" },
  { type: "heading", level: 3, content: [{ text: "Email Newsletter Version 2" }] },
  { type: "image", media: { src: image3, alt: "Email Newsletter Version 2 from MoreMoneyMoreLove.", kind: "image" } },
  ],
};

export default project;

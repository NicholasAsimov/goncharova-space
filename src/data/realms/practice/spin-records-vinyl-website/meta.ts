import type { PracticeProject } from "../types";

const image1 = new URL("./01-cover.png", import.meta.url).href;
const image2 = new URL("./02-image-1.png", import.meta.url).href;
const image3 = new URL("./03-image-2.png", import.meta.url).href;
const image4 = new URL("./04-image-3.png", import.meta.url).href;
const image5 = new URL("./05-solution.png", import.meta.url).href;
const image6 = new URL("./06-solution-2.png", import.meta.url).href;
const image7 = new URL("./07-solution-3.png", import.meta.url).href;
const image8 = new URL("./08-solution-4.png", import.meta.url).href;
const image9 = new URL("./09-process.png", import.meta.url).href;
const image10 = new URL("./10-process-2.png", import.meta.url).href;
const image11 = new URL("./11-process-3.png", import.meta.url).href;
const image12 = new URL("./12-process-4.png", import.meta.url).href;
const image13 = new URL("./13-process-5.png", import.meta.url).href;
const image14 = new URL("./14-process-6.png", import.meta.url).href;
const image15 = new URL("./15-process-7.png", import.meta.url).href;
const image16 = new URL("./16-process-8.png", import.meta.url).href;

const project: PracticeProject = {
  slug: "spin-records-vinyl-website",
  title: "Spin Records - Vinyl Website",
  year: "2025",
  medium: "website / editorial commerce",
  summary: "Finding and buying vinyl collections should be facilitated through a digital platform.",
  tags: ["Graphic design", "Website Design"],
  archiveHref: "/resources/notion_portfolio/Portfolio - Kate/Projects/Spin Records - Vinyl Website 310f27ef1ff78098865bfe0a372ee456.html",
  coverImage: {
    src: image1,
    alt: "Cover image for Spin Records - Vinyl Website.",
    kind: "image",
  },
  media: [
    { src: image1, alt: "Cover image for Spin Records - Vinyl Website.", kind: "image" },
    { src: image2, alt: "Case study image 2 from Spin Records - Vinyl Website.", kind: "image" },
    { src: image3, alt: "Case study image 3 from Spin Records - Vinyl Website.", kind: "image" },
    { src: image4, alt: "Case study image 4 from Spin Records - Vinyl Website.", kind: "image" },
    { src: image5, alt: "Solution from Spin Records - Vinyl Website.", kind: "image" },
    { src: image6, alt: "Solution from Spin Records - Vinyl Website.", kind: "image" },
    { src: image7, alt: "Solution from Spin Records - Vinyl Website.", kind: "image" },
    { src: image8, alt: "Solution from Spin Records - Vinyl Website.", kind: "image" },
    { src: image9, alt: "Process from Spin Records - Vinyl Website.", kind: "image" },
    { src: image10, alt: "Process from Spin Records - Vinyl Website.", kind: "image" },
    { src: image11, alt: "Process from Spin Records - Vinyl Website.", kind: "image" },
    { src: image12, alt: "Process from Spin Records - Vinyl Website.", kind: "image" },
    { src: image13, alt: "Process from Spin Records - Vinyl Website.", kind: "image" },
    { src: image14, alt: "Process from Spin Records - Vinyl Website.", kind: "image" },
    { src: image15, alt: "Process from Spin Records - Vinyl Website.", kind: "image" },
    { src: image16, alt: "Process from Spin Records - Vinyl Website.", kind: "image" },
  ],
  blocks: [
  { type: "image", media: { src: image1, alt: "Cover image for Spin Records - Vinyl Website.", kind: "image" } },
  { type: "image", media: { src: image2, alt: "Case study image 2 from Spin Records - Vinyl Website.", kind: "image" } },
  { type: "image", media: { src: image3, alt: "Case study image 3 from Spin Records - Vinyl Website.", kind: "image" } },
  { type: "image", media: { src: image4, alt: "Case study image 4 from Spin Records - Vinyl Website.", kind: "image" } },
  { type: "heading", level: 3, content: [{ text: "Problem" }] },
  { type: "paragraph", content: [{ text: "Finding and buying vinyl collections should be facilitated through a digital platform." }] },
  { type: "paragraph", content: [{ text: "There ought to be a dedicated platform catering to vinyl collectors, enabling them to acquire interesting and rare vinyl records, whether they are newly released or vintage." }] },
  { type: "divider" },
  { type: "heading", level: 3, content: [{ text: "Solution" }] },
  { type: "paragraph", content: [{ text: "Spin Records is an ambitious project that aimed to create a user-centric online platform for vinyl enthusiasts. The goal was to design a website that not only provided a seamless user experience (UX) but also an intuitive user interface (UI) to engage and connect vinyl collectors and sellers worldwide." }] },
  { type: "image", media: { src: image5, alt: "Solution from Spin Records - Vinyl Website.", kind: "image" } },
  { type: "image", media: { src: image6, alt: "Solution from Spin Records - Vinyl Website.", kind: "image" } },
  { type: "image", media: { src: image7, alt: "Solution from Spin Records - Vinyl Website.", kind: "image" } },
  { type: "image", media: { src: image8, alt: "Solution from Spin Records - Vinyl Website.", kind: "image" } },
  { type: "divider" },
  { type: "heading", level: 2, content: [{ text: "Process" }] },
  { type: "image", media: { src: image9, alt: "Process from Spin Records - Vinyl Website.", kind: "image" } },
  { type: "image", media: { src: image10, alt: "Process from Spin Records - Vinyl Website.", kind: "image" } },
  { type: "image", media: { src: image11, alt: "Process from Spin Records - Vinyl Website.", kind: "image" } },
  { type: "image", media: { src: image12, alt: "Process from Spin Records - Vinyl Website.", kind: "image" } },
  { type: "image", media: { src: image13, alt: "Process from Spin Records - Vinyl Website.", kind: "image" } },
  { type: "image", media: { src: image14, alt: "Process from Spin Records - Vinyl Website.", kind: "image" } },
  { type: "image", media: { src: image15, alt: "Process from Spin Records - Vinyl Website.", kind: "image" } },
  { type: "image", media: { src: image16, alt: "Process from Spin Records - Vinyl Website.", kind: "image" } },
  ],
};

export default project;

import type { PracticeProject } from "../types";

const image1 = new URL("./01-cover.jpg", import.meta.url).href;
const image2 = new URL("./02-gif-12.gif", import.meta.url).href;
const image3 = new URL("./03-schrei.jpg", import.meta.url).href;
const image4 = new URL("./04-anxiety-m.jpg", import.meta.url).href;
const image5 = new URL("./05-schrei-m.jpg", import.meta.url).href;
const image6 = new URL("./06-anxiety-poster.jpg", import.meta.url).href;
const image7 = new URL("./07-safety-pin.jpg", import.meta.url).href;
const image8 = new URL("./08-you-called.jpg", import.meta.url).href;
const image9 = new URL("./09-scream.jpg", import.meta.url).href;
const image10 = new URL("./10-anxiety.jpg", import.meta.url).href;
const image11 = new URL("./11-safety-pin-mockup.jpg", import.meta.url).href;
const image12 = new URL("./12-you-called-mockup.jpg", import.meta.url).href;
const image13 = new URL("./13-posters-collection-v2-11zon.jpg", import.meta.url).href;
const image14 = new URL("./14-posters-collection-v1-11zon.jpg", import.meta.url).href;
const image15 = new URL("./15-posters-collection-v3-11zon.jpg", import.meta.url).href;

const project: PracticeProject = {
  slug: "typographic-poster-designs",
  title: "Typographic Poster Designs",
  year: "2025",
  medium: "graphic / poster studies",
  summary: "Typographic Poster Designs case study from Kate's portfolio.",
  tags: ["Graphic design"],
  archiveHref: "/resources/notion_portfolio/Portfolio - Kate/Projects/Typographic Poster Designs 2b5f27ef1ff7802c8fcdc80f068b9cd0.html",
  coverImage: {
    src: image1,
    alt: "Cover image for Typographic Poster Designs.",
    kind: "image",
  },
  media: [
    { src: image1, alt: "Cover image for Typographic Poster Designs.", kind: "image" },
    { src: image2, alt: "Case study image 2 from Typographic Poster Designs.", kind: "image" },
    { src: image3, alt: "Case study image 3 from Typographic Poster Designs.", kind: "image" },
    { src: image4, alt: "Case study image 4 from Typographic Poster Designs.", kind: "image" },
    { src: image5, alt: "Case study image 5 from Typographic Poster Designs.", kind: "image" },
    { src: image6, alt: "Case study image 6 from Typographic Poster Designs.", kind: "image" },
    { src: image7, alt: "Case study image 7 from Typographic Poster Designs.", kind: "image" },
    { src: image8, alt: "Case study image 8 from Typographic Poster Designs.", kind: "image" },
    { src: image9, alt: "Case study image 9 from Typographic Poster Designs.", kind: "image" },
    { src: image10, alt: "Case study image 10 from Typographic Poster Designs.", kind: "image" },
    { src: image11, alt: "Case study image 11 from Typographic Poster Designs.", kind: "image" },
    { src: image12, alt: "Case study image 12 from Typographic Poster Designs.", kind: "image" },
    { src: image13, alt: "Case study image 13 from Typographic Poster Designs.", kind: "image" },
    { src: image14, alt: "Case study image 14 from Typographic Poster Designs.", kind: "image" },
    { src: image15, alt: "Case study image 15 from Typographic Poster Designs.", kind: "image" },
  ],
  blocks: [
  { type: "image", media: { src: image1, alt: "Cover image for Typographic Poster Designs.", kind: "image" } },
  { type: "image", media: { src: image2, alt: "Case study image 2 from Typographic Poster Designs.", kind: "image" } },
  { type: "image", media: { src: image3, alt: "Case study image 3 from Typographic Poster Designs.", kind: "image" } },
  { type: "image", media: { src: image4, alt: "Case study image 4 from Typographic Poster Designs.", kind: "image" } },
  { type: "image", media: { src: image5, alt: "Case study image 5 from Typographic Poster Designs.", kind: "image" } },
  { type: "image", media: { src: image6, alt: "Case study image 6 from Typographic Poster Designs.", kind: "image" } },
  { type: "image", media: { src: image7, alt: "Case study image 7 from Typographic Poster Designs.", kind: "image" } },
  { type: "image", media: { src: image8, alt: "Case study image 8 from Typographic Poster Designs.", kind: "image" } },
  { type: "image", media: { src: image9, alt: "Case study image 9 from Typographic Poster Designs.", kind: "image" } },
  { type: "image", media: { src: image10, alt: "Case study image 10 from Typographic Poster Designs.", kind: "image" } },
  { type: "image", media: { src: image11, alt: "Case study image 11 from Typographic Poster Designs.", kind: "image" } },
  { type: "image", media: { src: image12, alt: "Case study image 12 from Typographic Poster Designs.", kind: "image" } },
  { type: "image", media: { src: image13, alt: "Case study image 13 from Typographic Poster Designs.", kind: "image" } },
  { type: "image", media: { src: image14, alt: "Case study image 14 from Typographic Poster Designs.", kind: "image" } },
  { type: "image", media: { src: image15, alt: "Case study image 15 from Typographic Poster Designs.", kind: "image" } },
  ],
};

export default project;

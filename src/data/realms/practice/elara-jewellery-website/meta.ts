import type { PracticeProject } from "../types";

const image1 = new URL("./01-cover.png", import.meta.url).href;
const image2 = new URL("./02-overview.png", import.meta.url).href;
const image3 = new URL("./03-a1e5e998-9b07-466b-92c3-024878572a3a.png", import.meta.url).href;
const image4 = new URL("./04-research.png", import.meta.url).href;
const image5 = new URL("./05-problem.png", import.meta.url).href;
const image6 = new URL("./06-a7e6af8a-f50d-4997-8bb4-e34863450238.png", import.meta.url).href;
const image7 = new URL("./07-90432419-c5ab-4c45-ab9d-3863d760914c.png", import.meta.url).href;
const image8 = new URL("./08-6e4185c4-a0a3-4127-8e85-6e9d1fa0ec4b.png", import.meta.url).href;
const image9 = new URL("./09-functionality.png", import.meta.url).href;
const image10 = new URL("./10-desktop-web.png", import.meta.url).href;
const image11 = new URL("./11-mobile-web.png", import.meta.url).href;
const image12 = new URL("./12-colours.png", import.meta.url).href;
const image13 = new URL("./13-typography.png", import.meta.url).href;
const image14 = new URL("./14-screens.png", import.meta.url).href;

const project: PracticeProject = {
  slug: "elara-jewellery-website",
  title: "Elara Jewellery Website",
  year: "2024",
  medium: "luxury e-commerce / web",
  summary: "Elara Jewellery Website case study from Kate's portfolio.",
  tags: ["E-commerce", "UX/UI", "Website Design"],
  archiveHref: "/resources/notion_portfolio/Portfolio - Kate/Projects/Elara jewellery website 4b5a8c6c92384a3380cfec06cd57074e.html",
  coverImage: {
    src: image1,
    alt: "Cover image for Elara Jewellery Website.",
    kind: "image",
    width: 1440,
    height: 1024,
  },
  media: [
    { src: image1, alt: "Cover image for Elara Jewellery Website.", kind: "image", width: 1440, height: 1024 },
    { src: image2, alt: "Case study image 2 from Elara Jewellery Website.", kind: "image", width: 1440, height: 1024 },
    { src: image3, alt: "Case study image 3 from Elara Jewellery Website.", kind: "image", width: 2000, height: 1018 },
    { src: image4, alt: "Case study image 4 from Elara Jewellery Website.", kind: "image", width: 1440, height: 1024 },
    { src: image5, alt: "Case study image 5 from Elara Jewellery Website.", kind: "image", width: 1440, height: 1024 },
    { src: image6, alt: "Case study image 6 from Elara Jewellery Website.", kind: "image", width: 2000, height: 912 },
    { src: image7, alt: "Case study image 7 from Elara Jewellery Website.", kind: "image", width: 2000, height: 1114 },
    { src: image8, alt: "Case study image 8 from Elara Jewellery Website.", kind: "image", width: 2000, height: 985 },
    { src: image9, alt: "Case study image 9 from Elara Jewellery Website.", kind: "image", width: 1440, height: 1024 },
    { src: image10, alt: "Case study image 10 from Elara Jewellery Website.", kind: "image", width: 1440, height: 1024 },
    { src: image11, alt: "Case study image 11 from Elara Jewellery Website.", kind: "image", width: 1440, height: 1024 },
    { src: image12, alt: "Case study image 12 from Elara Jewellery Website.", kind: "image", width: 1440, height: 1024 },
    { src: image13, alt: "Case study image 13 from Elara Jewellery Website.", kind: "image", width: 1440, height: 1024 },
    { src: image14, alt: "Case study image 14 from Elara Jewellery Website.", kind: "image", width: 1440, height: 1024 },
  ],
  blocks: [
  { type: "image", media: { src: image1, alt: "Cover image for Elara Jewellery Website.", kind: "image", width: 1440, height: 1024 } },
  { type: "image", media: { src: image2, alt: "Case study image 2 from Elara Jewellery Website.", kind: "image", width: 1440, height: 1024 } },
  { type: "image", media: { src: image3, alt: "Case study image 3 from Elara Jewellery Website.", kind: "image", width: 2000, height: 1018 } },
  { type: "image", media: { src: image4, alt: "Case study image 4 from Elara Jewellery Website.", kind: "image", width: 1440, height: 1024 } },
  { type: "image", media: { src: image5, alt: "Case study image 5 from Elara Jewellery Website.", kind: "image", width: 1440, height: 1024 } },
  { type: "image", media: { src: image6, alt: "Case study image 6 from Elara Jewellery Website.", kind: "image", width: 2000, height: 912 } },
  { type: "image", media: { src: image7, alt: "Case study image 7 from Elara Jewellery Website.", kind: "image", width: 2000, height: 1114 } },
  { type: "image", media: { src: image8, alt: "Case study image 8 from Elara Jewellery Website.", kind: "image", width: 2000, height: 985 } },
  { type: "image", media: { src: image9, alt: "Case study image 9 from Elara Jewellery Website.", kind: "image", width: 1440, height: 1024 } },
  { type: "image", media: { src: image10, alt: "Case study image 10 from Elara Jewellery Website.", kind: "image", width: 1440, height: 1024 } },
  { type: "image", media: { src: image11, alt: "Case study image 11 from Elara Jewellery Website.", kind: "image", width: 1440, height: 1024 } },
  { type: "image", media: { src: image12, alt: "Case study image 12 from Elara Jewellery Website.", kind: "image", width: 1440, height: 1024 } },
  { type: "image", media: { src: image13, alt: "Case study image 13 from Elara Jewellery Website.", kind: "image", width: 1440, height: 1024 } },
  { type: "image", media: { src: image14, alt: "Case study image 14 from Elara Jewellery Website.", kind: "image", width: 1440, height: 1024 } },
  ],
};

export default project;

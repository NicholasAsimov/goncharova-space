import type { PracticeProject } from "../types";

const image1 = new URL("./01-cover.png", import.meta.url).href;
const image2 = new URL("./02-features-calendar.png", import.meta.url).href;
const image3 = new URL("./03-features-social-wall.png", import.meta.url).href;
const image4 = new URL("./04-features-personalisation.png", import.meta.url).href;
const image5 = new URL("./05-features-favourites.png", import.meta.url).href;
const image6 = new URL("./06-new-pe.png", import.meta.url).href;
const image7 = new URL("./07-ux-part.png", import.meta.url).href;
const image8 = new URL("./08-ux-part-2.png", import.meta.url).href;
const image9 = new URL("./09-ux-part-3.png", import.meta.url).href;
const image10 = new URL("./10-ux-part-4.png", import.meta.url).href;
const image11 = new URL("./11-ui-part.png", import.meta.url).href;
const image12 = new URL("./12-ui-part-2.png", import.meta.url).href;
const image13 = new URL("./13-ui-part-3.png", import.meta.url).href;

const project: PracticeProject = {
  slug: "linn-plakat-event-app",
  title: "Linn Plakat - Event App",
  year: "2024",
  medium: "event discovery / mobile UX",
  summary: "Linn Plakat - Event App case study.",
  tags: ["Mobile app", "UX/UI", "iOS app"],
  archiveHref: "/resources/notion_portfolio/Portfolio - Kate/Projects/Linn Plakat - event app 34999bc414ca4ae6b3a06be35d1edba0.html",
  coverImage: {
    src: image1,
    alt: "Cover image for Linn Plakat - Event App.",
    kind: "image",
  },
  media: [
    { src: image1, alt: "Cover image for Linn Plakat - Event App.", kind: "image" },
    { src: image2, alt: "Case study image 2 from Linn Plakat - Event App.", kind: "image" },
    { src: image3, alt: "Case study image 3 from Linn Plakat - Event App.", kind: "image" },
    { src: image4, alt: "Case study image 4 from Linn Plakat - Event App.", kind: "image" },
    { src: image5, alt: "Case study image 5 from Linn Plakat - Event App.", kind: "image" },
    { src: image6, alt: "Case study image 6 from Linn Plakat - Event App.", kind: "image" },
    { src: image7, alt: "UX Part from Linn Plakat - Event App.", kind: "image" },
    { src: image8, alt: "UX Part from Linn Plakat - Event App.", kind: "image" },
    { src: image9, alt: "UX Part from Linn Plakat - Event App.", kind: "image" },
    { src: image10, alt: "UX Part from Linn Plakat - Event App.", kind: "image" },
    { src: image11, alt: "UI Part from Linn Plakat - Event App.", kind: "image" },
    { src: image12, alt: "UI Part from Linn Plakat - Event App.", kind: "image" },
    { src: image13, alt: "UI Part from Linn Plakat - Event App.", kind: "image" },
  ],
  blocks: [
  { type: "image", media: { src: image1, alt: "Cover image for Linn Plakat - Event App.", kind: "image" } },
  { type: "image", media: { src: image2, alt: "Case study image 2 from Linn Plakat - Event App.", kind: "image" } },
  { type: "image", media: { src: image3, alt: "Case study image 3 from Linn Plakat - Event App.", kind: "image" } },
  { type: "image", media: { src: image4, alt: "Case study image 4 from Linn Plakat - Event App.", kind: "image" } },
  { type: "image", media: { src: image5, alt: "Case study image 5 from Linn Plakat - Event App.", kind: "image" } },
  { type: "image", media: { src: image6, alt: "Case study image 6 from Linn Plakat - Event App.", kind: "image" } },
  { type: "heading", level: 2, content: [{ text: "UX Part" }] },
  { type: "paragraph", content: [{ text: "User research" }] },
  { type: "image", media: { src: image7, alt: "UX Part from Linn Plakat - Event App.", kind: "image" } },
  { type: "paragraph", content: [{ text: "Persona" }] },
  { type: "image", media: { src: image8, alt: "UX Part from Linn Plakat - Event App.", kind: "image" } },
  { type: "paragraph", content: [{ text: "Competitive analysis" }] },
  { type: "image", media: { src: image9, alt: "UX Part from Linn Plakat - Event App.", kind: "image" } },
  { type: "paragraph", content: [{ text: "Information architecture" }] },
  { type: "image", media: { src: image10, alt: "UX Part from Linn Plakat - Event App.", kind: "image" } },
  { type: "heading", level: 2, content: [{ text: "UI Part" }] },
  { type: "paragraph", content: [{ text: "Mid fidelity prototypes" }] },
  { type: "image", media: { src: image11, alt: "UI Part from Linn Plakat - Event App.", kind: "image" } },
  { type: "paragraph", content: [{ text: "Typography and colours" }] },
  { type: "image", media: { src: image12, alt: "UI Part from Linn Plakat - Event App.", kind: "image" } },
  { type: "image", media: { src: image13, alt: "UI Part from Linn Plakat - Event App.", kind: "image" } },
  { type: "heading", level: 2, content: [{ text: "Design in Figma" }] },
  ],
};

export default project;

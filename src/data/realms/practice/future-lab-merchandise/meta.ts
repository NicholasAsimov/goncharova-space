import type { PracticeProject } from "../types";

const image1 = new URL("./01-cover.png", import.meta.url).href;
const image2 = new URL("./02-t-shirts.png", import.meta.url).href;
const image3 = new URL("./03-t-shirts-2.png", import.meta.url).href;
const image4 = new URL("./04-t-shirts-3.png", import.meta.url).href;
const image5 = new URL("./05-t-shirts-4.png", import.meta.url).href;
const image6 = new URL("./06-t-shirts-5.png", import.meta.url).href;
const image7 = new URL("./07-t-shirts-6.png", import.meta.url).href;
const image8 = new URL("./08-tote-bags.jpg", import.meta.url).href;
const image9 = new URL("./09-tote-bags-2.jpg", import.meta.url).href;
const image10 = new URL("./10-tote-bags-3.jpg", import.meta.url).href;
const image11 = new URL("./11-notepads.png", import.meta.url).href;
const image12 = new URL("./12-notepads-2.png", import.meta.url).href;
const image13 = new URL("./13-notepads-3.png", import.meta.url).href;
const image14 = new URL("./14-socks.png", import.meta.url).href;
const image15 = new URL("./15-socks-2.png", import.meta.url).href;
const image16 = new URL("./16-socks-3.png", import.meta.url).href;
const image17 = new URL("./17-water-bottle.png", import.meta.url).href;
const image18 = new URL("./18-water-bottle-2.png", import.meta.url).href;
const image19 = new URL("./19-water-bottle-3.png", import.meta.url).href;
const image20 = new URL("./20-water-bottle-4.png", import.meta.url).href;
const image21 = new URL("./21-water-bottle-5.png", import.meta.url).href;
const image22 = new URL("./22-water-bottle-6.png", import.meta.url).href;
const image23 = new URL("./23-stickers.png", import.meta.url).href;
const image24 = new URL("./24-posters.png", import.meta.url).href;
const image25 = new URL("./25-posters-2.png", import.meta.url).href;
const image26 = new URL("./26-posters-3.png", import.meta.url).href;
const image27 = new URL("./27-posters-4.png", import.meta.url).href;
const image28 = new URL("./28-posters-5.png", import.meta.url).href;

const project: PracticeProject = {
  slug: "future-lab-merchandise",
  title: "Future Lab Merchandise",
  year: "2025",
  medium: "brand system / merchandise",
  summary: "As a Designer, I contributed to both product experiences and brand identity by supporting the design of merchandise and promotional materials. Leveraging my background in Graphic Design, I created cohesive visuals across a variety of branded items, including T-shirts, socks, water bottles, business cards, stickers, tote bags, notepads, and posters.",
  tags: ["Branding"],
  archiveHref: "/resources/notion_portfolio/Portfolio - Kate/Projects/Future Lab Merchandise 2b5f27ef1ff780749668de1cc502ef97.html",
  coverImage: {
    src: image1,
    alt: "Cover image for Future Lab Merchandise.",
    kind: "image",
    width: 2048,
    height: 1152,
  },
  media: [
    { src: image1, alt: "Cover image for Future Lab Merchandise.", kind: "image", width: 2048, height: 1152 },
    { src: image2, alt: "T-shirts from Future Lab Merchandise.", kind: "image", width: 2048, height: 1365 },
    { src: image3, alt: "T-shirts from Future Lab Merchandise.", kind: "image", width: 2048, height: 1365 },
    { src: image4, alt: "T-shirts from Future Lab Merchandise.", kind: "image", width: 2048, height: 1365 },
    { src: image5, alt: "T-shirts from Future Lab Merchandise.", kind: "image", width: 2048, height: 1365 },
    { src: image6, alt: "T-shirts from Future Lab Merchandise.", kind: "image", width: 2048, height: 1365 },
    { src: image7, alt: "T-shirts from Future Lab Merchandise.", kind: "image", width: 2048, height: 1365 },
    { src: image8, alt: "Tote Bags from Future Lab Merchandise.", kind: "image", width: 6000, height: 4000 },
    { src: image9, alt: "Tote Bags from Future Lab Merchandise.", kind: "image", width: 6000, height: 4000 },
    { src: image10, alt: "Tote Bags from Future Lab Merchandise.", kind: "image", width: 6000, height: 4000 },
    { src: image11, alt: "Notepads from Future Lab Merchandise.", kind: "image", width: 2048, height: 1536 },
    { src: image12, alt: "Notepads from Future Lab Merchandise.", kind: "image", width: 2048, height: 1536 },
    { src: image13, alt: "Notepads from Future Lab Merchandise.", kind: "image", width: 2048, height: 1536 },
    { src: image14, alt: "Socks from Future Lab Merchandise.", kind: "image", width: 2048, height: 2719 },
    { src: image15, alt: "Socks from Future Lab Merchandise.", kind: "image", width: 2048, height: 2719 },
    { src: image16, alt: "Socks from Future Lab Merchandise.", kind: "image", width: 2048, height: 2719 },
    { src: image17, alt: "Water Bottle from Future Lab Merchandise.", kind: "image", width: 2048, height: 1365 },
    { src: image18, alt: "Water Bottle from Future Lab Merchandise.", kind: "image", width: 2048, height: 1365 },
    { src: image19, alt: "Water Bottle from Future Lab Merchandise.", kind: "image", width: 2048, height: 1365 },
    { src: image20, alt: "Water Bottle from Future Lab Merchandise.", kind: "image", width: 2048, height: 1365 },
    { src: image21, alt: "Water Bottle from Future Lab Merchandise.", kind: "image", width: 2048, height: 1365 },
    { src: image22, alt: "Water Bottle from Future Lab Merchandise.", kind: "image", width: 2048, height: 1365 },
    { src: image23, alt: "Stickers from Future Lab Merchandise.", kind: "image", width: 2048, height: 1152 },
    { src: image24, alt: "Posters from Future Lab Merchandise.", kind: "image", width: 5786, height: 8192 },
    { src: image25, alt: "Posters from Future Lab Merchandise.", kind: "image", width: 5786, height: 8192 },
    { src: image26, alt: "Posters from Future Lab Merchandise.", kind: "image", width: 5786, height: 8192 },
    { src: image27, alt: "Posters from Future Lab Merchandise.", kind: "image", width: 5786, height: 8192 },
    { src: image28, alt: "Posters from Future Lab Merchandise.", kind: "image", width: 5149, height: 7290 },
  ],
  blocks: [
  { type: "heading", level: 1, content: [{ text: "Cover" }] },
  { type: "image", media: { src: image1, alt: "Cover image for Future Lab Merchandise.", kind: "image", width: 2048, height: 1152 } },
  { type: "heading", level: 2, content: [{ text: "Job Info" }] },
  { type: "paragraph", content: [{ text: "As a" }, { text: " Designer", bold: true }, { text: ", I contributed to both product experiences and brand identity by supporting the design of " }, { text: "merchandise and promotional materials", bold: true }, { text: ". Leveraging my background in Graphic Design, I created cohesive visuals across a variety of branded items, including " }, { text: "T-shirts, socks, water bottles, business cards, stickers, tote bags, notepads, and posters.", bold: true }] },
  { type: "paragraph", content: [{ text: "My role combined product-focused thinking with hands-on graphic design, ensuring that Future Lab’s merchandise not only looked visually engaging but also aligned with the company’s values and user-centered approach to design." }] },
  { type: "divider" },
  { type: "heading", level: 2, content: [{ text: "Tools I Used in This Role" }] },
  { type: "list", items: [[{ text: "Adobe Illustrator", bold: true }, { text: ":" }, { text: "Produced scalable vector designs for merchandise such as apparel, business cards, and tote bags. Illustrator enabled precise, production-ready artwork consistent with Future Lab’s visual identity." }], [{ text: "Adobe Photoshop", bold: true }, { text: ":" }, { text: "Designed and enhanced posters, stickers, and realistic product mockups. Photoshop ensured accurate color, texture, and layout representation before production." }]] },
  { type: "divider" },
  { type: "heading", level: 2, content: [{ text: "T-shirts" }] },
  { type: "image", media: { src: image2, alt: "T-shirts from Future Lab Merchandise.", kind: "image", width: 2048, height: 1365 } },
  { type: "image", media: { src: image3, alt: "T-shirts from Future Lab Merchandise.", kind: "image", width: 2048, height: 1365 } },
  { type: "image", media: { src: image4, alt: "T-shirts from Future Lab Merchandise.", kind: "image", width: 2048, height: 1365 } },
  { type: "image", media: { src: image5, alt: "T-shirts from Future Lab Merchandise.", kind: "image", width: 2048, height: 1365 } },
  { type: "image", media: { src: image6, alt: "T-shirts from Future Lab Merchandise.", kind: "image", width: 2048, height: 1365 } },
  { type: "image", media: { src: image7, alt: "T-shirts from Future Lab Merchandise.", kind: "image", width: 2048, height: 1365 } },
  { type: "divider" },
  { type: "heading", level: 2, content: [{ text: "Tote Bags" }] },
  { type: "image", media: { src: image8, alt: "Tote Bags from Future Lab Merchandise.", kind: "image", width: 6000, height: 4000 } },
  { type: "image", media: { src: image9, alt: "Tote Bags from Future Lab Merchandise.", kind: "image", width: 6000, height: 4000 } },
  { type: "image", media: { src: image10, alt: "Tote Bags from Future Lab Merchandise.", kind: "image", width: 6000, height: 4000 } },
  { type: "divider" },
  { type: "heading", level: 2, content: [{ text: "Notepads" }] },
  { type: "image", media: { src: image11, alt: "Notepads from Future Lab Merchandise.", kind: "image", width: 2048, height: 1536 } },
  { type: "image", media: { src: image12, alt: "Notepads from Future Lab Merchandise.", kind: "image", width: 2048, height: 1536 } },
  { type: "image", media: { src: image13, alt: "Notepads from Future Lab Merchandise.", kind: "image", width: 2048, height: 1536 } },
  { type: "divider" },
  { type: "heading", level: 2, content: [{ text: "Socks" }] },
  { type: "image", media: { src: image14, alt: "Socks from Future Lab Merchandise.", kind: "image", width: 2048, height: 2719 } },
  { type: "image", media: { src: image15, alt: "Socks from Future Lab Merchandise.", kind: "image", width: 2048, height: 2719 } },
  { type: "image", media: { src: image16, alt: "Socks from Future Lab Merchandise.", kind: "image", width: 2048, height: 2719 } },
  { type: "divider" },
  { type: "heading", level: 2, content: [{ text: "Water Bottle" }] },
  { type: "image", media: { src: image17, alt: "Water Bottle from Future Lab Merchandise.", kind: "image", width: 2048, height: 1365 } },
  { type: "image", media: { src: image18, alt: "Water Bottle from Future Lab Merchandise.", kind: "image", width: 2048, height: 1365 } },
  { type: "image", media: { src: image19, alt: "Water Bottle from Future Lab Merchandise.", kind: "image", width: 2048, height: 1365 } },
  { type: "image", media: { src: image20, alt: "Water Bottle from Future Lab Merchandise.", kind: "image", width: 2048, height: 1365 } },
  { type: "image", media: { src: image21, alt: "Water Bottle from Future Lab Merchandise.", kind: "image", width: 2048, height: 1365 } },
  { type: "image", media: { src: image22, alt: "Water Bottle from Future Lab Merchandise.", kind: "image", width: 2048, height: 1365 } },
  { type: "divider" },
  { type: "heading", level: 2, content: [{ text: "Stickers" }] },
  { type: "image", media: { src: image23, alt: "Stickers from Future Lab Merchandise.", kind: "image", width: 2048, height: 1152 } },
  { type: "divider" },
  { type: "heading", level: 2, content: [{ text: "Posters" }] },
  { type: "image", media: { src: image24, alt: "Posters from Future Lab Merchandise.", kind: "image", width: 5786, height: 8192 } },
  { type: "image", media: { src: image25, alt: "Posters from Future Lab Merchandise.", kind: "image", width: 5786, height: 8192 } },
  { type: "image", media: { src: image26, alt: "Posters from Future Lab Merchandise.", kind: "image", width: 5786, height: 8192 } },
  { type: "image", media: { src: image27, alt: "Posters from Future Lab Merchandise.", kind: "image", width: 5786, height: 8192 } },
  { type: "image", media: { src: image28, alt: "Posters from Future Lab Merchandise.", kind: "image", width: 5149, height: 7290 } },
  ],
};

export default project;

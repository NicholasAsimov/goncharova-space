import type { PracticeProject } from "../types";

const image1 = new URL("./01-cover.png", import.meta.url).href;
const image2 = new URL("./02-vila-muhr.png", import.meta.url).href;
const image3 = new URL("./03-tutookatu-shop.png", import.meta.url).href;
const image4 = new URL("./04-tutookatu-shop-2.png", import.meta.url).href;
const image5 = new URL("./05-groworking.jpg", import.meta.url).href;
const image6 = new URL("./06-groworking-2.png", import.meta.url).href;
const image7 = new URL("./07-groworking-3.png", import.meta.url).href;
const image8 = new URL("./08-groworking-4.png", import.meta.url).href;
const image9 = new URL("./09-groworking-5.png", import.meta.url).href;
const image10 = new URL("./10-groworking-6.png", import.meta.url).href;
const image11 = new URL("./11-groworking-7.png", import.meta.url).href;
const image12 = new URL("./12-groworking-8.png", import.meta.url).href;
const image13 = new URL("./13-groworking-9.png", import.meta.url).href;
const image14 = new URL("./14-groworking-10.png", import.meta.url).href;
const image15 = new URL("./15-groworking-11.png", import.meta.url).href;
const image16 = new URL("./16-groworking-12.png", import.meta.url).href;

const project: PracticeProject = {
  slug: "social-media-projects",
  title: "Social Media Projects",
  year: "2025",
  medium: "branding / campaign visuals",
  summary: "I was hired to transform Vila Muhr’s digital presence from a simple \"rental listing\" into a premium lifestyle brand. The goal was to increase direct bookings and build a loyal community of high-net-worth travelers.",
  tags: ["Branding", "Social media"],
  archiveHref: "/resources/notion_portfolio/Portfolio - Kate/Projects/Social Media Projects 313f27ef1ff780618a65cc147471906f.html",
  coverImage: {
    src: image1,
    alt: "Cover image for Social Media Projects.",
    kind: "image",
  },
  media: [
    { src: image1, alt: "Cover image for Social Media Projects.", kind: "image" },
    { src: image2, alt: "Vila Muhr from Social Media Projects.", kind: "image" },
    { src: image3, alt: "Tutookatu shop from Social Media Projects.", kind: "image" },
    { src: image4, alt: "Tutookatu shop from Social Media Projects.", kind: "image" },
    { src: image5, alt: "Groworking from Social Media Projects.", kind: "image" },
    { src: image6, alt: "Groworking from Social Media Projects.", kind: "image" },
    { src: image7, alt: "Groworking from Social Media Projects.", kind: "image" },
    { src: image8, alt: "Groworking from Social Media Projects.", kind: "image" },
    { src: image9, alt: "Groworking from Social Media Projects.", kind: "image" },
    { src: image10, alt: "Groworking from Social Media Projects.", kind: "image" },
    { src: image11, alt: "Groworking from Social Media Projects.", kind: "image" },
    { src: image12, alt: "Groworking from Social Media Projects.", kind: "image" },
    { src: image13, alt: "Groworking from Social Media Projects.", kind: "image" },
    { src: image14, alt: "Groworking from Social Media Projects.", kind: "image" },
    { src: image15, alt: "Groworking from Social Media Projects.", kind: "image" },
    { src: image16, alt: "Groworking from Social Media Projects.", kind: "image" },
  ],
  blocks: [
  { type: "heading", level: 1, content: [{ text: "Vila Muhr" }] },
  { type: "image", media: { src: image1, alt: "Cover image for Social Media Projects.", kind: "image" } },
  { type: "image", media: { src: image2, alt: "Vila Muhr from Social Media Projects.", kind: "image" } },
  { type: "paragraph", content: [{ text: "I was hired to transform Vila Muhr’s digital presence from a simple \"rental listing\" into a " }, { text: "premium lifestyle brand", bold: true }, { text: ". The goal was to increase direct bookings and build a loyal community of high-net-worth travelers." }] },
  { type: "heading", level: 3, content: [{ text: "Key Challenges & Problems Solved", bold: true }] },
  { type: "list", items: [[{ text: "The brand was buried by algorithm shifts and lacked engagement, so I implemented a Reels-first strategy that boosted visibility." }], [{ text: "The feed lacked a cohesive \"luxury\" feel. I curated a high-end aesthetic that aligned digital visuals with the physical guest experience." }]] },
  { type: "divider" },
  { type: "heading", level: 1, content: [{ text: "Tutookatu shop" }] },
  { type: "image", media: { src: image3, alt: "Tutookatu shop from Social Media Projects.", kind: "image" } },
  { type: "image", media: { src: image4, alt: "Tutookatu shop from Social Media Projects.", kind: "image" } },
  { type: "heading", level: 3, content: [{ text: "Tutookatu: Artistic Identity & Process", bold: true }] },
  { type: "paragraph", content: [{ text: "I was hired to manage both accounts (tutookatu and tutookatu_shop), ensuring both socials felt like part of the same \"universe\" while serving different business goals. For this goal I transitioned the feed from a random collection of photos to a curated gallery that highlighted her specific artistic niche." }] },
  { type: "heading", level: 3, content: [{ text: "Tutookatu", bold: true }] },
  { type: "paragraph", content: [{ text: "I acted as the bridge between the artist and the client. I kept booking dates, travel guest spots, and availability constantly updated via Stories and Highlights to minimize scheduling friction." }] },
  { type: "paragraph", content: [{ text: "I directed and captured on-site content, focusing on the \"ritual\" of tattooing. This included high-impact Reels of stencil placements and the \"final reveal\" to build emotional connection and trust." }] },
  { type: "heading", level: 3, content: [{ text: "The Tutookatu Shop (E-commerce)", bold: true }] },
  { type: "paragraph", content: [{ text: "I organized and assisted in photoshoots for the merchandise, ensuring the \"vibe\" of the clothing matched the \"vibe\" of the tattoos, creating a seamless cross-promotion between the two pages." }] },
  { type: "divider" },
  { type: "heading", level: 1, content: [{ text: "Groworking" }] },
  { type: "image", media: { src: image5, alt: "Groworking from Social Media Projects.", kind: "image" } },
  { type: "image", media: { src: image6, alt: "Groworking from Social Media Projects.", kind: "image" } },
  { type: "paragraph", content: [{ text: "Groworking in Tbilisi, Georgia, offers a modern and vibrant coworking space designed to support both individual professionals and collaborative teams. As a designer, I was responsible for creating brand identity and translate it into social media accounts (Instagram)." }] },
  { type: "divider" },
  { type: "image", media: { src: image7, alt: "Groworking from Social Media Projects.", kind: "image" } },
  { type: "image", media: { src: image8, alt: "Groworking from Social Media Projects.", kind: "image" } },
  { type: "image", media: { src: image9, alt: "Groworking from Social Media Projects.", kind: "image" } },
  { type: "image", media: { src: image10, alt: "Groworking from Social Media Projects.", kind: "image" } },
  { type: "image", media: { src: image11, alt: "Groworking from Social Media Projects.", kind: "image" } },
  { type: "image", media: { src: image12, alt: "Groworking from Social Media Projects.", kind: "image" } },
  { type: "image", media: { src: image13, alt: "Groworking from Social Media Projects.", kind: "image" } },
  { type: "image", media: { src: image14, alt: "Groworking from Social Media Projects.", kind: "image" } },
  { type: "image", media: { src: image15, alt: "Groworking from Social Media Projects.", kind: "image" } },
  { type: "image", media: { src: image16, alt: "Groworking from Social Media Projects.", kind: "image" } },
  ],
};

export default project;

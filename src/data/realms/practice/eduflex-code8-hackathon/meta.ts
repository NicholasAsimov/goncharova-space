import type { PracticeProject } from "../types";

const image1 = new URL("./01-cover.png", import.meta.url).href;
const image2 = new URL("./02-formapp.png", import.meta.url).href;
const image3 = new URL("./03-formapp-2.png", import.meta.url).href;
const image4 = new URL("./04-formapp-3.png", import.meta.url).href;
const image5 = new URL("./05-dashboard-for-admin.png", import.meta.url).href;
const image6 = new URL("./06-dashboard-for-admin-2.png", import.meta.url).href;
const image7 = new URL("./07-dashboard-for-admin-3.png", import.meta.url).href;
const image8 = new URL("./08-dashboard-for-admin-4.png", import.meta.url).href;
const image9 = new URL("./09-dashboard-for-admin-5.png", import.meta.url).href;
const image10 = new URL("./10-dashboard-for-admin-6.png", import.meta.url).href;

const project: PracticeProject = {
  slug: "eduflex-code8-hackathon",
  title: "EduFlex Code8 Hackathon",
  year: "2024",
  medium: "hackathon product concept",
  summary: "Note: I have provided a detailed description of everything required from our design team during the 8-hour hackathon.",
  tags: ["Dashboard", "Mobile app", "UX/UI"],
  archiveHref: "/resources/notion_portfolio/Portfolio - Kate/Projects/EduFlex-Code8 Hackathon faecb7aebd9f488e9f5b2eea7f4749e9.html",
  coverImage: {
    src: image1,
    alt: "Cover image for EduFlex Code8 Hackathon.",
    kind: "image",
    width: 7680,
    height: 4320,
  },
  media: [
    { src: image1, alt: "Cover image for EduFlex Code8 Hackathon.", kind: "image", width: 7680, height: 4320 },
    { src: image2, alt: "Formapp from EduFlex Code8 Hackathon.", kind: "image", width: 7680, height: 4320 },
    { src: image3, alt: "Formapp from EduFlex Code8 Hackathon.", kind: "image", width: 7680, height: 4320 },
    { src: image4, alt: "Formapp from EduFlex Code8 Hackathon.", kind: "image", width: 7680, height: 4320 },
    { src: image5, alt: "Dashboard for admin from EduFlex Code8 Hackathon.", kind: "image", width: 7680, height: 4320 },
    { src: image6, alt: "Dashboard for admin from EduFlex Code8 Hackathon.", kind: "image", width: 7680, height: 4320 },
    { src: image7, alt: "Dashboard for admin from EduFlex Code8 Hackathon.", kind: "image", width: 7680, height: 4320 },
    { src: image8, alt: "Dashboard for admin from EduFlex Code8 Hackathon.", kind: "image", width: 7680, height: 4320 },
    { src: image9, alt: "Dashboard for admin from EduFlex Code8 Hackathon.", kind: "image", width: 7680, height: 4320 },
    { src: image10, alt: "Dashboard for admin from EduFlex Code8 Hackathon.", kind: "image", width: 7680, height: 4320 },
  ],
  blocks: [
  { type: "heading", level: 3, content: [{ text: "Formapp" }] },
  { type: "image", media: { src: image1, alt: "Cover image for EduFlex Code8 Hackathon.", kind: "image", width: 7680, height: 4320 } },
  { type: "image", media: { src: image2, alt: "Formapp from EduFlex Code8 Hackathon.", kind: "image", width: 7680, height: 4320 } },
  { type: "image", media: { src: image3, alt: "Formapp from EduFlex Code8 Hackathon.", kind: "image", width: 7680, height: 4320 } },
  { type: "image", media: { src: image4, alt: "Formapp from EduFlex Code8 Hackathon.", kind: "image", width: 7680, height: 4320 } },
  { type: "divider" },
  { type: "heading", level: 3, content: [{ text: "Dashboard for admin" }] },
  { type: "image", media: { src: image5, alt: "Dashboard for admin from EduFlex Code8 Hackathon.", kind: "image", width: 7680, height: 4320 } },
  { type: "image", media: { src: image6, alt: "Dashboard for admin from EduFlex Code8 Hackathon.", kind: "image", width: 7680, height: 4320 } },
  { type: "image", media: { src: image7, alt: "Dashboard for admin from EduFlex Code8 Hackathon.", kind: "image", width: 7680, height: 4320 } },
  { type: "image", media: { src: image8, alt: "Dashboard for admin from EduFlex Code8 Hackathon.", kind: "image", width: 7680, height: 4320 } },
  { type: "image", media: { src: image9, alt: "Dashboard for admin from EduFlex Code8 Hackathon.", kind: "image", width: 7680, height: 4320 } },
  { type: "image", media: { src: image10, alt: "Dashboard for admin from EduFlex Code8 Hackathon.", kind: "image", width: 7680, height: 4320 } },
  { type: "divider" },
  { type: "paragraph", content: [{ text: "Note:" }, { text: " I have provided a detailed description of everything required from our design team during the 8-hour hackathon." }] },
  ],
};

export default project;

import type { PracticeProject } from "../types";

const image1 = new URL("./01-cover.png", import.meta.url).href;
const image2 = new URL("./02-onboarding-flow.png", import.meta.url).href;
const image3 = new URL("./03-goal-setting-flow.png", import.meta.url).href;
const image4 = new URL("./04-goal-setting-flow-2.png", import.meta.url).href;
const image5 = new URL("./05-complete-task-flow.png", import.meta.url).href;
const image6 = new URL("./06-mindfulness-flow.png", import.meta.url).href;
const image7 = new URL("./07-community-flow.png", import.meta.url).href;
const image8 = new URL("./08-profile-section-flow.png", import.meta.url).href;

const project: PracticeProject = {
  slug: "curiverse",
  title: "CuriVerse",
  year: "2025",
  medium: "playful product / mobile learning",
  summary: "I designed the CuriVerse app, an experience that helps people grow their curiosity through small daily challenges. The goal was to make learning and self-discovery feel playful and rewarding.",
  tags: ["Application design", "Mobile app", "UX/UI"],
  archiveHref: "/resources/notion_portfolio/Portfolio - Kate/Projects/CuriVerse 30bf27ef1ff7807abb01fe3c9d99e29e.html",
  coverImage: {
    src: image1,
    alt: "Cover image for CuriVerse.",
    kind: "image",
  },
  media: [
    { src: image1, alt: "Cover image for CuriVerse.", kind: "image" },
    { src: image2, alt: "Onboarding flow from CuriVerse.", kind: "image" },
    { src: image3, alt: "Goal setting flow from CuriVerse.", kind: "image" },
    { src: image4, alt: "Goal setting flow from CuriVerse.", kind: "image" },
    { src: image5, alt: "Complete task flow from CuriVerse.", kind: "image" },
    { src: image6, alt: "Mindfulness flow from CuriVerse.", kind: "image" },
    { src: image7, alt: "Community flow from CuriVerse.", kind: "image" },
    { src: image8, alt: "Profile section flow from CuriVerse.", kind: "image" },
  ],
  blocks: [
  { type: "heading", level: 2, content: [{ text: "Cover" }] },
  { type: "image", media: { src: image1, alt: "Cover image for CuriVerse.", kind: "image" } },
  { type: "divider" },
  { type: "heading", level: 2, content: [{ text: "Job Info", bold: true }] },
  { type: "paragraph", content: [{ text: "I designed the " }, { text: "CuriVerse app", bold: true }, { text: ", an experience that helps people grow their curiosity through small daily challenges. The goal was to make learning and self-discovery feel playful and rewarding." }] },
  { type: "paragraph", content: [{ text: "I worked on the full product flow - from " }, { text: "goal setting, task creation, daily mission completion, mindfulness, community", bold: true }, { text: " to " }, { text: "profile page", bold: true }, { text: ". My focus was on building a calm, engaging atmosphere through " }, { text: "intuitive UX, expressive illustrations, and space-inspired visuals", bold: true }, { text: "." }] },
  { type: "paragraph", content: [{ text: "This project taught me how design can motivate behavior change in a gentle, enjoyable way - turning everyday curiosity into a habit." }] },
  { type: "divider" },
  { type: "heading", level: 1, content: [{ text: "Onboarding flow" }] },
  { type: "paragraph", content: [{ text: "The Onboarding flow introduces new users to CuriVerse’s purpose and personality. Through simple, scrollable screens and calm space-themed visuals, it explains how curiosity can be strengthened as a habit and why daily micro-goals matter." }] },
  { type: "image", media: { src: image2, alt: "Onboarding flow from CuriVerse.", kind: "image" } },
  { type: "divider" },
  { type: "heading", level: 1, content: [{ text: "Goal setting flow" }] },
  { type: "paragraph", content: [{ text: "This flow guides new users through setting their very first curiosity challenge.The Goal setting page welcomes them with a playful, space-themed interface that encourages starting the day with purpose - “Set today’s mission.”" }] },
  { type: "paragraph", content: [{ text: "Once users tap to begin, they enter the Set task flow, where they choose a difficulty level that fits their schedule and personalize their goal. The process feels simple, fun, and motivating, helping users turn small daily actions into a habit of curiosity." }] },
  { type: "image", media: { src: image3, alt: "Goal setting flow from CuriVerse.", kind: "image" } },
  { type: "image", media: { src: image4, alt: "Goal setting flow from CuriVerse.", kind: "image" } },
  { type: "divider" },
  { type: "heading", level: 1, content: [{ text: "Complete task flow" }] },
  { type: "paragraph", content: [{ text: "The Complete Task flow guides users through finishing their daily curiosity mission. After viewing their assigned challenge, users can reflect on their experience by writing a short note, uploading a photo, or recording a voice message." }] },
  { type: "paragraph", content: [{ text: "Once the reflection is submitted, users rate their enjoyment of the activity and receive positive reinforcement through friendly visuals and progress streaks. This interaction encourages consistency and celebrates small wins, making curiosity-building feel rewarding and personal." }] },
  { type: "image", media: { src: image5, alt: "Complete task flow from CuriVerse.", kind: "image" } },
  { type: "divider" },
  { type: "heading", level: 1, content: [{ text: "Mindfulness flow", bold: true }] },
  { type: "paragraph", content: [{ text: "The Mindful Curiosity section introduces users to short, guided audio lessons that help them slow down, reflect, and rediscover wonder in everyday moments. Each session is designed to nurture curiosity through calm attention and mindful awareness." }] },
  { type: "paragraph", content: [{ text: "Users can choose from a variety of topics - from cultivating self-awareness to finding joy in ordinary experiences and track their reflections after each session. The gentle visuals and smooth interactions support a sense of focus and relaxation, making mindfulness a natural part of the curiosity journey." }] },
  { type: "image", media: { src: image6, alt: "Mindfulness flow from CuriVerse.", kind: "image" } },
  { type: "divider" },
  { type: "heading", level: 1, content: [{ text: "Community flow", bold: true }] },
  { type: "paragraph", content: [{ text: "The Community section brings together users who share a love for curiosity and exploration. Here, people can post their completed challenges, share resources, and discover what others are learning." }] },
  { type: "paragraph", content: [{ text: "The design encourages engagement through " }, { text: "comments, likes, and discussions", bold: true }, { text: ", while filters and reporting tools ensure a safe and positive space. Whether it’s showcasing progress or finding new ideas, this page turns curiosity into a shared experience." }] },
  { type: "image", media: { src: image7, alt: "Community flow from CuriVerse.", kind: "image" } },
  { type: "divider" },
  { type: "heading", level: 1, content: [{ text: "Profile section flow", bold: true }] },
  { type: "paragraph", content: [{ text: "The Profile section allows users to personalize their experience and track their progress within the app. From here, they can view their curiosity history, favorite missions, and manage personal details like their name, email, and profile photo." }] },
  { type: "paragraph", content: [{ text: "It also includes access to settings, friends, and account preferences - giving users control over notifications, privacy, and connections. The design focuses on clarity and simplicity, making profile management feel smooth and friendly." }] },
  { type: "image", media: { src: image8, alt: "Profile section flow from CuriVerse.", kind: "image" } },
  { type: "divider" },
  ],
};

export default project;

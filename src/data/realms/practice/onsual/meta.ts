import type { PracticeProject } from "../types";

const image1 = new URL("./01-cover.png", import.meta.url).href;
const image2 = new URL("./02-landing-page.png", import.meta.url).href;
const image3 = new URL("./03-onboarding-flow.png", import.meta.url).href;
const image4 = new URL("./04-dashboard-flow.png", import.meta.url).href;
const image5 = new URL("./05-finance-flow.png", import.meta.url).href;
const image6 = new URL("./06-profile-flow.png", import.meta.url).href;

const project: PracticeProject = {
  slug: "onsual",
  title: "Onsual",
  year: "2025",
  medium: "digital product / brand restraint",
  summary: "I designed the Onsual app, a fast-paced reward-based quiz experience where people answer timed questions to earn real money. The goal was to make competition feel exciting while keeping every reward interaction clear, transparent, and trustworthy.",
  tags: ["UX/UI", "Website Design", "iOS app"],
  archiveHref: "/resources/notion_portfolio/Portfolio - Kate/Projects/Onsual 2c3f27ef1ff780debd52e557763365a5.html",
  coverImage: {
    src: image1,
    alt: "Cover image for Onsual.",
    kind: "image",
    width: 1600,
    height: 1000,
  },
  media: [
    { src: image1, alt: "Cover image for Onsual.", kind: "image", width: 1600, height: 1000 },
    { src: image2, alt: "Landing page from Onsual.", kind: "image", width: 2048, height: 7768 },
    { src: image3, alt: "Onboarding flow from Onsual.", kind: "image", width: 2048, height: 1152 },
    { src: image4, alt: "Dashboard flow from Onsual.", kind: "image", width: 1477, height: 1125 },
    { src: image5, alt: "Finance flow from Onsual.", kind: "image", width: 2048, height: 1152 },
    { src: image6, alt: "Profile flow from Onsual.", kind: "image", width: 2048, height: 1152 },
  ],
  blocks: [
  { type: "heading", level: 2, content: [{ text: "Cover" }] },
  { type: "image", media: { src: image1, alt: "Cover image for Onsual.", kind: "image", width: 1600, height: 1000 } },
  { type: "divider" },
  { type: "heading", level: 2, content: [{ text: "Job Info", bold: true }] },
  { type: "paragraph", content: [{ text: "I designed the " }, { text: "Onsual", bold: true }, { text: " app, a fast-paced reward-based quiz experience where people answer timed questions to earn real money. The goal was to make competition feel exciting while keeping every reward interaction clear, transparent, and trustworthy." }] },
  { type: "paragraph", content: [{ text: "I worked on the full product journey - from " }, { text: "quick-play quiz flows, reward logic, wallet interactions, withdrawal steps, leaderboards,", bold: true }, { text: " to " }, { text: "lightweight onboarding", bold: true }, { text: ". My focus was on creating a high-energy atmosphere with " }, { text: "intuitive UX, confident UI patterns, and motivating micro-interactions", bold: true }, { text: " that kept players engaged and eager to continue." }] },
  { type: "paragraph", content: [{ text: "This project taught me how to balance " }, { text: "speed, clarity, and user trust", bold: true }, { text: " - designing an experience that feels both thrilling and reliable. With these improvements, Onsual grew rapidly, reaching " }, { text: "10,000+ users", bold: true }, { text: " and becoming the " }, { text: "#1 app in its category", bold: true }, { text: "." }] },
  { type: "divider" },
  { type: "heading", level: 2, content: [{ text: "Landing page" }] },
  { type: "image", media: { src: image2, alt: "Landing page from Onsual.", kind: "image", width: 2048, height: 7768 } },
  { type: "divider" },
  { type: "heading", level: 1, content: [{ text: "Onboarding flow" }] },
  { type: "paragraph", content: [{ text: "The Onsual onboarding flow introduces users to the app’s core idea - turning quick daily quizzes into real cash rewards. The flow guides new users through registration, gameplay, and leaderboard features in a simple and engaging way." }] },
  { type: "image", media: { src: image3, alt: "Onboarding flow from Onsual.", kind: "image", width: 2048, height: 1152 } },
  { type: "divider" },
  { type: "heading", level: 1, content: [{ text: "Dashboard flow" }] },
  { type: "paragraph", content: [{ text: "The dashboard gives users quick access to upcoming quizzes, rewards, and stats. From here, they can start games, track performance, and view live leaderboards, making it easy to play, compete, and win in one place" }] },
  { type: "image", media: { src: image4, alt: "Dashboard flow from Onsual.", kind: "image", width: 1477, height: 1125 } },
  { type: "divider" },
  { type: "heading", level: 1, content: [{ text: "Finance flow" }] },
  { type: "paragraph", content: [{ text: "The finance flow lets users easily track their earnings, view transaction history, and withdraw winnings securely. Clear layouts and instant feedback make managing rewards simple, transparent, and stress-free." }] },
  { type: "image", media: { src: image5, alt: "Finance flow from Onsual.", kind: "image", width: 2048, height: 1152 } },
  { type: "divider" },
  { type: "heading", level: 1, content: [{ text: "Profile flow" }] },
  { type: "paragraph", content: [{ text: "The profile section lets users personalize their experience - update details, choose avatars, switch app icons, and adjust settings like language or appearance. It’s designed to keep customization simple and enjoyable." }] },
  { type: "image", media: { src: image6, alt: "Profile flow from Onsual.", kind: "image", width: 2048, height: 1152 } },
  { type: "divider" },
  { type: "heading", level: 2, content: [{ text: "App store link" }] },
  ],
};

export default project;

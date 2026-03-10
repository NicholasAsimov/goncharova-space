import type { PracticeProject } from "../types";

const image1 = new URL("./01-cover.png", import.meta.url).href;
const image2 = new URL("./02-information-architecture.png", import.meta.url).href;
const image3 = new URL("./03-high-fidelity.png", import.meta.url).href;
const image4 = new URL("./04-design-system.png", import.meta.url).href;
const image5 = new URL("./05-typography-colors.png", import.meta.url).href;
const image6 = new URL("./06-typography-colors-2.png", import.meta.url).href;
const image7 = new URL("./07-ui.png", import.meta.url).href;
const image8 = new URL("./08-ui-2.png", import.meta.url).href;
const image9 = new URL("./09-ui-3.png", import.meta.url).href;
const image10 = new URL("./10-ui-4.png", import.meta.url).href;
const image11 = new URL("./11-ui-5.png", import.meta.url).href;
const image12 = new URL("./12-ui-6.png", import.meta.url).href;
const image13 = new URL("./13-ui-7.png", import.meta.url).href;

const project: PracticeProject = {
  slug: "finance-app",
  title: "Finance App",
  year: "2025",
  medium: "product / mobile UX",
  summary: "The tracking of the customer's payment and transfer transactions made through the payment card on the app, and providing suggestions for reducing expenses.",
  tags: ["Application design", "UX/UI"],
  archiveHref: "/resources/notion_portfolio/Portfolio - Kate/Projects/Finance app 310f27ef1ff780b78db8dae164b68a19.html",
  coverImage: {
    src: image1,
    alt: "Cover image for Finance App.",
    kind: "image",
  },
  media: [
    { src: image1, alt: "Cover image for Finance App.", kind: "image" },
    { src: image2, alt: "Information Architecture from Finance App.", kind: "image" },
    { src: image3, alt: "High Fidelity from Finance App.", kind: "image" },
    { src: image4, alt: "Design System from Finance App.", kind: "image" },
    { src: image5, alt: "Typography & Colors from Finance App.", kind: "image" },
    { src: image6, alt: "Typography & Colors from Finance App.", kind: "image" },
    { src: image7, alt: "UI from Finance App.", kind: "image" },
    { src: image8, alt: "UI from Finance App.", kind: "image" },
    { src: image9, alt: "UI from Finance App.", kind: "image" },
    { src: image10, alt: "UI from Finance App.", kind: "image" },
    { src: image11, alt: "UI from Finance App.", kind: "image" },
    { src: image12, alt: "UI from Finance App.", kind: "image" },
    { src: image13, alt: "UI from Finance App.", kind: "image" },
  ],
  blocks: [
  { type: "heading", level: 2, content: [{ text: "Cover" }] },
  { type: "image", media: { src: image1, alt: "Cover image for Finance App.", kind: "image" } },
  { type: "heading", level: 2, content: [{ text: "Info" }] },
  { type: "paragraph", content: [{ text: "The tracking of the customer's payment and transfer transactions made through the payment card on the app, and providing suggestions for reducing expenses." }] },
  { type: "divider" },
  { type: "heading", level: 2, content: [{ text: "Task" }] },
  { type: "paragraph", content: [{ text: "Displaying detailed statistics of the user's daily expenses, allowing them to easily track how much has been spent on each category throughout the current month. Based on this information, providing personalized suggestions to help the user adjust their daily spending, either by increasing or reducing their expenditures." }] },
  { type: "heading", level: 2, content: [{ text: "Problems" }] },
  { type: "list", items: [[{ text: "Users may struggle to track their daily expenses due to a lack of clear information and visualization." }], [{ text: "Users may find it difficult to understand how their daily expenses impact their overall monthly budget." }], [{ text: "Lack of User Interface" }], [{ text: "The lack of real-time updates means that the user will not be able to accurately track their daily expenses when they cannot see their most recent transactions." }]] },
  { type: "divider" },
  { type: "heading", level: 2, content: [{ text: "Solutions" }] },
  { type: "list", items: [[{ text: "Allow users to create specific categories for expenses and enable all expenses to be added to the appropriate categories." }], [{ text: "A summary of the monthly expenses with aggregated graphs for each category, along with the functionality to compare expenses with previous months." }], [{ text: "Making the User Interface more user-friendly and understandable." }], [{ text: "Having real-time updates that reflect the most recent spending activities immediately." }]] },
  { type: "divider" },
  { type: "heading", level: 2, content: [{ text: "Information Architecture" }] },
  { type: "image", media: { src: image2, alt: "Information Architecture from Finance App.", kind: "image" } },
  { type: "divider" },
  { type: "heading", level: 2, content: [{ text: "High Fidelity" }] },
  { type: "image", media: { src: image3, alt: "High Fidelity from Finance App.", kind: "image" } },
  { type: "divider" },
  { type: "heading", level: 2, content: [{ text: "Design System" }] },
  { type: "image", media: { src: image4, alt: "Design System from Finance App.", kind: "image" } },
  { type: "divider" },
  { type: "heading", level: 2, content: [{ text: "Typography & Colors" }] },
  { type: "image", media: { src: image5, alt: "Typography & Colors from Finance App.", kind: "image" } },
  { type: "image", media: { src: image6, alt: "Typography & Colors from Finance App.", kind: "image" } },
  { type: "divider" },
  { type: "heading", level: 2, content: [{ text: "UI" }] },
  { type: "image", media: { src: image7, alt: "UI from Finance App.", kind: "image" } },
  { type: "image", media: { src: image8, alt: "UI from Finance App.", kind: "image" } },
  { type: "image", media: { src: image9, alt: "UI from Finance App.", kind: "image" } },
  { type: "image", media: { src: image10, alt: "UI from Finance App.", kind: "image" } },
  { type: "image", media: { src: image11, alt: "UI from Finance App.", kind: "image" } },
  { type: "image", media: { src: image12, alt: "UI from Finance App.", kind: "image" } },
  { type: "image", media: { src: image13, alt: "UI from Finance App.", kind: "image" } },
  ],
};

export default project;

import type { PracticeProject } from "../types";

const image1 = new URL("./01-cover.webp", import.meta.url).href;
const image2 = new URL("./02-understanding-anxiety-you-are-not-alone.gif", import.meta.url).href;
const image3 = new URL("./03-understanding-anxiety-you-are-not-alone-2.png", import.meta.url).href;
const image4 = new URL("./04-understanding-anxiety-you-are-not-alone-3.png", import.meta.url).href;
const image5 = new URL("./05-understanding-anxiety-you-are-not-alone-4.png", import.meta.url).href;
const image6 = new URL("./06-understanding-anxiety-you-are-not-alone-5.png", import.meta.url).href;
const image7 = new URL("./07-claustrophobia.jpg", import.meta.url).href;
const image8 = new URL("./08-social-anxiety.jpg", import.meta.url).href;
const image9 = new URL("./09-panic-disorder.jpg", import.meta.url).href;

const project: PracticeProject = {
  slug: "experimental-poster-design",
  title: "Experimental Poster Design",
  year: "2025",
  medium: "graphic experiment / image distortion",
  summary: "Anxiety is something we all experience at different points in our lives. Whether it's feeling trapped in a crowded space, overwhelmed in social situations, or facing sudden waves of panic, these emotions are real, but they don’t define us. It’s okay to feel this way.",
  tags: ["Graphic design", "Midjourney"],
  archiveHref: "/resources/notion_portfolio/Portfolio - Kate/Projects/Experimental Poster Design 210f27ef1ff78036b2dac812a478733a.html",
  coverImage: {
    src: image1,
    alt: "Cover image for Experimental Poster Design.",
    kind: "image",
    width: 2048,
    height: 1365,
  },
  media: [
    { src: image1, alt: "Cover image for Experimental Poster Design.", kind: "image", width: 2048, height: 1365 },
    { src: image2, alt: "Understanding Anxiety: You Are Not Alone from Experimental Poster Design.", kind: "image", width: 4096, height: 2730 },
    { src: image3, alt: "Understanding Anxiety: You Are Not Alone from Experimental Poster Design.", kind: "image", width: 1200, height: 1200 },
    { src: image4, alt: "Understanding Anxiety: You Are Not Alone from Experimental Poster Design.", kind: "image", width: 1200, height: 1200 },
    { src: image5, alt: "Understanding Anxiety: You Are Not Alone from Experimental Poster Design.", kind: "image", width: 1200, height: 1200 },
    { src: image6, alt: "Understanding Anxiety: You Are Not Alone from Experimental Poster Design.", kind: "image", width: 1794, height: 1178 },
    { src: image7, alt: "Claustrophobia from Experimental Poster Design.", kind: "image", width: 6000, height: 4500 },
    { src: image8, alt: "Social Anxiety from Experimental Poster Design.", kind: "image", width: 6000, height: 4500 },
    { src: image9, alt: "Panic Disorder from Experimental Poster Design.", kind: "image", width: 6000, height: 4500 },
  ],
  blocks: [
  { type: "image", media: { src: image1, alt: "Cover image for Experimental Poster Design.", kind: "image", width: 2048, height: 1365 } },
  { type: "divider" },
  { type: "heading", level: 2, content: [{ text: "Understanding Anxiety: You Are Not Alone", bold: true }] },
  { type: "paragraph", content: [{ text: "Anxiety is something we all experience at different points in our lives. Whether it's feeling trapped in a crowded space, overwhelmed in social situations, or facing sudden waves of panic, these emotions are real, but they don’t define us. " }, { text: "It’s okay to feel this way.", bold: true }] },
  { type: "paragraph", content: [{ text: "Anxiety is not a weakness—it’s part of being human." }] },
  { type: "image", media: { src: image2, alt: "Understanding Anxiety: You Are Not Alone from Experimental Poster Design.", kind: "image", width: 4096, height: 2730 } },
  { type: "divider" },
  { type: "paragraph", content: [{ text: "Through these posters, I wanted to " }, { text: "visualize the emotional weight of anxiety disorders", bold: true }, { text: " while reminding everyone that they are not alone. Each image represents a struggle many of us face, but also the strength we have to manage and overcome these moments." }] },
  { type: "paragraph", content: [{ text: "To create these visuals, I used " }, { text: "Midjourney AI", bold: true }, { text: " to generate thought-provoking imagery, capturing the essence of claustrophobia, panic disorder, and social anxiety. Afterward, I refined and designed these posters in " }, { text: "Photoshop", bold: true }, { text: ", ensuring" }] },
  { type: "divider" },
  { type: "image", media: { src: image3, alt: "Understanding Anxiety: You Are Not Alone from Experimental Poster Design.", kind: "image", width: 1200, height: 1200 } },
  { type: "image", media: { src: image4, alt: "Understanding Anxiety: You Are Not Alone from Experimental Poster Design.", kind: "image", width: 1200, height: 1200 } },
  { type: "image", media: { src: image5, alt: "Understanding Anxiety: You Are Not Alone from Experimental Poster Design.", kind: "image", width: 1200, height: 1200 } },
  { type: "image", media: { src: image6, alt: "Understanding Anxiety: You Are Not Alone from Experimental Poster Design.", kind: "image", width: 1794, height: 1178 } },
  { type: "divider" },
  { type: "heading", level: 2, content: [{ text: "Claustrophobia" }] },
  { type: "image", media: { src: image7, alt: "Claustrophobia from Experimental Poster Design.", kind: "image", width: 6000, height: 4500 } },
  { type: "paragraph", content: [{ text: "Definition:", bold: true }, { text: " An intense fear of enclosed or tight spaces." }] },
  { type: "paragraph", content: [{ text: "Symptoms:", bold: true }, { text: " Anxiety, breathlessness, sweating, dizziness, rapid heartbeat, and panic attacks." }] },
  { type: "paragraph", content: [{ text: "Triggers:", bold: true }, { text: " Elevators, tunnels, crowded rooms, small cars, MRI machines." }] },
  { type: "paragraph", content: [{ text: "Causes:", bold: true }, { text: " Often linked to past trauma, genetic predisposition, or brain function." }] },
  { type: "paragraph", content: [{ text: "Management:", bold: true }, { text: " Deep breathing, gradual exposure therapy, relaxation techniques, cognitive behavioral therapy (CBT)." }] },
  { type: "divider" },
  { type: "heading", level: 2, content: [{ text: "Social Anxiety" }] },
  { type: "image", media: { src: image8, alt: "Social Anxiety from Experimental Poster Design.", kind: "image", width: 6000, height: 4500 } },
  { type: "paragraph", content: [{ text: "Definition:", bold: true }, { text: " A deep fear of being judged or embarrassed in social situations." }] },
  { type: "paragraph", content: [{ text: "Symptoms:", bold: true }, { text: " Sweating, trembling, rapid heartbeat, nausea, avoiding social events, extreme self-consciousness." }] },
  { type: "paragraph", content: [{ text: "Triggers:", bold: true }, { text: " Public speaking, meeting new people, group interactions, being the center of attention." }] },
  { type: "paragraph", content: [{ text: "Causes:", bold: true }, { text: " Genetic predisposition, past negative experiences, overactive amygdala (brain region controlling fear)." }] },
  { type: "paragraph", content: [{ text: "Management:", bold: true }, { text: " Gradual exposure, mindfulness, therapy (CBT), relaxation techniques," }, { break: true }, { text: "self-affirmation." }] },
  { type: "divider" },
  { type: "heading", level: 2, content: [{ text: "Panic Disorder" }] },
  { type: "image", media: { src: image9, alt: "Panic Disorder from Experimental Poster Design.", kind: "image", width: 6000, height: 4500 } },
  { type: "paragraph", content: [{ text: "Definition:", bold: true }, { text: " A condition where a person experiences recurring panic attacks—sudden episodes of intense fear." }] },
  { type: "paragraph", content: [{ text: "Symptoms:", bold: true }, { text: " Rapid heartbeat, dizziness, chest pain, shortness of breath, nausea, trembling," }, { break: true }, { text: "a sense of impending doom." }] },
  { type: "paragraph", content: [{ text: "Triggers:", bold: true }, { text: " Stress, trauma, phobias, major life changes, overuse of stimulants (caffeine, nicotine)." }] },
  { type: "paragraph", content: [{ text: "Causes:", bold: true }, { text: " Genetic factors, brain chemistry, heightened stress response." }] },
  { type: "paragraph", content: [{ text: "Management:", bold: true }, { text: " Deep breathing, grounding techniques, therapy (CBT), medication (if prescribed), lifestyle changes." }] },
  { type: "divider" },
  { type: "heading", level: 3, content: [{ text: "If you ever feel overwhelmed, remember:", bold: true }] },
  { type: "paragraph", content: [{ text: "You are not alone. You are stronger than your anxiety. It is temporary, and ", bold: true }, { break: true }, { text: "it does not define you. Keep moving forward.", bold: true }] },
  { type: "paragraph", content: [{ text: "✨" }] },
  ],
};

export default project;

import type { PracticeProject } from "../types";

const image1 = new URL("./01-cover.png", import.meta.url).href;
const image2 = new URL("./02-image-1.png", import.meta.url).href;
const image3 = new URL("./03-design-portfolio.png", import.meta.url).href;
const image4 = new URL("./04-design-portfolio-2.png", import.meta.url).href;
const image5 = new URL("./05-design-portfolio-3.png", import.meta.url).href;
const image6 = new URL("./06-design-portfolio-4.png", import.meta.url).href;
const image7 = new URL("./07-design-portfolio-5.png", import.meta.url).href;
const image8 = new URL("./08-design-portfolio-6.png", import.meta.url).href;
const image9 = new URL("./09-design-portfolio-7.png", import.meta.url).href;
const image10 = new URL("./10-design-portfolio-8.png", import.meta.url).href;
const image11 = new URL("./11-design-portfolio-9.png", import.meta.url).href;
const image12 = new URL("./12-design-portfolio-10.png", import.meta.url).href;

const project: PracticeProject = {
  slug: "firstmovr-x-colgate-palmolive",
  title: "Firstmovr x Colgate-Palmolive",
  year: "2025",
  medium: "campaign / AI generation",
  summary: "As AI-Generated Graphic Designer at FirstMovr collaborating with Colgate-Palmolive, I enhanced graphic design processes with AI, boosting brand visuals and marketing efficiency. My AI-generated images were featured on Amazon and Walmart, expanding the brand's digital presence across various countries. By introducing innovative AI-driven strategies, fostering teamwork, and staying updated on AI trends, I elevated digital content creativity and set higher standards for visual marketing.",
  tags: ["AI Generation", "Branding", "Social media"],
  archiveHref: "/resources/notion_portfolio/Portfolio - Kate/Projects/Firstmovr x Colgate-Palmolive 2c3f27ef1ff7809687c1d196a70be691.html",
  coverImage: {
    src: image1,
    alt: "Cover image for Firstmovr x Colgate-Palmolive.",
    kind: "image",
  },
  media: [
    { src: image1, alt: "Cover image for Firstmovr x Colgate-Palmolive.", kind: "image" },
    { src: image2, alt: "Case study image 2 from Firstmovr x Colgate-Palmolive.", kind: "image" },
    { src: image3, alt: "Design Portfolio from Firstmovr x Colgate-Palmolive.", kind: "image" },
    { src: image4, alt: "Design Portfolio from Firstmovr x Colgate-Palmolive.", kind: "image" },
    { src: image5, alt: "Design Portfolio from Firstmovr x Colgate-Palmolive.", kind: "image" },
    { src: image6, alt: "Design Portfolio from Firstmovr x Colgate-Palmolive.", kind: "image" },
    { src: image7, alt: "Design Portfolio from Firstmovr x Colgate-Palmolive.", kind: "image" },
    { src: image8, alt: "Design Portfolio from Firstmovr x Colgate-Palmolive.", kind: "image" },
    { src: image9, alt: "Design Portfolio from Firstmovr x Colgate-Palmolive.", kind: "image" },
    { src: image10, alt: "Design Portfolio from Firstmovr x Colgate-Palmolive.", kind: "image" },
    { src: image11, alt: "Design Portfolio from Firstmovr x Colgate-Palmolive.", kind: "image" },
    { src: image12, alt: "Design Portfolio from Firstmovr x Colgate-Palmolive.", kind: "image" },
  ],
  blocks: [
  { type: "image", media: { src: image1, alt: "Cover image for Firstmovr x Colgate-Palmolive.", kind: "image" } },
  { type: "image", media: { src: image2, alt: "Case study image 2 from Firstmovr x Colgate-Palmolive.", kind: "image" } },
  { type: "divider" },
  { type: "heading", level: 2, content: [{ text: "Job Info" }] },
  { type: "paragraph", content: [{ text: "As AI-Generated Graphic Designer at " }, { text: "FirstMovr", bold: true }, { text: " collaborating with " }, { text: "Colgate-Palmolive", bold: true }, { text: ", I enhanced graphic design processes with AI, boosting brand visuals and marketing efficiency. My AI-generated images were featured on " }, { text: "Amazon and Walmart", bold: true }, { text: ", expanding the brand's digital presence across various countries. By introducing innovative AI-driven strategies, fostering teamwork, and staying updated on AI trends, I elevated digital content creativity and set higher standards for visual marketing." }] },
  { type: "divider" },
  { type: "heading", level: 2, content: [{ text: "Tools I Used in This Role" }] },
  { type: "list", items: [[{ text: "ChatGPT", bold: true }, { text: ":" }, { text: "Utilized to craft better and more professional prompts for generating images with DALL-E and Adobe Firefly. ChatGPT helped refine the creative process by optimizing prompt structures, ensuring that the AI-generated visuals aligned with the brand’s vision and marketing goals. Additionally, it assisted in generating ideas and enhancing text-based content for various projects." }], [{ text: "DALL-E", bold: true }, { text: ":" }, { text: "Used to generate high-quality visuals for a toothpaste company, including images of teeth, flavors, fruits, toothbrushes, and other related elements. These AI-generated visuals were carefully designed to fit the brand’s visual identity and were prominently featured on e-commerce platforms such as Amazon and Walmart." }], [{ text: "Adobe Firefly", bold: true }, { text: ":" }, { text: "Focused on generating human images and enhancing their realism for diverse design projects. Firefly was essential in creating lifelike and visually appealing human representations, adding authenticity and depth to the brand's marketing materials." }], [{ text: "Adobe Photoshop", bold: true }, { text: ":" }, { text: "Leveraged to refine, enhance, and finalize AI-generated images. Photoshop ensured that each visual met the highest standards of quality, consistency, and branding before being deployed across various platforms, including e-commerce and digital marketing channels." }]] },
  { type: "divider" },
  { type: "heading", level: 2, content: [{ text: "Design Portfolio" }] },
  { type: "image", media: { src: image3, alt: "Design Portfolio from Firstmovr x Colgate-Palmolive.", kind: "image" } },
  { type: "image", media: { src: image4, alt: "Design Portfolio from Firstmovr x Colgate-Palmolive.", kind: "image" } },
  { type: "image", media: { src: image5, alt: "Design Portfolio from Firstmovr x Colgate-Palmolive.", kind: "image" } },
  { type: "image", media: { src: image6, alt: "Design Portfolio from Firstmovr x Colgate-Palmolive.", kind: "image" } },
  { type: "image", media: { src: image7, alt: "Design Portfolio from Firstmovr x Colgate-Palmolive.", kind: "image" } },
  { type: "image", media: { src: image8, alt: "Design Portfolio from Firstmovr x Colgate-Palmolive.", kind: "image" } },
  { type: "image", media: { src: image9, alt: "Design Portfolio from Firstmovr x Colgate-Palmolive.", kind: "image" } },
  { type: "image", media: { src: image10, alt: "Design Portfolio from Firstmovr x Colgate-Palmolive.", kind: "image" } },
  { type: "image", media: { src: image11, alt: "Design Portfolio from Firstmovr x Colgate-Palmolive.", kind: "image" } },
  { type: "image", media: { src: image12, alt: "Design Portfolio from Firstmovr x Colgate-Palmolive.", kind: "image" } },
  { type: "divider" },
  { type: "heading", level: 3, content: [{ text: "View My Work on Amazon and Walmart" }] },
  { type: "paragraph", content: [{ text: "Here are some links to my design work on Amazon and Walmart, where you can explore the visuals I created in collaboration with Colgate-Palmolive." }] },
  { type: "heading", level: 3, content: [{ text: "Link 1", bold: true, href: "https://www.amazon.com.br/dp/B08TR56JM2/?psc=1" }] },
  { type: "heading", level: 3, content: [{ text: "Link", href: "https://www.amazon.com.br/Sensibilidade-Colgate-Sensitive-Pro-Al%C3%ADvio-Temperatures/dp/B0C2ZVLTM8/" }, { text: " 2" }] },
  { type: "heading", level: 3, content: [{ text: "Link 3 (Walmart)", href: "https://super.walmart.com.mx/ip/pasta-dental-para-ninos-colgate-kids-tandy-combate-germenes-y-bacterias-50g-1-pieza/00750954607227?srsltid=AfmBOort1qqEADVvg1e3aF1CggSX39hKkuWbv__DZuDxRfUALPJk_coU" }] },
  { type: "heading", level: 3, content: [{ text: "Link", href: "https://www.amazon.co.uk/dp/B08HLWC368" }, { text: " 4" }] },
  { type: "heading", level: 3, content: [{ text: "Link", href: "https://www.amazon.co.uk/dp/B07B479KJ7?th=1" }, { text: " 5" }] },
  ],
};

export default project;

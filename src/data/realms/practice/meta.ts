import curiverse from "./curiverse/meta";
import eduflexCode8Hackathon from "./eduflex-code8-hackathon/meta";
import elaraJewelleryWebsite from "./elara-jewellery-website/meta";
import experimentalPosterDesign from "./experimental-poster-design/meta";
import financeApp from "./finance-app/meta";
import firstmovrColgatePalmolive from "./firstmovr-x-colgate-palmolive/meta";
import futureLabMerchandise from "./future-lab-merchandise/meta";
import linnPlakatEventApp from "./linn-plakat-event-app/meta";
import moremoneymorelove from "./moremoneymorelove/meta";
import onsual from "./onsual/meta";
import socialMediaProjects from "./social-media-projects/meta";
import spinRecordsVinylWebsite from "./spin-records-vinyl-website/meta";
import theSoulCodesLogo from "./the-soul-codes-logo/meta";
import typographicPosterDesigns from "./typographic-poster-designs/meta";

export const practiceProjects = [
  socialMediaProjects,
  spinRecordsVinylWebsite,
  financeApp,
  curiverse,
  onsual,
  firstmovrColgatePalmolive,
  futureLabMerchandise,
  typographicPosterDesigns,
  experimentalPosterDesign,
  moremoneymorelove,
  linnPlakatEventApp,
  elaraJewelleryWebsite,
  eduflexCode8Hackathon,
  theSoulCodesLogo,
];

const practiceMeta = {
  slug: "practice",
  name: "Practice",
  subtitle: "product, systems, digital clarity",
  description:
    "Practice is the disciplined side of Kate's kingdom: the lens through which intuition becomes structure, and sensitivity becomes clarity. Here, UX/UI, branding, and digital systems are not separate from her artistic self; they are evidence that care, logic, and elegance can coexist. This realm should feel precise, calm, and deeply intentional without ever becoming cold.",
  coverMedia: practiceProjects[0].coverImage,
  projects: practiceProjects,
} as const;

export default practiceMeta;

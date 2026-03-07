export type RealmSlug =
  | "studio"
  | "orchard"
  | "rooms"
  | "practice"
  | "play";

export type MediaKind = "image";

export interface MediaItem {
  src: string;
  alt: string;
  kind: MediaKind;
  caption?: string;
}

export interface Realm {
  slug: RealmSlug;
  name: string;
  subtitle: string;
  intro: string;
  coverMedia: MediaItem;
}

export interface Work {
  slug: string;
  title: string;
  year: string;
  medium: string;
  summary: string;
  tags: string[];
  realmSlug: RealmSlug;
  relatedRealmSlugs?: RealmSlug[];
  archiveHref?: string;
  media: MediaItem[];
}

export const siteManifest: { realms: Realm[]; works: Work[] } = {
  realms: [
    {
      slug: "studio",
      name: "Studio",
      subtitle: "drawings, marks, visual studies",
      intro:
        "A room for sketches, posters, symbols, and graphic instincts. This is where line, texture, and mood arrive before they explain themselves.",
      coverMedia: {
        src: "/resources/notion_portfolio/Portfolio - Kate/Projects/The soul codes - Logo/the_soul_codes_mockup_list_(1).png",
        alt: "Logo studies and symbolic forms from Kate's visual studio.",
        kind: "image",
      },
    },
    {
      slug: "orchard",
      name: "Orchard",
      subtitle: "flowers, color, citrus, still life energy",
      intro:
        "Color stories, soft branding, campaign fragments, and objects with warmth. The orchard is where fruit, paper, petals, and graphic rhythm meet.",
      coverMedia: {
        src: "/resources/notion_portfolio/Portfolio - Kate/Projects/Future Lab Merchandise/Curiosity_11zon.png",
        alt: "Colorful merchandise graphic with a warm citrus energy.",
        kind: "image",
      },
    },
    {
      slug: "rooms",
      name: "Rooms",
      subtitle: "atmosphere, objects, editorial spaces",
      intro:
        "Worlds built from interiors, objects, fashion touches, and spatial quiet. These works feel like stepping into light, fabric, shadow, and placement.",
      coverMedia: {
        src: "/resources/notion_portfolio/Portfolio - Kate/Projects/Elara jewellery website/Main_ready.png",
        alt: "Jewellery editorial interface evoking an intimate interior space.",
        kind: "image",
      },
    },
    {
      slug: "practice",
      name: "Practice",
      subtitle: "product, systems, digital clarity",
      intro:
        "UX/UI and product thinking as part of the same visual practice. Structure, trust, and interaction live here without losing tenderness.",
      coverMedia: {
        src: "/resources/notion_portfolio/Portfolio - Kate/Projects/CuriVerse/image 4.png",
        alt: "Colorful mobile product screens from Kate's interface practice.",
        kind: "image",
      },
    },
    {
      slug: "play",
      name: "Play",
      subtitle: "experiments, motion, image collisions",
      intro:
        "The experimental corner: AI-assisted campaigns, bolder graphic motion, and image-making that behaves more like improvisation than layout.",
      coverMedia: {
        src: "/resources/notion_portfolio/Portfolio - Kate/Projects/Firstmovr x Colgate-Palmolive/image 3.png",
        alt: "Bright campaign image full of layered digital play.",
        kind: "image",
      },
    },
  ],
  works: [
    {
      slug: "social-media-projects",
      title: "Social Media Projects",
      year: "2025",
      medium: "branding / campaign visuals",
      summary:
        "A set of campaign images and social narratives shaped to feel legible, immediate, and alive inside the feed.",
      tags: ["social", "branding", "campaign"],
      realmSlug: "orchard",
      archiveHref:
        "/resources/notion_portfolio/Portfolio - Kate/Projects/Social Media Projects 313f27ef1ff780618a65cc147471906f.html",
      media: [
        {
          src: "/resources/notion_portfolio/Portfolio - Kate/Projects/Social Media Projects/2834c4e7-9605-4a34-824d-1fc06a1c8a14.png",
          alt: "Social media project cover with warm branding collage.",
          kind: "image",
        },
        {
          src: "/resources/notion_portfolio/Portfolio - Kate/Projects/Social Media Projects/Screenshot_2025-11-24_at_23.44.15.png",
          alt: "A detailed social media layout from the campaign set.",
          kind: "image",
        },
        {
          src: "/resources/notion_portfolio/Portfolio - Kate/Projects/Social Media Projects/Screenshot_2026-02-26_at_15.10.23.png",
          alt: "Late-stage social media composition with polished campaign framing.",
          kind: "image",
        },
      ],
    },
    {
      slug: "spin-records-vinyl-website",
      title: "Spin Records - Vinyl Website",
      year: "2025",
      medium: "website / editorial commerce",
      summary:
        "An identity-rich record store concept balancing product display with editorial typography and music-culture atmosphere.",
      tags: ["website", "editorial", "music"],
      realmSlug: "rooms",
      archiveHref:
        "/resources/notion_portfolio/Portfolio - Kate/Projects/Spin Records - Vinyl Website 310f27ef1ff78098865bfe0a372ee456.html",
      media: [
        {
          src: "/resources/notion_portfolio/Portfolio - Kate/Projects/Spin Records - Vinyl Website/image.png",
          alt: "Cover image for the Spin Records website concept.",
          kind: "image",
        },
        {
          src: "/resources/notion_portfolio/Portfolio - Kate/Projects/Spin Records - Vinyl Website/image 5.png",
          alt: "Interior product layout for the vinyl store concept.",
          kind: "image",
        },
        {
          src: "/resources/notion_portfolio/Portfolio - Kate/Projects/Spin Records - Vinyl Website/image 15.png",
          alt: "Editorial-style page from the vinyl website case study.",
          kind: "image",
        },
      ],
    },
    {
      slug: "finance-app",
      title: "Finance App",
      year: "2025",
      medium: "product / mobile UX",
      summary:
        "A calm mobile finance concept focused on trust, concise flows, and everyday money clarity.",
      tags: ["product", "mobile", "ux/ui"],
      realmSlug: "practice",
      archiveHref:
        "/resources/notion_portfolio/Portfolio - Kate/Projects/Finance app 310f27ef1ff780b78db8dae164b68a19.html",
      media: [
        {
          src: "/resources/notion_portfolio/Portfolio - Kate/Projects/Finance app/image.png",
          alt: "Finance app concept cover screen.",
          kind: "image",
        },
        {
          src: "/resources/notion_portfolio/Portfolio - Kate/Projects/Finance app/image 6.png",
          alt: "Finance app interface with card and transaction views.",
          kind: "image",
        },
        {
          src: "/resources/notion_portfolio/Portfolio - Kate/Projects/Finance app/image 12.png",
          alt: "Detailed finance app interface with a polished mobile layout.",
          kind: "image",
        },
      ],
    },
    {
      slug: "curiverse",
      title: "CuriVerse",
      year: "2025",
      medium: "playful product / mobile learning",
      summary:
        "A colorful learning product with character-driven interactions and guided behavioral flows.",
      tags: ["product", "learning", "mobile"],
      realmSlug: "practice",
      relatedRealmSlugs: ["play"],
      archiveHref:
        "/resources/notion_portfolio/Portfolio - Kate/Projects/CuriVerse 30bf27ef1ff7807abb01fe3c9d99e29e.html",
      media: [
        {
          src: "/resources/notion_portfolio/Portfolio - Kate/Projects/CuriVerse/image.png",
          alt: "CuriVerse cover showing playful interface language.",
          kind: "image",
        },
        {
          src: "/resources/notion_portfolio/Portfolio - Kate/Projects/CuriVerse/image 4.png",
          alt: "Colorful CuriVerse screen set.",
          kind: "image",
        },
        {
          src: "/resources/notion_portfolio/Portfolio - Kate/Projects/CuriVerse/image 7.png",
          alt: "Additional learning interface screens from CuriVerse.",
          kind: "image",
        },
      ],
    },
    {
      slug: "onsual",
      title: "Onsual",
      year: "2025",
      medium: "digital product / brand restraint",
      summary:
        "A minimal digital identity with restrained interface blocks and a cool brand confidence.",
      tags: ["ux/ui", "website", "ios"],
      realmSlug: "practice",
      relatedRealmSlugs: ["rooms"],
      archiveHref:
        "/resources/notion_portfolio/Portfolio - Kate/Projects/Onsual 2c3f27ef1ff780debd52e557763365a5.html",
      media: [
        {
          src: "/resources/notion_portfolio/Portfolio - Kate/Projects/Onsual/image.png",
          alt: "Onsual hero mockup.",
          kind: "image",
        },
        {
          src: "/resources/notion_portfolio/Portfolio - Kate/Projects/Onsual/image 2.png",
          alt: "Onsual interface detail in a clean modern palette.",
          kind: "image",
        },
        {
          src: "/resources/notion_portfolio/Portfolio - Kate/Projects/Onsual/image 4.png",
          alt: "Further Onsual interface exploration.",
          kind: "image",
        },
      ],
    },
    {
      slug: "firstmovr-colgate-palmolive",
      title: "Firstmovr x Colgate-Palmolive",
      year: "2025",
      medium: "campaign / AI generation",
      summary:
        "A fast-moving branded campaign combining story-driven visuals with AI-assisted content production.",
      tags: ["campaign", "ai", "motion-minded"],
      realmSlug: "play",
      relatedRealmSlugs: ["orchard"],
      archiveHref:
        "/resources/notion_portfolio/Portfolio - Kate/Projects/Firstmovr x Colgate-Palmolive 2c3f27ef1ff7809687c1d196a70be691.html",
      media: [
        {
          src: "/resources/notion_portfolio/Portfolio - Kate/Projects/Firstmovr x Colgate-Palmolive/image 7.png",
          alt: "Campaign key visual for the Colgate-Palmolive collaboration.",
          kind: "image",
        },
        {
          src: "/resources/notion_portfolio/Portfolio - Kate/Projects/Firstmovr x Colgate-Palmolive/image 3.png",
          alt: "Secondary campaign visual from the collaboration.",
          kind: "image",
        },
        {
          src: "/resources/notion_portfolio/Portfolio - Kate/Projects/Firstmovr x Colgate-Palmolive/image 11.png",
          alt: "Expanded campaign image from the AI-assisted brand work.",
          kind: "image",
        },
      ],
    },
    {
      slug: "future-lab-merchandise",
      title: "Future Lab Merchandise",
      year: "2025",
      medium: "brand system / merch",
      summary:
        "A merchandise language built from typography, optimistic messaging, and juicy color combinations.",
      tags: ["merch", "branding", "color"],
      realmSlug: "orchard",
      relatedRealmSlugs: ["studio"],
      archiveHref:
        "/resources/notion_portfolio/Portfolio - Kate/Projects/Future Lab Merchandise 2b5f27ef1ff780749668de1cc502ef97.html",
      media: [
        {
          src: "/resources/notion_portfolio/Portfolio - Kate/Projects/Future Lab Merchandise/image.png",
          alt: "Future Lab merchandise cover image.",
          kind: "image",
        },
        {
          src: "/resources/notion_portfolio/Portfolio - Kate/Projects/Future Lab Merchandise/Curiosity_11zon.png",
          alt: "Curiosity graphic from the Future Lab merchandise set.",
          kind: "image",
        },
        {
          src: "/resources/notion_portfolio/Portfolio - Kate/Projects/Future Lab Merchandise/Tote-Bag-Orange-3_11zon.jpg",
          alt: "Orange tote bag from the Future Lab merchandise system.",
          kind: "image",
        },
      ],
    },
    {
      slug: "typographic-poster-designs",
      title: "Typographic Poster Designs",
      year: "2025",
      medium: "graphic / poster studies",
      summary:
        "A study in expressive type, emotional contrast, and the push-pull between clarity and rawness.",
      tags: ["poster", "typography", "graphic design"],
      realmSlug: "studio",
      archiveHref:
        "/resources/notion_portfolio/Portfolio - Kate/Projects/Typographic Poster Designs 2b5f27ef1ff7802c8fcdc80f068b9cd0.html",
      media: [
        {
          src: "/resources/notion_portfolio/Portfolio - Kate/Projects/Typographic Poster Designs/Free_Poster_Frame_Mockup_2.jpg",
          alt: "Poster mockup from Kate's typographic studies.",
          kind: "image",
        },
        {
          src: "/resources/notion_portfolio/Portfolio - Kate/Projects/Typographic Poster Designs/Anxiety.jpg",
          alt: "Anxiety poster design from the typographic series.",
          kind: "image",
        },
        {
          src: "/resources/notion_portfolio/Portfolio - Kate/Projects/Typographic Poster Designs/Scream.jpg",
          alt: "Scream poster from the poster design collection.",
          kind: "image",
        },
      ],
    },
    {
      slug: "experimental-poster-design",
      title: "Experimental Poster Design",
      year: "2025",
      medium: "graphic experiment / image distortion",
      summary:
        "A looser, more volatile visual experiment mixing fear-related concepts, AI-assisted treatment, and editorial distortion.",
      tags: ["experimental", "poster", "image play"],
      realmSlug: "play",
      relatedRealmSlugs: ["studio"],
      archiveHref:
        "/resources/notion_portfolio/Portfolio - Kate/Projects/Experimental Poster Design 210f27ef1ff78036b2dac812a478733a.html",
      media: [
        {
          src: "/resources/notion_portfolio/Portfolio - Kate/Projects/Experimental Poster Design/Posters-1.webp",
          alt: "Experimental poster collection cover image.",
          kind: "image",
        },
        {
          src: "/resources/notion_portfolio/Portfolio - Kate/Projects/Experimental Poster Design/Panic-Disorder.png",
          alt: "Panic disorder poster from the experimental set.",
          kind: "image",
        },
        {
          src: "/resources/notion_portfolio/Portfolio - Kate/Projects/Experimental Poster Design/Social-Anxiety.png",
          alt: "Social anxiety poster from Kate's experimental series.",
          kind: "image",
        },
      ],
    },
    {
      slug: "moremoneymorelove-email-newsletter",
      title: "MoreMoneyMoreLove",
      year: "2025",
      medium: "email campaign / commerce story",
      summary:
        "A cinematic email story built for product drops, desirability, and visual rhythm.",
      tags: ["email", "campaign", "e-commerce"],
      realmSlug: "orchard",
      archiveHref:
        "/resources/notion_portfolio/Portfolio - Kate/Projects/MoreMoneyMoreLove (Email Newsletter) 174f27ef1ff780738893f1ff60853fea.html",
      media: [
        {
          src: "/resources/notion_portfolio/Portfolio - Kate/Projects/MoreMoneyMoreLove (Email Newsletter)/first.png",
          alt: "Hero image from the MoreMoneyMoreLove newsletter.",
          kind: "image",
        },
        {
          src: "/resources/notion_portfolio/Portfolio - Kate/Projects/MoreMoneyMoreLove (Email Newsletter)/11.png",
          alt: "Email layout panel from the MoreMoneyMoreLove campaign.",
          kind: "image",
        },
        {
          src: "/resources/notion_portfolio/Portfolio - Kate/Projects/MoreMoneyMoreLove (Email Newsletter)/moremoneymorelove2-3.jpg",
          alt: "Editorial fashion image used in the email campaign.",
          kind: "image",
        },
      ],
    },
    {
      slug: "linn-plakat-event-app",
      title: "Linn Plakat - Event App",
      year: "2024",
      medium: "event discovery / mobile UX",
      summary:
        "An event app concept shaped through research, structure, and emotionally clear interaction design.",
      tags: ["mobile", "ux/ui", "research"],
      realmSlug: "practice",
      archiveHref:
        "/resources/notion_portfolio/Portfolio - Kate/Projects/Linn Plakat - event app 34999bc414ca4ae6b3a06be35d1edba0.html",
      media: [
        {
          src: "/resources/notion_portfolio/Portfolio - Kate/Projects/Linn Plakat - event app/MAIN.png",
          alt: "Main screen for the Linn Plakat event app.",
          kind: "image",
        },
        {
          src: "/resources/notion_portfolio/Portfolio - Kate/Projects/Linn Plakat - event app/new_pe.png",
          alt: "Additional event app screen.",
          kind: "image",
        },
        {
          src: "/resources/notion_portfolio/Portfolio - Kate/Projects/Linn Plakat - event app/Features__Social_wall.png",
          alt: "Feature detail from the Linn Plakat event app.",
          kind: "image",
        },
      ],
    },
    {
      slug: "elara-jewellery-website",
      title: "Elara Jewellery Website",
      year: "2024",
      medium: "luxury e-commerce / web",
      summary:
        "A jewellery e-commerce direction with quiet spacing, premium framing, and calm material storytelling.",
      tags: ["e-commerce", "website", "luxury"],
      realmSlug: "rooms",
      archiveHref:
        "/resources/notion_portfolio/Portfolio - Kate/Projects/Elara jewellery website 4b5a8c6c92384a3380cfec06cd57074e.html",
      media: [
        {
          src: "/resources/notion_portfolio/Portfolio - Kate/Projects/Elara jewellery website/Main_ready.png",
          alt: "Main composition for the Elara jewellery website.",
          kind: "image",
        },
        {
          src: "/resources/notion_portfolio/Portfolio - Kate/Projects/Elara jewellery website/Mobile_web.png",
          alt: "Mobile layouts for the Elara site.",
          kind: "image",
        },
        {
          src: "/resources/notion_portfolio/Portfolio - Kate/Projects/Elara jewellery website/Desktop_web.png",
          alt: "Desktop layouts for the Elara jewellery website.",
          kind: "image",
        },
      ],
    },
    {
      slug: "eduflex-code8-hackathon",
      title: "EduFlex Code8 Hackathon",
      year: "2024",
      medium: "hackathon product concept",
      summary:
        "A fast concept for education flow optimization, spanning onboarding, recommendations, and dashboard states.",
      tags: ["hackathon", "product", "dashboard"],
      realmSlug: "practice",
      archiveHref:
        "/resources/notion_portfolio/Portfolio - Kate/Projects/EduFlex-Code8 Hackathon faecb7aebd9f488e9f5b2eea7f4749e9.html",
      media: [
        {
          src: "/resources/notion_portfolio/Portfolio - Kate/Projects/EduFlex-Code8 Hackathon/Launchscreen_and_onboarding_(1).png",
          alt: "Launch and onboarding screens from the EduFlex project.",
          kind: "image",
        },
        {
          src: "/resources/notion_portfolio/Portfolio - Kate/Projects/EduFlex-Code8 Hackathon/Dashboard.png",
          alt: "Dashboard screen from the EduFlex hackathon concept.",
          kind: "image",
        },
        {
          src: "/resources/notion_portfolio/Portfolio - Kate/Projects/EduFlex-Code8 Hackathon/Final.png",
          alt: "Final product overview from the EduFlex project.",
          kind: "image",
        },
      ],
    },
    {
      slug: "the-soul-codes-logo",
      title: "The Soul Codes - Logo",
      year: "2024",
      medium: "identity / symbolic mark-making",
      summary:
        "A symbolic logo exploration built from mood, geometry, and mystic presentation.",
      tags: ["identity", "logo", "symbol"],
      realmSlug: "studio",
      archiveHref:
        "/resources/notion_portfolio/Portfolio - Kate/Projects/The soul codes - Logo 80a867de3757433ea1afb6782296ff97.html",
      media: [
        {
          src: "/resources/notion_portfolio/Portfolio - Kate/Projects/The soul codes - Logo/the_soul_codes_mockup_list_(1).png",
          alt: "Logo mockup sheet from The Soul Codes.",
          kind: "image",
        },
        {
          src: "/resources/notion_portfolio/Portfolio - Kate/Projects/The soul codes - Logo/the_soul.png",
          alt: "Primary symbol from The Soul Codes.",
          kind: "image",
        },
        {
          src: "/resources/notion_portfolio/Portfolio - Kate/Projects/The soul codes - Logo/Untitled_design_(2).png",
          alt: "Additional presentation from The Soul Codes logo series.",
          kind: "image",
        },
      ],
    },
  ],
};

export function asset(path: string): string {
  return encodeURI(path);
}

export function getRealms(): Realm[] {
  return siteManifest.realms;
}

export function getRealmBySlug(slug: string): Realm | undefined {
  return siteManifest.realms.find((realm) => realm.slug === slug);
}

export function getWorks(): Work[] {
  return siteManifest.works;
}

export function getWorkBySlug(slug: string): Work | undefined {
  return siteManifest.works.find((work) => work.slug === slug);
}

export function getWorksForRealm(slug: string): Work[] {
  return siteManifest.works.filter(
    (work) => work.realmSlug === slug || work.relatedRealmSlugs?.includes(slug as RealmSlug),
  );
}

export function getRelatedWorks(slug: string): Work[] {
  const work = getWorkBySlug(slug);
  if (!work) return [];

  return siteManifest.works
    .filter(
      (candidate) =>
        candidate.slug !== slug &&
        (candidate.realmSlug === work.realmSlug ||
          candidate.relatedRealmSlugs?.includes(work.realmSlug) ||
          work.relatedRealmSlugs?.includes(candidate.realmSlug)),
    )
    .slice(0, 3);
}

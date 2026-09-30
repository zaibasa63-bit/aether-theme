export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  /** Body split into paragraphs so the post page can map them to <p> tags */
  content: string[];
  author: { name: string; role: string; initials: string };
  date: string;
  readTime: string;
  tag: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "designing-ai-interfaces-that-earn-trust",
    title: "Designing AI interfaces that earn trust",
    excerpt:
      "Latency, uncertainty, and hallucination are UI problems as much as model problems. Here's how Aether's chat surface handles all three.",
    author: { name: "Priya Nair", role: "Product", initials: "PN" },
    date: "Sep 12, 2026",
    readTime: "6 min read",
    tag: "Design",
    content: [
      "Most AI product failures aren't model failures — they're interface failures. A model that's 90% accurate but presents every answer with the same flat confidence will feel worse to users than an 80% model that visibly hedges.",
      "Aether's chat surface treats three moments as first-class UI states, not edge cases: the gap before a first token arrives, a low-confidence answer, and an outright failure. Each gets its own visual treatment rather than a shared spinner.",
      "The first-token gap uses a skeleton that mirrors the eventual message shape, so the layout doesn't jump when content streams in. Low-confidence answers surface a small inline disclosure rather than a blocking warning. Failures get a retry affordance in the same position every time, so users learn where to look.",
      "None of this requires model changes. It's the difference between an AI feature that people tolerate and one they reach for.",
    ],
  },
  {
    slug: "why-we-built-our-own-chart-primitives",
    title: "Why we built our own chart primitives instead of using a kit",
    excerpt:
      "After Tremor's React 19 peer-dependency conflict, we rebuilt the dashboard's charts on Recharts directly. Here's what that actually involved.",
    author: { name: "Wren Tanaka", role: "Engineering", initials: "WT" },
    date: "Sep 18, 2026",
    readTime: "5 min read",
    tag: "Engineering",
    content: [
      "Chart kits are a convenience until their release cycle falls behind yours. When Tremor's peer dependency capped out at React 18, we had two options: pin the whole project back a major version, or extract the handful of chart patterns we actually used and rebuild them directly on Recharts.",
      "We went with the second option. It turned out to be about six components: a KPI stat card, an area chart with a gradient fill, a horizontal bar comparison, and a donut with a center label — the shapes that show up in almost every analytics dashboard.",
      "Building them directly on Recharts also meant we could match the exact token system the rest of the theme uses, instead of overriding a kit's own theme layer. The dashboard's charts now read colors straight from the same CSS variables as every button and card.",
    ],
  },
  {
    slug: "a-token-system-that-survives-a-rebrand",
    title: "A token system that survives a rebrand",
    excerpt:
      "Buyers customize a theme's colors on day one. Here's how Aether's CSS variables are structured so that a rebrand touches one file, not two hundred.",
    author: { name: "Sofia Ramirez", role: "Design", initials: "SR" },
    date: "Sep 22, 2026",
    readTime: "4 min read",
    tag: "Design",
    content: [
      "The single most common first action a theme buyer takes is opening the CSS and changing the primary color. If that color is hardcoded into forty components, it's a forty-file change. If it's one CSS variable, it's one line.",
      "Aether's palette lives entirely in src/index.css as HSL variables, with a light and a dark set. Tailwind's config maps semantic names — primary, secondary, accent, muted — onto those variables, and every component references the semantic name, never a hex value directly.",
      "The result: swapping the brand palette, or generating a whole new dark-mode contrast pass, is a change to about fifteen lines in one file.",
    ],
  },
];

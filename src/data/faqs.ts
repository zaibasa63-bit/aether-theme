export interface FaqItem {
  question: string;
  answer: string;
}

export const faqs: FaqItem[] = [
  {
    question: "Which AI providers does Aether work with?",
    answer:
      "Any provider reachable over HTTP — OpenAI, Anthropic, or a self-hosted model. The chat, image generation, and code assistant surfaces are provider-agnostic; you connect an endpoint and map the response shape once.",
  },
  {
    question: "Do I need a design system already in place?",
    answer:
      "No. Aether ships its own token system (colors, spacing, type) built on Tailwind and shadcn/ui. Rebranding means changing the CSS variables in one file, not rewriting components.",
  },
  {
    question: "Is the admin dashboard included, or sold separately?",
    answer:
      "Both the landing page and the admin dashboard are included in every license — chat, image generation studio, usage & billing, team management, and the rest of the dashboard pages.",
  },
  {
    question: "Can I use this for a client project?",
    answer:
      "Yes, under the standard ThemeForest regular license for a single end product. For work you'll resell or reuse across multiple clients, an extended license applies — see the licensing note at checkout.",
  },
  {
    question: "How is dark mode implemented?",
    answer:
      "Via a CSS class on the root element driven by a small ThemeContext, with support for a manual toggle, a resolved 'system' preference, and persistence to localStorage. No flash of the wrong theme on load.",
  },
  {
    question: "What if I don't want the marketing pages, only the dashboard?",
    answer:
      "The dashboard is a self-contained route tree. Remove the landing routes from the router and point your auth flow straight at /dashboard — nothing in the dashboard depends on the marketing pages.",
  },
];

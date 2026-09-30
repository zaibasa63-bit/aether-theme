export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  /** Single or double letter used in the avatar placeholder */
  initials: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "We replaced three separate AI vendor dashboards with Aether's single interface. Our support team picked it up without any training.",
    name: "Priya Nair",
    role: "Head of Product",
    company: "Loopwork",
    initials: "PN",
  },
  {
    quote:
      "The chat and image generation surfaces were both production-ready on day one. We only had to wire up our own model endpoints.",
    name: "Marcus Lee",
    role: "CTO",
    company: "Fernway",
    initials: "ML",
  },
  {
    quote:
      "Dark mode actually looks designed, not inverted. That alone saved our design team a sprint.",
    name: "Sofia Ramirez",
    role: "Design Lead",
    company: "Northlight",
    initials: "SR",
  },
  {
    quote:
      "Usage analytics per model made a pricing conversation with our board painless — we could show cost per feature immediately.",
    name: "Daniel Osei",
    role: "Founder",
    company: "Kindled",
    initials: "DO",
  },
  {
    quote:
      "The component code is genuinely clean. We forked it for an internal tool and it held up under a very different use case.",
    name: "Wren Tanaka",
    role: "Senior Engineer",
    company: "Basecamp Labs",
    initials: "WT",
  },
  {
    quote:
      "Support answered a customization question within the hour. For a theme purchase, that responsiveness is rare.",
    name: "Elena Kovacs",
    role: "Operations Lead",
    company: "Ferrow",
    initials: "EK",
  },
];

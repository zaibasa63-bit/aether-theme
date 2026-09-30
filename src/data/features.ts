import type { LucideIcon } from "lucide-react";
import { BarChart3, Bot, Code2, ImageIcon } from "lucide-react";

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  /** Short stat or detail shown at the bottom of the card */
  metric: string;
}

export const features: Feature[] = [
  {
    icon: Bot,
    title: "AI Chat",
    description:
      "Drop-in conversational interface with streaming responses, message history, and context-aware replies.",
    metric: "< 200ms first token",
  },
  {
    icon: ImageIcon,
    title: "Image Generation",
    description:
      "A full studio for prompting, variations, and upscaling — connect any diffusion model behind one interface.",
    metric: "4 styles per prompt",
  },
  {
    icon: Code2,
    title: "Code Assistant",
    description:
      "Inline completions and a chat-based helper that understands the surrounding file, not just the prompt.",
    metric: "18 languages supported",
  },
  {
    icon: BarChart3,
    title: "Analytics",
    description:
      "Usage, cost, and latency broken down by model and endpoint, so you know exactly what your AI features cost.",
    metric: "Real-time dashboards",
  },
];

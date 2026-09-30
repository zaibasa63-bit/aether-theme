import type { LucideIcon } from "lucide-react";
import { KeyRound, Palette, Rocket } from "lucide-react";

export interface ProcessStep {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    icon: KeyRound,
    title: "Connect your model",
    description:
      "Drop in an API key for OpenAI, Anthropic, or your own endpoint. Every surface in Aether already knows how to talk to it.",
  },
  {
    icon: Palette,
    title: "Make it yours",
    description:
      "Swap the color tokens, logo, and copy. Every component reads from the same design tokens, so a rebrand takes minutes, not days.",
  },
  {
    icon: Rocket,
    title: "Ship to users",
    description:
      "Deploy the landing page and dashboard together, or split them across two apps — the auth and routing are ready either way.",
  },
];

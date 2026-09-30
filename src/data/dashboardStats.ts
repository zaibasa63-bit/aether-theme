import type { LucideIcon } from "lucide-react";
import { Bot, Coins, ImageIcon, Zap } from "lucide-react";

export interface KpiStat {
  label: string;
  value: string;
  delta: string;
  trend: "up" | "down";
  icon: LucideIcon;
}

export const kpiStats: KpiStat[] = [
  { label: "Total generations", value: "48,204", delta: "+12.4%", trend: "up", icon: Zap },
  { label: "AI Chat sessions", value: "6,120", delta: "+8.1%", trend: "up", icon: Bot },
  { label: "Images generated", value: "2,845", delta: "+21.6%", trend: "up", icon: ImageIcon },
  { label: "Credits remaining", value: "18,340", delta: "-4.2%", trend: "down", icon: Coins },
];

export interface UsagePoint {
  day: string;
  chat: number;
  image: number;
  code: number;
}

export const usageOverTime: UsagePoint[] = [
  { day: "Mon", chat: 320, image: 140, code: 90 },
  { day: "Tue", chat: 410, image: 180, code: 120 },
  { day: "Wed", chat: 380, image: 210, code: 150 },
  { day: "Thu", chat: 460, image: 190, code: 170 },
  { day: "Fri", chat: 520, image: 240, code: 200 },
  { day: "Sat", chat: 300, image: 160, code: 110 },
  { day: "Sun", chat: 280, image: 150, code: 95 },
];

export interface RecentGeneration {
  id: string;
  type: "Chat" | "Image" | "Code";
  prompt: string;
  status: "Completed" | "Failed" | "Processing";
  time: string;
  credits: number;
}

export const recentGenerations: RecentGeneration[] = [
  { id: "gen_9F21", type: "Chat", prompt: "Summarize this week's support tickets by theme", status: "Completed", time: "2m ago", credits: 4 },
  { id: "gen_9F1C", type: "Image", prompt: "Minimalist logo, violet and cyan gradient, letter A", status: "Completed", time: "14m ago", credits: 12 },
  { id: "gen_9F0A", type: "Code", prompt: "Generate a React hook for debounced search input", status: "Completed", time: "38m ago", credits: 6 },
  { id: "gen_9EF3", type: "Image", prompt: "Product shot, wireless keyboard, studio lighting", status: "Processing", time: "41m ago", credits: 12 },
  { id: "gen_9EE7", type: "Chat", prompt: "Draft a launch tweet for the analytics dashboard", status: "Failed", time: "1h ago", credits: 0 },
  { id: "gen_9ED1", type: "Code", prompt: "Write unit tests for the billing webhook handler", status: "Completed", time: "2h ago", credits: 8 },
];

export const creditBalance = {
  used: 31660,
  total: 50000,
};

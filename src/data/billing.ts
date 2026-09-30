import type { LucideIcon } from "lucide-react";
import { Bot, Code2, ImageIcon } from "lucide-react";

export const currentPlan = {
  name: "Pro",
  price: "$49/month",
  renewalDate: "Oct 24, 2026",
  seats: "3 of 5 seats used",
};

export const paymentMethod = {
  brand: "Visa",
  last4: "4242",
  expiry: "08/28",
};

export interface UsageMetric {
  label: string;
  used: number;
  limit: number;
  icon: LucideIcon;
}

export const usageMetrics: UsageMetric[] = [
  { label: "AI Chat messages", used: 6120, limit: 10000, icon: Bot },
  { label: "Images generated", used: 2845, limit: 5000, icon: ImageIcon },
  { label: "Code completions", used: 3190, limit: 10000, icon: Code2 },
];

export interface Invoice {
  id: string;
  date: string;
  amount: string;
  status: "Paid" | "Pending" | "Failed";
}

export const invoices: Invoice[] = [
  { id: "INV-2026-009", date: "Sep 24, 2026", amount: "$49.00", status: "Paid" },
  { id: "INV-2026-008", date: "Aug 24, 2026", amount: "$49.00", status: "Paid" },
  { id: "INV-2026-007", date: "Jul 24, 2026", amount: "$49.00", status: "Paid" },
  { id: "INV-2026-006", date: "Jun 24, 2026", amount: "$49.00", status: "Paid" },
  { id: "INV-2026-005", date: "May 24, 2026", amount: "$39.00", status: "Paid" },
];

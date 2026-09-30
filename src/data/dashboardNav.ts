import {
  Bot,
  CreditCard,
  Gauge,
  Image as ImageIcon,
  KeyRound,
  LayoutGrid,
  LibraryBig,
  LineChart,
  Settings,
  Table2,
  Users,
} from "lucide-react";
import type { NavItem } from "@/types/nav";

export const dashboardNav: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: Gauge },
  {
    label: "AI Tools",
    icon: Bot,
    children: [
      { label: "AI Chat", href: "/dashboard/chat", icon: Bot },
      { label: "Image Generation", href: "/dashboard/image-generation", icon: ImageIcon },
      { label: "Prompt Library", href: "/dashboard/prompts", icon: LibraryBig },
    ],
  },
  { label: "Usage & Billing", href: "/dashboard/billing", icon: CreditCard },
  { label: "Team", href: "/dashboard/team", icon: Users },
  { label: "API Keys", href: "/dashboard/api-keys", icon: KeyRound },
  {
    label: "Developer",
    icon: LayoutGrid,
    children: [
      { label: "Advanced Tables", href: "/dashboard/tables", icon: Table2 },
      { label: "Charts", href: "/dashboard/charts", icon: LineChart },
      { label: "UI Components", href: "/dashboard/components", icon: LayoutGrid },
    ],
  },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  FolderTree,
  Palette,
  Plug,
  FilePlus,
  HelpCircle,
  History,
  LifeBuoy,
  Rocket,
  Scale,
} from "lucide-react";

export interface DocsNavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const docsNav: DocsNavItem[] = [
  { label: "Introduction", href: "/resources", icon: BookOpen },
  { label: "Getting Started", href: "/resources/getting-started", icon: FolderTree },
  { label: "Folder Structure", href: "/resources/folder-structure", icon: FolderTree },
  { label: "Customization", href: "/resources/customization", icon: Palette },
  { label: "Integration", href: "/resources/integration", icon: Plug },
  { label: "Deployment", href: "/resources/deployment", icon: Rocket },
  { label: "Adding Pages", href: "/resources/adding-pages", icon: FilePlus },
  { label: "FAQ", href: "/resources/faq", icon: HelpCircle },
  { label: "Changelog", href: "/resources/changelog", icon: History },
  { label: "License", href: "/resources/license", icon: Scale },
  { label: "Support", href: "/resources/support", icon: LifeBuoy },
];

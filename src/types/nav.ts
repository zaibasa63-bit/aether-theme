import type { LucideIcon } from "lucide-react";

export interface NavLeaf {
  label: string;
  href: string;
  icon: LucideIcon;
  /** Optional badge, e.g. a count or "New" */
  badge?: string;
}

export interface NavGroup {
  label: string;
  icon: LucideIcon;
  /** Nested items shown when the group is expanded */
  children: NavLeaf[];
}

export type NavItem = NavLeaf | NavGroup;

export function isNavGroup(item: NavItem): item is NavGroup {
  return "children" in item;
}

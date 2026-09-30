import { dashboardNav } from "@/data/dashboardNav";
import { isNavGroup } from "@/types/nav";

export interface ResolvedNavPath {
  /** The page's own label, e.g. "AI Chat" */
  label: string;
  /** The parent group label, if the page is nested, e.g. "AI Tools" */
  groupLabel?: string;
}

/** Finds the sidebar entry matching a pathname, searching nested groups too. */
export function resolveNavLabel(pathname: string): ResolvedNavPath {
  for (const item of dashboardNav) {
    if (isNavGroup(item)) {
      const match = item.children.find((c) => pathname.startsWith(c.href));
      if (match) return { label: match.label, groupLabel: item.label };
    } else if (pathname.startsWith(item.href) && item.href !== "/dashboard") {
      return { label: item.label };
    }
  }
  return { label: "Dashboard" };
}

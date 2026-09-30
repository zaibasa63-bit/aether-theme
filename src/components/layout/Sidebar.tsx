import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ChevronDown, ChevronsLeft, ChevronsRight, Sparkles } from "lucide-react";
import { dashboardNav } from "@/data/dashboardNav";
import { isNavGroup } from "@/types/nav";
import { cn } from "@/lib/utils";

interface SidebarProps {
  collapsed?: boolean;
  onToggleCollapsed?: () => void;
  /** Called after a link is clicked — used to close the mobile drawer */
  onNavigate?: () => void;
}

export function Sidebar({ collapsed, onToggleCollapsed, onNavigate }: SidebarProps) {
  const location = useLocation();

  // A group starts expanded if one of its children is the active route,
  // so a deep-linked page doesn't land with its own nav item hidden.
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    for (const item of dashboardNav) {
      if (isNavGroup(item)) {
        initial[item.label] = item.children.some((c) =>
          location.pathname.startsWith(c.href),
        );
      }
    }
    return initial;
  });

  return (
    <div className="flex h-full flex-col bg-card">
      {/* Brand */}
      <div className={cn("flex h-16 items-center gap-2 px-5", collapsed && "justify-center px-0")}>
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-aether-gradient text-white">
          <Sparkles className="h-4 w-4" />
        </span>
        {!collapsed && <span className="font-display text-lg font-semibold">Aether</span>}
      </div>

      {/* Nav items */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-2">
        {dashboardNav.map((item) => {
          if (isNavGroup(item)) {
            const Icon = item.icon;
            const isOpen = openGroups[item.label];
            const hasActiveChild = item.children.some((c) =>
              location.pathname.startsWith(c.href),
            );
            return (
              <div key={item.label}>
                <button
                  type="button"
                  onClick={() =>
                    setOpenGroups((prev) => ({ ...prev, [item.label]: !prev[item.label] }))
                  }
                  className={cn(
                    "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                    hasActiveChild && "text-foreground",
                    collapsed && "justify-center px-0",
                  )}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon className="h-[18px] w-[18px] shrink-0" />
                  {!collapsed && (
                    <>
                      <span className="flex-1 text-left">{item.label}</span>
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 shrink-0 transition-transform",
                          isOpen && "rotate-180",
                        )}
                      />
                    </>
                  )}
                </button>
                {!collapsed && isOpen && (
                  <div className="ml-[22px] mt-1 space-y-1 border-l border-border pl-4">
                    {item.children.map((child) => (
                      <NavLink
                        key={child.href}
                        to={child.href}
                        onClick={onNavigate}
                        className={({ isActive }) =>
                          cn(
                            "flex items-center gap-2.5 rounded-md py-1.5 pl-2 text-sm text-muted-foreground transition-colors hover:text-foreground",
                            isActive && "font-medium text-primary",
                          )
                        }
                      >
                        {child.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          const Icon = item.icon;
          return (
            <NavLink
              key={item.href}
              to={item.href}
              end={item.href === "/dashboard"}
              onClick={onNavigate}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                  isActive && "bg-primary/10 text-primary hover:bg-primary/10 hover:text-primary",
                  collapsed && "justify-center px-0",
                )
              }
              title={collapsed ? item.label : undefined}
            >
              <Icon className="h-[18px] w-[18px] shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Collapse toggle — desktop only, hidden inside the mobile drawer */}
      {onToggleCollapsed && (
        <button
          type="button"
          onClick={onToggleCollapsed}
          className={cn(
            "flex items-center gap-2 border-t border-border px-3 py-3 text-sm text-muted-foreground hover:text-foreground",
            collapsed && "justify-center px-0",
          )}
        >
          {collapsed ? <ChevronsRight className="h-4 w-4" /> : <ChevronsLeft className="h-4 w-4" />}
          {!collapsed && "Collapse"}
        </button>
      )}
    </div>
  );
}

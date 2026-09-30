import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { Menu, Sparkles } from "lucide-react";
import { docsNav } from "@/data/docsNav";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Seo } from "@/components/Seo";
import { cn } from "@/lib/utils";

function DocsNavList({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav className="space-y-1 p-3">
      {docsNav.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.href}
            to={item.href}
            end={item.href === "/resources"}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                isActive && "bg-primary/10 text-primary hover:bg-primary/10 hover:text-primary",
              )
            }
          >
            <Icon className="h-4 w-4 shrink-0" />
            {item.label}
          </NavLink>
        );
      })}
    </nav>
  );
}

export function DocsLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Documentation"
        description="Documentation for the Aether theme — getting started, customization, integration, and support."
      />

      {/* Docs header — deliberately simpler than the marketing navbar */}
      <header className="glass sticky top-0 z-40 flex h-16 items-center gap-3 px-4 sm:px-6">
        <button
          onClick={() => setMobileOpen(true)}
          className="rounded-md p-2 text-muted-foreground hover:bg-muted lg:hidden"
          aria-label="Open docs menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <Link to="/" className="flex items-center gap-2 font-display text-base font-semibold">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-aether-gradient text-white">
            <Sparkles className="h-4 w-4" />
          </span>
          Aether Docs
        </Link>
        <div className="ml-auto flex items-center gap-2">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
            ← Back to site
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <div className="mx-auto flex max-w-6xl">
        {/* Desktop sidebar */}
        <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-64 shrink-0 overflow-y-auto border-r border-border lg:block">
          <DocsNavList />
        </aside>

        {/* Mobile drawer */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetContent side="left" className="lg:hidden">
            <div className="flex h-16 items-center px-5 font-display text-base font-semibold">
              Aether Docs
            </div>
            <DocsNavList onNavigate={() => setMobileOpen(false)} />
          </SheetContent>
        </Sheet>

        <main className="min-w-0 flex-1 px-5 py-10 sm:px-8 lg:px-12">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

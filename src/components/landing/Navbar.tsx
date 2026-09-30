import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Sheet, SheetContent } from "@/components/ui/sheet";

const navLinks = [
  { label: "Features", href: "/#features" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Blog", href: "/blog" },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="glass sticky top-0 z-50 w-full">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-semibold">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-aether-gradient text-white">
            <Sparkles className="h-4 w-4" />
          </span>
          Aether
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 md:flex">
            <ThemeToggle />
            <Button
              asChild
              variant="ghost"
              size="sm"
              className={location.pathname === "/login" ? "text-primary" : ""}
            >
              <Link to="/login">Log in</Link>
            </Button>
            <Button asChild size="sm">
              <Link to="/register">Sign up</Link>
            </Button>
          </div>

          {/* Mobile: theme toggle stays visible, everything else moves into the drawer */}
          <div className="md:hidden">
            <ThemeToggle />
          </div>
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="rounded-md p-2 text-muted-foreground hover:bg-muted md:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="right" className="md:hidden">
          <div className="flex h-16 items-center px-5 font-display text-lg font-semibold">
            Aether
          </div>
          <nav className="flex flex-col gap-1 px-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mt-4 flex flex-col gap-2 border-t border-border p-4">
            <Button asChild variant="outline" onClick={() => setMobileOpen(false)}>
              <Link to="/login">Log in</Link>
            </Button>
            <Button asChild onClick={() => setMobileOpen(false)}>
              <Link to="/register">Sign up</Link>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}

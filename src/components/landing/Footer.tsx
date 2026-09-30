import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

const footerColumns = [
  {
    heading: "Product",
    links: [
      { label: "Features", href: "/#features" },
      { label: "Pricing", href: "/#pricing" },
      { label: "Dashboard demo", href: "/dashboard" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Documentation", href: "/resources" },
      { label: "Integration Guide", href: "/resources/integration" },
      { label: "Changelog", href: "/resources/changelog" },
      { label: "License", href: "/resources/license" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Account",
    links: [
      { label: "Log in", href: "/login" },
      { label: "Sign up", href: "/register" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border py-14">
      <div className="container grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
        <div>
          <Link to="/" className="flex items-center gap-2 font-display text-lg font-semibold">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-aether-gradient text-white">
              <Sparkles className="h-4 w-4" />
            </span>
            Aether
          </Link>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            The React + TypeScript starting point for AI SaaS products.
          </p>
        </div>

        {footerColumns.map((col) => (
          <div key={col.heading}>
            <h4 className="mb-3 text-sm font-medium">{col.heading}</h4>
            <ul className="space-y-2.5">
              {col.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="container mt-10 border-t border-border pt-6 text-xs text-muted-foreground">
        © {new Date().getFullYear()} Aether. All rights reserved.
      </div>
    </footer>
  );
}

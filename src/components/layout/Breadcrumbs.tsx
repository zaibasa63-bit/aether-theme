import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { resolveNavLabel } from "@/lib/nav";

export function Breadcrumbs() {
  const { pathname } = useLocation();

  if (pathname === "/dashboard") {
    return (
      <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <span className="flex items-center gap-1.5 text-foreground">
          <Home className="h-3.5 w-3.5" />
          Dashboard
        </span>
      </nav>
    );
  }

  const { label, groupLabel } = resolveNavLabel(pathname);

  return (
    <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
      <Link to="/dashboard" className="flex items-center gap-1.5 hover:text-foreground">
        <Home className="h-3.5 w-3.5" />
        Dashboard
      </Link>
      {groupLabel && (
        <span className="flex items-center gap-1.5">
          <ChevronRight className="h-3.5 w-3.5" />
          {groupLabel}
        </span>
      )}
      <span className="flex items-center gap-1.5">
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground">{label}</span>
      </span>
    </nav>
  );
}

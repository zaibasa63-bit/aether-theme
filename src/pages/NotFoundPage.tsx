import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Seo } from "@/components/Seo";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-aether-radial px-4 text-center">
      <Seo title="Page not found" description="This page doesn't exist." noindex />
      <Link to="/" className="mb-8 flex items-center gap-2 font-display text-lg font-semibold">
        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-aether-gradient text-white">
          <Sparkles className="h-4 w-4" />
        </span>
        Aether
      </Link>

      <p className="font-display text-7xl font-semibold text-primary">404</p>
      <h1 className="mt-4 text-2xl font-semibold">Page not found</h1>
      <p className="mt-2 max-w-sm text-muted-foreground">
        The page you're looking for doesn't exist or may have been moved.
      </p>

      <div className="mt-8 flex gap-3">
        <Button asChild>
          <Link to="/">Back to home</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/dashboard">Go to dashboard</Link>
        </Button>
      </div>
    </div>
  );
}

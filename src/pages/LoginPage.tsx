import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Seo } from "@/components/Seo";

export default function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // No auth backend wired up — this simulates a request, then redirects
  // to the dashboard. Replace with a real sign-in call.
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setTimeout(() => navigate("/dashboard"), 1200);
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-aether-radial px-4 py-16">
      <Seo title="Log in" description="Log in to your Aether workspace." noindex />
      <div className="w-full max-w-sm rounded-xl border border-border bg-card p-8">
        <Link
          to="/"
          className="mb-8 flex items-center justify-center gap-2 font-display text-lg font-semibold"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-aether-gradient text-white">
            <Sparkles className="h-4 w-4" />
          </span>
          Aether
        </Link>

        <h1 className="text-center font-display text-xl font-semibold">
          Welcome back
        </h1>
        <p className="mt-1.5 text-center text-sm text-muted-foreground">
          Log in to your workspace
        </p>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@company.com" required />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <button
                type="button"
                onClick={() => toast.success("If that email exists, a reset link has been sent")}
                className="text-xs text-primary hover:underline"
              >
                Forgot password?
              </button>
            </div>
            <Input id="password" type="password" placeholder="••••••••" required />
          </div>
          <Button type="submit" className="w-full" size="lg" disabled={loading}>
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {loading ? "Logging in..." : "Log in"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link to="/register" className="font-medium text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

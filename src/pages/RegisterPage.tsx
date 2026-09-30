import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Seo } from "@/components/Seo";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // No auth backend wired up — this simulates a request, then redirects
  // to the dashboard. Replace with a real sign-up call.
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setTimeout(() => navigate("/dashboard"), 1200);
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-aether-radial px-4 py-16">
      <Seo title="Create account" description="Create your Aether account and start building." noindex />
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
          Create your account
        </h1>
        <p className="mt-1.5 text-center text-sm text-muted-foreground">
          Start free — no card required
        </p>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="name">Full name</Label>
            <Input id="name" placeholder="Ada Lovelace" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@company.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="••••••••" required />
          </div>
          <Button type="submit" className="w-full" size="lg" disabled={loading}>
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {loading ? "Creating account..." : "Create account"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-primary hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

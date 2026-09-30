import { useLocation } from "react-router-dom";
import { Construction } from "lucide-react";
import { resolveNavLabel } from "@/lib/nav";

export default function ComingSoonPage() {
  const { pathname } = useLocation();
  const { label } = resolveNavLabel(pathname);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
        <Construction className="h-6 w-6 text-primary" />
      </div>
      <h1 className="font-display text-2xl font-semibold">{label}</h1>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        This page is being built in the next pass of the theme. Check back
        soon.
      </p>
    </div>
  );
}

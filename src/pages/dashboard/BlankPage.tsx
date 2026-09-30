export default function BlankPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-lg font-semibold">Blank page</h1>
        <p className="text-sm text-muted-foreground">
          A minimal starting canvas — the sidebar, topbar, and breadcrumbs
          are already wired up. Build your own page content here.
        </p>
      </div>

      <div className="flex min-h-[50vh] items-center justify-center rounded-xl border border-dashed border-border text-sm text-muted-foreground">
        Your content goes here
      </div>
    </div>
  );
}

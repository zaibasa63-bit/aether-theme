const faqs = [
  {
    q: "Why does Image Generation show a gradient instead of a real image?",
    a: "There's no AI backend wired up by design — see the Integration page for how to connect a real provider. The gradient is a deterministic placeholder (same prompt always produces the same gradient) so the demo feels alive without needing a live model or API costs.",
  },
  {
    q: "Why isn't Tremor used, even though it was in the original spec?",
    a: "Tremor's current release peer-depends on React 18 and conflicts with React 19. Dashboard charts and KPI cards are built directly on Recharts + Tailwind instead, styled to match.",
  },
  {
    q: "Can I remove dashboard pages I don't need?",
    a: "Yes — delete the page file, remove its <Route> in App.tsx, and remove its entry from src/data/dashboardNav.ts. Nothing else references it.",
  },
  {
    q: "Can I use this with Next.js instead of Vite?",
    a: "The components themselves (Tailwind + Radix based) port over with minimal changes, but routing (React Router) and the build config are Vite-specific. Migrating to Next.js means replacing React Router with the App Router and adjusting environment variable and asset handling — it's a real migration, not a drop-in.",
  },
  {
    q: "Is this theme server-rendered (SSR)?",
    a: "No — it's a client-rendered single-page app. See the SEO section for what that means for search indexing, and how to add prerendering if you need it.",
  },
  {
    q: "Where do I change the mock delay on buttons (e.g. \"Saving...\")?",
    a: "src/lib/useMockAction.ts takes a delay option (defaults to 900ms) — pass a different value per call, e.g. useMockAction({ successMessage: \"...\", delay: 1500 }).",
  },
  {
    q: "How is dark mode implemented?",
    a: "A class on <html> (\"dark\") toggled by src/context/ThemeContext.tsx, with three states — light, dark, system — persisted to localStorage. See the Customization page for details.",
  },
];

export default function FaqPage() {
  return (
    <div className="prose dark:prose-invert">
      <h1>Frequently Asked Questions</h1>
      <p>Technical questions about how the theme is built. For product/pricing questions, see the marketing FAQ on the homepage.</p>

      {faqs.map((item) => (
        <div key={item.q}>
          <h3>{item.q}</h3>
          <p>{item.a}</p>
        </div>
      ))}
    </div>
  );
}

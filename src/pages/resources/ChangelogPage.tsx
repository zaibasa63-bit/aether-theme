export default function ChangelogPage() {
  return (
    <div className="prose dark:prose-invert">
      <h1>Changelog</h1>

      <h2>1.0.0 — Initial release</h2>

      <h3>Added</h3>
      <ul>
        <li>Full marketing site: Hero, Features, How it Works, Pricing, Testimonials, FAQ, Blog, Contact, Login, Register</li>
        <li>Full admin dashboard: 12 pages including AI Chat, Image Generation, Prompt Library, Billing, Team, API Keys, Settings, Tables, Charts, UI Components, Blank, 404</li>
        <li>Dark/light/system theme support with localStorage persistence</li>
        <li>Route-level code splitting for every page beyond the landing page</li>
        <li>Mock-action system (useMockAction + toasts) so every button gives real feedback with no backend required</li>
        <li>Per-page SEO metadata, Open Graph tags, auto-generated sitemap.xml, robots.txt</li>
        <li>This documentation section</li>
        <li>ESLint (flat config) + TypeScript, both passing with zero errors</li>
      </ul>

      <h3>Changed</h3>
      <ul>
        <li>Dashboard charts/KPI cards built directly on Recharts + Tailwind instead of Tremor (React 19 peer-dependency conflict — see the FAQ)</li>
        <li>Google Fonts moved from a render-blocking CSS @import to preconnected &lt;link&gt; tags</li>
      </ul>

      <h3>Fixed</h3>
      <ul>
        <li>Marketing navbar had no mobile menu — added a drawer below the md breakpoint</li>
        <li>AI Chat's history sidebar was hidden entirely on mobile with no alternative access — added a drawer opened from the chat header</li>
        <li>Settings and Billing action buttons had no click handler at all — all now give mock loading + toast feedback</li>
        <li>Login/Register submission did nothing — both now show a loading state and redirect</li>
        <li>Added the missing @types/node dependency (vite.config.ts uses path/__dirname)</li>
        <li>Fixed a ternary used as a statement in Advanced Tables (caught by the newly-added lint config)</li>
      </ul>
    </div>
  );
}

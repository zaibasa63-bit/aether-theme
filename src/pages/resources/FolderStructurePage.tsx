export default function FolderStructurePage() {
  return (
    <div className="prose dark:prose-invert">
      <h1>Folder Structure</h1>
      <p>
        One file per subject, one subject per file. Mock data lives in{" "}
        <code>src/data/</code>, never inline in a page component — that's
        the main thing to know when customizing content.
      </p>

      <pre>
        <code>{`aether/
├── public/
│   ├── favicon.svg, robots.txt, sitemap.xml (auto-generated)
├── scripts/
│   └── generate-sitemap.mjs   # runs automatically before every build
├── src/
│   ├── components/
│   │   ├── ui/            # Button, Card, Input, Tabs, Accordion,
│   │   │                    DropdownMenu, Sheet, Avatar, Badge, ...
│   │   ├── landing/        # Hero, Features, Pricing, Navbar, Footer, ...
│   │   ├── layout/         # DashboardLayout, DocsLayout, Sidebar, Topbar
│   │   ├── dashboard/      # StatCard, UsageChart, CreditBalanceCard, ...
│   │   ├── theme/          # ThemeToggle
│   │   └── Seo.tsx          # per-page title/meta/OG component
│   ├── context/
│   │   └── ThemeContext.tsx # light/dark/system + localStorage
│   ├── data/                # one typed mock-data file per feature
│   ├── lib/                 # cn(), useMockAction, useTypewriter, nav helpers
│   ├── pages/
│   │   ├── dashboard/       # the 12 dashboard pages
│   │   └── resources/       # this documentation section
│   ├── types/
│   ├── App.tsx               # all routing, lazy-loaded per page
│   └── index.css              # design tokens
├── eslint.config.js
├── tailwind.config.ts
└── package.json`}</code>
      </pre>

      <h2>Key files to know</h2>
      <ul>
        <li>
          <code>src/index.css</code> — every brand color, as CSS variables
        </li>
        <li>
          <code>src/data/dashboardNav.ts</code> — the dashboard sidebar
          structure; breadcrumbs resolve from this same file
        </li>
        <li>
          <code>src/data/docsNav.ts</code> — this documentation section's
          sidebar
        </li>
        <li>
          <code>src/lib/useMockAction.ts</code> — the shared "loading state
          → toast" pattern used by most mock buttons
        </li>
        <li>
          <code>src/App.tsx</code> — the full route map, all lazy-loaded
        </li>
      </ul>
    </div>
  );
}

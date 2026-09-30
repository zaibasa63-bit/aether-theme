# Aether — AI SaaS Landing Page + Admin Dashboard

A premium React 19 + TypeScript theme: a full AI SaaS marketing site and
admin dashboard, built to be re-skinned and shipped fast.

![Tech](https://img.shields.io/badge/React-19-8B5CF6) ![Tech](https://img.shields.io/badge/TypeScript-5.7-06B6D4) ![Tech](https://img.shields.io/badge/Vite-6-F59E0B)

---

## ✨ Features

- **Full marketing site** — Hero with a live animated AI-generation demo, Features, How it Works, Pricing (monthly/yearly), Testimonials, FAQ, Blog (listing + single post), Contact, Login/Register
- **Full admin dashboard** — collapsible sidebar with nested menus, topbar (search, notifications, user menu), breadcrumbs, mobile drawer
- **12 dashboard pages** — Main Dashboard, AI Chat (with history sidebar), Image Generation studio, Prompt Library, Usage & Billing, Team Management, API Keys, Settings, Advanced Tables, Charts, UI Components, Blank, 404
- **Dark + light mode** — system-aware, manually toggleable, persisted to `localStorage`, zero flash on load
- **Every "action" button is wired up** — mock loading states + toast feedback throughout (see [Mock interactions](#mock-interactions--no-backend))
- **Fully responsive** — dedicated mobile drawers for both the marketing nav and the dashboard sidebar/chat history
- **Per-page SEO** — title, meta description, Open Graph, and Twitter Card tags on every marketing page via a lightweight `<Seo>` component; dashboard/auth pages are marked `noindex`
- **In-app documentation** — a full "Resources" section (`/resources`) covering getting started, customization, integration, deployment, FAQ, changelog, and license, browsable right in the running demo
- **Sitemap & robots.txt** — `sitemap.xml` is generated automatically from your actual routes and blog data on every build (`scripts/generate-sitemap.mjs`), so it can't drift out of sync
- **Route-level code splitting** — every page beyond the landing page loads as its own chunk
- **Fully typed, zero lint errors** — `tsc -b` and `eslint .` both pass clean

## 🧱 Tech stack

| | |
|---|---|
| Framework | React 19 + TypeScript |
| Build tool | Vite 6 |
| Styling | Tailwind CSS + CSS variables |
| Components | shadcn/ui pattern on Radix UI primitives |
| Routing | React Router DOM v6 |
| Charts | Recharts (see [note](#a-note-on-tremor)) |
| Icons | Lucide React |
| Animation | Framer Motion |
| Toasts | Sonner |

## 📸 Screenshots

> Replace these with real exported screenshots before publishing.

| Landing — Hero | Dashboard — Home |
|---|---|
| `screenshots/hero.png` | `screenshots/dashboard.png` |

| AI Chat | Image Generation |
|---|---|
| `screenshots/chat.png` | `screenshots/image-gen.png` |

## 🚀 Installation & setup

Requires Node.js 18+.

```bash
# 1. Extract the zip / clone the repo, then from the project root:
npm install

# 2. Start the dev server
npm run dev
# → http://localhost:5173

# 3. Production build
npm run build
npm run preview   # preview the production build locally

# 4. Lint
npm run lint
```

No environment variables or backend are required to run the theme —
everything renders from local mock data. Full guide, including how to swap in a real backend: [Integration docs](https://your-demo-url.com/resources/integration) (also at `docs/customization.md`, or live in the running app under **Resources → Integration**).

## 📁 Folder structure

```
src/
  components/
    ui/          shadcn-style primitives (Button, Card, Tabs, Dialog, ...)
    landing/     marketing page sections (Hero, Features, Pricing, ...)
    layout/      dashboard shell (Sidebar, Topbar, Breadcrumbs, DashboardLayout)
    dashboard/   dashboard-specific widgets (StatCard, UsageChart, ...)
    theme/       theme toggle
  context/       ThemeContext (light/dark/system + localStorage)
  data/          typed mock data, one file per feature
  lib/           utilities (cn, useTypewriter, useMockAction, nav helpers)
  pages/         route-level pages
    dashboard/   the 12 dashboard pages
  types/         shared TypeScript types
eslint.config.js
tailwind.config.ts
```

Full breakdown: `docs/folder-structure.md`, or live in the app under **Resources → Folder Structure**

## 🎨 Customizing colors & theme

All brand colors are HSL CSS variables in `src/index.css`, mapped to
Tailwind tokens in `tailwind.config.ts`. Change a brand color in exactly
one place — every component already reads from the token, never a
hardcoded hex.

```css
/* src/index.css */
:root {
  --primary: 258 90% 66%;   /* #8B5CF6 */
  --secondary: 189 94% 43%; /* #06B6D4 */
  --accent: 38 91% 50%;     /* #F59E0B */
}
```

Full guide, including dark-mode overrides and fonts: `docs/customization.md`, or live in the app under **Resources → Customization**

## ➕ Adding new pages

1. Create the page component in `src/pages/` (or `src/pages/dashboard/`)
2. Add a lazy import + `<Route>` in `src/App.tsx`
3. For a dashboard page, add it to `src/data/dashboardNav.ts` so it appears in the sidebar — breadcrumbs resolve automatically from that same file

Full walkthrough: `docs/adding-pages.md`, or live in the app under **Resources → Adding Pages**

## 🔌 Mock interactions — no backend

This is a **frontend theme** — there is no server, database, or real
authentication. Every interactive flow (chat replies, image generation,
team invites, API key creation, settings save, billing actions,
login/register) is a client-side mock: a short artificial delay, then a
toast or UI update via the shared `useMockAction` hook
(`src/lib/useMockAction.ts`). Search each page for the comment
`// No backend wired up` to find every spot meant to be replaced with a
real API call.

## 🌗 A note on Tremor

The original spec called for Recharts + Tremor. Tremor's current release
peer-depends on React 18 and conflicts with React 19, so dashboard
charts and KPI cards are built directly on Recharts + Tailwind instead,
styled to match. See `src/components/dashboard/` for the pattern.

## 🔎 SEO & performance

- **Per-page metadata**: every marketing page renders a `<Seo title=... description=... />` (see `src/components/Seo.tsx`) that sets the document title, meta description, canonical URL, and Open Graph/Twitter tags on mount. Dashboard and auth pages set `noindex` so they're excluded from search results.
- **Before going live**: update `SITE_URL` in `src/components/Seo.tsx` and `scripts/generate-sitemap.mjs` (both currently `https://example.com`) to your real domain, and add a real 1200×630 `public/og-image.png` (the meta tags reference this path; there's a placeholder reference but no actual image file included).
- **Sitemap**: `npm run build` regenerates `public/sitemap.xml` automatically from your real routes + `src/data/blog.ts` (via the `prebuild` script), so it never goes stale as you add posts. Run it standalone with `npm run generate:sitemap`.
- **robots.txt**: ships at `public/robots.txt`, allowing the marketing site and disallowing `/dashboard`, `/login`, `/register`.
- **Fonts**: loaded via `<link>` tags with `preconnect` in `index.html` (not a render-blocking `@import`), which is what actually moves the Lighthouse performance needle for font loading.
- **Honest limitation**: this is a client-rendered SPA (Vite + React Router), not server-rendered. Googlebot generally executes JavaScript and will index it, but if you need guaranteed crawlability for every search engine/social scraper, or the highest possible Lighthouse SEO/performance score, add static prerendering for the public marketing routes (e.g. `vite-plugin-ssr`, or migrate the marketing site to Astro/Next) before launch — the `<Seo>` component's tags won't appear in a "view source" of the raw HTML otherwise.

## 🌐 Browser support


Latest 2 versions of Chrome, Firefox, Safari, and Edge. No IE11 support
(the project uses modern CSS — `:has()`-free, but relies on CSS Grid,
custom properties, and `backdrop-filter` for the glass effect).

## 🙌 Credits

- [Radix UI](https://www.radix-ui.com/) — accessible component primitives
- [Lucide](https://lucide.dev/) — icons
- [Recharts](https://recharts.org/) — charts
- [Framer Motion](https://www.framer.com/motion/) — animation
- [Sonner](https://sonner.emilkowal.ski/) — toasts
- Fonts: [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) & [Inter](https://fonts.google.com/specimen/Inter) via Google Fonts

## 📝 Changelog

See [CHANGELOG.md](CHANGELOG.md).

## 💬 Support

For license holders: open a support request through your ThemeForest
purchase page, or contact the author directly with your invoice number.
Please include your browser/OS and steps to reproduce for any bug report.

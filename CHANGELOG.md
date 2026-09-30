# Changelog

All notable changes to this project are documented in this file.

## [1.0.0] — Initial release

### Added
- Full marketing site: Hero (animated AI generation demo), Features,
  How it Works, Pricing (monthly/yearly), Testimonials, FAQ, Blog
  (listing + single post), Contact, Login, Register
- Full admin dashboard: collapsible sidebar with nested groups, topbar
  (search, notifications, user menu, theme toggle), breadcrumbs, mobile
  drawer
- 12 dashboard pages: Main Dashboard, AI Chat (with history sidebar and
  its own mobile drawer), Image Generation studio, Prompt Library,
  Usage & Billing, Team Management, API Keys, Settings (Profile +
  Account), Advanced Tables (sort/search/select/paginate), Charts
  showcase (area/bar/line/donut/radial), UI Components reference, Blank
  starter page, and a standalone 404
- Dark/light/system theme support with `localStorage` persistence
- Route-level code splitting (`React.lazy`) for every page beyond the
  landing page
- Mock-action system (`useMockAction` + Sonner toasts) so every button
  gives real feedback — loading state, then a toast — with no backend
  required
- ESLint (flat config) + TypeScript project references, both passing
  with zero errors

### Changed
- Dashboard charts/KPI cards built directly on Recharts + Tailwind
  instead of Tremor, which peer-depends on React 18 and conflicts with
  React 19 (see `README.md` → "A note on Tremor")

### Fixed
- Marketing navbar previously had no mobile menu — Features/Pricing/
  Blog/Contact are now reachable via a drawer below the `md` breakpoint
- AI Chat's conversation history sidebar was hidden entirely on mobile
  with no alternative access — now available via a header button that
  opens the same list in a drawer
- Settings ("Save changes", "Update password", "Change photo",
  "Confirm delete") and Billing ("Upgrade plan", "Cancel subscription",
  "Update payment method") buttons previously had no click handler at
  all; all now give mock loading + toast feedback
- Login/Register form submission previously did nothing; both now show
  a loading state and redirect to the dashboard
- Added the missing `@types/node` dependency (`vite.config.ts` uses
  `path`/`__dirname`, which failed `tsc -b` without it)

# Adding a new page

## A new dashboard page

1. **Create the component** in `src/pages/dashboard/YourPage.tsx`. Use
   an existing page (e.g. `BlankPage.tsx`) as a starting point — the
   `DashboardLayout` already provides the sidebar, topbar, and page
   padding, so your component only needs its own content.

2. **Register the route** in `src/App.tsx`:

   ```tsx
   const YourPage = lazy(() => import("@/pages/dashboard/YourPage"));

   // inside the /dashboard <Route> block:
   <Route path="your-page" element={<YourPage />} />
   ```

3. **Add it to the sidebar** in `src/data/dashboardNav.ts`:

   ```ts
   { label: "Your Page", href: "/dashboard/your-page", icon: YourIcon }
   ```

   To nest it under an existing group (e.g. "AI Tools"), add it to that
   group's `children` array instead of the top-level list.

Breadcrumbs resolve automatically from this same file
(`src/lib/nav.ts` → `resolveNavLabel`) — nothing else to wire up.

## A new marketing page

1. Create the component in `src/pages/YourPage.tsx`
2. Add a lazy import + `<Route>` in `src/App.tsx`, wrapped in
   `<MarketingLayout>` if you want the shared Navbar/Footer:

   ```tsx
   <Route path="/your-page" element={<MarketingLayout><YourPage /></MarketingLayout>} />
   ```

3. Link to it from `src/components/landing/Navbar.tsx` and/or
   `Footer.tsx` if it should be discoverable from the nav

## Adding mock data for a new page

Create a new file in `src/data/` — one file per feature, typed with an
interface, exporting the data as a `const`. Don't inline mock data in
the page component itself; every existing page follows the
data-file-per-feature pattern, and keeping it consistent makes the
whole theme easier for a buyer to scan and customize.

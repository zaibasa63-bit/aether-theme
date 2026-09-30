export default function AddingPagesPage() {
  return (
    <div className="prose dark:prose-invert">
      <h1>Adding New Pages</h1>

      <h2>A new dashboard page</h2>
      <ol>
        <li>
          Create the component in <code>src/pages/dashboard/YourPage.tsx</code>.
          Use an existing page (e.g. <code>BlankPage.tsx</code>) as a
          starting point — <code>DashboardLayout</code> already provides
          the sidebar, topbar, and page padding.
        </li>
        <li>
          Register the route in <code>src/App.tsx</code>:
          <pre>
            <code>{`const YourPage = lazy(() => import("@/pages/dashboard/YourPage"));

// inside the /dashboard <Route> block:
<Route path="your-page" element={<YourPage />} />`}</code>
          </pre>
        </li>
        <li>
          Add it to the sidebar in <code>src/data/dashboardNav.ts</code>:
          <pre>
            <code>{`{ label: "Your Page", href: "/dashboard/your-page", icon: YourIcon }`}</code>
          </pre>
          To nest it under an existing group (e.g. "AI Tools"), add it to
          that group's <code>children</code> array instead.
        </li>
      </ol>
      <p>
        Breadcrumbs resolve automatically from this same file (via{" "}
        <code>src/lib/nav.ts</code> → <code>resolveNavLabel</code>) —
        nothing else to wire up.
      </p>

      <h2>A new marketing page</h2>
      <ol>
        <li>Create the component in <code>src/pages/YourPage.tsx</code></li>
        <li>
          Add a lazy import + route in <code>App.tsx</code>, wrapped in{" "}
          <code>MarketingLayout</code> for the shared Navbar/Footer:
          <pre>
            <code>{`<Route path="/your-page" element={<MarketingLayout><YourPage /></MarketingLayout>} />`}</code>
          </pre>
        </li>
        <li>
          Link to it from <code>Navbar.tsx</code> and/or{" "}
          <code>Footer.tsx</code> if it should be discoverable
        </li>
      </ol>

      <h2>A new documentation page (this section)</h2>
      <ol>
        <li>Create the component in <code>src/pages/resources/YourDoc.tsx</code></li>
        <li>Add a lazy import + route under the <code>/resources</code> block in <code>App.tsx</code></li>
        <li>Add it to <code>src/data/docsNav.ts</code></li>
      </ol>

      <h2>Adding mock data</h2>
      <p>
        Create a new file in <code>src/data/</code> — one file per
        feature, typed with an interface, exporting the data as a{" "}
        <code>const</code>. Don't inline mock data in a page component;
        every existing page follows the data-file-per-feature pattern.
      </p>
    </div>
  );
}

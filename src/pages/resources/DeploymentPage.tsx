export default function DeploymentPage() {
  return (
    <div className="prose dark:prose-invert">
      <h1>Deployment</h1>
      <p>
        Aether builds to a static <code>dist/</code> folder (plain HTML,
        CSS, JS) — it can be hosted anywhere that serves static files. The
        one thing every host needs to be configured for is{" "}
        <strong>SPA fallback routing</strong>: because React Router handles
        navigation client-side, the host must serve{" "}
        <code>index.html</code> for every path (e.g. <code>/dashboard</code>,{" "}
        <code>/blog/some-post</code>) rather than returning a 404.
      </p>

      <h2>Build command &amp; output</h2>
      <pre><code>Build command: npm run build
Output directory: dist</code></pre>

      <h2>Vercel</h2>
      <ol>
        <li>Import the project (or deploy via the CLI: <code>vercel</code> from the project root)</li>
        <li>Framework preset: <strong>Vite</strong> (auto-detected)</li>
        <li>Build command: <code>npm run build</code> — Output directory: <code>dist</code></li>
        <li>
          A <code>vercel.json</code> is included in the project root with a
          catch-all rewrite to <code>index.html</code> — without it,
          navigating directly to a client-side route like{" "}
          <code>/blog</code> or <code>/dashboard</code> (rather than
          clicking to it from the home page) returns Vercel's own 404
          page, since the static file server has no <code>/blog</code>{" "}
          file to serve:
          <pre><code>{`{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}`}</code></pre>
          If you deployed before this file existed, redeploy (
          <code>vercel --prod</code>) after pulling it in — Vercel doesn't
          retroactively apply config changes to old deployments.
        </li>
      </ol>

      <h2>Netlify</h2>
      <ol>
        <li>Build command: <code>npm run build</code> — Publish directory: <code>dist</code></li>
        <li>
          Add a <code>public/_redirects</code> file so client-side routes
          don't 404 on refresh:
          <pre><code>/*  /index.html  200</code></pre>
        </li>
      </ol>

      <h2>Any other static host (S3, GitHub Pages, a VPS with Nginx, etc.)</h2>
      <p>
        Upload the contents of <code>dist/</code> and configure the server
        to fall back to <code>index.html</code> for unknown paths. For
        Nginx, that's a <code>try_files $uri /index.html;</code> rule.
      </p>

      <h2>Environment variables</h2>
      <p>
        The theme itself needs none. Once you wire in a real backend (see{" "}
        <a href="/resources/integration">Integration</a>), any secret API
        keys belong on your <em>backend's</em> host (or a serverless
        function's environment settings) — never in a Vite{" "}
        <code>VITE_*</code> variable, since anything prefixed{" "}
        <code>VITE_</code> is bundled into the public frontend code.
      </p>
    </div>
  );
}

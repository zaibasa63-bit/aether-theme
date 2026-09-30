export default function GettingStartedPage() {
  return (
    <div className="prose dark:prose-invert">
      <h1>Getting Started</h1>
      <p>Requires Node.js 18 or newer.</p>

      <h2>1. Install dependencies</h2>
      <p>From the project root (the folder containing <code>package.json</code>):</p>
      <pre><code>npm install</code></pre>

      <h2>2. Start the dev server</h2>
      <pre><code>npm run dev</code></pre>
      <p>Open the printed URL — by default <code>http://localhost:5173</code>.</p>

      <h2>3. Build for production</h2>
      <pre><code>npm run build</code></pre>
      <p>
        This also regenerates <code>public/sitemap.xml</code> automatically
        (see the <code>prebuild</code> script) before compiling. Output goes
        to <code>dist/</code>.
      </p>

      <h2>4. Preview the production build locally</h2>
      <pre><code>npm run preview</code></pre>

      <h2>5. Lint</h2>
      <pre><code>npm run lint</code></pre>
      <p>Should report zero errors out of the box.</p>

      <h2>No environment variables required</h2>
      <p>
        The theme runs with zero configuration — everything renders from
        local mock data in <code>src/data/</code>. You only need
        environment variables once you start wiring in a real backend; see
        the Integration page for that.
      </p>
    </div>
  );
}

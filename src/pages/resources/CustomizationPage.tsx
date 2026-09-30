export default function CustomizationPage() {
  return (
    <div className="prose dark:prose-invert">
      <h1>Customization</h1>

      <h2>Colors</h2>
      <p>
        Every color is an HSL CSS variable in <code>src/index.css</code>,
        under <code>:root</code> (light mode) and <code>.dark</code> (dark
        mode overrides). Tailwind maps each one to a semantic class name in{" "}
        <code>tailwind.config.ts</code>.
      </p>
      <pre>
        <code>{`:root {
  --primary: 258 90% 66%;        /* #8B5CF6 */
  --primary-dark: 262 83% 58%;   /* #7C3AED */
  --secondary: 189 94% 43%;      /* #06B6D4 */
  --accent: 38 91% 50%;          /* #F59E0B */
  --background: 0 0% 98%;        /* #FAFAFA */
  --foreground: 0 0% 9%;         /* #171717 */
}

.dark {
  --background: 0 0% 4%;         /* #0A0A0A */
  --foreground: 0 0% 96%;        /* #F5F5F5 */
}`}</code>
      </pre>
      <p>
        Use the semantic class everywhere — <code>bg-primary</code>,{" "}
        <code>text-accent</code>, <code>border-border</code> — never a raw
        hex value in a component. This is what lets a full rebrand touch
        one file instead of forty.
      </p>
      <p>
        <strong>Exception:</strong> Recharts needs literal color strings
        for SVG fills (it can't resolve Tailwind classes). Chart colors are
        hardcoded in <code>src/components/dashboard/UsageChart.tsx</code>{" "}
        and <code>src/pages/dashboard/ChartsPage.tsx</code> — update those
        hex values to match if you change the brand palette.
      </p>

      <h2>Fonts</h2>
      <p>
        Two typefaces, loaded via preconnected <code>&lt;link&gt;</code>{" "}
        tags in <code>index.html</code> (not a render-blocking CSS{" "}
        <code>@import</code>):
      </p>
      <ul>
        <li><strong>Space Grotesk</strong> — headings (<code>font-display</code>)</li>
        <li><strong>Inter</strong> — body text (<code>font-sans</code>, the default)</li>
      </ul>
      <p>
        To swap either, change the Google Fonts URL in{" "}
        <code>index.html</code> and the matching entry in{" "}
        <code>tailwind.config.ts</code> → <code>theme.fontFamily</code>.
      </p>

      <h2>Dark / light mode</h2>
      <p>
        Handled by <code>src/context/ThemeContext.tsx</code>: three states
        — <code>light</code>, <code>dark</code>, <code>system</code> — with{" "}
        <code>system</code> resolved against{" "}
        <code>prefers-color-scheme</code> and kept in sync if the OS
        setting changes while the app is open. The resolved theme persists
        to <code>localStorage</code> under the key <code>aether-theme</code>.
      </p>
      <p>
        <code>useTheme()</code> exposes{" "}
        <code>{`{ theme, resolvedTheme, setTheme, toggleTheme }`}</code>.
      </p>

      <h2>Layout tokens</h2>
      <p>
        <code>--radius</code> controls the base corner radius used by{" "}
        <code>rounded-lg</code> / <code>rounded-md</code> /{" "}
        <code>rounded-sm</code> everywhere. The <code>.glass</code> /{" "}
        <code>.glass-strong</code> utility classes control the
        glassmorphism effect, used sparingly — the navbar and the hero's
        AI demo panel.
      </p>
    </div>
  );
}

# Customization guide

## Colors

Every color is an HSL CSS variable in `src/index.css`, under `:root`
(light mode) and `.dark` (dark mode overrides). Tailwind maps each one
to a semantic class name in `tailwind.config.ts`.

```css
/* src/index.css */
:root {
  --primary: 258 90% 66%;        /* #8B5CF6 */
  --primary-dark: 262 83% 58%;   /* #7C3AED */
  --secondary: 189 94% 43%;      /* #06B6D4 */
  --accent: 38 91% 50%;          /* #F59E0B */
  --background: 0 0% 98%;        /* #FAFAFA */
  --foreground: 0 0% 9%;         /* #171717 */
  /* ...muted, border, card, destructive, success, warning */
}

.dark {
  --background: 0 0% 4%;         /* #0A0A0A */
  --foreground: 0 0% 96%;        /* #F5F5F5 */
  /* primary/secondary/accent can be restated here if you want a
     different dark-mode variant of your brand color */
}
```

Use the semantic class everywhere — `bg-primary`, `text-accent`,
`border-border` — never a raw hex value in a component. This is what
lets a full rebrand touch one file instead of forty.

**Exception:** Recharts needs literal color strings for SVG fills (it
can't resolve Tailwind classes). Chart colors are hardcoded in
`src/components/dashboard/UsageChart.tsx` and
`src/pages/dashboard/ChartsPage.tsx` — update those hex values to match
if you change the brand palette.

## Fonts

Two typefaces, loaded via Google Fonts in `src/index.css`:

- **Space Grotesk** — headings (`font-display` in Tailwind)
- **Inter** — body text (`font-sans`, the default)

To swap either, change the `@import` URL at the top of `src/index.css`
and the corresponding entry in `tailwind.config.ts` → `theme.fontFamily`.

## Dark / light mode

Handled by `src/context/ThemeContext.tsx`: three states — `light`,
`dark`, `system` — with `system` resolved against
`prefers-color-scheme` and kept in sync if the OS setting changes while
the app is open. The resolved theme is stored under the `aether-theme`
key in `localStorage`.

- `useTheme()` exposes `{ theme, resolvedTheme, setTheme, toggleTheme }`
- The navbar/topbar `ThemeToggle` component is a simple light↔dark
  toggle; for a three-way Light/Dark/System control (e.g. in Settings),
  build a small menu that calls `setTheme("light" | "dark" | "system")`

## Layout tokens

`--radius` (in `src/index.css`) controls the base corner radius used by
`rounded-lg` / `rounded-md` / `rounded-sm` across the theme. The
`.glass` / `.glass-strong` utility classes (same file) control the
glassmorphism effect used sparingly — the navbar and the hero's AI demo
panel.

## Swapping in a real backend

Every mock interaction is intentionally isolated so it's easy to find
and replace:

- Search the codebase for `// No backend wired up` — each instance
  marks a `setTimeout` standing in for a real request
- `src/lib/useMockAction.ts` is the shared pattern for "loading state →
  delay → toast" used by Settings and Billing; swap the body of `run()`
  for a real `fetch`/API call and every button using the hook updates
  automatically
- `src/pages/dashboard/ChatPage.tsx` and `ImageGenerationPage.tsx` have
  their own inline mock logic (chat replies, image placeholders) —
  these are the two most likely candidates for a real model integration
- `src/pages/LoginPage.tsx` / `RegisterPage.tsx` redirect to `/dashboard`
  after a fixed delay with no real auth check — add your auth call
  before the `navigate()` call

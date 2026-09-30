export default function LicensePage() {
  return (
    <div className="prose dark:prose-invert">
      <h1>License</h1>
      <p>
        This page explains, in plain language, what a buyer of this theme
        can and cannot do. It is not a substitute for whichever license
        text is actually attached to your sale — see the note for your
        specific sales channel below.
      </p>

      <h2>If sold through ThemeForest / Envato Market</h2>
      <p>
        Envato's marketplace licenses govern the sale, not this document.
        The official, legally binding terms are always the current
        version at{" "}
        <a href="https://help.author.envato.com/hc/en-us/articles/360031342051" target="_blank" rel="noreferrer">
          Envato's license terms page
        </a>. In short:
      </p>
      <ul>
        <li>
          <strong>Regular License</strong> — one end product (one
          site/app), for yourself or one client. The product can be free
          or paid, but the theme's source code itself cannot be resold or
          redistributed as a standalone template.
        </li>
        <li>
          <strong>Extended License</strong> — required if the end product
          will itself be sold as a template/theme (the buyer pays
          specifically for the source), or if you need to use it across
          multiple end products.
        </li>
      </ul>

      <h2>If sold directly (Gumroad, Lemon Squeezy, your own store)</h2>
      <p>
        A simple commercial license template for a direct, one-time sale
        — adapt the bracketed parts:
      </p>
      <pre>
        <code>{`Aether — Commercial License

Copyright (c) [year] [your name/company]

Upon purchase, the buyer is granted a non-exclusive, non-transferable
license to:
  - Use this source code to build one (1) end product, for personal
    use or on behalf of one client.
  - Modify the code freely for that end product.

The buyer may NOT:
  - Resell, sublicense, or redistribute the source code itself, in
    original or modified form, as a standalone product or template.
  - Use this single purchase across more than one end product.
  - Claim authorship of the original theme.

For a license covering multiple end products, or permission to resell
an end product built with this theme as a template itself, contact
[your email] for an extended license.

This software is provided "as is", without warranty of any kind.`}</code>
      </pre>

      <h2>Third-party licenses</h2>
      <p>
        This project uses open-source packages, each under its own
        license (mostly MIT, plus SIL Open Font License for the Google
        Fonts used) — React, Vite, Tailwind CSS, Radix UI, Recharts,
        Framer Motion, Lucide, Sonner. All are compatible with commercial
        redistribution; none require attribution in the end product. No
        stock photos, paid icon sets, or other licensed media are used
        anywhere in the theme — every visual is CSS/SVG/component-based.
      </p>
    </div>
  );
}

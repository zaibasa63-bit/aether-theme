// Generates public/sitemap.xml from the real route list and the blog
// post data, so the sitemap can never drift out of sync with the site's
// actual content. Runs automatically before every `npm run build`
// (see the "prebuild" script in package.json).
//
// Deliberately dependency-free (no ts-node/tsx) so it runs with plain
// Node — it extracts blog slugs from src/data/blog.ts with a small
// regex rather than importing the TypeScript module directly.
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

// Replace with your real production domain before going live.
const SITE_URL = "https://example.com";

const staticRoutes = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/blog", priority: "0.8", changefreq: "weekly" },
  { path: "/contact", priority: "0.5", changefreq: "yearly" },
  { path: "/resources", priority: "0.7", changefreq: "monthly" },
];

function getBlogSlugs() {
  const source = readFileSync(join(root, "src/data/blog.ts"), "utf-8");
  const matches = [...source.matchAll(/slug:\s*"([^"]+)"/g)];
  return matches.map((m) => m[1]);
}

function buildSitemap() {
  const blogRoutes = getBlogSlugs().map((slug) => ({
    path: `/blog/${slug}`,
    priority: "0.6",
    changefreq: "monthly",
  }));

  const allRoutes = [...staticRoutes, ...blogRoutes];
  const today = new Date().toISOString().split("T")[0];

  const urlEntries = allRoutes
    .map(
      (r) => `  <url>
    <loc>${SITE_URL}${r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>
`;
}

writeFileSync(join(root, "public/sitemap.xml"), buildSitemap());
console.log(`✓ Generated public/sitemap.xml (${staticRoutes.length + getBlogSlugs().length} URLs)`);

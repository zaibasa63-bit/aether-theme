import { useEffect } from "react";

interface SeoProps {
  title: string;
  description: string;
  /** Set true for app/auth screens that shouldn't be indexed (dashboard, login, register) */
  noindex?: boolean;
  /** Defaults to /og-image.png — replace with a real 1200x630 image before going live */
  image?: string;
}

const SITE_NAME = "Aether";
const SITE_URL = "https://example.com"; // replace with your real production domain

function setMetaTag(attr: "name" | "property", key: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

/**
 * Sets document.title and meta tags on mount/update. This is a
 * client-side-only SPA, so search engines that don't execute JavaScript
 * won't see these tags — Googlebot generally does execute JS, but for
 * guaranteed crawlability (and the fastest possible Lighthouse SEO
 * score) consider adding static prerendering (e.g. vite-plugin-ssr,
 * or Astro/Next) for the public marketing routes before launch.
 */
export function Seo({ title, description, noindex = false, image = "/og-image.png" }: SeoProps) {
  useEffect(() => {
    const fullTitle = `${title} · ${SITE_NAME}`;
    document.title = fullTitle;

    setMetaTag("name", "description", description);
    setMetaTag("name", "robots", noindex ? "noindex, nofollow" : "index, follow");

    setMetaTag("property", "og:title", fullTitle);
    setMetaTag("property", "og:description", description);
    setMetaTag("property", "og:type", "website");
    setMetaTag("property", "og:site_name", SITE_NAME);
    setMetaTag("property", "og:url", `${SITE_URL}${window.location.pathname}`);
    setMetaTag("property", "og:image", `${SITE_URL}${image}`);

    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:title", fullTitle);
    setMetaTag("name", "twitter:description", description);
    setMetaTag("name", "twitter:image", `${SITE_URL}${image}`);

    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", `${SITE_URL}${window.location.pathname}`);
  }, [title, description, noindex, image]);

  return null;
}

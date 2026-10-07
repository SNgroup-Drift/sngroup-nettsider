import { defineConfig } from "astro/config";

// Statisk side for Cloudflare Workers (statiske filer, se wrangler.jsonc). Ingen server og ingen inline-skript. CSS-en ligger inline, og
// scripts/csp-hasher.mjs legger hashene inn i CSP-en i dist/_headers etter bygging.
export default defineConfig({
  site: "https://hengsel.no",
  output: "static",
  trailingSlash: "never",
  build: { format: "file", inlineStylesheets: "always" },
  // Én CSS-fil for hele nettstedet: færre forespørsler som blokkerer visning, og den caches på tvers av sider.
  vite: { build: { assetsInlineLimit: 0, cssCodeSplit: false } },
});

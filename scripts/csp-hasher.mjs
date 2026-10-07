#!/usr/bin/env node
/**
 * Etter bygging: legger sha256-hasher for inline <style> inn i CSP-en i dist/_headers.
 * CSS-en ligger inline i HTML-en (raskere første visning), men CSP-en tillater fortsatt ikke vilkårlig inline-stil.
 * Kjøres fra hvert nettsteds build-skript: node ../../scripts/csp-hasher.mjs dist
 */
import { createHash } from "node:crypto";
import { readFile, readdir, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";

const dist = resolve(process.argv[2] ?? "dist");
const hasher = new Set();
for (const f of (await readdir(dist, { recursive: true })).filter((f) => f.endsWith(".html"))) {
  const html = await readFile(join(dist, f), "utf8");
  for (const m of html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)) {
    hasher.add(`'sha256-${createHash("sha256").update(m[1]).digest("base64")}'`);
  }
  if (/<script(?![^>]*\bsrc=)(?![^>]*type="application\/(?:ld\+)?json")[^>]*>/.test(html)) {
    console.error(`✗ ${f}: inline-skript er ikke tillatt av CSP-en (script-src 'self')`);
    process.exit(1);
  }
}
const fil = join(dist, "_headers");
const hoder = await readFile(fil, "utf8");
if (!hoder.includes("style-src 'self'")) {
  console.error("✗ fant ikke style-src 'self' i _headers");
  process.exit(1);
}
await writeFile(fil, hoder.replace("style-src 'self'", ["style-src 'self'", ...hasher].join(" ")));
console.log(`✓ CSP: ${hasher.size} stilhash(er) lagt inn i ${fil}`);

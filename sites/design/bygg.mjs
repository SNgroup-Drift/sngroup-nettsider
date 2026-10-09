#!/usr/bin/env node
/**
 * Bygger designgalleriet (design.hengsel.no): en forside som lister alle docs/design/**\/*.dc.html i nummerrekkefølge
 * med tittel og dato, og selve designfilene uendret under dist/design/.
 *
 *  - src/            forsiden (index.html), 404, _headers og robots.txt → dist/
 *  - docs/design/    kopieres til dist/design/ (uten uploads/ og zip), så .dc.html-filene finner _ds/, support.js,
 *                    assets/ og img/ relativt som før
 *  - logo og ikoner  fra docs/design/hengsel/logo → dist/ (favicon.svg, favicon-32.png, favicon-192.png,
 *                    apple-touch-icon-180.png, maskable-512.png, hengsel-logo-lys.svg, hengsel-logo-mork.svg)
 *  - skrifter        Newsreader og Inter fra @fontsource-variable → dist/fonts/ (som i sites/vis)
 *
 * Datoen per fil er datoen for siste commit som rørte fila. Den leses fra git når historikken er hel, og lagres i
 * datoer.json; i Cloudflare Pages (grunt klon) leses datoer.json. Oppdater fila lokalt med: npm run datoer -w sites/design
 *
 * Ingen avhengigheter utover Node. Kjør fra rotmappen: npm run build -w sites/design
 */
import { cp, mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";
import { basename, dirname, join, relative } from "node:path";

const her = import.meta.dirname;
const rot = join(her, "..", "..");
const kilde = join(rot, "docs", "design");
const src = join(her, "src");
const dist = process.env.DESIGN_DIST ?? join(her, "dist");
const datoFil = join(her, "datoer.json");
const bareDatoer = process.argv.includes("--bare-datoer");
const require = createRequire(import.meta.url);

/** Alle .dc.html under docs/design, som stier relativt til docs/design */
async function finn(dir) {
  const ut = [];
  for (const e of (await readdir(dir, { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name, "nb"))) {
    const sti = join(dir, e.name);
    if (e.isDirectory()) { if (!["_ds", "uploads", "screenshots", "node_modules"].includes(e.name)) ut.push(...(await finn(sti))); }
    else if (e.name.endsWith(".dc.html")) ut.push(relative(kilde, sti));
  }
  return ut;
}

/** Datoer fra git (siste commit per fil), bare når historikken er hel */
function datoerFraGit(filer) {
  try {
    if (execFileSync("git", ["rev-parse", "--is-shallow-repository"], { cwd: rot, encoding: "utf8" }).trim() === "true") return null;
    const ut = {};
    for (const f of filer) {
      const d = execFileSync("git", ["log", "-1", "--format=%cs", "--", join("docs", "design", f)], { cwd: rot, encoding: "utf8" }).trim();
      if (d) ut[f] = d;
    }
    return ut;
  } catch {
    return null;
  }
}

const filer = await finn(kilde);
let datoer = datoerFraGit(filer);
if (datoer) {
  await writeFile(datoFil, JSON.stringify(datoer, null, 2) + "\n");
  if (bareDatoer) { console.log(`design: ${Object.keys(datoer).length} datoer skrevet til datoer.json`); process.exit(0); }
} else {
  if (bareDatoer) throw new Error("Fant ikke hel git-historikk. Kjør fra en vanlig klon.");
  datoer = JSON.parse(await readFile(datoFil, "utf8"));
  console.log("design: git-historikken er grunn, datoene leses fra datoer.json");
}

/** Tittel fra <title> i fila; ellers filnavnet uten .dc.html */
async function tittel(f) {
  const html = await readFile(join(kilde, f), "utf8");
  const m = html.match(/<title>([^<]*)<\/title>/);
  const navn = basename(f, ".dc.html").replace(/^\d+\s+/, "");
  const t = m?.[1].trim();
  return t && t !== "Bundled Page" ? t : navn;
}

/** Nummer foran filnavnet («51 Hengsel nettside») styrer rekkefølgen; filer uten nummer kommer etter, alfabetisk */
function nummer(f) {
  const m = basename(f).match(/^(\d+)\s/);
  return m ? Number(m[1]) : Infinity;
}

const grupper = { sngroup: "sngroup.no", hengsel: "hengsel.no", "hengsel/apptest": "hengsel.no/apptest", byggem: "byggem.no" };
const dato = (iso) => { const [y, m, d] = iso.split("-"); return `${d}.${m}.${y}`; };
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");

const poster = [];
for (const f of filer) {
  const mappe = dirname(f).replace(/\\/g, "/");
  poster.push({ f, mappe, gruppe: grupper[mappe] ?? mappe, n: nummer(f), t: await tittel(f), d: datoer[f] ?? "" });
}
poster.sort((a, b) => a.n - b.n || a.t.localeCompare(b.t, "nb"));

let html = "";
for (const [mappe, navn] of Object.entries(grupper)) {
  const l = poster.filter((p) => p.mappe === mappe);
  if (!l.length) continue;
  html += `<section class="gruppe" aria-labelledby="g-${mappe.replace("/", "-")}">\n<h2 id="g-${mappe.replace("/", "-")}">${navn}</h2>\n<ol class="liste">\n`;
  for (const p of l) {
    const url = "/design/" + p.f.split("/").map(encodeURIComponent).join("/");
    html += `<li><a class="card rad" href="${url}"><span class="nr">${p.n === Infinity ? "–" : p.n}</span><span class="t"><span class="tittel">${esc(p.t)}</span><span class="fil">${esc(basename(p.f))}</span></span><span class="dato">${p.d ? `<time datetime="${p.d}">${dato(p.d)}</time>` : ""}</span></a></li>\n`;
  }
  html += "</ol>\n</section>\n";
}
const ukjent = poster.filter((p) => !(p.mappe in grupper));
if (ukjent.length) console.warn(`design: ${ukjent.length} filer i mapper uten navn: ${[...new Set(ukjent.map((p) => p.mappe))].join(", ")}`);

// dist
await rm(dist, { recursive: true, force: true });
await cp(src, dist, { recursive: true });
await cp(kilde, join(dist, "design"), { recursive: true, filter: (s) => !/[\\/]uploads([\\/]|$)/.test(s) && !s.endsWith(".zip") });

const logo = join(kilde, "hengsel", "logo");
for (const [fra, til] of [
  ["favicon.svg", "favicon.svg"], ["png/favicon-32.png", "favicon-32.png"], ["png/favicon-192.png", "favicon-192.png"],
  ["png/apple-touch-icon-180.png", "apple-touch-icon-180.png"], ["png/maskable-512.png", "maskable-512.png"],
  ["hengsel-logo-lys.svg", "hengsel-logo-lys.svg"], ["hengsel-logo-mork.svg", "hengsel-logo-mork.svg"],
]) await cp(join(logo, fra), join(dist, til));
await writeFile(join(dist, "site.webmanifest"), JSON.stringify({
  name: "Hengsel design", short_name: "Design", start_url: "/", display: "browser", background_color: "#F2E9DB", theme_color: "#5074A9",
  icons: [{ src: "/favicon-192.png", sizes: "192x192", type: "image/png" }, { src: "/maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" }],
}, null, 2) + "\n");

const sist = poster.map((p) => p.d).filter(Boolean).sort().at(-1);
const forside = (await readFile(join(dist, "index.html"), "utf8"))
  .replace("<!--galleri-->", html)
  .replace("<!--antall-->", String(poster.length))
  .replace("<!--sist-->", sist ? dato(sist) : "");
await writeFile(join(dist, "index.html"), forside);

// skrifter som i sites/vis
const skrifter = [
  { pakke: "@fontsource-variable/newsreader", css: ["wght.css"], fra: "Newsreader Variable", til: "Newsreader" },
  { pakke: "@fontsource-variable/inter", css: ["wght.css"], fra: "Inter Variable", til: "Inter" },
];
const fonts = join(dist, "fonts");
await mkdir(fonts);
let css = "/* Selvhostede skrifter fra @fontsource-variable (samme som packages/design). Lages av bygg.mjs. */\n";
for (const s of skrifter) {
  const rotPakke = dirname(require.resolve(`${s.pakke}/package.json`));
  for (const fil of s.css) {
    let tekst = await readFile(join(rotPakke, fil), "utf8");
    for (const [, navn] of tekst.matchAll(/url\(\.\/files\/([^)]+)\)/g)) await cp(join(rotPakke, "files", navn), join(fonts, navn));
    tekst = tekst.replaceAll("url(./files/", "url(/fonts/").replaceAll(`'${s.fra}'`, `'${s.til}'`);
    css += `\n${tekst.trim()}\n`;
  }
}
await writeFile(join(fonts, "fonts.css"), css);
console.log(`design: ${poster.length} designfiler i ${Object.keys(grupper).length} grupper, sist endret ${sist ?? "?"}, bygd til ${relative(rot, dist)}`);

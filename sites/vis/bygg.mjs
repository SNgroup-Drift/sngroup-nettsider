#!/usr/bin/env node
/**
 * Bygger Visningsrommet: kopierer src/ til dist/, legger de selvhostede skriftene i dist/fonts/, skjermbildene
 * (fra sites/hengsel/public/img) og SN-logoen (fra sites/sngroup/public) i dist/img/, og setter inn Hengsel-logoen.
 *
 * Skriftene er de samme som i designpakken (packages/design/src/styles/fonts.css): Newsreader (vanlig og kursiv) og
 * Inter fra @fontsource-variable. dist/fonts/fonts.css får familienavnene «Newsreader» og «Inter», så stilene i sidene
 * virker uten endringer. Ingen Google Fonts.
 *
 * Ingen avhengigheter utover Node. Kjør fra rotmappen: npm run build -w sites/vis
 */
import { cp, mkdir, readdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";

const her = import.meta.dirname;
const src = join(her, "src");
const dist = process.env.VIS_DIST ?? join(her, "dist"); // VIS_DIST: bygg til en annen mappe (f.eks. for parallelle sjekker)
const require = createRequire(import.meta.url);

const skrifter = [
  { pakke: "@fontsource-variable/newsreader", css: ["wght.css", "wght-italic.css"], fra: "Newsreader Variable", til: "Newsreader" },
  { pakke: "@fontsource-variable/inter", css: ["wght.css"], fra: "Inter Variable", til: "Inter" },
];

await rm(dist, { recursive: true, force: true });
await cp(src, dist, { recursive: true });

const fonts = join(dist, "fonts");
try {
  await stat(fonts);
  throw new Error("src/fonts finnes allerede; bygget legger skriftene der. Gi mappen et annet navn.");
} catch (e) {
  if (e.code !== "ENOENT") throw e;
}
await mkdir(fonts);

let css = "/* Selvhostede skrifter fra @fontsource-variable (samme som packages/design). Lages av bygg.mjs. */\n";
let antall = 0;
for (const s of skrifter) {
  const rotPakke = dirname(require.resolve(`${s.pakke}/package.json`));
  for (const fil of s.css) {
    let tekst = await readFile(join(rotPakke, fil), "utf8");
    for (const [, navn] of tekst.matchAll(/url\(\.\/files\/([^)]+)\)/g)) {
      await cp(join(rotPakke, "files", navn), join(fonts, navn));
      antall++;
    }
    tekst = tekst.replaceAll("url(./files/", "url(/fonts/").replaceAll(`'${s.fra}'`, `'${s.til}'`);
    css += `\n${tekst.trim()}\n`;
  }
}
await writeFile(join(fonts, "fonts.css"), css);

// Skjermbildene på forsiden hentes fra hengsel.no, og SN-logoen fra sngroup.no, så de ikke ligger dobbelt i repoet.
// Bilder som bare finnes i Visningsrommet (f.eks. src/img/opplaering.webp) ligger i src/img og er alt kopiert.
const sites = join(her, "..");
const img = join(dist, "img");
await mkdir(img, { recursive: true });
const forside = (await readFile(join(src, "index.html"), "utf8")) + (await readFile(join(src, "side.js"), "utf8"));
const bilder = [...new Set([...forside.matchAll(/\/img\/([a-z0-9-]+\.(?:webp|svg))/g)].map((m) => m[1]))];
for (const navn of bilder) {
  if (navn.startsWith("sn-logo")) continue;
  if (await stat(join(src, "img", navn)).catch(() => null)) continue;
  await cp(join(sites, "hengsel", "public", "img", navn), join(img, navn));
}
await cp(join(sites, "sngroup", "public", "logo.svg"), join(img, "sn-logo.svg"));
await cp(join(sites, "sngroup", "public", "logo-mork.svg"), join(img, "sn-logo-mork.svg"));

// Hengsel-logoen der det står <!--hengsel-logo 18--> (tallet er høyden i px). Fasit: sites/hengsel/src/components/HengselLogo.astro
function hengselLogo(size) {
  const d = size <= 28
    ? { a: 2.5, w: 25.5, h: 67, x2: 36, sw: 5, gy: 29, gh: 14, r: 7 }
    : { a: 1.5, w: 26.5, h: 69, x2: 36, sw: 3, gy: 31, gh: 10, r: 5 };
  return `<span class="hlogo" style="font-size:${size}px" role="img" aria-label="Hengsel CRM">` +
    `<svg class="merke" viewBox="0 0 64 72" aria-hidden="true">` +
    `<rect class="dor" x="${d.a}" y="${d.a}" width="${d.w}" height="${d.h}" stroke-width="${d.sw}"/>` +
    `<rect class="dor" x="${d.x2}" y="${d.a}" width="${d.w}" height="${d.h}" stroke-width="${d.sw}"/>` +
    `<rect class="grep" x="17" y="${d.gy}" width="13" height="${d.gh}" rx="${d.r}"/>` +
    `<rect class="grep" x="34" y="${d.gy}" width="13" height="${d.gh}" rx="${d.r}"/></svg>` +
    `<span aria-hidden="true">engsel</span>` +
    `<svg class="crm" viewBox="0 0 25 20" aria-hidden="true"><path class="hake" d="M1.17 5.24l3.33 3.33l6.67 -7.4"/><text x="0" y="19.6">CRM</text></svg></span>`;
}
let sider = 0;
async function settInnLogo(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const sti = join(dir, e.name);
    if (e.isDirectory()) await settInnLogo(sti);
    else if (e.name.endsWith(".html")) {
      const tekst = await readFile(sti, "utf8");
      const ny = tekst.replace(/<!--hengsel-logo (\d+)-->/g, (_, n) => hengselLogo(Number(n)));
      if (ny !== tekst) { await writeFile(sti, ny); sider++; }
    }
  }
}
await settInnLogo(dist);
console.log(`vis: src/ kopiert til dist/, ${antall} skriftfiler i dist/fonts/, ${bilder.length} bilder i dist/img/, Hengsel-logoen på ${sider} sider`);

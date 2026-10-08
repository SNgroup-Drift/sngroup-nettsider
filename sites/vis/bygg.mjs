#!/usr/bin/env node
/**
 * Bygger Visningsrommet: kopierer src/ uendret til dist/, og legger de selvhostede skriftene i dist/fonts/.
 *
 * Skriftene er de samme som i designpakken (packages/design/src/styles/fonts.css): Newsreader (vanlig og kursiv) og
 * Inter fra @fontsource-variable. dist/fonts/fonts.css får familienavnene «Newsreader» og «Inter», så stilene i sidene
 * virker uten endringer. Ingen Google Fonts.
 *
 * Ingen avhengigheter utover Node. Kjør fra rotmappen: npm run build -w sites/vis
 */
import { cp, mkdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";

const her = import.meta.dirname;
const src = join(her, "src");
const dist = join(her, "dist");
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
console.log(`vis: src/ kopiert til dist/, ${antall} skriftfiler i dist/fonts/`);

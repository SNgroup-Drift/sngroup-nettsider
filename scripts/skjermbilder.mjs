#!/usr/bin/env node
/**
 * Skjermbilder og nettlesersjekker med Playwright (Chromium).
 *
 *  - Skjermbilder av sngroup.no (/ og /design) på desktop og mobil, lys og mørk, til docs/skjermbilder/.
 *  - Alle sider på alle nettsteder: ingen vannrett rulling ved 360 px, ingen konsollfeil (CSP fra _headers gjelder).
 *  - Plantegningen: et klikk på et rom bytter tekst og åpner riktig rad.
 *  - Hvilke skrifter som faktisk lastes.
 *
 * Kjør etter `npm run build`: npm run skjermbilder
 * Chromium: PLAYWRIGHT_BROWSERS_PATH, eller CHROMIUM_PATH for en bestemt fil.
 */
import { chromium } from "playwright";
import { mkdir, readdir } from "node:fs/promises";
import { join, resolve } from "node:path";
import { startServer } from "./statisk-server.mjs";

const rot = resolve(import.meta.dirname, "..");
const ut = join(rot, "docs", "skjermbilder");
await mkdir(ut, { recursive: true });

const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
let feil = 0;
const meld = (ok, tekst) => {
  if (!ok) feil++;
  console.log(`${ok ? "✓" : "✗"} ${tekst}`);
};

const servere = {};
for (const navn of await readdir(join(rot, "sites"))) {
  const s = await startServer(join(rot, "sites", navn, "dist"));
  servere[navn] = { s, base: `http://127.0.0.1:${s.address().port}` };
}

// 1. Skjermbilder av sngroup.no
const visninger = [
  { navn: "desktop", viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 },
  { navn: "mobil", viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
];
for (const side of [{ sti: "/", fil: "forside" }, { sti: "/design", fil: "design" }]) {
  for (const v of visninger) {
    for (const modus of ["light", "dark"]) {
      const ctx = await browser.newContext({ ...v, colorScheme: modus, reducedMotion: "reduce" });
      const page = await ctx.newPage();
      await page.goto(servere.sngroup.base + side.sti, { waitUntil: "networkidle" });
      await page.evaluate(() => document.fonts.ready);
      const fil = `${side.fil}-${v.navn}-${modus === "light" ? "lys" : "mork"}.png`;
      await page.screenshot({ path: join(ut, fil), fullPage: true });
      console.log(`  bilde: docs/skjermbilder/${fil}`);
      await ctx.close();
    }
  }
}

// 2. 360 px uten vannrett rulling, og ingen konsollfeil, på alle sider
for (const [navn, { base }] of Object.entries(servere)) {
  const sider = navn === "sngroup" ? ["/", "/personvern", "/design", "/404"] : ["/", "/personvern", "/404"];
  for (const sti of sider) {
    for (const modus of ["light", "dark"]) {
      const ctx = await browser.newContext({ viewport: { width: 360, height: 740 }, colorScheme: modus, isMobile: true, hasTouch: true });
      const page = await ctx.newPage();
      const konsoll = [];
      page.on("console", (m) => m.type() === "error" && konsoll.push(m.text()));
      page.on("pageerror", (e) => konsoll.push(e.message));
      await page.goto(base + sti, { waitUntil: "networkidle" });
      // body har overflow-x: clip, så vi ser også etter elementer som stikker ut (de ville blitt klippet)
      const { sw, cw, utenfor } = await page.evaluate(() => {
        const cw = document.documentElement.clientWidth;
        const utenfor = [...document.body.querySelectorAll("*")]
          .filter((el) => !el.closest(".visually-hidden, .skip, .tabell") && el.getBoundingClientRect().right > cw + 1)
          .map((el) => `${el.tagName.toLowerCase()}.${[...el.classList].join(".")}`);
        return { sw: document.documentElement.scrollWidth, cw, utenfor: [...new Set(utenfor)].slice(0, 5) };
      });
      const ok = sw <= cw && utenfor.length === 0 && konsoll.length === 0;
      meld(ok, `${navn}${sti} (${modus}, 360 px): bredde ${sw}/${cw}${utenfor.length ? `, stikker ut: ${utenfor.join(", ")}` : ""}${konsoll.length ? `, konsoll: ${konsoll.join(" | ")}` : ""}`);
      await ctx.close();
    }
  }
}

// 3. Plantegningen og raden henger sammen
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(servere.sngroup.base + "/", { waitUntil: "networkidle" });
  for (const id of ["hengsel", "byggem", "eiendom", "investeringer", "kjokken"]) {
    await page.click(`[data-sone="${id}"]`);
    const r = await page.evaluate((id) => ({
      info: !document.querySelector(`[data-info="${id}"]`).hidden,
      rad: document.querySelector(`#rad-${id}`).open,
      chip: document.querySelector(`[data-chip="${id}"]`).getAttribute("aria-pressed"),
    }), id);
    meld(r.info && r.rad && r.chip === "true", `plantegning: ${id} viser tekst, åpner rad og velger chip`);
  }
  await page.keyboard.press("Tab");
  await page.click('[data-chip="byggem"]');
  meld(await page.evaluate(() => document.querySelector('[data-sone="byggem"]').getAttribute("aria-pressed") === "true"), "chip velger rom");

  // 4. Skrifter som faktisk lastes
  await page.goto(servere.sngroup.base + "/", { waitUntil: "networkidle" });
  const skrifter = await page.evaluate(async () => {
    await document.fonts.ready;
    return [...document.fonts].filter((f) => f.status === "loaded").map((f) => `${f.family} ${f.style} ${f.weight}`);
  });
  console.log(`\nSkrifter lastet på forsiden: ${[...new Set(skrifter)].join("; ")}`);
  const filer = await page.evaluate(() => performance.getEntriesByType("resource").filter((r) => r.name.endsWith(".woff2")).map((r) => r.name.split("/").pop()));
  console.log(`Skriftfiler hentet: ${filer.join(", ")}`);
  const eksterne = await page.evaluate(() => performance.getEntriesByType("resource").filter((r) => !r.name.startsWith(location.origin)).map((r) => r.name));
  meld(eksterne.length === 0, `ingen eksterne forespørsler${eksterne.length ? `: ${eksterne.join(", ")}` : ""}`);
  meld((await ctx.cookies()).length === 0, "ingen informasjonskapsler");
  await ctx.close();
}

await browser.close();
for (const { s } of Object.values(servere)) s.close();
console.log(`\n${feil} feil.`);
process.exit(feil ? 1 : 0);

#!/usr/bin/env node
/**
 * Skjermbilder og nettlesersjekker for hengsel.no/apptest (K-107), mot Workeren med passordet (wrangler dev).
 *
 *  - apptest-passord-*: passordsiden, og passordsiden etter feil passord.
 *  - apptest-*-snart / apptest-*-klar: siden etter innlogging, iPhone-knappen med plassholder («lenke kommer snart»)
 *    eller med TestFlight-lenken satt. Tilstanden leses fra siden. Mobil (390) med iPhone-nettleser, PC (1440).
 *  - Sjekker: telefonen gjenkjennes (iPhone, Android, PC), uten skript er knappene like, ingen vannrett rulling ved
 *    360 px, ingen konsollfeil (CSP), og axe (WCAG 2 A/AA) uten brudd, i lys og mørk.
 *
 * Kjør etter `npm run build -w sites/hengsel`, med wrangler dev i gang og en lokal sites/hengsel/.dev.vars (sjekkes ikke inn):
 *   npx wrangler dev -c sites/hengsel/wrangler.jsonc
 *   node scripts/skjermbilder-apptest.mjs            # BASE=http://localhost:8787 som standard
 * axe-core leses fra AXE_PATH (axe.min.js) hvis satt; ellers hoppes axe over.
 */
import { chromium } from "playwright";
import { mkdir, readFile } from "node:fs/promises";
import { join, resolve } from "node:path";

const rot = resolve(import.meta.dirname, "..");
const ut = join(rot, "docs", "skjermbilder");
await mkdir(ut, { recursive: true });
const BASE = process.env.BASE ?? "http://localhost:8787";
const vars = await readFile(join(rot, "sites", "hengsel", ".dev.vars"), "utf8").catch(() => "");
const PASSORD = process.env.APPTEST_PASSORD ?? vars.match(/^APPTEST_PASSORD=(.*)$/m)?.[1]?.trim();
if (!PASSORD) {
  console.error("✗ fant ikke APPTEST_PASSORD (miljøvariabel eller sites/hengsel/.dev.vars)");
  process.exit(1);
}
const axe = process.env.AXE_PATH ? await readFile(process.env.AXE_PATH, "utf8") : null;

const UA = {
  iphone: "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1",
  android: "Mozilla/5.0 (Linux; Android 15; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Mobile Safari/537.36",
};
const visninger = [
  { navn: "mobil", viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, userAgent: UA.iphone },
  { navn: "desktop", viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 },
];

const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
let feil = 0;
const meld = (ok, tekst) => {
  if (!ok) feil++;
  console.log(`${ok ? "✓" : "✗"} ${tekst}`);
};

async function loggInn(page) {
  await page.goto(`${BASE}/apptest`, { waitUntil: "networkidle" });
  await page.fill("#passord", PASSORD);
  await Promise.all([page.waitForURL(`${BASE}/apptest`), page.click("button[type=submit]")]);
  await page.waitForLoadState("networkidle");
}

async function sjekkAxe(page, navn) {
  if (!axe) return;
  // Via evaluate (CDP), så CSP-en ikke stopper axe
  await page.evaluate(axe);
  const brudd = await page.evaluate(async () => {
    // eslint-disable-next-line no-undef
    const r = await window.axe.run(document, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"] } });
    return r.violations.map((v) => `${v.id} (${v.nodes.length})`);
  });
  meld(brudd.length === 0, `axe ${navn}${brudd.length ? `: ${brudd.join(", ")}` : ""}`);
}

let tilstand = "";
for (const v of visninger) {
  for (const modus of ["light", "dark"]) {
    const m = modus === "light" ? "lys" : "mork";
    const ctx = await browser.newContext({ ...v, colorScheme: modus, reducedMotion: "reduce" });
    const page = await ctx.newPage();
    const konsoll = [];
    page.on("console", (x) => x.type() === "error" && !/401/.test(x.text()) && konsoll.push(x.text()));
    page.on("pageerror", (e) => konsoll.push(e.message));

    // Passordsiden
    await page.goto(`${BASE}/apptest`, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: join(ut, `apptest-passord-${v.navn}-${m}.png`), fullPage: true });
    await sjekkAxe(page, `passordsiden (${v.navn}, ${m})`);
    // Feil passord
    await page.fill("#passord", "feil-passord");
    await Promise.all([page.waitForLoadState("networkidle"), page.click("button[type=submit]")]);
    meld(await page.isVisible("[data-feil]"), `feil passord viser feilmeldingen (${v.navn}, ${m})`);
    if (v.navn === "mobil") await page.screenshot({ path: join(ut, `apptest-passord-feil-${v.navn}-${m}.png`), fullPage: true });
    await sjekkAxe(page, `passordsiden med feil (${v.navn}, ${m})`);

    // Siden etter innlogging
    await loggInn(page);
    tilstand = (await page.$("[data-enhet=iphone][disabled]")) ? "snart" : "klar";
    await page.evaluate(() => document.fonts.ready);
    const fil = `apptest-${v.navn}-${m}-${tilstand}.png`;
    await page.screenshot({ path: join(ut, fil), fullPage: true });
    console.log(`  bilde: docs/skjermbilder/${fil}`);
    const valgt = await page.$$eval("[data-lastned] .dark", (e) => e.map((x) => x.dataset.enhet));
    const linje = await page.textContent("[data-enhetslinje]");
    if (v.navn === "mobil") {
      meld(valgt.join() === "iphone" && linje.startsWith("Du bruker iPhone"), `iPhone gjenkjent (${m}): «${linje}»`);
    } else {
      meld(valgt.length === 0 && linje.startsWith("Åpne denne siden på telefonen"), `PC: ingen knapp fremhevet (${m}): «${linje}»`);
    }
    await sjekkAxe(page, `/apptest (${v.navn}, ${m}, ${tilstand})`);
    meld(konsoll.length === 0, `ingen konsollfeil (${v.navn}, ${m})${konsoll.length ? `: ${konsoll.join(" | ")}` : ""}`);
    const kaker = await ctx.cookies();
    const k = kaker.find((c) => c.name === "hengsel_apptest");
    meld(kaker.length === 1 && k?.httpOnly && k.secure && k.sameSite === "Lax" && k.path === "/apptest", `bare én informasjonskapsel, HttpOnly, Secure, SameSite=Lax, Path=/apptest (${v.navn}, ${m})`);
    await ctx.close();
  }
}

// Android, uten skript, og 360 px
{
  const ctx = await browser.newContext({ viewport: { width: 360, height: 740 }, isMobile: true, hasTouch: true, userAgent: UA.android });
  const page = await ctx.newPage();
  await loggInn(page);
  const valgt = await page.$$eval("[data-lastned] .dark", (e) => e.map((x) => x.dataset.enhet));
  const linje = await page.textContent("[data-enhetslinje]");
  meld(valgt.join() === "android" && linje === "Du bruker Android – trykk den mørke knappen.", `Android gjenkjent: «${linje}»`);
  for (const modus of ["light", "dark"]) {
    await page.emulateMedia({ colorScheme: modus });
    for (const sti of ["/apptest"]) {
      const { sw, cw } = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }));
      meld(sw <= cw, `${sti} (${modus}, 360 px): bredde ${sw}/${cw}`);
    }
  }
  await ctx.close();

  const ctx2 = await browser.newContext({ viewport: { width: 360, height: 740 }, isMobile: true, hasTouch: true });
  const p2 = await ctx2.newPage();
  await p2.goto(`${BASE}/apptest`, { waitUntil: "networkidle" });
  const b = await p2.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }));
  meld(b.sw <= b.cw, `passordsiden (360 px): bredde ${b.sw}/${b.cw}`);
  await ctx2.close();

  const ctx3 = await browser.newContext({ viewport: { width: 390, height: 844 }, javaScriptEnabled: false, userAgent: UA.iphone });
  const p3 = await ctx3.newPage();
  await loggInn(p3);
  const klasser = await p3.$$eval("[data-lastned] [data-enhet]", (e) => e.map((x) => x.className));
  meld(klasser.length === 2 && klasser[0] === klasser[1].replace(/\s+$/, "") && !klasser.join().includes("dark"), "uten skript: begge knappene like");
  await ctx3.close();
}

await browser.close();
console.log(`\nTilstand for iPhone-knappen: ${tilstand === "snart" ? "lenke kommer snart (plassholder)" : "TestFlight-lenke satt"}`);
console.log(`${feil} feil.`);
process.exit(feil ? 1 : 0);

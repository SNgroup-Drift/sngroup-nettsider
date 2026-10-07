/**
 * Samspillet på forsiden av hengsel.no (fanene, kundereisen, sjekklista, spørsmål, kopier-knappen og demoskjemaet).
 * Fasit: docs/design/hengsel/Forside.dc.html. Eneste lagring: valgt område under «Se løsningen» i localStorage («crm-tour»).
 */
import { lysboks, settEnhet } from "./enhet";
import type { Type } from "./bilder";

const $ = <T extends Element = HTMLElement>(s: string, rot: ParentNode = document) => rot.querySelector<T>(s);
const $$ = <T extends Element = HTMLElement>(s: string, rot: ParentNode = document) => [...rot.querySelectorAll<T>(s)];
const reduser = matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Marker én fane som valgt i en fanegruppe */
function velg(knapper: HTMLElement[], valgt: HTMLElement) {
  for (const k of knapper) k.setAttribute("aria-selected", String(k === valgt));
}

/** Piltaster flytter mellom fanene i en tablist */
function piltaster(liste: HTMLElement) {
  liste.addEventListener("keydown", (e) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const knapper = $$<HTMLButtonElement>(":scope > button", liste);
    const i = knapper.indexOf(document.activeElement as HTMLButtonElement);
    if (i < 0) return;
    const neste = knapper[(i + (e.key === "ArrowRight" ? 1 : -1) + knapper.length) % knapper.length];
    neste.focus();
    neste.click();
  });
}
$$('[role="tablist"]').forEach(piltaster);

lysboks();

/* Hero: PC, iPad, telefon og montør. Bytter av seg selv hvert 4,2 s til brukeren velger selv. */
{
  const faner = $$<HTMLButtonElement>("[data-hero-faner] button");
  const enhet = $("#hero-enhet")!;
  let i = 0;
  const vis = (k: HTMLButtonElement) => {
    velg(faner, k);
    settEnhet(enhet, k.dataset.bilde!, k.dataset.alt!, k.dataset.type as Type);
  };
  let timer = reduser ? 0 : window.setInterval(() => vis(faner[(i = (i + 1) % faner.length)]), 4200);
  const stopp = () => { clearInterval(timer); timer = 0; };
  faner.forEach((k, n) => k.addEventListener("click", () => { stopp(); i = n; vis(k); }));
  // Ikke bytt mens brukeren ser på eller har fokus i bildet
  enhet.addEventListener("pointerenter", stopp);
  enhet.addEventListener("focusin", stopp);
}

/* Hvorfor: «Uten et felles system» / «Med Hengsel» */
{
  const faner = $$<HTMLButtonElement>("[data-hvorfor] button");
  faner.forEach((k) => k.addEventListener("click", () => {
    velg(faner, k);
    for (const p of $$("[data-hvorfor-panel]")) p.hidden = p.dataset.hvorforPanel !== k.dataset.id;
  }));
}

/* Se løsningen: område (huskes i localStorage «crm-tour») og skjerm */
{
  const omrader = $$<HTMLButtonElement>("[data-omrader] button");
  const enhet = $("#tur-enhet")!;
  const visSkjerm = (k: HTMLButtonElement) => {
    const liste = k.parentElement!;
    velg($$<HTMLButtonElement>("button", liste), k);
    settEnhet(enhet, k.dataset.bilde!, k.dataset.alt!);
    for (const p of $$("[data-punkt]")) p.hidden = p.dataset.punkt !== k.dataset.punkter;
  };
  const visOmrade = (navn: string, lagre: boolean) => {
    const knapp = omrader.find((k) => k.dataset.omrade === navn);
    if (!knapp) return;
    velg(omrader, knapp);
    for (const l of $$("[data-tur-liste]")) l.hidden = l.dataset.turListe !== navn;
    visSkjerm($$<HTMLButtonElement>(`[data-tur-liste="${CSS.escape(navn)}"] button`)[0]);
    if (lagre) try { localStorage.setItem("crm-tour", navn); } catch {}
  };
  omrader.forEach((k) => k.addEventListener("click", () => visOmrade(k.dataset.omrade!, true)));
  $$<HTMLButtonElement>("[data-tur-liste] button").forEach((k) => k.addEventListener("click", () => visSkjerm(k)));
  try {
    const lagret = localStorage.getItem("crm-tour");
    if (lagret && lagret !== "Salg") visOmrade(lagret, false);
  } catch {}
}

/* Montørappen: sju skjermer */
{
  const faner = $$<HTMLButtonElement>("[data-ph] button");
  const tekst = $("[data-ph-tekst]")!;
  const enhet = $("#ph-enhet")!;
  faner.forEach((k) => k.addEventListener("click", () => {
    velg(faner, k);
    tekst.textContent = k.dataset.tekst!;
    settEnhet(enhet, k.dataset.bilde!, "Hengsel: skjermbilde");
  }));
}

/* Roller */
{
  const faner = $$<HTMLButtonElement>("[data-roller] button");
  faner.forEach((k) => k.addEventListener("click", () => {
    velg(faner, k);
    for (const p of $$("[data-rolle]")) p.hidden = p.dataset.rolle !== k.dataset.i;
  }));
}

/* Kundereisen: 11 steg */
{
  const data: { tittel: string; skjerm: string; tekst: string; eier: string; bilde: string }[] =
    JSON.parse($("#reise-data")?.textContent ?? "[]");
  const steg = $$<HTMLButtonElement>("[data-steg-rad] button");
  const fyll = $("[data-steg-fyll]")!;
  const enhet = $("#steg-enhet")!;
  let n = 0;
  const vis = (i: number) => {
    n = (i + data.length) % data.length;
    const s = data[n];
    steg.forEach((k, j) => {
      k.setAttribute("aria-selected", String(j === n));
      k.classList.toggle("valgt", j === n);
      k.classList.toggle("ferdig", j < n);
    });
    fyll.style.width = `calc(${n} * 100% / ${data.length})`;
    $("[data-steg-nr]")!.textContent = `Steg ${n + 1} av ${data.length} · ${s.skjerm}`;
    $("[data-steg-tittel]")!.textContent = s.tittel;
    $("[data-steg-tekst]")!.textContent = s.tekst;
    $("[data-steg-eier]")!.textContent = s.eier;
    settEnhet(enhet, s.bilde, `${s.skjerm}: skjermbilde`);
  };
  steg.forEach((k, i) => k.addEventListener("click", () => vis(i)));
  $("[data-steg-forrige]")!.addEventListener("click", () => vis(n - 1));
  $("[data-steg-neste]")!.addEventListener("click", () => vis(n + 1));
}

/* Kom i gang: sjekklista (lagres ikke) */
{
  const bokser = $$<HTMLButtonElement>("[data-sjekkliste] button");
  const tekst = $("[data-sjekk-tekst]")!;
  const stolpe = $("[data-sjekk-stolpe]")!;
  const oppdater = () => {
    const n = bokser.filter((b) => b.getAttribute("aria-checked") === "true").length;
    tekst.textContent = `${n} av ${bokser.length}`;
    stolpe.style.width = `${(n / bokser.length) * 100}%`;
  };
  bokser.forEach((b) => b.addEventListener("click", () => {
    b.setAttribute("aria-checked", String(b.getAttribute("aria-checked") !== "true"));
    oppdater();
  }));
}

/* Spørsmål: + / – */
for (const k of $$<HTMLButtonElement>("[data-faq]")) {
  k.addEventListener("click", () => {
    const apen = k.getAttribute("aria-expanded") !== "true";
    k.setAttribute("aria-expanded", String(apen));
    $(".tegn", k)!.textContent = apen ? "–" : "+";
    document.getElementById(k.getAttribute("aria-controls")!)!.hidden = !apen;
  });
}

/* Kopier e-postadressen */
for (const k of $$<HTMLButtonElement>("[data-kopier]")) {
  const status = $("[data-kopier-status]", k.parentElement!);
  k.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(k.dataset.kopier!);
      k.textContent = "Kopiert";
      if (status) status.textContent = "E-postadressen er kopiert";
      setTimeout(() => { k.textContent = "Kopier"; if (status) status.textContent = ""; }, 1800);
    } catch {
      k.textContent = "Marker og kopier";
    }
  });
}

/* Demoskjemaet: lagrer ingenting, åpner en ferdig utfylt e-post */
{
  const skjema = $<HTMLFormElement>("[data-demo-skjema]");
  const notis = $("[data-skjema-notis]");
  skjema?.addEventListener("submit", (e) => {
    e.preventDefault();
    const f = new FormData(skjema);
    const v = (k: string) => String(f.get(k) ?? "").trim();
    if (!v("navn") || !v("firma")) { notis!.textContent = "Fyll inn navn, firma og e-post."; return; }
    if (!/^\S+@\S+\.\S+$/.test(v("epost"))) { notis!.textContent = "Skriv inn en gyldig e-postadresse."; return; }
    const ints = f.getAll("int").join(", ") || "Ikke valgt";
    const tekst = `Navn: ${v("navn")}\nFirma: ${v("firma")}\nE-post: ${v("epost")}\nTelefon: ${v("tlf")}\nAntall selgere: ${v("ant")}\nInteressert i: ${ints}\n\n${v("meld")}`;
    location.href = `mailto:drift@sngroup.no?subject=${encodeURIComponent(`Demo av Hengsel – ${v("firma")}`)}&body=${encodeURIComponent(tekst)}`;
    notis!.textContent = "Skjemaet åpner en ferdig utfylt e-post i e-postprogrammet ditt.";
    $("[data-skjema-klar]")!.hidden = false;
  });
}

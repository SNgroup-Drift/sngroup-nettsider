/**
 * /apptest: gjenkjenner telefonen og gjør knappen for den mørk (+ egen linje under knappene), og kopierer
 * brukernavn og demopassord til utklippstavlen («Kopiert» i 1,8 s). Fasit: docs/design/hengsel/52 Apptest.dc.html.
 * Uten skript vises begge knappene likt, med linjen for PC.
 */
const ua = navigator.userAgent;
const ios = /iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
const enhet = ios ? "iphone" : /Android/.test(ua) ? "android" : "pc";

const linje = document.querySelector<HTMLElement>("[data-enhetslinje]");
if (linje && enhet !== "pc") {
  const iosKlar = linje.dataset.iosKlar === "ja";
  linje.textContent =
    enhet === "android"
      ? "Du bruker Android – trykk den mørke knappen."
      : iosKlar
        ? "Du bruker iPhone – trykk den mørke knappen."
        : "Du bruker iPhone. Lenken til TestFlight kommer snart.";
  document.querySelector(`[data-lastned] [data-enhet="${enhet}"]`)?.classList.add("dark");
}

const VARIGHET = 1800;

function kopier(tekst: string, etter: () => void) {
  try {
    navigator.clipboard.writeText(tekst).then(etter, etter);
  } catch {
    etter();
  }
}

/* Demopassordet: knappen viser «Kopiert» i 1,8 s */
const pwKnapp = document.querySelector<HTMLButtonElement>("[data-kopier-passord]");
let pwTimer = 0;
pwKnapp?.addEventListener("click", () => {
  const verdi = document.querySelector("[data-demopassord-verdi]")?.textContent?.trim() ?? "";
  if (!verdi) return;
  kopier(verdi, () => {
    pwKnapp.textContent = "Kopiert";
    clearTimeout(pwTimer);
    pwTimer = window.setTimeout(() => { pwKnapp.textContent = "Kopier"; }, VARIGHET);
  });
});

/* Brukernavnene: «Kopiert» ved siden av navnet, bare på det siste som ble trykket */
const brukere = [...document.querySelectorAll<HTMLButtonElement>("[data-kopier]")];
let brukerTimer = 0;
const nullstill = () => brukere.forEach((b) => { b.querySelector(".kvittering")!.textContent = ""; });
for (const knapp of brukere) {
  knapp.addEventListener("click", () => kopier(knapp.dataset.kopier!, () => {
    nullstill();
    knapp.querySelector(".kvittering")!.textContent = "Kopiert";
    clearTimeout(brukerTimer);
    brukerTimer = window.setTimeout(nullstill, VARIGHET);
  }));
}

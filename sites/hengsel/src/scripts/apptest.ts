/**
 * /apptest: gjenkjenner telefonen og fremhever knappen for den (mørk knapp + egen linje under knappene).
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
  document.querySelector(`[data-lastned] [data-enhet="${enhet}"]`)?.classList.add("valgt");
}

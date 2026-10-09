/**
 * /apptest: gjenkjenner telefonen og fremhever delen for den (iOS, eller de to Android-delene): merket «Din telefon»
 * vises, knappen blir mørk, og linjen under ingressen sier hvilken del du skal følge. Uten skript vises delene likt.
 */
const ua = navigator.userAgent;
const ios = /iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
const enhet = ios ? "iphone" : /Android/.test(ua) ? "android" : "pc";

if (enhet !== "pc") {
  const deler = document.querySelectorAll<HTMLElement>(`.del[data-enhet="${enhet}"]`);
  for (const del of deler) {
    del.classList.add("valgt");
    del.querySelector<HTMLElement>("[data-din]")?.removeAttribute("hidden");
  }
  const linje = document.querySelector<HTMLElement>("[data-enhetslinje]");
  if (linje && deler.length) {
    linje.textContent = enhet === "iphone"
      ? "Du bruker iPhone eller iPad: følg del 1."
      : "Du bruker Android: følg del 2 (Google Play) eller del 3 (APK).";
  }
}

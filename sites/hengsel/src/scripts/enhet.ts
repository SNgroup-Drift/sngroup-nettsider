/**
 * Bytter skjermbildet i en Enhet-ramme (PC, iPad, telefon eller to telefoner) uten å laste siden på nytt.
 * Markupen lages av components/Enhet.astro; her endres bare klasser, src, alt og mål.
 */
import { MAAL, filer, src, typeFor, type Type } from "./bilder";

export function settEnhet(el: HTMLElement, bilde: string, alt: string, type?: Type) {
  const t = type ?? typeFor(bilde);
  const ramme = el.querySelector<HTMLElement>("[data-ramme]")!;
  ramme.className = `ramme ${t}`;
  const navn = filer(bilde, t);
  el.querySelectorAll<HTMLElement>("[data-skjerm]").forEach((skjerm, i) => {
    const fil = navn[i];
    skjerm.hidden = !fil;
    if (!fil) return;
    const img = skjerm.querySelector("img")!;
    const knapp = skjerm.querySelector<HTMLButtonElement>("button")!;
    const [w, h] = MAAL[fil] ?? [0, 0];
    img.width = w;
    img.height = h;
    img.src = src(fil);
    img.alt = alt;
    knapp.setAttribute("aria-label", `Forstørr skjermbildet: ${alt}`);
  });
}

/** Lysboksen: klikk på et skjermbilde åpner det i full størrelse. Escape eller klikk lukker. */
export function lysboks() {
  const dialog = document.querySelector<HTMLDialogElement>("[data-lysboks]");
  if (!dialog) return;
  const img = dialog.querySelector("img")!;
  document.addEventListener("click", (e) => {
    const knapp = (e.target as HTMLElement).closest<HTMLButtonElement>("[data-zoom]");
    if (!knapp) return;
    const bilde = knapp.querySelector("img")!;
    img.src = bilde.currentSrc || bilde.src;
    img.alt = bilde.alt;
    dialog.showModal();
  });
  dialog.addEventListener("click", () => dialog.close());
}

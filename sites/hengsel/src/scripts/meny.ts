/**
 * Mobilmenyen i sidehodet (under 980 px): hamburgeren åpner og lukker menyen under toppfeltet.
 * Uten skript vises menyen åpen. Fasit: toggleMenu i docs/design/hengsel/54 Hengsel forside.dc.html.
 */
const knapp = document.querySelector<HTMLButtonElement>("[data-meny-knapp]");
const meny = document.querySelector<HTMLElement>("[data-meny]");
const tegn = document.querySelector<HTMLElement>("[data-meny-tegn]");
if (knapp && meny && tegn) {
  const sett = (apen: boolean) => {
    meny.hidden = !apen;
    knapp.setAttribute("aria-expanded", String(apen));
    tegn.textContent = apen ? "×" : "≡";
  };
  sett(false);
  knapp.addEventListener("click", () => sett(meny.hidden));
  for (const a of meny.querySelectorAll("[data-meny-lenke]")) a.addEventListener("click", () => sett(false));
}

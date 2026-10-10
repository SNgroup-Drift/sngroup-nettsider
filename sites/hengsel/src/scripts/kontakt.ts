/**
 * Demoskjemaet på forsiden: lagrer ingenting, åpner en ferdig utfylt e-post til hei@hengsel.no.
 * Fasit: submit i docs/design/hengsel/54 Hengsel forside.dc.html.
 */
const ADR = "hei@hengsel.no";
const skjema = document.querySelector<HTMLFormElement>("[data-demo-skjema]");
const notis = document.querySelector<HTMLElement>("[data-skjema-notis]");
skjema?.addEventListener("submit", (e) => {
  e.preventDefault();
  const f = new FormData(skjema);
  const v = (k: string) => String(f.get(k) ?? "");
  if (!v("navn").trim() || !v("firma").trim()) { notis!.textContent = "Fyll inn navn, butikk og e-post."; return; }
  if (!/^\S+@\S+\.\S+$/.test(v("epost"))) { notis!.textContent = "Skriv inn en gyldig e-postadresse."; return; }
  const tekst = `Navn: ${v("navn")}\nButikk: ${v("firma")}\nE-post: ${v("epost")}\nTelefon: ${v("tlf")}`;
  location.href = `mailto:${ADR}?subject=${encodeURIComponent(`Demo av Hengsel – ${v("firma")}`)}&body=${encodeURIComponent(tekst)}`;
  notis!.textContent = `E-posten er klar. Åpnet den seg ikke, send en linje til ${ADR}.`;
});

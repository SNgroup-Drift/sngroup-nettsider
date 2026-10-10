/**
 * Demoskjemaet på forsiden: lagrer ingenting, åpner en ferdig utfylt e-post til hei@hengsel.no med emnet
 * «Demo av Hengsel – {butikk}». Fasit: submit i docs/design/hengsel/56 Hengsel forside.dc.html.
 */
const skjema = document.querySelector<HTMLFormElement>("[data-demo-skjema]");
const notis = document.querySelector<HTMLElement>("[data-skjema-notis]");
if (skjema && notis) {
  const adr = skjema.dataset.epost || "hei@hengsel.no";
  skjema.addEventListener("submit", (e) => {
    e.preventDefault();
    const f = new FormData(skjema);
    const v = (k: string) => String(f.get(k) ?? "");
    if (!v("navn").trim() || !v("firma").trim()) { notis.textContent = "Fyll inn navn, butikk og e-post."; return; }
    if (!/^\S+@\S+\.\S+$/.test(v("epost"))) { notis.textContent = "Skriv inn en gyldig e-postadresse."; return; }
    const tekst = `Navn: ${v("navn")}\nButikk: ${v("firma")}\nE-post: ${v("epost")}\nTelefon: ${v("tlf")}`;
    location.href = `mailto:${adr}?subject=${encodeURIComponent(`Demo av Hengsel – ${v("firma")}`)}&body=${encodeURIComponent(tekst)}`;
    notis.textContent = `E-posten er klar. Hvis e-postprogrammet ikke åpnet seg, send en linje til ${adr}.`;
  });
}

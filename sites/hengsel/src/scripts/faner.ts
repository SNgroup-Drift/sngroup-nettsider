/**
 * Pillefanene på forsiden («Sju steg» og «For kontoret»): ren JS uten rammeverk.
 * En gruppe er [data-faner] med knapper role="tab" (aria-controls → panelet) og panelene [data-panel].
 * Uten skript står steg 1 åpent (de andre panelene har hidden fra bygget). Forrige/Neste ([data-forrige], [data-neste])
 * går rundt. Piltaster, Home og End flytter mellom fanene, som i WAI-ARIA-mønsteret for faner.
 * Fasit: steg og kontor i docs/design/hengsel/56 Hengsel forside.dc.html.
 */
for (const gruppe of document.querySelectorAll<HTMLElement>("[data-faner]")) {
  const faner = [...gruppe.querySelectorAll<HTMLButtonElement>('[role="tab"]')];
  const paneler = faner.map((f) => document.getElementById(f.getAttribute("aria-controls") ?? "")!);
  const n = faner.length;
  let aktiv = Math.max(0, faner.findIndex((f) => f.getAttribute("aria-selected") === "true"));

  const velg = (i: number, fokus = false) => {
    aktiv = (i + n) % n;
    faner.forEach((f, k) => {
      const valgt = k === aktiv;
      f.setAttribute("aria-selected", String(valgt));
      f.tabIndex = valgt ? 0 : -1;
      paneler[k].hidden = !valgt;
    });
    if (fokus) faner[aktiv].focus();
  };

  faner.forEach((f, i) => {
    f.addEventListener("click", () => velg(i));
    f.addEventListener("keydown", (e) => {
      const hopp: Record<string, number> = { ArrowRight: aktiv + 1, ArrowLeft: aktiv - 1, Home: 0, End: n - 1 };
      if (e.key in hopp) { e.preventDefault(); velg(hopp[e.key], true); }
    });
  });
  for (const b of gruppe.querySelectorAll("[data-forrige]")) b.addEventListener("click", () => velg(aktiv - 1));
  for (const b of gruppe.querySelectorAll("[data-neste]")) b.addEventListener("click", () => velg(aktiv + 1));
  velg(aktiv);
}

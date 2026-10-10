/**
 * Plantegningen på forsiden: viser pekerens posisjon i mm (1:50, avrundet til 10 mm) øverst til høyre.
 * Fasit: move i docs/design/hengsel/Plantegning Entre.dc.html.
 */
const fmt = (n: number) => n.toLocaleString("nb-NO");
const k = (v: number, maks: number) => Math.min(maks, Math.max(0, Math.round(v / 10) * 10));

for (const fig of document.querySelectorAll<HTMLElement>("[data-plantegning]")) {
  const svg = fig.querySelector("svg")!;
  const ut = fig.querySelector("[data-koord]")!;
  svg.addEventListener("pointermove", (e) => {
    const ctm = svg.getScreenCTM();
    if (!ctm) return;
    const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(ctm.inverse());
    ut.textContent = `x ${fmt(k((p.x - 40) * 10, 2800))} · y ${fmt(k((p.y - 30) * 10, 2400))} mm`;
  });
}

#!/usr/bin/env python3
"""
Lager packages/design/src/hengsel-logo-data.mjs fra logopakken i docs/design/hengsel/logo/.

Logofilene i pakken har «engsel» og produktnavnet som <text> i TWK Lausanne. I nettleseren må teksten være
konturer (pakken sier det samme: «gjør om til konturer før bruk der fonten ikke er installert»). Dette skriptet
former teksten med HarfBuzz (kerning som i nettleseren) og tegner glyfene fra skriftfilene hengsel.no alt har
(sites/hengsel/public/fonts/TWKLausanne-350.woff2 og -650.woff2), med samme plassering som i pakken:
«engsel» 96 px fra x=80 på grunnlinje y=69 med −1,5 i sperring; «CRM»/«UTE» 20 px, 650, 2,4 i sperring, høyrestilt
mot x=378 på grunnlinje y=112; haken M385 94 l9 9 l18 -20. Merket (74×72) kopieres fra hengsel-merke-lys.svg med
skapfargen som CSS-variabel, så mørk modus får Krem.

Kjøres sjelden (bare når logopakken endres). Trenger Python 3 med fonttools, brotli og uharfbuzz:
  python3 -m venv /tmp/venv && /tmp/venv/bin/pip install fonttools brotli uharfbuzz
  /tmp/venv/bin/python scripts/hengsel-logo-konturer.py
"""
import io
import json
import re
from pathlib import Path

import uharfbuzz as hb
from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont

ROT = Path(__file__).resolve().parent.parent
PAKKE = ROT / "docs/design/hengsel/logo"
FONTER = ROT / "sites/hengsel/public/fonts"
UT = ROT / "packages/design/src/hengsel-logo-data.mjs"

# Fra logofilene i pakken (hengsel-crm-logo-lys.svg og hengsel-ute-logo-lys.svg)
ORD = dict(tekst="engsel", fil="TWKLausanne-350.woff2", px=96, x=80, y=69, sperring=-1.5)
PRODUKT = dict(fil="TWKLausanne-650.woff2", px=20, hoyre=378, y=112, sperring=2.4)
HAKE = "M385 94 l9 9 l18 -20"
PAD = 4  # pakkens viewBox starter i (-4,-4)


def rund(v):
    return f"{v:.2f}".rstrip("0").rstrip(".")


def konturer(fil, tekst, px, y, sperring, x=None, hoyre=None):
    """SVG-sti (d) for teksten, pluss bredde og høyde-ekstremer. x = venstre start, hoyre = høyrekant (text-anchor end)."""
    tt = TTFont(FONTER / fil)
    upem = tt["head"].unitsPerEm
    # HarfBuzz leser ikke woff2: pakk ut til vanlig TTF i minnet
    tt.flavor = None
    ttf = io.BytesIO()
    tt.save(ttf)
    data = ttf.getvalue()
    s = px / upem
    glyfsett = tt.getGlyphSet()
    navn = tt.getGlyphOrder()

    face = hb.Face(data)
    font = hb.Font(face)
    font.scale = (upem, upem)
    buf = hb.Buffer()
    buf.add_str(tekst)
    buf.guess_segment_properties()
    hb.shape(font, buf, {"kern": True, "liga": True})

    # Nettleseren legger sperringen etter hvert tegn, også det siste, og text-anchor="end" regner med hele bredden
    bredde = sum(p.x_advance * s for p in buf.glyph_positions) + sperring * len(buf.glyph_infos)
    start = x if x is not None else hoyre - bredde

    pen = SVGPathPen(glyfsett, ntos=rund)
    cx = start
    ymin, ymax, xmax = 1e9, -1e9, -1e9
    for info, pos in zip(buf.glyph_infos, buf.glyph_positions):
        g = navn[info.codepoint]
        tx = cx + pos.x_offset * s
        ty = y - pos.y_offset * s
        glyfsett[g].draw(TransformPen(pen, (s, 0, 0, -s, tx, ty)))
        bp = BoundsPen(glyfsett)
        glyfsett[g].draw(bp)
        if bp.bounds:
            gx0, gy0, gx1, gy1 = bp.bounds
            ymin = min(ymin, ty - gy1 * s)
            ymax = max(ymax, ty - gy0 * s)
            xmax = max(xmax, tx + gx1 * s)
        cx += pos.x_advance * s + sperring
    return dict(d=pen.getCommands(), start=start, slutt=cx, xmax=xmax, ymin=ymin, ymax=ymax)


def merke():
    """<g>…</g> fra hengsel-merke-lys.svg uten metadata, med skapfargen som variabel."""
    svg = (PAKKE / "hengsel-merke-lys.svg").read_text()
    svg = re.sub(r"<metadata>.*?</metadata>", "", svg, flags=re.S)
    g = re.search(r"<g>.*</g>", svg, flags=re.S).group(0)
    g = g.replace('fill="#C3B5A7"', 'fill="var(--merke-skap,#C3B5A7)"')
    g = g.replace("></rect>", "/>").replace("></circle>", "/>").replace("></ellipse>", "/>")
    assert "#C3B5A7" in g and "#8FA9D1" in g and "#5074A9" in g
    return g


ord_ = konturer(ORD["fil"], ORD["tekst"], ORD["px"], ORD["y"], ORD["sperring"], x=ORD["x"])
produkter = {
    navn: konturer(PRODUKT["fil"], navn, PRODUKT["px"], PRODUKT["y"], PRODUKT["sperring"], hoyre=PRODUKT["hoyre"])
    for navn in ("CRM", "UTE")
}

# Haken: M385 94 l9 9 l18 -20 med strek 4.6 → ytterst x 412 + 2.3, øverst y 83 − 2.3
hake_xmax, hake_ymin = 412 + 2.3, 83 - 2.3
# Høydene er runde tall i em av «engsel»: uten produktnavn 96 (1 em), med 120 (1,25 em), så CSS kan sette height i em
boks_ord = dict(x=-PAD, y=-PAD, b=rund(max(ord_["xmax"], 74) + 2 * PAD), h=ORD["px"])
boks_produkt = dict(x=-PAD, y=-PAD, b=rund(max(hake_xmax, max(p["xmax"] for p in produkter.values())) + 2 * PAD), h=120)
assert ord_["ymax"] + 2 * PAD <= boks_ord["h"] and PRODUKT["y"] + 2 * PAD <= boks_produkt["h"]

ut = f"""// Lages av scripts/hengsel-logo-konturer.py fra docs/design/hengsel/logo/ (logopakken 09.10.2026). Ikke rediger for hånd.
// Koordinatene er pakkens: merket 74×72 i origo, «engsel» 96 px på grunnlinje y=69, produktnavnet 20 px på y=112.

/** Merket (skapet er var(--merke-skap), Krem i mørk modus; vater #8FA9D1 og Deep Blue #5074A9 er faste) */
export const MERKE = {json.dumps(merke())};

/** «engsel» i TWK Lausanne 350 som kontur */
export const ORD = {json.dumps(ord_["d"])};

/** Produktnavnet i TWK Lausanne 650 som kontur, høyrestilt mot x=378 */
export const PRODUKT = {json.dumps({k: v["d"] for k, v in produkter.items()})};

/** Haken over produktnavnet */
export const HAKE = {json.dumps(HAKE)};

/** viewBox uten og med produktnavn: [x, y, bredde, høyde] */
export const BOKS = {{
  ord: [{boks_ord["x"]}, {boks_ord["y"]}, {boks_ord["b"]}, {boks_ord["h"]}],
  produkt: [{boks_produkt["x"]}, {boks_produkt["y"]}, {boks_produkt["b"]}, {boks_produkt["h"]}],
}};

/** Skriftstørrelsen på «engsel» i pakken; size i hengselLogo() er samme mål i px */
export const ORD_PX = {ORD["px"]};
"""
UT.write_text(ut)
print(f"skrev {UT.relative_to(ROT)}")
print("engsel:", {k: rund(v) for k, v in ord_.items() if k != "d"})
for n, p in produkter.items():
    print(n + ":", {k: rund(v) for k, v in p.items() if k != "d"})
print("boks ord:", boks_ord, "boks produkt:", boks_produkt)

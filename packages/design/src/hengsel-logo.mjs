/**
 * Hengsel-logoen som inline SVG. Fasit: docs/design/hengsel/logo/ (logopakken 09.10.2026, LES-MEG.md).
 * Teksten («engsel» i TWK Lausanne 350, produktnavnet i 650) ligger som konturer i hengsel-logo-data.mjs, laget av
 * scripts/hengsel-logo-konturer.py fra skriftfilene på hengsel.no. Da ser logoen lik ut på alle nettstedene, også der
 * Lausanne ikke er installert (pakken: «gjør om til konturer før bruk der fonten ikke er installert»).
 *
 * Brukes av packages/design/src/components/HengselLogo.astro (sngroup.no, hengsel.no) og sites/vis/bygg.mjs.
 *
 * Farger (pakken): vater #8FA9D1 og Deep Blue #5074A9 er faste. Skapet, ordet og produktnavnet følger lys/mørk modus
 * gjennom CSS-variablene --merke-skap (Beige 1 / Krem), --merke-ord (Warm Black / Off White) og --merke-produkt
 * (samme, 60 %). Variablene står i packages/design/src/styles/tokens.css og sites/vis/src/assets/vis.css.
 *
 * Størrelse: `size` er skriftstørrelsen på «engsel» i px (pakken: 96 → merket 72 høyt) og gir width/height på
 * <svg>. Uten `size` settes høyden i CSS: 1 em uten produktnavn, 1,25 em med (viewBox-høydene er 96 og 120).
 * Pakken: merket minst 16 px høyt, altså size ≥ 22. Aldri strekk, roter, legg på skygge eller bytt farger.
 */
import { BOKS, HAKE, MERKE, ORD, ORD_PX, PRODUKT } from "./hengsel-logo-data.mjs";

const rund = (v) => Math.round(v * 100) / 100;

/**
 * @param {object} [o]
 * @param {number} [o.size] Skriftstørrelsen på «engsel» i px. Uten: ingen width/height, høyden settes i CSS.
 * @param {"CRM"|"UTE"|null} [o.produkt] Produktnavnet under ordet, med hake over. null = bare «Hengsel».
 * @param {string} [o.klasse] Klasse på <svg> (standard «hengsel-logo»; får også «hengsel-logo-crm»/«-ute»/«-ord»).
 * @param {string} [o.label] Tilgjengelig navn (standard «Hengsel CRM», «Hengsel UTE» eller «Hengsel»).
 * @param {string} [o.attr] Ekstra attributter på <svg>, f.eks. `style="font-size:20px"` der CSP tillater det.
 * @returns {string} <svg …>…</svg>
 */
export function hengselLogo({ size, produkt = "CRM", klasse = "hengsel-logo", label, attr = "" } = {}) {
  if (produkt && !PRODUKT[produkt]) throw new Error(`hengselLogo: ukjent produkt «${produkt}» (CRM, UTE eller null)`);
  const [x, y, b, h] = produkt ? BOKS.produkt : BOKS.ord;
  const navn = label ?? (produkt ? `Hengsel ${produkt}` : "Hengsel");
  const klasser = `${klasse} ${klasse}-${produkt ? produkt.toLowerCase() : "ord"}`;
  const mal = size ? ` width="${rund((b * size) / ORD_PX)}" height="${rund((h * size) / ORD_PX)}"` : "";
  const tekst = produkt
    ? `<path d="${PRODUKT[produkt]}" fill="var(--merke-produkt,rgb(49 38 29 / 0.6))"/>` +
      `<path d="${HAKE}" fill="none" stroke="#5074A9" stroke-width="4.6" stroke-linecap="round" stroke-linejoin="round"/>`
    : "";
  return (
    `<svg class="${klasser}" viewBox="${x} ${y} ${b} ${h}"${mal} role="img" aria-label="${navn}"${attr ? " " + attr : ""}>` +
    `${MERKE}<path d="${ORD}" fill="var(--merke-ord,#31261D)"/>${tekst}</svg>`
  );
}

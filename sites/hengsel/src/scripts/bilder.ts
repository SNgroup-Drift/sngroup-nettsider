/**
 * Skjermbildene i public/img (35 stk.) og hvilken ramme hvert bilde vises i.
 * Delt mellom byggingen (Enhet.astro) og skriptet i nettleseren (enhet.ts).
 * Reglene er de samme som i docs/design/hengsel/Enhet.dc.html.
 */
export type Type = "pc" | "ipad" | "phone" | "pair";

/** Bilder som vises som to telefoner side om side (-a og -b) */
export const PAR = new Set(["telefon", "kjoper-godkjenner", "hengsel-i-dag", "hengsel-jobb", "hengsel-varer", "hengsel-ks", "hengsel-ferdig"]);
export const ENKEL_TELEFON = new Set(["hengsel-avvik"]);
export const IPAD = new Set(["ipad-min-dag", "ipad-ordre", "hengsel-ipad"]);

/** Bredde og høyde i piksler, så nettleseren kan sette av plass før bildet er lastet */
export const MAAL: Record<string, [number, number]> = {
  "bestilling": [1712, 1184],
   "hengsel-avvik": [647, 1336],
   "hengsel-ferdig-a": [647, 1336],
   "hengsel-ferdig-b": [647, 1336],
   "hengsel-i-dag-a": [647, 1344],
   "hengsel-i-dag-b": [647, 1344],
   "hengsel-ipad": [1712, 1184],
   "hengsel-jobb-a": [647, 1336],
   "hengsel-jobb-b": [647, 1336],
   "hengsel-ks-a": [647, 1344],
   "hengsel-ks-b": [647, 1344],
   "hengsel-varer-a": [647, 1336],
   "hengsel-varer-b": [647, 1336],
   "ipad-min-dag": [1712, 1184],
   "ipad-ordre": [1712, 1184],
   "kjoper-godkjenner-a": [647, 1344],
   "kjoper-godkjenner-b": [647, 1344],
   "kundekortet": [1712, 1184],
   "kundeportalen": [1712, 1064],
   "leder": [1712, 1136],
   "min-dag": [1712, 1136],
   "moduler": [1712, 1136],
   "montasje": [1712, 1136],
   "monteringskalkyle": [1712, 1136],
   "ordre-og-montasje": [1712, 1136],
   "produkter-hos-kunden": [1712, 1184],
   "prosjektoppsett": [1712, 1184],
   "resultater": [1712, 1184],
   "saker": [1712, 1184],
   "salgstavla": [1712, 1064],
   "samtaler": [1712, 1064],
   "telefon-a": [647, 1344],
   "telefon-b": [647, 1344],
   "tilbudet": [1712, 1136],
   "tilvalg-mot-standard": [1712, 1184]
};

/** Ramme i designstørrelse: bredde og høyde i px (fra Enhet.dc.html) */
export const DESIGN: Record<Type, [number, number]> = { pc: [856, 592], ipad: [1180, 820], phone: [390, 844], pair: [816, 920] };

export function typeFor(bilde: string): Type {
  return PAR.has(bilde) ? "pair" : ENKEL_TELEFON.has(bilde) ? "phone" : IPAD.has(bilde) ? "ipad" : "pc";
}

/** Filnavnene for et bilde i en gitt ramme: et par gir -a og -b */
export function filer(bilde: string, type: Type): string[] {
  return type === "pair" ? [`${bilde}-a`, `${bilde}-b`] : [bilde];
}

export const src = (fil: string) => `/img/${fil}.webp`;

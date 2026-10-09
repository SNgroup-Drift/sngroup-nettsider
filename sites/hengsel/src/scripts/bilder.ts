/**
 * Skjermbildene i public/img: mål i piksler for Enhet.astro.
 */
/** Bredde og høyde i piksler, så nettleseren kan sette av plass før bildet er lastet */
export const MAAL: Record<string, [number, number]> = {
  "bestilling": [2876, 1796],
  "etterkalkyle": [1712, 1059],
  "hengsel-avvik": [780, 1688],
  "hengsel-ferdig-a": [780, 1688],
  "hengsel-ferdig-b": [780, 1688],
  "hengsel-i-dag-a": [780, 1688],
  "hengsel-i-dag-b": [780, 1688],
  "hengsel-ipad": [2360, 1640],
  "hengsel-jobb-a": [780, 1688],
  "hengsel-jobb-b": [780, 1688],
  "hengsel-ks-a": [780, 1688],
  "hengsel-ks-b": [780, 1688],
  "hengsel-varer-a": [780, 1688],
  "hengsel-varer-b": [780, 1688],
  "ipad-min-dag": [2360, 1640],
  "ipad-ordre": [1712, 1184],
  "kjoper-godkjenner-a": [780, 1600],
  "kjoper-godkjenner-b": [780, 1600],
  "kundekortet": [2876, 1796],
  "kundeportalen-pc": [2876, 1796],
  "kundeportalen": [1440, 900],
  "leder": [2876, 1796],
  "min-dag": [2876, 1796],
  "moduler": [2876, 1796],
  "montasje": [2876, 1796],
  "monteringskalkyle": [2876, 1796],
  "ordre-og-montasje": [2876, 1796],
  "produkter-hos-kunden": [2876, 1796],
  "prosjektoppsett": [2876, 1796],
  "resultater": [2876, 1796],
  "saker": [2876, 1796],
  "salgstavla": [2876, 1796],
  "samtaler": [2876, 1796],
  "signert": [2876, 1796],
  "telefon-a": [780, 1600],
  "telefon-b": [780, 1600],
  "tilbudet": [2876, 1796],
  "tilvalg-mot-standard": [2876, 1796]
};

export const src = (fil: string) => `/img/${fil}.webp`;

/**
 * Virksomhetene på sngroup.no, i fast rekkefølge.
 *
 * Tekstene er hentet fra dagens sngroup.no (forslag D). Der dagens side ikke har tekst, står det en plassholder
 * merket TODO, og `plassholder: true` gjør at teksten vises i kursiv. Ikke fyll inn tall, selskaper, kunder eller
 * eiendommer som ikke er bekreftet av Eirik.
 */

export type VirksomhetId = "kjokken" | "hengsel" | "byggem" | "eiendom" | "investeringer";

export interface Virksomhet {
  id: VirksomhetId;
  /** Navnet på raden og i chipen */
  navn: string;
  undertittel?: string;
  /** Lengre tekst i raden under «Virksomheter» */
  tekst: string;
  /** Kort tekst i plantegningen */
  kort: string;
  stikkord: string[];
  lenker: { href: string; label: string; primar?: boolean }[];
  /** Lenken under teksten i plantegningen */
  planLenke: { href: string; label: string };
  /** Rommet i plantegningen */
  rom: { navn: string; merke: string };
  plassholder?: boolean;
}

export const PLASSHOLDER = "Tekst kommer.";

export const virksomheter: Virksomhet[] = [
  {
    id: "kjokken",
    navn: "Kjøkken og interiør",
    tekst:
      "Studio Sigdal Innlandet selger og monterer kjøkken, bad og garderobe fra Sigdal. Vi tegner sammen med kunden i butikk og følger jobben helt til siste skapdør er justert.",
    kort: "Studio Sigdal Innlandet – kjøkken, bad og garderobe fra Sigdal, med butikker på Hamar, Lillehammer og Gjøvik.",
    stikkord: ["Hamar", "Lillehammer", "Gjøvik", "Kjøkken", "Bad", "Garderobe"],
    lenker: [],
    planLenke: { href: "#rad-kjokken", label: "Les mer" },
    rom: { navn: "KJØKKEN", merke: "17,7 m²" },
  },
  {
    id: "hengsel",
    navn: "Hengsel",
    undertittel: "CRM by Hengsel og montørappen Hengsel",
    tekst:
      "Egne systemer for kundeoppfølging, bestilling og montering – og montørappen Hengsel. Bygd for måten en kjøkkenbutikk faktisk jobber på.",
    kort: "Egne systemer for salg, bestilling og montering. Døra i entréen henger på et hengsel – og det gjør montørappen også.",
    stikkord: ["Kundeoppfølging", "Bestilling", "Montering", "Hengsel"],
    lenker: [
      { href: "https://hengsel.no", label: "hengsel.no" },
      { href: "mailto:drift@sngroup.no?subject=Be%20om%20demo%20%E2%80%93%20CRM%20by%20Hengsel", label: "Be om demo", primar: true },
    ],
    planLenke: { href: "#hengsel", label: "Se Hengsel" },
    rom: { navn: "ENTRÉ", merke: "Hengsel" },
  },
  {
    id: "byggem",
    navn: "ByggEM AS",
    // TODO(Eirik): kort tekst om ByggEM AS. Dagens sngroup.no har ingen tekst om ByggEM.
    tekst: PLASSHOLDER,
    // TODO(Eirik): én setning til plantegningen.
    kort: PLASSHOLDER,
    // TODO(Eirik): stikkord, hvis ønsket.
    stikkord: [],
    lenker: [{ href: "https://byggem.no", label: "byggem.no" }],
    planLenke: { href: "#rad-byggem", label: "Les mer" },
    rom: { navn: "VERKSTED", merke: "7,2 m²" },
    plassholder: true,
  },
  {
    id: "eiendom",
    navn: "Eiendom",
    tekst: "Kjøp, utvikling og utleie av fast eiendom.",
    kort: "Kjøp, utvikling og utleie av fast eiendom. Tomta og huset er rammen rundt alt det andre.",
    stikkord: ["Kjøp", "Utvikling", "Utleie"],
    lenker: [],
    planLenke: { href: "#rad-eiendom", label: "Les mer" },
    rom: { navn: "STUE", merke: "26,5 m²" },
  },
  {
    id: "investeringer",
    navn: "Investeringer",
    // TODO(Eirik): kort tekst om investeringene. Dagens side sier bare at ES-HOLDING AS har «eierskap i andre
    // selskaper» (står i ingressen over radene). Ikke nevn selskaper eller beløp før det er bekreftet.
    tekst: PLASSHOLDER,
    // TODO(Eirik): én setning til plantegningen.
    kort: PLASSHOLDER,
    stikkord: [],
    lenker: [],
    planLenke: { href: "#rad-investeringer", label: "Les mer" },
    rom: { navn: "SOVEROM", merke: "14,7 m²" },
    plassholder: true,
  },
];

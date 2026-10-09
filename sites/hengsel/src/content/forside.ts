// hengsel.no – teksten på forsiden. Fasit: docs/design/hengsel/51 Hengsel nettside.dc.html (08.10.2026), ordrett.
// 09.10.2026: forsiden viser Hengsel CRM og Hengsel Ute side om side (PRODUKTER), og skjermbildene av appen
// (public/skjermbilder/ute-*.webp) med tekst fra UTE_TEKST.

/** De to produktene øverst på forsiden, side om side. Teksten er hentet fra FLOW og Hengsel Ute-delen. */
export const PRODUKTER = {
  crm: {
    who: "Kontoret",
    text: "Min dag, salgstavle, kundekort, tilbud, bestilling, ordre, montasje, saker og resultater. På PC, iPad og telefon.",
    lenke: { label: "Se modulene", href: "#moduler" },
    bilde: { src: "/img/min-dag.webp", px: [2876, 1796] as [number, number], alt: "Min dag i Hengsel CRM: selgerens arbeidsliste med panel til høyre" },
  },
  ute: {
    who: "Montøren",
    text: "Dagens jobber, varer og tegning, KS med typeskilt, avvik med bilde og ferdigmelding med kundens signatur.",
    lenke: { label: "Se appen", href: "#ute" },
  },
};

/**
 * Bildetekst til skjermbildene av Hengsel Ute. Nøkkelen er filnavnet uten «ute-», tall foran og «.webp»
 * (ute-03-ks.webp → «ks»). Filer uten tekst her får teksten laget av filnavnet (ute-i-dag.webp → «I dag»).
 * TODO (Eirik): fyll inn tekst for de elleve filene når de ligger i public/skjermbilder/.
 */
export const UTE_TEKST: Record<string, { title: string; text?: string }> = {
  "i-dag": { title: "I dag", text: "Neste jobb, hva som mangler og «På vei»." },
  "jobb": { title: "Jobben", text: "Info, varer, dokumenter og bilder på én side." },
  "varer": { title: "Varer", text: "Hva som er levert, og hva som mangler." },
  "ks": { title: "KS", text: "Punkt for punkt, med OK, avvik og bilde." },
  "avvik": { title: "Avvik med bilde", text: "Hva som skjedde, bilde og om det trengs ny vare." },
  "ferdig": { title: "Ferdig montert", text: "Ferdigmelding med kundens signatur." },
};

/** Slik henger det sammen: tre flater */
export const FLOW = [
  { who: "Kontoret", title: "Hengsel CRM", text: "Min dag, salgstavle, kundekort, tilbud, bestilling, ordre, montasje, saker og resultater. På PC, iPad og telefon." },
  { who: "Kunden", title: "Min side", text: "Kunden ser tilbudet med bilde og pris, velger tilvalg, signerer og følger reisen til kjøkkenet er montert. Uten app." },
  { who: "Montøren", title: "Hengsel Ute", text: "Dagens jobber, varer og tegning, KS med typeskilt, avvik med bilde og ferdigmelding med kundens signatur." },
];

/** Linjen under kortene: fra lead til reklamasjon */
export const CHAIN = ["Lead", "Tilbud", "Kjøpsavtale", "Bestilling", "Levering", "Montering", "Faktura", "Reklamasjon"];

/** Elleve moduler, uten priser */
export const MODULER: [string, string][] = [
  ["Grunnpakke", "Kundekort, Min dag, samtaler og innstillinger. Alltid med."],
  ["Salg", "Salgstavle, tilbud fra CET-tegningen og prisvarsler."],
  ["Kjøpsavtale og e-signering", "Avtalen signeres i kundeportalen og lagres på ordren."],
  ["Ordre og leveranse", "Bestilling, ordrebekreftelse mot bestilling og leveringsstatus per leverandør."],
  ["Montasje", "Montasjeplan per montør, monteringskalkyle og ferdigmelding fra Hengsel Ute."],
  ["Punkter og bildeverktøy", "Restpunkter og avvik med bilde, rett på ordren."],
  ["Prosjektsalg", "Leiligheter med standard, tilvalg og kjøperens godkjenning."],
  ["Ettermarked", "Saker, reklamasjoner og produkter hos kunden med typeskilt."],
  ["Økonomi", "Fakturastatus og etterkalkyle, koblet til regnskapet."],
  ["Kommunikasjon", "E-post, SMS og meldinger fra kundeportalen på kundekortet."],
  ["Automatikk", "Varsler til kunden og lesing av ordrebekreftelser i PDF."],
];

/** Hengsel Ute: tre telefoner. «Bildeverktøy» finnes ikke som skjermbilde ennå; «Avvik med bilde» vises i stedet. */
export const PHONES = [
  { bilde: "hengsel-i-dag-a", title: "I dag", text: "Neste jobb, hva som mangler og «På vei».", alt: "Hengsel Ute: I dag" },
  { bilde: "hengsel-ks-a", title: "KS", text: "Punkt for punkt, med OK, avvik og bilde.", alt: "Hengsel Ute: KS under montering" },
  { bilde: "hengsel-avvik", title: "Avvik med bilde", text: "Hva som skjedde, bilde og om det trengs ny vare.", alt: "Hengsel Ute: meld avvik" },
];

export const INTEG: [string, string][] = [
  ["Configura CET", "Tegning og varelinjer leses inn i tilbud, kalkyle og tilvalg."],
  ["Sigdal", "Bestilling og ordrebekreftelse."],
  ["Nobia", "Bestilling og ordrebekreftelse."],
  ["PowerOffice Go", "Kunde, prosjekt og faktura fra ordren. Fakturastatus tilbake."],
  ["Penneo", "E-signering av kjøpsavtalen med BankID."],
  ["Microsoft 365", "Innlogging, e-post fra Outlook og møter fra kalenderen."],
  ["SMS", "Beskjed til kunden om levering og montering."],
];

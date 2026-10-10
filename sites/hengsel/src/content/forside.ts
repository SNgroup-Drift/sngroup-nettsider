// hengsel.no – teksten på forsiden. Fasit: docs/design/hengsel/54 Hengsel forside.dc.html (10.10.2026), ordrett.

export const LOGIN = "https://app.hengsel.no"; // TODO: prod-adressen til CRM
export const TEL = ""; // TODO: telefonnummer i bunnen
export const TESTFLIGHT = "TODO_TESTFLIGHT_LENKE"; // TODO: TestFlight-lenke (knappen i Hengsel Ute)
export const PLAY = "TODO_PLAY_LENKE"; // TODO: Google Play-lenke (knappen i Hengsel Ute)
export const EPOST = "hei@hengsel.no";

export const LOFTER: [string, string][] = [
  ["Ett sted for kunden.", "Tilbud, ordre, bestilling, montering, saker og faktura på samme kundekort."],
  ["Montøren slipper papir.", "Jobben, tegningene, målene og KS-sjekklista ligger i lomma."],
  ["Kunden følger med selv.", "Kundeportal med tilvalg, leveringsdag, punkter og dokumenter."],
];

/** Sju steg: tittel, setning, bilde, alt */
export const STEG: [string, string, string, string][] = [
  ["Befaring", "Mål og bilder tas på stedet, rett inn på kunden.", "ute-laser", "Hengsel Ute: mål med laser"],
  ["Tilbud", "Tegningen fra CET blir tilbud med bilde og pris.", "tilbudet", "Hengsel CRM: tilbudet"],
  ["Ordre og bestilling", "Signert avtale blir ordre. Bestilling og ordrebekreftelse per leverandør.", "bestilling", "Hengsel CRM: bestilling"],
  ["Levering", "Leveringsdag til kunden på SMS. Mottak og utkjøring i appen.", "ordre-og-montasje", "Hengsel CRM: ordre og montasje"],
  ["Montering", "Montøren har tegning, varer og KS på telefonen.", "ute-ks", "Hengsel Ute: KS"],
  ["Punkter og saker", "Restpunkter og avvik med bilde, nummerert på kunden.", "ute-punkter", "Hengsel Ute: punkter hos kunden"],
  ["Ferdig og faktura", "Kunden signerer. Faktura går til regnskapet.", "ute-ferdig", "Hengsel Ute: ferdig montert"],
];

/** Hengsel Ute: 11 bilder. Tittel, setning, bilde */
export const UTE: [string, string, string][] = [
  ["I dag", "Neste jobb, På vei, det du må vite før du starter.", "ute-i-dag"],
  ["Jobben", "Tegning, mål, bilder og restpunkter i faner.", "ute-jobb-under"],
  ["Laser", "Mål rett inn i bildet.", "ute-laser"],
  ["KS", "Punkt for punkt. OK med bilde åpner kameraet.", "ute-ks"],
  ["KS med kamera", "Bildet tas i sjekklista, uten å bytte app.", "ute-ks-kamera"],
  ["Meld avvik", "Bilde med pil, og om det trengs ny vare.", "ute-avvik"],
  ["Punkter hos kunden", "Ett nummersystem fra befaring til reklamasjon.", "ute-punkter"],
  ["Punktkort", "Før og etter på hvert punkt.", "ute-punktkort"],
  ["Ferdig montert", "Med kundens signatur.", "ute-ferdig"],
  ["Typeskilt", "Hvitevaren fotograferes og legges på kunden.", "ute-typeskilt"],
  ["iPad", "Bildeverktøy med panel.", "ute-ipad-bildeverktoy"],
];

export const KONTOR: [string, string][] = [
  ["Ledertavle", "Frister og tall for butikken, per selger og per uke."],
  ["Montasjeplan og kontrollmål", "Hvem som monterer hva, og når målene må være tatt."],
  ["Bestilling med ordrebekreftelse og lager", "OB leses mot bestillingen. Avvik merkes."],
  ["Økonomi", "Faktura og fakturastatus mot PowerOffice Go."],
];

export const INTEG: [string, string][] = [
  ["Nobia / CET", "Import av tegning og varelinjer."],
  ["PowerOffice Go", "Kunde, prosjekt, faktura og fakturastatus."],
  ["Penneo", "E-signering av kjøpsavtalen."],
  ["Bosch laser", "Mål over Bluetooth i Hengsel Ute."],
  ["SMS og e-post", "Beskjeder til kunden fra ordren."],
];

export const TRYGG = ["Data lagres i EU.", "Roller og tilgang per butikk.", "Logg på alle endringer.", "Daglig sikkerhetskopi."];

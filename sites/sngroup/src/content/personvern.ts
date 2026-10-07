/**
 * Personvern for montørappen Hengsel. Teksten er ordrett fra https://sngroup.no/personvern
 * (sist oppdatert 30. september 2026). Endres bare når appen endrer hva den behandler.
 */
import type { Avsnitt } from "@sngroup/design/types";

const epost = '<a href="mailto:drift@sngroup.no">drift@sngroup.no</a>';

export const personvern = {
  tittel: "Personvern i",
  tittelAksent: "Hengsel",
  oppdatert: "Sist oppdatert 30. september 2026",
  behandlingsansvarlig: "ES-HOLDING AS",
  kontakt: "drift@sngroup.no",
  avsnitt: [
    {
      overskrift: "Hvem er ansvarlig",
      tekst: [`ES-HOLDING AS (org.nr. 927 363 585) utgir Hengsel. Spørsmål om personvern sendes til ${epost}.`],
    },
    {
      overskrift: "Hvilke opplysninger vi behandler",
      punkter: [
        "Brukeropplysninger: navn, e-post, telefon, firma, språkvalg og rolle.",
        "Jobbopplysninger: kundens navn og monteringsadresse, tegninger, varelister og plan for jobbene du er tildelt.",
        "Det du registrerer: kontrollmål, kvalitetssjekk, bilder, avvik, merknader, timer og ferdigmelding.",
        "Teknisk: varslingstoken og plattform (iOS/Android) for push-varsler.",
      ],
      etter: ["Appen samler ikke inn posisjon i bakgrunnen og brukes ikke til reklame eller sporing."],
    },
    {
      overskrift: "Hvorfor",
      tekst: [
        "For å planlegge og gjennomføre monteringsjobber, dokumentere kvaliteten og følge opp avvik overfor kunden.",
      ],
    },
    {
      overskrift: "Hvor opplysningene lagres",
      punkter: [
        "Database og filer: Supabase, datasenter i EU (Stockholm).",
        "Push-varsler: Expo, Google Firebase Cloud Messaging og Apple Push Notification service.",
        "Oversettelse av fritekst mellom språk, når funksjonen er slått på: Anthropic.",
      ],
    },
    {
      overskrift: "Hvor lenge",
      tekst: [
        "Jobbdokumentasjon lagres så lenge det trengs for reklamasjon og garanti på leveransen. Brukerkontoen slettes når tilgangen avsluttes.",
      ],
    },
    {
      overskrift: "Dine rettigheter",
      tekst: [
        `Du kan be om innsyn, retting og sletting, og du kan klage til Datatilsynet. Kontakt oss på ${epost}.`,
      ],
    },
    {
      overskrift: "In English",
      tekst: [
        `ES-HOLDING AS publishes Hengsel. The app processes user details, assigned job details, the photos, measurements and reports you enter, and a push token. Data is stored with Supabase in the EU and used only to carry out and document installation jobs – never for advertising or tracking. Contact ${epost} to access or delete your data.`,
      ],
    },
  ] satisfies Avsnitt[],
};

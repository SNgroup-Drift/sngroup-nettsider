import type { Avsnitt } from "@sngroup/design/types";

/**
 * Personvern for byggem.no. Dagens tekst ordrett (docs/kilde/byggem.no/filer/assets/personvern-*.js), med post@byggem.no
 * som kontakt og to endringer Eirik godkjente 07.10.2026: skjemaet lagrer ingenting selv, og drift hos Cloudflare.
 * Siden viser ingen dato, så «Sist oppdatert» er ikke med.
 */
export const personvern = {
  etikett: "byggem.no",
  tittel: "Personvern",
  ingress: "Slik behandler vi opplysninger du sender gjennom kontaktskjemaet.",
  behandlingsansvarlig: "byggEM AS",
  kontakt: "post@byggem.no",
  avsnitt: [
    {
      overskrift: "Hva vi samler inn",
      // Endret 07.10.2026 (var: «Skjemaet samler inn navn, firma hvis oppgitt, …»)
      tekst: [
        "Skjemaet lagrer ingenting selv. Det fyller ut en e-post til post@byggem.no i ditt eget e-postprogram, med navn, firma hvis oppgitt, telefon, e-post, hva henvendelsen gjelder, sted hvis oppgitt og beskrivelsen du skriver. Vi får opplysningene først når du sender e-posten.",
      ],
    },
    {
      overskrift: "Hva opplysningene brukes til",
      tekst: ["Opplysningene brukes kun til å svare på henvendelsen og følge opp den aktuelle jobben."],
    },
    {
      overskrift: "Lagringstid",
      tekst: ["Opplysningene lagres i maksimalt 12 måneder og slettes når de ikke lenger er nødvendige for oppfølgingen."],
    },
    {
      overskrift: "Behandlingsansvarlig",
      tekst: ['byggEM AS, org.nr. 932 104 148, er behandlingsansvarlig. Spørsmål kan sendes til <a href="mailto:post@byggem.no">post@byggem.no</a>.'],
    },
    {
      overskrift: "Informasjonskapsler",
      tekst: [
        "byggem.no bruker ingen analyseverktøy eller sporingscookies.",
        // Lagt til 07.10.2026
        "Nettsiden driftes hos Cloudflare, og domenet er registrert hos Domeneshop. Cloudflare fører tekniske logger med blant annet IP-adresse og tidspunkt, som brukes til drift og sikkerhet. Skriftene ligger på vår egen server.",
      ],
    },
  ] satisfies Avsnitt[],
};

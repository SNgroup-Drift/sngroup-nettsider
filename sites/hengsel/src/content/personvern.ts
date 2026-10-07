import type { Avsnitt } from "@sngroup/design/types";

// TODO(del 2): personvern for CRM by Hengsel når nettstedet får innhold.
export const personvern = {
  tittel: "Personvern på",
  tittelAksent: "hengsel.no",
  behandlingsansvarlig: "ES-HOLDING AS (org.nr. 927 363 585)",
  kontakt: "drift@sngroup.no",
  avsnitt: [
    {
      overskrift: "Nettstedet",
      tekst: ["hengsel.no bruker ikke informasjonskapsler (cookies), og har ingen sporing eller analyse."],
    },
    {
      overskrift: "Montørappen Hengsel",
      tekst: [
        'Personvernerklæringen for montørappen står på <a href="https://sngroup.no/personvern">sngroup.no/personvern</a>.',
      ],
    },
    {
      overskrift: "Kontakt",
      tekst: ['Spørsmål om personvern sendes til <a href="mailto:drift@sngroup.no">drift@sngroup.no</a>.'],
    },
  ] satisfies Avsnitt[],
};

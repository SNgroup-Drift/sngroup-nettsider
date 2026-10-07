import type { Avsnitt } from "@sngroup/design/types";

// TODO(del 2): fullstendig personvern for ByggEM AS når nettstedet får innhold (skjema, kunder, osv.).
export const personvern = {
  tittel: "Personvern på",
  tittelAksent: "byggem.no",
  behandlingsansvarlig: "ByggEM AS", // TODO(Eirik): org.nr.
  kontakt: "drift@sngroup.no",
  avsnitt: [
    {
      overskrift: "Nettstedet",
      tekst: ["byggem.no bruker ikke informasjonskapsler (cookies), og har ingen sporing eller analyse."],
    },
    {
      overskrift: "Kontakt",
      tekst: ['Spørsmål om personvern sendes til <a href="mailto:drift@sngroup.no">drift@sngroup.no</a>.'],
    },
  ] satisfies Avsnitt[],
};

# hengsel.no – endringer fra dagens side (v1.3, Lovable)

Filer: `Forside.dc.html`, `Personvern.dc.html`, `404.dc.html`. Felles deler: `Sidehode`, `Bunn` (familiebånd + bunntekst), `Plantegning Entre`, `Enhet` (telefon-, iPad- og PC-ramme). `Oversikt.dc.html` viser alle sider i PC 1440 og mobil 390, lys og mørk (`?tema=lys|mork`).

## Tekst
- All tekst, alle faner og alle skjermbilder er hentet ordrett fra `docs/kilde/hengsel.no/index.raw.html` og `personvern.raw.html`. Ingen nye påstander.
- Ny tekst er bare familiegrepene: «En del av SN Group», lenkene sngroup.no · hengsel.no · byggem.no, «org.nr. 927 363 585» i bunnteksten (fra personvernteksten), etikettene i plantegningen og 404-siden («Dette rommet finnes ikke», «Siden finnes ikke.», «Til forsiden»).

## Oppbygging
- Menyen er kortet ned fra seks til fire lenker (Se løsningen, Montørappen, Kundereisen, Spørsmål) pluss «Be om demo».
- Rekkefølgen følger familien: hero → hva vi gjør (Hvorfor, Løsningen, Se løsningen, Montørappen, Roller, Også i løsningen, Integrasjoner, Leverandørene) → slik jobber vi (Kundereisen, Prinsippene, Kom i gang) → Spørsmål → Kontakt. Kundereisen og Prinsippene er flyttet ned.
- Plantegningen «Entré» (1:50, mål i mm, 1,5 px strek) står i kontaktdelen og på 404-siden.
- Personvern bruker familiens personvernmal (rader med overskrift til venstre), med dagens tekst ordrett.

## Uttrykk
- Hengsel-logoen fra designsystemet (H-merket + «engsel» + hake over CRM) erstatter det gamle merket med «Hengsel» i serif.
- Knapper, faner, piller, kort og felt er designsystemets komponenter. Taggene «I dag» / «Med Hengsel» er piller med statusfarge.
- Enhetsrammene er designsystemets telefon- og iPad-ramme. PC-skjermbildene vises i et kort med avrundede hjørner i stedet for den tegnede skjermen med fot.
- Titlene i lista under «Se løsningen» er Inter 600 i stedet for serif (serif aldri under 1,45 rem).
- FAQ bruker knapp med +/– i stedet for `<details>`.
- Topplinjen har ikke lenger blur og gjennomsiktighet. Lysboksen har ensfarget bakgrunn.
- Heroen bytter enhet uten inntoning.

## Teknisk (for Astro)
- Ingen eksterne skript, ingen sporing (Lovable-skriptet `~flock.js` er fjernet), ingen informasjonskapsler, ingen ikoner fra CDN (haken og SN Group-symbolet er inline SVG).
- Skrift: prototypen laster Newsreader og Inter fra Google Fonts. I Astro skal de selvhostes med @fontsource som på sngroup.no.
- Fanen under «Se løsningen» huskes i localStorage (`crm-tour`), som i dag.

## Må avklares
- **Personvern blir feil etter flyttingen.** Teksten er ordrett, men to punkter stemmer ikke når siden ligger i Astro: «Skriftene lastes fra Google Fonts …» og «Nettsiden driftes hos Lovable …». Ny tekst trengs før publisering.
- **11 skjermbilder mangler** i `filer/img/`, men brukes av skriptet: `telefon-b`, `kjoper-godkjenner-a/-b`, `hengsel-jobb-a/-b`, `hengsel-varer-a/-b`, `hengsel-ks-a/-b`, `hengsel-ferdig-a/-b`. De vises nå som «Skjermbilde mangler» i rammen (Montørappen: 4 av 7 faner, Kundereisen: steg 8 og 9, Se løsningen: Kjøperen godkjenner, Selgeren på telefon).

## Tillegg fra Claude 07.10
- De 11 skjermbildene som manglet (telefon-b, kjoper-godkjenner-a/-b, hengsel-jobb-a/-b, hengsel-varer-a/-b, hengsel-ks-a/-b, hengsel-ferdig-a/-b) er hentet fra hengsel.no og ligger nå i img/ og i docs/kilde/hengsel.no/filer/img/.
- Skriftfilene (Reckless og TWK Lausanne) er ikke lagt i repoet, fordi weblisensen ikke er bekreftet.

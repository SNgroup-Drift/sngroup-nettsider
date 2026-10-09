# hengsel.no – endringer fra dagens side (v1.3, Lovable)

Filer: `Forside.dc.html`, `Personvern.dc.html`, `404.dc.html`. Felles deler: `Sidehode`, `Bunn` (familiebånd + bunntekst), `Plantegning Entre`, `Enhet` (telefon-, iPad- og PC-ramme). `Oversikt.dc.html` viser alle sider i PC 1440 og mobil 390, lys og mørk (`?tema=lys|mork`).

## 52 Apptest og 53 Apptest passord (08.10) – S-56 v2
Erstatter docs/design/hengsel/apptest/Apptest.dc.html. Samme toppfelt, familiebånd og bunntekst som resten av hengsel.no, og samme skrift som fil 51.
- Nytt: delen «Prøv med demobrukerne» med passordflate (monospace + Kopier), tilstand uten passord, merknad om @demo.invalid, to brukerlister der brukernavnet kopieres ved trykk («Kopiert» i 1,8 s), og knappen «Last ned oversikten (PDF)».
- App-ikonet er L9 (`img/hengsel-ute-ikon.svg`), ikke lenger bildeplass.
- «Hvis noe ikke virker» har fått fjerde rad (demo-innlogging). Metalinje «Hengsel 1.3.0 · iPhone, iPad og Android».
- Merker for Workeren ligger i markeringen: data-demopassord, data-demopassord-verdi, data-uten-demopassord, data-lastned, data-enhet, data-enhetslinje.
- Tweaks: enhet (auto/iphone/android/pc), lenke (klar/ikke klar), passord (med/uten), tema. Passordsiden har tilstand (tom/feil) og tema.
- Passordet i designet er oppdiktet («Demo-passord-2026»).

## 51 Hengsel nettside (08.10) – ny forside som erstatter dagens
`51 Hengsel nettside.dc.html`. Forside, Personvern og 404 fra v1.3 er arkiv; Personvern.dc.html og 404.dc.html brukes videre uendret.
- Åtte seksjoner i briefens rekkefølge: forside (Min dag på PC i Studio Display-ramme), slik henger det sammen (CRM · Min side · Hengsel Ute + linjen lead → reklamasjon), moduler (11, uten priser), Hengsel Ute (ikon L9, tre telefoner), integrasjoner (7), om oss, kontakt, bunn.
- Skrift: TWK Lausanne 350/650 og Reckless Standard M fra `fonts/` (kopiert fra crm_v4). Newsreader/Inter er reserve.
- Telefonskjermer: «Bildeverktøy» finnes ikke som skjermbilde ennå (fil 36, MV11–18 er forslag). Viser «Avvik med bilde» (`hengsel-avvik.webp`) i stedet. Bytt når v2 er bygget.
- App Store / Google Play er stiplede plassholdere, ikke lenker.
- Modulsetningene er nye og korte, basert på det som er i drift. Sigdal og Nobia står med navn under integrasjoner (bestilling og OB).
- Familiegrep beholdt: Sidehode, plantegning Entré i kontakt, SN Group-bånd og bunntekst. Sidehode har fått prop `lenker`.
- Bare lys modus, som bestilt. Kontaktskjemaet har navn, butikk, e-post og telefon og åpner e-post til drift@sngroup.no.

## Merkenavn i skjermbildene (07.10)
Ekte merkenavn er dekket over og erstattet med «Hengsel» (Hengsel-logoen der det sto en logo), i samme skrift og farge som appen:
- `tilbudet.webp`: «Hengsel Moment · fronter Eik natur», «Kjøkkenbatteri Hengsel», «Frakt Hengsel», og Hengsel i hele leverandørkolonnen (var Sigdal, Elkjøp Proff, Tapwell).
- `bestilling.webp`: alle leverandører (Sigdal, Tapwell, Elkjøp Proff, Noro) → Hengsel.
- `leder.webp`, `signert.webp`: «Forskudd til Hengsel»; på signert også «Sigdal, Tapwell, Elkjøp Proff» → «Hengsel».
- `etterkalkyle.webp`: «Forskudd til Hengsel», «Unoterte til Hengsel», «Superadmin · Butikknavn».
- `kundeportalen.webp`: «Kjøkken · Hengsel» og «Hengsel» i selgerkortet. `kundeportalen-pc.webp`: logo og «Studio Sigdal Hamar» → Hengsel-logoen.
- `hengsel-avvik.webp`: «SK100 · Hengsel · OB …».
- `hengsel-varer-a.webp`: leverandørene Sigdal og Electrolux → Hengsel. `hengsel-varer-b.webp`: «FDV Hengsel kjøkken.pdf».
- `telefon-a.webp`, `ipad-min-dag.webp`: «Avvik på faktura fra Hengsel».
- `produkter-hos-kunden.webp`: Siemens og Røros Metall → Hengsel. `telefon-b.webp`: «Hengsel stekeovn 60 cm».
- Står igjen: Penneo og BankID (signeringstjenesten) på `signert.webp` og `kjoper-godkjenner-b.webp`. Si fra om de også skal byttes.

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
- Enhetsrammene er designsystemets telefon- og iPad-ramme. PC-skjermbildene vises på en skjerm med tynn sort ramme, aluminiumskant og fot (som en Studio Display, uten merke).
- Titlene i lista under «Se løsningen» er Inter 600 i stedet for serif (serif aldri under 1,45 rem).
- FAQ bruker knapp med +/– i stedet for `<details>`.
- Topplinjen har ikke lenger blur og gjennomsiktighet. Lysboksen har ensfarget bakgrunn.
- Heroen bytter enhet uten inntoning.

## Teknisk (for Astro)
- Ingen eksterne skript, ingen sporing (Lovable-skriptet `~flock.js` er fjernet), ingen informasjonskapsler, ingen ikoner fra CDN (haken og SN Group-symbolet er inline SVG).
- Skrift: prototypen laster Newsreader og Inter fra Google Fonts. I Astro skal de selvhostes med @fontsource som på sngroup.no.
- Fanen under «Se løsningen» huskes i localStorage (`crm-tour`), som i dag.

## Skjermbilder (oppdatert 07.10)
- Skjermbildene er byttet til bilder av demo-appen fra prosjektet crm_v4 (`uploads/`). Nettleserramme, demo-banner og sigdal-logoen er fjernet, og Hengsel-logoen er lagt inn i sidemenyen. Én utviklerkommentar (Monteringskalkyle) og «Studio Sigdal Innlandet» (Moduler) er dekket over.
- Byttet: Tilbudet, Ordre og montasje, Monteringskalkyle, Moduler per rolle og Kundeportalen. Nytt: Etterkalkyler (steg 11 i kundereisen).
Steg 6 (OB kontrollert) viser ordren på PC i stedet for iPad.
- Alle skjermbilder er nå på plass (Min dag, Samtaler, Salgstavla, Kundekortet, Bestilling, Montasje, Saker, Leder og Resultater lagt inn 07.10).
- Lagt inn fra opplastingen 07.10: hele montørappen (I dag, jobb og KS, varer og dokumenter, hvitevarer, avvik, ferdig montert, iPad), selgeren på telefon, Min dag på iPad, Produkter hos kunden, Prosjektoppsett, Tilvalg mot standard og Kjøperen godkjenner.
- I Kundeportalen står fortsatt «Studio Sigdal Hamar» i teksten, og i sidemenyen på Etterkalkyler står «Forskudd til Nobia» og «Unoterte til Sigdal».

## Må avklares
- **Personvern blir feil etter flyttingen.** Teksten er ordrett, men to punkter stemmer ikke når siden ligger i Astro: «Skriftene lastes fra Google Fonts …» og «Nettsiden driftes hos Lovable …». Ny tekst trengs før publisering.
- **11 skjermbilder mangler** i `filer/img/`, men brukes av skriptet: `telefon-b`, `kjoper-godkjenner-a/-b`, `hengsel-jobb-a/-b`, `hengsel-varer-a/-b`, `hengsel-ks-a/-b`, `hengsel-ferdig-a/-b`. De vises nå som «Skjermbilde mangler» i rammen (Montørappen: 4 av 7 faner, Kundereisen: steg 8 og 9, Se løsningen: Kjøperen godkjenner, Selgeren på telefon).

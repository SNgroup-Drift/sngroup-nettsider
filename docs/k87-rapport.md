# K-87 del 1: SN Group nettsider – repo, designpakke og sngroup.no

Dato: 07.10.2026. Repo: `SNgroup-Drift/sngroup-nettsider`, gren `main`.

## Hva som er bygd

**Monorepo (npm workspaces, Astro 7.3, helt statisk)**

- `packages/design`: `tokens.css` (palett, lys og mørk), `base.css`, `fonts.css` og komponentene BaseLayout,
  SiteHeader, SiteFooter, Section, Card, ContactBlock, PrivacyPage, CompanyRow og ComingSoon.
- `sites/sngroup`: forsiden, `/personvern`, `/design` og 404.
- `sites/hengsel` og `sites/byggem`: skjeletter med «Kommer snart» og en personvernside.
- `npm run build` bygger alle tre til `sites/*/dist`. `npm test` sjekker at alle interne lenker svarer 200.
  `npm run skjermbilder` tar skjermbildene og sjekker 360 px, konsollfeil og CSP i Chromium.
- `README.md` forklarer oppsettet, hvordan et nytt nettsted legges til, og bygging og publisering.
  `docs/hosting.md` har Cloudflare Pages-innstillingene per nettsted.
- `public/_headers` og `public/_redirects` per nettsted.

**sngroup.no (bygd videre på forslag D)**

Tekst og struktur er hentet fra kildekoden til dagens side (Lovable-prosjektet SNgroup_no, commit `20b3ce7`), fordi
sngroup.no er sperret fra dette miljøet.

- Heltedelen med etikett, overskrift, ingress, knapper og chips er ordrett.
- Plantegningen 1:50 har nå fem rom, ett per virksomhet: kjøkken (Kjøkken og interiør), entré (Hengsel),
  verksted (ByggEM AS), stue (Eiendom) og soverom (Investeringer).
  - Klikk eller tastatur velger et rom. Valget holder tegningen, teksten under, chipene og radene i takt.
  - Koordinatene følger pekeren, døra i entréen lukker seg for Hengsel, og tomta lyser for Eiendom.
- Virksomhetsradene (CompanyRow) står i bestilt rekkefølge: Kjøkken og interiør, Hengsel, ByggEM AS, Eiendom og
  Investeringer.
  - Hengsel har lenke til https://hengsel.no og «Be om demo».
  - ByggEM har lenke til https://byggem.no.
  - Radene bruker `<details>`, så de virker uten JavaScript.
- Hengsel-delen med telefonen er portet til ren JavaScript og har fanene I dag, Jobb og KS, «Uten dekning» og en kø.
- Kontaktdelen har drift@sngroup.no med kopier-knapp, ES-HOLDING AS, org.nr. og adresse.
- `/personvern` er teksten fra sngroup.no/personvern, ordrett, i den nye PrivacyPage-malen («Sist oppdatert 30.
  september 2026»). Teksten ligger i `sites/sngroup/src/content/personvern.ts`.
- `/design` viser:
  - fargene med hex, lys og mørk, med en kontrasttabell (WCAG) regnet ut ved bygging;
  - skriftene i bruk;
  - alle komponentene.
  
  Siden har `noindex`.
- Bunnteksten har org.nr., adresse, e-post og personvern. «En del av SN Group» er skjult på sngroup.no og vises på
  hengsel.no og byggem.no.
- Det finnes ingen Sigdal-logo, ingen Sigdal-bilder og ingen Sigdal-hexkoder. Studio Sigdal Innlandet er bare nevnt i
  tekst, som på dagens side.

**Endringer fra dagens side som trenger et blikk fra Eirik**

1. Overskriften over radene var «Tre ben å stå på.». Det stemmer ikke med fem virksomheter, så den er nå «Hvert rom er
   en *virksomhet*.». Formuleringen er hentet fra plantegningens beskrivelse på dagens side.
2. Hengsel-raden har undertittelen «CRM by Hengsel og montørappen Hengsel» (fra bestillingen).
   - «Be om demo» åpner en e-post til drift@sngroup.no med emnet «Be om demo – CRM by Hengsel». Det finnes ikke noe
     skjema, siden nettstedet ikke har noen server.
3. Plantegningen har fått en vegg og et nytt rom (VERKSTED, 7,2 m²), og soverommet er mindre (14,7 m², var 22,4 m²).
   Arealene er regnet ut fra tegningen i målestokk 1:50. De er ikke fakta om virksomhetene.
4. Bunnteksten er mørk i begge moduser.

## Kvalitet

Alt under er kjørt lokalt mot de bygde filene. Den lokale serveren bruker `_headers` (CSP håndheves) og gzip, slik
Cloudflare gjør.

| Sjekk | Resultat |
|---|---|
| `npm ci` og `npm run build` fra rent repo | Grønt, alle tre nettstedene |
| `npm test` (interne lenker, også #ankre og skriftfiler) | 53 forespørsler, 0 feil |
| 360 px, lys og mørk, alle sider på alle tre nettsteder | Ingen vannrett rulling, ingen element stikker ut, ingen konsollfeil |
| Plantegning: rom → tekst, rad og chip | 5 av 5, og chip → rom |
| Eksterne forespørsler og informasjonskapsler | Ingen |
| `prefers-reduced-motion` | Overganger og jevn rulling slås av (`base.css`). Skjermbildene er tatt med redusert bevegelse |

**Lighthouse 13 (Chromium 141)**

Mobil er simulert 4G med standardinnstillingene. Desktop bruker desktop-oppsettet.

| Side | Ytelse | Tilgjengelighet | Beste praksis | SEO |
|---|---|---|---|---|
| sngroup.no/, mobil | 99 | 100 | 100 | 100 |
| sngroup.no/, desktop | 100 | 100 | 100 | 100 |
| /personvern, mobil | 100 | 100 | 100 | 100 |
| /design, mobil | 99 | 100 | 100 | 66* |

\* /design har `noindex` med vilje, siden den er en arbeidsside for godkjenning. Fjern `noindex` i
`sites/sngroup/src/pages/design.astro` hvis den skal kunne indekseres.

For å nå ≥ 95 på mobil (startpunktet var 92):

- **Én CSS for hele nettstedet, lagt inline i HTML-en.** CSP-en har fortsatt ikke `'unsafe-inline'`:
  `scripts/csp-hasher.mjs` legger sha256-hashen for stilen inn i `dist/_headers` ved bygging.
- **Newsreader med bare vektaksen.** Varianten med optisk størrelse (opsz) var 132 kB pluss 147 kB og trakk ytelsen
  ned til 95.
- **Forhåndslasting av de to vanligste skriftfilene.** Uten den hoppet teksten når skriften byttet (CLS 0,09).

## Skrifter som faktisk brukes

Alle skriftene er selvhostet fra npm (`@fontsource-variable/*`), og ingenting hentes fra Google Fonts. Målt i Chromium
på forsiden:

| Skrift | Fil (latin) | Størrelse | Bruk |
|---|---|---|---|
| Newsreader Variable, normal | `newsreader-latin-wght-normal.woff2` | 58 kB | Overskrifter, vekt 300 og 400 |
| Newsreader Variable, kursiv | `newsreader-latin-wght-italic.woff2` | 64 kB | Aksentord («*hjem*», «*kontakt*») og «*Hengsel*» |
| Inter Variable, normal | `inter-latin-wght-normal.woff2` | 48 kB | All annen tekst, vekt 400, 500 og 600 |

Andre delsett (latin-ext, kyrillisk og så videre) ligger i bygget, men lastes bare hvis teksten trenger dem
(unicode-range). Inter i kursiv brukes ikke.

Merk: dagens side brukte Newsreader med optisk størrelse fra Google Fonts. Varianten uten opsz ser litt fastere ut i de
største titlene. Tallene står over. Vil Eirik ha opsz tilbake, er det én linje i `packages/design/src/styles/fonts.css`,
og ytelsen på mobil blir da rundt 95.

## Paletten (til godkjenning på /design)

Fargene er brukt slik de ble bestilt: kalk, lin, sand, stein, umbra, fjord og dis. Den mørke paletten bruker #1E1916,
#29221D, #F1ECE4 og #93A3B6.

Ett funn: **stein (#A89A8A) har 2,5 : 1 mot kalk** og er for lys til tekst (WCAG krever 4,5 : 1).

- Dempet tekst bruker derfor umbra med 74 % dekning (`--tekst-dempet`).
- Stein brukes til ikoner, prikker og stiplede linjer.

Fjord på kalk har 5,2 : 1 og holder til lenker og aksent.

Hjelpefarger som ikke står i bestillingen, men som er avledet av paletten:

- telefonen i Hengsel-delen: `--enhet-kort` #3D332C;
- bunnteksten i mørk modus: #141110;
- ikonfargen i mørk modus: #8F8274.

## Skjermbilder

Alle bildene ligger i `docs/skjermbilder/`. Desktop er 1440 px, mobil er 390 px (2x), og alle er helsides.

| | Lys | Mørk |
|---|---|---|
| Forside, desktop | [forside-desktop-lys.png](skjermbilder/forside-desktop-lys.png) | [forside-desktop-mork.png](skjermbilder/forside-desktop-mork.png) |
| Forside, mobil | [forside-mobil-lys.png](skjermbilder/forside-mobil-lys.png) | [forside-mobil-mork.png](skjermbilder/forside-mobil-mork.png) |
| /design, desktop | [design-desktop-lys.png](skjermbilder/design-desktop-lys.png) | [design-desktop-mork.png](skjermbilder/design-desktop-mork.png) |
| /design, mobil | [design-mobil-lys.png](skjermbilder/design-mobil-lys.png) | [design-mobil-mork.png](skjermbilder/design-mobil-mork.png) |

## Plassholdere som venter på tekst

| Fil | Felt | Hva mangler |
|---|---|---|
| `sites/sngroup/src/content/virksomheter.ts` | ByggEM AS: `tekst`, `kort`, `stikkord` | Kort tekst om ByggEM. Dagens side har ingen. Vises nå som «Tekst kommer.» i kursiv |
| `sites/sngroup/src/content/virksomheter.ts` | Investeringer: `tekst`, `kort` | Kort tekst om investeringene. Dagens side sier bare «eierskap i andre selskaper» (i ingressen). Vises som «Tekst kommer.» |
| `sites/byggem/src/content/selskap.ts` | `orgnr`, `adresse` | Org.nr. og adresse for ByggEM AS. Vises nå som «[org.nr. mangler]» og «[adresse mangler]» i bunnteksten på byggem.no |
| `sites/byggem/src/content/selskap.ts` | `epost` | Egen e-post for ByggEM? Bruker drift@sngroup.no inntil videre |
| `sites/byggem/src/content/personvern.ts` | `behandlingsansvarlig`, avsnitt | Org.nr. og full personvernerklæring (del 2) |
| `sites/hengsel/src/content/personvern.ts` | avsnitt | Personvern for CRM by Hengsel (del 2). Siden sier nå at nettstedet ikke har cookies eller sporing, og lenker til sngroup.no/personvern for montørappen |

Søk etter `TODO` i repoet for å finne alle.

## Hosting (Eirik gjør)

Innstillingene står i `docs/hosting.md`. Kort fortalt:

- Tre Pages-prosjekter (`sngroup`, `hengsel`, `byggem`), alle med rotmappen som root directory.
- Byggekommando `npm run build -w sites/<navn>`, output `sites/<navn>/dist`, og `NODE_VERSION` = 22.
- Domenene er apex og www for hvert nettsted.

**Avvik fra bestillingen:** Cloudflare Pages støtter ikke domenebaserte regler i `_redirects`. www → apex må derfor
gjøres med en Redirect Rule i hver sone, med malen «Redirect from WWW to root». Stegene står i hosting.md.
`_redirects` finnes for hvert nettsted, med en forklaring og plass til stibaserte regler.

## Ikke gjort / til del 2

- Innhold på hengsel.no og byggem.no.
- Lighthouse mot de publiserte domenene. Kjør det når Pages-prosjektene er koblet til. Tallene over er fra lokal kjøring.

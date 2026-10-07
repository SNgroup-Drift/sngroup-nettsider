# SN Group designsystem

Felles designsystem for **sngroup.no**, **hengsel.no** og **byggem.no**.

SN Group (ES-HOLDING AS, org.nr. 927 363 585) er morselskapet til flere virksomheter i Norge:

- **Kjøkken og interiør** – Studio Sigdal Innlandet, butikker på Hamar, Lillehammer og Gjøvik.
- **Hengsel** – CRM by Hengsel og montørappen Hengsel (hengsel.no).
- **ByggEM AS** – snekkerarbeid og montering av kjøkken, innredning, dører og vinduer (byggem.no).
- **Eiendom** – kjøp, utvikling og utleie av fast eiendom.
- **Investeringer** – boliger og eierskap i andre selskaper.

*Ett hus, flere rom:* sngroup.no er huset, hengsel.no og byggem.no er rommene. Alle sidene deler samme designpakke. Studio Sigdal Innlandet følger Sigdals egen profil; ingen Sigdal-farger, -logo eller -bilder her.

## Kilder

- **GitHub: [SNgroup-Drift/sngroup-nettsider](https://github.com/SNgroup-Drift/sngroup-nettsider)** (main) – kilden til tokens, komponenter og UI-kits. Statisk Astro-monorepo:
  - `packages/design/src/styles/` – `tokens.css`, `base.css`, `fonts.css`
  - `packages/design/src/components/` – BaseLayout, SiteHeader, SiteFooter, Section, Card, ContactBlock, CompanyRow, PrivacyPage, ComingSoon
  - `sites/sngroup|hengsel|byggem/src/` – sider, innhold (`content/*.ts`), Plantegning og Telefon
  - `sites/sngroup/src/pages/design.astro` – designpakken på én side
  Utforsk repoet for å bygge enda tettere på produktet.
- `uploads/` – tidligere opplastet tokens og logo (erstattet av ny logo, se Logo).
- Brief fra eier. Der briefen og repoet er uenige, følger systemet repoet (se «Avvik fra briefen»).

## Indeks

- `styles.css` – inngang; bare `@import`.
- `tokens/` – `fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `base.css` (repoets grunnstil: `h1–h3`, `em`, `.label`, `.wrap`, `.lede`, `.pill`, `.pill.solid`, `.skip`, `.visually-hidden`).
- `components/components.css` – komponentstiler portert fra .astro-filene.
- `components/` – React-komponenter (se under).
- `guidelines/` – spesimenkort for farger, typografi, avstand og merke.
- `ui_kits/sngroup/` – forsiden med plantegning, virksomheter, Hengsel-telefonen, kontakt og personvern.
- `ui_kits/hengsel/`, `ui_kits/byggem/` – «Kommer snart» og personvern.
- `assets/` – `sngroup_logo.svg` (lys), `sngroup_logo_mork.svg` (mørk), `sngroup_logo_ensfarget.svg` (currentColor), `favicon.svg` (32), `app-ikon.svg` (512).
- `thumbnail.html`, `SKILL.md`, `github.md`.

## Components

- **SiteHeader** (`components/header/`) – logo (40 px) eller ordmerke i Newsreader 26 px, sekundære lenker + én pille.
- **SiteFooter** (`components/footer/`) – mørk bunnlinje: © år, selskap, org.nr., adresse, e-post · Personvern · «En del av SN Group» (skjult på sngroup.no).
- **Section** (`components/layout/`) – seksjon med etikett, h2 og ingress i to kolonner; valgfri flate.
- **ComingSoon** (`components/layout/`) – «Kommer snart»-side.
- **Card** (`components/card/`) – bakgrunn, 1 px linje, radius 6, ingen skygge.
- **CompanyRow** (`components/company/`) – åpnebar rad per virksomhet med «+», stikkord og lenker.
- **ContactBlock** (`components/contact/`) – stor e-post med «Kopier» og selskapsopplysninger.
- **PrivacyPage** (`components/privacy/`) – personvernmal med avsnitt.

BaseLayout (head, skrifter, skip-lenke) er ikke laget som komponent – den tilsvarer `styles.css` + `<a class="skip">`.

### Intentional additions
- **Button** (`components/core/`) – React-innpakning av repoets `.pill` / `.pill.solid`, så knapper kan brukes som komponent.

Plantegning og Telefon er sidekomponenter i `sites/sngroup`, og ligger derfor i UI-kittet, ikke i komponentbiblioteket.

## CONTENT FUNDAMENTALS

- **Språk:** norsk bokmål (`lang="nb"`). Rolig og rett på sak. Hele setninger med punktum, også i overskrifter: «Hvert rom er en virksomhet.», «Ta kontakt.»
- **Si bare det som er i drift.** Beskriv hva virksomheten gjør i dag. «ByggEM AS gjør snekkerarbeid og monterer kjøkken og innredning, dører og vinduer.»
- **Ikke dikt opp.** Bruk bare bekreftet tekst. Mangler en tekst: «Tekst kommer.» i kursiv (`plassholder`) og `TODO` i kildefilen. Mangler en adresse: «[adresse mangler]». Ingen oppdiktede kunder, beløp eller tall.
- **Stemme:** «vi» om virksomheten, «du» til leseren («Du kan be om innsyn …»). Handlinger er korte og konkrete: «Ta kontakt», «Se virksomhetene», «Be om demo», «Les mer», «Kopier» → «Kopiert».
- **Store bokstaver:** setningsform overalt. Versaler bare i små etiketter (`.label`) og i romnavn i plantegningen (KJØKKEN, ENTRÉ).
- **Aksentord:** ett ord i overskriften kan settes i kursiv `<em>` (Fjord): «… som lager *hjem* bedre.»
- **Skilletegn:** midtpunkt « · » mellom korte ledd (Trondheim · Hamar · Lillehammer · Gjøvik), tankestrek « – » i titler («SN Group – ES-HOLDING AS»).
- **Emoji:** brukes ikke. Ingen utropstegn.

## VISUAL FOUNDATIONS

- **Farger:** varm, jordnær palett. Kalk `#F7F5F1` bakgrunn (aldri rent hvitt), Lin `#EEE8DF` flater, Sand `#D8CCBC` linjer, Stein `#A89A8A` ikoner og pynt (aldri tekst, 2,6:1), Umbra `#2B2420` tekst. Dempet tekst er Umbra med 74 % dekning (`--tekst-dempet`, 7:1). Fjord `#46698F` er eneste aksent – aksentord, aktiv rad, fokus, prikker. Dis `#93A3B6` myk aksent. Ingen rosa/magenta, ingen signalfarger, ingen gradienter.
- **Semantiske navn:** komponentene bruker bare `--bakgrunn`, `--flate`, `--linje`, `--linje-svak`, `--ikon`, `--tekst`, `--tekst-dempet`, `--aksent`, `--sone`, `--enhet*`, `--fot*`. Engelske alias (`--bg`, `--text` …) finnes for eldre kort.
- **Mørk modus:** bakgrunn `#1E1916`, flater `#29221D`, tekst `#F1ECE4`, dempet 74 %, aksent Dis. Følger `prefers-color-scheme`; `data-theme="light|dark"` på `<html>` overstyrer. Bunnteksten er mørk i begge moduser.
- **Typografi:** Newsreader til overskrifter – vekt 300 på h1/h2 og store tall, 400 ellers, -0.01em, aldri små, aldri versaler. h1 `clamp(40px, 6.2vw, 84px)`, h2 `clamp(34px, 5vw, 64px)`, h3 `clamp(22px, 2.4vw, 28px)`. Inter til alt annet: 16 px / 1.6 brødtekst, 18 px ingress, 15 px knapper og menyer (500), 12 px versal etikett med 0.12em sperring.
- **Avstand:** innholdsbredde 1200 px, gutter `clamp(16px, 4vw, 48px)`, seksjoner `clamp(64px, 9vw, 120px)` vertikalt. Seksjoner veksler mellom bakgrunn og flate.
- **Form:** radius 6 på kort, plantegning og felt; pille på knapper, chips og stikkord; sirkel på «+». Knapper minst 44 px.
- **Kort:** bakgrunn, 1 px `--linje`, radius 6, 20 px polstring, **ingen skygge**.
- **Linjer:** 1 px. `--linje` rundt kort og tegning, `--linje-svak` (14 %) mellom rader, rundt piller og i definisjonslister.
- **Skygger:** ingen – med ett unntak: telefonen i Hengsel-delen (`0 30px 60px -30px`).
- **Bakgrunner:** flate farger. Ingen fotografier, teksturer eller mønstre.
- **Motiv – plantegningen 1:50:** et hus på 10 400 × 6 800 mm der hvert rom er en virksomhet (Kjøkken, Entré/Hengsel, Verksted/ByggEM, Stue/Eiendom, Soverom/Investeringer). Ytterveggen 6 px, innervegger 3 px, inventar 1,2 px, målelinjer, stiplet tomtegrense og ett hengselpunkt i Fjord på inngangsdøra. Rommene kan velges; koordinatene vises i mm.
- **Hover:** sekundære lenker går fra dempet til full tekst; pille-rammen blir tekstfarget; radnavn og valgt rom blir Fjord; rom får `--sone`-fyll.
- **Valgt/åpen:** chip får flate og tekstfarget ramme, prikken blir Fjord. Åpen rad: «+» roterer 45° og fylles med tekstfargen.
- **Fokus:** 2 px `--aksent`-kontur, 3 px avstand.
- **Animasjon:** liten og funksjonell – rom-fyll 0,25 s, «+» 0,35 s, døra svinger 0,9 s `cubic-bezier(0.5, 0, 0.2, 1)`, bryter 0,2 s. Alt slås av med `prefers-reduced-motion`.
- **Layout:** topptekst ikke klistret, uten linje under. To kolonner bryter til én under 860 px; sekundære menylenker skjules under 640 px.
- **Gjennomsiktighet:** bare i tokens (dempet tekst, svake linjer, sone-fyll). Ingen blur.
- **Bilder:** ingen i dag.

## Logo

- **SN** i Newsreader 300 over **GROUP** i Inter 500 med 0.32em sperring, og en loddrett hengselstrek i Fjord til venstre (Dis på mørk bakgrunn) – dørbladet fra plantegningen. Bokstavene er konvertert til konturer.
- Filer: `assets/sngroup_logo.svg` på lys bakgrunn, `sngroup_logo_mork.svg` på mørk, `sngroup_logo_ensfarget.svg` når logoen må være én farge.
- Minst 24 px høy. Ikke strekk, roter, legg skygge på eller bytt farger.
- sngroup.no viser logoen i toppteksten (`SiteHeader logo=… logoMork=…`, 40 px høy). Hengsel og ByggEM bruker ordmerket i tekst.
- Favikon og app-ikon: «SN» med hengselstrek i Dis på Umbra (`assets/favicon.svg`, `assets/app-ikon.svg`). Erstatter repoets `public/favicon.svg` når det tas i bruk.
- Hengsel og ByggEM har ingen logoer.

## ICONOGRAPHY

- **Ingen ikonsett.** Repoet bruker verken ikonfont, SVG-ikoner eller Lucide.
- Tegn i tekst gjør jobben: → på interne handlinger («Ta kontakt →»), ↗ på eksterne lenker («hengsel.no ↗»), + i radene, ✓ i sjekklister og «Sendt ✓». Pilene har `aria-hidden="true"`.
- Prikker (6–8 px sirkler) i Fjord eller Stein markerer lister og chips.
- Favikon: se Logo.
- Ingen emoji. Hengsel og ByggEM har ingen logoer – ordmerket skrives i Newsreader.

## Fonter

Produksjon selvhoster `@fontsource-variable/newsreader` og `@fontsource-variable/inter` (`Newsreader Variable`, `Inter Variable`). `tokens/fonts.css` laster de samme fontsource-filene fra jsDelivr (latin-delsett).

## Avvik fra briefen

Repoet er fasit. Disse verdiene skiller seg fra den opprinnelige briefen:
- radius **6 px** på kort og felt (brief: 8/12)
- innholdsbredde **1200 px** (brief: 1040)
- Newsreader **300** på store titler (brief: 400)
- etikettsperring **0.12em**
- dempet tekst er Umbra med 74 % dekning, ikke Torv `#6B5E53`

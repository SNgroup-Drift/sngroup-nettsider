# K-87 del 4 – hengsel.no etter Claude Design

**Dato:** 07.10.2026
**Fasit:** `docs/design/hengsel/` (eksport fra Claude Design, commit 10f00b9, godkjent av Eirik 07.10.2026)
**Resultat:** `sites/hengsel` har forside, `/personvern` og 404 som i designet, og kan erstatte dagens hengsel.no i Lovable.

## Viktig først: del 3 var ikke gjort

Bestillingen sier at del 4 bruker familiekomponentene fra del 3 (sngroup.no). Del 3 var ikke kjørt: komponentene fantes
bare som design i `docs/design/sngroup/`, ikke i koden. Jeg har derfor bygd de fire familiekomponentene i designpakken
etter `docs/design/sngroup/*.dc.html`, og brukt dem på hengsel.no:

| Komponent | Fil | Fasit |
|---|---|---|
| `Toppfelt` | `packages/design/src/components/Toppfelt.astro` | `docs/design/sngroup/Toppfelt.dc.html` |
| `Plantegningsstrek` | `packages/design/src/components/Plantegningsstrek.astro` | `docs/design/sngroup/Plantegningsstrek.dc.html` |
| `Familiebaand` | `packages/design/src/components/Familiebaand.astro` | `docs/design/sngroup/Familiebaand.dc.html` |
| `IkkeFunnet` | `packages/design/src/components/IkkeFunnet.astro` | `docs/design/sngroup/IkkeFunnet.dc.html` |

Komponentene bruker bare de semantiske variablene, så del 3 kan ta dem i bruk på sngroup.no uten endringer.
**sngroup.no er ikke endret.** Den bruker fortsatt `SiteHeader` og `SiteFooter` til del 3 er gjort.

Tillegg i komponentene som hengsel.no trengte (standardverdiene gir sngroup-utgaven):

- `Toppfelt`: slot `logo`, `kontaktVariant="fylt"` (blå knapp), `fast` (festet øverst), `strek` (linje under), `skjulUnder={900}`.
- `Plantegningsstrek`: `merke` (liten tekst under romnavnet, «Hengsel») og `mangler` for `rom="entre"` (stiplede vegger,
  «404 / Finnes ikke») til 404-siden.
- `IkkeFunnet`: `oppsett="side"` (tekst til venstre, tegning til høyre), `ingress`, `knapp="aksent"` og slot `tegning`.
- `PrivacyPage` (fantes fra før): valgfri `etikett`, `ingress` og `boks` per avsnitt. sngroup.no ser ut som før.

## Hva er bygd

### Sider

- **Forside** (`src/pages/index.astro`): samme tekst, meny, seksjonsrekkefølge, faner og skjermbilder som
  `Forside.dc.html`: hero, Hvorfor, Løsningen, Se løsningen, Montørappen, Roller, Også i løsningen, Integrasjoner,
  Leverandørene, Kundereisen, Prinsippene, Kom i gang, Spørsmål og Kontakt.
  - Dataene (faner, steg, roller, spørsmål osv.) er hentet maskinelt fra designfilen til `src/content/forside.ts`, så
    teksten er ordrett.
- **/personvern**: dagens tekst ordrett i familiens personvernmal, med de to godkjente endringene (se under).
- **404**: «404», «Dette rommet finnes ikke», «Siden finnes ikke.», «Til forsiden →» og entréen i plantegningsstrek med
  stiplede vegger. Ukjente adresser gir status 404 med denne siden (`not_found_handling` i `wrangler.jsonc`).

### Deler

- **Toppfeltet:** Hengsel-logoen, fire lenker (Se løsningen, Montørappen, Kundereisen, Spørsmål) og «Be om demo».
  - Lenkene skjules under 900 px.
  - Toppfeltet er festet øverst, uten blur og uten gjennomsiktighet.
- **Logoen** (`src/components/HengselLogo.astro`): H-merket (to skapdører, grep i Deep Blue) + «engsel» + hake over
  «CRM», som inline SVG.
  - Det lille merket brukes ved 28 px og mindre, som i designsystemet.
  - Ordet tegnes med Inter 350, siden TWK Lausanne ikke kan brukes ennå.
- **Bunnen:** `Familiebaand gjeldende="hengsel.no"` og bunnteksten «Hengsel · ES-HOLDING AS · org.nr. 927 363 585 ·
  drift@sngroup.no».
  - Linjen om demodata står bare på forsiden.
  - Bunnen har lenkene «Personvern» og «Til toppen» (på forsiden) eller «Til forsiden» (på andre sider).
- **Enhetsrammene** (`src/components/Enhet.astro`): PC (kort med avrundede hjørner), iPad, telefon og to telefoner side om
  side, med samme regler som `Enhet.dc.html` for hvilket bilde som får hvilken ramme.
  - Klikk på et skjermbilde åpner det i en lysboks. Escape eller klikk lukker den.
- **Plantegningen** i kontaktdelen er `Plantegningsstrek rom="entre"` med «Hengsel» under romnavnet.

### Samspill (`src/scripts/forside.ts`, ingen inline-skript)

- Heroen bytter mellom PC, iPad, telefon og montør hvert 4,2 s, som i designet.
  - Den stopper når brukeren velger selv, eller holder musa eller fokus på bildet.
  - Ved `prefers-reduced-motion` bytter den ikke av seg selv.
- **Fanene** under Hvorfor, Se løsningen, Montørappen og Roller virker med mus og piltaster.
- **Se løsningen:** området huskes i `localStorage` under `crm-tour`, som i dag. Ingen andre lagringer, ingen
  informasjonskapsler.
- **Kundereisen** har 11 steg med fremdriftslinje og forrige/neste.
- **Sjekklista** i Kom i gang teller, men lagres ikke.
- **Spørsmål** åpnes med +/– (første står åpent).
- **Kopier-knappen** kopierer e-postadressen.
- **Demoskjemaet** lagrer ingenting. Det sjekker navn, firma og e-post og åpner en ferdig utfylt e-post (mailto), som i
  dag.
  - Uten JavaScript gjør skjemaet ingenting (`method="dialog"`), så ingen opplysninger havner i en adresse eller logg.

### Farger og skrift

- `sites/hengsel/src/styles/tokens.css` setter Hengsel-fargene som familiens semantiske variabler (`--bakgrunn`,
  `--flate`, `--tekst`, `--aksent` …), både lys og mørk. Mørk modus følger systemet.
- `sites/hengsel/src/styles/hengsel.css` har designsystemets knapper, kort, piller, segmentfaner, chips og skjemafelt,
  med prefikset `h-` så de ikke kolliderer med SN Groups grunnstil.
- **Bytte skrift senere:** én linje per familie øverst i `tokens.css` (`--font-overskrift` og `--font-tekst`). Da må
  `@font-face` for Reckless og TWK Lausanne legges inn, og skriftfilene i repoet.

### Personvern (godkjent av Eirik 07.10)

Teksten er ordrett fra `docs/kilde/hengsel.no/personvern.raw.html`, med to endringer:

- «Skriftene lastes fra Google Fonts …» → «Skriftene ligger på vår egen server. Nettsiden henter ingenting fra andre
  nettsteder.»
- «Nettsiden driftes hos Lovable …» → «Nettsiden driftes hos Cloudflare, og domenet er registrert hos Domeneshop.
  Cloudflare fører tekniske logger med blant annet IP-adresse og tidspunkt, som brukes til drift og sikkerhet.»

«Sist oppdatert 4. oktober 2026» står uendret, som i designet. Bør den settes til 7. oktober 2026 når siden publiseres?

## Skrifter som faktisk er brukt

Målt i Chromium på forsiden (`document.fonts` og nettverket). Begge er selvhostet fra npm (`@fontsource-variable`),
som på sngroup.no. Ingen forespørsler til Google Fonts eller andre nettsteder.

| Familie | Fil | Bruk |
|---|---|---|
| Newsreader Variable (normal) | `newsreader-latin-wght-normal.woff2` | Overskrifter (400), store tall |
| Inter Variable (normal) | `inter-latin-wght-normal.woff2` | All annen tekst (400, 500, 600), logoordet (350) og «CRM» (650) |

Reckless og TWK Lausanne er ikke brukt, og filene ligger ikke i repoet.

## Kvalitet

| Sjekk | Resultat |
|---|---|
| `npm run build` | Grønt for alle tre |
| `npm test` | 140 forespørsler, 0 feil. hengsel.no: alle interne lenker og ankre, alle **35 bildene** i `img/` (200), de 30 skjermbildene fanene bytter inn, og 404-siden |
| `npx wrangler deploy --dry-run -c sites/<navn>/wrangler.jsonc` | OK for sngroup (27 filer), hengsel (59 filer) og byggem (22 filer). Ingen bindinger |
| `wrangler dev` (hengsel, lokalt) | `/` 200 med CSP (stilhashen fra `csp-hasher.mjs`), HSTS og X-Frame-Options. `/personvern` 200. `/finnes-ikke` 404 med 404-siden. 35 av 35 bilder 200 |
| `npm run skjermbilder` | 0 feil. Alle sider på alle tre nettstedene ved 360 px, lys og mørk: ingen vannrett rulling, ingen konsollfeil (CSP gjelder). Fanene, `crm-tour` og kundereisen virker. Ingen eksterne kall, ingen informasjonskapsler |
| Kontrast (axe, WCAG 2 AA) | Ingen brudd på forsiden, /personvern og 404, i lys og mørk, ved 1440 og 360 px |
| Lighthouse, forsiden mobil (5 kjøringer) | Ytelse 96–98, tilgjengelighet 100, beste praksis 100, SEO 100. LCP 2,3 s, CLS 0 |
| Lighthouse, forsiden desktop | 100 / 100 / 100 / 100 |
| Lighthouse, /personvern mobil | 100 / 100 / 100 / 100 |

Ytelsen på mobil varierer mellom 96 og 98 med blokkeringstiden (0–190 ms). Årsaken er layouten av en lang side
(13 000 px). Jeg prøvde `content-visibility: auto` på seksjonene; det ga stabilt 98, men fikk menylenken «Kontakt» til å
lande feil første gang. Jeg tok det derfor bort.

Ingen `wrangler`-innlogging og ingen ekte deploy.

## Skjermbilder

Helsidebilder i `docs/skjermbilder/`, tatt med `npm run skjermbilder` (PC 1440 px, mobil 390 px):

| Side | PC lys | PC mørk | Mobil lys | Mobil mørk |
|---|---|---|---|---|
| Forside | [lys](skjermbilder/hengsel-forside-desktop-lys.png) | [mørk](skjermbilder/hengsel-forside-desktop-mork.png) | [lys](skjermbilder/hengsel-forside-mobil-lys.png) | [mørk](skjermbilder/hengsel-forside-mobil-mork.png) |
| Personvern | [lys](skjermbilder/hengsel-personvern-desktop-lys.png) | [mørk](skjermbilder/hengsel-personvern-desktop-mork.png) | [lys](skjermbilder/hengsel-personvern-mobil-lys.png) | [mørk](skjermbilder/hengsel-personvern-mobil-mork.png) |
| 404 | [lys](skjermbilder/hengsel-404-desktop-lys.png) | [mørk](skjermbilder/hengsel-404-desktop-mork.png) | [lys](skjermbilder/hengsel-404-mobil-lys.png) | [mørk](skjermbilder/hengsel-404-mobil-mork.png) |

## Avvik fra designet

Sammenlignet med `docs/design/hengsel/screenshots/` og koden i `.dc.html`-filene. `Oversikt.dc.html` kunne ikke rendres
her: prototypen henter React fra unpkg.com, som er stengt i byggemiljøet.

1. **Familiekomponentene erstatter Hengsel-designets egne deler** (som bestillingen ba om). Dette gir tre synlige
   forskjeller:
   - Symbolet i familiebåndet er SN Group-symbolet (rommet sett ovenfra, med bue i aksentfarge). `Bunn.dc.html` har et
     annet symbol (fylt kvadrat med avrundede hjørner).
   - Plantegningen i kontaktdelen er familiens entré (`Plantegningsstrek rom="entre"`, toppen viser «Entré · 1:50» og
     «2 800 × 2 400 mm»). `Plantegning Entre.dc.html` har en egen tegning med koordinater (x/y i mm) som følger musa;
     de er ikke med.
   - 404 bruker samme entré med stiplede vegger og «404 / Finnes ikke», i stedet for Hengsel-designets egen tegning.
2. **Kontrast:** tre farger er mørkere enn i designsystemet for å nå 4,5:1:
   - dempet hjelpetekst (`--soft`) #8A7F72 → #6E6355
   - tekst i info-piller #5074A9 → #43649A
   - tekst i ok-piller #3F7A52 → #376C49

   Mørk modus er uendret.
3. **«CRM» i logoen** er tegnet som SVG-tekst i stedet for HTML-tekst. Utseendet er det samme, men Lighthouse slutter å
   måle kontrasten på logoen (56 % opasitet, logoer er unntatt i WCAG).
4. **Skrift:** Newsreader og Inter i stedet for Reckless og TWK Lausanne, som bestilt. Logoordet bruker Inter 350.
5. **Enhetsrammene** skaleres med CSS (container-enheter) i stedet for `zoom`, og statuslinjen (07.52 ••• ▮) ligger over
   skjermbildet i telefonen. Størrelsene følger designet (856/1180/390/816 px), men kan avvike med noen få piksler.
6. **Lysboksen** er et `<dialog>`-element med bildet som `<img>`, ikke bakgrunnsbilde. Escape og klikk lukker den.
7. **Heroen** stopper også når musa eller fokus er på bildet (WCAG 2.2.2 om innhold som bytter av seg selv). Ellers som
   designet.
8. **Personvernsiden** bruker familiemalen. Lenkene i teksten er understreket i tekstfarge, ikke blå.
9. **Lys og mørk modus** følger systemet. `?tema=lys|mork` fra prototypen finnes ikke på den ferdige siden.

## Filer

- **Nytt i `packages/design/src/components/`:** `Toppfelt.astro`, `Plantegningsstrek.astro`, `Familiebaand.astro`,
  `IkkeFunnet.astro`.
- **Endret i designpakken:** `PrivacyPage.astro` og `types.ts` (valgfrie felt).
- **`sites/hengsel/src/`:**
  - `pages/`: `index.astro`, `personvern.astro`, `404.astro`
  - `layouts/Side.astro`
  - `components/`: `HengselLogo.astro`, `Enhet.astro`, `Bunn.astro`
  - `content/`: `forside.ts`, `personvern.ts`, `selskap.ts`
  - `scripts/`: `forside.ts`, `enhet.ts`, `bilder.ts`
  - `styles/`: `tokens.css`, `hengsel.css`
- **`sites/hengsel/public/img/`:** de 35 skjermbildene fra `docs/design/hengsel/img/`.
- **`scripts/sjekk-lenker.mjs`:** sjekker også skjermbildene fanene bytter inn, og alle filene i `img/`.
- **`scripts/skjermbilder.mjs`:**
  - tar skjermbilder av hengsel.no og sjekker fanene, `crm-tour` og skriftene
  - godtar elementer inne i en egen rulleboks (stegrekka i Kundereisen) i 360 px-sjekken

## Før hengsel.no flyttes fra Lovable

1. Opprett Worker «hengsel» etter `docs/hosting.md`, og koble domenene `hengsel.no` og `www.hengsel.no`.
2. Avklar om «Sist oppdatert» på personvernsiden skal stå som 4. oktober eller settes til datoen siden flyttes.
3. Del 3 (sngroup.no) kan ta i bruk familiekomponentene som nå ligger i designpakken.

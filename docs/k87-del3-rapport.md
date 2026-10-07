# K-87 del 3 – sngroup.no etter Claude Design, med familiegrepene

**Dato:** 07.10.2026
**Fasit:** `docs/design/sngroup/` (eksport fra Claude Design, commit 18f24a3, godkjent av Eirik 07.10.2026)
**Gren:** `claude/k87-del3`. Ikke flettet til `main`; det skjer når Eirik har sett forhåndsvisningen og skriver
«flett del 3».

## Forhåndsvisning

Workers Builds laster opp grenen som en forhåndsversjon av Worker «sngroup». Med Cloudflares regel for grennavn blir
adressen:

**https://claude-k87-del3-sngroup.drift-697.workers.dev**

Jeg har ikke fått sjekket adressen herfra (byggemiljøet når ikke Cloudflare). Den forutsetter to ting:

- «Preview URLs» er slått på for Worker «sngroup».
- Kommandoen for forhåndsversjoner er `npx wrangler versions upload -c sites/sngroup/wrangler.jsonc`.

Finnes ikke adressen, står den riktige under Worker «sngroup» → Deployments, ved bygget for grenen `claude/k87-del3`.

## Hva er bygd

Endringene 1–6 i `docs/design/sngroup/Endringer.md`:

1. **Innholdsbredde 1180 px:** `--bredde: 1180px` i `packages/design/src/styles/tokens.css` (var 1200). Sidemargene er
   uendret. Gjelder også byggem.no. hengsel.no hadde 1180 fra før.
2. **Rekkefølge og «byggEM»:** Kjøkken og interiør, Hengsel, byggEM, Eiendom, Investeringer.
   - «byggEM» i chip, rad og plantegning (`aria-label` «Verksted 7,2 m²: byggEM»).
   - «byggEM AS» i teksten. Ellers er teksten uendret.
3. **Familiebånd** over bunnteksten på alle sider (`Familiebaand gjeldende="sngroup.no"`).
   - «En del av SN Group» er tatt ut av bunnteksten (`visDelAv={false}`) på sngroup.no og byggem.no. hengsel.no har egen
     bunntekst uten linjen.
4. **404:** `IkkeFunnet` med etiketten «404», «Dette rommet finnes ikke.», et tomt rom i plantegningsstrek og
   «Til forsiden →».
5. **Toppfeltet:** `Toppfelt` erstatter `SiteHeader` på sngroup.no.
   - SN Group-logoen er 40 px høy, med lys og mørk utgave (`sites/sngroup/public/logo.svg` og `logo-mork.svg`, fra
     `docs/design/sngroup/assets/`).
   - Lenkene er Virksomheter og Hengsel, pluss «Kontakt».
   - Favikonet er byttet til `assets/favicon.svg`.
6. **Seksjonsrekkefølge:** hero → hva vi gjør (Virksomheter) → slik jobber vi (Hengsel) → kontakt, som før.

Plantegningen i heroen beholder strektykkelsene (6 / 3 / 1,2 px) og samspillet med chipene og radene. Telefonen er
uendret (teksten stemmer med `Telefon.jsx`).

### /design

- SiteHeader-eksempelet er erstattet av den nye seksjonen **«Familiegrep»** («Ett hus, flere *rom*.»).
- Seksjonen viser Toppfelt, Plantegningsstrek (huset, Entré, Verksted), Familiebånd og 404, hver i fargene til
  sngroup.no, hengsel.no og byggem.no.
- Fargene for hengsel og byggem er verdiene fra `Design.dc.html`, satt som klasser (CSP tillater ikke `style`-attributter).
- Teksten om SiteFooter er oppdatert («Bunnteksten under familiebåndet …»).
- Seksjonene veksler som i designet: Farger (flate), Skrift, Familiegrep (flate), Komponenter.

### Familiekomponentene (fra del 4, justert, ikke laget på nytt)

| Komponent | Justering i del 3 |
|---|---|
| `Toppfelt` | Standard er nå sngroup-utgaven: 20 px luft over og under, kontaktknappen som `.pill` (18 px sidemarg). Ny `kompakt` gir hengsel.no sin faste høyde på 64 px; hengsel.no bruker den |
| `IkkeFunnet` | Knappen «tekst» er lik `.pill.solid` (15 px, ramme). Ny `som="eksempel"` lager `<div>` og tittel uten `<h1>`, så /design ikke får to hovedområder. Klassen kolliderte med `oppsett="side"`; rettet til `som-…` |
| `Plantegningsstrek` | Uendret, stemmer med `Plantegningsstrek.dc.html` |
| `Familiebaand` | Uendret, stemmer med `Familiebaand.dc.html` |

Komponentene bruker fortsatt bare de semantiske variablene fra Endringer.md.

### byggem.no (skjelettet)

- Familiebåndet ligger over bunnteksten, og «En del av SN Group» er tatt ut av bunnteksten.
- 404 er `IkkeFunnet` («Dette rommet finnes ikke.»).
- Alt er i SN-fargene til del 5 kommer. Toppfeltet er fortsatt `SiteHeader`; det er ikke en del av denne bestillingen.

### hengsel.no er uendret

Alle 12 skjermbildene av hengsel.no (forside, personvern og 404; PC og mobil; lys og mørk) er tatt på nytt etter
endringene og er **byte-identiske** med bildene fra del 4 (md5).

## Skrifter som faktisk er brukt

Målt i Chromium på forsiden. Begge familiene er selvhostet fra npm (`@fontsource-variable/newsreader` og
`@fontsource-variable/inter`), latin-delsett. Ingen forespørsler til jsDelivr, Google Fonts eller andre nettsteder.

| Familie | Fil | Bruk |
|---|---|---|
| Newsreader Variable (normal) | `newsreader-latin-wght-normal.woff2` | Overskrifter (300 og 400) |
| Newsreader Variable (kursiv) | `newsreader-latin-wght-italic.woff2` | Aksentord («*hjem*», «*virksomhet*», «*Hengsel*») |
| Inter Variable (normal) | `inter-latin-wght-normal.woff2` | All annen tekst (400, 500, 600) |

Logoen er konturer (SVG), ikke tekst.

## Kvalitet

| Sjekk | Resultat |
|---|---|
| `npm run build` | Grønt for alle tre. `csp-hasher.mjs` la inn ny stilhash i `dist/_headers` for hvert nettsted |
| `npm test` | 143 forespørsler, 0 feil. Alle interne lenker og ankre svarer 200, og ukjente sider får 404-siden |
| `npx wrangler deploy --dry-run -c sites/<navn>/wrangler.jsonc` | OK for sngroup (29 filer), hengsel (59) og byggem (22). Ingen bindinger. Ingen innlogging, ingen ekte deploy |
| `npm run skjermbilder` | 0 feil. Alle sider på alle tre nettstedene ved 360 px, lys og mørk: ingen vannrett rulling og ingen konsollfeil (CSP gjelder). Plantegningen, chipene og radene henger sammen. Ingen eksterne kall, ingen informasjonskapsler |
| Lighthouse, forsiden mobil (3 kjøringer) | Ytelse 99, tilgjengelighet 100, beste praksis 100, SEO 100. LCP 1,9–2,0 s, TBT 0 ms, CLS 0,003 |
| Kontrast og WCAG (axe, 2 A/AA) | Ingen brudd på sngroup.no (/, /personvern, /design, 404) og byggem.no (/, /personvern, 404), lys og mørk, 1440 og 360 px |
| `data-theme` | `data-theme="dark"` eller `"light"` på `<html>` overstyrer systemvalget, også for logoen |

Axe fant ett brudd som også fantes før del 3: kontrasttabellen på /design ruller sidelengs ved 360 px, men kunne ikke nås
med tastaturet. Den har nå `tabindex="0"`, `role="region"` og en etikett.

## Skjermbilder

Helsidebilder i `docs/skjermbilder/` (PC 1440 px, mobil 390 px), tatt med `npm run skjermbilder`. Skriptet tar nå også
personvern og 404 for sngroup.no.

| Side | PC lys | PC mørk | Mobil lys | Mobil mørk |
|---|---|---|---|---|
| Forside | [lys](skjermbilder/forside-desktop-lys.png) | [mørk](skjermbilder/forside-desktop-mork.png) | [lys](skjermbilder/forside-mobil-lys.png) | [mørk](skjermbilder/forside-mobil-mork.png) |
| Personvern | [lys](skjermbilder/personvern-desktop-lys.png) | [mørk](skjermbilder/personvern-desktop-mork.png) | [lys](skjermbilder/personvern-mobil-lys.png) | [mørk](skjermbilder/personvern-mobil-mork.png) |
| /design | [lys](skjermbilder/design-desktop-lys.png) | [mørk](skjermbilder/design-desktop-mork.png) | [lys](skjermbilder/design-mobil-lys.png) | [mørk](skjermbilder/design-mobil-mork.png) |
| 404 | [lys](skjermbilder/404-desktop-lys.png) | [mørk](skjermbilder/404-desktop-mork.png) | [lys](skjermbilder/404-mobil-lys.png) | [mørk](skjermbilder/404-mobil-mork.png) |

## Avvik fra designet

Sammenlignet med `docs/design/sngroup/screenshots/` og koden i `.dc.html`-filene. Prototypen kunne ikke rendres her:
`support.js` henter React fra unpkg.com, og skriftene kommer fra jsDelivr; begge er stengt i byggemiljøet.

1. **byggem-eksemplene på /design** viser reserveskriften (Helvetica Neue / Arial) i stedet for Poppins. Poppins er ikke
   installert ennå og kommer med byggem.no i del 5.
2. **Eksemplene på /design** bruker fargene fra `Design.dc.html`. For hengsel er det `--tekst-dempet` med 74 % dekning;
   hengsel.no bruker selv #5E564C (fra del 4). Forskjellen er knapt synlig.
3. **Toppfelt-eksemplene for hengsel og byggem** viser ordmerket i tekst, som i designet. Den ekte hengsel.no har
   Hengsel-logoen og den blå «Be om demo»-knappen.
4. **404-eksemplene på /design** har tittelen i et `<p>` med samme stil som `<h1>`, så siden bare har én hovedoverskrift.
5. **Logoene** inneholder fortsatt C2PA-metadata fra eksporten (rundt 9 kB per fil). Jeg har latt dem stå.
6. **Toppfeltet på byggem.no** er fortsatt `SiteHeader`. Det kommer i del 5.

Ingen nye påstander, tall eller kunder. Den eneste tekstendringen er «byggEM».

## Filer

- **`packages/design/src/`:**
  - `styles/tokens.css` (1180 px)
  - `components/Toppfelt.astro` (`kompakt`, knappen)
  - `components/IkkeFunnet.astro` (`som`, knappen, rettet klasse)
- **`sites/sngroup/`:**
  - `src/layouts/Side.astro` (Toppfelt, Familiebaand)
  - `src/components/Logo.astro` (ny)
  - `src/pages/404.astro`
  - `src/pages/design.astro` (Familiegrep)
  - `src/content/virksomheter.ts` (byggEM)
  - `public/logo.svg`, `public/logo-mork.svg`, `public/favicon.svg`
- **`sites/byggem/src/`:** `layouts/Side.astro` og `pages/404.astro`.
- **`sites/hengsel/src/layouts/Side.astro`:** `kompakt` på toppfeltet. Utseendet er uendret.
- **`scripts/skjermbilder.mjs`:** personvern og 404 for sngroup.no.

## Neste steg

1. Eirik ser forhåndsvisningen og skriver «flett del 3».
2. Da flettes `claude/k87-del3` til `main`, og Worker «sngroup» publiserer sngroup.no.

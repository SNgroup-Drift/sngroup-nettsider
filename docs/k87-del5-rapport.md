# K-87 del 5 – byggem.no etter Claude Design

**Dato:** 07.10.2026
**Fasit:** `docs/design/byggem/` (eksport fra Claude Design, commit d2671eb, godkjent av Eirik 07.10.2026)
**Gren:** `claude/k87-del5`, bygd fra `main` (9f3ea03). Ikke flettet til `main`; det skjer når Eirik skriver
«flett del 5».

## Forhåndsvisning

Workers Builds laster opp grenen som en forhåndsversjon av Worker «byggem». Med Cloudflares regel for grennavn blir
adressen:

**https://claude-k87-del5-byggem.drift-697.workers.dev**

Jeg har ikke fått sjekket adressen herfra, fordi byggemiljøet ikke når Cloudflare. Den forutsetter at «Preview URLs» er
slått på for Worker «byggem», og at kommandoen for forhåndsversjoner er
`npx wrangler versions upload -c sites/byggem/wrangler.jsonc`. Finnes ikke adressen, står den riktige under
Worker «byggem» → Deployments.

## Hva er bygd

### Sider (`sites/byggem/src/pages/`)

| Side | Innhold |
|---|---|
| `/` | Hero med `Plantegningsstrek rom="verksted"`, «Hva vi gjør» (forhandlere og entreprenører, snekker), Tjenester (5 kort), «Slik jobber vi» (4 steg), Referanser (3 nøkkeltall og 3 prosjekter), kontaktbånd |
| `/prosjekter` | Toppen, tabellen med 6 prosjekter (ruller sideveis på mobil og kan nås med tastatur), 6 prosjektkort med «Bilde kommer», kontaktbånd |
| `/kontakt` | «Be om pris» med skjemaet og kontaktboksen |
| `/personvern` | Familiens personvernmal med dagens tekst og de to godkjente endringene |
| 404 | `IkkeFunnet`: tomt rom i plantegningsstrek, «404», «Dette rommet finnes ikke.» og «Til forsiden →». Ukjente adresser gir status 404 med denne siden |

- **Teksten:** tjenester, steg, nøkkeltall, referanser, prosjekter og skjemavalg er hentet maskinelt fra
  `.dc.html`-filene til `src/content/innhold.ts`. Teksten er derfor ordrett, også merkenavnene i referansene (Sigdal,
  HTH), som står på dagens side.
- **Menyen:** Tjenester, Slik jobber vi, Prosjekter og «Be om pris».
  - På mobil (under 860 px) er det ingen hamburgermeny, bare logo, Prosjekter og «Be om pris».
  - Prosjekter og «Be om pris» er markert når du står på siden (`aria-current="page"`).
- **Bunnen:** familiebåndet (`Familiebaand gjeldende="byggem.no"`) og bunnteksten, Mørkbrun i begge moduser.
  - Bunnteksten viser «976 06 500 · post@byggem.no · byggem.no», «Vi jobber i Trondheim og omegn.», Personvern og
    «byggEM AS · org.nr. 932 104 148» med liten o.
  - Ingen gateadresse.
- **Logo:** positiv på lyse flater og negativ på mørke. Toppfeltet bytter med lys/mørk modus, mens båndet og bunnen alltid
  bruker den negative.
  - Det finnes ingen SVG (bare PDF), så PNG-filene er skalert ned til 2x (224 × 64) for visning i 32 px høyde. Filene ble
    gått fra 44–50 kB til 11–12 kB.
- **Favicon, apple-touch-icon og delingsbilde** kommer fra `docs/design/byggem/assets/`.
  - `og:image` er `https://byggem.no/delingsbilde.png`.
  - `og:description` er den korte teksten fra designet.

### Kontaktskjemaet

- **Felt og valg som i designet:** Navn \*, Firma, Telefon \*, E-post \*, «Hva gjelder det? \*» (Velg type oppdrag,
  Montering av kjøkken, Bad eller garderobe, Innredning og kontor, Leie av montører, Mindre snekkeroppdrag, Annet),
  Sted for jobben, Beskrivelse \* og samtykke.
- **Feilmeldingene er som i designet:**
  - «Skriv navnet ditt.»
  - «Skriv et telefonnummer vi kan ringe.»
  - «Skriv en gyldig e-postadresse.»
  - «Velg hva det gjelder.»
  - «Skriv kort hva jobben gjelder.»
  - «Kryss av for å sende.»

  Fokus flyttes til første feil, og feltene får `aria-invalid`.
- **«Send henvendelse»** åpner en ferdig utfylt e-post til post@byggem.no (mailto). Testet: emnet blir «Be om pris –
  Leie av montører», og innholdet har navn, telefon, e-post, «Gjelder», sted og beskrivelsen.
- **Ingenting sendes til en server.** Uten JavaScript gjør skjemaet ingenting (`method="dialog"`).
- **CSP:** skriptet ligger i `<script>` i `kontakt.astro` og bundles til egen fil, så `script-src 'self'` holder.

### Personvern (godkjent av Eirik 07.10)

Teksten er ordrett fra dagens side (`docs/kilde/byggem.no/filer/assets/personvern-*.js`), med post@byggem.no som kontakt
og to endringer:

- **«Hva vi samler inn»:** «Skjemaet lagrer ingenting selv. Det fyller ut en e-post til post@byggem.no i ditt eget
  e-postprogram, med navn, firma hvis oppgitt, telefon, e-post, hva henvendelsen gjelder, sted hvis oppgitt og
  beskrivelsen du skriver. Vi får opplysningene først når du sender e-posten.»
- **«Informasjonskapsler», nytt avsnitt etter dagens setning:** «Nettsiden driftes hos Cloudflare, og domenet er
  registrert hos Domeneshop. Cloudflare fører tekniske logger med blant annet IP-adresse og tidspunkt, som brukes til
  drift og sikkerhet. Skriftene ligger på vår egen server.»

Siden viser ingen dato, verken i dag eller i designet, så «Sist oppdatert» er ikke lagt til.

### Familiekomponentene (fra del 3 og 4, justert, ikke laget på nytt)

| Komponent | Endring i del 5 | Påvirker sngroup/hengsel? |
|---|---|---|
| `Toppfelt` | Lenker kan ha `aktiv` (aria-current, aksent og understrek) og `mobil` (blir stående på smal skjerm). Nytt brytepunkt 860 px og `kontaktAktiv`. Høyde, mellomrom, lenkefarge/-vekt og knappemål kan settes med CSS-variabler (`--toppfelt-*`), med dagens verdier som standard | Nei |
| `BaseLayout` | Valgfri `og:description`, `og:image`, favikon, apple-touch-icon, temafarge og hvilke skrifter som forhåndslastes. Skriftimporten (`fonts.css`) er flyttet ut til sngroup.no og hengsel.no, så byggem.no ikke laster Newsreader | Nei |
| `Plantegningsstrek`, `Familiebaand`, `IkkeFunnet` | Uendret. byggem.no setter fargene med semantiske variabler | Nei |

### Farger og skrift

- **Farger:** `sites/byggem/src/styles/tokens.css` setter byggEM-fargene som familiens semantiske variabler (lys og
  mørk). Mørk modus følger `prefers-color-scheme`, og `data-theme` på `<html>` overstyrer. Temabyttet trenger derfor ikke
  skript.
- **Komponenter:** `sites/byggem/src/styles/byggem.css` har knapper, eyebrow, typografi og seksjoner fra
  byggEM-designsystemet (prefiks `b-`).

## Skrifter som faktisk er brukt

Målt i Chromium (nettverk). Alt er selvhostet fra npm, latin-delsett. Ingen Google Fonts, og ingen Newsreader på
byggem.no.

| Familie | Pakke | Filer som hentes | Bruk |
|---|---|---|---|
| Poppins 300 | `@fontsource/poppins` | `poppins-latin-300-normal.woff2` | Display og h1 |
| Poppins 400 | `@fontsource/poppins` | `poppins-latin-400-normal.woff2` (der h2 brukes) | h2 |
| Poppins 500 | `@fontsource/poppins` | `poppins-latin-500-normal.woff2` | h3, prosjektnavn |
| Inter Variable | `@fontsource-variable/inter` | `inter-latin-wght-normal.woff2` | All løpende tekst (400, 500, 600) |

Poppins 300 og Inter forhåndslastes.

## Kvalitet

| Sjekk | Resultat |
|---|---|
| `npm run build` | Grønt for alle tre. `csp-hasher.mjs` la inn stilhashen i `dist/_headers` |
| `npm test` | 149 forespørsler, 0 feil. byggem.no: 22 interne adresser (/, /prosjekter, /kontakt, /personvern) svarer 200, og ukjente sider får 404-siden |
| `npx wrangler deploy --dry-run -c sites/<navn>/wrangler.jsonc` | OK for sngroup (29 filer), hengsel (59) og byggem (30). Ingen innlogging, ingen ekte deploy |
| `wrangler dev` (byggem, lokalt) | `/` 200 med HSTS, X-Frame-Options og CSP med stilhashen. `/prosjekter`, `/kontakt` og `/personvern` 200. `/finnes-ikke` 404 med 404-siden. Alle 5 bildene (logoer, favicon, apple-touch-icon, delingsbilde) 200 |
| `npm run skjermbilder` | 0 feil. Alle sider på alle tre nettstedene ved 360 px, lys og mørk: ingen vannrett rulling og ingen konsollfeil (CSP gjelder) |
| Lighthouse, forsiden mobil (3 kjøringer) | Ytelse 100, tilgjengelighet 100, beste praksis 100, SEO 100. LCP 1,6 s, TBT 0 ms, CLS 0 |
| Kontrast og WCAG (axe, 2 A/AA) | Ingen brudd på de fem sidene, lys og mørk, 1440 og 360 px. Også testet med feilmeldingene synlige |
| Eksterne kall | Ingen: siden henter bare fra egen server. Ingen informasjonskapsler, ingen sporing |
| Redusert bevegelse | Overgangene (150 ms på farge) slås av ved `prefers-reduced-motion` |
| **sngroup.no og hengsel.no** | **Uendret.** Alle 28 skjermbildene (sngroup 16, hengsel 12) er tatt på nytt og er byte-identiske med bildene fra `main` (md5) |

## Skjermbilder

Helsidebilder i `docs/skjermbilder/` (PC 1440 px, mobil 390 px), tatt med `npm run skjermbilder`:

| Side | PC lys | PC mørk | Mobil lys | Mobil mørk |
|---|---|---|---|---|
| Forside | [lys](skjermbilder/byggem-forside-desktop-lys.png) | [mørk](skjermbilder/byggem-forside-desktop-mork.png) | [lys](skjermbilder/byggem-forside-mobil-lys.png) | [mørk](skjermbilder/byggem-forside-mobil-mork.png) |
| Prosjekter | [lys](skjermbilder/byggem-prosjekter-desktop-lys.png) | [mørk](skjermbilder/byggem-prosjekter-desktop-mork.png) | [lys](skjermbilder/byggem-prosjekter-mobil-lys.png) | [mørk](skjermbilder/byggem-prosjekter-mobil-mork.png) |
| Kontakt | [lys](skjermbilder/byggem-kontakt-desktop-lys.png) | [mørk](skjermbilder/byggem-kontakt-desktop-mork.png) | [lys](skjermbilder/byggem-kontakt-mobil-lys.png) | [mørk](skjermbilder/byggem-kontakt-mobil-mork.png) |
| Personvern | [lys](skjermbilder/byggem-personvern-desktop-lys.png) | [mørk](skjermbilder/byggem-personvern-desktop-mork.png) | [lys](skjermbilder/byggem-personvern-mobil-lys.png) | [mørk](skjermbilder/byggem-personvern-mobil-mork.png) |
| 404 | [lys](skjermbilder/byggem-404-desktop-lys.png) | [mørk](skjermbilder/byggem-404-desktop-mork.png) | [lys](skjermbilder/byggem-404-mobil-lys.png) | [mørk](skjermbilder/byggem-404-mobil-mork.png) |

## Avvik fra designet

Sammenlignet med koden i `.dc.html`-filene. `Oversikt.dc.html` og prototypen kunne ikke rendres her: `support.js` henter
React fra unpkg.com og skriftene fra Google Fonts, og begge er stengt i byggemiljøet. Eksporten har ingen
skjermbildemappe.

1. **Lenker på Kalk-flaten** («Se montasjetjenester», «Se snekkeroppdrag», «Se alle prosjekter») er #8A4A27 (Tegl-hover)
   i stedet for Tegl #A25A32. Tegl gir bare 4,3:1 mot Kalk. Store tall og knapper er fortsatt Tegl.
2. **Logoen** er en nedskalert PNG (224 × 64), ikke originalfilen på 640 px. Den ser lik ut i 32 px høyde. Det finnes
   ingen SVG; en SVG laget fra PDF-en ville gitt skarpest resultat.
3. **«Be om pris» i toppfeltet** dempes ved hover (88 % opasitet, familiens toppfelt) i stedet for å bli mørkere Tegl.
4. **Knappen på 404** er familiens knapp (minst 44 px, samme tekst og farge), ikke designsystemets 48 px-knapp med 17 px
   tekst. Forskjellen er noen få piksler.
5. **Personvern** bruker familiens mal. Linjen under ingressen er «Behandlingsansvarlig: byggEM AS» og
   «Kontakt: post@byggem.no» som to ledd med luft mellom, ikke med « · ».
6. **Temabyttet** gjøres i CSS (`prefers-color-scheme`, og `data-theme` overstyrer), ikke med skript som i prototypen.
   Resultatet er det samme, uten skript.
7. **Skjemaet** har to tilgjengelighetstillegg: fokus flyttes til første feil, og feilmeldingene er koblet til feltene
   med `aria-describedby`.

Ingen nye påstander, tall, kunder eller prosjekter.

## Filer

- **`sites/byggem/src/`:**
  - `pages/`: `index.astro`, `prosjekter.astro`, `kontakt.astro`, `personvern.astro`, `404.astro`
  - `layouts/Side.astro`
  - `components/`: `Logo.astro`, `Kontaktbaand.astro`, `Bunn.astro`
  - `content/`: `innhold.ts`, `selskap.ts`, `personvern.ts`
  - `styles/`: `tokens.css`, `byggem.css`
- **`sites/byggem/public/`:**
  - `logo-positiv.png`, `logo-negativ.png`, `favicon.png`, `apple-touch-icon.png`, `delingsbilde.png`
  - `sitemap.txt` (med /prosjekter og /kontakt)
  - `favicon.svg` er fjernet
- **`sites/byggem/package.json`:** `@fontsource/poppins` og `@fontsource-variable/inter`.
- **`packages/design/src/components/`:** `Toppfelt.astro` og `BaseLayout.astro` (se tabellen over).
- **`sites/sngroup` og `sites/hengsel`:** `layouts/Side.astro` importerer `@sngroup/design/fonts.css`. Utseendet er
  uendret.
- **`scripts/skjermbilder.mjs`:** tar skjermbilder av byggem.no og sjekker alle fem sidene ved 360 px.
- **`README.md`:** tabellen over nettstedene og skriftene er oppdatert.

## Neste steg

1. Eirik ser forhåndsvisningen og skriver «flett del 5».
2. Da flettes `claude/k87-del5` til `main`, og Worker «byggem» publiserer byggem.no.
3. Når domenet `byggem.no` er koblet til Worker «byggem», kan siden i Lovable slås av.

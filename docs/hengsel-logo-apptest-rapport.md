# hengsel.no · ny logo, Hengsel CRM og Hengsel Ute side om side, nytt /apptest (09.10.2026)

Gren: `claude/ecstatic-brown-9dmp27`, laget fra `main` (`e2d4f33`). Ingen deploy, ingenting pushet til main.

## Skjermbilder før og etter

Alle i `docs/skjermbilder/`. «Før» er `main` slik den var før endringene; «etter» er denne grenen, tatt med
`npm run skjermbilder` (1440 px og 390 px, lys og mørk). Skjermbildene av appen i «etter» er **plassholdere**: de elleve
telefonbildene som allerede lå i `public/img` (hengsel-i-dag-a … hengsel-ferdig-b), lagt midlertidig i
`public/skjermbilder/` som `ute-01-i-dag.webp` … `ute-11-ferdig-2.webp` bare for skjermbildene. De er ikke med i
grenen; Eirik legger de ekte filene der.

| Side | Før | Etter (lys) | Etter (mørk) |
|---|---|---|---|
| Forsiden, PC 1440 | `hengsel-for-forside-desktop.png` | `hengsel-forside-desktop-lys.png` | (forsiden er låst til lys) |
| Forsiden, telefon 390 | `hengsel-for-forside-mobil.png` | `hengsel-forside-mobil-lys.png` | (låst til lys) |
| /apptest, PC 1440 | `hengsel-for-apptest-desktop.png` | `hengsel-apptest-desktop-lys.png` | `hengsel-apptest-desktop-mork.png` |
| /apptest, telefon 390 | `hengsel-for-apptest-mobil.png` | `hengsel-apptest-mobil-lys.png` | `hengsel-apptest-mobil-mork.png` |
| /apptest bak passordet, iPhone (del 1 fremhevet) | `apptest-mobil-lys-snart.png` (slettet) | `apptest-mobil-lys-todo.png` | `apptest-mobil-mork-todo.png` |
| /apptest bak passordet, PC | `apptest-desktop-lys-snart.png` (slettet) | `apptest-desktop-lys-todo.png` | `apptest-desktop-mork-todo.png` |

Forsiden før: Studio Display-ramme og telefonrammer, runde knapper, kort med radius 14 px og skygge, og den gamle
logoen (to skapdører med «CRM»). Etter: den nye logoen i sidehodet, Hengsel CRM og Hengsel Ute side om side under
ingressen (hver med sin logo, tekst, lenke og skjermbilde uten ramme), skjermbildene av appen i naturlig størrelse, alt
med rette hjørner og uten skygger.

## Det som er gjort

### Logoen og favikonene

- `sites/hengsel/src/components/HengselLogo.astro` er skrevet om til logopakkens markering (`hengsel-logo-*.svg`,
  `hengsel-crm-logo-*.svg`, `hengsel-ute-logo-*.svg`), inline. Logofilene har ordet som `<text>` i TWK Lausanne, og en
  `<img>` kan ikke bruke sidens skrift, så SVG-en ligger i HTML-en og `text` får `font-family: var(--font-tekst)`.
  Prop `produkt="crm" | "ute"` gir produktnavnet under ordet med haken over; `hoyde` er høyden i px (34 i sidehodet,
  48 på forsiden).
- Fargene som skifter med bakgrunnen er to variabler i `tokens.css`: `--merke-skap` (Beige 1 på lys bunn, Krem #F2E9DB
  på mørk) og `--merke-ord` (Warm Black / Off White). Vater, grep, ovn og hake er faste, som i filene.
- **Merk om filnavnene:** oppdraget sier «hengsel-logo-mork.svg på lys bunn, -lys på mørk». I filene er det omvendt:
  `-lys` har Warm Black-tekst og Beige 1-skap (for lys bunn), `-mork` har Off White-tekst og Krem-skap (for mørk bunn),
  og LES-MEG.md sier det samme («-lys – lys bakgrunn»). Jeg har fulgt filene, ellers ville ordet blitt usynlig.
- Favikonsettet fra `docs/design/hengsel/logo/`: `favicon.svg` (byttet), `favicon-32.png`, `favicon-192.png` og
  `apple-touch-icon-180.png` i `sites/hengsel/public/`. `BaseLayout.astro` har fått prop `ikoner` (liste med PNG-ikoner);
  `Side.astro` og passordsiden sender inn settet og `appleIkon`. C2PA-metadataene (10 kB per SVG, Anthropics
  innholdsmerking) er tatt ut av SVG-ene som ligger på nettstedet; kildene i `docs/design/hengsel/logo/` er urørt.
- App-ikonet på /apptest er logopakkens `hengsel-app-ikon-lys/-mork.svg` (`public/img/`), byttet etter fargemodus med
  `<picture>`. Det gamle `hengsel-ute-ikon.svg` er slettet.
- `theme-color` står fortsatt som sidens bakgrunn (Off White / #1B1713), ikke Deep Blue som LES-MEG foreslår, så
  adressefeltet følger siden som før. Lett å bytte i `Side.astro` hvis Deep Blue er ønsket.

### Profilen: kvadratiske hjørner, ingen skygger, Reckless fra 20 px

- `tokens.css`: alle radiene (`--radius`, `-liten`, `-felt`, `-stor`, `-pille`) er 0, `--skygge` er `none`.
  `hengsel.css` peker `--r-*` og `--shadow` på dem, så knapper, kort, felt og piller blir kvadratiske overalt, også
  familiens komponenter (Toppfelt, IkkeFunnet, PrivacyPage).
- Alle faste radier i sidene og komponentene er fjernet (moduler, skjema, plantegningen, passordsiden, feilmeldingen,
  lukkeknappen i lysboksen, SN Group-symbolet i bunnen). Feilmeldingen på passordsiden har 3 px venstrekant i stedet for
  inset-skygge; feltfokus har 2 px Deep Blue-kant i stedet for glorie.
- Overskrifter: `--t-h3` er 1,25 rem (20 px) og er den minste størrelsen i Reckless. `h4`–`h6` settes i TWK Lausanne
  650. Bildetekstene under skjermbildene (mindre enn 20 px) er `<b>` i Lausanne 650.
- Enhetsrammene (`Enhet.astro`, Studio Display og telefon, med runde hjørner og skygge) er slettet sammen med
  `scripts/bilder.ts`. Skjermbildene vises rett på siden med 1 px linje. Lysboksen (klikk for å forstørre) er beholdt.

### Forsiden: Hengsel CRM og Hengsel Ute side om side

- Under ingressen står to kolonner (`.produkter`, to kolonner fra 860 px): Hengsel CRM (logo med «CRM», «Kontoret»,
  tekst fra FLOW, «Se modulene →», Min dag-skjermbildet) og Hengsel Ute (logo med «UTE», «Montøren», tekst, «Se appen →»,
  første skjermbilde av appen). Teksten ligger i `content/forside.ts` (`PRODUKTER`).
- Menyen: Hengsel CRM (#crm), Hengsel Ute (#ute), Moduler, Om oss. Rekkefølgen på siden: forside → slik henger det
  sammen → Hengsel Ute (skjermbildene) → moduler → integrasjoner → om oss → kontakt.
- Skjermbildene av appen: `src/lib/skjermbilder.ts` leser `public/skjermbilder/ute-*.webp` ved bygging, henter
  pikselmålene fra WebP-hodet (VP8, VP8L og VP8X) og setter `width` og `height` til **halve pikselbredden og -høyden**
  (bildene er 2×). Rekkefølgen er filnavnet sortert, så et tall først (`ute-01-i-dag.webp`) styrer rekkefølgen.
  Bildeteksten hentes fra `UTE_TEKST` i `content/forside.ts` på nøkkelen (filnavnet uten `ute-`, tall og `.webp`); mangler
  den, lages teksten av filnavnet (`ute-i-dag` → «I dag»). Seks nøkler er fylt på forhånd (i-dag, jobb, varer, ks, avvik,
  ferdig); resten er TODO for Eirik.
- Uten filer i `public/skjermbilder/` (slik grenen er nå) viser Ute-kolonnen øverst dagens `hengsel-i-dag-a.webp`
  (390 px), og galleriet sier «Skjermbildene av appen kommer.». Legg filene inn, bygg, og alt kommer av seg selv.
- Galleriet er `repeat(auto-fill, minmax(390px, 1fr))` med 5 px mellomrom, så tre bilder à 390 px går opp i 1180 px uten
  skalering. På telefon vises ett i bredden (bildet krymper til skjermbredden med `max-width: 100%`).

### /apptest med fire deler

`sites/hengsel/src/pages/apptest.astro` er skrevet om. Fire deler, hver med nummer, tittel, steg, knapp og en merknad:

1. **iOS** · iPhone og iPad, via TestFlight · `TESTFLIGHT_LENKE`
2. **Android via Google Play** · Internal testing i Play Butikk · `PLAY_LENKE`
3. **Android APK** · installasjonsfil uten Play Butikk · `APK_LENKE`
4. **Slik melder du feil** · Meg › Send feilrapport i appen (uten lenke)

- De tre lenkene står som `"TODO"` øverst i filen. Står en som TODO, viser delen en deaktivert knapp og «Lenken kommer.
  Du får den av den som inviterte deg.». Byttes den, blir knappen en lenke. Dokumentert i `docs/hosting.md`.
  **De gamle lenkene** (fra siden før) var `https://testflight.apple.com/join/MygfVe9U` og
  `https://play.google.com/apps/internaltest/4701475978909247435`; de kan limes rett inn hvis de fortsatt gjelder.
- Øverst: tittel, ingress, en linje som skriptet bytter ut («Du bruker iPhone eller iPad: følg del 1.» / «Du bruker
  Android: følg del 2 (Google Play) eller del 3 (APK).»), innholdsfortegnelse med de fire delene, og app-ikonet med
  Hengsel UTE-logoen. `scripts/apptest.ts` fremhever delen for din telefon (merket «Din telefon», mørk knapp). Uten
  skript vises delene likt.
- Demobrukerne (K-114), passordflaten og «Hvis noe ikke virker» er tatt ut, siden oppdraget sier fire deler.
  `Logg_inn_i_demoen.pdf` ligger fortsatt i `public/apptest/` (bak passordet), men lenkes ikke. Workeren er uendret;
  HTMLRewriter-reglene for demopassordet treffer bare ingenting nå.
- Passordet, informasjonskapselen, `noindex, nofollow`, sitemap og lenkesjekken er som før.

### Skript og dokumentasjon

- `scripts/skjermbilder.mjs`: /apptest er med i skjermbildene av hengsel.no (fra de statiske filene, uten passordet).
- `scripts/skjermbilder-apptest.mjs`: sjekkene følger den nye siden (del 1 for iPhone, del 2 og 3 for Android, ingen
  på PC, ingen uten skript; filene heter `apptest-*-todo` / `apptest-*-klar` etter lenkene). De gamle
  `apptest-*-snart/-klar.png` er slettet.
- `scripts/statisk-server.mjs`: `.webp` og `.pdf` får riktig Content-Type lokalt.
- `README.md` og `docs/hosting.md` er oppdatert (profilen, logoen, `public/skjermbilder/`, de tre lenkene).

## Kontroll

| Sjekk | Resultat |
|---|---|
| `npm run build` (alle nettstedene) | OK, CSP-hasher OK |
| `npm test` | 234 forespørsler, 0 feil. hengsel: 39 adresser, 40 bilder i img/, /apptest ikke lenket, ikke i sitemap, `noindex, nofollow` |
| `npm run skjermbilder` | 0 feil. Alle sider på alle nettstedene uten vannrett rulling ved 360 px og uten konsollfeil (CSP), lys og mørk; hengsel.no laster bare Reckless Standard M og TWK Lausanne 350/650, ingen eksterne forespørsler, ingenting i localStorage. Skjermbildene av sngroup.no, byggem.no og vis er tilbakestilt (bare pikselstøy) |
| `node scripts/skjermbilder-apptest.mjs` (wrangler dev, lokal `.dev.vars`) | 0 feil: passordsiden og feil passord, iPhone → del 1, Android → del 2 og 3, PC → ingen, uten skript → ingen, 360 px uten vannrett rulling, ingen konsollfeil, én informasjonskapsel med riktige flagg. axe hoppet over (axe-core ligger ikke i repoet) |
| Bygd HTML | `<img … width="390" height="844">` for 780 × 1688-filene; favikonene og apple-touch-icon i `<head>` |
| Bygg uten filer i `public/skjermbilder/` (slik grenen er) | OK: Ute-kolonnen viser `hengsel-i-dag-a.webp`, galleriet sier «Skjermbildene av appen kommer.», `npm test` 224 forespørsler, 0 feil |
| `npx wrangler deploy --dry-run -c sites/hengsel/wrangler.jsonc` | OK, binding `env.ASSETS` (ingen opplasting) |

## TODO for Eirik

1. Legg de elleve skjermbildene i `sites/hengsel/public/skjermbilder/` som `ute-*.webp` (2×). Tall først i navnet
   styrer rekkefølgen. Fyll `UTE_TEKST` i `src/content/forside.ts` for filnavn som ikke er dekket.
2. Sett inn `TESTFLIGHT_LENKE`, `PLAY_LENKE` og `APK_LENKE` øverst i `src/pages/apptest.astro`.
3. Si fra hvis `theme-color` skal være Deep Blue, og hvis demobrukerne skal tilbake på /apptest som en femte del.

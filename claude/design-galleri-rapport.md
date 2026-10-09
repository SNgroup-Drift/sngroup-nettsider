# Designgalleriet design.hengsel.no – rapport (09.10.2026)

Nytt nettsted `sites/design` på grenen `demo`: en forside som lister alle `docs/design/**/*.dc.html` i nummerrekkefølge
med tittel og dato, med den nye Hengsel-logoen, favicon-settet og noindex. Visningsrommet (`vis.hengsel.no`, Pages-prosjektet
`vis`, gren `main`, `sites/vis`) er ikke rørt.

## Gjort i repoet (gren `demo`, laget fra `main` e2d4f33)

| Fil | Hva |
|---|---|
| `sites/design/bygg.mjs` | Bygger `dist/`: forsiden, `docs/design/` → `dist/design/` (uten `uploads/` og zip), logo og ikoner fra `docs/design/hengsel/logo/`, skriftene fra `@fontsource-variable` |
| `sites/design/src/index.html`, `galleri.css` | Forsiden i Hengsel-profilen (samme tokens som `sites/vis`), lys og mørk modus, 1180 px, mobil |
| `sites/design/src/404.html`, `_headers`, `robots.txt` | 404, `X-Robots-Tag: noindex, nofollow`, sikkerhetshoder, `Disallow: /` |
| `sites/design/datoer.json` | Dato for siste commit per designfil (Pages-klonen er grunn, så git kan ikke brukes der) |
| `sites/design/README.md` | Oppbygning, rekkefølge, datoer, kommandoer |
| `docs/hosting.md` → «design» | Pages-oppskriften: prosjekt, Access, domene, i riktig rekkefølge |
| `README.md` | To nye rader i tabellen: vis.hengsel.no og design.hengsel.no |
| `scripts/sjekk-lenker.mjs` | Sjekker at alle designfilene svarer 200, men gjennomsøker ikke kanvasene (maler og eksterne skrifter) |
| `scripts/skjermbilder.mjs` | Hopper over `design`, som `vis` |

Grenen `demo` fantes ikke, verken lokalt eller på GitHub, så den er laget fra dagens `main`.

### Slik virker galleriet

- **Rekkefølge:** tallet foran filnavnet (`51 Hengsel nettside.dc.html`) styrer rekkefølgen innenfor gruppen; filer
  uten tall kommer etter, alfabetisk. Fire grupper: sngroup.no, hengsel.no, hengsel.no/apptest, byggem.no.
- **Tittel:** `<title>` fra fila (f.eks. «Hengsel – for kjøkken- og interiørbutikker»); mangler den, filnavnet uten tall.
  Filnavnet vises alltid under tittelen.
- **Dato:** siste commit som rørte fila (`git log -1 --format=%cs`). Lokalt skrives den til `datoer.json` ved bygg; i Pages
  leses `datoer.json`. Oppdater med `npm run datoer -w sites/design` når designfiler endres.
- **Logo:** `hengsel-logo-lys.svg` på lys bakgrunn og `hengsel-logo-mork.svg` i mørk modus (se avvik under).
- **Ikoner:** `favicon.svg`, `favicon-32.png`, `favicon-192.png`, `apple-touch-icon-180.png`, `maskable-512.png` og
  `site.webmanifest`, slik `docs/design/hengsel/logo/LES-MEG.md` beskriver, med `theme-color #5074A9`.
- **Designfilene** åpnes uendret under `/design/<mappe>/<fil>.dc.html`, med `_ds/`, `support.js`, `assets/` og `img/`
  ved siden av, som i repoet.

### Sjekket

- `npm run build` og `npm test`: 277 forespørsler, 0 feil. For design: forsiden, 404 og alle 33 designfilene svarer 200.
- Forsiden i 1440 px lys og 390 px mørk: fire grupper, 33 filer, nummer 51–53 først i hengsel.no, datoer 07.10 og 09.10.
- Forsiden og 404 har ingen skript, bare egne filer og skrifter fra `/fonts/` (CSP `script-src 'none'`).

## Avvik og ting å vite

1. **Logo-stien.** Oppgaven sa `docs/design/hengsel-ds/logo/hengsel-logo-mork.svg`. Den mappen finnes ikke i noen gren;
   logopakken ligger i `docs/design/hengsel/logo/` (commit e2d4f33 «Add files via upload», 09.10). Jeg brukte den.
2. **`-mork` er for mørk bakgrunn.** `LES-MEG.md` og fargene i SVG-en («engsel» i Off White `#FBF9F6`, skapene i Krem)
   viser at `hengsel-logo-mork.svg` er varianten *for* mørk bakgrunn. På den lyse forsiden ville den vært nesten usynlig,
   så galleriet bruker `hengsel-logo-lys.svg` i lys modus og `hengsel-logo-mork.svg` i mørk modus. Skal `-mork` stå
   alltid, er det én linje i `galleri.css`.
3. **Teksten i logoen** ligger som `<text>` i TWK Lausanne. Uten fonten installert faller nettleseren tilbake til en
   annen sans-serif. Pakken ber om konturer før bruk; det er ikke gjort her (ingen Illustrator/Figma). Si fra om
   konturert versjon finnes, så byttes fila.
4. **Designfilene trenger nettet.** `support.js` henter React fra unpkg.com og sidene henter skrifter fra Google Fonts.
   Derfor har bare forsiden og 404 CSP; `/design/*` har noindex og sikkerhetshodene, men ingen CSP. I dette sandkasse-
   miljøet er unpkg blokkert, så kanvasene kunne ikke åpnes her; på nettet virker de som i dag.
5. **Ikke gjort i Cloudflare.** Jeg har ingen verktøy for Pages-prosjekter eller Access i denne økten (Cloudflare-
   koblingen dekker Workers, KV, D1 og R2). Oppskriften står i `docs/hosting.md` under «design». Rekkefølgen er viktig:

   1. Workers & Pages → Create → Pages → Connect to Git → `SNgroup-Drift/sngroup-nettsider`: Project name `design`,
      Production branch **`demo`**, Build command `npm run build -w sites/design`, Build output directory
      `sites/design/dist`, Root directory tomt, `NODE_VERSION` = `22`.
   2. Settings → Build → Branch control: preview branches **None**. Build watch paths: `sites/design/*`, `docs/design/*`,
      `package.json`, `package-lock.json`.
   3. Zero Trust → Access → Applications → **Visningsrommet** → Public hostnames → legg til `design.hengsel.no`,
      `<prosjekt>.pages.dev` og `*.<prosjekt>.pages.dev`. Ikke endre policyen «Inviterte», ikke rør vis-adressene.
      Sjekk: `curl -sI https://<prosjekt>.pages.dev` gir 302 til cloudflareaccess.com.
   4. Først da: Pages-prosjektet `design` → Custom domains → `design.hengsel.no`.
6. **`demo` har ting `main` ikke har**: `sites/design`, de to skriptendringene, `docs/hosting.md`-avsnittet og README-radene.
   Vil du ha dem på `main` også, lager jeg en PR fra `demo`; ellers lever galleriet bare på `demo`.
7. Ingenting er endret i `sites/vis` eller `docs/design`.

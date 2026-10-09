# Designgalleriet (design.hengsel.no)

Et lukket galleri som viser alle designfilene fra Claude Design (`docs/design/**/*.dc.html`) for sngroup.no, hengsel.no
og byggem.no, i nummerrekkefølge med tittel og dato. Bare for inviterte: det ligger bak Cloudflare Access (appen
«Visningsrommet», policy «Inviterte»), `robots.txt` og `X-Robots-Tag` stenger for søkemotorer, og alle sidene har
`noindex`. Oppsettet i Cloudflare står i `docs/hosting.md` under «design».

Galleriet bygges fra grenen **`demo`**, ikke `main`. Visningsrommet (`vis.hengsel.no`, `sites/vis`, gren `main`) er
et eget Pages-prosjekt og berøres ikke.

## Oppbygning

```
src/
  index.html        Forsiden. bygg.mjs setter inn lista der det står <!--galleri-->
  galleri.css       Hengsel-profilen (samme tokens som sites/vis/src/assets/vis.css)
  404.html          Ukjente adresser
  _headers          noindex og sikkerhetshoder; CSP bare på forsiden og 404 (designfilene har egne skript og Google Fonts)
  robots.txt        Disallow: /
bygg.mjs            src/ → dist/, docs/design/ → dist/design/, logo og ikoner → dist/, skriftene → dist/fonts/
datoer.json         Dato for siste commit per designfil (leses i Cloudflare Pages, der klonen er grunn)
```

- **Rekkefølge:** tallet foran filnavnet («51 Hengsel nettside.dc.html») styrer rekkefølgen. Filer uten tall kommer etter,
  alfabetisk. Gruppene er sngroup.no, hengsel.no, hengsel.no/apptest og byggem.no.
- **Tittel:** `<title>` i fila; mangler den, brukes filnavnet uten tall og `.dc.html`.
- **Dato:** siste commit som rørte fila. Lokalt leses den fra git og skrives til `datoer.json`; i Pages (grunn klon)
  leses `datoer.json`. Oppdater den med `npm run datoer -w sites/design` og commit når designfiler endres.
- **Logo og ikoner** kommer fra `docs/design/hengsel/logo/` (logopakken 09.10.2026): `hengsel-logo-lys.svg` på lys
  bakgrunn og `hengsel-logo-mork.svg` i mørk modus, `favicon.svg`, `favicon-32.png`, `favicon-192.png`,
  `apple-touch-icon-180.png`, `maskable-512.png` og `site.webmanifest`.
- Designfilene kopieres uendret (uten `uploads/` og zip), så `_ds/`, `support.js`, `assets/` og `img/` ligger relativt
  som før. De henter skrifter fra Google Fonts selv.

## Kommandoer (fra rotmappen)

```sh
npm run build -w sites/design      # → sites/design/dist
npm run datoer -w sites/design     # oppdaterer datoer.json fra git
npm test                           # lenkesjekk: forsiden, 404 og at alle designfilene svarer 200
DESIGN_DIST=/tmp/design node sites/design/bygg.mjs   # bygg til en annen mappe
```

`npm test` gjennomsøker ikke sidene under `/design/` (de er kanvaser med maler og eksterne skrifter), bare at de svarer.

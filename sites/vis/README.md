# Visningsrommet (vis.sngroup.no)

Et lukket demonstrasjonsnettsted for Studio Sigdal Innlandet og SN Group. Her viser vi hele løsningen til selgere,
montører, leverandører og Sigdal/Nobia: CRM, montørappen Hengsel og koblingene til leverandørene, som simuleringer,
«prøv selv»-rom, presentasjoner og oversikter. Forsiden filtrerer rommene etter rolle (`?rolle=selger`, `montor`,
`leverandor` eller `sigdal`).

**Alle data er oppdiktet.** Kunder, ordrer, tall, navn og leverandørsvar er laget for demonstrasjonen. Ingenting
henter eller sender ekte data, og det er ingen server, database eller innlogging i selve nettstedet.

**Nettstedet ligger bak Cloudflare Access** (appen «Visningsrommet», policy «Inviterte»). Bare inviterte kommer inn.
`robots.txt` og `X-Robots-Tag` stenger for søkemotorer, men det er Access som holder det privat. Oppsettet i Cloudflare
står i `docs/hosting.md` under «vis».

## Oppbygning

Ren HTML, CSS og JS uten rammeverk. Hver side er én selvstendig `index.html` med egen `<style>` og `<script>`.

```
src/
  index.html          Forsiden: rollene (R) og kortene for rommene (C)
  assets/vis.css      Felles farger (lys og mørk), skrift og knapper
  <rom>/index.html    Ett rom per mappe: reise, crm, kunde, montor, kontroll, …
  sv/, en/            Kort innføring på svensk og engelsk, med systemkartet (sv/system, en/system)
  404.html            Ukjente adresser (Pages svarer med denne og status 404)
  _headers            Sikkerhetshoder og CSP (Pages leser fila fra dist/)
  robots.txt          Disallow: /
bygg.mjs              Kopierer src/ til dist/ og legger skriftene i dist/fonts/
```

Skriftene er Newsreader (titler) og Inter (tekst), selvhostet fra `@fontsource-variable` som i designpakken. De ligger
ikke i `src/`; `bygg.mjs` legger dem og `fonts.css` i `dist/fonts/` ved hvert bygg. Ingen kall til Google Fonts, og
CSP-en tillater bare skrifter fra `'self'`. Ikke lag en mappe `src/fonts/`; bygget stopper da.

## Kommandoer (fra rotmappen)

```sh
npm run build -w sites/vis         # src/ → dist/
npm test                           # lenkesjekk for alle nettstedene, også rommene i C
npm run skjermbilder:vis           # alle sider på 390 og 1280 px, lys og mørk + skjermbilder i docs/skjermbilder/vis-*
```


## Legge til et nytt rom

1. Lag en mappe med en `index.html`, f.eks. `src/lager/index.html`. Kopier en eksisterende side som utgangspunkt, så får
   du med `<head>` (skriftene, `/assets/vis.css`, `noindex`) og toppfeltet med «‹ Visningsrommet» tilbake til forsiden.
   Bruk bare oppdiktede data, og merk siden med `<span class="demo">…</span>` som de andre.
2. Legg til et kort i arrayet `C` i `src/index.html`:

   ```js
   {u:'/lager/',t:'Lagerstyring',type:'Prøv selv',p:'Én setning om hva man kan gjøre i rommet.',r:['selger','sigdal'],go:'Prøv lageret'},
   ```

   - `u`: adressen, med `/` i begge ender (mappenavnet)
   - `t`: tittelen på kortet
   - `type`: `Simulering`, `Prøv selv`, `Presentasjon`, `Oversikt` eller `Opplæring`; den avgjør hvilken gruppe kortet
     havner i
   - `p`: kort beskrivelse
   - `r`: hvilke roller som ser kortet (`selger`, `montor`, `leverandor`, `sigdal`); «Alt» viser alle
   - `go`: teksten på lenken nederst i kortet

   Rekkefølgen i `C` er rekkefølgen innenfor gruppen.
3. Kjør `npm run build` og `npm test`. Lenkesjekken leser adressene i `C`, så et kort uten mappe gir feil.
4. Commit og push. Etter fletting til `main` publiserer Cloudflare Pages automatisk.

Skal rommet også finnes på svensk eller engelsk, legg det under `src/sv/` eller `src/en/` og lenk fra `sv/index.html`
eller `en/index.html`.

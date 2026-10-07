# K-107 · hengsel.no/apptest med passord (S-56)

Gren: `claude/k107-apptest`, laget fra `claude/s56-apptest-design` (ikke fra main). Ingen database, ingen deploy
(ingen `wrangler deploy`, ingen `versions upload`), ingenting pushet til main.

## Commits

| Commit | Innhold |
|---|---|
| `a4c1581` | Siden, passordsiden, app-ikonet, Worker-skriptet, wrangler.jsonc, sjekkene og skjermbildeskriptet |
| `b34c96d` | Skjermbilder, docs/hosting.md, README og denne rapporten |
| `e645874` | Fletting av `origin/main` (K-87 del 5, `a7b58c2`) inn i grenen (merge, ikke rebase) |
| (siste) | Rapporten oppdatert etter flettingen |

## Endrede filer

| Fil | Hva |
|---|---|
| `sites/hengsel/src/pages/apptest.astro` | Siden /apptest etter `Apptest.dc.html`, tekst ordrett. `TESTFLIGHT_LENKE` og `ANDROID_LENKE` øverst |
| `sites/hengsel/src/pages/apptest/passord.astro` | Passordsiden (bygges til `dist/apptest/passord.html`, nås bare gjennom Workeren) |
| `sites/hengsel/src/scripts/apptest.ts` | Gjenkjenner iPhone/iPad/Android og fremhever knappen (19 linjer) |
| `sites/hengsel/public/apptest/hengsel-ikon-{192,384}{,-mork}.{webp,png}` | App-ikonet fra `docs/design/hengsel/apptest/img/`, nedskalert (8 filer, 0,6–4,7 kB) |
| `sites/hengsel/worker/apptest.ts` | Worker-skriptet: passord, informasjonskapsel, hoder |
| `sites/hengsel/wrangler.jsonc` | `main`, `assets.binding: "ASSETS"`, `run_worker_first: ["/apptest", "/apptest/*"]` |
| `packages/design/src/components/BaseLayout.astro`, `sites/hengsel/src/layouts/Side.astro` | Valgfri `robots`-prop (for `noindex, nofollow`). Andre sider uendret |
| `scripts/sjekk-lenker.mjs` | `npm test` sjekker også at ingen sider lenker til /apptest, at den ikke står i sitemap, og robots-taggen |
| `scripts/skjermbilder.mjs` | /apptest og passordsiden med i 360 px- og konsollsjekken |
| `scripts/skjermbilder-apptest.mjs` | Ny: skjermbilder og sjekker mot wrangler dev (innlogging, gjenkjenning, uten skript, axe) |
| `.gitignore` | `.dev.vars` og `.dev.vars.*` |
| `docs/hosting.md` | Ny del «hengsel.no/apptest (passord)»: sette/bytte passord, TestFlight-lenken, lokal test |
| `README.md` | Unntaket for /apptest nevnt |
| `docs/skjermbilder/apptest-*.png` | 14 skjermbilder |

## Valg jeg tok

1. **Skriptet for telefongjenkjenning er en egen fil, ikke inline.** CSP-en er `script-src 'self'` og `csp-hasher.mjs` stopper
   bygget ved inline-skript. Astro bygger `src/scripts/apptest.ts` til en liten fil i `/_astro/`. Uten skript (eller før det
   har kjørt) er begge knappene like, med linjen «Åpne denne siden på telefonen og trykk knappen for din telefon.»
   (tilstand 2a i oversikten).
2. **TestFlight-tilstanden bestemmes ved bygging.** `TESTFLIGHT_LENKE` står øverst i `apptest.astro`. Med plassholderen
   bygges en deaktivert `<button>` «iPhone og iPad – lenke kommer snart»; ellers en lenke «iPhone og iPad – åpne i TestFlight».
   Skriptet leser bare `data-ios-klar` for linjen under knappene.
3. **Passordsiden er en Astro-side** (`/apptest/passord`) med samme toppfelt, bunn og familiebånd. Workeren henter den fra
   de statiske filene og viser den i stedet for /apptest. Ved feil passord fjerner Workeren `hidden` på feilmeldingen med
   `HTMLRewriter` og setter `aria-invalid` på feltet. Den er ikke lenket noe sted og ligger selv bak Workeren.
4. **To hemmeligheter, begge påkrevd.** `APPTEST_PASSORD` og `APPTEST_NOKKEL`. Signaturnøkkelen er
   `HMAC(APPTEST_NOKKEL, "apptest-v1:" + APPTEST_PASSORD)`, så nytt passord (eller ny nøkkel) gjør alle gamle
   informasjonskapsler ugyldige (testet under). Mangler én av dem: 503. Jeg valgte å kreve begge i stedet for å falle
   tilbake til bare passordet, så feiloppsett gir låst side, ikke svakere signatur.
5. **Informasjonskapselen** `hengsel_apptest=<utløp>.<HMAC-SHA256(utløp)>` (base64url), `Max-Age=2592000; Path=/apptest;
   HttpOnly; Secure; SameSite=Lax`. Utløpet ligger i den signerte verdien og sjekkes på serveren også.
6. **Konstant tid:** passordene hashes med SHA-256 og sammenlignes med `crypto.subtle.timingSafeEqual` (lengden lekker ikke).
   Signaturen sjekkes med `crypto.subtle.verify`.
7. **Andre stier under /apptest/ uten informasjonskapsel** (f.eks. ikonet) gir 401 med passordsiden, ikke 200. Bare `/apptest`
   selv gir 200 med passordsiden. Andre metoder enn GET/HEAD/POST gir 405, POST til andre stier enn /apptest gir 405, og
   skjemaet over 4 kB avvises som feil passord.
8. **Hoder:** alle svar fra /apptest får `X-Robots-Tag: noindex, nofollow`, `Cache-Control: private, no-store` og
   `Vary: Cookie` (ETag fjernes). Sikkerhetshodene fra `_headers` (med CSP-hashene) kommer med svarene som hentes via
   `env.ASSETS` (sjekket i wrangler dev). Svar Workeren lager selv (303, 405, 503) får de samme hodene fra skriptet, og en
   streng CSP (`default-src 'none'; … form-action 'self'; frame-ancestors 'none'`). CSP-en i `_headers` har
   `form-action 'self'`, så skjemaet er tillatt (testet i Chromium uten konsollfeil).
9. **Ikonet:** 192 og 384 px (2× og 3× av 96/128 px), webp med png som reserve, i `<picture>` med
   `media="(prefers-color-scheme: dark)"` for den mørke utgaven. Hjørneradius 22,5 % som i designet. Ikonet har `alt=""`
   fordi navnet «Hengsel» står rett under.
10. **«Hvis noe ikke virker»** er en `<dl>` (spørsmål/svar); stegene er `<ol>` med tallene skjult for skjermlesere
    (listen nummererer selv). Utseendet er som i designet.
11. **robots.txt er ikke endret.** En `Disallow: /apptest` ville vist stien offentlig og hindret søkemotorer i å se
    `noindex`. Siden står ikke i `sitemap.txt` og lenkes ikke fra andre sider (`npm test` sjekker det).

## Kontroll

| Sjekk | Resultat |
|---|---|
| `npm run build` (alle tre nettstedene) | OK, CSP-hasher OK |
| `npm test` | 147 forespørsler, 0 feil. hengsel: `/apptest` og `/apptest/passord` svarer 200 fra de statiske filene; ingen lenker til /apptest, ikke i sitemap, robots `noindex, nofollow` |
| `npm run skjermbilder` | 0 feil. /apptest og passordsiden: ingen vannrett rulling ved 360 px, ingen konsollfeil, lys og mørk. Eksisterende skjermbilder er ikke byttet (bare pikselstøy, tilbakestilt) |
| `node scripts/skjermbilder-apptest.mjs` (mot wrangler dev, med axe-core 4.11) | 0 feil, i begge tilstander for iPhone-knappen: axe WCAG 2.1 A/AA uten brudd på passordsiden, passordsiden med feil og /apptest (390 og 1440, lys og mørk); iPhone, Android og PC gjenkjennes; uten skript er knappene like; bare én informasjonskapsel, med riktige flagg |
| `npx wrangler deploy --dry-run -c sites/hengsel/wrangler.jsonc` | OK, binding `env.ASSETS` (ingen opplasting) |
| Lighthouse 13.5 mobil, /apptest etter innlogging (wrangler dev, 3 kjøringer) | Ytelse 99–100, tilgjengelighet 100, beste praksis 100. LCP 1,5–1,6 s, TBT 0–60 ms, CLS 0. SEO 69 bare fordi siden med vilje er `noindex` («Page is blocked from indexing») |

### curl mot wrangler dev

`npx wrangler dev -c sites/hengsel/wrangler.jsonc` med en lokal `sites/hengsel/.dev.vars` (i `.gitignore`, ikke sjekket inn)
med et tilfeldig testpassord. Passordet er ikke tatt med; signaturen er skjult og CSP-hashen forkortet.

```
$ curl -si http://localhost:8787/apptest   # uten informasjonskapsel
HTTP/1.1 200 OK
Content-Type: text/html; charset=utf-8
Cache-Control: private, no-store
Strict-Transport-Security: max-age=31536000
X-Robots-Tag: noindex, nofollow
content-security-policy: default-src 'self'; script-src 'self'; style-src 'self' 'sha256-s2t+usvR…'; img-src 'self' data:; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests
cross-origin-opener-policy: same-origin
permissions-policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()
referrer-policy: strict-origin-when-cross-origin
x-content-type-options: nosniff
x-frame-options: DENY
(innhold: Skriv passordet du fikk sammen med lenken.; feilmelding skjult: 1)

$ curl -si -X POST -d 'passord=feil' http://localhost:8787/apptest
HTTP/1.1 401 Unauthorized
Content-Type: text/html; charset=utf-8
Cache-Control: private, no-store
Strict-Transport-Security: max-age=31536000
X-Robots-Tag: noindex, nofollow
content-security-policy: default-src 'self'; script-src 'self'; style-src 'self' 'sha256-s2t+usvR…'; img-src 'self' data:; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests
cross-origin-opener-policy: same-origin
permissions-policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()
referrer-policy: strict-origin-when-cross-origin
x-content-type-options: nosniff
x-frame-options: DENY
(innhold: Feil passord. Prøv igjen, eller spør Eirik.; feilmelding synlig: ja)

$ curl -si -c jar -X POST --data-urlencode 'passord=<riktig passord>' http://localhost:8787/apptest
HTTP/1.1 303 See Other
Location: /apptest
Cache-Control: private, no-store
Set-Cookie: hengsel_apptest=<utløp>.<signatur>; Max-Age=2592000; Path=/apptest; HttpOnly; Secure; SameSite=Lax
Strict-Transport-Security: max-age=31536000
Content-Security-Policy: default-src 'none'; base-uri 'none'; form-action 'self'; frame-ancestors 'none'
Cross-Origin-Opener-Policy: same-origin
Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()
Referrer-Policy: strict-origin-when-cross-origin
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-Robots-Tag: noindex, nofollow

$ curl -si -b jar http://localhost:8787/apptest   # med informasjonskapselen
HTTP/1.1 200 OK
Content-Type: text/html; charset=utf-8
Cache-Control: private, no-store
Strict-Transport-Security: max-age=31536000
X-Robots-Tag: noindex, nofollow
content-security-policy: default-src 'self'; script-src 'self'; style-src 'self' 'sha256-s2t+usvR…'; img-src 'self' data:; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests
cross-origin-opener-policy: same-origin
permissions-policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()
referrer-policy: strict-origin-when-cross-origin
x-content-type-options: nosniff
x-frame-options: DENY
(innhold: Montørappen · testversjon 1.3.0; robots-meta: <meta name="robots" content="noindex, nofollow">)

$ curl -si -b jar http://localhost:8787/apptest/hengsel-ikon-192.webp
HTTP/1.1 200 OK
Content-Type: image/webp
Cache-Control: private, no-store
Strict-Transport-Security: max-age=31536000
X-Robots-Tag: noindex, nofollow
content-security-policy: default-src 'self'; script-src 'self'; style-src 'self' 'sha256-s2t+usvR…'; img-src 'self' data:; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests
cross-origin-opener-policy: same-origin
permissions-policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()
referrer-policy: strict-origin-when-cross-origin
x-content-type-options: nosniff
x-frame-options: DENY

$ curl -si http://localhost:8787/apptest/hengsel-ikon-192.webp   # uten informasjonskapsel
HTTP/1.1 401 Unauthorized
Content-Type: text/html; charset=utf-8
Cache-Control: private, no-store
Strict-Transport-Security: max-age=31536000
X-Robots-Tag: noindex, nofollow
content-security-policy: default-src 'self'; script-src 'self'; style-src 'self' 'sha256-s2t+usvR…'; img-src 'self' data:; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests
cross-origin-opener-policy: same-origin
permissions-policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()
referrer-policy: strict-origin-when-cross-origin
x-content-type-options: nosniff
x-frame-options: DENY

$ curl -si -H 'Cookie: hengsel_apptest=9999999999.AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' http://localhost:8787/apptest   # falsk signatur
HTTP/1.1 200 OK
(passordsiden: 1)

$ curl -si http://localhost:8787/
HTTP/1.1 200 OK
Content-Type: text/html; charset=utf-8
Cache-Control: public, max-age=0, must-revalidate
Strict-Transport-Security: max-age=31536000
content-security-policy: default-src 'self'; script-src 'self'; style-src 'self' 'sha256-s2t+usvR…'; img-src 'self' data:; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests
cross-origin-opener-policy: same-origin
permissions-policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()
referrer-policy: strict-origin-when-cross-origin
x-content-type-options: nosniff
x-frame-options: DENY

$ curl -si http://localhost:8787/personvern
HTTP/1.1 200 OK
Content-Type: text/html; charset=utf-8
Cache-Control: public, max-age=0, must-revalidate
Strict-Transport-Security: max-age=31536000
content-security-policy: default-src 'self'; script-src 'self'; style-src 'self' 'sha256-s2t+usvR…'; img-src 'self' data:; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests
cross-origin-opener-policy: same-origin
permissions-policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()
referrer-policy: strict-origin-when-cross-origin
x-content-type-options: nosniff
x-frame-options: DENY

$ curl -so /dev/null -w '%{http_code}' http://localhost:8787/finnes-ikke
404

$ # APPTEST_PASSORD byttet, wrangler dev startet på nytt

$ curl -si -b jar http://localhost:8787/apptest   # gammel informasjonskapsel
HTTP/1.1 200 OK
(passordsiden: 1)

$ # .dev.vars tom (ingen hemmeligheter), wrangler dev startet på nytt

$ curl -si http://localhost:8787/apptest
HTTP/1.1 503 Service Unavailable
Content-Type: text/plain; charset=utf-8
Cache-Control: private, no-store
Strict-Transport-Security: max-age=31536000
Content-Security-Policy: default-src 'none'; base-uri 'none'; form-action 'self'; frame-ancestors 'none'
Cross-Origin-Opener-Policy: same-origin
Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()
Referrer-Policy: strict-origin-when-cross-origin
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-Robots-Tag: noindex, nofollow
(innhold: Siden er låst. Passordet er ikke satt opp ennå.)

$ curl -si -X POST -d 'passord=hva-som-helst' http://localhost:8787/apptest
HTTP/1.1 503 Service Unavailable

$ curl -si -b jar http://localhost:8787/apptest/hengsel-ikon-192.webp
HTTP/1.1 503 Service Unavailable

$ curl -so /dev/null -w '%{http_code}' http://localhost:8787/   og   http://localhost:8787/personvern
200 200
```

## Skjermbilder (docs/skjermbilder/)

Tatt mot wrangler dev etter innlogging. «snart» = TestFlight-lenken er plassholder; «klar» = bygget midlertidig med
`https://testflight.apple.com/join/EKSEMPEL` for bildene, så tilbakestilt (i commiten står plassholderen). Mobil er tatt med
iPhone-nettleser, så iPhone-knappen er den mørke.

| | Lys | Mørk |
|---|---|---|
| Passordsiden, 390 | `apptest-passord-mobil-lys.png` | `apptest-passord-mobil-mork.png` |
| Passordsiden, feil passord, 390 | `apptest-passord-feil-mobil-lys.png` | `apptest-passord-feil-mobil-mork.png` |
| Passordsiden, 1440 | `apptest-passord-desktop-lys.png` | `apptest-passord-desktop-mork.png` |
| /apptest, 390, lenke kommer snart | `apptest-mobil-lys-snart.png` | `apptest-mobil-mork-snart.png` |
| /apptest, 390, TestFlight klar | `apptest-mobil-lys-klar.png` | `apptest-mobil-mork-klar.png` |
| /apptest, 1440, lenke kommer snart | `apptest-desktop-lys-snart.png` | `apptest-desktop-mork-snart.png` |
| /apptest, 1440, TestFlight klar | `apptest-desktop-lys-klar.png` | `apptest-desktop-mork-klar.png` |

## Usikkert / bør sjekkes

- **Sikkerhetshodene på /apptest i produksjon.** I wrangler dev får svarene fra `env.ASSETS.fetch` hodene fra `_headers`
  (inkludert CSP-hashene). Jeg har ikke kunnet bekrefte at Cloudflare gjør det samme i produksjon. Skriptet legger uansett
  til de faste sikkerhetshodene som mangler, men ikke CSP-en for HTML (den har hasher fra bygget). Sjekk på
  preview-adressen eller etter publisering:
  `curl -sI https://hengsel.no/apptest | grep -iE '^HTTP|content-security|x-robots|cache-control'`.
- **Toppfeltet** er det samme som på resten av hengsel.no (lenker til forsiden og «Be om demo»), som i
  `Sidehode.dc.html`. Siden lenker altså ut, men ingenting lenker inn.
- **«Bruk samme e-post og passord som i CRM.»** står ordrett fra designet. Det kan forveksles med passordet til denne
  siden; vurder teksten.
- **Grenen:** økten var satt opp med grenen `claude/k107-hengsel-apptest-d0qu19`. Jeg har pushet samme commits til begge,
  `claude/k107-apptest` (som bedt om) og den grenen.
- Lighthouse er kjørt lokalt mot wrangler dev, ikke mot hengsel.no.

## Hva Eirik må gjøre før main

1. **Sett hemmelighetene i Worker-en `hengsel`** (ellers gir /apptest 503 etter publisering, resten av nettstedet virker):
   ```sh
   npx wrangler secret put APPTEST_PASSORD -c sites/hengsel/wrangler.jsonc
   openssl rand -base64 32      # lim inn i neste kommando
   npx wrangler secret put APPTEST_NOKKEL -c sites/hengsel/wrangler.jsonc
   ```
   (Eller i dashbordet: Worker `hengsel` → Settings → Variables and Secrets → Type Secret.) Hemmeligheter kan settes før
   koden er publisert.
2. Se gjennom skjermbildene og si ja.
3. Merge til main. Workers Builds bygger og publiserer med den vanlige deploy-kommandoen; `main` i wrangler.jsonc gjør at
   skriptet følger med. Ingen nye byggeinnstillinger trengs.
4. Etter publisering: kjør curl-sjekken over, og åpne https://hengsel.no/apptest på en telefon.
5. Når Apple har godkjent betagjennomgangen: bytt `TESTFLIGHT_LENKE` øverst i `sites/hengsel/src/pages/apptest.astro`
   (se docs/hosting.md, «Bytte TestFlight-lenken»).

## Oppdatert mot main (retting)

GitHub meldte at grenen ikke kunne flettes automatisk. Main hadde fått K-87 del 5 (byggem.no etter Claude Design,
`46ebba6` og `a7b58c2`) etter at grenen ble laget fra `9f3ea03`. `origin/main` er flettet inn med `git merge`
(commit `e645874`), så historikken er beholdt.

### Konflikter og hvordan de ble løst

| Fil | Konflikt | Løsning |
|---|---|---|
| `packages/design/src/components/BaseLayout.astro` | Main la til `ogBeskrivelse`, `delingsbilde`, `ikon`, `appleIkon`, `temafarge` og `forhandslast`; K-107 la til `robots` på samme sted | Mains versjon beholdt i sin helhet. Bare `robots?: string` og robots-linjen (`{(robots \|\| noindex) && …}`) er lagt til. Uten `robots` er utdataene de samme som på main |
| `scripts/skjermbilder.mjs` | Samme linje (sidelistene i 360 px-sjekken): main la til byggem-sidene, K-107 la til /apptest | Mains liste for byggem beholdt, og `/apptest` og `/apptest/passord` lagt til for hengsel |

`sites/hengsel/src/layouts/Side.astro` og `README.md` ble flettet automatisk (mains fontimport og K-107s `robots`-prop
og /apptest-linjer står begge).

### Utelatt

Ingenting. Designfilene i `docs/design/hengsel/apptest/` (fra `claude/s56-apptest-design`) ga ingen konflikter og er
beholdt som fasit. De brukes ikke i bygget.

### Kontroll etter flettingen

| Sjekk | Resultat |
|---|---|
| `npm run build` (alle tre) | OK, CSP-hasher OK |
| `npm test` | 153 forespørsler, 0 feil (byggem nå med /kontakt og /prosjekter) |
| `npx wrangler deploy --dry-run -c sites/<navn>/wrangler.jsonc` | sngroup, byggem og hengsel OK (hengsel med `env.ASSETS`) |
| `git diff origin/main -- sites/sngroup sites/byggem` | Tom: ingen endrede filer under `sites/sngroup` og `sites/byggem` |
| sngroup og byggem bygd fra `origin/main` og fra grenen, `dist` sammenlignet | Samme filer (28 og 29). Innholdet er likt bortsett fra Astros scoped-CSS-ID-er (`data-astro-cid-…`) og CSP-hashen som følger av dem; de avhenger av mappestien bygget kjøres fra (main ble bygd i en egen worktree). Etter normalisering av dem: ingen forskjell |
| `npm run skjermbilder` | 0 feil (eksisterende skjermbilder ikke byttet) |
| `node scripts/skjermbilder-apptest.mjs` mot wrangler dev | 0 feil i begge tilstander for iPhone-knappen |
| curl mot wrangler dev | Samme resultat som over: 200 passordside, 401 feil passord, 303 riktig, 200 siden, 401 ikon uten kapsel, gammel kapsel ugyldig etter passordbytte, 503 uten hemmeligheter, `/` og `/personvern` 200 |

### `git diff --stat origin/main`

```
 .gitignore                                         |    2 +
 README.md                                          |    7 +-
 .../hengsel/apptest/Apptest oversikt.dc.html       |   65 +
 docs/design/hengsel/apptest/Apptest.dc.html        |  180 +
 docs/design/hengsel/apptest/Bunn.dc.html           |   61 +
 docs/design/hengsel/apptest/LES-MEG.md             |   10 +
 docs/design/hengsel/apptest/Sidehode.dc.html       |   64 +
 .../_adherence.oxlintrc.json                       |  413 ++
 .../_ds_bundle.js                                  | 4054 ++++++++++++++++++++
 .../_ds_manifest.json                              |    1 +
 .../readme.md                                      |  105 +
 .../styles.css                                     |    6 +
 .../tokens/base.css                                |   52 +
 .../tokens/colors.css                              |   72 +
 .../tokens/components.css                          |  116 +
 .../tokens/fonts.css                               |   11 +
 .../tokens/spacing.css                             |   14 +
 .../tokens/typography.css                          |   23 +
 docs/design/hengsel/apptest/github.md              |   18 +
 docs/design/hengsel/apptest/image-slot.js          | 1225 ++++++
 .../hengsel/apptest/img/hengsel_ikon_ios_1024.png  |  Bin 0 -> 6972 bytes
 .../apptest/img/hengsel_ikon_ios_1024_mork.png     |  Bin 0 -> 6854 bytes
 docs/design/hengsel/apptest/support.js             | 1911 +++++++++
 docs/hosting.md                                    |   77 +-
 docs/k107-rapport.md                               |  278 ++
 docs/skjermbilder/apptest-desktop-lys-klar.png     |  Bin 0 -> 267690 bytes
 docs/skjermbilder/apptest-desktop-lys-snart.png    |  Bin 0 -> 266908 bytes
 docs/skjermbilder/apptest-desktop-mork-klar.png    |  Bin 0 -> 270691 bytes
 docs/skjermbilder/apptest-desktop-mork-snart.png   |  Bin 0 -> 269921 bytes
 docs/skjermbilder/apptest-mobil-lys-klar.png       |  Bin 0 -> 563928 bytes
 docs/skjermbilder/apptest-mobil-lys-snart.png      |  Bin 0 -> 564736 bytes
 docs/skjermbilder/apptest-mobil-mork-klar.png      |  Bin 0 -> 571845 bytes
 docs/skjermbilder/apptest-mobil-mork-snart.png     |  Bin 0 -> 572922 bytes
 docs/skjermbilder/apptest-passord-desktop-lys.png  |  Bin 0 -> 61152 bytes
 docs/skjermbilder/apptest-passord-desktop-mork.png |  Bin 0 -> 62119 bytes
 .../apptest-passord-feil-mobil-lys.png             |  Bin 0 -> 108183 bytes
 .../apptest-passord-feil-mobil-mork.png            |  Bin 0 -> 109763 bytes
 docs/skjermbilder/apptest-passord-mobil-lys.png    |  Bin 0 -> 97456 bytes
 docs/skjermbilder/apptest-passord-mobil-mork.png   |  Bin 0 -> 99007 bytes
 packages/design/src/components/BaseLayout.astro    |    5 +-
 scripts/sjekk-lenker.mjs                           |   14 +
 scripts/skjermbilder-apptest.mjs                   |  147 +
 scripts/skjermbilder.mjs                           |    2 +-
 .../public/apptest/hengsel-ikon-192-mork.png       |  Bin 0 -> 2277 bytes
 .../public/apptest/hengsel-ikon-192-mork.webp      |  Bin 0 -> 628 bytes
 sites/hengsel/public/apptest/hengsel-ikon-192.png  |  Bin 0 -> 2491 bytes
 sites/hengsel/public/apptest/hengsel-ikon-192.webp |  Bin 0 -> 802 bytes
 .../public/apptest/hengsel-ikon-384-mork.png       |  Bin 0 -> 4243 bytes
 .../public/apptest/hengsel-ikon-384-mork.webp      |  Bin 0 -> 1222 bytes
 sites/hengsel/public/apptest/hengsel-ikon-384.png  |  Bin 0 -> 4712 bytes
 sites/hengsel/public/apptest/hengsel-ikon-384.webp |  Bin 0 -> 1570 bytes
 sites/hengsel/src/layouts/Side.astro               |    6 +-
 sites/hengsel/src/pages/apptest.astro              |  173 +
 sites/hengsel/src/pages/apptest/passord.astro      |   37 +
 sites/hengsel/src/scripts/apptest.ts               |   19 +
 sites/hengsel/worker/apptest.ts                    |  178 +
 sites/hengsel/wrangler.jsonc                       |   10 +-
 57 files changed, 9343 insertions(+), 13 deletions(-)
```

Bare K-107-filer: siden, passordsiden, skriptet, ikonene, Worker-skriptet, `wrangler.jsonc` for hengsel, `robots`-propen,
sjekkene, docs, skjermbildene og designfasiten. Ingenting under `sites/sngroup` eller `sites/byggem`.

KLAR FOR MAIN – KAN FLETTES AUTOMATISK

# K-107 · hengsel.no/apptest med passord (S-56)

Gren: `claude/k107-apptest`, laget fra `claude/s56-apptest-design` (ikke fra main). Ingen database, ingen deploy
(ingen `wrangler deploy`, ingen `versions upload`), ingenting pushet til main.

## Commits

| Commit | Innhold |
|---|---|
| `a4c1581` | Siden, passordsiden, app-ikonet, Worker-skriptet, wrangler.jsonc, sjekkene og skjermbildeskriptet |
| (denne) | Skjermbilder, docs/hosting.md, README og denne rapporten |

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

KLAR FOR MAIN

# Hosting: Cloudflare Workers med statiske filer

Bestemt 07.10.2026 (erstatter Pages-beslutningen fra 04.10): hvert nettsted er sin egen Cloudflare Worker med
statiske filer, bygd med **Workers Builds** og Git-integrasjon fra samme repo (`SNgroup-Drift/sngroup-nettsider`).
Workerne serverer `sites/<navn>/dist`. Unntaket er `hengsel`, som har et lite skript bare for `/apptest` (passordet, se
«hengsel.no/apptest» under). Eirik kobler Cloudflare til GitHub selv.

Repoet har ingen API-nøkler, ingen kontoinformasjon, ingen hemmeligheter og ingen wrangler-innlogging. Det eneste
Cloudflare-oppsettet i repoet er `sites/<navn>/wrangler.jsonc` (her sngroup; hengsel har i tillegg `main`, `binding` og
`run_worker_first`, se under):

```jsonc
{
  "name": "sngroup",                       // hengsel, byggem
  "compatibility_date": "2026-10-01",
  "assets": {
    "directory": "./dist",                 // relativt til wrangler.jsonc
    "not_found_handling": "404-page",      // ukjente sider får dist/404.html med status 404
    "html_handling": "auto-trailing-slash" // /personvern → personvern.html
  }
}
```

Uten `not_found_handling` gir Workers en tom 404 og bruker ikke `404.html`. Det var feilen på
sngroup.drift-697.workers.dev før denne filen kom.

## Innstillinger per Worker

Workers & Pages → Create → Workers → Import a repository → velg `SNgroup-Drift/sngroup-nettsider`. For en Worker som
finnes: Worker → Settings → Build.

| | sngroup | hengsel | byggem |
|---|---|---|---|
| Worker-navn | `sngroup` | `hengsel` | `byggem` |
| Git-gren for produksjon | `main` | `main` | `main` |
| Build command | `npm run build -w sites/sngroup` | `npm run build -w sites/hengsel` | `npm run build -w sites/byggem` |
| Deploy command | `npx wrangler deploy -c sites/sngroup/wrangler.jsonc` | `npx wrangler deploy -c sites/hengsel/wrangler.jsonc` | `npx wrangler deploy -c sites/byggem/wrangler.jsonc` |
| Non-production branch deploy command (preview) | `npx wrangler versions upload -c sites/sngroup/wrangler.jsonc` | `npx wrangler versions upload -c sites/hengsel/wrangler.jsonc` | `npx wrangler versions upload -c sites/byggem/wrangler.jsonc` |
| Path (rotmappe) | `/` | `/` | `/` |
| Build variables | `NODE_VERSION` = `22` | `NODE_VERSION` = `22` | `NODE_VERSION` = `22` |
| API-token | Eget token for nettsidene | Samme nettside-token | Samme nettside-token |
| Build watch paths, include | `sites/sngroup/*`, `packages/*`, `scripts/*`, `package.json`, `package-lock.json` | `sites/hengsel/*`, `packages/*`, `scripts/*`, `package.json`, `package-lock.json` | `sites/byggem/*`, `packages/*`, `scripts/*`, `package.json`, `package-lock.json` |
| Testadresse | https://sngroup.drift-697.workers.dev | https://hengsel.drift-697.workers.dev | https://byggem.drift-697.workers.dev |
| Egne domener | `sngroup.no`, `www.sngroup.no` | `hengsel.no`, `www.hengsel.no` | `byggem.no`, `www.byggem.no` |

**API-token:** bruk et eget token for nettsidene, ikke tokenet til CRM-demoen. Workers Builds lager det i
dashbordet når Worker-en kobles til Git (eller velg et eksisterende nettside-token). Tokenet lagres bare hos Cloudflare,
aldri i repoet.

**Deploy command må ha `-c`.** Wrangler-filen ligger i `sites/<navn>/`, ikke i rotmappen. Uten
`-c sites/<navn>/wrangler.jsonc` finner ikke wrangler oppsettet, og 404-siden blir ikke slått på.
Det gjelder **begge** feltene: Deploy command og Non-production branch deploy command. Er feltet for
ikke-produksjonsgreiner tomt, kjører Workers Builds standardkommandoen `npx wrangler versions upload` uten `-c`, og
forhåndsvisningen feiler med `✘ [ERROR] Missing entry-point to Worker script or to assets directory` (byggesteget går
gjennom). Det er akkurat den feilen wrangler gir når den kjøres fra rotmappen uten `-c`. Med `-c` og feil sti blir
feilen i stedet `Could not read file: …`. Rettes i Worker → Settings → Build → Non-production branch deploy command.

Node: `.nvmrc` i rotmappen sier 22. `NODE_VERSION` = `22` gjør det samme i byggmiljøet (Astro krever 22.12 eller nyere).
`wrangler` står som `devDependency` i rotens `package.json`, så `npx wrangler` bruker den låste versjonen.

Byggekommandoen kjører `astro build` og så `scripts/csp-hasher.mjs`, som legger hashen for inline-CSS-en inn i
`Content-Security-Policy` i `dist/_headers`. Bygg alltid med `npm run build`, ikke bare `astro build`; ellers blokkerer
CSP-en stilarket.

### Sjekk lokalt uten innlogging

```sh
npm run build
npx wrangler deploy --dry-run -c sites/sngroup/wrangler.jsonc   # leser dist og oppsettet, laster ikke opp noe
npx wrangler dev -c sites/sngroup/wrangler.jsonc                # kjører Worker-en lokalt på http://localhost:8787
```

## Hvorfor rotmappen og ikke `sites/<navn>` som Path

Nettstedene henter designpakken (`@sngroup/design`) fra npm workspaces. Workers Builds kjører `npm install` i Path, og
bare installasjon fra rotmappen kobler workspaces sammen. Med `sites/<navn>` som Path ville installasjonen prøve å hente
`@sngroup/design` fra npm og feile. Byggekommandoen med `-w` bygger likevel bare det ene nettstedet, `-c` peker deploy på
riktig wrangler-fil, og watch paths gjør at en endring i `sites/hengsel` ikke bygger sngroup på nytt.

## Egne domener

1. Legg domenet til som sone i Cloudflare (hvis det ikke er der) og pek navnetjenerne hos registraren til Cloudflare.
2. I Worker-en: Settings → Domains & Routes → Add → **Custom domain** → `sngroup.no`, og så `www.sngroup.no`.
   Cloudflare lager DNS-postene og sertifikatet selv når sonen ligger i samme konto.
3. Gjør det samme for `hengsel.no` og `www.hengsel.no` i Worker-en `hengsel`, og `byggem.no` og `www.byggem.no` i
   Worker-en `byggem`.

## www til apex

`_redirects` støtter bare stier, ikke domener, så www → apex kan ikke ligge der. Gjør det med en Redirect Rule i sonen,
én gang per domene:

Sonen (f.eks. `sngroup.no`) → Rules → Overview → Create rule → Redirect Rule → malen **«Redirect from WWW to root»**:

- When incoming requests match: Hostname equals `www.sngroup.no`
- Then: Dynamic, expression `concat("https://sngroup.no", http.request.uri.path)`, status 301, preserve query string på

Gjenta for `hengsel.no` og `byggem.no`. `www.<domene>` må ha en proxied DNS-post, og det får den når www er lagt til
som custom domain i trinn 2 over.

Sjekk etterpå: `curl -sI https://www.sngroup.no/personvern` skal gi `301` med `location: https://sngroup.no/personvern`.

## Sikkerhetshoder

Workers med statiske filer leser `_headers` og `_redirects` fra `assets.directory` (`dist`), på samme måte som Pages.
Filene serveres ikke selv (`/_headers` gir 404). `sites/<navn>/public/_headers` gjelder alle sider:

- `Content-Security-Policy`: bare egne filer (`'self'`), ingen inline-skript, ingen eksterne kilder, `frame-ancestors 'none'`.
  Inline-CSS er tillatt bare med hashen som `csp-hasher.mjs` legger inn i `dist/_headers` ved bygging.
- `Strict-Transport-Security` (1 år, uten `includeSubDomains`, så andre underdomener ikke påvirkes)
- `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` slår av kamera, mikrofon, posisjon, betaling og USB
- `Cross-Origin-Opener-Policy: same-origin`
- `/_astro/*` (filer med hash i navnet) caches i ett år.

Sjekk etter publisering:

```sh
curl -sI https://sngroup.no | grep -iE 'content-security|strict-transport|x-frame'
curl -s -o /dev/null -w '%{http_code}\n' https://sngroup.no/finnes-ikke   # skal gi 404 (med 404-siden)
```

## Ting å la være av

- Cloudflare Web Analytics / Zaraz: ikke slå på (ingen sporing). Web Analytics ville også trenge en endring i CSP-en.
- Ingen `main` i wrangler.jsonc og ingen Worker-kode: nettstedene er rent statiske.
- Ingen `main` og ingen Worker-kode for sngroup og byggem: de er rent statiske. hengsel har bare skriptet for `/apptest`.
- Ingen bindinger (KV, D1, R2) og ingen `account_id` i repoet. Den eneste hemmeligheten er passordet for
  hengsel.no/apptest, og den ligger bare i Cloudflare.
- `run_worker_first`: bare `["/apptest", "/apptest/*"]` i hengsel. Ikke utvid den; resten av nettstedet skal ikke gå
  gjennom kode.

## hengsel.no/apptest (passord)

Siden som viser montørene hvordan de installerer testversjonen av Hengsel (K-107). Den ligger bak ett felles passord,
står ikke i menyen, i `sitemap.txt` eller i lenker fra andre sider, og har `noindex, nofollow`.

Slik virker det:

- `sites/hengsel/wrangler.jsonc` har `"main": "./worker/apptest.ts"` og `assets.run_worker_first: ["/apptest", "/apptest/*"]`.
  Skriptet kjører bare for de stiene. Alt annet serveres som statiske filer, uten kode.
- Uten gyldig informasjonskapsel viser `/apptest` passordsiden (`dist/apptest/passord.html`). Skjemaet sender passordet med
  POST til `/apptest`. Riktig passord gir 303 til `/apptest` og informasjonskapselen `hengsel_apptest` (HttpOnly, Secure,
  SameSite=Lax, Path=/apptest, 30 dager). Feil passord gir 401 og «Feil passord. Prøv igjen, eller spør Eirik.».
- Informasjonskapselen er en utløpstid og en HMAC-signatur, ikke passordet. Signaturnøkkelen lages av `APPTEST_NOKKEL` og
  `APPTEST_PASSORD`, så når passordet byttes, må alle skrive det nye.
- Mangler en av hemmelighetene, er siden låst (503 «Siden er låst. Passordet er ikke satt opp ennå.»).
- Alle svar fra `/apptest` har `X-Robots-Tag: noindex, nofollow` og `Cache-Control: private, no-store`. App-ikonet ligger
  under `/apptest/` og er også bak passordet.

### Sette eller bytte passordet

Fra rotmappen i repoet, innlogget med `npx wrangler login` (eller i dashbordet: Worker `hengsel` → Settings →
Variables and Secrets → Add → Type **Secret**):

```sh
npx wrangler secret put APPTEST_PASSORD -c sites/hengsel/wrangler.jsonc   # skriv passordet når wrangler spør
openssl rand -base64 32                                                    # lag en tilfeldig nøkkel …
npx wrangler secret put APPTEST_NOKKEL -c sites/hengsel/wrangler.jsonc    # … og lim den inn her
```

Begge må settes før `/apptest` kan åpnes. Nøkkelen settes én gang. For å bytte passord kjøres bare den første
kommandoen på nytt; gamle informasjonskapsler slutter da å virke. Bytter du `APPTEST_NOKKEL`, må også alle logge inn på
nytt. Hemmelighetene skal aldri stå i repoet, i en innsjekket `.dev.vars` eller i rapporter.

Sjekk etterpå (uten informasjonskapsel skal du få passordsiden, ikke 503):

```sh
curl -sI https://hengsel.no/apptest | grep -iE '^HTTP|x-robots|cache-control|content-security'
```

### Bytte TestFlight-lenken

Lenken er konstanten øverst i `sites/hengsel/src/pages/apptest.astro`:

```ts
const TESTFLIGHT_LENKE = "{{TESTFLIGHT_LENKE}}";
```

Så lenge den står som plassholder (starter med `{{`), vises den dempede knappen «iPhone og iPad – lenke kommer snart».
Bytt den til den offentlige TestFlight-lenken (`https://testflight.apple.com/join/…`), commit og push. Da blir knappen
«iPhone og iPad – åpne i TestFlight». Android-lenken ligger rett under (`ANDROID_LENKE`).

### Teste lokalt

Lag `sites/hengsel/.dev.vars` (står i `.gitignore`, sjekkes aldri inn) med et testpassord:

```sh
printf 'APPTEST_PASSORD=%s\nAPPTEST_NOKKEL=%s\n' "et-testpassord" "$(openssl rand -base64 32)" > sites/hengsel/.dev.vars
npm run build -w sites/hengsel
npx wrangler dev -c sites/hengsel/wrangler.jsonc          # http://localhost:8787/apptest
node scripts/skjermbilder-apptest.mjs                       # skjermbilder og sjekker mot wrangler dev
```

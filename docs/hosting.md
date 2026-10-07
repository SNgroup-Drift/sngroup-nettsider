# Hosting: Cloudflare Workers med statiske filer

Bestemt 07.10.2026 (erstatter Pages-beslutningen fra 04.10): hvert nettsted er sin egen Cloudflare Worker med
statiske filer, bygd med **Workers Builds** og Git-integrasjon fra samme repo (`SNgroup-Drift/sngroup-nettsider`).
Workerne kjører ingen kode: de serverer bare `sites/<navn>/dist`. Eirik kobler Cloudflare til GitHub selv.

Repoet har ingen API-nøkler, ingen kontoinformasjon og ingen wrangler-innlogging. Det eneste Cloudflare-oppsettet i
repoet er `sites/<navn>/wrangler.jsonc`:

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
- Ingen bindinger (KV, D1, R2, hemmeligheter) og ingen `account_id` i repoet.
- `run_worker_first`: ikke sett (det finnes ingen Worker-kode å kjøre).

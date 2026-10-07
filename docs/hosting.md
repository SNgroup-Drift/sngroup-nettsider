# Hosting: Cloudflare Pages

Bestemt 04.10: ett Cloudflare Pages-prosjekt per nettsted, alle fra samme repo (`SNgroup-Drift/sngroup-nettsider`), med
Git-integrasjon. Ingen API-nøkler og ingen wrangler. Eirik kobler Cloudflare til GitHub selv.

## Innstillinger per prosjekt

Workers & Pages → Create → Pages → Connect to Git → velg `SNgroup-Drift/sngroup-nettsider`.

| | sngroup | hengsel | byggem |
|---|---|---|---|
| Project name | `sngroup` | `hengsel` | `byggem` |
| Production branch | `main` | `main` | `main` |
| Framework preset | None | None | None |
| Root directory (advanced) | *(tom = rotmappen)* | *(tom)* | *(tom)* |
| Build command | `npm run build -w sites/sngroup` | `npm run build -w sites/hengsel` | `npm run build -w sites/byggem` |
| Build output directory | `sites/sngroup/dist` | `sites/hengsel/dist` | `sites/byggem/dist` |
| Miljøvariabel | `NODE_VERSION` = `22` | `NODE_VERSION` = `22` | `NODE_VERSION` = `22` |
| Build watch paths, include | `sites/sngroup/*`, `packages/*`, `scripts/*`, `package.json`, `package-lock.json` | `sites/hengsel/*`, `packages/*`, `scripts/*`, `package.json`, `package-lock.json` | `sites/byggem/*`, `packages/*`, `scripts/*`, `package.json`, `package-lock.json` |
| Custom domains | `sngroup.no`, `www.sngroup.no` | `hengsel.no`, `www.hengsel.no` | `byggem.no`, `www.byggem.no` |

**Hvorfor rotmappen og ikke `sites/<navn>` som root directory:** nettstedene henter designpakken
(`@sngroup/design`) fra npm workspaces. Cloudflare kjører `npm install` i root directory, og bare installasjon fra
rotmappen kobler workspaces sammen. Med `sites/<navn>` som root ville installasjonen prøve å hente `@sngroup/design`
fra npm og feile. Byggekommandoen med `-w` bygger likevel bare det ene nettstedet, og watch paths gjør at en endring i
`sites/hengsel` ikke bygger sngroup på nytt.

Node: `.nvmrc` i rotmappen sier 22. `NODE_VERSION` = `22` gjør det samme i byggmiljøet (Astro krever 22.12 eller nyere).
Build system version: 3 (standard).

Byggekommandoen kjører `astro build` og så `scripts/csp-hasher.mjs`, som legger hashen for inline-CSS-en inn i
`Content-Security-Policy` i `dist/_headers`. Bygg alltid med `npm run build`, ikke bare `astro build`; ellers blokkerer
CSP-en stilarket.

## Domener

1. Legg domenet til som sone i Cloudflare (hvis det ikke er der) og pek navnetjenerne hos registraren til Cloudflare.
2. I Pages-prosjektet: Custom domains → Set up a custom domain → `sngroup.no`, og så `www.sngroup.no`. Cloudflare lager
   DNS-postene selv når sonen ligger i samme konto.
3. Gjør det samme for `hengsel.no` og `byggem.no` i sine prosjekter.

## www til apex

`_redirects` i Cloudflare Pages støtter bare stier, ikke domener, så www → apex kan ikke ligge der
([Cloudflare: Redirects](https://developers.cloudflare.com/pages/configuration/redirects/),
[Redirecting www to domain apex](https://developers.cloudflare.com/pages/how-to/www-redirect/)). Gjør det slik, én gang per sone:

Sonen (f.eks. `sngroup.no`) → Rules → Overview → Create rule → Redirect Rule → malen **«Redirect from WWW to root»**:

- When incoming requests match: Hostname equals `www.sngroup.no`
- Then: Dynamic, expression `concat("https://sngroup.no", http.request.uri.path)`, status 301, preserve query string på

Gjenta for `hengsel.no` og `byggem.no`. `www.<domene>` må ha en proxied DNS-post (oransje sky), og det får den når
www er lagt til som custom domain i trinn 2 over.

Sjekk etterpå: `curl -sI https://www.sngroup.no/personvern` skal gi `301` med `location: https://sngroup.no/personvern`.

## Sikkerhetshoder

`sites/<navn>/public/_headers` gjelder alle sider:

- `Content-Security-Policy`: bare egne filer (`'self'`), ingen inline-skript, ingen eksterne kilder, `frame-ancestors 'none'`.
  Inline-CSS er tillatt bare med hashen som `csp-hasher.mjs` legger inn ved bygging.
- `Strict-Transport-Security` (1 år, uten `includeSubDomains`, så andre underdomener ikke påvirkes)
- `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` slår av kamera, mikrofon, posisjon, betaling og USB
- `Cross-Origin-Opener-Policy: same-origin`
- `/_astro/*` (filer med hash i navnet) caches i ett år.

Sjekk etter publisering: `curl -sI https://sngroup.no | grep -i content-security`.

## Ting å la være av

- Cloudflare Web Analytics / Zaraz: ikke slå på (ingen sporing). Web Analytics ville også trenge en endring i CSP-en.
- Ingen Pages Functions: nettstedene er rent statiske.

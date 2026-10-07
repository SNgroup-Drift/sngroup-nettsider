# byggem.no – endringer fra dagens side (Lovable)

Grunnlag: SNgroup-Drift/sngroup-nettsider, main, `docs/kilde/byggem.no/` (07.10.2026).

Filer: `Forside.dc.html`, `Prosjekter.dc.html`, `Kontakt.dc.html`, `Personvern.dc.html`, `404.dc.html`. Felles deler: `Sidehode` (toppfelt), `Bunn` (familiebånd og bunntekst), `Plantegning Verksted`. `Oversikt.dc.html` viser alle sider i PC 1440 og mobil 390, lys og mørk (`?tema=lys|mork`).

## Tekst
- All tekst, alle tjenester, steg, nøkkeltall og prosjekter er ordrett fra dagens side (`index.html`, `prosjekter.html`, `kontakt.html`, `routes-*.js`, `projects-*.js`, `personvern-*.js`). Ingen nye prosjekter, tall, kunder eller sitater.
- Personvern er ordrett, med post@byggem.no som kontakt.
- Ny tekst er bare familiegrepene og noen få etiketter: eyebrows («Montasje · Snekkerarbeid», «Hva vi gjør», «Fra befaring til overlevering», «Referanser», «Kontakt», «byggem.no»), metalinjer med « · », «Bilde kommer» på prosjektkortene, «En del av SN Group», 404-teksten og feilmeldingene i skjemaet (fra byggEM-designsystemets UI-kit, pluss «Velg hva det gjelder.» og «Kryss av for å sende.»).
- Bunnteksten skriver «org.nr.» med liten o (var «Org.nr.»).

## Oppbygging
- Menyen er kortet ned til Tjenester, Slik jobber vi og Prosjekter, pluss knappen «Be om pris». Montasje og Snekker er tatt ut, fordi /montasje og /snekker ikke finnes i kilden. «Se montasjetjenester» og «Se snekkeroppdrag» peker til tjenestene på forsiden.
- Mobil har ingen hamburgermeny: toppfeltet viser logo, Prosjekter og «Be om pris».
- Forsiden følger familien: hero → hva vi gjør (målgruppene og tjenestene) → slik jobber vi (stegene og referansene) → kontakt. Nøkkeltallene er flyttet inn i referansedelen.
- Heroen har plantegningen «Verksted» (1:50, 3 000 × 2 400 mm, 1,5 px strek i tekstfargen), samme tegning som rommet på sngroup.no.
- Prosjekter og Personvern har fått kontaktbåndet / familiens personvernmal (rader med overskrift til venstre).
- Ny 404-side: tomt rom i plantegningsstrek, «404», «Dette rommet finnes ikke.» og «Til forsiden →».
- Familiebånd over bunnteksten på alle sider: SN Group-symbolet, «En del av SN Group» og sngroup.no · hengsel.no · byggem.no (byggem.no er markert, ikke lenket).
- Innholdsbredde 1180 px (var 1200) og sidemarger `clamp(16px, 4vw, 40px)` som hengsel.no.

## Uttrykk
- Farger, Poppins/Inter, knapper, felt, tjenestekort og nøkkeltall kommer fra byggEM-designsystemet. Tegl bare på knapper, lenker, tall og tankestreker.
- Eyebrows står i versaler med litt sperring (familiegrep). Designsystemet sier ellers nei til versaler med sperring, så det gjelder bare eyebrows.
- Prosjektkortene har Sand-flate med prosjektnavn og «Bilde kommer» i stedet for foto.
- Positiv logo på lyse flater, negativ på mørke. Kontaktbånd og bunntekst er Mørkbrun også i mørk modus, med en hårstrek mot siden.
- Mørk modus følger `prefers-color-scheme` (designsystemets `[data-theme="dark"]`).

## Kontaktskjema
- Dagens skjema sender til en tjeneste hos Lovable. En statisk side har ingen server, så skjemaet fyller nå ut en e-post til post@byggem.no i brukerens eget e-postprogram. Feltene og valgene er de samme.
- **Må avklares:** personvernteksten sier «Skjemaet samler inn …». Teksten er ordrett, men bør sjekkes når skjemaet ikke lenger lagrer noe selv.

## Til Code (Astro)
- Lenkene peker på `.dc.html` i prototypen. I Astro: `/`, `/prosjekter`, `/kontakt`, `/personvern`, 404-side i `wrangler.jsonc`.
- Prototypen laster Poppins og Inter fra Google Fonts (designsystemets `fonts.css`). I den ferdige siden selvhostes de med `@fontsource/poppins` (300, 400, 500) og `@fontsource-variable/inter`.
- Ingen eksterne skript. Lovable-skriptet `~flock.js` (analyse) og Lovable-merket er fjernet. Ingen informasjonskapsler, ingen sporing. SN Group-symbolet er inline SVG.
- Skjemaet og temabyttet trenger litt skript: legg det i `<script>` i Astro-komponenten (CSP `script-src 'self'`).
- Delingsbilde, favicon og apple-touch-icon er kopiert fra `filer/` til `assets/`. `og:image` må være en full URL i Astro.
- `Plantegning Verksted` tilsvarer `Plantegningsstrek rom="verksted"` (og `rom="tomt"` på 404) i packages/design, med byggEMs farger.

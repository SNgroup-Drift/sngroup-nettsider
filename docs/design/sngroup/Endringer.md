# Endringer fra dagens sngroup.no

Grunnlag: SNgroup-Drift/sngroup-nettsider, main, sites/sngroup (07.10.2026).

## Sider
- **Forside** (`Forside.dc.html` → `src/pages/index.astro`): tekst, plantegning, virksomheter, Hengsel-telefonen og kontakt er uendret.
- **/personvern** (`Personvern.dc.html`): teksten er ordrett fra `src/content/personvern.ts`.
- **/design** (`Design.dc.html`): som i dag, med en ny seksjon «Familiegrep». SiteHeader-demoen er erstattet av Toppfelt.
- **404** (`404.dc.html`): ny tekst og form, se under.

## Endret
1. **Innholdsbredde 1180 px** (var 1200). `--bredde: 1180px` i `tokens.css`. Sidemargene er uendret (`--gutter`).
2. **Rekkefølge og navn på virksomhetene:** Kjøkken og interiør, Hengsel, byggEM, Eiendom, Investeringer. «ByggEM AS» skrives nå «byggEM» i chip, rad og plantegning, og «byggEM AS» i teksten (byggEMs egen skrivemåte). Ellers er teksten uendret.
3. **Familiebånd** over bunnteksten på alle sider: symbolet (rommet sett ovenfra), «En del av SN Group» og sngroup.no · hengsel.no · byggem.no. Siden du står på er markert og ikke lenket. «En del av SN Group» er tatt ut av bunnteksten (`visDelAv={false}` på alle tre), siden båndet viser det.
4. **404:** «Siden finnes ikke.» er erstattet med etiketten «404», tittelen «Dette rommet finnes ikke.», et tomt rom i plantegningsstrek og knappen «Til forsiden →».
5. **Toppfeltet** viser logoen (40 px, lys og mørk variant) i stedet for ordmerket «SN Group» + «ES-HOLDING AS», som i designsystemet.
6. **Seksjonsrekkefølge:** hero → hva vi gjør (Virksomheter) → slik jobber vi (Hengsel) → kontakt. Rekkefølgen er den samme som i dag. Etikettene er ikke endret.

## Nye komponenter (packages/design)
- `Toppfelt` – logo eller ordmerke til venstre, korte lenker og én kontaktknapp til høyre. Erstatter SiteHeader.
- `Plantegningsstrek` – `rom="hus" | "entre" | "verksted" | "tomt"`. 1,5 px strek uansett størrelse (`vector-effect: non-scaling-stroke`), 1:50, mål i mm, i `--tekst`. Hengselpunktet i `--aksent`.
- `Familiebaand` – `gjeldende="sngroup.no" | "hengsel.no" | "byggem.no"`.
- `IkkeFunnet` – 404-innhold med `hjem` og `hjemTekst`.

Alle komponentene bruker bare de semantiske variablene (`--bakgrunn`, `--flate`, `--linje`, `--linje-svak`, `--ikon`, `--tekst`, `--tekst-dempet`, `--aksent`, `--radius`, `--radius-pille`, `--font-overskrift`). hengsel.no og byggem.no setter variablene til sine egne farger. Eksempler på /design.

## Uendret
- Plantegningen i heroen beholder dagens strektykkelser (6 / 3 / 1,2 px) og samspillet med chipene og radene.
- Ingen nye påstander, tall eller kunder.

## Til Code (Astro)
- Lenkene mellom sidene peker på `.dc.html`-filene i prototypen. I Astro: `/`, `/personvern`, `/design`.
- Skriftene lastes fra jsDelivr i prototypen. I den ferdige siden selvhostes `@fontsource-variable/newsreader` og `@fontsource-variable/inter` som i dag. byggem.no selvhoster Poppins på samme måte, ikke fra Google Fonts.
- Plantegningen og telefonen trenger skript: legg dem i `<script>` i Astro-komponentene (CSP `script-src 'self'`), som i dag.
- Ingen eksterne skript, ingen sporing, ingen informasjonskapsler.
- Lys og mørk modus følger `prefers-color-scheme`. `?tema=lys|mork` i prototypen tilsvarer `data-theme` på `<html>`.

# byggEM – designsystem

byggEM er et tømrer- og montasjefirma i Trondheim og omegn (byggEM AS, org.nr. 932 104 148), etablert 2023 og en del av SN Group. Vi monterer kjøkken, bad, garderobe og innredning for forhandlere og entreprenører, og tar mindre snekkeroppdrag. Nettsiden er byggem.no.

> Merkevareambisjon: **Vi bygger for folk som skal bo lenge.**
> Stemmen: **Vi snakker som vi bygger: enkelt, presist og til å stole på.**

Personlighet: **solid** (kan faget), **ryddig** (byggeplass, avtale, kommunikasjon), **nær** (lokale, tilgjengelige), **fremoverlent** (nytt når det gjør jobben bedre).

## Flater / produkter
- **byggem.no** – markedsnettside (forside, montasje, snekker, prosjekter, kontakt, personvern). Gjenskapt i `ui_kits/website/`.
- Tilbud, e-post, dokumenter, bil og arbeidstøy følger samme profil (ingen kilder for disse ennå).

## Kilder
- Lokal mappe `byggem_designsystem/` (pakket 07.10.2026 fra claude.ai-artefakten «byggEM»): `README.md` (merkevarehåndboka), `tokens.json` (**fasit**), `tokens.css`, `logo/` (5 PNG), `components/` (bundle.css, bundle.js, index.d.ts – `window.ByggEM`).
- Håndbok: «byggEM Merkevarehåndbok, utkast V.0.1 (2026-09-05)».
- GitHub: **https://github.com/SNgroup-Drift/sngroup-nettsider** – `docs/kilde/byggem.no/` er ferdig tegnet DOM av live-sida (Lovable/React), med logoer, favicon og delingsbilde. `sites/byggem/` er et Astro-skjelett for neste versjon. Utforsk repoet videre for flere detaljer når du bygger nye sider.
- Opplastede logoer i `uploads/` (kopiert til `assets/logo/`).

---

## CONTENT FUNDAMENTALS

**Språk:** norsk bokmål. **Person:** firmastemme – «vi» og «oss», aldri «jeg». Leseren er «dere» (bedrift) eller «deg» (privat). Avsender er byggEM AS, ikke en person.

**Merkenavn:** alltid `byggEM` – liten b, store E og M, i ett ord. Juridisk: «byggEM AS».

**Tone:** rolig, konkret, hyggelig uten å være kameratslig. Ingen utropstegn, ingen emoji, ingen superlativer («Norges beste»).

**Konkret framfor poetisk.** Tall, frister og materialnavn i stedet for adjektiver.
- Ja: «174 leiligheter på Basseløkka, levert 2025» · «Fastpris eller timepris, avtalt før vi starter.»
- Nei: «Mange fornøyde kunder» · «Vi leverer kvalitet i verdensklasse!»

**Setningsform** i titler og knapper: «Be om befaring», «Se alle prosjekter». Ikke Title Case, ikke versaler med sperring.

**Knapper:** verb først – «Be om pris», «Ring 976 06 500», «Send henvendelse».

**Struktur:** ett budskap per avsnitt, aktive setninger, korte avsnitt. Hver side, e-post og tilbud slutter med én tydelig handling.

**Faget:** bruk riktige ord (dampsperre, fall mot sluk, foringer, gerikter) og forklar når det trengs.

**Geografi:** virkeområde – «Trondheim og omegn», «Trondheimsområdet». Aldri gateadresse eller kontorsted.

**Faste linjer:**
- Kontakt: **976 06 500 · post@byggem.no · byggem.no**
- Juridisk: **byggEM AS · Org.nr. 932 104 148**
- Virkeområde: «Vi jobber i Trondheim og omegn.»

**Eksempler fra byggem.no:** «Montasje og snekkerarbeid i Trondheim og omegn» · «Vi tar mindre, avgrensede snekkerjobber i Trondheimsområdet. Vi avtaler omfang og pris før vi starter.» · «Eget verktøy, ryddig arbeidsplass, beskjed med en gang noe avviker.» · «Har dere en jobb til oss?»

---

## VISUAL FOUNDATIONS

**Farger** – hentet rett ut av logoen, bevisst dempet. Få farger om gangen: én mørkebrun, én lys, eventuelt aksent.
- Mørkbrun `#31261D` (tekst, logo, mørke flater) · Kaffe `#6B5B4A` (dempet tekst, sekundær mørk flate) · Beige `#C3B5A7` (linjer, årstallet i logoen) · Sand `#DDD4CB` (rolige bånd, tabellrader) · Kalk `#EFEAE4` (kort, felt) · Off-white `#FAF8F5` (hovedbakgrunn – aldri rent hvitt).
- **Tegl `#A25A32`** er eneste aksent: primærknapp, lenker, uthevede tall, tankestrek i lister. Maks ca. 5 % av flaten, aldri stor flate, aldri bak logoen. Hover `#8A4A27`.
- `danger #9B2C1F` og `success #3E6B3A` er skjema-tillegg, alltid med tekst.
- Mørkt tema (`[data-theme="dark"]`) er avledet: Mørkbrun bakgrunn, lysnet Tegl `#D4916A`. Bare skjerm, ikke trykk.
- Kontrast: brødtekst ≥ 4,5:1. `ink-muted` på Sand er bare 4,46:1 – bruk `ink` der.

**Typografi** – to skrifter, aldri flere. **Poppins** (geometrisk, nær logoen) til titler: Light 300 på `display` 64/1 og `h1` 44/1.05 med -0.02em, Regular på `h2` 32, Medium på `h3` 22. **Inter** til all løpende tekst: `ingress` 26/34, `body` 18/26, `body-sm` 15/22, `mellomtittel` SemiBold 18, `button` Medium 17, `label` Medium 14, `caption` 13. Mobil: display 40, h1 32, ingress 20/28. Ikke Poppins i brødtekst, ikke Inter SemiBold som overskrift, ingen teksteffekter.

**Luft** – rikelig. Skala 4/8/12/16/24/32/48/64/96. Seksjoner `space-9` (96) på desktop, `space-8` (64) på mobil. Sidemarg 48 / 16. Container 1200px. Brødtekst maks 65ch, titler maks 20ch.

**Bakgrunner** – ensfargede flater. Ingen gradienter, mønstre eller teksturer. Seksjoner skilles med fargebånd i rytme: Off-white → Kalk → Off-white → Sand → … → Mørkbrun kontaktbånd og footer.

**Hjørner** – logoen er rettvinklet, systemet står skarpt: `radius-0` foto, bånd, tabeller · `radius-1` 2px knapper, felt, tagger · `radius-2` 4px kort (største).

**Skygger** – ingen. Flater skilles med farge (`surface-raised`, `surface-quiet`) og 1px hårstreker (`line`, Beige). Ingen indre skygger, ingen blur, ingen transparens som effekt.

**Kort** – Kalk-flate, 4px radius, 24px indre luft, ingen kant og ingen skygge. Prosjektkort: 1px Beige-kant på Off-white med 3:2 bildeflate øverst.

**Linjer og rutenett** – «hårstrek-rutenett»: grid med `gap:1px` på Beige-bakgrunn gir tynne skillelinjer mellom felt. Steg og referanserader har 1px toppstrek.

**Hover** – korte fargeoverganger (150 ms): Tegl → mørkere Tegl; sekundærknapp får Kalk-fyll; menylenker blir Tegl. **Trykk** – ingen krymping eller skala. **Fokus** – 2px heltrukken `focus` (Mørkbrun), 2px avstand.

**Animasjon** – ingen pynt. Bare fargeovergang på hover. Respekter `prefers-reduced-motion`.

**Faste elementer** – headeren er sticky (80px, Off-white, 1px bunnstrek). Ellers ingenting fast.

**Foto** – ekte prosjekter og ekte folk; tre typer: før/etter, detalj og håndverk, folk i arbeid. Dagslys, naturlige varme farger, ryddig byggeplass, verneutstyr. 3:2 eller 16:9, radius 0. Ingen HDR, vignettering eller filtre. **Ingen arkivfoto.** Til egne bilder finnes: bruk illustrasjonene.

**Illustrasjoner** – ni håndtegnede strektegninger i Mørkbrun med punktskygge (stippling), transparent bakgrunn, i `assets/illustrasjoner/`: befaring, bad, garderobe, tre kjøkken (stort/middels/lite), detaljer (beslag), planlegging, nyproduksjon. Perspektiv, rolige interiører, litt grønt. Brukes på Off-white, Kalk eller Sand – aldri på mørke flater eller Tegl, aldri farget, beskåret eller med tekst oppå. Én illustrasjon per visning eller kort. Opprinnelig levert som Sigdal-illustrasjoner (filnavn `Sigdal_ill_0X`).

**Logo** – vektorfil: `assets/logo/byggem-logo.pdf`. Positiv på lyst (Off-white, Kalk, Sand, Beige), negativ på mørkt (Mørkbrun, Kaffe, foto), kompakt under 90 px / 20 mm, ensfarget for gravering/folie. Frisone = høyden på «b». Øverst til venstre eller nederst til høyre, aldri midtstilt i løpende materiell. Aldri mot Tegl, aldri i boks, aldri strukket.

---

## ICONOGRAPHY

byggEM har ingen egen ikonfamilie. **Ord fremfor ikoner.** Live-sida bruker bare ett ikon: hamburgermenyen (`lucide-menu`, 24px, strek 1,5) – og en `chevron-down` i nedtrekksfeltet. Trengs ikoner (telefon, e-post, pil), bruk **Lucide** fra CDN (`https://unpkg.com/lucide@0.469.0/dist/umd/lucide.min.js`) med 1,5px strek i `ink`. Ingen ikonfont, ingen PNG-ikoner, ingen emoji. Unicode brukes typografisk: tankestrek «–» i Tegl som listepunkt, midtpunkt «·» som skille i kontaktlinja.

---

## INDEX

- `styles.css` – inngang (bare `@import`).
- `tokens/` – `fonts.css` (Google Fonts), `colors.css` (lys + mørk), `typography.css` (+ `.t-*`-klasser), `spacing.css` (luft, radius, mål), `base.css` (grunnstil, `.site-container`).
- `components/components.css` – komponentstiler (`bem-`-prefiks).
- `components/` – React-komponenter:
  - `actions/` – **Button**, **Tag**
  - `forms/` – **Field**
  - `content/` – **ServiceCard**, **Stat**, **ReferenceList**, **ContactBlock** (eksporterer også `CONTACT`)
  - `layout/` – **Header**, **Footer**
- `ui_kits/website/` – byggem.no: forside, prosjekter, kontakt.
- `guidelines/` – spesimenkort for farge, type, luft og merke.
- `assets/logo/` – positiv, negativ, kompakt, ensfarget lys/mørk, farge/svart/hvit, kvadrat (PNG) og `byggem-logo.pdf` (vektor). `assets/favicon.png`, `apple-touch-icon.png`, `delingsbilde.png`.
- `assets/illustrasjoner/` – ni strektegninger (PNG, transparent).
- `templates/` – `tilbud/Tilbud.dc.html` (A4), `e-post/Epost.dc.html` (600 px), `dokument/Dokument.dc.html` (A4 rutine/notat). Alle har tweaken «visIllustrasjon».
- `SKILL.md` – for bruk som Agent Skill.
- `github.md` – kobling til kildrepoet.

Komponentlisten er den samme som i kilden (`byggem_designsystem/components/index.d.ts`). Ingen tillegg utover `onNavigate`-prop på Header (for prototyper uten ruter).

## Mangler
- Vektorlogo som SVG – PDF finnes.
- Fontfiler – Poppins og Inter lastes fra Google Fonts, ikke selvhostet.
- Egne prosjektfoto (illustrasjoner brukes inntil videre).
- Innholdet på /montasje, /snekker og /personvern er ikke gjenskapt.

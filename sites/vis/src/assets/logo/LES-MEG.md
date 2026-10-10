# Hengsel-logo for crm_v4 (10.10.2026)

Logoen er ny fra 09.10.2026 og erstatter dør-merket overalt i CRM-et.

## Hva logoen er
H-merket er bygget av kjøkkenet i app-ikonet: vater (venstre stamme), overskap, benkeplate, komfyr og underskap, høyskap (høyre stamme). Deretter «engsel» i TWK Lausanne 350, og produktnavnet «CRM» under ordet, høyrestilt, med en hake over. De tre delene står alltid samlet. Ren sort brukes ikke, bare Warm Black #31261D.

## To måter å bruke den på

**1. React-komponent (anbefalt i UI).** `HengselBrand.jsx.txt` (gi den nytt navn til `HengselBrand.jsx` i repoet) + `hengsel-brand.css`. Fargene følger flaten automatisk via CSS-variabler.

```jsx
import { Brand } from './HengselBrand';
<Brand size={20} />                 // sidemeny under kundelogo (size = px på «engsel»)
<Brand size={28} />                 // alene i meny
<Brand size={44} />                 // innlogging
<Brand size={16} />                 // bunntekst, PDF-bunnlinje (minimum)
<Brand size={20} crm={false} />     // uten «CRM» – bare inne i appen der produktet er gitt
<Brand markOnly size={24} />        // bare merket (ikon, trange flater)
<Brand size={20} href="/" />        // som lenke
```

Flaten styrer fargene:
- Lys flate (hvit, off white, beige): ingenting å gjøre – standard.
- Mørk modus: `data-theme="dark"` på `<html>` eller et foreldreelement.
- Deep Blue-flate (innloggingsside, app-topp): `data-surface="blue"` på flaten.

Komponenten krever at TWK Lausanne 350/650 er lastet i appen (den er det allerede i crm_v4).

**2. Statiske filer (e-post, PDF, bilder, innlogging-bakgrunn).** SVG-ene har konturert tekst og trenger ingen font.
- `hengsel-crm-logo-lys.svg` – hvit / off white / beige bakgrunn
- `hengsel-crm-logo-mork.svg` – Warm Black bakgrunn
- `hengsel-crm-logo-bla.svg` – Deep Blue #5074A9 bakgrunn (primær, innlogging)
- `hengsel-logo-*.svg` – samme uten «CRM»
- `hengsel-merke-*.svg` – bare merket, 74×72

Aldri -bla på lys flate eller -lys på blå.

## Hvor i CRM-et
- **Sidemeny:** kundens logo først (30 px høy, maks 180 bred), Hengsel 20 px under. Uten kundelogo: Hengsel 28 px alene.
- **Innlogging:** kundens logo i midten, Hengsel 44 px nederst på Deep Blue-flate (`data-surface="blue"`).
- **Kundeportal:** kundelogo øverst, «Levert med» + Hengsel 16 px i bunnteksten.
- **PDF / e-post:** Hengsel 16 px i bunnlinjen (`hengsel-crm-logo-lys.svg` i e-post).
- **Telefon:** bare kundelogo i toppfeltet, Hengsel nederst i menyen.
- **Fane/favicon:** `favicon.svg`, `png/favicon-32.png`, `png/favicon-192.png`, `png/apple-touch-icon-180.png`, `png/maskable-512.png`. `theme-color` = #5074A9.

```html
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon-32.png" sizes="32x32">
<link rel="apple-touch-icon" href="/apple-touch-icon-180.png">
<meta name="theme-color" content="#5074A9">
```

## App-ikon (montørappen)
- iOS: `png/app-ikon-1024.png` (lys), `png/app-ikon-mork-1024.png` (mørk), `hengsel-app-ikon-mono.svg` (tonet)
- Android adaptivt: forgrunn `png/android-foreground-1024.png`, bakgrunn ensfarget #5074A9, mono `hengsel-app-ikon-mono.svg`

## Regler
- Kundens logo står alltid først og størst. Hengsel er aldri større enn kundens.
- Minste bredde 120 px på skjerm. Luft rundt = merkets høyde.
- Ikke strekk, roter, skygge, kontur, gradient eller andre farger.
- Ikke tegn logoen manuelt – bruk komponenten eller filene.

## Fjernes
Alle referanser til det gamle dør-merket (to beige dører med blå hake) og tokens `--mark-door`, `--mark-line`, `--mark-front`, `--mark-knob`.

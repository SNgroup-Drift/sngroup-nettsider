# Hengsel – logopakke (09.10.2026)

Alle filer i denne mappen. SVG er kilde; PNG i `png/` er ferdig rastrert.

## Logo (merke + «engsel» + produkt)
- `hengsel-crm-logo-lys.svg` – lys bakgrunn (nettside, dokumenter)
- `hengsel-crm-logo-mork.svg` – mørk bakgrunn
- `hengsel-crm-logo-bla.svg` – på Deep Blue #5074A9 (primær, bruk denne på forsider og i app)
- `hengsel-ute-logo-*.svg` – samme for Hengsel UTE
- `hengsel-logo-*.svg` – uten produktnavn

Teksten ligger som `<text>` i TWK Lausanne. Gjør om til konturer i Illustrator/Figma (Outline/Flatten) før bruk der fonten ikke er installert.

## Merke alene
- `hengsel-merke-lys/-mork/-bla.svg` – 74×72. Minimum 16 px høyt.

## App-ikon
- `hengsel-app-ikon-lys.svg` / `png/app-ikon-1024.png` – iOS (1024, uten avrunding – Apple runder selv)
- `hengsel-app-ikon-mork.svg` / `png/app-ikon-mork-1024.png` – iOS mørk modus
- `hengsel-app-ikon-mono.svg` – iOS tonet / Android mono (merke i Warm Black)
- `hengsel-app-ikon-android.svg` / `png/android-foreground-1024.png` – Android adaptivt forgrunnslag (merket innenfor sikker sone). Bakgrunnslag: ensfarget #5074A9.
- `png/maskable-512.png` – PWA maskable

## Nettside
- `favicon.svg` / `png/favicon-32.png` / `png/favicon-192.png`
- `apple-touch-icon.svg` / `png/apple-touch-icon-180.png`

```html
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon-32.png" sizes="32x32">
<link rel="apple-touch-icon" href="/apple-touch-icon-180.png">
<meta name="theme-color" content="#5074A9">
```

## Farger
- Deep Blue #5074A9 – bakgrunn, grep, ovn, hake
- Dusty Blue #8FA9D1 – vater
- Krem #F2E9DB – skap på blå/mørk bakgrunn
- Beige 1 #C3B5A7 – skap på lys bakgrunn
- Warm Black #31261D – «engsel» på lys bakgrunn, mørk bakgrunn. Ren sort brukes ikke.
- Off White #FBF9F6 – «engsel» på mørk bakgrunn

## Regler
- Produktnavn (CRM/UTE) står alltid under ordet, høyrestilt, med hake over.
- Luft rundt logoen: minst merkets høyde.
- Ikke strekk, roter, legg på skygge eller bytt farger.
- Kundens logo står alltid først og størst der Hengsel er leverandør.

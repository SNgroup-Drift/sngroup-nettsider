# Hengsel – app-ikon L9 (fasit 08.10.2026)

Erstatter ikonet som ble valgt tidligere 08.10. Motiv: kjøkken med krem skap og blå detaljer på Hengsel-blå bakgrunn (#5074A9). Ingen sort.

| Fil | Bruk |
|---|---|
| icon.png | iOS lys og standard `icon` (1024, ugjennomsiktig, uten avrunding) |
| icon-dark.png | iOS mørk (gjennomsiktig bakgrunn, samme farger som lys) |
| icon-tinted.png | iOS tonet (gråtone) |
| adaptive-foreground.png | Android adaptivt, forgrunn innenfor sikker sone |
| adaptive-background.png | Android adaptivt, bakgrunn #5074A9 |
| adaptive-monochrome.png | Android 13 tema-ikon |
| icon-kilde.svg | Kilde med avrundede hjørner (for nettside, hengsel.no, butikk-oversikt) |

`montorapp/app.json`:

```json
"icon": "./assets/ikon/icon.png",
"ios": { "icon": { "light": "./assets/ikon/icon.png", "dark": "./assets/ikon/icon-dark.png", "tinted": "./assets/ikon/icon-tinted.png" } },
"android": { "adaptiveIcon": { "foregroundImage": "./assets/ikon/adaptive-foreground.png", "backgroundImage": "./assets/ikon/adaptive-background.png", "monochromeImage": "./assets/ikon/adaptive-monochrome.png", "backgroundColor": "#5074A9" } },
"splash": { "backgroundColor": "#5074A9" }
```

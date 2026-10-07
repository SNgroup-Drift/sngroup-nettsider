# Kilde for K-87 del 2 (hentet 07.10.2026)

Hentet av Claude fra de publiserte sidene i Lovable, etter Eiriks valg (nettsider-del2-kilde-0710 = A). Bruk dette som utgangspunkt når hengsel.no og byggem.no bygges i repoet. Ikke endre filene her; de er en kopi av det som er live.

## hengsel.no (v1.3)
- index.raw.html og personvern.raw.html: sidene slik serveren sender dem (statisk HTML med innebygd skript som setter inn bildene).
- index.html og personvern.html: ferdig tegnet DOM fra headless Chrome.
- filer/img/: 24 skjermbilder (webp). Skriptet bruker img/<nøkkel>.webp. Hvis en nøkkel i index.raw.html mangler bilde her, si fra i rapporten.
- Skjermbildene har oppdiktede navn. Bruk dem som de er.

## byggem.no
- index.html, prosjekter.html, kontakt.html og personvern.html: ferdig tegnet DOM fra headless Chrome (Lovable/React).
- *.raw.html: skallet serveren sender.
- filer/assets/: logoer (positiv og negativ), stilark og skript fra bygget. Skriptene er bare til oppslag.
- filer/delingsbilde.png: delingsbildet (og:image).

## Gjelder for del 2
- ByggEM har ingen postadresse på nettsidene (Eirik 07.10): bare org.nr. 932 104 148 og drift@sngroup.no.
- Palett for hengsel.no er ikke avgjort ennå (SN Group-paletten eller Hengsel-fargene). Ikke gjett.
- Tekst og påstander skal være de samme som på dagens sider, med mindre Eirik har bestemt noe annet.

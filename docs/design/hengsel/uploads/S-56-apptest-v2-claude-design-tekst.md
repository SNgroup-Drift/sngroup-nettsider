# S-56 · hengsel.no/apptest v2 – tekst til Claude Design

Laget 08.10.2026 (K-114). Bygger videre på S-56-claude-design-tekst.md (v1, 07.10). Nytt i v2: delen «Prøv med
demobrukerne» med demopassordet, PDF-nedlasting og at siden ligger bak passord.

## Slik starter du
1. claude.ai/design › New design. Velg designsystemet «Hengsel Design System».
2. Trykk + nederst › Code › velg SNgroup-Drift/sngroup-nettsider (main). Dagens side ligger i
   sites/hengsel/src/pages/apptest.astro, og designfasiten fra v1 i docs/design/hengsel/apptest/.
3. Trykk + › Reference another project › velg hengsel.no-prosjektet, så siden får samme toppfelt, familiebånd og bunntekst.
4. Legg ved app-ikonet: hengsel_ikon_ios_1024.png (og mørk variant). De ligger i SharePoint Drift › 05 Montorappen ›
   01 S-28_Hengsel-merke.
5. Lim inn teksten under.

KOPIER FRA HER


Tegn undersiden hengsel.no/apptest på nytt. Siden hjelper dem som er invitert til å teste montørappen Hengsel: installere appen, og prøve den med demobrukerne. Bruk Hengsel Design System. Ta utgangspunkt i dagens side (sites/hengsel/src/pages/apptest.astro) og fasiten i docs/design/hengsel/apptest/, men gjør den roligere og lettere å følge på telefon.

Hvem og hvor
- Leserne er montører, firmaledere, utkjørere og ansatte som har fått lenken og et passord fra Eirik. De fleste åpner siden på telefonen. Tegn mobil 390 først, deretter PC 1440. Lys og mørk modus.
- Siden ligger bak et passord (egen enkel passordside, finnes fra før). Tegn også den: tittel «Hengsel apptest», ett passordfelt, knappen «Gå videre», og feilmeldingen «Feil passord. Prøv igjen.».
- Én oppgave om gangen, få ord, store knapper. Ikke salgstekst.

Innhold, i denne rekkefølgen

1. Toppfelt og hero
- Toppfelt og bunntekst som resten av hengsel.no.
- Eyebrow: «Montørappen · testversjon 1.3.0».
- Tittel: «Slik installerer du Hengsel».
- Ingress: «Appen er i test. Den ligger ikke i App Store eller Play Butikk ennå, så du kan ikke søke den opp der. Du trenger en invitasjon, og så følger du stegene for telefonen din.»
- App-ikonet (vedlagt) slik det ser ut på hjemskjermen, med navnet «Hengsel» under. Ikke tegn det om.

2. Last ned (to store knapper)
- «iPhone og iPad – åpne i TestFlight» → {{TESTFLIGHT_LENKE}}.
- «Android – bli tester og last ned» → https://play.google.com/apps/internaltest/4701475978909247435
- Siden kjenner igjen telefonen og fremhever riktig knapp, med en linje under: «Du bruker iPhone – trykk den mørke knappen.» / «Du bruker Android – trykk den mørke knappen.» På PC: «Åpne denne siden på telefonen og trykk knappen for din telefon.»
- To tilstander for iPhone-knappen: a) lenken er ikke klar: dempet, «iPhone og iPad – lenke kommer snart», ikke klikkbar. b) lenken er klar: vanlig knapp.
- Ikke App Store- eller Google Play-merker. Bruk designsystemets pilleknapper.

3. Steg for steg (to kort, stablet på mobil)

iPhone og iPad · via TestFlight
1. Installer appen TestFlight fra App Store. Den er gratis og laget av Apple.
2. Åpne lenken du har fått på samme iPhone eller iPad.
3. Trykk Godta og deretter Installer i TestFlight.
4. Åpne Hengsel og logg inn med brukeren din.
5. Tillat kamera og Bluetooth når appen spør. Det trengs for skanning og laser.
Merknad: «Nye versjoner kommer i TestFlight. Slå på automatiske oppdateringer der, så slipper du å gjøre noe.»
Liten tekst: «En testversjon varer i 90 dager. Når en ny versjon er ute, oppdaterer TestFlight den.»

Android · via Play Butikk
1. Gi Eirik e-postadressen til Google-kontoen du bruker på telefonen.
2. Når du er lagt til, åpner du lenken på telefonen og trykker Bli tester.
3. Trykk Last ned fra Google Play og installer Hengsel.
4. Logg inn med brukeren din.
5. Tillat kamera, Bluetooth og enheter i nærheten når appen spør.
Merknad: «Har du en eldre testversjon (APK) av Hengsel, avinstaller den først. Ellers kan Play-versjonen ikke installeres.»
Liten tekst: «Det kan ta opptil 30 minutter fra du er lagt til, til appen dukker opp i Play Butikk.»

4. Prøv med demobrukerne (NY – gi den god plass, det er dette testerne bruker mest)
- Tittel: «Prøv med demobrukerne».
- Tekst: «I demoen er alt oppdiktet, og ingenting sendes ut. Velg «Demo» nederst på innloggingen i appen, og logg inn med brukernavnet og demopassordet. Alle brukerne har samme passord.»
- Passordet vises tydelig, i en egen flate med monospace-skrift og en «Kopier»-knapp: «Demopassord: ••••••••» (tegn med et oppdiktet eksempel, f.eks. «Demo-passord-2026»). Tegn også tilstanden uten passord: i stedet for flaten står «Passordet får du av den som inviterte deg.»
- Merknad (myk flate): «Foreløpig skriver du hele adressen: brukernavnet med @demo.invalid bak, for eksempel montor1@demo.invalid. Snart holder det med montor1.»
- To lister med brukernavn. Brukernavnet skal kunne trykkes for å kopiere det (vis en kort «Kopiert»-tilbakemelding).

  I appen (velg «Demo»)
  - montor1 – Montør – I dag, jobbsiden, mål og skisse, KS, avvik og Ferdig montert.
  - montor2 – Montør, polsk – Appen på polsk.
  - firmaleder1 – Firmaleder med team – Forespørsler, svar og fordeling av jobber.
  - firmaleder2 – Firmaleder uten ansatte – Egne jobber og forespørsler.
  - firmaleder3 – Firmaleder – Garderobe, skyvedører og bad.
  - utkjorer – Utkjører – Ruten, mottak på lager, levering og skade.
  - selger1 – Selger – Selgermodus i appen.

  I CRM-et (nettleseren)
  - selger1 – selger6 – Selgere i tre butikker (selger2 og selger6 er prosjektselgere)
  - leder – Leder og admin
  - montasjeleder – Montasjeleder og bestilling
  - bestilling – Bestilling
  - superadmin – Superadmin

- Knapp: «Last ned oversikten (PDF)» → /apptest/Logg_inn_i_demoen.pdf

5. Hvis noe ikke virker (enkel liste)
- Lenken sier at appen ikke er tilgjengelig: Du er ikke lagt til ennå. Gi beskjed til Eirik.
- Laseren blir ikke funnet: Slå på Bluetooth på telefonen, og trykk på Bluetooth-knappen på Bosch-laseren.
- Du kommer ikke inn med din egen bruker: Bruk samme e-post og passord som i CRM.
- Du kommer ikke inn i demoen: Sjekk at «Demo» er valgt nederst på innloggingen, og at du skriver hele adressen (montor1@demo.invalid).

6. Bunn
- Metalinje: «Hengsel 1.3.0 · iPhone, iPad og Android».
- Familiebånd og bunntekst som resten av hengsel.no.

Ikke ta med
- Butikknavn (siden er nøytral for alle Hengsel-testere), ekte kunder, montører eller skjermbilder med ekte data.
- Det ekte demopassordet. Bruk et oppdiktet eksempel i designet; det ekte settes inn av serveren.
- Nye påstander om hva appen kan.

Uttrykk
- Hengsel Design System: farger, kort, pilleknapper, avstand og logo i toppfeltet. App-ikonet bare som bilde i heroen.
- Skrift: Newsreader for titler og Inter for tekst.
- God kontrast og store trykkflater (minst 48 px høye knapper og kopier-flater).

Teknisk (for Code som bygger etterpå)
- Bygges som statisk Astro-side i SNgroup-Drift/sngroup-nettsider (sites/hengsel), bak Worker-passordet som i dag.
- Ingen eksterne skript, ingen sporing, ingen Google Fonts. Kopier-knappene og telefongjenkjenningen er små innebygde skript; siden skal virke uten skript (da vises bare teksten, uten kopier-knapper).
- Passordet settes inn av Workeren fra hemmeligheten DEMO_PASSORD. Behold disse merkene i markeringen: data-demopassord (flaten, skjult til passordet er satt inn), data-demopassord-verdi (der selve passordet står) og data-uten-demopassord (teksten som fjernes når passordet finnes). Også data-lastned, data-enhet og data-enhetslinje for knappene.
- noindex, nofollow. Siden står ikke i meny eller sitemap.
- Lag én fil for siden (mobil og PC, lys og mørk, med og uten passord, begge tilstandene for iPhone-knappen) og én for passordsiden, og en kort liste over valg du tok.


TIL HIT

## Åpent
- Skal demopassordet ha en «Kopier»-knapp? Antatt ja i teksten.
- Når brukernavn-innloggingen er flettet til demo (K-114), fjernes merknaden om hele adressen.

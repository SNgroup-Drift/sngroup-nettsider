/**
 * hengsel.no – tekst og data til forsiden.
 * Hentet maskinelt og ordrett fra docs/design/hengsel/Forside.dc.html (Claude Design, godkjent 07.10.2026),
 * som igjen er ordrett fra dagens hengsel.no. Ikke endre teksten her uten at den er godkjent.
 */

export const HERO = [
  {
    "bilde": "min-dag",
    "type": "pc",
    "alt": "Min dag på PC: selgerens arbeidsliste med detaljpanel til høyre",
    "ratio": 0.75
  },
  {
    "bilde": "ipad-min-dag",
    "type": "ipad",
    "alt": "Min dag på iPad i liggende format",
    "ratio": 0.75
  },
  {
    "bilde": "telefon-a",
    "type": "phone",
    "alt": "Selgeren på telefon: Min dag",
    "ratio": 0.72
  },
  {
    "bilde": "hengsel-i-dag-a",
    "type": "phone",
    "alt": "Montørappen Hengsel: dagens jobber",
    "ratio": 0.72
  }
] as const;

export const WHY = [
  {
    "before": [
      "Ordrebekreftelsen sjekkes for hånd",
      "Avvik på benkeplate eller hvitevare oppdages først når montøren står i kjøkkenet."
    ],
    "after": [
      "OB sammenlignes linje for linje",
      "Ordrebekreftelsen kobles til ordren og sammenlignes med bestillingen. Avvik havner øverst med knappene Godta OB og Be om ny OB."
    ]
  },
  {
    "before": [
      "Montasjekalkylen lages på nytt",
      "Linjene fra tegningen tastes inn igjen. Timer til montør og pris til kunde spriker."
    ],
    "after": [
      "Kalkylen bygges fra tegningen",
      "Linjene fra CET grupperes til kalkylerader med regler. Faktorenheter, reelle timer, pris til montør og pris til kunde står side om side, med dekningsgrad."
    ]
  },
  {
    "before": [
      "Kunden ringer for å høre hvor kjøkkenet er",
      "Selgeren må lete i e-post og spørre bestilling og montasje før hen kan svare."
    ],
    "after": [
      "Kunden ser reisen selv",
      "Kundeportalen viser tilbudet, tilvalgene, tegningen og hvor ordren står. Meldinger går rett til selgeren og havner på kundekortet."
    ]
  },
  {
    "before": [
      "Hvitevaresaker mangler opplysninger",
      "Serienummer og modell må hentes fra kunden i etterkant, og saken blir liggende."
    ],
    "after": [
      "Typeskiltet leses ved montering",
      "Montøren tar bilde av typeskiltet før varen bygges inn. Modell, produktnummer og serienummer ligger klart når kunden trenger service."
    ]
  }
] as const;

export const TRIO = [
  {
    "who": "For butikken",
    "title": "Hengsel for butikken",
    "items": [
      "Salg, tilbud og ordre",
      "Bestilling til leverandør og OB-kontroll",
      "Montasjeplan, kalkyle og etterkalkyle",
      "Saker, prosjekter og resultater"
    ],
    "where": "PC, iPad og telefon"
  },
  {
    "who": "For montørene",
    "title": "Hengsel for montøren",
    "items": [
      "Dagens jobber og hva som mangler",
      "Varer, dokumenter og tegning",
      "KS med hvitevarer og typeskilt",
      "Restpunkter og Ferdig montert"
    ],
    "where": "Telefon først, iPad på kontoret"
  },
  {
    "who": "For kunden",
    "title": "Kundeportalen",
    "items": [
      "Tilbudet med bilde og pris",
      "Tilvalg med prisen som endrer seg",
      "Signering og godkjenning",
      "Reisen til kjøkkenet er montert"
    ],
    "where": "Telefon og PC, uten app"
  }
] as const;

export const STEPS = [
  [
    "Lead",
    "Salgstavla",
    "Henvendelsen blir et kort på salgstavla. Alle muligheter står i seks faser, med sum per fase og hvor lenge hver kunde har stått.",
    "Selgeren",
    "salgstavla"
  ],
  [
    "Møte og tegning",
    "Kundekortet",
    "Møter, notater og samtaler samles på kundekortet. Neste steg står øverst, og tidslinjen viser alt som har skjedd.",
    "Selgeren",
    "kundekortet"
  ],
  [
    "Tilbud",
    "Tilbud og kundeportal",
    "Tegningen hentes fra CET. Kunden ser prisgruppene med bilde i kundeportalen, og selgeren ser når tilbudet åpnes.",
    "Selgeren",
    "tilbudet"
  ],
  [
    "Signert",
    "Kundeportalen",
    "Kunden velger tilvalg, ser prisen endre seg og signerer. Tilbudet blir ordre av seg selv.",
    "Kunden",
    "kundeportalen"
  ],
  [
    "Bestilt",
    "Bestilling",
    "Det som skal sendes, det som venter på bekreftelse og det som har feil står i én liste. En ordre uten kontrollmål eller signert avtale kan ikke sendes.",
    "Bestilling",
    "bestilling"
  ],
  [
    "OB kontrollert",
    "Ordren",
    "Ordrebekreftelsen sammenlignes med bestillingen per varelinje. Avvik står øverst på ordren, sammen med det som mangler før montering.",
    "Bestilling og selger",
    "ipad-ordre"
  ],
  [
    "Levering",
    "Ordre og montasje",
    "Tittelen på ordren sier når det leveres og monteres. Endringsfristen og hva det koster å endre etter den står synlig.",
    "Montasjeleder",
    "ordre-og-montasje"
  ],
  [
    "Montering",
    "Hengsel",
    "Montøren ser jobben, varene og tegningen i Hengsel, tar bilde av typeskiltene og krysser av KS-punktene.",
    "Montøren",
    "hengsel-ks"
  ],
  [
    "Ferdig montert",
    "Hengsel",
    "Montøren melder ferdig montert, fører timer og lar kunden signere på skjermen. Mangler det KS-punkter, får lederen beskjed. Kontoret kan fakturere.",
    "Montøren",
    "hengsel-ferdig"
  ],
  [
    "Faktura",
    "Ordren",
    "Statusrekka går fra levert til fakturert per leverandør, og resultatene oppdateres mot budsjett.",
    "Kontoret",
    "resultater"
  ],
  [
    "Etterkalkyle",
    "Montasje",
    "Kalkulerte timer mot brukte timer per jobb, og restpunkter og reklamasjoner som venter.",
    "Montasjeleder",
    "montasje"
  ]
] as const;

export const TOUR = {
  "Salg": [
    [
      "Min dag",
      "Selgerens startside er én liste over det som må gjøres i dag, sortert etter når det må skje.",
      "min-dag",
      [
        [
          "Detaljpanelet",
          "Valgt rad åpnes til høyre med kunde, telefon og svarfelt. «Ferdig – neste» går videre."
        ],
        [
          "Egne tall",
          "Salg mot mål, dekningsgrad og åpne tilbud, og neste befaring med bilde."
        ],
        [
          "Prisvarsler",
          "Endringer i prislister som treffer åpne tilbud, før kunden signerer."
        ]
      ]
    ],
    [
      "Samtaler",
      "Kundeportalen, e-post, SMS og leverandørtråder i én innboks, med kunden og tilbudet ved siden av.",
      "samtaler",
      [
        [
          "Svar der kunden skrev",
          "Svaret går i samme kanal og havner på kundekortet."
        ],
        [
          "Filtre",
          "Ubesvart, Mine, Butikken, Kunder og Entreprenører."
        ],
        [
          "Ett sted",
          "Ingen tråder blir liggende i noens private innboks."
        ]
      ]
    ],
    [
      "Salgstavla",
      "Alle muligheter i seks faser, med sum per fase og hvor lenge hver kunde har stått.",
      "salgstavla",
      [
        [
          "Står stille",
          "Kort som har stått for lenge blir gule og røde, med forslag til neste steg."
        ],
        [
          "Mine, butikken eller alle",
          "Samme tavle for selgeren og lederen."
        ],
        [
          "Mot mål",
          "Salg hittil i måneden mot målet øverst."
        ]
      ]
    ],
    [
      "Kundekortet",
      "Alt om kunden på ett sted: reisen, neste steg, tilbud og ordre, samtalen og kundeportalen.",
      "kundekortet",
      [
        [
          "Sju faner",
          "Oversikt, tilbud og ordre, montering og saker, produkter, fakturaer, filer og samtale."
        ],
        [
          "Tidslinjen",
          "Møter, notater og automatiske hendelser som ordrebekreftelser."
        ],
        [
          "Handlinger",
          "Ring, SMS, e-post, kart og nytt tilbud rett fra toppen."
        ]
      ]
    ],
    [
      "Produkter hos kunden",
      "Hvitevarene registreres fra typeskiltet når montøren bygger dem inn. Garantien regnes fra levering.",
      "produkter-hos-kunden",
      [
        [
          "Produktkortet",
          "Modell, produktnummer, serienummer, leverandør og servicekanal."
        ],
        [
          "Meld feil",
          "Starter en sak med garantistatus og feltene leverandøren trenger."
        ],
        [
          "Historikk",
          "Alt kunden har kjøpt, samlet på ett sted."
        ]
      ]
    ],
    [
      "Tilbudet",
      "Tegningen hentes fra CET. Kunden ser prisgruppene og signerer i kundeportalen, og tilbudet blir ordre av seg selv.",
      "tilbudet",
      [
        [
          "Priseksempler",
          "Samme tegning i fire prisgrupper, med bilde."
        ],
        [
          "Prislistekortet",
          "Prisvarsler, kampanjer og hvilken prisliste som gjelder."
        ],
        [
          "Kunden så utstilling",
          "Hva kunden så i butikken, og hva det koster."
        ]
      ]
    ]
  ],
  "Leveranse": [
    [
      "Ordre og montasje",
      "Tittelen sier det viktigste: når det leveres og monteres. Avvik står øverst med handlingen.",
      "ordre-og-montasje",
      [
        [
          "Statusrekka",
          "Kladd, sendt, OB mottatt, OB avvik, OB godkjent, delvis levert, levert, fakturert."
        ],
        [
          "Avvik på varelinje",
          "Godta OB og Be om ny OB rett under raden."
        ],
        [
          "Endringsfrist",
          "Fristen og hva det koster å endre etter den."
        ]
      ]
    ],
    [
      "Bestilling",
      "Det som skal sendes, det som venter på bekreftelse, og det som har feil, i én liste.",
      "bestilling",
      [
        [
          "Låst når noe mangler",
          "En ordre uten kontrollmål eller signert avtale kan ikke sendes."
        ],
        [
          "Innboks for OB",
          "Ordrebekreftelser kobles til riktig ordre og sammenlignes med bestillingen."
        ],
        [
          "Leveres til",
          "Kunden eller butikken, per ordre."
        ]
      ]
    ],
    [
      "Monteringskalkyle",
      "Linjene fra tegningen grupperes til kalkylerader. Selgeren sjekker det som må bekreftes og godkjenner før montøren får jobben.",
      "monteringskalkyle",
      [
        [
          "Fire tall",
          "Faktorenheter, reelle timer, pris til montør og pris til kunden, med dekningsgrad."
        ],
        [
          "Regler og fritekst",
          "Regler slår inn av seg selv. Fritekst og øy må kobles og bekreftes."
        ],
        [
          "Sjekkliste",
          "Godkjenn er låst til alle punktene er gått gjennom."
        ]
      ]
    ],
    [
      "Montasje",
      "Montasjelederen ser uka per montør, hva som mangler montør, og hva som kommer for sent.",
      "montasje",
      [
        [
          "Planen per uke",
          "Firma og montør i rader, monteringene som blokker."
        ],
        [
          "Rest og reklamasjon",
          "Restpunkter fra Hengsel og reklamasjoner som venter."
        ],
        [
          "Etterkalkyle",
          "Kalkulerte mot brukte timer per jobb."
        ]
      ]
    ],
    [
      "Saker",
      "Reklamasjoner, avvik og restpunkter i én liste. En hvitevaresak sendes til leverandøren med feltene ferdig utfylt.",
      "saker",
      [
        [
          "Send til leverandør",
          "Feltene i NELREG-rekkefølge med tegnteller og kopier-knapp."
        ],
        [
          "Servicenummer",
          "Nummeret fra leverandøren lagres på saken og flytter statusen."
        ],
        [
          "Én liste",
          "Reklamasjoner, avvik og restpunkter side om side."
        ]
      ]
    ]
  ],
  "Prosjekt": [
    [
      "Prosjektoppsett",
      "Prismodell, indeks og entreprenørens påslag settes én gang for hele prosjektet.",
      "prosjektoppsett",
      [
        [
          "Brutto/brutto eller netto/brutto",
          "Rabatt gjelder bare netto/brutto."
        ],
        [
          "Standard",
          "Front og prisgruppe som gjelder alle leilighetene."
        ],
        [
          "Bare sluttprisen",
          "Indeks og påslag ligger i linjeprisene kjøperen ser."
        ]
      ]
    ],
    [
      "Tilvalg mot standard",
      "Standarden låses per leilighet. Hver ny tegning fra CET sammenlignes med den, linje for linje.",
      "tilvalg-mot-standard",
      [
        [
          "Minus og pluss",
          "Det som går ut og det som kommer inn, med montering fra kalkylen."
        ],
        [
          "Versjoner",
          "Ny revisjon av tegningen blir ny versjon som kjøperen må godkjenne."
        ],
        [
          "Aldri negativt",
          "Laveste pris er 0 kr. Indeks gjelder bare nye varer."
        ]
      ]
    ],
    [
      "Kjøperen godkjenner",
      "Kjøperen ser standarden som inkludert, tilvalgene og samleprisen. Godkjenningen er tilvalgskontrakten.",
      "kjoper-godkjenner",
      [
        [
          "Endret siden sist",
          "Ny versjon viser hva som er endret, og må godkjennes på nytt."
        ],
        [
          "Velg alternativ",
          "Hvitevarepakker eller benkeplater som prisede valg."
        ],
        [
          "Også for privatkunder",
          "Samme mønster i vanlig salg."
        ]
      ]
    ]
  ],
  "Ledelse": [
    [
      "Leder",
      "Daglig leder starter med det som krever svar: eskaleringer, godkjenninger og frister.",
      "leder",
      [
        [
          "Godkjenn i panelet",
          "Rabatt over grensen godkjennes uten å åpne tilbudet."
        ],
        [
          "Butikkene",
          "Salg mot budsjett per butikk."
        ],
        [
          "Ordrereserven",
          "Uke for uke, så kapasiteten kan planlegges."
        ]
      ]
    ],
    [
      "Resultater",
      "Ordre inngått, fakturert, dekningsgrad og tilbud til ordre, mot budsjett og i fjor.",
      "resultater",
      [
        [
          "Per selger",
          "Salg, forfalte oppgaver og eldste sak."
        ],
        [
          "Montørfirma",
          "Monteringer, timer mot kalkyle og restpunkter."
        ],
        [
          "Fristkalender",
          "Endringsfrist per varegruppe."
        ]
      ]
    ],
    [
      "Moduler per rolle",
      "Leder og admin bestemmer hva hver rolle ser. Det som er av, forsvinner fra menyen.",
      "moduler",
      [
        [
          "Én bryter per modul",
          "Min dag er alltid på."
        ],
        [
          "Unntak per bruker",
          "Settes under Brukere."
        ],
        [
          "Ta det i takt",
          "Slå på moduler etter hvert som butikken er klar."
        ]
      ]
    ]
  ],
  "Kunden": [
    [
      "Kundeportalen",
      "Kunden ser kjøkkenet sitt, velger tilvalg selv og signerer. Etter signering følger kunden reisen til montert kjøkken.",
      "kundeportalen",
      [
        [
          "Tilvalg og prisgrupper",
          "Kunden krysser av og ser prisen endre seg."
        ],
        [
          "Tegning og dokumenter",
          "Tegningen og bildene fra montasjen når de er godkjent."
        ],
        [
          "Selgeren din",
          "Melding rett til selgeren, uten app."
        ]
      ]
    ]
  ],
  "Mobil": [
    [
      "Selgeren på telefon",
      "Min dag, kunder, ordre og samtaler i bunnmenyen. Resten ligger under «Mer».",
      "telefon",
      [
        [
          "Befaring",
          "Sjekklista med ti punkter, mål og bilder, og Lagre som ferdig."
        ],
        [
          "Samme handlinger",
          "Godta modellen, ring og svar rett fra telefonen."
        ],
        [
          "Samme farger",
          "De samme kortene og statusene som på PC."
        ]
      ]
    ],
    [
      "iPad",
      "Liggende med sidemeny og to kolonner, stående med ikonstripe og én kolonne.",
      "ipad-min-dag",
      [
        [
          "Samme komponenter",
          "Kort, filtre og detaljpanel er de samme som på PC."
        ],
        [
          "Til befaring",
          "Ordren og kundekortet med kunden ved siden av."
        ],
        [
          "Butikkgulvet",
          "Vis tegning og pris mens kunden står der."
        ]
      ]
    ],
    [
      "Montøren på iPad",
      "Dagen i to kolonner: neste jobb med navigering og ring, timeplanen og beskjeder fra kontoret.",
      "hengsel-ipad",
      [
        [
          "Neste jobb",
          "Naviger, ring eller åpne jobben med ett trykk."
        ],
        [
          "Dagen",
          "Timeplanen med alle jobbene, side om side."
        ],
        [
          "Beskjed fra kontoret",
          "Nøkkel, port og leveranser står klart før montøren drar."
        ]
      ]
    ]
  ]
} as const;

export const PH = [
  [
    "I dag",
    "hengsel-i-dag",
    "Montøren ser neste jobb og hva som mangler, og trykker «På vei» så kunden får beskjed. Tilleggsarbeid og restpunkter settes som nåler på tegningen. Meld avvik går rett til ordren og montasjelederen."
  ],
  [
    "Jobben og KS",
    "hengsel-jobb",
    "Jobben har fire faner: info, varer, dokumenter og bilder. KS under montering følger malen for rommet punkt for punkt, med OK, avvik og bilde der det trengs."
  ],
  [
    "Varer og dokumenter",
    "hengsel-varer",
    "Montøren ser hvilke leveranser som er bekreftet og levert, varene på ordren, monteringskalkylen som er godtatt, tegningene og FDV-dokumentasjonen."
  ],
  [
    "Hvitevarer",
    "hengsel-ks",
    "Før varen bygges inn tar montøren bilde av typeskiltet. Appen leser modell, produktnummer og serienummer. Avvik fra bestilt modell går til selgeren som «Hvitevare må sjekkes». Ikke levert blir restordre."
  ],
  [
    "Avvik",
    "hengsel-avvik",
    "Skadet ved montering eller levering, feil vare, mangler eller feil mål. Montøren velger hva som skjedde, tar bilde og sier om det trengs ny vare. Avviket havner rett på ordren."
  ],
  [
    "Ferdig montert",
    "hengsel-ferdig",
    "Montøren melder ferdig montert eller delvis ferdig, fører timer og skriver en merknad til selgeren. Kunden signerer på skjermen. Mangler det KS-punkter, får lederen beskjed."
  ],
  [
    "iPad",
    "hengsel-ipad",
    "På iPad får montøren dagen i to kolonner: neste jobb med navigering og ring, timeplanen for dagen og beskjeder fra kontoret."
  ]
] as const;

export const ROLES = [
  [
    "Selger",
    [
      "Min dag",
      "Samtaler",
      "Salgstavle",
      "Kunder",
      "Tilbud",
      "Ordre",
      "Saker"
    ],
    [
      [
        "Dagen i én liste",
        "Det som haster øverst, med svarfelt og telefon i panelet."
      ],
      [
        "Ser resten uten å spørre",
        "Bestilling, OB og montering står på kundekortet."
      ],
      [
        "Vet når kunden ser på tilbudet",
        "Åpninger i portalen og prisvarsler før signering."
      ]
    ]
  ],
  [
    "Prosjektleder",
    [
      "Alt selgeren har",
      "Prosjekter",
      "Leiligheter",
      "Tilvalg"
    ],
    [
      [
        "Oppsett én gang",
        "Prismodell, indeks og påslag for hele prosjektet."
      ],
      [
        "Tilvalg mot standard",
        "Linje for linje fra CET, med montering fra kalkylen."
      ],
      [
        "Kjøperen godkjenner selv",
        "Godkjenningen er tilvalgskontrakten."
      ]
    ]
  ],
  [
    "Daglig leder",
    [
      "Leder",
      "Resultater",
      "Godkjenninger",
      "Innstillinger"
    ],
    [
      [
        "Det som krever svar",
        "Eskaleringer, godkjenninger og frister øverst."
      ],
      [
        "Butikkene mot budsjett",
        "Salg, dekningsgrad og ordrereserve uke for uke."
      ],
      [
        "Bestemmer oppsettet",
        "Moduler per rolle og unntak per bruker."
      ]
    ]
  ],
  [
    "Montasjeleder",
    [
      "Montasje",
      "Kontrollmål",
      "Saker",
      "Etterkalkyle"
    ],
    [
      [
        "Uka per montør",
        "Hva som mangler montør og hva som kommer for sent."
      ],
      [
        "Rest og reklamasjon",
        "Restpunkter fra Hengsel havner rett hos deg."
      ],
      [
        "Etterkalkyle",
        "Kalkulerte mot brukte timer per jobb."
      ]
    ]
  ],
  [
    "Bestilling",
    [
      "Bestilling",
      "Ordrebekreftelser",
      "Avvik"
    ],
    [
      [
        "Én liste",
        "Det som skal sendes, venter og har feil."
      ],
      [
        "Låst når noe mangler",
        "Ingen sending uten kontrollmål og signert avtale."
      ],
      [
        "OB mot bestilling",
        "Avvik per varelinje med handling rett under."
      ]
    ]
  ],
  [
    "Montør",
    [
      "Hengsel: I dag",
      "Uke",
      "Kommende",
      "Ferdige"
    ],
    [
      [
        "Bare egne jobber",
        "Telefon først, uten resten av systemet."
      ],
      [
        "KS med typeskilt",
        "Bilde av typeskiltet, ferdig utfylt."
      ],
      [
        "Ferdig montert",
        "Kunden og kontoret får beskjed med en gang."
      ]
    ]
  ],
  [
    "Kunde",
    [
      "Kundeportalen"
    ],
    [
      [
        "Kjøkkenet mitt",
        "Tilbud med bilde, tilvalg og pris."
      ],
      [
        "Signer og godkjenn",
        "Uten papir og uten app."
      ],
      [
        "Følg reisen",
        "Fra signert til montert, med bilder."
      ]
    ]
  ]
] as const;

export const MORE = [
  [
    "Befaring",
    "Sjekkliste med ti punkter, mål og bilder på telefonen, lagret rett på kunden."
  ],
  [
    "Kontrollmål",
    "Bestillingen er låst til kontrollmålet er tatt og avtalen er signert."
  ],
  [
    "Fristkalender",
    "Endringsfrist per varegruppe, med varsel før fristen går ut."
  ],
  [
    "Etterkalkyle",
    "Kalkulerte mot brukte timer per jobb og per montørfirma."
  ],
  [
    "Lager og restvarer",
    "Varer på lager, innkjøp og restordre koblet til ordren."
  ],
  [
    "Anbud og prosjekter",
    "Leilighetsprosjekter med standard, tilvalg, indeks og entreprenørpåslag."
  ],
  [
    "Vilkårsbibliotek",
    "Samme vilkår i alle tilbud, oppdatert ett sted."
  ],
  [
    "Signering",
    "Kunden signerer tilbudet i kundeportalen, og den signerte PDF-en lagres på ordren."
  ],
  [
    "FDV-dokumentasjon",
    "Bruksanvisninger, garantier og bilder samles til én PDF kunden får ved overlevering."
  ],
  [
    "Leser ordrebekreftelser",
    "Ordrebekreftelser i PDF leses og kobles til riktig ordre."
  ],
  [
    "Varsler til kunden",
    "Kunden får beskjed på e-post om levering og montering uten at noen må ringe."
  ]
] as const;

export const INTEG = [
  [
    "Tegning",
    "Configura CET",
    "Tegning og varelinjer leses inn i tilbud, monteringskalkyle og tilvalg. Ny revisjon blir ny versjon."
  ],
  [
    "Regnskap",
    "PowerOffice Go",
    "Kunde, prosjekt og faktura opprettes fra ordren. Fakturastatus, omsetning og inngående fakturaer hentes tilbake. Koblingen er bygget og tas i bruk høsten 2026."
  ],
  [
    "Kontor",
    "Microsoft 365",
    "Innlogging med jobbkontoen. E-post fra Outlook og møter fra kalenderen havner på riktig kunde."
  ],
  [
    "Leverandører",
    "Bestilling og OB på e-post",
    "Bestillingen sendes til leverandøren, og ordrebekreftelsen i PDF leses og sammenlignes med bestillingen."
  ],
  [
    "Kunden",
    "Signering i kundeportalen",
    "Kunden godkjenner og signerer tilbudet i kundeportalen, og den signerte PDF-en lagres på ordren."
  ]
] as const;

export const ACCT = [
  [
    "PowerOffice Go",
    "Bygget",
    "info"
  ],
  [
    "Tripletex",
    "Ta kontakt",
    "neutral"
  ],
  [
    "Visma eAccounting",
    "Ta kontakt",
    "neutral"
  ],
  [
    "Fiken",
    "Ta kontakt",
    "neutral"
  ],
  [
    "24SevenOffice",
    "Ta kontakt",
    "neutral"
  ]
] as const;

export const SUPP = [
  [
    "Bestillinger",
    "Sendes først når kontrollmål og signert avtale finnes. Leveres til kunden eller butikken, per ordre."
  ],
  [
    "Ordrebekreftelser",
    "Kobles til riktig ordre og sammenlignes med bestillingen per varelinje. Statusrekka per leverandør går fra kladd til fakturert."
  ],
  [
    "Tegningsdata",
    "Tegning og linjer fra CET brukes i tilbud, monteringskalkyle og tilvalg. Ny revisjon blir ny versjon kunden godkjenner."
  ],
  [
    "Hvitevarer og service",
    "Typeskiltet registreres ved montering. Saker sendes med feltene servicekanalen krever, i NELREG-rekkefølge med kopier-knapp."
  ]
] as const;

export const PRINC = [
  [
    "Én arbeidsliste",
    "Det som må gjøres, står i én liste sortert etter når det må skje. Faner og tall blir filtre i lista."
  ],
  [
    "Handling der du står",
    "Valgt rad åpnes i et panel til høyre. Svar, ring, godkjenn eller send uten å bytte side."
  ],
  [
    "Kort meny per rolle",
    "Hver rolle ser det den bruker daglig. Resten ligger under «Mer», og moduler kan slås av."
  ],
  [
    "Data én gang",
    "Tegningsfila, ordrebekreftelsen og typeskiltet leses inn én gang og brukes videre i kalkyle, bestilling og garanti."
  ]
] as const;

export const CHECK = [
  [
    "Legg inn første kunde",
    "Salgstavla"
  ],
  [
    "Lag et tilbud",
    "Fra CET"
  ],
  [
    "Koble kundeportalen",
    "Kunden"
  ],
  [
    "Legg inn prisliste",
    "Prisvarsler"
  ],
  [
    "Last opp plantegning",
    "Prosjekt"
  ]
] as const;

export const FAQ = [
  [
    "Hvem passer løsningen for?",
    "Kjøkken- og interiørbutikker som selger, bestiller og monterer selv eller med montørfirma. Den er bygget for butikker med flere selgere, en eller flere avdelinger og prosjektsalg til entreprenører."
  ],
  [
    "Hvilke tegneprogram fungerer den med?",
    "Configura CET. Tegningen og linjene leses inn i tilbudet, monteringskalkylen og tilvalgene. En ny revisjon av tegningen blir en ny versjon som kunden eller kjøperen godkjenner. Andre tegneprogram tar vi en prat om."
  ],
  [
    "Hvilke regnskapsprogram fungerer den med?",
    "Koblingen til PowerOffice Go er bygget. Kunder, prosjekter og fakturaer opprettes fra ordren, og fakturastatus, omsetning og inngående fakturaer hentes tilbake. Bruker dere Tripletex, Visma eAccounting, Fiken eller 24SevenOffice, tar vi en prat om koblingen."
  ],
  [
    "Hvem ser hva?",
    "Hver bruker har en rolle, og tilgangen styres i databasen, ikke bare i menyen. Montørfirma ser bare egne jobber, og kunden ser bare sitt eget kjøkken i kundeportalen."
  ],
  [
    "Hvor lagres dataene?",
    "I EU. Databasen ligger i Stockholm, og vi inngår databehandleravtale med hver butikk. Dere eier dataene deres og kan få dem ut når dere vil."
  ],
  [
    "Hvem hjelper oss med opplæring og support?",
    "Vi står for oppstart og opplæring. Etter det skriver dere til drift@sngroup.no eller trykker «Gi tilbakemelding» i appen. Henvendelsen kommer rett til oss."
  ],
  [
    "Kan vi ta med oss det vi har i dag?",
    "Ja. Vi hjelper dere å flytte over kunder, åpne tilbud og ordrer fra dagens system, og legger inn prislistene før dere starter."
  ],
  [
    "Trenger montørene en egen app?",
    "Montørene bruker Hengsel på telefonen. Den viser bare egne jobber, KS og ferdigmelding. Montørfirma uten tilgang til CRM-et får det de trenger uten å se resten."
  ],
  [
    "Må kunden laste ned noe?",
    "Nei. Kundeportalen åpnes fra en lenke på telefon eller PC. Kunden ser tilbudet, velger tilvalg, signerer og følger reisen til kjøkkenet er montert."
  ],
  [
    "Kan vi skru av det vi ikke bruker?",
    "Ja. Leder og admin bestemmer hva hver rolle ser, med én bryter per modul og rolle. Det som er av, forsvinner fra menyen. Unntak kan settes per bruker."
  ],
  [
    "Hvordan logger vi inn?",
    "Med jobbkontoen i Microsoft 365. E-post fra Outlook og kalenderen kan kobles til, så møter og meldinger havner på riktig kunde."
  ]
] as const;

export const INTS = [
  "Salg og tilbud",
  "Bestilling og OB",
  "Montasje og Hengsel",
  "Prosjektsalg",
  "Kundeportal"
] as const;

export const ADDR = "drift@sngroup.no" as const;


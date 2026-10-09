(function(){
var ST={ok:['ok','I drift'],del:['info','Delvis'],opp:['warn','Under oppsett'],plan:['','Planlagt']};
var N=[
 {id:'crm',side:'C',t:'Sigdal CRM',s:'Kunder, tilbud, ordre, bestillinger, saker og montasje',st:'ok',inn:['Alt fra boksene til venstre'],ut:['Alt til boksene til høyre'],om:'Navet. Hver opplysning kommer inn én gang og kobles til riktig kunde og ordre. Selgeren ser bare det som avviker, i Min dag.',vei:'Flyttes til Cloudflare i prod (K-100).'},
 {id:'m365',side:'C',t:'Microsoft 365',s:'bestilling@, varsel@, innlogging',st:'ok',inn:['Ordrebekreftelser, fraktvarsler og faktura til bestilling@','Innlogging med jobbkonto'],ut:['Bestillinger fra bestilling@','Varsler fra varsel@'],om:'Én felles inngang for leverandørene, og samme konto for alle ansatte.',vei:'Flere leverandører over på bestilling@ (leverandørbrevet).'},
 {id:'cet',side:'L',t:'CET (Configura)',s:'Tegning og ordre til Sigdal',st:'del',inn:['Nobia-XML med alle linjer','Tegninger og elementliste (PDF)'],ut:['Kunde og prosjektnummer (mål)'],om:'Tilbudet lages fra Nobia-XML uten taste-arbeid. I dag eksporterer selgeren fila selv.',vei:'Automatisk eksport ved lagring (spurt Configura og Sigdal, S-55).'},
 {id:'sig',side:'L',t:'Sigdal / Nobia',s:'OB, feilmeldinger, EHF, ordrestokk',st:'del',inn:['Ordrebekreftelse (PDF, leses av CRM)','Feilmeldinger ved ordresetting','EHF-faktura (Lillehammer), skannet PDF (Hamar)'],ut:['Ordre via CET'],om:'OB leses og kontrolleres mot tegningen. Feilmeldinger blir saker.',vei:'Kravlista S-55: OB som XML, EHF til alle, feilmeldinger til fast adresse.'},
 {id:'tp',side:'L',t:'Tradeplace',s:'Hvitevarer: BSH, Electrolux, Miele, Smeg',st:'opp',inn:['Pris og lager','Ordrebekreftelse og leveringsvarsel'],ut:['Elektronisk bestilling'],om:'Én kobling for alle de store hvitevaremerkene.',vei:'Entitet bestilt 06.10, venter på Tradeplace.'},
 {id:'lev',side:'L',t:'Andre leverandører',s:'Tapwell, Røros, Corinor, KA, Intra …',st:'del',inn:['OB på e-post (PDF, leses med AI)','Produktfiler (Excel)','EDI fra Tapwell (mål)'],ut:['Bestilling fra bestilling@'],om:'Alle skal minst på nivå 1: fast referanse og e-post til bestilling@.',vei:'Tapwell EDI via Pagero, Røros Excel-mal, leverandørbrevet.'},
 {id:'po',side:'R',t:'PowerOffice Go',s:'Kunder, prosjekter, faktura',st:'del',inn:['Leverandørfakturaer (EHF)'],ut:['Kunde og prosjekt per ordre','Fakturalinjer etter kontrakten'],om:'Prosjekt per kategori og år, med selger og avdeling riktig fra start.',vei:'Fakturakontroll mot OB og sluttfaktura fra CRM.'},
 {id:'min',side:'R',t:'Min side',s:'Kundeportalen',st:'ok',inn:['Kundens godkjenninger og endringsønsker'],ut:['Tilbud, kontrakt, leveringsuke, FDV'],om:'Kunden ser alt på ett sted, og slipper å ringe for status.',vei:'Signering i portalen (Penneo vurderes).'},
 {id:'hen',side:'R',t:'Hengsel',s:'Montørappen for firmaer og montører',st:'ok',inn:['KS, bilder, avvik, timer, signatur'],ut:['Jobber, tegninger, varer, beskjed fra selger'],om:'Montasjefirmaet svarer innen 48 timer, og montøren har alt i lomma.',vei:'Tegningen som arbeidsflate (venter på DXF).'},
 {id:'sms',side:'R',t:'SMS',s:'Leveringsvarsel og påminnelser',st:'opp',inn:['Svar fra kunden (mål)'],ut:['Dag og tidsvindu for levering','Påminnelser'],om:'Kunden får beskjed uten at selgeren ringer.',vei:'Avklares med Unifon.'},
 {id:'bank',side:'R',t:'Signering',s:'BankID / DealBuilder',st:'del',inn:['Signert kontrakt (PDF)'],ut:['Kontrakt til signering'],om:'Kontrakten kontrolleres mot ordren når den er signert.',vei:'Signering rett fra CRM (Penneo vurderes).'}
];
var cL=document.getElementById('cL'),cR=document.getElementById('cR'),cC=document.getElementById('cC'),det=document.getElementById('det'),svg=document.getElementById('svg'),map=document.getElementById('map'),cur='crm';
N.forEach(function(n){var b=document.createElement('button');b.type='button';b.className='n';b.id='n-'+n.id;b.innerHTML='<b>'+n.t+'</b><span>'+n.s+'</span><span class="pill '+ST[n.st][0]+'">'+ST[n.st][1]+'</span>';b.onclick=function(){show(n.id)};(n.side==='L'?cL:n.side==='R'?cR:cC).appendChild(b)});
function c(el){var r=el.getBoundingClientRect(),m=map.getBoundingClientRect();return{l:r.left-m.left,r:r.right-m.left,y:r.top-m.top+r.height/2}}
function lines(){var W=map.clientWidth,H=map.clientHeight;svg.setAttribute('viewBox','0 0 '+W+' '+H);svg.innerHTML='';var core=c(document.getElementById('n-crm'));
 N.forEach(function(n){if(n.side==='C')return;var p=c(document.getElementById('n-'+n.id)),d;
  if(n.side==='L'){var x1=p.r,x2=core.l;d='M'+x1+' '+p.y+' C'+(x1+40)+' '+p.y+' '+(x2-40)+' '+core.y+' '+x2+' '+core.y}
  else{var a=core.r,b=p.l;d='M'+a+' '+core.y+' C'+(a+40)+' '+core.y+' '+(b-40)+' '+p.y+' '+b+' '+p.y}
  var e=document.createElementNS('http://www.w3.org/2000/svg','path');e.setAttribute('d',d);e.id='p-'+n.id;if(n.id===cur)e.classList.add('hot');svg.appendChild(e)})}
function show(id){cur=id;var n=N.filter(function(x){return x.id===id})[0];
 document.querySelectorAll('.n').forEach(function(b){b.classList.toggle('on',b.id==='n-'+id)});
 svg.querySelectorAll('path').forEach(function(p){p.classList.toggle('hot',p.id==='p-'+id||id==='crm')});
 det.innerHTML='<span class="pill '+ST[n.st][0]+'" style="justify-self:start">'+ST[n.st][1]+'</span><h2>'+n.t+'</h2><p>'+n.om+'</p><h4>Inn til CRM</h4><ul>'+n.inn.map(function(x){return '<li>'+x+'</li>'}).join('')+'</ul><h4>Ut fra CRM</h4><ul>'+n.ut.map(function(x){return '<li>'+x+'</li>'}).join('')+'</ul><h4>Neste steg</h4><p>'+n.vei+'</p>'}
new ResizeObserver(lines).observe(map);lines();show('crm');
})();

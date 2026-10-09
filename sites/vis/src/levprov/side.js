(function(){
var $=function(i){return document.getElementById(i)};
var S=[
 {k:'ok',t:'Riktig bekreftelse',s:'Referanse, linjer, pris og uke 46 stemmer.',
  f:[['Referanse','24-0815 · Haugen · P-2614','ok'],['Ordre funnet','Bestilling 24-0815, kunde Haugen','ok'],['Linjer','3 av 3 stemmer','ok'],['Sum','10 650 kr eks. mva','ok'],['Levering','Uke 46, lager Hamar','ok']],
  r:['ok','Bekreftet. Ingen trenger å gjøre noe.','Bestillingen får status Bekreftet. Leveringsuka legges inn på ordren, og montasjeplanen er fortsatt grønn. Selgeren får ingen sak.'],
  rep:'Takk, mottatt og registrert på 24-0815. Ingen avvik.'},
 {k:'uke',t:'Senere levering',s:'Alt stemmer, men dere kan først levere uke 48.',
  f:[['Referanse','24-0815 · Haugen · P-2614','ok'],['Ordre funnet','Bestilling 24-0815, kunde Haugen','ok'],['Linjer','3 av 3 stemmer','ok'],['Sum','10 650 kr eks. mva','ok'],['Levering','Uke 48 (bestilt uke 46)','warn']],
  r:['warn','Avvik: levering to uker senere','Montering er satt til uke 47. CRM-et lager en sak til selgeren med frist i dag: flytt montering eller be om tidligere levering. Montasjefirmaet får beskjed i Hengsel når ny dato er satt.'],
  rep:'Takk, mottatt. Leveringsuke 48 er senere enn bestilt (46). Vi sjekker montering og svarer innen 1 virkedag.'},
 {k:'pris',t:'Annen pris',s:'Utsparing for kum står til 1 650 kr, ikke 1 250 kr.',
  f:[['Referanse','24-0815 · Haugen · P-2614','ok'],['Ordre funnet','Bestilling 24-0815, kunde Haugen','ok'],['Linjer','2 av 3 stemmer','warn'],['Sum','11 050 kr (bestilt 10 650 kr)','warn'],['Levering','Uke 46, lager Hamar','ok']],
  r:['warn','Avvik: +400 kr på utsparing for kum','CRM-et lager en sak om prisen. Godtar vi den, oppdateres innprisen og marginen på ordren. Fakturaen kontrolleres senere mot det vi godtok.'],
  rep:'Takk, mottatt. Linje 3 har 1 650 kr mot avtalt 1 250 kr. Kan dere bekrefte avtalt pris eller forklare endringen?'},
 {k:'ref',t:'Uten vår referanse',s:'Bekreftelsen har bare deres eget ordrenummer.',
  f:[['Referanse','Mangler (bare NS-55102)','warn'],['Ordre funnet','Foreslått: 24-0815 (kunde og linjer ligner)','warn'],['Linjer','3 av 3 stemmer','ok'],['Sum','10 650 kr eks. mva','ok'],['Levering','Uke 46, lager Hamar','ok']],
  r:['warn','Koblet med forslag, må bekreftes','CRM-et fant sannsynlig ordre ut fra linjene, men en innkjøper må bekrefte koblingen. Det koster tid hver gang, derfor ber vi alltid om referansen.'],
  rep:'Takk, mottatt. Bekreftelsen manglet vår referanse. Bruk alltid «24-0815 · Haugen · P-2614» slik at den kobles automatisk.'}
];
var cur=null,busy=false,T=[];
S.forEach(function(x){var b=document.createElement('button');b.type='button';b.innerHTML='<b>'+x.t+'</b><span>'+x.s+'</span>';b.onclick=function(){if(busy)return;cur=x;[].forEach.call($('sc').children,function(c){c.classList.toggle('on',c===b)});$('send').disabled=false;step(1)};$('sc').appendChild(b)});
function step(n){[].forEach.call($('steps').children,function(s,i){s.className=i<n?'d':i===n?'on':''})}
function at(ms,f){T.push(setTimeout(f,ms))}
$('send').onclick=function(){if(!cur||busy)return;busy=true;$('send').disabled=true;step(2);
 $('rt').textContent='Leser bekreftelsen …';$('rp').textContent='PDF mottatt på bestilling@ kl. 09:14.';$('read').innerHTML='';$('out').innerHTML='';
 cur.f.forEach(function(f){var d=document.createElement('div');d.className='fld';d.innerHTML='<span>'+f[0]+'</span><b>'+f[1]+'</b><span class="pill '+(f[2]==='ok'?'ok':'warn')+'">'+(f[2]==='ok'?'Stemmer':'Avvik')+'</span>';$('read').appendChild(d)});
 [].forEach.call($('read').children,function(d,i){at(500+i*550,function(){d.classList.add('v')})});
 var t=500+cur.f.length*550+300;
 at(t,function(){var r=cur.r;$('rt').textContent=r[0]==='ok'?'Ferdig på 3 sekunder':'Ferdig, med én sak';$('rp').textContent='Ingen tastet noe.';
  $('out').innerHTML='<div class="res '+r[0]+'"><b>'+r[1]+'</b><p>'+r[2]+'</p></div>';step(3)});
 at(t+1200,function(){$('out').insertAdjacentHTML('beforeend','<h3 class="eyebrow" style="margin-top:4px">Svaret Nordstein får</h3><div class="reply"><span class="muted" style="font-size:14px">Fra bestilling@studiosigdal-innlandet.no · Re: Bestilling 24-0815</span><span>'+cur.rep+'</span></div>');step(4);busy=false});
};
$('reset').onclick=function(){T.forEach(clearTimeout);T=[];busy=false;cur=null;[].forEach.call($('sc').children,function(c){c.classList.remove('on')});$('send').disabled=true;step(0);
 $('rt').textContent='Venter på bekreftelsen';$('rp').textContent='Velg et svar til venstre og send det. CRM-et leser PDF-en, finner riktig ordre og sjekker den mot bestillingen.';$('read').innerHTML='';$('out').innerHTML=''};
})();

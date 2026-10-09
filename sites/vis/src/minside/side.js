(function(){
var $=function(i){return document.getElementById(i)};
var fmt=function(n){return n.toLocaleString('nb-NO')};
var BASE=[['Kjøkken Sigdal Nobel, Eik natur','Skap, fronter, sokkel og håndtak',186400],['Benkeplate kompakt, Mørk grå','Med utsparing for kum og platetopp',24900],['Montering','Fast pris, inkl. innbæring',38500]];
var OPT=[['tl','Belysning under overskap','LED-lister med dimmer',6900],['sk','Skuffeinnredning i eik','Til 4 skuffer',8400],['hv','Integrert oppvaskmaskin','I stedet for den dere har',11900]];
var S,TABS=[['hjem','Oversikt'],['tilbud','Tilbud'],['lev','Levering'],['dok','Dokumenter'],['feil','Meld feil']];
function init(){S={tab:'hjem',opt:{},godkjent:false,signert:false,lev:false,tilgang:null,feil:false,steps:{}};$('log').innerHTML='';log('Tilbud T-1204 sendt til Min side.');render()}
function log(t){var d=document.createElement('div'),n=new Date();d.innerHTML='<em>'+('0'+n.getHours()).slice(-2)+':'+('0'+n.getMinutes()).slice(-2)+'</em>'+t;$('log').prepend(d)}
function step(k){S.steps[k]=1;[].forEach.call($('guide').children,function(li){li.classList.toggle('d',!!S.steps[li.dataset.k])})}
function total(){return BASE.reduce(function(s,x){return s+x[2]},0)+OPT.reduce(function(s,x){return s+(S.opt[x[0]]?x[3]:0)},0)}
function go(t){S.tab=t;render();$('body').scrollTop=0}
function render(){
 $('nav').innerHTML=TABS.map(function(t){var dot=(t[0]==='tilbud'&&!S.signert)||(t[0]==='lev'&&S.signert&&!S.lev);return '<button type="button" data-t="'+t[0]+'" class="'+(S.tab===t[0]?'on':'')+'"'+(S.tab===t[0]?' aria-current="page"':'')+'><i></i>'+t[1]+(dot?'<span class="dot"></span>':'')+'</button>'}).join('');
 $('nav').querySelectorAll('button').forEach(function(b){b.onclick=function(){go(b.dataset.t)}});
 var h='';
 if(S.tab==='hjem'){
  var st=[['Tilbud mottatt','12. oktober',1],['Godkjent og signert',S.signert?'I dag':'Venter på deg',S.signert],['Bestilt fra fabrikken',S.signert?'Bekreftet uke 47':'',S.signert],['Levering',S.lev?'Uke 47, onsdag 08–10':'Uke 47',S.lev],['Montering','Uke 47–48',0],['Ferdig og FDV','',0]];
  var next=st.findIndex(function(x){return !x[2]});
  h='<h2>Hei, Lund!</h2><div class="c"><b>'+(S.signert?(S.lev?'Alt er klart til levering':'Bekreft leveringen'):'Tilbudet venter på deg')+'</b><p>'+(S.signert?(S.lev?'Vi sender SMS dagen før med tidsvindu.':'Fortell oss hvordan sjåføren kommer inn.'):'Se gjennom, velg tilvalg og godkjenn.')+'</p><button class="big p" type="button" id="cta">'+(S.signert?(S.lev?'Se dokumenter':'Til levering'):'Åpne tilbudet')+'</button></div>';
  h+='<div class="c"><b>Slik går det</b><div class="tl">'+st.map(function(x,i){return '<div class="'+(x[2]?'d':i===next?'n':'')+'"><div>'+x[0]+(x[1]?'<span>'+x[1]+'</span>':'')+'</div></div>'}).join('')+'</div></div>';
  h+='<div class="c"><b>Selgeren din</b><p>Ingrid, Studio Sigdal Hamar. Svarer på meldinger her innen én arbeidsdag.</p></div>';
 }
 if(S.tab==='tilbud'){
  h='<h2>Tilbud T-1204</h2><div class="c">'+BASE.map(function(x){return '<div class="ln"><b>'+x[0]+'</b><span class="p">'+fmt(x[2])+' kr</span><span>'+x[1]+'</span></div>'}).join('')+'</div>';
  h+='<div class="c"><b>Tilvalg</b><p>Slå av og på. Prisen oppdateres med en gang.</p>'+OPT.map(function(x){return '<div class="ln"><b>'+x[1]+' · +'+fmt(x[3])+' kr</b><button class="sw" type="button" role="switch" aria-label="'+x[1]+'" aria-checked="'+!!S.opt[x[0]]+'" data-o="'+x[0]+'"'+(S.signert?' disabled':'')+'></button><span>'+x[2]+'</span></div>'}).join('')+'</div>';
  h+='<div class="c"><div class="tot"><span>Totalt inkl. mva</span><b>'+fmt(total())+' kr</b></div>'+(S.signert?'<p class="ok">Godkjent og signert. Endringer går via selgeren.</p>':S.godkjent?'<p>Kontrakten er klar. Les og signer.</p><button class="big p" type="button" id="sign">Signer kontrakten (demo)</button>':'<button class="big p" type="button" id="ok">Godkjenn tilbudet</button>')+'</div>';
 }
 if(S.tab==='lev'){
  if(!S.signert)h='<h2>Levering</h2><div class="c"><p>Leveringsuka kommer her når tilbudet er signert og bestilt.</p><button class="big" type="button" data-go="tilbud">Til tilbudet</button></div>';
  else{h='<h2>Levering uke 47</h2><div class="c"><b>Onsdag 19. november, 08–10</b><p>Sigdal leverer til døra. Vi bærer inn når montøren kommer.</p></div>';
   h+='<div class="c"><b>Hvordan kommer sjåføren inn?</b><div class="chips" id="tg">'+['Noen er hjemme','Nøkkelboks','Ring meg'].map(function(x){return '<button type="button" class="'+(S.tilgang===x?'on':'')+'">'+x+'</button>'}).join('')+'</div>'+(S.lev?'<p class="ok">Bekreftet. Takk!</p>':'<button class="big p" type="button" id="lev"'+(S.tilgang?'':' disabled')+'>Bekreft leveringen</button>')+'</div>';
   h+='<div class="c"><b>Før vi kommer</b><p>Tøm rommet, og sørg for fri vei fra bilen. Vann og strøm skal være klart for tilkobling.</p></div>'}
 }
 if(S.tab==='dok'){
  var d=[['Tilbud T-1204','PDF',1],['Kontrakt',S.signert?'Signert':'Ikke signert ennå',S.signert],['Tegning og elementliste','PDF',1],['Ordrebekreftelse',S.signert?'Uke 47':'Kommer etter bestilling',S.signert],['FDV-dokumentasjon','Kommer etter montering',0]];
  h='<h2>Dokumenter</h2><div class="c">'+d.map(function(x){return '<div class="doc"><div><b>'+x[0]+'</b><br><span class="muted" style="font-size:13px">'+x[1]+'</span></div><span class="pill '+(x[2]?'ok':'')+'">'+(x[2]?'Klar':'Venter')+'</span></div>'}).join('')+'</div>';
 }
 if(S.tab==='feil'){
  if(S.feil)h='<h2>Takk for beskjeden</h2><div class="c"><b>Sak R-0412 er opprettet</b><p>Ingrid ser saken nå, og du får svar innen én arbeidsdag. Du finner saken her til den er løst.</p><span class="pill info" style="justify-self:start">Under behandling</span></div>';
  else h='<h2>Meld en feil</h2><div class="c"><b>Hva gjelder det?</b><div class="chips" id="hva">'+['Skade på front','Dør henger skjevt','Mangler del','Annet'].map(function(x,i){return '<button type="button" class="'+(i===0?'on':'')+'">'+x+'</button>'}).join('')+'</div><textarea id="txt" aria-label="Beskriv feilen">Liten flis i hjørnet på skuffefronten under platetoppen.</textarea><div class="photo">Bilde lagt ved (demo)</div><button class="big p" type="button" id="send">Send til Studio Sigdal</button></div>';
 }
 $('body').innerHTML=h;wire()}
function wire(){var q=function(s){return $('body').querySelector(s)};
 if(q('#cta'))q('#cta').onclick=function(){go(S.signert?(S.lev?'dok':'lev'):'tilbud')};
 $('body').querySelectorAll('[data-go]').forEach(function(b){b.onclick=function(){go(b.dataset.go)}});
 $('body').querySelectorAll('.sw').forEach(function(b){b.onclick=function(){var o=b.dataset.o,x=OPT.filter(function(y){return y[0]===o})[0];S.opt[o]=!S.opt[o];step('tilvalg');log((S.opt[o]?'Kunden la til ':'Kunden fjernet ')+'<b>'+x[1]+'</b>. Tilbudet er oppdatert: '+fmt(total())+' kr.');render()}});
 if(q('#ok'))q('#ok').onclick=function(){S.godkjent=true;log('<b>Tilbud godkjent</b> av kunden. Kontrakt laget med riktige vilkår.');render()};
 if(q('#sign'))q('#sign').onclick=function(){S.signert=true;step('godkjenn');log('<b>Kontrakt signert.</b> Ordren er Vunnet og står som Klar til bestilling hos Ingrid.');log('Ingrid bestilte, og Sigdal bekreftet levering <b>uke 47</b>. Leveringsuka er lagt ut på Min side.');render()};
 if(q('#tg'))q('#tg').querySelectorAll('button').forEach(function(b){b.onclick=function(){S.tilgang=b.textContent;render()}});
 if(q('#lev'))q('#lev').onclick=function(){S.lev=true;step('lev');log('Kunden bekreftet levering: <b>'+S.tilgang+'</b>. Instruksen er lagt på ordren til sjåfør og montør.');render()};
 if(q('#hva'))q('#hva').querySelectorAll('button').forEach(function(b){b.onclick=function(){q('#hva').querySelectorAll('button').forEach(function(x){x.classList.toggle('on',x===b)})}});
 if(q('#send'))q('#send').onclick=function(){var hva=q('#hva .on').textContent;S.feil=true;step('feil');log('<b>Reklamasjon R-0412</b> fra kunden: '+hva+', med bilde. Sak til Ingrid med frist i morgen.');render()};
}
$('reset').onclick=function(){[].forEach.call($('guide').children,function(li){li.classList.remove('d')});init()};
document.querySelectorAll('#view button').forEach(function(b){b.onclick=function(){var pc=b.dataset.v==='pc';document.body.classList.toggle('pc',pc);document.querySelectorAll('#view button').forEach(function(x){x.classList.toggle('on',x===b);x.setAttribute('aria-pressed',x===b)})}});
if(matchMedia('(min-width:1100px)').matches&&/[?&]pc/.test(location.search))document.querySelector('#view [data-v=pc]').click();
init();
})();

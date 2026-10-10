(function(){
/* Kundens Min side: kundeportalens skjermbilder fra CRM_v4 på mobil (telefon) og PC (Studio Display). Stegene viser skjerm n i begge. */
var $=function(i){return document.getElementById(i)};
var V=Skjermbilder.alle(),velger=Skjermbilder.velger($('view'));
V.tlf.endret=function(n){if(V.pc.i!==n)V.pc.vis(n)};V.pc.endret=function(n){if(V.tlf.i!==n)V.tlf.vis(n)};
function log(_,t){var d=document.createElement('div'),n=new Date();d.innerHTML='<em>'+('0'+n.getHours()).slice(-2)+':'+('0'+n.getMinutes()).slice(-2)+'</em><span>'+t+'</span>';$('log').prepend(d)}
Skjermbilder.guide({guide:$('guide'),reset:$('reset'),logg:log,
  start:function(){$('log').innerHTML='';log('','Tilbud T-1204 sendt til Min side.')},
  steg:{
    tilvalg:{vis:[V.tlf,0],logg:[['','Kunden la til <b>Belysning under overskap</b>. Tilbudet er oppdatert: 256 700 kr.']]},
    godkjenn:{vis:[V.tlf,1],logg:[['','<b>Tilbud godkjent</b> av kunden. Kontrakt laget med riktige vilkår.'],['','<b>Kontrakt signert.</b> Ordren er Vunnet og står som Klar til bestilling hos Ingrid.'],['','Ingrid bestilte, og Sigdal bekreftet levering <b>uke 47</b>. Leveringsuka er lagt ut på Min side.']]},
    lev:{vis:[V.tlf,1],logg:[['','Kunden bekreftet levering: <b>Noen er hjemme</b>. Instruksen er lagt på ordren til sjåfør og montør.']]},
    feil:{vis:[V.tlf,3],logg:[['','<b>Reklamasjon R-0412</b> fra kunden: Skade på front, med bilde. Sak til Ingrid med frist i morgen.']]}
  }});
if(matchMedia('(min-width:1100px)').matches&&/[?&]pc/.test(location.search))velger.velg('pc');
})();

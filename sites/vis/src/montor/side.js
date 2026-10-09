(function(){
  var $=function(id){return document.getElementById(id)};
  var KS=['Skap i vater, festet til vegg','Fronter og skuffer justert','Benkeplate festet og fuget','Hvitevarer koblet og testet','Armatur montert, ingen lekkasje','Ventilator montert og testet'];
  var S;
  function init(){S={view:'idag',tab:'idag',jt:'info',ks:{},pics:0,avvik:[],av:{type:'Skade',skap:'Høyskap H3',txt:'',pic:false},done:false,sig:false,borte:false,timer:7.5,steps:{}};
    [].forEach.call($('guide').children,function(li){li.classList.remove('d')});
    $('log').innerHTML='';log('Montasjeleder','satte <em>Demo Montasje</em> på jobben LI-10087. Montøren ble varslet i Hengsel.','07:00');render()}
  var clock=['07:45','08:02','09:10','10:25','11:40','12:15','13:30','14:20','14:55','15:10','15:20','15:30'],ci=0;
  function now(){return clock[Math.min(ci++,clock.length-1)]}
  function log(who,txt,t){var d=document.createElement('div');d.innerHTML='<time>'+(t||now())+'</time><span><b>'+who+'</b> '+txt+'</span>';$('log').prepend(d)}
  function step(k){S.steps[k]=1;[].forEach.call($('guide').children,function(li){li.classList.toggle('d',!!S.steps[li.dataset.k])})}
  function toast(t){var e=$('toast');e.textContent=t;e.classList.add('show');clearTimeout(e._t);e._t=setTimeout(function(){e.classList.remove('show')},1800)}
  function go(v){S.view=v;render();$('v').scrollTop=0}
  var TABS=[['idag','I dag'],['uke','Uke'],['kom','Kommende'],['ferd','Ferdige'],['meg','Meg']];
  function tabs(){ $('tabs').innerHTML=TABS.map(function(t){return '<button type="button" data-t="'+t[0]+'" class="'+(S.tab===t[0]?'on':'')+'"><i></i>'+t[1]+'</button>'}).join('');
    [].forEach.call($('tabs').children,function(b){b.onclick=function(){S.tab=b.dataset.t;S.view=b.dataset.t;render()}})}
  function h(html){$('v').innerHTML=html}
  function on(id,fn){var e=$(id);if(e)e.onclick=fn}
  var V={
    idag:function(){var d=S.done;
      h('<div class="hdr"><h2>I dag</h2><span class="pill">tirsdag uke 46</span></div>'+
      (d?'<div class="card"><div class="row"><b>Hanne Liksomlien · kjøkken</b><span class="pill ok">Ferdig</span></div><p>Liksomvegen 4, Lillehammer</p></div>':
      '<div class="next"><span class="eyebrow">Neste jobb · 08:00</span><b>Hanne Liksomlien</b><span>Kjøkken · Liksomvegen 4, Lillehammer</span><span class="m">LI-10087 · 2 dager · du og Kari</span><div class="r"><button type="button" class="btn primary" id="open">Åpne jobb</button><button type="button" class="btn" id="ring">Ring</button><button type="button" class="btn" id="nav">Naviger</button></div></div>')+
      '<div class="sec eyebrow">Beskjed fra selger</div><div class="card"><p>«Kunden har hund, ring på før dere går inn. Sokkelen kommer som rest uke 47.»</p></div>'+
      '<div class="sec eyebrow">I morgen</div><div class="card"><div class="row"><b>Hanne Liksomlien · dag 2</b><span class="pill">08:00</span></div><p>Benkeplate og hvitevarer</p></div>');
      on('open',function(){step('open');log('Hengsel','Montøren åpnet jobben. Status: <em>Pågår</em>.');S.view='jobb';render()});
      on('nav',function(){toast('Åpner kart til Liksomvegen 4')});on('ring',function(){toast('Ringer kunden (demo)')})},
    jobb:function(){
      var t=S.jt,body='';
      if(t==='info')body='<div class="card"><b>Hanne Liksomlien</b><p>Liksomvegen 4, 2609 Lillehammer · 900 00 000</p></div>'+
        '<div class="card"><div class="row"><b>Avtalt montasjesum</b><span>18 400 kr</span></div><p>Kjøkken, 2 dager. Ingen kundepriser i appen.</p></div>'+
        '<div class="sec eyebrow">Jobbløp</div><div class="flow"><span class="pill ok">Forespurt</span><span class="pill ok">Akseptert</span><span class="pill ok">Montør satt</span><span class="pill ok">Kontrollmål</span><span class="pill info">Pågår</span><span class="pill">Ferdig</span><span class="pill">Godkjent</span></div>'+
        '<div class="act"><button type="button" class="btn primary" id="toks">KS Kjøkken ('+Object.keys(S.ks).length+'/6)</button><button type="button" class="btn" id="toav">Meld avvik</button><button type="button" class="btn" id="tofe">Ferdig montert</button><button type="button" class="btn ghost" id="kan">Kan ikke ta denne</button></div>';
      if(t==='varer')body='<div class="card"><div class="row"><b>Sigdal · kjøkken</b><span class="pill ok">Levert</span></div><p>54 linjer · LI-10087-1</p></div><div class="card"><div class="row"><b>Sokkel, 2 stk</b><span class="pill warn">Rest uke 47</span></div><p>Sigdal · LI-10087-1</p></div><div class="card"><div class="row"><b>BSH · hvitevarer</b><span class="pill ok">Levert</span></div><p>4 linjer · LI-10087-2</p></div><div class="card"><div class="row"><b>Corinor · benkeplate</b><span class="pill info">I morgen</span></div><p>LI-10087-3</p></div><div class="card"><div class="row"><b>Tapwell · armatur</b><span class="pill ok">Levert</span></div><p>LI-10087-4</p></div><div class="card"><div class="row"><b>Røros Metall · ventilator</b><span class="pill ok">Levert</span></div><p>LI-10087-5</p></div>';
      if(t==='dok')body='<div class="sec eyebrow">Tegninger</div><div class="card"><b>Plan og oppriss</b><p>PDF fra CET · rev. 2</p></div><div class="card"><b>3D</b><p>PDF fra CET</p></div><div class="sec eyebrow">Underlag</div><div class="card"><b>Monteringskalkyle</b><p>Avtalt sum og timer</p></div><div class="card"><b>Ordrebekreftelser uten priser</b><p>5 leverandører</p></div><div class="sec eyebrow">FDV</div><div class="card"><b>FDV og varefakta</b><p>Samlet fra produktdata</p></div>';
      if(t==='bilder'){var p='';for(var i=0;i<S.pics;i++)p+='<div class="pic">Bilde '+(i+1)+'</div>';body='<div class="pics">'+p+'<button type="button" class="pic addpic" id="addp">+ Ta bilde</button></div><p class="muted" style="font-size:13px;margin:0">Uten nett legges bildene i kø og sendes senere.</p>'}
      h('<div class="hdr"><button type="button" class="lk" id="bk">‹ I dag</button><span class="pill info">Pågår</span></div><div class="hdr"><h2>LI-10087</h2></div>'+
        '<div class="jt" role="tablist">'+[['info','Info'],['varer','Varer'],['dok','Dokumenter'],['bilder','Bilder']].map(function(x){return '<button type="button" role="tab" data-j="'+x[0]+'" class="'+(t===x[0]?'on':'')+'">'+x[1]+'</button>'}).join('')+'</div>'+body);
      [].forEach.call(document.querySelectorAll('.jt button'),function(b){b.onclick=function(){S.jt=b.dataset.j;render()}});
      on('bk',function(){go('idag')});on('toks',function(){go('ks')});on('toav',function(){S.av={type:'Skade',skap:'Høyskap H3',txt:'',pic:false};go('avvik')});on('tofe',function(){go('ferdig')});
      on('kan',function(){toast('Firmalederen får beskjed (vises ikke i denne demoen)')});
      on('addp',function(){S.pics++;log('Hengsel','Nytt bilde lagt på jobben LI-10087.');render()})},
    ks:function(){
      h('<div class="hdr"><button type="button" class="lk" id="bk">‹ Jobben</button><span class="pill">'+Object.keys(S.ks).length+'/6</span></div><div class="hdr"><h2>KS Kjøkken</h2></div><div class="ks">'+
        KS.map(function(k,i){var v=S.ks[i];return '<div class="ksi '+(v==='ok'?'ok':v==='av'?'av':'')+'"><b>'+(i+1)+'. '+k+'</b><div class="b"><button type="button" class="y" data-i="'+i+'" data-v="ok">OK</button><button type="button" class="n" data-i="'+i+'" data-v="av">Avvik</button></div></div>'}).join('')+
        '</div><button type="button" class="btn primary big" id="ksdone">Lagre KS</button>');
      on('bk',function(){go('jobb')});
      [].forEach.call(document.querySelectorAll('.ksi button'),function(b){b.onclick=function(){var i=+b.dataset.i;S.ks[i]=b.dataset.v;
        if(b.dataset.v==='av'){S.av={type:'Mangler',skap:'Høyskap H3',txt:KS[i]+': ',pic:false};S.view='avvik';render();return}render()}});
      on('ksdone',function(){var n=Object.keys(S.ks).length;if(n<6){toast('Svar på alle seks punktene først');return}
        step('ks');log('Hengsel','KS Kjøkken lagret: '+KS.filter(function(_,i){return S.ks[i]==='ok'}).length+' av 6 OK.');S.jt='info';go('jobb')})},
    avvik:function(){var a=S.av;
      h('<div class="hdr"><button type="button" class="lk" id="bk">‹ Avbryt</button></div><div class="hdr"><h2>Meld avvik</h2></div>'+
        '<label class="f">Type<div class="chips" id="types">'+['Skade','Mangler','Feil mål','Annet'].map(function(x){return '<button type="button" class="'+(a.type===x?'on':'')+'">'+x+'</button>'}).join('')+'</div></label>'+
        '<label class="f">Hvor<select id="skap">'+['Høyskap H3','Overskap O2','Underskap U4','Benkeplate','Hvitevare'].map(function(x){return '<option'+(a.skap===x?' selected':'')+'>'+x+'</option>'}).join('')+'</select></label>'+
        '<label class="f">Hva er galt<textarea id="txt" placeholder="Skriv kort, gjerne på eget språk">'+a.txt+'</textarea></label>'+
        '<div class="pics">'+(a.pic?'<div class="pic">Bilde av avviket</div>':'<button type="button" class="pic addpic" id="ap">+ Ta bilde</button>')+'</div>'+
        '<button type="button" class="btn primary big" id="send">Send avvik</button>');
      on('bk',function(){go('jobb')});
      [].forEach.call($('types').children,function(b){b.onclick=function(){a.type=b.textContent;a.txt=$('txt').value;a.skap=$('skap').value;render()}});
      on('ap',function(){a.pic=true;a.txt=$('txt').value;a.skap=$('skap').value;render()});
      on('send',function(){a.txt=$('txt').value||'Skadet sidepanel';a.skap=$('skap').value;if(!a.pic){toast('Ta et bilde først');return}
        S.avvik.push(a);S.pics++;step('avvik');
        log('Hengsel','Avvik meldt: <em>'+a.type+'</em> på '+a.skap+', med bilde.');
        log('CRM','Sak opprettet på ordren. Selgeren ser den i Min dag, uten å måtte gjøre noe.');
        if(a.type==='Skade')log('CRM','Reklamasjon sendt Sigdal med referanse LI-10087-1 og bilde.');
        S.jt='info';go('jobb');toast('Avvik sendt')})},
    ferdig:function(){var n=Object.keys(S.ks).length;
      h('<div class="hdr"><button type="button" class="lk" id="bk">‹ Jobben</button></div><div class="hdr"><h2>Ferdig montert</h2></div>'+
        '<div class="card"><div class="row"><span>KS Kjøkken</span><span class="pill '+(n===6?'ok':'warn')+'">'+n+'/6</span></div><div class="row"><span>Bilder</span><span class="pill">'+S.pics+'</span></div><div class="row"><span>Avvik</span><span class="pill '+(S.avvik.length?'warn':'')+'">'+S.avvik.length+'</span></div></div>'+
        '<label class="f">Timer brukt<input type="number" id="tim" step="0.5" min="0" value="'+S.timer+'"></label>'+
        '<label class="chk"><input type="checkbox" id="borte"'+(S.borte?' checked':'')+'> Kunden er ikke til stede</label>'+
        (S.borte?'<p class="muted" style="margin:0;font-size:14px">Kunden får lenke på SMS og godkjenner selv.</p>':'<label class="f">Kundens signatur<canvas id="sig" aria-label="Signaturfelt"></canvas></label><button type="button" class="btn" id="clr" style="justify-self:start">Tøm</button>')+
        '<button type="button" class="btn primary big" id="meld">Meld ferdig</button>');
      on('bk',function(){go('jobb')});
      $('borte').onchange=function(){S.borte=this.checked;S.timer=$('tim').value;render()};
      var c=$('sig');if(c){var r=c.getBoundingClientRect(),dpr=window.devicePixelRatio||1;c.width=r.width*dpr;c.height=r.height*dpr;var x=c.getContext('2d');x.scale(dpr,dpr);x.lineWidth=2.2;x.lineCap='round';x.strokeStyle=getComputedStyle(document.body).color;var dn=false;S.sig=false;
        function p(e){var b=c.getBoundingClientRect();return[e.clientX-b.left,e.clientY-b.top]}
        c.onpointerdown=function(e){dn=true;c.setPointerCapture(e.pointerId);var q=p(e);x.beginPath();x.moveTo(q[0],q[1])};
        c.onpointermove=function(e){if(!dn)return;var q=p(e);x.lineTo(q[0],q[1]);x.stroke();S.sig=true};
        c.onpointerup=function(){dn=false};on('clr',function(){x.clearRect(0,0,c.width,c.height);S.sig=false})}
      on('meld',function(){if(!S.borte&&!S.sig){toast('Be kunden signere, eller kryss av for at kunden ikke er til stede');return}
        S.timer=$('tim').value;S.done=true;step('ferdig');
        log('Hengsel','Ferdig montert. '+S.timer+' timer, '+S.pics+(S.pics===1?' bilde, ':' bilder, ')+(S.borte?'kunden godkjenner via SMS.':'signert av kunden.'));
        log('CRM','Selgeren fikk beskjed. Leveringspakken «Ditt nye kjøkken» med FDV er klar til sending.');
        log('CRM','Montørfaktura kan kontrolleres mot avtalt sum 18 400 kr.');
        go('ok')})},
    ok:function(){h('<div class="doneb"><div class="c">✓</div><b>Jobben er ferdig</b><p class="muted" style="margin:0">Selgeren og montasjelederen har fått beskjed. Du trenger ikke ringe noen.</p><button type="button" class="btn primary big" id="hjem" style="width:100%">Til I dag</button></div>');on('hjem',function(){S.tab='idag';go('idag')})},
    uke:function(){h('<div class="hdr"><h2>Uke 46</h2></div>'+['Man · Liksomlien dag 1','Tir · Liksomlien dag 2','Ons · Demo Bad, Hamar','Tor · Kontrollmål, Gjøvik','Fre · Ledig'].map(function(x){return '<div class="card"><b>'+x+'</b></div>'}).join(''))},
    kom:function(){h('<div class="hdr"><h2>Kommende</h2></div><div class="card"><b>Uke 47 · sokkel (rest)</b><p>LI-10087 · kort besøk</p></div><div class="card"><b>Uke 48 · Demo Garderobe</b><p>Lillehammer</p></div>')},
    ferd:function(){h('<div class="hdr"><h2>Ferdige</h2></div>'+(S.done?'<div class="card"><div class="row"><b>Hanne Liksomlien</b><span class="pill ok">Ferdig</span></div><p>LI-10087 · i dag</p></div>':'')+'<div class="card"><div class="row"><b>Demo Vaskerom</b><span class="pill ok">Godkjent</span></div><p>Uke 45</p></div>')},
    meg:function(){h('<div class="hdr"><h2>Meg</h2></div><div class="card"><b>Demo Montør</b><p>Demo Montasje AS</p></div><div class="card"><div class="row"><span>Språk</span><span>Norsk</span></div><p>Seks språk. Avvik oversettes til norsk i CRM.</p></div><div class="card"><div class="row"><span>Uten nett</span><span class="pill ok">Klar</span></div><p>Bilder og KS sendes når du får dekning.</p></div>')}
  };
  function render(){tabs();V[S.view]()}
  $('reset').onclick=function(){ci=0;init()};
  init();
})();

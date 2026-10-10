(function(){
var $=function(i){return document.getElementById(i)};
var M=[['Tomas K.','Ledig ons–tor · norsk, polsk',true],['Kari D.','Ledig ons–fre · norsk',true],['Piotr S.','Opptatt hele uka',false]];
var S,LG=document.getElementById('hlogo'),LOGO=LG&&LG.innerHTML.trim()?LG.innerHTML:'Hengsel';
function init(){S={v:'nye',sel:null,status:'ny',why:'',mont:null,steps:{},secs:47*3600+12*60};$('log').innerHTML='';[].forEach.call($('guide').children,function(l){l.classList.remove('d')});log('Montasjeleder','sendte jobben LI-10087 til Demo Montasje. Svarfrist 48 timer.');render()}
function log(w,t){var d=document.createElement('div');d.innerHTML='<b>'+w+'</b> '+t;$('log').prepend(d)}
function step(k){S.steps[k]=1;[].forEach.call($('guide').children,function(l){l.classList.toggle('d',!!S.steps[l.dataset.k])})}
function cd(){var s=S.secs,h=Math.floor(s/3600),m=Math.floor(s%3600/60);return h+' t '+(m<10?'0':'')+m+' min'}
setInterval(function(){if(S&&S.status==='ny'){S.secs-=60;var e=document.querySelector('.cd');if(e)e.textContent='Svar innen '+cd()}},1000);
function menu(){var n=S.status==='ny'?1:0;$('menu').innerHTML='<div class="b">'+LOGO+'</div>'+[['nye','Nye',n],['uke','Uke'],['team','Team']].map(function(x){return '<button type="button" data-v="'+x[0]+'" class="'+(S.v===x[0]?'on':'')+'">'+x[1]+(x[2]?'<span class="badge">'+x[2]+'</span>':'')+'</button>'}).join('');
 [].forEach.call($('menu').querySelectorAll('button'),function(b){b.onclick=function(){S.v=b.dataset.v;if(S.v==='uke')step('uke');render()}})}
function P(h){$('pane').innerHTML=h}
function on(i,f){var e=$(i);if(e)e.onclick=f}
var V={
nye:function(){
 if(S.status!=='ny'&&!S.sel){P('<h2>Nye</h2><div class="req"><p>Ingen nye forespørsler. Du får varsel når Kjøkkenstudio Hamar sender en jobb.</p></div>');return}
 var req='<div class="req '+(S.sel?'sel':'')+'" id="rq"><div class="top"><b>Kjøkken · Hanne Liksomlien</b>'+(S.status==='ny'?'<span class="cd">Svar innen '+cd()+'</span>':'<span class="pill '+(S.status==='ok'?'ok':'warn')+'">'+(S.status==='ok'?'Akseptert':'Avvist')+'</span>')+'</div><p>Liksomvegen 4, Lillehammer · uke 46, ons–tor</p></div>';
 if(!S.sel){P('<h2>Nye</h2>'+req);on('rq',function(){S.sel=1;step('se');render()});return}
 var d='<div class="req"><div class="row"><span>Jobb</span><span>LI-10087 · kjøkken</span></div><div class="row"><span>Tid</span><span>uke 46, 2 dager</span></div><div class="row"><span>Avtalt sum</span><span>18 400 kr</span></div><div class="row"><span>Med</span><span>KS Kjøkken, tegninger, varer</span></div></div>';
 if(S.status==='ny')d+='<div class="acts"><button class="btn primary big" id="ja">Aksepter</button><button class="btn big" id="nei">Avvis</button></div>';
 if(S.status==='avvis')d+='<div class="req"><b>Hvorfor avviser du?</b><div class="chips" id="why">'+['Ingen ledig kapasitet','For lang kjøring','Pris','Annet'].map(function(x){return '<button type="button" class="'+(S.why===x?'on':'')+'">'+x+'</button>'}).join('')+'</div><div class="acts"><button class="btn primary big" id="send">Send avvisning</button><button class="btn big" id="angre">Avbryt</button></div></div>';
 if(S.status==='ok'&&!S.mont)d+='<div class="req"><b>Hvem tar jobben?</b><div class="mt">'+M.map(function(m,i){return '<button type="button" class="m" data-i="'+i+'" '+(m[2]?'':'disabled')+'><b>'+m[0]+'</b><span>'+m[1]+'</span><span class="pill '+(m[2]?'ok':'')+'">'+(m[2]?'Ledig':'Opptatt')+'</span></button>'}).join('')+'</div></div>';
 if(S.status==='ok'&&S.mont)d+='<div class="req"><b>'+S.mont+' er satt på jobben.</b><p>Montøren har jobben i appen sin med tegninger, varer og beskjed fra selger.</p><button class="btn big" id="tilUke" style="justify-self:start">Se uka</button></div>';
 if(S.status==='avvist')d+='<div class="req"><b>Avvist: '+S.why+'</b><p>Montasjelederen finner et annet firma.</p></div>';
 P('<h2>Forespørsel</h2>'+req+d);
 on('ja',function(){S.status='ok';S.secs=0;step('svar');log('Hengsel','Demo Montasje <b>aksepterte</b> jobben LI-10087.');log('CRM','Montasjeplanen viser jobben som akseptert. Montør mangler fortsatt.');render()});
 on('nei',function(){S.status='avvis';render()});on('angre',function(){S.status='ny';render()});
 var w=$('why');if(w)[].forEach.call(w.children,function(b){b.onclick=function(){S.why=b.textContent;render()}});
 on('send',function(){if(!S.why){S.why='Ingen ledig kapasitet'}S.status='avvist';step('svar');log('Hengsel','Demo Montasje avviste: '+S.why+'.');log('CRM','Jobben er tilbake til «Ikke tildelt» og rød i planen. Montasjeleder har fått varsel.');render()});
 [].forEach.call(document.querySelectorAll('.m'),function(b){b.onclick=function(){var m=M[+b.dataset.i];if(!m[2])return;S.mont=m[0];step('mont');log('Hengsel',m[0]+' er satt på jobben og har fått varsel.');log('CRM','Ordre 10087 er nå <b>Klar for montør</b>. Selgeren ser hvem som kommer.');render()}});
 on('tilUke',function(){S.v='uke';step('uke');render()})},
uke:function(){var d=['Man','Tir','Ons','Tor','Fre'];var R={'Tomas K.':['Bad · Hamar','Bad · Hamar','','',''],'Kari D.':['','Service · Gjøvik','','',''],'Piotr S.':['Kjøkken · Ringsaker','Kjøkken · Ringsaker','Kjøkken · Ringsaker','Kjøkken · Ringsaker','Garderobe']};
 if(S.mont){R[S.mont][2]='<span>Liksomlien · dag 1</span>';R[S.mont][3]='<span>Liksomlien · dag 2</span>'}
 var miss=S.status==='ok'&&!S.mont;
 P('<h2>Uke 46</h2><div class="week"><div class="h"></div>'+d.map(function(x){return '<div class="h">'+x+'</div>'}).join('')+Object.keys(R).map(function(m){return '<div class="n">'+m+'</div>'+R[m].map(function(c){return c?'<div class="j '+(c.indexOf('Liksomlien')>-1?'new':'')+'">'+c+'</div>':'<div></div>'}).join('')}).join('')+(miss?'<div class="n">Uten montør</div><div></div><div></div><div class="j w">Liksomlien</div><div class="j w">Liksomlien</div><div></div>':'')+'</div>'+(miss?'<div class="req"><p>Liksomlien mangler montør. Velg montør under Nye.</p></div>':''))},
team:function(){P('<h2>Team</h2><div class="mt">'+M.map(function(m){return '<div class="m" style="cursor:default"><b>'+m[0]+'</b><span>'+m[1]+'</span><span class="pill '+(m[2]?'ok':'')+'">'+(m[2]?'Ledig':'Opptatt')+'</span></div>'}).join('')+'</div><div class="req"><p>Montørene logger inn i den samme appen og ser bare sine egne jobber. Appen finnes på seks språk.</p></div>')}
};
function render(){menu();V[S.v]()}
$('reset').onclick=init;init();
})();

(function(){
  var $=function(id){return document.getElementById(id)};
  var NS='http://www.w3.org/2000/svg';
  var FRONT='Malt, Blek Blue · knott i messing';
  /* Elementer. Mål i cm i tegningen, mm i panelet. bx/by = statusmerke, lx/ly = nummer */
  var EL=[
    {id:'H1',t:'Høyskap kjøl/frys',l:'skap',x:0,y:0,w:60,h:60,lx:30,ly:42,bx:30,by:16,m:'600 × 2100 × 600',v:[['Skrog høyskap','1'],['Kjøl/frys, integrert (BSH)','1'],['Front, 2 dører','1'],['Sokkel','1']],n:'Vegg: lettvegg, bruk platebærere. Fest i to punkt i toppen.'},
    {id:'H2',t:'Høyskap ovn',l:'skap',x:60,y:0,w:60,h:60,lx:90,ly:42,bx:90,by:16,m:'600 × 2100 × 600',v:[['Skrog høyskap','1'],['Stekeovn (BSH)','1'],['Skuffer','2'],['Front','2'],['Sokkel','1']],n:'Lettvegg, bruk platebærere. La 5 cm luft bak ovnen.'},
    {id:'B1',t:'Benkeskap med skuffer',l:'skap',x:120,y:0,w:60,h:60,lx:154,ly:55,bx:141,by:51.5,m:'600 × 720 × 560',v:[['Skrog','1'],['Skuffer','3'],['Front','3'],['Sokkel','1']],n:'Vegg: lettvegg, bruk platebærere.'},
    {id:'B2',t:'Vaskeskap',l:'skap',x:180,y:0,w:80,h:60,lx:224,ly:55,bx:211,by:51.5,m:'800 × 720 × 560',v:[['Skrog','1'],['Front, 2 dører','1'],['Kildesortering','1'],['Sokkel','1']],n:'Vann og avløp fra vegg. Legg lekkasjematte i bunnen.'},
    {id:'B3',t:'Benkeskap smalt',l:'skap',x:260,y:0,w:40,h:60,lx:285,ly:55,bx:273,by:51.5,m:'400 × 720 × 560',v:[['Skrog','1'],['Front, 1 dør','1'],['Hylle','2'],['Sokkel','1']],n:'Vegg: lettvegg, bruk platebærere.'},
    {id:'B4',t:'Hjørneskap',l:'skap',x:300,y:0,w:60,h:60,lx:316,ly:55,bx:305,by:51.5,m:'600 × 720 × 600',v:[['Skrog hjørne','1'],['Hjørnebeslag','1'],['Front','1'],['Sokkel','1']],n:'Sjekk vinkelen i hjørnet før benkeplaten måles.'},
    {id:'B5',t:'Benkeskap under koketopp',l:'skap',x:300,y:60,w:60,h:80,lx:330,ly:104,bx:330,by:88,m:'800 × 720 × 560',v:[['Skrog','1'],['Skuffer','2'],['Front','2'],['Induksjon (BSH)','1'],['Sokkel','1']],n:'Kurs 32 A for koketopp. Varmeskjold over øverste skuff.'},
    {id:'B6',t:'Benkeskap med skuffer',l:'skap',x:300,y:140,w:60,h:60,lx:312,ly:182,bx:312,by:166,m:'600 × 720 × 560',v:[['Skrog','1'],['Skuffer','4'],['Front','4'],['Sokkel','1'],['Synlig endeside','1']],n:'Endesiden mot døra er synlig. Fest sokkel med klips.'},
    {id:'O1',t:'Overskap',l:'over',x:120,y:0,w:50,h:35,lx:145,ly:29,bx:145,by:12,m:'500 × 700 × 350',v:[['Skrog','1'],['Front, 1 dør','1'],['Hylle','2'],['Opphengsbeslag','2']],n:'Vegg: lettvegg, bruk platebærere. Toppkant 2200 mm.'},
    {id:'O2',t:'Overskap',l:'over',x:270,y:0,w:55,h:35,lx:297,ly:29,bx:297,by:12,m:'550 × 700 × 350',v:[['Skrog','1'],['Front, 1 dør','1'],['Hylle','2'],['Opphengsbeslag','2']],n:'Lettvegg, bruk platebærere. Juster mot vinduskarm.'},
    {id:'O3',t:'Overskap hjørne',l:'over',x:325,y:0,w:35,h:60,lx:342,ly:46,bx:342,by:18,m:'600 × 700 × 350',v:[['Skrog hjørne','1'],['Front, 1 dør','1'],['Hylle','2'],['Opphengsbeslag','2']],n:'Lettvegg, bruk platebærere. Toppkant 2200 mm.'},
    {id:'O4',t:'Overskap',l:'over',x:325,y:140,w:35,h:60,lx:342,ly:186,bx:342,by:158,m:'600 × 700 × 350',v:[['Skrog','1'],['Front, 1 dør','1'],['Hylle','2'],['Opphengsbeslag','2']],n:'Minst 650 mm fra koketoppen til ventilatoren ved siden av.'}
  ];
  var BY={};EL.forEach(function(e){BY[e.id]=e});
  var REASONS=['Skade','Feil mål','Feil vare','Annet'];
  var S;
  var clock=['09:12','09:20','09:31','09:44','09:58','10:06','10:17','10:29','10:40','10:52','11:05','11:18','11:31','11:46','12:02','12:15','12:30','12:44','13:01','13:15','13:32','13:48','14:05','14:20'],ci=0;
  function now(){return clock[Math.min(ci++,clock.length-1)]}
  function log(who,txt,t){var d=document.createElement('div');d.innerHTML='<time>'+(t||now())+'</time><span><b>'+who+'</b> '+txt+'</span>';$('log').prepend(d)}
  function step(k){S.steps[k]=1;[].forEach.call($('guide').children,function(li){li.classList.toggle('d',!!S.steps[li.dataset.k])})}
  function toast(t){var e=$('toast');e.textContent=t;e.classList.add('show');clearTimeout(e._t);e._t=setTimeout(function(){e.classList.remove('show')},1900)}

  /* ---------- SVG ---------- */
  function mk(tag,attrs,parent,text){var e=document.createElementNS(NS,tag);for(var k in attrs)e.setAttribute(k,attrs[k]);if(text!=null)e.textContent=text;if(parent)parent.appendChild(e);return e}
  var G={};
  function buildSvg(){
    var s=$('svg');s.innerHTML='';
    mk('rect',{class:'floor',x:0,y:0,width:360,height:280},s);
    // Vegger: topp med vindu, høyre, bunn med dør, venstre
    var w=mk('g',{},s);
    mk('path',{class:'wall',d:'M-5 -5 H170 M270 -5 H365 V285 H130 M40 285 H-5 V-5'},w);
    mk('rect',{class:'win',x:170,y:-10,width:100,height:10},w);
    mk('line',{class:'win',x1:170,y1:-5,x2:270,y2:-5},w);
    mk('line',{class:'doorleaf',x1:40,y1:280,x2:40,y2:190},w);
    mk('path',{class:'door',d:'M40 190 A90 90 0 0 1 130 280'},w);
    // Skap-lag
    G.skap=mk('g',{'data-layer':'skap'},s);
    mk('path',{class:'top',d:'M120 0 H360 V202 H298 V62 H120 Z'},G.skap);
    // Hvitevarer
    G.hv=mk('g',{class:'hv','data-layer':'hv'},s);
    // Overskap
    G.over=mk('g',{'data-layer':'over'},s);
    // Hvitevarer tegnes over skapene, under overskap
    EL.forEach(function(e){
      var g=mk('g',{class:'el'+(e.l==='over'?' over':''),'data-id':e.id,tabindex:0,role:'button','aria-label':e.id+' '+e.t},e.l==='over'?G.over:G.skap);
      mk('rect',{x:e.x+.6,y:e.y+.6,width:e.w-1.2,height:e.h-1.2,rx:1.5},g);
      mk('text',{x:e.lx,y:e.ly},g,e.id);
      var b=mk('g',{class:'bd'},g);e._g=g;e._b=b;
    });
    s.insertBefore(G.hv,G.over);
    mk('rect',{x:193,y:10,width:54,height:38,rx:6},G.hv);
    mk('circle',{cx:220,cy:29,r:3},G.hv);
    [[316,76],[344,76],[316,124],[344,124]].forEach(function(p){mk('circle',{cx:p[0],cy:p[1],r:8},G.hv)});
    mk('text',{x:30,y:54},G.hv,'Kjøl/frys');
    mk('text',{x:90,y:54},G.hv,'Ovn');
    // Mål
    G.mal=mk('g',{class:'mal','data-layer':'mal'},s);
    function dim(x1,y1,x2,y2,txt,vert){
      mk('line',{x1:x1,y1:y1,x2:x2,y2:y2},G.mal);
      if(vert){mk('line',{x1:x1-4,y1:y1,x2:x1+4,y2:y1},G.mal);mk('line',{x1:x2-4,y1:y2,x2:x2+4,y2:y2},G.mal)}
      else{mk('line',{x1:x1,y1:y1-4,x2:x1,y2:y1+4},G.mal);mk('line',{x1:x2,y1:y2-4,x2:x2,y2:y2+4},G.mal)}
      var cx=(x1+x2)/2,cy=(y1+y2)/2;
      if(vert){mk('rect',{class:'bgt',x:cx-7,y:cy-15,width:14,height:30},G.mal);mk('text',{x:cx,y:cy+3.5,transform:'rotate(-90 '+cx+' '+cy+')'},G.mal,txt)}
      else{mk('rect',{class:'bgt',x:cx-15,y:cy-7,width:30,height:14},G.mal);mk('text',{x:cx,y:cy+3.5},G.mal,txt)}
    }
    dim(0,-32,360,-32,'3600');
    dim(-30,0,-30,280,'2800',true);
    dim(390,0,390,280,'2800',true);
    dim(170,-20,270,-20,'1000');
    dim(40,300,130,300,'900');
  }

  /* ---------- Status ---------- */
  function paint(){
    var done=0,av=0;
    EL.forEach(function(e){
      var st=S.st[e.id].s,g=e._g;
      g.setAttribute('class','el'+(e.l==='over'?' over':'')+(st==='done'?' done':st==='av'?' av':'')+(S.sel===e.id?' sel':''));
      e._b.innerHTML='';
      if(st==='done'){done++;mk('circle',{cx:e.bx,cy:e.by,r:6},e._b);mk('path',{d:'M'+(e.bx-3)+' '+e.by+' l2 2.2 l4 -4.4'},e._b)}
      if(st==='av'){av++;mk('circle',{cx:e.bx,cy:e.by,r:6},e._b);mk('text',{x:e.bx,y:e.by+3.2},e._b,'!')}
    });
    $('progt').textContent=done+' av 12 montert';
    var a=$('avt');a.textContent=av+(av===1?' avvik':' avvik');a.className='pill'+(av?' warn':'');
    $('barok').style.width=(done/12*100)+'%';$('barav').style.width=(av/12*100)+'%';
    var ready=done+av===12;
    var sb=$('send');sb.disabled=!ready||S.sent;
    sb.textContent=S.sent?'Sendt til selger':'Send til selger';
    sb.title=ready?'':'Alle skap må være ferdige eller ha avvik';
  }

  /* ---------- Detaljpanel ---------- */
  function esc(t){return String(t).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
  function det(){
    var d=$('det');
    if(!S.sel){
      d.innerHTML='<h2>Velg et skap</h2><p class="empty">Trykk på et element i tegningen, eller velg her.</p>'+
        '<div class="pick">'+EL.map(function(e){var st=S.st[e.id].s;return '<button type="button" data-p="'+e.id+'" class="'+(st==='done'?'done':st==='av'?'av':'')+'" aria-label="'+e.id+' '+e.t+'">'+e.id+'</button>'}).join('')+'</div>'+
        '<p class="empty" style="font-size:13px">Grønn: ferdig. Brun: avvik. Beige: ikke startet.</p>';
      [].forEach.call(d.querySelectorAll('[data-p]'),function(b){b.onclick=function(){select(b.dataset.p)}});
      return;
    }
    var e=BY[S.sel],st=S.st[e.id];
    var pill=st.s==='done'?'<span class="pill ok">Ferdig montert</span>':st.s==='av'?'<span class="pill warn">'+(st.kind==='ml'?'Mangler del':'Avvik')+'</span>':'<span class="pill">Ikke startet</span>';
    var h='<div class="row"><button type="button" class="btn" id="bk" style="min-height:40px;padding:6px 10px">‹ Alle</button>'+pill+'</div>'+
      '<h2>'+e.id+'</h2><p class="ty">'+e.t+'</p>';
    if(S.mode==='av'){
      h+='<div class="sec">Meld avvik på '+e.id+'</div><div class="chips" id="rs">'+REASONS.map(function(r){return '<button type="button" class="'+(S.reason===r?'on':'')+'">'+r+'</button>'}).join('')+'</div>'+
        '<button type="button" class="pic'+(S.pic?' on':'')+'" id="pic">'+(S.pic?'✓ Bilde lagt ved (demo)':'+ Ta bilde')+'</button>'+
        '<div class="acts"><button type="button" class="a" id="sendav">Send avvik</button><button type="button" id="cancel">Avbryt</button></div>';
    } else if(S.mode==='ml'){
      h+='<div class="sec">Hvilken del mangler?</div><div class="chips" id="ps">'+e.v.map(function(v){return '<button type="button" class="'+(S.part===v[0]?'on':'')+'">'+esc(v[0])+'</button>'}).join('')+'</div>'+
        '<div class="acts"><button type="button" class="a" id="sendml">Meld mangel</button><button type="button" id="cancel">Avbryt</button></div>';
    } else {
      h+='<div class="kv"><span>Mål B×H×D</span><b>'+e.m+' mm</b><span>Front</span><b>'+FRONT+'</b></div>'+
        (st.s==='av'?'<div class="avn"><b>'+(st.kind==='ml'?'Mangler del':'Avvik')+':</b> '+esc(st.note)+'</div>':'')+
        '<div class="mn"><b>Monteringsnotat</b>'+esc(e.n)+'</div>'+
        '<div class="acts">'+(st.s==='done'?'<button type="button" id="undo">Angre ferdig</button>':'<button type="button" class="p" id="ok">✓ Ferdig montert</button>')+
        '<button type="button" class="w" id="av">Meld avvik</button><button type="button" id="ml">Mangler del</button></div>'+
        '<div class="sec">Varelinjer</div><ul class="lines">'+e.v.map(function(v){return '<li>'+esc(v[0])+'<span>'+v[1]+' stk</span></li>'}).join('')+'</ul>';
    }
    d.innerHTML=h;
    on('bk',function(){S.sel=null;S.mode=null;paint();det()});
    on('ok',function(){S.st[e.id]={s:'done'};S.sent=false;step('done');
      var n=count();log('Hengsel','Piotr meldte <em>'+e.id+'</em> ferdig montert. '+n+' av 12.');
      if(n===12)log('CRM','Alle skap er montert. Ingrid ser jobben som klar for overtakelse.');
      toast(e.id+' ferdig montert');S.sel=null;paint();det()});
    on('undo',function(){S.st[e.id]={s:'none'};S.sent=false;log('Hengsel','Piotr angret ferdigmelding på <em>'+e.id+'</em>.');paint();det()});
    on('av',function(){S.mode='av';S.reason='Skade';S.pic=false;det()});
    on('ml',function(){S.mode='ml';S.part=e.v[0][0];det()});
    on('cancel',function(){S.mode=null;det()});
    on('pic',function(){if(!S.pic){S.pic=true;det()}});
    if($('rs'))[].forEach.call($('rs').children,function(b){b.onclick=function(){S.reason=b.textContent;det()}});
    if($('ps'))[].forEach.call($('ps').children,function(b){b.onclick=function(){S.part=b.textContent;det()}});
    on('sendav',function(){if(!S.pic){toast('Ta et bilde først');return}
      S.st[e.id]={s:'av',kind:'av',note:S.reason+', bilde lagt ved'};S.mode=null;S.sent=false;step('av');
      log('Hengsel','Avvik på <em>'+e.id+'</em>: '+S.reason+', med bilde. Plassert i tegningen.');
      log('CRM','Sak opprettet på LI-10087 med skapnummer '+e.id+'. Ingrid ser den i Min dag.');
      if(S.reason==='Skade'||S.reason==='Feil vare')log('CRM','Reklamasjon klargjort til Sigdal med varelinjene til '+e.id+'.');
      toast('Avvik sendt');S.sel=null;paint();det()});
    on('sendml',function(){
      S.st[e.id]={s:'av',kind:'ml',note:S.part};S.mode=null;S.sent=false;step('av');
      log('Hengsel','Mangler del på <em>'+e.id+'</em>: '+esc(S.part)+'.');
      log('CRM','Restordre-utkast til Sigdal: '+esc(S.part)+' til '+e.id+'. Venter på Ingrid.');
      toast('Mangel meldt');S.sel=null;paint();det()});
  }
  function on(id,fn){var e=$(id);if(e)e.onclick=fn}
  function count(){return EL.filter(function(e){return S.st[e.id].s==='done'}).length}
  function select(id){S.sel=id;S.mode=null;step('sel');paint();det();
    if(window.matchMedia('(max-width:760px)').matches){var d=$('det');setTimeout(function(){d.scrollIntoView({behavior:'smooth',block:'start'})},30)}}

  /* ---------- Lag ---------- */
  [].forEach.call($('layers').children,function(b){b.onclick=function(){
    var l=b.dataset.l;S.layers[l]=!S.layers[l];b.setAttribute('aria-pressed',S.layers[l]?'true':'false');
    G[l].style.display=S.layers[l]?'':'none';step('view')}});
  function applyLayers(){[].forEach.call($('layers').children,function(b){var l=b.dataset.l;b.setAttribute('aria-pressed',S.layers[l]?'true':'false');G[l].style.display=S.layers[l]?'':'none'})}

  /* ---------- Zoom og flytt ---------- */
  var FIT={x:-50,y:-50,w:460,h:350},vb;
  var svg=$('svg');
  function setVb(){svg.setAttribute('viewBox',vb.x+' '+vb.y+' '+vb.w+' '+vb.h)}
  function fit(){vb={x:FIT.x,y:FIT.y,w:FIT.w,h:FIT.h};setVb()}
  function startView(){var r=svg.getBoundingClientRect();if(r.width&&r.width<480){vb={x:108,y:-42,w:330,h:262};setVb()}else fit()}
  function toUnits(cx,cy){var p=svg.createSVGPoint();p.x=cx;p.y=cy;var m=svg.getScreenCTM();return m?p.matrixTransform(m.inverse()):{x:vb.x+vb.w/2,y:vb.y+vb.h/2}}
  function upp(){var m=svg.getScreenCTM();return m?1/m.a:1}
  function zoomAt(f,ux,uy){
    var nw=Math.min(FIT.w*1.3,Math.max(FIT.w/5,vb.w/f));f=vb.w/nw;
    vb.x=ux-(ux-vb.x)/f;vb.y=uy-(uy-vb.y)/f;vb.w=nw;vb.h=vb.h/f;setVb()}
  function zoomC(f){zoomAt(f,vb.x+vb.w/2,vb.y+vb.h/2);step('view')}
  $('zin').onclick=function(){zoomC(1.4)};
  $('zout').onclick=function(){zoomC(1/1.4)};
  $('zfit').onclick=function(){fit();step('view')};
  var P={},down=null,moved=false,pinch=null;
  svg.addEventListener('pointerdown',function(e){
    P[e.pointerId]={x:e.clientX,y:e.clientY};
    var ids=Object.keys(P);
    if(ids.length===1){var t=e.target.closest&&e.target.closest('[data-id]');down={x:e.clientX,y:e.clientY,id:t?t.getAttribute('data-id'):null};moved=false;pinch=null}
    if(ids.length===2){var a=P[ids[0]],b=P[ids[1]];pinch={d:Math.hypot(a.x-b.x,a.y-b.y),mx:(a.x+b.x)/2,my:(a.y+b.y)/2};moved=true}
  });
  svg.addEventListener('pointermove',function(e){
    if(!P[e.pointerId])return;
    var prev=P[e.pointerId];P[e.pointerId]={x:e.clientX,y:e.clientY};
    var ids=Object.keys(P);
    if(ids.length>=2&&pinch){
      var a=P[ids[0]],b=P[ids[1]],d=Math.hypot(a.x-b.x,a.y-b.y),mx=(a.x+b.x)/2,my=(a.y+b.y)/2;
      var s=upp();vb.x-=(mx-pinch.mx)*s;vb.y-=(my-pinch.my)*s;setVb();
      if(pinch.d>0&&d>0){var u=toUnits(mx,my);zoomAt(d/pinch.d,u.x,u.y)}
      pinch={d:d,mx:mx,my:my};step('view');return}
    if(!down)return;
    if(!moved&&Math.hypot(e.clientX-down.x,e.clientY-down.y)>6){moved=true;svg.classList.add('drag');try{svg.setPointerCapture(e.pointerId)}catch(_){}}
    if(moved){var s2=upp();vb.x-=(e.clientX-prev.x)*s2;vb.y-=(e.clientY-prev.y)*s2;setVb();step('view')}
  });
  function up(e){
    var had=!!P[e.pointerId];delete P[e.pointerId];
    var left=Object.keys(P).length;
    if(left===0){svg.classList.remove('drag');
      if(had&&e.type==='pointerup'&&down&&!moved&&down.id)select(down.id);
      down=null;pinch=null}
    else if(left===1){pinch=null;down=null}
  }
  svg.addEventListener('pointerup',up);svg.addEventListener('pointercancel',up);
  svg.addEventListener('wheel',function(e){if(!e.ctrlKey&&!e.metaKey)return;e.preventDefault();var u=toUnits(e.clientX,e.clientY);zoomAt(e.deltaY<0?1.15:1/1.15,u.x,u.y);step('view')},{passive:false});
  svg.addEventListener('keydown',function(e){var t=e.target.closest&&e.target.closest('[data-id]');if(t&&(e.key==='Enter'||e.key===' ')){e.preventDefault();select(t.getAttribute('data-id'))}});

  /* ---------- Send ---------- */
  $('send').onclick=function(){
    var done=count(),list=EL.filter(function(e){return S.st[e.id].s==='av'});
    S.sent=true;step('send');
    log('Hengsel','Piotr sendte tegningen med status til selger: '+done+' ferdig, '+list.length+' avvik.');
    log('CRM','Ingrid fikk varsel. Avvik ligger på ordren med skapnummer: '+(list.length?list.map(function(e){return '<em>'+e.id+'</em>'}).join(', '):'ingen')+'.');
    log('CRM','Kunden ser fremdriften på Min side.');
    toast('Sendt til selger');paint()};

  function init(){
    S={st:{},sel:null,mode:null,reason:'Skade',pic:false,part:'',layers:{skap:true,over:true,hv:true,mal:true},sent:false,steps:{}};
    EL.forEach(function(e){S.st[e.id]={s:'none'}});
    ['H1','H2','B1','B2','B3','B4'].forEach(function(id){S.st[id]={s:'done'}});
    S.st.O2={s:'av',kind:'av',note:'Skade, riper i fronten. Bilde lagt ved.'};
    ci=0;$('log').innerHTML='';
    [].forEach.call($('guide').children,function(li){li.classList.remove('d')});
    log('CRM','Tegningen fra CET (rev. 2) er koblet til jobben LI-10087. Skapnumrene følger ordrelinjene.','07:30');
    log('Hengsel','Piotr startet montering. H1, H2 og B1 til B4 meldt ferdig.','08:55');
    log('Hengsel','Avvik på <em>O2</em>: skade, riper i fronten. Bilde lagt ved.','09:05');
    log('CRM','Sak opprettet på LI-10087. Ingrid ser den i Min dag.','09:05');
    buildSvg();applyLayers();startView();paint();det();
  }
  $('reset').onclick=init;
  init();
})();

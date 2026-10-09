(function(){
  var S=[].slice.call(document.querySelectorAll('.slide')),cur=0,dots=document.getElementById('dots');
  S.forEach(function(s,i){var b=document.createElement('button');b.type='button';b.setAttribute('aria-label','Lysbilde '+(i+1));b.addEventListener('click',function(){go(i)});dots.appendChild(b)});
  function go(n){
    if(n<0||n>=S.length)return;
    S.forEach(function(s,i){s.classList.toggle('on',i===n);s.classList.toggle('prev',i<n);s.setAttribute('aria-hidden',i===n?'false':'true')});
    [].forEach.call(dots.children,function(d,i){d.classList.toggle('on',i===n)});
    cur=n;document.getElementById('count').textContent=(n+1)+' / '+S.length;
    var pg=document.getElementById('prog');if(pg)pg.style.width=((n+1)/S.length*100)+'%';
    document.getElementById('prev').disabled=n===0;document.getElementById('next').disabled=n===S.length-1;
    S[n].scrollTop=0;
    try{history.replaceState(null,'','#'+(n+1))}catch(e){}
  }
  document.getElementById('prev').onclick=function(){go(cur-1)};
  document.getElementById('next').onclick=function(){go(cur+1)};
  document.addEventListener('keydown',function(e){
    if(e.key==='ArrowRight'||e.key==='PageDown'||e.key===' '){e.preventDefault();go(cur+1)}
    else if(e.key==='ArrowLeft'||e.key==='PageUp'){e.preventDefault();go(cur-1)}
    else if(e.key==='Home')go(0);else if(e.key==='End')go(S.length-1);
  });
  var x0=null;document.getElementById('deck').addEventListener('touchstart',function(e){x0=e.touches[0].clientX},{passive:true});
  document.getElementById('deck').addEventListener('touchend',function(e){if(x0===null)return;var dx=e.changedTouches[0].clientX-x0;if(Math.abs(dx)>50)go(cur+(dx<0?1:-1));x0=null});
  var el=document.documentElement,fs=document.getElementById('fs');
  if(!(el.requestFullscreen||el.webkitRequestFullscreen))fs.style.display='none';
  fs.onclick=function(){try{if(document.fullscreenElement||document.webkitFullscreenElement){(document.exitFullscreen||document.webkitExitFullscreen).call(document)}else{(el.requestFullscreen||el.webkitRequestFullscreen).call(el)}}catch(e){}};
  var h=parseInt((location.hash||'').slice(1),10);go(h>0&&h<=S.length?h-1:0);
})();

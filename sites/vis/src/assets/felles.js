/* Felles verdier for Visningsrommet. Lastes før sidens eget skript.
   Statusdatoen vises i Systemkartet (nb/sv/en) og Veikartet. Endre den bare her. */
var VIS={statusDato:[2026,10,9]}; // år, måned (1–12), dag
(function(){
var d=VIS.statusDato,dato=new Date(d[0],d[1]-1,d[2]),to=function(n){return (n<10?'0':'')+n};
var form={
 nb:to(d[2])+'.'+to(d[1])+'.'+d[0],
 sv:d[0]+'-'+to(d[1])+'-'+to(d[2]),
 en:dato.toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'})
};
VIS.statusTekst=form;
[].forEach.call(document.querySelectorAll('[data-statusdato]'),function(e){e.textContent=form[e.getAttribute('data-statusdato')]||form.nb});
})();

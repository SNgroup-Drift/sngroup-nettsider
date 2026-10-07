// «Prøv Hengsel»: telefon med tre faner og «Uten dekning». Fra sites/sngroup/src/components/Telefon.astro.
// Stiler i assets/kit.css. Eksempeldata fra dagens sngroup.no. Ingenting sendes noe sted.
const TLF_JOBB = ['Tegning og ordrebekreftelse', '3 leverandører levert', 'Kontrollmål vegg og vindu', 'Ferdigmelding'];
const TLF_KS = ['Skap i lodd og vater', 'Festet i bærende vegg', 'Fronter justert, like fuger', 'Ryddet og rengjort'];

function Telefon() {
  const [fane, setFane] = React.useState('dag');
  const [jobb, setJobb] = React.useState([false, true, false, false]);
  const [ks, setKs] = React.useState([null, null, null, null]);
  const [uten, setUten] = React.useState(false);
  const [venter, setVenter] = React.useState(0);
  const [ko, setKo] = React.useState(null);
  const venteTekst = (n) => 'Uten dekning · ' + n + ' ' + (n === 1 ? 'endring venter' : 'endringer venter') + ' og sendes når du har nett';
  const endret = () => { if (!uten) return; const n = venter + 1; setVenter(n); setKo(venteTekst(n)); };
  const bryt = () => {
    const ny = !uten; setUten(ny);
    if (ny) setKo(venteTekst(venter));
    else if (venter > 0) { setVenter(0); setKo('Sendt ✓'); setTimeout(() => setKo((k) => (k === 'Sendt ✓' ? null : k)), 2500); }
    else setKo(null);
  };
  const pst = (n) => (n / 4) * 100 + '%';
  const h = React.createElement;
  const faner = [['dag', 'I dag'], ['jobb', 'Jobb'], ['ks', 'KS']];
  let panel;
  if (fane === 'dag') {
    panel = h('div', { className: 'panel', role: 'tabpanel' },
      h('p', { className: 'skjermtittel' }, 'I dag'),
      h('div', { className: 'tkort hi' }, h('small', null, 'Neste jobb · 07:30'), h('b', null, 'Kjøkken, Hamar'), 'Tegning · 3 leverandører · KS'),
      h('div', { className: 'tkort' }, h('small', null, 'I morgen'), h('b', null, 'Bad, Lillehammer')),
      h('div', { className: 'tkort' }, h('small', null, 'Torsdag'), h('b', null, 'Garderobe, Gjøvik')));
  } else if (fane === 'jobb') {
    panel = h('div', { className: 'panel', role: 'tabpanel' },
      h('p', { className: 'skjermtittel' }, 'Kjøkken, Hamar'),
      h('div', { className: 'bar' }, h('i', { style: { width: pst(jobb.filter(Boolean).length) } })),
      TLF_JOBB.map((t, i) => h('button', { key: t, type: 'button', className: 'sjekk', role: 'checkbox', 'aria-checked': String(jobb[i]),
        onClick: () => { setJobb(jobb.map((b, j) => (j === i ? !b : b))); endret(); } }, h('span', { className: 'boks', 'aria-hidden': 'true' }), t)));
  } else {
    panel = h('div', { className: 'panel', role: 'tabpanel' },
      h('p', { className: 'skjermtittel' }, 'KS Kjøkken'),
      h('div', { className: 'bar' }, h('i', { style: { width: pst(ks.filter((k) => k).length) } })),
      TLF_KS.map((t, i) => h('div', { key: t, className: 'ks', role: 'group', 'aria-label': t },
        h('span', null, t),
        h('span', { className: 'seg' }, [['ok', 'OK'], ['av', 'Avvik']].map(([k, l]) => h('button', { key: k, type: 'button', className: k,
          'aria-pressed': String(ks[i] === k), onClick: () => { setKs(ks.map((x, j) => (j === i ? k : x))); endret(); } }, l))))));
  }
  return h('div', { className: 'scene' },
    h('div', { className: 'telefon', role: 'region', 'aria-label': 'Eksempel på montørappen Hengsel' },
      h('div', { className: 'skjerm' }, panel,
        ko ? h('div', { className: 'ko', 'aria-live': 'polite' }, ko) : null,
        h('div', { className: 'faner', role: 'tablist', 'aria-label': 'Faner i appen' },
          faner.map(([id, l]) => h('button', { key: id, type: 'button', role: 'tab', 'aria-selected': String(fane === id), onClick: () => setFane(id) }, l))))),
    h('button', { type: 'button', className: 'bryter', role: 'switch', 'aria-checked': String(uten), onClick: bryt },
      h('span', { className: 'sw', 'aria-hidden': 'true' }), 'Uten dekning'));
}
window.Telefon = Telefon;

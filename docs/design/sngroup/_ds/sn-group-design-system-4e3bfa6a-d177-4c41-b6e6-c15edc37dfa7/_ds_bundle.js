/* @ds-bundle: {"format":4,"namespace":"SNGroupDesignSystem_4e3bfa","components":[{"name":"Card","sourcePath":"components/card/Card.jsx"},{"name":"CompanyRow","sourcePath":"components/company/CompanyRow.jsx"},{"name":"ContactBlock","sourcePath":"components/contact/ContactBlock.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"SiteFooter","sourcePath":"components/footer/SiteFooter.jsx"},{"name":"SiteHeader","sourcePath":"components/header/SiteHeader.jsx"},{"name":"ComingSoon","sourcePath":"components/layout/ComingSoon.jsx"},{"name":"Section","sourcePath":"components/layout/Section.jsx"},{"name":"PrivacyPage","sourcePath":"components/privacy/PrivacyPage.jsx"}],"sourceHashes":{"components/card/Card.jsx":"59ffb03d0147","components/company/CompanyRow.jsx":"e53997c90376","components/contact/ContactBlock.jsx":"8d293f1f3250","components/core/Button.jsx":"20b53d33aa01","components/footer/SiteFooter.jsx":"f1a284fc299f","components/header/SiteHeader.jsx":"d664c1af1661","components/layout/ComingSoon.jsx":"6dd583b3a326","components/layout/Section.jsx":"3a77ddeb4821","components/privacy/PrivacyPage.jsx":"cfac387a5573","ui_kits/sngroup/Plantegning.jsx":"45944d8688c1","ui_kits/sngroup/SngroupHome.jsx":"d85b61bf5269","ui_kits/sngroup/Telefon.jsx":"f155a85e4b20","ui_kits/sngroup/innhold.js":"f14f42a0c1f1"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.SNGroupDesignSystem_4e3bfa = window.SNGroupDesignSystem_4e3bfa || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/card/Card.jsx
try { (() => {
/** Kort på flate med valgfri lenke. */
function Card({
  tittel,
  href,
  lenketekst = 'Les mer',
  children
}) {
  return /*#__PURE__*/React.createElement("article", {
    className: "sn-kort"
  }, /*#__PURE__*/React.createElement("h3", null, tittel), children ? /*#__PURE__*/React.createElement("div", {
    className: "sn-kort__innhold"
  }, children) : null, href ? /*#__PURE__*/React.createElement("a", {
    className: "sn-kort__lenke",
    href: href
  }, lenketekst) : null);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/card/Card.jsx", error: String((e && e.message) || e) }); }

// components/company/CompanyRow.jsx
try { (() => {
/** Virksomhet som rad: navn, tekst, stikkord og lenker. Bygd på <details>. */
function CompanyRow({
  id,
  navn,
  undertittel,
  tekst,
  tekstHtml,
  stikkord = [],
  lenker = [],
  apen = false,
  plassholder = false,
  onToggle
}) {
  const ekstern = href => /^https?:/.test(href);
  const styrt = typeof onToggle === 'function';
  const [egen, setEgen] = React.useState(apen);
  const open = styrt ? apen : egen;
  const bytt = e => {
    e.preventDefault();
    if (styrt) onToggle(!open);else setEgen(!open);
  };
  return /*#__PURE__*/React.createElement("details", {
    className: "sn-rad",
    id: 'rad-' + id,
    "data-rad": id,
    open: open
  }, /*#__PURE__*/React.createElement("summary", {
    onClick: bytt
  }, /*#__PURE__*/React.createElement("span", {
    className: "sn-rad__navn"
  }, /*#__PURE__*/React.createElement("h3", null, navn), undertittel ? /*#__PURE__*/React.createElement("span", {
    className: "sn-rad__under"
  }, undertittel) : null), /*#__PURE__*/React.createElement("span", {
    className: "sn-rad__pluss",
    "aria-hidden": "true"
  }, "+")), /*#__PURE__*/React.createElement("div", {
    className: "sn-rad__innhold"
  }, tekstHtml ? /*#__PURE__*/React.createElement("p", {
    dangerouslySetInnerHTML: {
      __html: tekstHtml
    }
  }) : /*#__PURE__*/React.createElement("p", {
    className: plassholder ? 'plassholder' : undefined
  }, tekst), /*#__PURE__*/React.createElement("div", {
    className: "sn-rad__side"
  }, stikkord.length > 0 ? /*#__PURE__*/React.createElement("ul", {
    className: "sn-rad__stikkord",
    "aria-label": "Stikkord"
  }, stikkord.map(s => /*#__PURE__*/React.createElement("li", {
    key: s
  }, s))) : null, lenker.length > 0 ? /*#__PURE__*/React.createElement("p", {
    className: "sn-rad__lenker"
  }, lenker.map(l => /*#__PURE__*/React.createElement("a", {
    key: l.href,
    href: l.href,
    className: l.primar ? 'pill solid' : 'pill',
    rel: ekstern(l.href) ? 'noopener' : undefined
  }, l.label, ekstern(l.href) ? /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, " \u2197") : null))) : null)));
}
Object.assign(__ds_scope, { CompanyRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/company/CompanyRow.jsx", error: String((e && e.message) || e) }); }

// components/contact/ContactBlock.jsx
try { (() => {
/** E-post med kopier-knapp og selskapsopplysninger. */
function ContactBlock({
  epost,
  selskap,
  orgnr,
  adresse,
  children
}) {
  const [tekst, setTekst] = React.useState('Kopier');
  const [status, setStatus] = React.useState('');
  const kopier = async () => {
    try {
      await navigator.clipboard.writeText(epost);
      setTekst('Kopiert');
      setStatus('E-postadressen er kopiert');
      setTimeout(() => {
        setTekst('Kopier');
        setStatus('');
      }, 1800);
    } catch {
      setTekst('Marker og kopier');
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "sn-kontakt"
  }, /*#__PURE__*/React.createElement("div", null, children, /*#__PURE__*/React.createElement("div", {
    className: "sn-kontakt__epost"
  }, /*#__PURE__*/React.createElement("a", {
    href: 'mailto:' + epost,
    className: "sn-kontakt__adresse"
  }, epost), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "pill",
    onClick: kopier
  }, /*#__PURE__*/React.createElement("span", null, tekst)), /*#__PURE__*/React.createElement("span", {
    className: "visually-hidden",
    role: "status"
  }, status))), /*#__PURE__*/React.createElement("dl", null, /*#__PURE__*/React.createElement("dt", null, "Selskap"), /*#__PURE__*/React.createElement("dd", null, selskap), /*#__PURE__*/React.createElement("dt", null, "Org.nr."), /*#__PURE__*/React.createElement("dd", null, orgnr), /*#__PURE__*/React.createElement("dt", null, "Adresse"), /*#__PURE__*/React.createElement("dd", null, adresse), /*#__PURE__*/React.createElement("dt", null, "E-post"), /*#__PURE__*/React.createElement("dd", null, /*#__PURE__*/React.createElement("a", {
    href: 'mailto:' + epost
  }, epost))));
}
Object.assign(__ds_scope, { ContactBlock });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/contact/ContactBlock.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Pilleknapp (.pill / .pill.solid i base.css). Minst 44 px høy. */
function Button({
  variant = 'outline',
  href,
  pil,
  children,
  onClick,
  disabled = false,
  type = 'button',
  className = '',
  ...rest
}) {
  const cls = ['pill', variant === 'solid' ? 'solid' : '', className].filter(Boolean).join(' ');
  const ekstern = href && /^https?:/.test(href);
  const tegn = pil === 'hoyre' ? ' →' : pil === 'ekstern' || pil == null && ekstern ? ' ↗' : null;
  const inner = /*#__PURE__*/React.createElement(React.Fragment, null, children, tegn ? /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, tegn) : null);
  if (href && !disabled) return /*#__PURE__*/React.createElement("a", _extends({
    className: cls,
    href: href,
    onClick: onClick,
    rel: ekstern ? 'noopener' : undefined
  }, rest), inner);
  return /*#__PURE__*/React.createElement("button", _extends({
    className: cls,
    type: type,
    disabled: disabled,
    onClick: onClick
  }, rest), inner);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/footer/SiteFooter.jsx
try { (() => {
/** Bunntekst: org.nr., adresse, e-post, personvern og «En del av SN Group». */
function SiteFooter({
  selskap,
  orgnr,
  adresse,
  epost,
  personvern = '/personvern',
  personvernTekst = 'Personvern',
  visDelAv = true,
  onPersonvern
}) {
  const ar = new Date().getFullYear();
  const skille = /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, " \xB7 ");
  return /*#__PURE__*/React.createElement("footer", {
    className: "sn-footer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sn-footer__rad"
  }, /*#__PURE__*/React.createElement("p", null, "\xA9 ", ar, " ", selskap, skille, "org.nr. ", orgnr, skille, adresse, skille, /*#__PURE__*/React.createElement("a", {
    href: 'mailto:' + epost
  }, epost)), /*#__PURE__*/React.createElement("p", {
    className: "sn-footer__lenker"
  }, /*#__PURE__*/React.createElement("a", {
    href: personvern,
    onClick: onPersonvern ? e => {
      e.preventDefault();
      onPersonvern();
    } : undefined
  }, personvernTekst), visDelAv ? /*#__PURE__*/React.createElement("a", {
    href: "https://sngroup.no"
  }, "En del av SN Group") : null))));
}
Object.assign(__ds_scope, { SiteFooter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/footer/SiteFooter.jsx", error: String((e && e.message) || e) }); }

// components/header/SiteHeader.jsx
try { (() => {
/** Logo eller ordmerke i Newsreader, og meny. */
function SiteHeader({
  ordmerke,
  undertekst,
  logo,
  logoMork,
  lenker = [],
  hjem = '/',
  onHjem
}) {
  return /*#__PURE__*/React.createElement("header", {
    className: "sn-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement("nav", {
    className: "sn-header__nav",
    "aria-label": "Hovedmeny"
  }, /*#__PURE__*/React.createElement("a", {
    href: hjem,
    className: "sn-header__ordmerke",
    "aria-label": logo ? ordmerke + ' – forside' : undefined,
    onClick: onHjem ? e => {
      e.preventDefault();
      onHjem();
    } : undefined
  }, logo ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("img", {
    className: "sn-header__logo sn-logo-light",
    src: logo,
    alt: ordmerke
  }), logoMork ? /*#__PURE__*/React.createElement("img", {
    className: "sn-header__logo sn-logo-dark",
    src: logoMork,
    alt: ""
  }) : null) : ordmerke, undertekst && !logo ? /*#__PURE__*/React.createElement("small", null, undertekst) : null), lenker.length > 0 ? /*#__PURE__*/React.createElement("ul", {
    className: "sn-header__lenker"
  }, lenker.map((l, i) => /*#__PURE__*/React.createElement("li", {
    key: i
  }, /*#__PURE__*/React.createElement("a", {
    href: l.href || '#',
    className: l.primar ? 'pill' : 'sn-header__sekundar',
    onClick: l.onClick ? e => {
      e.preventDefault();
      l.onClick();
    } : undefined
  }, l.label)))) : null)));
}
Object.assign(__ds_scope, { SiteHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/header/SiteHeader.jsx", error: String((e && e.message) || e) }); }

// components/layout/ComingSoon.jsx
try { (() => {
/** «Kommer snart»-side for nye nettsteder. */
function ComingSoon({
  navn,
  tekst,
  children
}) {
  return /*#__PURE__*/React.createElement("main", {
    id: "innhold",
    className: "sn-snart"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "label"
  }, "Kommer snart"), /*#__PURE__*/React.createElement("h1", null, navn), tekst ? /*#__PURE__*/React.createElement("p", {
    className: "lede"
  }, tekst) : null, children));
}
Object.assign(__ds_scope, { ComingSoon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/ComingSoon.jsx", error: String((e && e.message) || e) }); }

// components/layout/Section.jsx
try { (() => {
/** Seksjon med etikett, overskrift og valgfri ingress. */
function Section({
  id,
  label,
  tittel,
  ingress,
  flate = false,
  className = '',
  children
}) {
  const harHode = label || tittel || ingress;
  return /*#__PURE__*/React.createElement("section", {
    id: id,
    className: ['sn-seksjon', flate ? 'sn-seksjon--flate' : '', className].filter(Boolean).join(' ')
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, harHode ? /*#__PURE__*/React.createElement("div", {
    className: "sn-seksjon__hode"
  }, /*#__PURE__*/React.createElement("div", null, label ? /*#__PURE__*/React.createElement("div", {
    className: "label"
  }, label) : null, tittel ? /*#__PURE__*/React.createElement("h2", null, tittel) : null), ingress ? /*#__PURE__*/React.createElement("p", {
    className: "sn-seksjon__ingress"
  }, ingress) : null) : null, children));
}
Object.assign(__ds_scope, { Section });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/Section.jsx", error: String((e && e.message) || e) }); }

// components/privacy/PrivacyPage.jsx
try { (() => {
/** Mal for personvernsider. Tekst kan inneholde enkel HTML (fra egen innholdsfil, aldri fra brukere). */
function PrivacyPage({
  tittel,
  tittelAksent,
  oppdatert,
  behandlingsansvarlig,
  kontakt,
  avsnitt = []
}) {
  const html = (t, k, Tag = 'p') => /*#__PURE__*/React.createElement(Tag, {
    key: k,
    dangerouslySetInnerHTML: {
      __html: t
    }
  });
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "sn-pv__topp"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "label"
  }, "Personvern"), /*#__PURE__*/React.createElement("h1", null, tittel, tittelAksent ? /*#__PURE__*/React.createElement(React.Fragment, null, " ", /*#__PURE__*/React.createElement("em", null, tittelAksent)) : null), oppdatert ? /*#__PURE__*/React.createElement("p", {
    className: "sn-pv__oppdatert"
  }, oppdatert) : null, /*#__PURE__*/React.createElement("p", {
    className: "sn-pv__ansvar"
  }, /*#__PURE__*/React.createElement("span", null, "Behandlingsansvarlig: ", behandlingsansvarlig), /*#__PURE__*/React.createElement("span", null, "Kontakt: ", /*#__PURE__*/React.createElement("a", {
    href: 'mailto:' + kontakt
  }, kontakt))))), /*#__PURE__*/React.createElement("section", {
    className: "sn-pv__avsnitt"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, avsnitt.map((a, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "sn-pv__rad"
  }, /*#__PURE__*/React.createElement("h2", null, a.overskrift), /*#__PURE__*/React.createElement("div", {
    className: "sn-pv__tekst"
  }, (a.tekst || []).map((t, j) => html(t, 't' + j)), a.punkter ? /*#__PURE__*/React.createElement("ul", null, a.punkter.map((p, j) => html(p, j, 'li'))) : null, (a.etter || []).map((t, j) => html(t, 'e' + j))))))));
}
Object.assign(__ds_scope, { PrivacyPage });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/privacy/PrivacyPage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/sngroup/Plantegning.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Plantegning 1:50 der hvert rom er en virksomhet. Fra sites/sngroup/src/components/Plantegning.astro.
function Plantegning({
  valgt,
  onVelg
}) {
  const v = Object.fromEntries(window.SN_VIRKSOMHETER.map(x => [x.id, x]));
  const [koord, setKoord] = React.useState('x 0 · y 0 mm');
  const [lukket, setLukket] = React.useState(false);
  const svgRef = React.useRef(null);
  const etikett = x => x.rom.navn.charAt(0) + x.rom.navn.slice(1).toLowerCase() + ' ' + x.rom.merke + ': ' + x.navn;
  const velg = id => {
    onVelg(id);
    if (id === 'hengsel') {
      setLukket(true);
      setTimeout(() => setLukket(false), 60);
    }
  };
  const fmt = n => n.toLocaleString('nb-NO');
  const flytt = e => {
    const svg = svgRef.current;
    const ctm = svg && svg.getScreenCTM();
    if (!ctm) return;
    const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(ctm.inverse());
    const klem = (n, max) => Math.min(max, Math.max(0, Math.round(n / 10) * 10));
    setKoord('x ' + fmt(klem((p.x - 40) * 20, 10400)) + ' · y ' + fmt(klem((p.y - 40) * 20, 6800)) + ' mm');
  };
  const Sone = ({
    id,
    treff,
    tx,
    ty,
    children
  }) => /*#__PURE__*/React.createElement("g", {
    className: "sone",
    tabIndex: "0",
    role: "button",
    "aria-pressed": String(valgt === id),
    "aria-label": etikett(v[id]),
    onClick: () => velg(id),
    onKeyDown: e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        velg(id);
      }
    }
  }, /*#__PURE__*/React.createElement("rect", _extends({
    className: "treff"
  }, treff)), children, /*#__PURE__*/React.createElement("text", {
    "aria-hidden": "true",
    className: "rom",
    x: tx,
    y: ty
  }, v[id].rom.navn), /*#__PURE__*/React.createElement("text", {
    "aria-hidden": "true",
    className: "merke",
    x: tx,
    y: ty + 14
  }, v[id].rom.merke));
  const x = v[valgt];
  return /*#__PURE__*/React.createElement("figure", {
    className: 'plan' + (lukket ? ' lukket' : ''),
    "data-valgt": valgt
  }, /*#__PURE__*/React.createElement("div", {
    className: "plan-hode",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("span", null, "Plantegning \xB7 1:50"), /*#__PURE__*/React.createElement("span", null, koord)), /*#__PURE__*/React.createElement("svg", {
    ref: svgRef,
    viewBox: "0 0 600 440",
    role: "group",
    "aria-label": "Plantegning av et hus der hvert rom er en virksomhet",
    onPointerMove: flytt
  }, /*#__PURE__*/React.createElement("rect", {
    className: "tomt",
    x: "12",
    y: "12",
    width: "576",
    height: "416",
    rx: "2"
  }), /*#__PURE__*/React.createElement("path", {
    className: "mal",
    d: "M40 26 H560 M40 21 V31 M560 21 V31"
  }), /*#__PURE__*/React.createElement("text", {
    className: "malt",
    x: "300",
    y: "22",
    textAnchor: "middle"
  }, "10 400"), /*#__PURE__*/React.createElement("path", {
    className: "mal",
    d: "M574 40 V380 M569 40 H579 M569 380 H579"
  }), /*#__PURE__*/React.createElement("text", {
    className: "malt",
    x: "586",
    y: "214",
    textAnchor: "middle",
    transform: "rotate(90 586 210)"
  }, "6 800"), /*#__PURE__*/React.createElement(Sone, {
    id: "kjokken",
    treff: {
      x: 43,
      y: 43,
      width: 254,
      height: 174
    },
    tx: 130,
    ty: 190
  }, /*#__PURE__*/React.createElement("path", {
    className: "inv",
    d: "M46 46 H294 V70 H70 V214 H46 Z"
  }), /*#__PURE__*/React.createElement("rect", {
    className: "inv",
    x: "130",
    y: "118",
    width: "110",
    height: "46",
    rx: "2"
  }), /*#__PURE__*/React.createElement("circle", {
    className: "inv",
    cx: "190",
    cy: "58",
    r: "6"
  }), /*#__PURE__*/React.createElement("circle", {
    className: "inv",
    cx: "208",
    cy: "58",
    r: "6"
  }), /*#__PURE__*/React.createElement("circle", {
    className: "inv",
    cx: "190",
    cy: "58",
    r: "2"
  }), /*#__PURE__*/React.createElement("circle", {
    className: "inv",
    cx: "208",
    cy: "58",
    r: "2"
  }), /*#__PURE__*/React.createElement("rect", {
    className: "inv",
    x: "96",
    y: "50",
    width: "30",
    height: "16",
    rx: "6"
  })), /*#__PURE__*/React.createElement(Sone, {
    id: "eiendom",
    treff: {
      x: 303,
      y: 43,
      width: 254,
      height: 214
    },
    tx: 440,
    ty: 220
  }, /*#__PURE__*/React.createElement("path", {
    className: "inv",
    d: "M340 80 H470 V104 H364 V160 H340 Z"
  }), /*#__PURE__*/React.createElement("rect", {
    className: "inv",
    x: "392",
    y: "130",
    width: "64",
    height: "40",
    rx: "3"
  })), /*#__PURE__*/React.createElement(Sone, {
    id: "investeringer",
    treff: {
      x: 43,
      y: 223,
      width: 224,
      height: 154
    },
    tx: 184,
    ty: 318
  }, /*#__PURE__*/React.createElement("rect", {
    className: "inv",
    x: "60",
    y: "250",
    width: "110",
    height: "100",
    rx: "3"
  }), /*#__PURE__*/React.createElement("path", {
    className: "inv",
    d: "M60 272 H170 M70 254 H108 V268 H70 Z M122 254 H160 V268 H122 Z"
  })), /*#__PURE__*/React.createElement(Sone, {
    id: "byggem",
    treff: {
      x: 273,
      y: 263,
      width: 144,
      height: 114
    },
    tx: 286,
    ty: 300
  }, /*#__PURE__*/React.createElement("rect", {
    className: "inv",
    x: "380",
    y: "270",
    width: "32",
    height: "100",
    rx: "1"
  }), /*#__PURE__*/React.createElement("path", {
    className: "inv",
    d: "M380 295 H412 M380 320 H412 M380 345 H412"
  }), /*#__PURE__*/React.createElement("rect", {
    className: "inv",
    x: "284",
    y: "350",
    width: "60",
    height: "20",
    rx: "1"
  })), /*#__PURE__*/React.createElement(Sone, {
    id: "hengsel",
    treff: {
      x: 423,
      y: 263,
      width: 134,
      height: 114
    },
    tx: 440,
    ty: 296
  }, /*#__PURE__*/React.createElement("rect", {
    className: "inv",
    x: "520",
    y: "280",
    width: "22",
    height: "34",
    rx: "4"
  }), /*#__PURE__*/React.createElement("path", {
    className: "inv",
    d: "M526 284 H536"
  })), /*#__PURE__*/React.createElement("path", {
    className: "vegg",
    d: "M40 40 H560 V380 H500 M460 380 H40 Z"
  }), /*#__PURE__*/React.createElement("path", {
    className: "innervegg",
    d: "M300 40 V120 M300 170 V260 H420 M40 220 H180 M230 220 H420 V300 M420 345 V380 M270 260 V380"
  }), /*#__PURE__*/React.createElement("path", {
    className: "slag",
    d: "M460 340 A40 40 0 0 1 500 380"
  }), /*#__PURE__*/React.createElement("line", {
    className: "dor innervegg",
    x1: "460",
    y1: "380",
    x2: "460",
    y2: "340"
  }), /*#__PURE__*/React.createElement("circle", {
    className: "hengselpunkt",
    cx: "460",
    cy: "380",
    r: "3.5"
  })), /*#__PURE__*/React.createElement("div", {
    className: "info"
  }, /*#__PURE__*/React.createElement("div", {
    className: "info-kort"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "info-tittel"
  }, x.navn), /*#__PURE__*/React.createElement("p", null, x.kort), /*#__PURE__*/React.createElement("a", {
    href: x.planLenke.href
  }, x.planLenke.label))));
}
window.Plantegning = Plantegning;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/sngroup/Plantegning.jsx", error: String((e && e.message) || e) }); }

// ui_kits/sngroup/SngroupHome.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Forsiden. Fra sites/sngroup/src/pages/index.astro.
function SngroupHome() {
  const {
    Section,
    CompanyRow,
    ContactBlock
  } = window.SNGroupDesignSystem_4e3bfa;
  const V = window.SN_VIRKSOMHETER,
    S = window.SN_SELSKAP;
  const [valgt, setValgt] = React.useState(V[0].id);
  const [apne, setApne] = React.useState([V[0].id]);
  const [enhet, setEnhet] = React.useState('telefon');
  const velg = id => {
    setValgt(id);
    setApne([id]);
  };
  return /*#__PURE__*/React.createElement("main", {
    id: "innhold"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "helt"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "label"
  }, "Trondheim \xB7 Hamar \xB7 Lillehammer \xB7 Gj\xF8vik"), /*#__PURE__*/React.createElement("h1", null, "Vi bygger og eier selskaper som lager ", /*#__PURE__*/React.createElement("em", null, "hjem"), " bedre."), /*#__PURE__*/React.createElement("p", {
    className: "lede"
  }, "SN Group samler selskapene til Eirik Sj\xF8flot: kj\xF8kkenbutikker, eiendom og egne digitale verkt\xF8y for salg og montering. Trykk p\xE5 et rom i tegningen."), /*#__PURE__*/React.createElement("div", {
    className: "cta"
  }, /*#__PURE__*/React.createElement("a", {
    className: "pill solid",
    href: "#kontakt"
  }, "Ta kontakt ", /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, "\u2192")), /*#__PURE__*/React.createElement("a", {
    className: "pill",
    href: "#virksomheter"
  }, "Se virksomhetene")), /*#__PURE__*/React.createElement("div", {
    className: "chips",
    "aria-label": "Velg virksomhet i tegningen"
  }, V.map(v => /*#__PURE__*/React.createElement("button", {
    key: v.id,
    type: "button",
    className: "chip",
    "aria-pressed": String(valgt === v.id),
    onClick: () => velg(v.id)
  }, /*#__PURE__*/React.createElement("i", {
    "aria-hidden": "true"
  }), v.navn)))), /*#__PURE__*/React.createElement(Plantegning, {
    valgt: valgt,
    onVelg: velg
  }))), /*#__PURE__*/React.createElement(Section, {
    id: "virksomheter",
    label: "Virksomheter",
    flate: true,
    tittel: /*#__PURE__*/React.createElement(React.Fragment, null, "Hvert rom er en ", /*#__PURE__*/React.createElement("em", null, "virksomhet"), "."),
    ingress: "ES-HOLDING AS driver med kj\xF8p, salg og utleie av fast eiendom og eierskap i andre selskaper. Selskapene i gruppen driver blant annet Studio Sigdal Innlandet."
  }, /*#__PURE__*/React.createElement("div", {
    className: "rader"
  }, V.map(v => /*#__PURE__*/React.createElement(CompanyRow, _extends({
    key: v.id
  }, v, {
    apen: apne.includes(v.id),
    onToggle: o => {
      if (o) {
        setValgt(v.id);
        setApne([...apne, v.id]);
      } else setApne(apne.filter(a => a !== v.id));
    }
  }))))), /*#__PURE__*/React.createElement("section", {
    id: "hengsel",
    className: "hengsel"
  }, /*#__PURE__*/React.createElement("div", {
    className: 'wrap hg' + (enhet === 'ipad' ? ' ipad' : '')
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "label"
  }, "App for mont\xF8rer"), /*#__PURE__*/React.createElement("h2", null, "Hengsel"), /*#__PURE__*/React.createElement("p", {
    className: "lede"
  }, "Mont\xF8rappen for mont\xF8rer og montasjefirmaer som jobber for Studio Sigdal Innlandet. Pr\xF8v den til h\xF8yre."), /*#__PURE__*/React.createElement("ul", {
    className: "egenskaper"
  }, /*#__PURE__*/React.createElement("li", null, "Dagens jobber, tegninger og varer"), /*#__PURE__*/React.createElement("li", null, "Kontrollm\xE5l, kvalitetssjekk, bilder og avvik"), /*#__PURE__*/React.createElement("li", null, "Ferdigmelding p\xE5 telefon og iPad"), /*#__PURE__*/React.createElement("li", null, "Virker uten dekning, og sender n\xE5r nettet er tilbake"), /*#__PURE__*/React.createElement("li", null, "Kun for inviterte brukere")), /*#__PURE__*/React.createElement("a", {
    href: "#personvern",
    className: "pill",
    onClick: e => {
      e.preventDefault();
      window.snGo && window.snGo('personvern');
    }
  }, "Personvern for Hengsel ", /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, "\u2192"))), /*#__PURE__*/React.createElement(Telefon, {
    onEnhet: setEnhet
  }))), /*#__PURE__*/React.createElement(Section, {
    id: "kontakt",
    flate: true
  }, /*#__PURE__*/React.createElement(ContactBlock, {
    epost: S.epost,
    selskap: S.navn,
    orgnr: S.orgnr,
    adresse: S.adresse
  }, /*#__PURE__*/React.createElement("div", {
    className: "label"
  }, "Kontakt"), /*#__PURE__*/React.createElement("h2", {
    className: "kontakt-tittel"
  }, "Ta ", /*#__PURE__*/React.createElement("em", null, "kontakt"), "."))));
}
window.SngroupHome = SngroupHome;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/sngroup/SngroupHome.jsx", error: String((e && e.message) || e) }); }

// ui_kits/sngroup/Telefon.jsx
try { (() => {
// «Prøv Hengsel»: telefon med tre faner og «Uten dekning». Fra sites/sngroup/src/components/Telefon.astro.
// iPad-visningen er lagt til her (ikke i repoet): samme data og tilstand, i to kolonner.
const TLF_JOBB = ['Tegning og ordrebekreftelse', '3 leverandører levert', 'Kontrollmål vegg og vindu', 'Ferdigmelding'];
const TLF_KS = ['Skap i lodd og vater', 'Festet i bærende vegg', 'Fronter justert, like fuger', 'Ryddet og rengjort'];
function Telefon({
  onEnhet
}) {
  const [enhet, setEnhetRaw] = React.useState('telefon');
  const setEnhet = e => {
    setEnhetRaw(e);
    onEnhet && onEnhet(e);
  };
  const [fane, setFane] = React.useState('dag');
  const [jobb, setJobb] = React.useState([false, true, false, false]);
  const [ks, setKs] = React.useState([null, null, null, null]);
  const [uten, setUten] = React.useState(false);
  const [venter, setVenter] = React.useState(0);
  const [ko, setKo] = React.useState(null);
  const venteTekst = n => 'Uten dekning · ' + n + ' ' + (n === 1 ? 'endring venter' : 'endringer venter') + ' og sendes når du har nett';
  const endret = () => {
    if (!uten) return;
    const n = venter + 1;
    setVenter(n);
    setKo(venteTekst(n));
  };
  const bryt = () => {
    const ny = !uten;
    setUten(ny);
    if (ny) setKo(venteTekst(venter));else if (venter > 0) {
      setVenter(0);
      setKo('Sendt ✓');
      setTimeout(() => setKo(k => k === 'Sendt ✓' ? null : k), 2500);
    } else setKo(null);
  };
  const pst = n => n / 4 * 100 + '%';
  const Dag = () => /*#__PURE__*/React.createElement("div", {
    className: "panel",
    role: "tabpanel"
  }, /*#__PURE__*/React.createElement("p", {
    className: "skjermtittel"
  }, "I dag"), /*#__PURE__*/React.createElement("div", {
    className: "tkort hi"
  }, /*#__PURE__*/React.createElement("small", null, "Neste jobb \xB7 07:30"), /*#__PURE__*/React.createElement("b", null, "Kj\xF8kken, Hamar"), "Tegning \xB7 3 leverand\xF8rer \xB7 KS"), /*#__PURE__*/React.createElement("div", {
    className: "tkort"
  }, /*#__PURE__*/React.createElement("small", null, "I morgen"), /*#__PURE__*/React.createElement("b", null, "Bad, Lillehammer")), /*#__PURE__*/React.createElement("div", {
    className: "tkort"
  }, /*#__PURE__*/React.createElement("small", null, "Torsdag"), /*#__PURE__*/React.createElement("b", null, "Garderobe, Gj\xF8vik")));
  const Jobb = () => /*#__PURE__*/React.createElement("div", {
    className: "panel",
    role: "tabpanel"
  }, /*#__PURE__*/React.createElement("p", {
    className: "skjermtittel"
  }, "Kj\xF8kken, Hamar"), /*#__PURE__*/React.createElement("div", {
    className: "bar"
  }, /*#__PURE__*/React.createElement("i", {
    style: {
      width: pst(jobb.filter(Boolean).length)
    }
  })), TLF_JOBB.map((t, i) => /*#__PURE__*/React.createElement("button", {
    key: t,
    type: "button",
    className: "sjekk",
    role: "checkbox",
    "aria-checked": String(jobb[i]),
    onClick: () => {
      setJobb(jobb.map((b, j) => j === i ? !b : b));
      endret();
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "boks",
    "aria-hidden": "true"
  }), t)));
  const Ks = () => /*#__PURE__*/React.createElement("div", {
    className: "panel",
    role: "tabpanel"
  }, /*#__PURE__*/React.createElement("p", {
    className: "skjermtittel"
  }, "KS Kj\xF8kken"), /*#__PURE__*/React.createElement("div", {
    className: "bar"
  }, /*#__PURE__*/React.createElement("i", {
    style: {
      width: pst(ks.filter(k => k).length)
    }
  })), TLF_KS.map((t, i) => /*#__PURE__*/React.createElement("div", {
    key: t,
    className: "ks",
    role: "group",
    "aria-label": t
  }, /*#__PURE__*/React.createElement("span", null, t), /*#__PURE__*/React.createElement("span", {
    className: "seg"
  }, [['ok', 'OK'], ['av', 'Avvik']].map(([k, l]) => /*#__PURE__*/React.createElement("button", {
    key: k,
    type: "button",
    className: k,
    "aria-pressed": String(ks[i] === k),
    onClick: () => {
      setKs(ks.map((x, j) => j === i ? k : x));
      endret();
    }
  }, l))))));
  const Faner = ({
    liste
  }) => /*#__PURE__*/React.createElement("div", {
    className: "faner",
    role: "tablist",
    "aria-label": "Faner i appen"
  }, liste.map(([id, l]) => /*#__PURE__*/React.createElement("button", {
    key: id,
    type: "button",
    role: "tab",
    "aria-selected": String(fane === id),
    onClick: () => setFane(id)
  }, l)));
  const Ko = () => ko ? /*#__PURE__*/React.createElement("div", {
    className: "ko",
    "aria-live": "polite"
  }, ko) : null;
  const iPadFane = fane === 'ks' ? 'ks' : 'jobb';
  return /*#__PURE__*/React.createElement("div", {
    className: "scene"
  }, enhet === 'telefon' ? /*#__PURE__*/React.createElement("div", {
    className: "telefon",
    role: "region",
    "aria-label": "Eksempel p\xE5 mont\xF8rappen Hengsel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "skjerm"
  }, fane === 'dag' ? /*#__PURE__*/React.createElement(Dag, null) : null, fane === 'jobb' ? /*#__PURE__*/React.createElement(Jobb, null) : null, fane === 'ks' ? /*#__PURE__*/React.createElement(Ks, null) : null, /*#__PURE__*/React.createElement(Ko, null), /*#__PURE__*/React.createElement(Faner, {
    liste: [['dag', 'I dag'], ['jobb', 'Jobb'], ['ks', 'KS']]
  }))) : /*#__PURE__*/React.createElement("div", {
    className: "nettbrett",
    role: "region",
    "aria-label": "Eksempel p\xE5 mont\xF8rappen Hengsel p\xE5 iPad"
  }, /*#__PURE__*/React.createElement("div", {
    className: "skjerm nb-skjerm"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nb-side"
  }, /*#__PURE__*/React.createElement(Dag, null)), /*#__PURE__*/React.createElement("div", {
    className: "nb-hoved"
  }, iPadFane === 'jobb' ? /*#__PURE__*/React.createElement(Jobb, null) : /*#__PURE__*/React.createElement(Ks, null), /*#__PURE__*/React.createElement(Ko, null), /*#__PURE__*/React.createElement(Faner, {
    liste: [['jobb', 'Jobb'], ['ks', 'KS']]
  })))), /*#__PURE__*/React.createElement("div", {
    className: "enhetvalg"
  }, /*#__PURE__*/React.createElement("span", {
    className: "seg-lys",
    role: "group",
    "aria-label": "Enhet"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-pressed": String(enhet === 'telefon'),
    onClick: () => setEnhet('telefon')
  }, "Telefon"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-pressed": String(enhet === 'ipad'),
    onClick: () => setEnhet('ipad')
  }, "iPad")), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "bryter",
    role: "switch",
    "aria-checked": String(uten),
    onClick: bryt
  }, /*#__PURE__*/React.createElement("span", {
    className: "sw",
    "aria-hidden": "true"
  }), "Uten dekning")));
}
window.Telefon = Telefon;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/sngroup/Telefon.jsx", error: String((e && e.message) || e) }); }

// ui_kits/sngroup/innhold.js
try { (() => {
// Innhold ordrett fra sites/sngroup/src/content/*.ts
window.SN_SELSKAP = {
  navn: "ES-HOLDING AS",
  merkenavn: "SN Group",
  orgnr: "927 363 585",
  adresse: "Enromvegen 173, 7026 Trondheim",
  epost: "drift@sngroup.no"
};
window.SN_VIRKSOMHETER = [{
  id: "kjokken",
  navn: "Kjøkken og interiør",
  tekst: "Studio Sigdal Innlandet selger og monterer kjøkken, bad og garderobe fra Sigdal. Vi tegner sammen med kunden i butikk og følger jobben helt til siste skapdør er justert.",
  kort: "Studio Sigdal Innlandet – kjøkken, bad og garderobe fra Sigdal, med butikker på Hamar, Lillehammer og Gjøvik.",
  stikkord: ["Hamar", "Lillehammer", "Gjøvik", "Kjøkken", "Bad", "Garderobe"],
  lenker: [],
  planLenke: {
    href: "#rad-kjokken",
    label: "Les mer"
  },
  rom: {
    navn: "KJØKKEN",
    merke: "17,7 m²"
  }
}, {
  id: "hengsel",
  navn: "Hengsel",
  undertittel: "CRM by Hengsel og montørappen Hengsel",
  tekst: "Egne systemer for kundeoppfølging, bestilling og montering – og montørappen Hengsel. Bygd for måten en kjøkkenbutikk faktisk jobber på.",
  kort: "Egne systemer for salg, bestilling og montering. Døra i entréen henger på et hengsel – og det gjør montørappen også.",
  stikkord: ["Kundeoppfølging", "Bestilling", "Montering", "Hengsel"],
  lenker: [{
    href: "https://hengsel.no",
    label: "hengsel.no"
  }, {
    href: "mailto:drift@sngroup.no?subject=Be%20om%20demo%20%E2%80%93%20CRM%20by%20Hengsel",
    label: "Be om demo",
    primar: true
  }],
  planLenke: {
    href: "#hengsel",
    label: "Se Hengsel"
  },
  rom: {
    navn: "ENTRÉ",
    merke: "Hengsel"
  }
}, {
  id: "byggem",
  navn: "ByggEM AS",
  tekst: "ByggEM AS gjør snekkerarbeid og monterer kjøkken og innredning, dører og vinduer. Selskapet er heleid av SN Group.",
  kort: "Snekkerarbeid og montering av kjøkken, innredning, dører og vinduer.",
  stikkord: [],
  lenker: [{
    href: "https://byggem.no",
    label: "byggem.no"
  }],
  planLenke: {
    href: "#rad-byggem",
    label: "Les mer"
  },
  rom: {
    navn: "VERKSTED",
    merke: "7,2 m²"
  }
}, {
  id: "eiendom",
  navn: "Eiendom",
  tekst: "Kjøp, utvikling og utleie av fast eiendom.",
  kort: "Kjøp, utvikling og utleie av fast eiendom. Tomta og huset er rammen rundt alt det andre.",
  stikkord: ["Kjøp", "Utvikling", "Utleie"],
  lenker: [],
  planLenke: {
    href: "#rad-eiendom",
    label: "Les mer"
  },
  rom: {
    navn: "STUE",
    merke: "26,5 m²"
  }
}, {
  id: "investeringer",
  navn: "Investeringer",
  tekst: "Vi utvikler og leier ut boliger, blant annet fire boliger i rekke i Trymsvei 8 gjennom Vass Boligutvikling AS. I tillegg er vi en av flere eiere i regnskapsselskapet Iconomy (icgroup.no).",
  tekstHtml: 'Vi utvikler og leier ut boliger, blant annet fire boliger i rekke i Trymsvei 8 gjennom Vass Boligutvikling AS. I tillegg er vi en av flere eiere i regnskapsselskapet Iconomy (<a href="https://icgroup.no" target="_blank" rel="noopener">icgroup.no<span class="visually-hidden"> (åpnes i ny fane)</span></a>).',
  kort: "Eiendom og eierskap i andre selskaper.",
  stikkord: [],
  lenker: [],
  planLenke: {
    href: "#rad-investeringer",
    label: "Les mer"
  },
  rom: {
    navn: "SOVEROM",
    merke: "14,7 m²"
  }
}];
const epost = '<a href="mailto:drift@sngroup.no">drift@sngroup.no</a>';
window.SN_PERSONVERN = {
  tittel: "Personvern i",
  tittelAksent: "Hengsel",
  oppdatert: "Sist oppdatert 30. september 2026",
  behandlingsansvarlig: "ES-HOLDING AS",
  kontakt: "drift@sngroup.no",
  avsnitt: [{
    overskrift: "Hvem er ansvarlig",
    tekst: ["ES-HOLDING AS (org.nr. 927 363 585) utgir Hengsel. Spørsmål om personvern sendes til " + epost + "."]
  }, {
    overskrift: "Hvilke opplysninger vi behandler",
    punkter: ["Brukeropplysninger: navn, e-post, telefon, firma, språkvalg og rolle.", "Jobbopplysninger: kundens navn og monteringsadresse, tegninger, varelister og plan for jobbene du er tildelt.", "Det du registrerer: kontrollmål, kvalitetssjekk, bilder, avvik, merknader, timer og ferdigmelding.", "Teknisk: varslingstoken og plattform (iOS/Android) for push-varsler."],
    etter: ["Appen samler ikke inn posisjon i bakgrunnen og brukes ikke til reklame eller sporing."]
  }, {
    overskrift: "Hvorfor",
    tekst: ["For å planlegge og gjennomføre monteringsjobber, dokumentere kvaliteten og følge opp avvik overfor kunden."]
  }, {
    overskrift: "Hvor opplysningene lagres",
    punkter: ["Database og filer: Supabase, datasenter i EU (Stockholm).", "Push-varsler: Expo, Google Firebase Cloud Messaging og Apple Push Notification service.", "Oversettelse av fritekst mellom språk, når funksjonen er slått på: Anthropic."]
  }, {
    overskrift: "Hvor lenge",
    tekst: ["Jobbdokumentasjon lagres så lenge det trengs for reklamasjon og garanti på leveransen. Brukerkontoen slettes når tilgangen avsluttes."]
  }, {
    overskrift: "Dine rettigheter",
    tekst: ["Du kan be om innsyn, retting og sletting, og du kan klage til Datatilsynet. Kontakt oss på " + epost + "."]
  }, {
    overskrift: "In English",
    tekst: ["ES-HOLDING AS publishes Hengsel. The app processes user details, assigned job details, the photos, measurements and reports you enter, and a push token. Data is stored with Supabase in the EU and used only to carry out and document installation jobs – never for advertising or tracking. Contact " + epost + " to access or delete your data."]
  }]
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/sngroup/innhold.js", error: String((e && e.message) || e) }); }

__ds_ns.Card = __ds_scope.Card;

__ds_ns.CompanyRow = __ds_scope.CompanyRow;

__ds_ns.ContactBlock = __ds_scope.ContactBlock;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.SiteFooter = __ds_scope.SiteFooter;

__ds_ns.SiteHeader = __ds_scope.SiteHeader;

__ds_ns.ComingSoon = __ds_scope.ComingSoon;

__ds_ns.Section = __ds_scope.Section;

__ds_ns.PrivacyPage = __ds_scope.PrivacyPage;

})();

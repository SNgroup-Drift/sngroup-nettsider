/* @ds-bundle: {"format":4,"namespace":"ByggEMDesignSystem_146382","components":[{"name":"Button","sourcePath":"components/actions/Button.jsx"},{"name":"Tag","sourcePath":"components/actions/Tag.jsx"},{"name":"CONTACT","sourcePath":"components/content/ContactBlock.jsx"},{"name":"ContactBlock","sourcePath":"components/content/ContactBlock.jsx"},{"name":"ReferenceList","sourcePath":"components/content/ReferenceList.jsx"},{"name":"ServiceCard","sourcePath":"components/content/ServiceCard.jsx"},{"name":"Stat","sourcePath":"components/content/Stat.jsx"},{"name":"Field","sourcePath":"components/forms/Field.jsx"},{"name":"Footer","sourcePath":"components/layout/Footer.jsx"},{"name":"Header","sourcePath":"components/layout/Header.jsx"}],"sourceHashes":{"components/actions/Button.jsx":"014105bc8987","components/actions/Tag.jsx":"6b848179a300","components/content/ContactBlock.jsx":"42c82b5abb21","components/content/ReferenceList.jsx":"e366d025397a","components/content/ServiceCard.jsx":"b67bd88933a8","components/content/Stat.jsx":"d99c9888f9e2","components/forms/Field.jsx":"ddf7090894ea","components/layout/Footer.jsx":"a5ad2e868e13","components/layout/Header.jsx":"56a72ce9dff5","ui_kits/website/Contact.jsx":"c2944cc284bc","ui_kits/website/Home.jsx":"eb1fb28e905b","ui_kits/website/Projects.jsx":"ca51f73a15ef","ui_kits/website/Site.jsx":"4904a9ba4aa1"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.ByggEMDesignSystem_146382 = window.ByggEMDesignSystem_146382 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/actions/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function cx(...a) {
  return a.filter(Boolean).join(" ");
}
function Button({
  variant = "secondary",
  size = "md",
  href,
  className,
  children,
  ...rest
}) {
  const cls = cx("bem-btn", "bem-btn-" + variant, size === "sm" && "bem-btn-sm", className);
  if (href) return /*#__PURE__*/React.createElement("a", _extends({
    href: href,
    className: cls
  }, rest), children);
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    className: cls
  }, rest), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/Button.jsx", error: String((e && e.message) || e) }); }

// components/actions/Tag.jsx
try { (() => {
function Tag({
  tone = "light",
  className,
  children
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: ["bem-tag", tone === "dark" && "bem-tag-dark", className].filter(Boolean).join(" ")
  }, children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/Tag.jsx", error: String((e && e.message) || e) }); }

// components/content/ContactBlock.jsx
try { (() => {
const CONTACT = {
  phone: "976 06 500",
  phoneHref: "tel:+4797606500",
  email: "post@byggem.no",
  web: "byggem.no",
  area: "Trondheim og omegn",
  legal: "byggEM AS · Org.nr. 932 104 148"
};
function ContactBlock({
  inverse,
  hideArea,
  contact,
  className
}) {
  const c = {
    ...CONTACT,
    ...(contact || {})
  };
  return /*#__PURE__*/React.createElement("div", {
    className: ["bem-contact", inverse && "bem-contact-inverse", className].filter(Boolean).join(" ")
  }, /*#__PURE__*/React.createElement("div", {
    className: "bem-contact-row"
  }, /*#__PURE__*/React.createElement("a", {
    href: c.phoneHref
  }, c.phone), /*#__PURE__*/React.createElement("a", {
    href: "mailto:" + c.email
  }, c.email), /*#__PURE__*/React.createElement("a", {
    href: "https://" + c.web
  }, c.web)), hideArea ? null : /*#__PURE__*/React.createElement("span", {
    className: "bem-contact-area"
  }, "Vi jobber i ", c.area, "."));
}
Object.assign(__ds_scope, { CONTACT, ContactBlock });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/ContactBlock.jsx", error: String((e && e.message) || e) }); }

// components/content/ReferenceList.jsx
try { (() => {
function ReferenceList({
  projects = [],
  caption
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "bem-reflist-wrap"
  }, /*#__PURE__*/React.createElement("table", {
    className: "bem-reflist"
  }, caption ? /*#__PURE__*/React.createElement("caption", {
    style: {
      textAlign: "left",
      paddingBottom: "8px",
      fontWeight: 600
    }
  }, caption) : null, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Prosjekt"), /*#__PURE__*/React.createElement("th", null, "Merke"), /*#__PURE__*/React.createElement("th", {
    className: "num"
  }, "Enheter"), /*#__PURE__*/React.createElement("th", null, "Sted"), /*#__PURE__*/React.createElement("th", {
    className: "num"
  }, "\xC5r"))), /*#__PURE__*/React.createElement("tbody", null, projects.map((r, i) => /*#__PURE__*/React.createElement("tr", {
    key: i
  }, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("strong", null, r.name), r.stage ? " – " + r.stage : null), /*#__PURE__*/React.createElement("td", null, r.brand || "–"), /*#__PURE__*/React.createElement("td", {
    className: "num"
  }, r.units != null ? r.units : "–"), /*#__PURE__*/React.createElement("td", null, r.place || "–"), /*#__PURE__*/React.createElement("td", {
    className: "num"
  }, r.year || "–"))))));
}
Object.assign(__ds_scope, { ReferenceList });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/ReferenceList.jsx", error: String((e && e.message) || e) }); }

// components/content/ServiceCard.jsx
try { (() => {
function ServiceCard({
  title,
  eyebrow,
  items,
  action,
  className,
  children
}) {
  return /*#__PURE__*/React.createElement("article", {
    className: ["bem-card", className].filter(Boolean).join(" ")
  }, eyebrow ? /*#__PURE__*/React.createElement("span", {
    className: "bem-card-eyebrow"
  }, eyebrow) : null, /*#__PURE__*/React.createElement("h3", null, title), children ? /*#__PURE__*/React.createElement("p", null, children) : null, items && items.length ? /*#__PURE__*/React.createElement("ul", null, items.map((it, i) => /*#__PURE__*/React.createElement("li", {
    key: i
  }, it))) : null, action || null);
}
Object.assign(__ds_scope, { ServiceCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/ServiceCard.jsx", error: String((e && e.message) || e) }); }

// components/content/Stat.jsx
try { (() => {
function Stat({
  value,
  label,
  className
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: ["bem-stat", className].filter(Boolean).join(" ")
  }, /*#__PURE__*/React.createElement("span", {
    className: "bem-stat-value"
  }, value), /*#__PURE__*/React.createElement("span", {
    className: "bem-stat-label"
  }, label));
}
Object.assign(__ds_scope, { Stat });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/Stat.jsx", error: String((e && e.message) || e) }); }

// components/forms/Field.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
let seq = 0;
function Field({
  label,
  hint,
  error,
  multiline,
  options,
  className,
  id,
  name,
  required,
  ...rest
}) {
  const ref = React.useRef(null);
  if (!ref.current) ref.current = id || "bem-field-" + ++seq;
  const fid = ref.current;
  const described = error ? fid + "-err" : hint ? fid + "-hint" : undefined;
  const ctrl = {
    id: fid,
    name: name || fid,
    required,
    "aria-invalid": error ? "true" : undefined,
    "aria-describedby": described,
    ...rest
  };
  return /*#__PURE__*/React.createElement("div", {
    className: ["bem-field", error && "bem-field-invalid", className].filter(Boolean).join(" ")
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: fid
  }, label, required ? null : /*#__PURE__*/React.createElement("span", {
    className: "bem-field-hint"
  }, " (valgfritt)")), options ? /*#__PURE__*/React.createElement("select", ctrl, options.map(o => /*#__PURE__*/React.createElement("option", {
    key: o,
    value: o
  }, o))) : multiline ? /*#__PURE__*/React.createElement("textarea", ctrl) : /*#__PURE__*/React.createElement("input", _extends({
    type: "text"
  }, ctrl)), error ? /*#__PURE__*/React.createElement("span", {
    id: fid + "-err",
    className: "bem-field-error"
  }, error) : hint ? /*#__PURE__*/React.createElement("span", {
    id: fid + "-hint",
    className: "bem-field-hint"
  }, hint) : null);
}
Object.assign(__ds_scope, { Field });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Field.jsx", error: String((e && e.message) || e) }); }

// components/layout/Footer.jsx
try { (() => {
function Footer({
  logoSrc,
  className
}) {
  return /*#__PURE__*/React.createElement("footer", {
    className: ["bem-footer", className].filter(Boolean).join(" ")
  }, /*#__PURE__*/React.createElement("div", {
    className: "bem-footer-top"
  }, logoSrc ? /*#__PURE__*/React.createElement("img", {
    className: "bem-footer-logo",
    src: logoSrc,
    alt: "byggEM"
  }) : /*#__PURE__*/React.createElement("span", {
    className: "bem-header-logo-text",
    style: {
      color: "inherit"
    }
  }, "byggEM"), /*#__PURE__*/React.createElement(__ds_scope.ContactBlock, {
    inverse: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "bem-footer-legal"
  }, __ds_scope.CONTACT.legal));
}
Object.assign(__ds_scope, { Footer });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/Footer.jsx", error: String((e && e.message) || e) }); }

// components/layout/Header.jsx
try { (() => {
function Header({
  logoSrc,
  homeHref = "/",
  links = [],
  cta,
  onNavigate,
  className
}) {
  const nav = href => onNavigate ? e => {
    e.preventDefault();
    onNavigate(href);
  } : undefined;
  return /*#__PURE__*/React.createElement("header", {
    className: ["bem-header", className].filter(Boolean).join(" ")
  }, /*#__PURE__*/React.createElement("a", {
    href: homeHref,
    onClick: nav(homeHref),
    "aria-label": "byggEM \u2013 til forsiden",
    style: {
      textDecoration: "none"
    }
  }, logoSrc ? /*#__PURE__*/React.createElement("img", {
    className: "bem-header-logo",
    src: logoSrc,
    alt: "byggEM"
  }) : /*#__PURE__*/React.createElement("span", {
    className: "bem-header-logo-text"
  }, "byggEM")), /*#__PURE__*/React.createElement("nav", {
    "aria-label": "Hovedmeny"
  }, links.map((l, i) => /*#__PURE__*/React.createElement("a", {
    key: i,
    href: l.href,
    onClick: nav(l.href),
    "aria-current": l.current ? "page" : undefined
  }, l.label)), cta ? /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "primary",
    size: "sm",
    href: cta.href,
    onClick: nav(cta.href)
  }, cta.label) : null));
}
Object.assign(__ds_scope, { Header });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/Header.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Contact.jsx
try { (() => {
const {
  Button: CBtn,
  Field: CField
} = window.ByggEMDesignSystem_146382;
function ContactScreen() {
  const [sent, setSent] = React.useState(false);
  const [err, setErr] = React.useState({});
  const submit = e => {
    e.preventDefault();
    const f = new FormData(e.target);
    const n = {};
    if (!f.get("name")) n.name = "Skriv navnet ditt.";
    if (!f.get("phone")) n.phone = "Skriv et telefonnummer vi kan ringe.";
    if (!String(f.get("email") || "").includes("@")) n.email = "Skriv en gyldig e-postadresse.";
    if (!f.get("description")) n.description = "Skriv kort hva jobben gjelder.";
    setErr(n);
    if (!Object.keys(n).length) setSent(true);
  };
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement(PageIntro, {
    title: "Be om pris"
  }, "Fortell hva jobben gjelder. Vi svarer innen \xE9n arbeidsdag."), /*#__PURE__*/React.createElement("section", {
    className: "kit-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "site-container kit-contact-grid"
  }, /*#__PURE__*/React.createElement("div", null, sent ? /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "2px solid var(--success)",
      paddingTop: 24
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "t-mellomtittel",
    style: {
      color: "var(--success)",
      margin: 0
    }
  }, "Takk, vi har f\xE5tt henvendelsen."), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 12
    }
  }, "Vi svarer innen \xE9n arbeidsdag. Haster det, ring 976 06 500.")) : /*#__PURE__*/React.createElement("form", {
    noValidate: true,
    onSubmit: submit,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "kit-form-2"
  }, /*#__PURE__*/React.createElement(CField, {
    label: "Navn *",
    name: "name",
    required: true,
    error: err.name,
    autoComplete: "name"
  }), /*#__PURE__*/React.createElement(CField, {
    label: "Firma",
    name: "company",
    autoComplete: "organization"
  }), /*#__PURE__*/React.createElement(CField, {
    label: "Telefon *",
    name: "phone",
    type: "tel",
    required: true,
    error: err.phone,
    autoComplete: "tel"
  }), /*#__PURE__*/React.createElement(CField, {
    label: "E-post *",
    name: "email",
    type: "email",
    required: true,
    error: err.email,
    autoComplete: "email"
  })), /*#__PURE__*/React.createElement(CField, {
    label: "Hva gjelder det? *",
    name: "subject",
    required: true,
    options: ["Velg type oppdrag", "Montering av kjøkken", "Bad eller garderobe", "Innredning og kontor", "Leie av montører", "Mindre snekkeroppdrag", "Annet"]
  }), /*#__PURE__*/React.createElement(CField, {
    label: "Sted for jobben",
    name: "location"
  }), /*#__PURE__*/React.createElement(CField, {
    label: "Beskrivelse *",
    name: "description",
    required: true,
    multiline: true,
    rows: 7,
    error: err.description
  }), /*#__PURE__*/React.createElement("label", {
    className: "t-body-sm",
    style: {
      display: "flex",
      gap: 12,
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    style: {
      width: 20,
      height: 20,
      marginTop: 2,
      accentColor: "var(--accent)"
    }
  }), /*#__PURE__*/React.createElement("span", null, "Jeg godtar at byggEM lagrer opplysningene for \xE5 svare p\xE5 henvendelsen. Les ", /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => e.preventDefault()
  }, "personvernerkl\xE6ringen"), ".")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(CBtn, {
    variant: "primary",
    type: "submit"
  }, "Send henvendelse")))), /*#__PURE__*/React.createElement("aside", {
    className: "kit-contact-aside"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "t-h3-display",
    style: {
      margin: 0
    }
  }, "Kontakt"), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 20,
      marginBottom: 0
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "tel:+4797606500"
  }, "976 06 500"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("a", {
    href: "mailto:post@byggem.no"
  }, "post@byggem.no")), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 32,
      marginBottom: 0
    }
  }, "Vi jobber i Trondheim og omegn."), /*#__PURE__*/React.createElement("img", {
    src: "../../assets/illustrasjoner/01-befaring.png",
    alt: "",
    style: {
      display: "block",
      width: "100%",
      maxWidth: 280,
      height: "auto",
      marginTop: 40
    }
  })))));
}
function MissingScreen({
  title
}) {
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement(PageIntro, {
    title: title
  }), /*#__PURE__*/React.createElement("section", {
    className: "kit-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "site-container"
  }, /*#__PURE__*/React.createElement("p", {
    className: "t-body-sm",
    style: {
      color: "var(--ink-muted)",
      maxWidth: "65ch",
      margin: 0
    }
  }, "Denne siden er ikke med i kilden (docs/kilde/byggem.no). Den st\xE5r tom med vilje."))));
}
Object.assign(window, {
  ContactScreen,
  MissingScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Contact.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Home.jsx
try { (() => {
const {
  Button: HBtn,
  ServiceCard: HCard,
  Stat: HStat
} = window.ByggEMDesignSystem_146382;
const SERVICES = [{
  t: "Kjøkkenmontering",
  p: "Vi monterer kjøkken fra alle store leverandører. Oppdraget kan være én bolig eller et helt byggetrinn.",
  i: ["Skrog, fronter og innredning", "Foringer, sokler og dekksider", "Tilpasning på stedet"]
}, {
  t: "Bad og garderobe",
  p: "Vi monterer baderomsinnredning og garderobeløsninger etter tegning. Avvik avklares før de blir forsinkelser.",
  i: ["Baderomsmøbler", "Skyvedørsgarderober", "Fast innredning"]
}, {
  t: "Innredning og kontor",
  p: "Vi monterer fast og løs innredning for næringslokaler. Jobben planlegges rundt øvrige fag og drift.",
  i: ["Kontorinnredning", "Resepsjon og oppbevaring", "Tilpasning og ferdigstilling"]
}, {
  t: "Leie av montører",
  p: "Vi går inn som montører eller underentreprenør når kapasiteten må opp. Avtalen kan gjelde en periode eller en definert leveranse.",
  i: ["Eget verktøy", "Faste avtaler", "Hele byggetrinn"]
}, {
  t: "Mindre snekkeroppdrag",
  p: "Vi tar avgrensede jobber for privatpersoner og bedrifter. Dere får avtalt omfang og pris før oppstart.",
  i: ["Listing og gerikter", "Innerdører og garderober", "Små utbedringer"]
}];
const STEPS = [["Befaring eller tegning", "Vi ser på jobben eller får tegningene fra dere."], ["Skriftlig pris", "Fastpris eller timepris, avtalt før vi starter."], ["Montering", "Eget verktøy, ryddig arbeidsplass, beskjed med en gang noe avviker."], ["Overlevering", "Vi går gjennom jobben med dere og rydder etter oss."]];
const REFS = [["Basseløkka", "Buran", "Sigdal", 174], ["Saupstad Torg", "Saupstad", "Sigdal", 119], ["Leangen", "Leangen", "Sigdal", 116]];
function HomeScreen({
  go
}) {
  const l = h => e => {
    e.preventDefault();
    go(h);
  };
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement("section", {
    className: "kit-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "site-container"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "t-display",
    style: {
      maxWidth: "20ch",
      margin: 0
    }
  }, "Montasje og snekkerarbeid i Trondheim og omegn"), /*#__PURE__*/React.createElement("p", {
    className: "t-ingress",
    style: {
      marginTop: 32,
      marginBottom: 0,
      maxWidth: "65ch"
    }
  }, "Vi monterer kj\xF8kken, bad og innredning for forhandlere og entrepren\xF8rer \u2013 og tar mindre snekkeroppdrag for deg som trenger en h\xE5ndverker."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 40,
      display: "flex",
      flexWrap: "wrap",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(HBtn, {
    variant: "primary",
    href: "#",
    onClick: l("kontakt")
  }, "Be om pris"), /*#__PURE__*/React.createElement(HBtn, {
    href: "tel:+4797606500"
  }, "Ring 976 06 500")))), /*#__PURE__*/React.createElement("section", {
    className: "kit-section",
    style: {
      background: "var(--surface-raised)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "site-container kit-split"
  }, [["For forhandlere og entreprenører", "Vi monterer på vegne av butikken og tar hele byggetrinn i nyproduksjon. Dere kan også leie inn montører eller bruke oss som underentreprenør.", "Se montasjetjenester", "montasje", "09-nyproduksjon"], ["For deg som trenger en snekker", "Vi tar mindre, avgrensede snekkerjobber i Trondheimsområdet. Vi avtaler omfang og pris før vi starter.", "Se snekkeroppdrag", "snekker", "03-garderobe"]].map(([h, p, a, r, ill]) => /*#__PURE__*/React.createElement("article", {
    key: h,
    className: "kit-split-item"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/illustrasjoner/" + ill + ".png",
    alt: "",
    style: {
      display: "block",
      height: 180,
      width: "auto",
      maxWidth: "100%",
      marginBottom: 32
    }
  }), /*#__PURE__*/React.createElement("h2", {
    className: "t-h2",
    style: {
      margin: 0
    }
  }, h), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 24,
      marginBottom: 0,
      maxWidth: "65ch"
    }
  }, p), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement(HBtn, {
    variant: "link",
    href: "#",
    onClick: l(r)
  }, a)))))), /*#__PURE__*/React.createElement("section", {
    className: "kit-section",
    "aria-label": "N\xF8kkeltall"
  }, /*#__PURE__*/React.createElement("div", {
    className: "site-container kit-grid-3",
    style: {
      gap: 48
    }
  }, /*#__PURE__*/React.createElement(HStat, {
    value: "600+",
    label: "boenheter i dokumenterte referanseprosjekter"
  }), /*#__PURE__*/React.createElement(HStat, {
    value: "174",
    label: "leiligheter p\xE5 Bassel\xF8kka, levert 2025"
  }), /*#__PURE__*/React.createElement(HStat, {
    value: "2023",
    label: "etablert i Trondheim"
  }))), /*#__PURE__*/React.createElement("section", {
    className: "kit-section",
    style: {
      background: "var(--surface-quiet)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "site-container"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "t-h2",
    style: {
      margin: 0
    }
  }, "Tjenester"), /*#__PURE__*/React.createElement("div", {
    className: "kit-grid-3",
    style: {
      marginTop: 48,
      gap: 24
    }
  }, SERVICES.map(s => /*#__PURE__*/React.createElement(HCard, {
    key: s.t,
    title: s.t,
    items: s.i
  }, s.p))))), /*#__PURE__*/React.createElement("section", {
    className: "kit-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "site-container"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "t-h2",
    style: {
      margin: 0
    }
  }, "Slik jobber vi"), /*#__PURE__*/React.createElement("ol", {
    className: "kit-steps"
  }, STEPS.map(([h, p], i) => /*#__PURE__*/React.createElement("li", {
    key: h
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "300 32px/1 var(--font-display)",
      color: "var(--accent)"
    }
  }, i + 1), /*#__PURE__*/React.createElement("h3", {
    className: "t-h3-display",
    style: {
      marginTop: 16,
      marginBottom: 0
    }
  }, h), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 12,
      marginBottom: 0,
      maxWidth: "65ch"
    }
  }, p)))))), /*#__PURE__*/React.createElement("section", {
    className: "kit-section",
    style: {
      background: "var(--surface-raised)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "site-container"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "flex-end",
      justifyContent: "space-between",
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("h2", {
    className: "t-h2",
    style: {
      margin: 0
    }
  }, "Referanseprosjekter"), /*#__PURE__*/React.createElement(HBtn, {
    variant: "link",
    href: "#",
    onClick: l("prosjekter")
  }, "Se alle prosjekter")), /*#__PURE__*/React.createElement("div", {
    className: "kit-refrows"
  }, REFS.map(([n, s, b, u]) => /*#__PURE__*/React.createElement("div", {
    key: n,
    className: "kit-refrow"
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      fontWeight: 500
    }
  }, n), /*#__PURE__*/React.createElement("span", null, s), /*#__PURE__*/React.createElement("span", null, b), /*#__PURE__*/React.createElement("span", {
    style: {
      fontVariantNumeric: "tabular-nums"
    }
  }, u, " enheter")))))), /*#__PURE__*/React.createElement("section", {
    className: "kit-section",
    style: {
      background: "var(--surface-inverse)",
      color: "var(--ink-inverse)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "site-container kit-cta"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    className: "t-h2",
    style: {
      margin: 0
    }
  }, "Har dere en jobb til oss?"), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 16,
      marginBottom: 0
    }
  }, "976 06 500 \xB7 post@byggem.no \xB7 Trondheim og omegn")), /*#__PURE__*/React.createElement(HBtn, {
    variant: "primary",
    href: "#",
    onClick: l("kontakt")
  }, "Be om pris"))));
}
window.HomeScreen = HomeScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Home.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Projects.jsx
try { (() => {
const PROJECTS = [{
  name: "Basseløkka",
  stage: "–",
  brand: "Sigdal",
  units: 174,
  place: "Buran",
  year: "2023–2025"
}, {
  name: "Saupstad Torg",
  stage: "trinn 1",
  brand: "Sigdal",
  units: 119,
  place: "Saupstad",
  year: "2024–2025"
}, {
  name: "Leangen",
  stage: "Tunet",
  brand: "Sigdal",
  units: 116,
  place: "Leangen",
  year: "2023–2026"
}, {
  name: "Gildheim",
  stage: "trinn 1",
  brand: "HTH",
  units: 87,
  place: "Leangen",
  year: "2025–2026"
}, {
  name: "Lysangen",
  stage: "–",
  brand: "Sigdal",
  units: 54,
  place: "Leangen",
  year: "2024–2025"
}, {
  name: "Leangenbukta",
  stage: "Byvilla 3",
  brand: "Sigdal",
  units: 14,
  place: "Lade",
  year: "2022"
}];
const ILL = ["09-nyproduksjon", "04-kjokken-stort", "05-kjokken-middels", "06-kjokken-lite", "02-bad", "03-garderobe"];
function ProjectsScreen() {
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement(PageIntro, {
    title: "Referanseprosjekter"
  }, "Oversikten viser dokumenterte leveranser av kj\xF8kken og innredning i Trondheimsomr\xE5det."), /*#__PURE__*/React.createElement("section", {
    className: "kit-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "site-container"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: "auto",
      border: "1px solid var(--line)"
    },
    tabIndex: 0,
    "aria-label": "Referanseprosjekter, tabellen kan rulles sideveis"
  }, /*#__PURE__*/React.createElement("table", {
    className: "kit-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Prosjekt"), /*#__PURE__*/React.createElement("th", null, "Byggetrinn"), /*#__PURE__*/React.createElement("th", null, "Merke"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: "right"
    }
  }, "Enheter"), /*#__PURE__*/React.createElement("th", null, "Sted"), /*#__PURE__*/React.createElement("th", null, "\xC5r"))), /*#__PURE__*/React.createElement("tbody", null, PROJECTS.map((p, i) => /*#__PURE__*/React.createElement("tr", {
    key: p.name,
    style: {
      background: i % 2 ? "var(--surface-quiet)" : "var(--surface)"
    }
  }, /*#__PURE__*/React.createElement("th", {
    scope: "row",
    style: {
      fontWeight: 500
    }
  }, p.name), /*#__PURE__*/React.createElement("td", null, p.stage), /*#__PURE__*/React.createElement("td", null, p.brand), /*#__PURE__*/React.createElement("td", {
    style: {
      textAlign: "right",
      fontVariantNumeric: "tabular-nums"
    }
  }, p.units), /*#__PURE__*/React.createElement("td", null, p.place), /*#__PURE__*/React.createElement("td", {
    style: {
      fontVariantNumeric: "tabular-nums"
    }
  }, p.year)))))))), /*#__PURE__*/React.createElement("section", {
    className: "kit-section",
    style: {
      background: "var(--surface-raised)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "site-container kit-grid-3",
    style: {
      gap: 32
    }
  }, PROJECTS.map((p, i) => /*#__PURE__*/React.createElement("article", {
    key: p.name,
    style: {
      border: "1px solid var(--line)",
      background: "var(--surface)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: "3/2",
      background: "var(--surface-raised)",
      display: "grid",
      placeItems: "center",
      padding: 24,
      borderBottom: "1px solid var(--line)"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/illustrasjoner/" + ILL[i % ILL.length] + ".png",
    alt: "",
    style: {
      maxWidth: "100%",
      maxHeight: "100%",
      display: "block"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 24
    }
  }, /*#__PURE__*/React.createElement("h2", {
    className: "t-h3-display",
    style: {
      margin: 0
    }
  }, p.name), /*#__PURE__*/React.createElement("dl", {
    className: "kit-dl t-body-sm"
  }, [["Byggetrinn", p.stage], ["Merke", p.brand], ["Enheter", p.units], ["Sted", p.place], ["År", p.year]].map(([k, v]) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: k
  }, /*#__PURE__*/React.createElement("dt", null, k), /*#__PURE__*/React.createElement("dd", null, v))))))))));
}
window.ProjectsScreen = ProjectsScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Projects.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Site.jsx
try { (() => {
const {
  Button
} = window.ByggEMDesignSystem_146382;
const NAV = [{
  label: "Montasje",
  href: "montasje"
}, {
  label: "Snekker",
  href: "snekker"
}, {
  label: "Prosjekter",
  href: "prosjekter"
}, {
  label: "Kontakt",
  href: "kontakt"
}];
function SiteHeader({
  route,
  go
}) {
  const [open, setOpen] = React.useState(false);
  const link = h => e => {
    e.preventDefault();
    setOpen(false);
    go(h);
  };
  return /*#__PURE__*/React.createElement("header", {
    className: "kit-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "site-container kit-header-inner"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: link("forside"),
    "aria-label": "byggEM \u2013 forsiden"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo/byggem-logo-positiv.png",
    alt: "byggEM",
    style: {
      height: 32,
      width: "auto",
      display: "block"
    }
  })), /*#__PURE__*/React.createElement("nav", {
    "aria-label": "Hovedmeny",
    className: "kit-nav"
  }, NAV.map(n => /*#__PURE__*/React.createElement("a", {
    key: n.href,
    href: "#",
    onClick: link(n.href),
    className: route === n.href ? "is-current" : "",
    "aria-current": route === n.href ? "page" : undefined
  }, n.label)), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "sm",
    href: "#",
    onClick: link("kontakt")
  }, "Be om pris")), /*#__PURE__*/React.createElement("button", {
    className: "kit-menu-btn bem-btn bem-btn-secondary bem-btn-sm",
    "aria-label": "\xC5pne meny",
    "aria-expanded": open,
    onClick: () => setOpen(!open)
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": open ? "x" : "menu"
  }))), open ? /*#__PURE__*/React.createElement("div", {
    className: "kit-mobile-menu site-container"
  }, NAV.map(n => /*#__PURE__*/React.createElement("a", {
    key: n.href,
    href: "#",
    onClick: link(n.href)
  }, n.label)), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    href: "#",
    onClick: link("kontakt")
  }, "Be om pris")) : null);
}
function SiteFooter({
  go
}) {
  return /*#__PURE__*/React.createElement("footer", {
    className: "kit-footer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "site-container kit-footer-grid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo/byggem-logo-negativ.png",
    alt: "byggEM",
    style: {
      height: 32,
      width: "auto",
      display: "block"
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 32,
      marginBottom: 0
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "tel:+4797606500"
  }, "976 06 500"), " \xB7 ", /*#__PURE__*/React.createElement("a", {
    href: "mailto:post@byggem.no"
  }, "post@byggem.no"), " \xB7 byggem.no"), /*#__PURE__*/React.createElement("p", {
    className: "t-body-sm",
    style: {
      marginTop: 12,
      marginBottom: 0
    }
  }, "Vi jobber i Trondheim og omegn.")), /*#__PURE__*/React.createElement("div", {
    className: "kit-footer-right"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => e.preventDefault()
  }, "Personvern"), /*#__PURE__*/React.createElement("p", {
    className: "t-body-sm",
    style: {
      margin: 0
    }
  }, "byggEM AS \xB7 Org.nr. 932 104 148"))));
}
function PageIntro({
  title,
  children
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: "kit-section",
    style: {
      borderBottom: "1px solid var(--line)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "site-container"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "t-h1",
    style: {
      maxWidth: "20ch",
      margin: 0
    }
  }, title), children ? /*#__PURE__*/React.createElement("div", {
    className: "t-ingress",
    style: {
      marginTop: 32,
      maxWidth: "65ch"
    }
  }, children) : null));
}
Object.assign(window, {
  SiteHeader,
  SiteFooter,
  PageIntro,
  NAV
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Site.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.CONTACT = __ds_scope.CONTACT;

__ds_ns.ContactBlock = __ds_scope.ContactBlock;

__ds_ns.ReferenceList = __ds_scope.ReferenceList;

__ds_ns.ServiceCard = __ds_scope.ServiceCard;

__ds_ns.Stat = __ds_scope.Stat;

__ds_ns.Field = __ds_scope.Field;

__ds_ns.Footer = __ds_scope.Footer;

__ds_ns.Header = __ds_scope.Header;

})();

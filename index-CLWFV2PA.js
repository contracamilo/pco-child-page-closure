(function() {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload"))
    return;
  for (const s of document.querySelectorAll('link[rel="modulepreload"]'))
    i(s);
  new MutationObserver((s) => {
    for (const o of s)
      if (o.type === "childList")
        for (const r of o.addedNodes)
          r.tagName === "LINK" && r.rel === "modulepreload" && i(r);
  }).observe(document, { childList: !0, subtree: !0 });
  function e(s) {
    const o = {};
    return s.integrity && (o.integrity = s.integrity), s.referrerPolicy && (o.referrerPolicy = s.referrerPolicy), s.crossOrigin === "use-credentials" ? o.credentials = "include" : s.crossOrigin === "anonymous" ? o.credentials = "omit" : o.credentials = "same-origin", o;
  }
  function i(s) {
    if (s.ep)
      return;
    s.ep = !0;
    const o = e(s);
    fetch(s.href, o);
  }
})();
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const I = globalThis, F = I.ShadowRoot && (I.ShadyCSS === void 0 || I.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, K = Symbol(), G = /* @__PURE__ */ new WeakMap();
let ht = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== K) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (F && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = G.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && G.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const gt = (n) => new ht(typeof n == "string" ? n : n + "", void 0, K), lt = (n, ...t) => {
  const e = n.length === 1 ? n[0] : t.reduce((i, s, o) => i + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + n[o + 1], n[0]);
  return new ht(e, n, K);
}, ft = (n, t) => {
  if (F) n.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), s = I.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = e.cssText, n.appendChild(i);
  }
}, Q = F ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return gt(e);
})(n) : n;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: _t, defineProperty: mt, getOwnPropertyDescriptor: yt, getOwnPropertyNames: wt, getOwnPropertySymbols: bt, getPrototypeOf: At } = Object, _ = globalThis, X = _.trustedTypes, vt = X ? X.emptyScript : "", z = _.reactiveElementPolyfillSupport, x = (n, t) => n, D = { toAttribute(n, t) {
  switch (t) {
    case Boolean:
      n = n ? vt : null;
      break;
    case Object:
    case Array:
      n = n == null ? n : JSON.stringify(n);
  }
  return n;
}, fromAttribute(n, t) {
  let e = n;
  switch (t) {
    case Boolean:
      e = n !== null;
      break;
    case Number:
      e = n === null ? null : Number(n);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(n);
      } catch {
        e = null;
      }
  }
  return e;
} }, J = (n, t) => !_t(n, t), tt = { attribute: !0, type: String, converter: D, reflect: !1, hasChanged: J };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), _.litPropertyMetadata ?? (_.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
class A extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = tt) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = Symbol(), s = this.getPropertyDescriptor(t, i, e);
      s !== void 0 && mt(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: s, set: o } = yt(this.prototype, t) ?? { get() {
      return this[e];
    }, set(r) {
      this[e] = r;
    } };
    return { get() {
      return s == null ? void 0 : s.call(this);
    }, set(r) {
      const h = s == null ? void 0 : s.call(this);
      o.call(this, r), this.requestUpdate(t, h, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? tt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(x("elementProperties"))) return;
    const t = At(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(x("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(x("properties"))) {
      const e = this.properties, i = [...wt(e), ...bt(e)];
      for (const s of i) this.createProperty(s, e[s]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [i, s] of e) this.elementProperties.set(i, s);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, i] of this.elementProperties) {
      const s = this._$Eu(e, i);
      s !== void 0 && this._$Eh.set(s, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const s of i) e.unshift(Q(s));
    } else t !== void 0 && e.push(Q(t));
    return e;
  }
  static _$Eu(t, e) {
    const i = e.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var t;
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (t = this.constructor.l) == null || t.forEach((e) => e(this));
  }
  addController(t) {
    var e;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t), this.renderRoot !== void 0 && this.isConnected && ((e = t.hostConnected) == null || e.call(t));
  }
  removeController(t) {
    var e;
    (e = this._$EO) == null || e.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const i of e.keys()) this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return ft(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((e) => {
      var i;
      return (i = e.hostConnected) == null ? void 0 : i.call(e);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((e) => {
      var i;
      return (i = e.hostDisconnected) == null ? void 0 : i.call(e);
    });
  }
  attributeChangedCallback(t, e, i) {
    this._$AK(t, i);
  }
  _$EC(t, e) {
    var o;
    const i = this.constructor.elementProperties.get(t), s = this.constructor._$Eu(t, i);
    if (s !== void 0 && i.reflect === !0) {
      const r = (((o = i.converter) == null ? void 0 : o.toAttribute) !== void 0 ? i.converter : D).toAttribute(e, i.type);
      this._$Em = t, r == null ? this.removeAttribute(s) : this.setAttribute(s, r), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var o;
    const i = this.constructor, s = i._$Eh.get(t);
    if (s !== void 0 && this._$Em !== s) {
      const r = i.getPropertyOptions(s), h = typeof r.converter == "function" ? { fromAttribute: r.converter } : ((o = r.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? r.converter : D;
      this._$Em = s, this[s] = h.fromAttribute(e, r.type), this._$Em = null;
    }
  }
  requestUpdate(t, e, i) {
    if (t !== void 0) {
      if (i ?? (i = this.constructor.getPropertyOptions(t)), !(i.hasChanged ?? J)(this[t], e)) return;
      this.P(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$ET());
  }
  P(t, e, i) {
    this._$AL.has(t) || this._$AL.set(t, e), i.reflect === !0 && this._$Em !== t && (this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Set())).add(t);
  }
  async _$ET() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var i;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [o, r] of this._$Ep) this[o] = r;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [o, r] of s) r.wrapped !== !0 || this._$AL.has(o) || this[o] === void 0 || this.P(o, this[o], r);
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (i = this._$EO) == null || i.forEach((s) => {
        var o;
        return (o = s.hostUpdate) == null ? void 0 : o.call(s);
      }), this.update(e)) : this._$EU();
    } catch (s) {
      throw t = !1, this._$EU(), s;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$EO) == null || e.forEach((i) => {
      var s;
      return (s = i.hostUpdated) == null ? void 0 : s.call(i);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EU() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Ej && (this._$Ej = this._$Ej.forEach((e) => this._$EC(e, this[e]))), this._$EU();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
}
A.elementStyles = [], A.shadowRootOptions = { mode: "open" }, A[x("elementProperties")] = /* @__PURE__ */ new Map(), A[x("finalized")] = /* @__PURE__ */ new Map(), z == null || z({ ReactiveElement: A }), (_.reactiveElementVersions ?? (_.reactiveElementVersions = [])).push("2.0.4");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const C = globalThis, L = C.trustedTypes, et = L ? L.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, ct = "$lit$", f = `lit$${Math.random().toFixed(9).slice(2)}$`, dt = "?" + f, Et = `<${dt}>`, w = document, U = () => w.createComment(""), T = (n) => n === null || typeof n != "object" && typeof n != "function", Y = Array.isArray, St = (n) => Y(n) || typeof (n == null ? void 0 : n[Symbol.iterator]) == "function", B = `[ 	
\f\r]`, O = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, st = /-->/g, it = />/g, m = RegExp(`>|${B}(?:([^\\s"'>=/]+)(${B}*=${B}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), nt = /'/g, ot = /"/g, pt = /^(?:script|style|textarea|title)$/i, Pt = (n) => (t, ...e) => ({ _$litType$: n, strings: t, values: e }), v = Pt(1), S = Symbol.for("lit-noChange"), d = Symbol.for("lit-nothing"), rt = /* @__PURE__ */ new WeakMap(), y = w.createTreeWalker(w, 129);
function ut(n, t) {
  if (!Y(n) || !n.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return et !== void 0 ? et.createHTML(t) : t;
}
const Ot = (n, t) => {
  const e = n.length - 1, i = [];
  let s, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = O;
  for (let h = 0; h < e; h++) {
    const a = n[h];
    let c, p, l = -1, u = 0;
    for (; u < a.length && (r.lastIndex = u, p = r.exec(a), p !== null); ) u = r.lastIndex, r === O ? p[1] === "!--" ? r = st : p[1] !== void 0 ? r = it : p[2] !== void 0 ? (pt.test(p[2]) && (s = RegExp("</" + p[2], "g")), r = m) : p[3] !== void 0 && (r = m) : r === m ? p[0] === ">" ? (r = s ?? O, l = -1) : p[1] === void 0 ? l = -2 : (l = r.lastIndex - p[2].length, c = p[1], r = p[3] === void 0 ? m : p[3] === '"' ? ot : nt) : r === ot || r === nt ? r = m : r === st || r === it ? r = O : (r = m, s = void 0);
    const g = r === m && n[h + 1].startsWith("/>") ? " " : "";
    o += r === O ? a + Et : l >= 0 ? (i.push(c), a.slice(0, l) + ct + a.slice(l) + f + g) : a + f + (l === -2 ? h : g);
  }
  return [ut(n, o + (n[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class N {
  constructor({ strings: t, _$litType$: e }, i) {
    let s;
    this.parts = [];
    let o = 0, r = 0;
    const h = t.length - 1, a = this.parts, [c, p] = Ot(t, e);
    if (this.el = N.createElement(c, i), y.currentNode = this.el.content, e === 2 || e === 3) {
      const l = this.el.content.firstChild;
      l.replaceWith(...l.childNodes);
    }
    for (; (s = y.nextNode()) !== null && a.length < h; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const l of s.getAttributeNames()) if (l.endsWith(ct)) {
          const u = p[r++], g = s.getAttribute(l).split(f), H = /([.?@])?(.*)/.exec(u);
          a.push({ type: 1, index: o, name: H[2], strings: g, ctor: H[1] === "." ? Ct : H[1] === "?" ? Ut : H[1] === "@" ? Tt : k }), s.removeAttribute(l);
        } else l.startsWith(f) && (a.push({ type: 6, index: o }), s.removeAttribute(l));
        if (pt.test(s.tagName)) {
          const l = s.textContent.split(f), u = l.length - 1;
          if (u > 0) {
            s.textContent = L ? L.emptyScript : "";
            for (let g = 0; g < u; g++) s.append(l[g], U()), y.nextNode(), a.push({ type: 2, index: ++o });
            s.append(l[u], U());
          }
        }
      } else if (s.nodeType === 8) if (s.data === dt) a.push({ type: 2, index: o });
      else {
        let l = -1;
        for (; (l = s.data.indexOf(f, l + 1)) !== -1; ) a.push({ type: 7, index: o }), l += f.length - 1;
      }
      o++;
    }
  }
  static createElement(t, e) {
    const i = w.createElement("template");
    return i.innerHTML = t, i;
  }
}
function P(n, t, e = n, i) {
  var r, h;
  if (t === S) return t;
  let s = i !== void 0 ? (r = e._$Co) == null ? void 0 : r[i] : e._$Cl;
  const o = T(t) ? void 0 : t._$litDirective$;
  return (s == null ? void 0 : s.constructor) !== o && ((h = s == null ? void 0 : s._$AO) == null || h.call(s, !1), o === void 0 ? s = void 0 : (s = new o(n), s._$AT(n, e, i)), i !== void 0 ? (e._$Co ?? (e._$Co = []))[i] = s : e._$Cl = s), s !== void 0 && (t = P(n, s._$AS(n, t.values), s, i)), t;
}
class xt {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: i } = this._$AD, s = ((t == null ? void 0 : t.creationScope) ?? w).importNode(e, !0);
    y.currentNode = s;
    let o = y.nextNode(), r = 0, h = 0, a = i[0];
    for (; a !== void 0; ) {
      if (r === a.index) {
        let c;
        a.type === 2 ? c = new R(o, o.nextSibling, this, t) : a.type === 1 ? c = new a.ctor(o, a.name, a.strings, this, t) : a.type === 6 && (c = new Nt(o, this, t)), this._$AV.push(c), a = i[++h];
      }
      r !== (a == null ? void 0 : a.index) && (o = y.nextNode(), r++);
    }
    return y.currentNode = w, s;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class R {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, i, s) {
    this.type = 2, this._$AH = d, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = s, this._$Cv = (s == null ? void 0 : s.isConnected) ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = P(this, t, e), T(t) ? t === d || t == null || t === "" ? (this._$AH !== d && this._$AR(), this._$AH = d) : t !== this._$AH && t !== S && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : St(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== d && T(this._$AH) ? this._$AA.nextSibling.data = t : this.T(w.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var o;
    const { values: e, _$litType$: i } = t, s = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = N.createElement(ut(i.h, i.h[0]), this.options)), i);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === s) this._$AH.p(e);
    else {
      const r = new xt(s, this), h = r.u(this.options);
      r.p(e), this.T(h), this._$AH = r;
    }
  }
  _$AC(t) {
    let e = rt.get(t.strings);
    return e === void 0 && rt.set(t.strings, e = new N(t)), e;
  }
  k(t) {
    Y(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, s = 0;
    for (const o of t) s === e.length ? e.push(i = new R(this.O(U()), this.O(U()), this, this.options)) : i = e[s], i._$AI(o), s++;
    s < e.length && (this._$AR(i && i._$AB.nextSibling, s), e.length = s);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, e); t && t !== this._$AB; ) {
      const s = t.nextSibling;
      t.remove(), t = s;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class k {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, s, o) {
    this.type = 1, this._$AH = d, this._$AN = void 0, this.element = t, this.name = e, this._$AM = s, this.options = o, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = d;
  }
  _$AI(t, e = this, i, s) {
    const o = this.strings;
    let r = !1;
    if (o === void 0) t = P(this, t, e, 0), r = !T(t) || t !== this._$AH && t !== S, r && (this._$AH = t);
    else {
      const h = t;
      let a, c;
      for (t = o[0], a = 0; a < o.length - 1; a++) c = P(this, h[i + a], e, a), c === S && (c = this._$AH[a]), r || (r = !T(c) || c !== this._$AH[a]), c === d ? t = d : t !== d && (t += (c ?? "") + o[a + 1]), this._$AH[a] = c;
    }
    r && !s && this.j(t);
  }
  j(t) {
    t === d ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Ct extends k {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === d ? void 0 : t;
  }
}
class Ut extends k {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== d);
  }
}
class Tt extends k {
  constructor(t, e, i, s, o) {
    super(t, e, i, s, o), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = P(this, t, e, 0) ?? d) === S) return;
    const i = this._$AH, s = t === d && i !== d || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, o = t !== d && (i === d || s);
    s && this.element.removeEventListener(this.name, this, i), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Nt {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    P(this, t);
  }
}
const V = C.litHtmlPolyfillSupport;
V == null || V(N, R), (C.litHtmlVersions ?? (C.litHtmlVersions = [])).push("3.2.1");
const Mt = (n, t, e) => {
  const i = (e == null ? void 0 : e.renderBefore) ?? t;
  let s = i._$litPart$;
  if (s === void 0) {
    const o = (e == null ? void 0 : e.renderBefore) ?? null;
    i._$litPart$ = s = new R(t.insertBefore(U(), o), o, void 0, e ?? {});
  }
  return s._$AI(n), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
let E = class extends A {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var e;
    const t = super.createRenderRoot();
    return (e = this.renderOptions).renderBefore ?? (e.renderBefore = t.firstChild), t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Mt(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t;
    super.connectedCallback(), (t = this._$Do) == null || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this._$Do) == null || t.setConnected(!1);
  }
  render() {
    return S;
  }
};
var at;
E._$litElement$ = !0, E.finalized = !0, (at = globalThis.litElementHydrateSupport) == null || at.call(globalThis, { LitElement: E });
const q = globalThis.litElementPolyfillSupport;
q == null || q({ LitElement: E });
(globalThis.litElementVersions ?? (globalThis.litElementVersions = [])).push("4.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $t = (n) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(n, t);
  }) : customElements.define(n, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Rt = { attribute: !0, type: String, converter: D, reflect: !1, hasChanged: J }, Wt = (n = Rt, t, e) => {
  const { kind: i, metadata: s } = e;
  let o = globalThis.litPropertyMetadata.get(s);
  if (o === void 0 && globalThis.litPropertyMetadata.set(s, o = /* @__PURE__ */ new Map()), o.set(e.name, n), i === "accessor") {
    const { name: r } = e;
    return { set(h) {
      const a = t.get.call(this);
      t.set.call(this, h), this.requestUpdate(r, a, n);
    }, init(h) {
      return h !== void 0 && this.P(r, void 0, n), h;
    } };
  }
  if (i === "setter") {
    const { name: r } = e;
    return function(h) {
      const a = this[r];
      t.call(this, h), this.requestUpdate(r, a, n);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function W(n) {
  return (t, e) => typeof e == "object" ? Wt(n, t, e) : ((i, s, o) => {
    const r = s.hasOwnProperty(o);
    return s.constructor.createProperty(o, r ? { ...i, wrapped: !0 } : i), r ? Object.getOwnPropertyDescriptor(s, o) : void 0;
  })(n, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function j(n) {
  return W({ ...n, state: !0, attribute: !1 });
}
const Ht = lt`
  :host {
    display: block;
    padding: 25px;
    color: var(--my-element-text-color, #000);
  }
  .container {
    background: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  button {
    background-color: #4CAF50;
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 4px;
  }
  .nav-button {
    background-color: #2196F3;
  }
  .close-button {
    background-color: #f44336;
    padding: 8px 16px;
    font-size: 14px;
  }
  .nav-button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
  .status {
    margin-top: 10px;
    font-style: italic;
    color: #666;
  }
  .windows-list {
    margin-top: 20px;
    padding: 10px;
    border-top: 1px solid #eee;
  }
  .window-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    background: #f5f5f5;
    margin: 5px 0;
    border-radius: 4px;
  }
`;
var It = Object.defineProperty, Dt = Object.getOwnPropertyDescriptor, b = (n, t, e, i) => {
  for (var s = i > 1 ? void 0 : i ? Dt(t, e) : t, o = n.length - 1, r; o >= 0; o--)
    (r = n[o]) && (s = (i ? r(t, e, s) : r(s)) || s);
  return i && s && It(t, e, s), s;
};
let $ = class extends E {
  constructor() {
    super(), this.name = "World", this.count = 0, this.tabOpenCount = 0, this.isProcessRunning = !1, this.remainingTime = 0, this.openWindows = [], window.addEventListener("message", this._handleMessage.bind(this));
  }
  // Get base URL for GitHub Pages compatibility
  getBasePath() {
    try {
      const n = document.querySelector("base");
      return n && n.getAttribute("href") || "/";
    } catch (n) {
      return console.warn("Error getting base path:", n), "/";
    }
  }
  // Get origin for postMessage
  getOrigin() {
    try {
      return window.location.origin;
    } catch (n) {
      return console.warn("Error getting origin:", n), "http://localhost:8000";
    }
  }
  render() {
    return v`
      <div class="container">
        <h1>Hello, ${this.name}!</h1>
        <button @click=${this._onClick}>
          Click Count: ${this.count}
        </button>
        <button 
          class="nav-button" 
          @click=${this._startTabOpenProcess}
          ?disabled=${this.isProcessRunning || this.tabOpenCount >= 2}
        >
          Open Second Page (${2 - this.tabOpenCount} remaining)
        </button>
        ${this.isProcessRunning ? v`
          <p class="status">Next tab will open in: ${this.remainingTime} seconds</p>
        ` : ""}
        ${this.tabOpenCount >= 2 ? v`
          <p class="status">All allowed tabs have been opened</p>
        ` : ""}
        
        ${this.openWindows.length > 0 ? v`
          <div class="windows-list">
            <h3>Open Windows</h3>
            ${this.openWindows.map((n) => v`
              <div class="window-item">
                <span>${n.title} (ID: ${n.id})</span>
                <button class="close-button" @click=${() => this._closeWindow(n)}>
                  Close Window
                </button>
              </div>
            `)}
          </div>
        ` : ""}
        <slot></slot>
      </div>
    `;
  }
  _onClick() {
    this.count++;
  }
  _startTabOpenProcess() {
    this.tabOpenCount >= 2 || this.isProcessRunning || (this.isProcessRunning = !0, this._openNewTab(), this.tabOpenCount++, this.tabOpenCount < 2 ? (this.remainingTime = 30, this.timer = window.setInterval(() => {
      this.remainingTime--, this.remainingTime <= 0 && (this._openNewTab(), this.tabOpenCount++, clearInterval(this.timer), this.isProcessRunning = !1);
    }, 1e3)) : this.isProcessRunning = !1);
  }
  _openNewTab() {
    try {
      const n = crypto.randomUUID(), t = this.getBasePath(), e = window.open(`${t}second.html?id=${n}`, "_blank");
      e && (e.focus(), this.openWindows = [...this.openWindows, {
        id: n,
        title: "Second Page",
        window: e
      }]);
    } catch (n) {
      console.warn("Error opening new tab:", n);
    }
  }
  _handleMessage(n) {
    try {
      const t = this.getOrigin();
      if (n.origin !== t) return;
      const { type: e, id: i, title: s } = n.data;
      e === "WINDOW_READY" ? this.openWindows = this.openWindows.map(
        (o) => o.id === i ? { ...o, title: s } : o
      ) : e === "WINDOW_CLOSED" && (this.openWindows = this.openWindows.filter((o) => o.id !== i), this.tabOpenCount = Math.max(0, this.tabOpenCount - 1));
    } catch (t) {
      console.warn("Error handling message:", t);
    }
  }
  _closeWindow(n) {
    try {
      n.window.postMessage({
        type: "CLOSE_WINDOW",
        id: n.id
      }, this.getOrigin());
    } catch (t) {
      console.warn("Error closing window:", t);
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.timer && clearInterval(this.timer), window.removeEventListener("message", this._handleMessage.bind(this));
  }
};
$.styles = Ht;
b([
  W()
], $.prototype, "name", 2);
b([
  W({ type: Number })
], $.prototype, "count", 2);
b([
  j()
], $.prototype, "tabOpenCount", 2);
b([
  j()
], $.prototype, "isProcessRunning", 2);
b([
  j()
], $.prototype, "remainingTime", 2);
b([
  j()
], $.prototype, "openWindows", 2);
$ = b([
  $t("my-element")
], $);
const Lt = lt`
  :host {
    display: block;
    padding: 25px;
    color: var(--second-page-text-color, #000);
  }
  .card {
    background: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  h1 {
    color: #2196F3;
    margin-top: 0;
  }
  .window-id {
    font-family: monospace;
    background: #f5f5f5;
    padding: 4px 8px;
    border-radius: 4px;
    margin-left: 8px;
  }
`;
var kt = Object.defineProperty, jt = Object.getOwnPropertyDescriptor, Z = (n, t, e, i) => {
  for (var s = i > 1 ? void 0 : i ? jt(t, e) : t, o = n.length - 1, r; o >= 0; o--)
    (r = n[o]) && (s = (i ? r(t, e, s) : r(s)) || s);
  return i && s && kt(t, e, s), s;
};
let M = class extends E {
  constructor() {
    super(), this.title = "Second Page", this.windowId = "", this.windowId = this.getWindowId(), window.addEventListener("message", this._handleMessage.bind(this)), this._notifyReady();
  }
  getOrigin() {
    try {
      return window.location.origin;
    } catch (n) {
      return console.warn("Error getting origin:", n), "http://localhost:8000";
    }
  }
  getWindowId() {
    try {
      return new URLSearchParams(window.location.search).get("id") || `window-${Date.now()}`;
    } catch (n) {
      return console.warn("Error getting window ID:", n), `window-${Date.now()}`;
    }
  }
  render() {
    return v`
      <div class="card">
        <h1>${this.title}</h1>
        <p>
          Window ID: 
          <span class="window-id">${this.windowId}</span>
        </p>
        <p>This window can only be closed from the main page</p>
      </div>
    `;
  }
  _notifyReady() {
    var n;
    try {
      (n = window.opener) == null || n.postMessage({
        type: "WINDOW_READY",
        id: this.windowId,
        title: this.title
      }, this.getOrigin());
    } catch (t) {
      console.warn("Failed to notify ready:", t);
    }
  }
  _handleMessage(n) {
    try {
      const t = this.getOrigin();
      if (n.origin !== t) return;
      const { type: e, id: i } = n.data;
      e === "CLOSE_WINDOW" && i === this.windowId && this._closeWindow();
    } catch (t) {
      console.warn("Error handling message:", t);
    }
  }
  _closeWindow() {
    var n;
    try {
      (n = window.opener) == null || n.postMessage({
        type: "WINDOW_CLOSED",
        id: this.windowId
      }, this.getOrigin()), window.close();
    } catch (t) {
      console.warn("Failed to close window:", t);
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback(), window.removeEventListener("message", this._handleMessage.bind(this));
  }
};
M.styles = Lt;
Z([
  W()
], M.prototype, "title", 2);
Z([
  W()
], M.prototype, "windowId", 2);
M = Z([
  $t("second-page")
], M);

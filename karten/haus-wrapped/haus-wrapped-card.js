/*
 * Haus-Wrapped-Karte für Home Assistant – Kily's World (https://kilysworld.com)
 * Ein Monatsrückblick wie bei Spotify, nur fürs Haus: großer Monatsname, Highlight, Kacheln mit
 * Vergleich zum Vormonat, bestem und schlechtestem Tag, Tagesbalken und Herkunfts-Balken.
 * Die Zahlen holt die Karte selbst aus der Langzeitstatistik von Home Assistant – kein Skript,
 * kein Hilfssensor. Mit ◀ ▶ blättert man durch die Monate.
 *
 * type: custom:haus-wrapped-card
 * titel: Haus-Wrapped                    # optional (oder title)
 * motto: Die Sonne hat geliefert         # optional, sonst automatisch
 * kacheln:                               # oder tiles
 *   - entity: sensor.pv_ertrag
 *     titel: Vom Dach geerntet
 *     icon: mdi:solar-power
 *     farbe: "#ffca28"
 *     satz: Genug Sonne für {km} km im E-Auto
 *     verlauf: true                      # Tagesbalken
 *   - titel: Woher der Strom kam         # Herkunfts-Balken
 *     anteile:
 *       - { entity: sensor.pv_direkt, name: Sonne, farbe: "#ffca28", eigen: true }
 *       - { entity: sensor.akku_entladen, name: Akku, farbe: "#b388ff", eigen: true }
 *       - { entity: sensor.netzbezug, name: Netz, farbe: "#64b5f6" }
 *
 * MIT-Lizenz · https://github.com/johnkily/haus-wrapped-card
 */
const HW_VERSION = "1.0.1";

const HW_TEXTE = {
  de: {
    monate: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
    tage: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
    marke: "HAUS-WRAPPED", highlight: "Euer Highlight", motto: "Dein Haus im Rückblick",
    mehr: "mehr als im Vormonat", weniger: "weniger als im Vormonat", gleich: "wie im Vormonat",
    zum: "zum Vormonat", bester: "Bester Tag", schlechtester: "Schwächster Tag", hoechst: "Höchstens", tiefst: "Tiefstens",
    leer: "Für diesen Monat gibt es noch keine Statistik.", laden: "Rechne …", wann: "Jeder Tag im",
    fuss: "Gerechnet aus der Langzeitstatistik von Home Assistant", kein: "Bitte unter „kacheln“ mindestens eine Kachel angeben.",
    zurueck: "Monat davor", vor: "Monat danach",
  },
  en: {
    monate: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    tage: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    marke: "HOME WRAPPED", highlight: "Your highlight", motto: "Your home in review",
    mehr: "more than last month", weniger: "less than last month", gleich: "same as last month",
    zum: "vs. last month", bester: "Best day", schlechtester: "Weakest day", hoechst: "Max", tiefst: "Min",
    leer: "There are no statistics for this month yet.", laden: "Calculating …", wann: "Every day in",
    fuss: "Calculated from Home Assistant's long-term statistics", kein: "Please add at least one tile under “tiles”.",
    zurueck: "Previous month", vor: "Next month",
  },
};
const HW_FARBEN = ["#ffca28", "#66bb6a", "#ec407a", "#26c6da", "#ab47bc", "#ff7043", "#42a5f5", "#9ccc65"];

const hwEsc = (t) => String(t == null ? "" : t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const hwRgb = (h) => {
  const m = /^#?([0-9a-f]{6})$/i.exec(h || "");
  if (!m) return "255,202,40";
  const n = parseInt(m[1], 16);
  return ((n >> 16) & 255) + "," + ((n >> 8) & 255) + "," + (n & 255);
};

class HausWrappedCard extends HTMLElement {
  static getStubConfig(hass) {
    const energie = Object.values(hass.states).filter((s) => s.entity_id.startsWith("sensor.")
      && s.attributes.device_class === "energy" && ["total", "total_increasing"].includes(s.attributes.state_class)).slice(0, 3);
    return { type: "custom:haus-wrapped-card", kacheln: energie.length ? energie.map((s) => ({ entity: s.entity_id })) : [{ entity: "sensor.example" }] };
  }

  setConfig(config) {
    const c = Object.assign({}, config);
    if (c.title != null && c.titel == null) c.titel = c.title;
    if (c.tiles != null && c.kacheln == null) c.kacheln = c.tiles;
    if (!Array.isArray(c.kacheln) || !c.kacheln.length) throw new Error(HW_TEXTE.de.kein + " / " + HW_TEXTE.en.kein);
    c.kacheln = c.kacheln.map((k, i) => {
      const x = Object.assign({}, k);
      if (x.title != null && x.titel == null) x.titel = x.title;
      if (x.color != null && x.farbe == null) x.farbe = x.color;
      if (x.text != null && x.satz == null) x.satz = x.text;
      if (x.chart != null && x.verlauf == null) x.verlauf = x.chart;
      if (x.parts != null && x.anteile == null) x.anteile = x.parts;
      if (!x.farbe) x.farbe = HW_FARBEN[i % HW_FARBEN.length];
      return x;
    });
    this._config = c;
    this._rueck = 1;            // 1 = letzter abgeschlossener Monat
    this._daten = null;
    if (!this.shadowRoot) this.attachShadow({ mode: "open" });
    this._zeichnen();
    if (this._hass) this._laden();
  }

  set hass(hass) {
    const erst = !this._hass;
    this._hass = hass;
    this._t = HW_TEXTE[(hass.language || "de").startsWith("de") ? "de" : "en"];
    if (erst && this._config) this._laden();
  }

  getCardSize() { return 12; }

  // ---------- Daten ----------
  _monat(rueck) {
    const jetzt = new Date();
    const start = new Date(jetzt.getFullYear(), jetzt.getMonth() - rueck, 1);
    const ende = new Date(jetzt.getFullYear(), jetzt.getMonth() - rueck + 1, 1);
    return { start, ende, vorStart: new Date(start.getFullYear(), start.getMonth() - 1, 1) };
  }

  _ids() {
    const ids = new Set();
    this._config.kacheln.forEach((k) => {
      if (k.entity) ids.add(k.entity);
      (k.anteile || []).forEach((a) => a.entity && ids.add(a.entity));
    });
    return [...ids];
  }

  async _laden() {
    const m = this._monat(this._rueck);
    const stand = this._rueck;
    this._daten = null;
    this._zeichnen();
    const ids = this._ids();
    try {
      const [monate, tage] = await Promise.all([
        this._hass.callWS({ type: "recorder/statistics_during_period", start_time: m.vorStart.toISOString(), end_time: m.ende.toISOString(),
          statistic_ids: ids, period: "month", types: ["change", "mean", "max", "min"] }),
        this._hass.callWS({ type: "recorder/statistics_during_period", start_time: m.start.toISOString(), end_time: m.ende.toISOString(),
          statistic_ids: ids, period: "day", types: ["change", "mean", "max", "min"] }),
      ]);
      if (stand !== this._rueck) return;          // inzwischen weitergeblättert
      this._daten = this._rechnen(m, monate || {}, tage || {});
    } catch (e) {
      this._daten = { fehler: String(e.message || e) };
    }
    this._zeichnen();
  }

  _imMonat(row, d) {
    const s = new Date(typeof row.start === "number" ? row.start : Date.parse(row.start));
    return s.getFullYear() === d.getFullYear() && s.getMonth() === d.getMonth();
  }

  _art(k, id) {
    // „type: sum/mean“ (englisch) oder „art: summe/mittel“ (deutsch); jeweils auch das andere Wort
    const art = k.type || k.art;
    if (art) return ["mittel", "mean"].includes(String(art).toLowerCase()) ? "mittel" : "summe";
    const st = this._hass.states[id];
    const sc = st && st.attributes.state_class;
    return sc === "measurement" ? "mittel" : "summe";
  }

  _rechnen(m, monate, tage) {
    const aus = { kacheln: [], monat: m.start };
    this._config.kacheln.forEach((k) => {
      if (k.anteile) {
        const teile = k.anteile.map((a, i) => {
          const r = (monate[a.entity] || []).find((x) => this._imMonat(x, m.start));
          return { name: a.name || this._name(a.entity), farbe: a.farbe || a.color || HW_FARBEN[(i + 3) % HW_FARBEN.length], eigen: !!(a.eigen || a.own),
                   wert: r && r.change != null ? Math.max(0, r.change) : 0 };
        });
        const summe = teile.reduce((s, x) => s + x.wert, 0);
        if (summe <= 0) return;
        teile.forEach((x) => { x.anteil = Math.round(x.wert / summe * 100); });
        const eigen = teile.filter((x) => x.eigen).reduce((s, x) => s + x.anteil, 0);
        aus.kacheln.push({ k, art: "anteile", teile, zahl: teile.some((x) => x.eigen) ? eigen : teile[0].anteil, einheit: "%" });
        return;
      }
      const id = k.entity;
      const art = this._art(k, id);
      const zeilen = monate[id] || [];
      const akt = zeilen.find((x) => this._imMonat(x, m.start));
      if (!akt) return;
      const vor = zeilen.find((x) => this._imMonat(x, m.vorStart));
      const tagesZeilen = (tage[id] || []).filter((x) => this._imMonat(x, m.start));
      const st = this._hass.states[id];
      const einheit = k.einheit || (st && st.attributes.unit_of_measurement) || "";
      const wert = art === "summe" ? akt.change : akt.mean;
      if (wert == null) return;
      const vorWert = vor ? (art === "summe" ? vor.change : vor.mean) : null;
      const tagWerte = tagesZeilen.map((x) => ({ d: new Date(typeof x.start === "number" ? x.start : Date.parse(x.start)),
                                                 v: art === "summe" ? x.change : x.mean })).filter((x) => x.v != null);
      const eintrag = { k, art, wert, einheit, vorWert, max: akt.max, min: akt.min, tage: tagWerte };
      if (vorWert != null && art === "summe" && vorWert !== 0) eintrag.proz = (wert - vorWert) / Math.abs(vorWert) * 100;
      if (vorWert != null && art === "mittel") eintrag.diff = wert - vorWert;
      aus.kacheln.push(eintrag);
    });
    // Highlight: ausdrücklich markiert, sonst die Summen-Kachel mit der größten Veränderung, sonst die erste
    aus.top = aus.kacheln.find((x) => x.k.highlight)
      || aus.kacheln.filter((x) => x.proz != null).sort((a, b) => Math.abs(b.proz) - Math.abs(a.proz))[0]
      || aus.kacheln[0];
    return aus;
  }

  _name(id) {
    const s = this._hass && this._hass.states[id];
    return (s && s.attributes.friendly_name) || id;
  }

  _zahl(v, stellen) {
    if (v == null || isNaN(v)) return "–";
    const st = stellen != null ? stellen : (Math.abs(v) >= 100 ? 0 : 1);
    return new Intl.NumberFormat(this._hass ? this._hass.language || "de" : "de",
      { minimumFractionDigits: 0, maximumFractionDigits: st }).format(v);
  }

  // ---------- Darstellung ----------
  _satz(e) {
    const k = e.k;
    if (!k.satz) return "";
    const km = e.art === "summe" ? e.wert / (Number(k.eauto_verbrauch || k.ev_consumption || 18)) * 100 : null;
    return String(k.satz)
      .replace(/\{wert\}|\{value\}/g, this._zahl(e.wert))
      .replace(/\{einheit\}|\{unit\}/g, e.einheit)
      .replace(/\{km\}/g, this._zahl(km, 0))
      .replace(/\{vormonat\}|\{last_month\}/g, this._zahl(e.vorWert));
  }

  _vergleich(e) {
    const t = this._t;
    if (e.proz != null) {
      if (Math.abs(e.proz) < 0.5) return "● " + t.gleich;
      return (e.proz > 0 ? "▲ " : "▼ ") + this._zahl(Math.abs(e.proz), 0) + " % " + (e.proz > 0 ? t.mehr : t.weniger);
    }
    if (e.diff != null) return (e.diff >= 0 ? "▲ +" : "▼ −") + this._zahl(Math.abs(e.diff), 1) + " " + e.einheit + " " + t.zum;
    return "";
  }

  _extra(e) {
    const t = this._t;
    const tag = (x) => t.tage[x.d.getDay()] + ", " + x.d.getDate() + "." + (x.d.getMonth() + 1) + ".";
    if (e.art === "summe" && e.tage.length > 1) {
      const sort = e.tage.slice().sort((a, b) => b.v - a.v);
      return [t.bester + ": " + tag(sort[0]) + " · " + this._zahl(sort[0].v) + " " + e.einheit,
              t.schlechtester + ": " + tag(sort[sort.length - 1]) + " · " + this._zahl(sort[sort.length - 1].v) + " " + e.einheit];
    }
    if (e.art === "mittel" && e.max != null) {
      return [t.hoechst + " " + this._zahl(e.max, 1) + " " + e.einheit + " · " + t.tiefst + " " + this._zahl(e.min, 1) + " " + e.einheit];
    }
    return [];
  }

  _verlauf(e, c) {
    if (!e.k.verlauf || e.tage.length < 2) return "";
    const n = new Date(e.tage[0].d.getFullYear(), e.tage[0].d.getMonth() + 1, 0).getDate();
    const proTag = new Array(n).fill(null);
    e.tage.forEach((x) => { proTag[x.d.getDate() - 1] = x.v; });
    const max = Math.max(...proTag.filter((v) => v != null).map((v) => Math.abs(v)), 0.0001);
    const spitze = proTag.indexOf(Math.max(...proTag.filter((v) => v != null)));
    let o = '<div class="zs"><div class="zs-t">' + hwEsc(this._t.wann + " " + this._t.monate[e.tage[0].d.getMonth()]) + '</div><div class="zs-bars">';
    proTag.forEach((v, i) => {
      const wt = new Date(e.tage[0].d.getFullYear(), e.tage[0].d.getMonth(), i + 1).getDay();
      const h = v == null ? 3 : Math.max(6, Math.round(Math.abs(v) / max * 100));
      o += '<div class="zs-col' + (wt === 0 || wt === 6 ? " zs-we" : "") + '" title="' + (i + 1) + '.: ' + (v == null ? "–" : this._zahl(v) + " " + hwEsc(e.einheit)) + '">'
        + '<span style="height:' + h + '%;background:' + (v == null ? "rgba(255,255,255,.12)" : (i === spitze ? "rgb(" + c + ")" : "rgba(" + c + ",.55)")) + '"></span></div>';
    });
    o += '</div><div class="zs-lab">';
    [1, 8, 15, 22, 29].filter((d) => d <= n).forEach((d) => { o += '<span style="left:' + ((d - 0.5) / n * 100) + '%">' + d + ".</span>"; });
    return o + "</div></div>";
  }

  _balken(e) {
    return '<div class="bal">' + e.teile.filter((x) => x.anteil > 0).map((x) => '<span style="width:' + x.anteil + "%;background:" + hwEsc(x.farbe) + '"></span>').join("") + "</div>"
      + '<div class="bal-l">' + e.teile.map((x) => '<span><i style="background:' + hwEsc(x.farbe) + '"></i>' + hwEsc(x.name) + " " + x.anteil + " %</span>").join("") + "</div>";
  }

  _kachel(e, i) {
    const k = e.k;
    const c = hwRgb(k.farbe);
    const titel = k.titel || (k.entity ? this._name(k.entity) : "");
    const icon = k.icon || (e.art === "anteile" ? "mdi:chart-donut" : (e.art === "mittel" ? "mdi:thermometer" : "mdi:lightning-bolt"));
    const zahl = e.art === "anteile" ? e.zahl : this._zahl(e.wert);
    const v = e.art === "anteile" ? "" : this._vergleich(e);
    const extra = e.art === "anteile" ? [] : this._extra(e);
    return '<div class="t" style="--c:' + c + ";animation-delay:" + (0.2 + i * 0.07).toFixed(2) + 's">'
      + '<div class="t-k"><ha-icon icon="' + hwEsc(icon) + '" style="margin:0;width:20px;height:20px;color:rgb(' + c + ')"></ha-icon><span>' + hwEsc(titel) + "</span></div>"
      + '<div class="t-z">' + hwEsc(zahl) + "<span>" + hwEsc(e.einheit) + "</span></div>"
      + (this._satz(e) ? '<div class="t-s">' + hwEsc(this._satz(e)) + "</div>" : "")
      + (v ? '<div class="t-v">' + hwEsc(v) + "</div>" : "")
      + (e.art === "anteile" ? this._balken(e) : "")
      + this._verlauf(e, c)
      + (extra.length ? '<div class="t-e">' + extra.map((x) => "<div>" + hwEsc(x) + "</div>").join("") + "</div>" : "")
      + "</div>";
  }

  _zeichnen() {
    if (!this.shadowRoot || !this._config) return;
    const t = this._t || HW_TEXTE.de;
    const m = this._monat(this._rueck);
    let inhalt;
    if (!this._hass || !this._daten) {
      inhalt = '<div class="leer">' + t.laden + "</div>";
    } else if (this._daten.fehler) {
      inhalt = '<div class="leer">⚠ ' + hwEsc(this._daten.fehler) + "</div>";
    } else if (!this._daten.kacheln.length) {
      inhalt = '<div class="leer">' + t.leer + "</div>";
    } else {
      const top = this._daten.top;
      const c = hwRgb(top.k.farbe);
      const topTitel = top.k.titel || (top.k.entity ? this._name(top.k.entity) : "");
      inhalt = '<div class="held" style="--c:' + c + '"><div class="held-l">' + hwEsc(t.highlight) + "</div>"
        + '<div class="held-z">' + hwEsc(top.art === "anteile" ? top.zahl : this._zahl(top.wert)) + "<span>" + hwEsc(top.einheit) + "</span></div>"
        + '<div class="held-t">' + hwEsc(topTitel) + "</div>"
        + '<div class="held-s">' + hwEsc(this._satz(top) || this._vergleich(top)) + "</div>"
        + (top.art === "anteile" ? '<div class="held-b">' + this._balken(top) + "</div>" : "") + "</div>"
        + '<div class="raster">' + this._daten.kacheln.filter((x) => x !== top).map((x, i) => this._kachel(x, i)).join("") + "</div>";
    }
    const motto = this._config.motto || t.motto;
    this.shadowRoot.innerHTML = "<style>" + HW_CSS + "</style>"
      + '<ha-card><div class="kopf">'
      + '<div class="nav"><button class="zur" title="' + hwEsc(t.zurueck) + '">◀</button>'
      + '<div class="marke"><ha-icon icon="mdi:gift-outline" style="margin:0;width:16px;height:16px"></ha-icon> ' + hwEsc(this._config.titel || t.marke) + "</div>"
      + '<button class="vor" title="' + hwEsc(t.vor) + '"' + (this._rueck <= 1 ? " disabled" : "") + ">▶</button></div>"
      + '<div class="monat">' + hwEsc(t.monate[m.start.getMonth()] + " " + m.start.getFullYear()) + "</div>"
      + '<div class="motto">' + hwEsc(motto) + "</div></div>"
      + inhalt
      + '<div class="fuss">' + hwEsc(t.fuss) + "</div></ha-card>";
    this.shadowRoot.querySelector(".zur").addEventListener("click", () => { this._rueck += 1; this._laden(); });
    this.shadowRoot.querySelector(".vor").addEventListener("click", () => { if (this._rueck > 1) { this._rueck -= 1; this._laden(); } });
  }
}

const HW_CSS = `
:host { display: block; }
ha-card { padding: 10px 16px 14px; overflow: hidden; color: #fff; border: none;
  background: radial-gradient(ellipse at 20% 0%, rgba(171,71,188,.25), transparent 55%),
              radial-gradient(ellipse at 90% 100%, rgba(66,165,245,.2), transparent 60%), linear-gradient(160deg, #1d1631, #121826); }
@keyframes wr-hoch { from { opacity: 0; transform: translateY(16px) scale(.98); } to { opacity: 1; transform: none; } }
@keyframes wr-glanz { 0% { background-position: 0% 50%; } 100% { background-position: 200% 50%; } }
@keyframes wr-atmen { 0%,100% { opacity: .55; } 50% { opacity: .85; } }
.kopf { text-align: center; padding: 10px 8px 4px; animation: wr-hoch .6s ease both; }
.nav { display: flex; align-items: center; justify-content: center; gap: 14px; }
.nav button { background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.15); color: #fff; border-radius: 50%;
  width: 30px; height: 30px; cursor: pointer; font-size: 12px; }
.nav button:disabled { opacity: .25; cursor: default; }
.marke { font-size: 12px; letter-spacing: .28em; color: rgba(255,255,255,.6); font-weight: 600; }
.monat { font-size: clamp(34px, 8vw, 58px); font-weight: 800; line-height: 1.05; margin-top: 8px;
  background: linear-gradient(90deg, #ffca28, #ff7043, #ec407a, #ab47bc, #42a5f5, #66bb6a, #ffca28);
  background-size: 200% auto; -webkit-background-clip: text; background-clip: text; color: transparent; animation: wr-glanz 8s linear infinite; }
.motto { font-size: 16px; color: rgba(255,255,255,.75); margin-top: 6px; font-style: italic; }
.held { position: relative; overflow: hidden; margin: 18px auto 16px; padding: 26px 22px; border-radius: 22px; text-align: center;
  background: radial-gradient(ellipse at 50% 120%, rgba(var(--c),.45), transparent 65%), linear-gradient(160deg, rgba(255,255,255,.08), rgba(255,255,255,.02));
  border: 1px solid rgba(var(--c),.45); animation: wr-hoch .7s .1s ease both; }
.held::after { content: ''; position: absolute; inset: 0; pointer-events: none;
  background: radial-gradient(circle at 50% 110%, rgba(var(--c),.35), transparent 55%); animation: wr-atmen 4s ease-in-out infinite; }
.held-l { font-size: 12px; letter-spacing: .2em; text-transform: uppercase; color: rgba(255,255,255,.6); }
.held-z { font-size: clamp(56px, 14vw, 96px); font-weight: 800; line-height: 1; margin-top: 8px; color: rgb(var(--c)); text-shadow: 0 0 32px rgba(var(--c),.55); }
.held-z span, .t-z span { font-size: .38em; font-weight: 600; margin-left: 6px; color: rgba(255,255,255,.75); text-shadow: none; }
.held-t { font-size: 18px; font-weight: 600; margin-top: 6px; }
.held-s { font-size: 15px; margin-top: 8px; color: rgba(255,255,255,.8); }
.held-b { max-width: 420px; margin: 12px auto 0; text-align: left; }
.raster { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 12px; }
.t { position: relative; padding: 16px 16px 14px; border-radius: 18px; animation: wr-hoch .55s ease both;
  background: radial-gradient(ellipse at 15% 130%, rgba(var(--c),.32), transparent 60%), linear-gradient(160deg, rgba(255,255,255,.07), rgba(255,255,255,.02));
  border: 1px solid rgba(var(--c),.28); }
.t-k { display: flex; align-items: center; gap: 8px; font-size: 13px; color: rgba(255,255,255,.75); font-weight: 600; }
.t-z { font-size: 40px; font-weight: 800; line-height: 1.05; margin-top: 10px; }
.t-s { font-size: 14px; color: rgba(255,255,255,.85); margin-top: 6px; line-height: 1.35; }
.t-v { font-size: 12px; margin-top: 8px; color: rgb(var(--c)); font-weight: 600; }
.t-e { margin-top: 10px; padding-top: 8px; border-top: 1px solid rgba(255,255,255,.08); font-size: 12px; line-height: 1.55; color: rgba(255,255,255,.6); }
.bal { display: flex; height: 9px; border-radius: 5px; overflow: hidden; margin-top: 12px; background: rgba(255,255,255,.08); }
.bal span { height: 100%; }
.bal-l { display: flex; gap: 12px; flex-wrap: wrap; font-size: 11px; margin-top: 6px; color: rgba(255,255,255,.75); }
.bal-l i { display: inline-block; width: 8px; height: 8px; border-radius: 2px; margin-right: 5px; }
.zs { margin-top: 12px; }
.zs-t { font-size: 10px; letter-spacing: .12em; text-transform: uppercase; color: rgba(255,255,255,.5); margin-bottom: 6px; }
.zs-bars { display: flex; align-items: stretch; gap: 2px; height: 54px; }
.zs-col { flex: 1; position: relative; display: flex; align-items: flex-end; border-radius: 2px; }
.zs-col.zs-we { background: rgba(255,255,255,.05); }
.zs-col span { display: block; width: 100%; border-radius: 2px 2px 0 0; }
.zs-lab { position: relative; height: 12px; margin-top: 3px; font-size: 9px; color: rgba(255,255,255,.4); }
.zs-lab span { position: absolute; transform: translateX(-50%); white-space: nowrap; }
.leer { padding: 40px 12px; text-align: center; color: rgba(255,255,255,.6); }
.fuss { font-size: 11px; color: rgba(255,255,255,.4); text-align: center; margin: 16px 8px 2px; }
`;

if (!customElements.get("haus-wrapped-card")) customElements.define("haus-wrapped-card", HausWrappedCard);
window.customCards = window.customCards || [];
if (!window.customCards.find((c) => c.type === "haus-wrapped-card")) {
  window.customCards.push({ type: "haus-wrapped-card", name: "Haus-Wrapped", preview: false,
    description: "Monatsrückblick fürs Haus aus der Langzeitstatistik / Monthly review of your home from long-term statistics" });
}
console.info("%c HAUS-WRAPPED %c " + HW_VERSION + " ", "background:#ab47bc;color:#fff;border-radius:3px 0 0 3px;padding:1px 4px",
  "background:#424242;color:#fff;border-radius:0 3px 3px 0;padding:1px 4px");

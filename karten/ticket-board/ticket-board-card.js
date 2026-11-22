/*
 * Ticket-Board für Home Assistant – Kily's World (https://kilysworld.com)
 * Ein Kanban-Board für alles, was im Haus zu tun ist. Die Tickets liegen in einer ganz
 * normalen To-do-Liste von Home Assistant (z. B. „Lokale To-do-Liste“) – keine Skripte,
 * keine configuration.yaml, in jeder Sicherung enthalten.
 *
 * type: custom:ticket-board-card
 * entity: todo.hausmeisterei          # Pflicht
 * personen: [person.anna, person.ben] # optional: Zuständige/Filter
 * titel: Hausmeisterei                # optional (oder title)
 * archiv: 6                           # optional: so viele Erledigte sichtbar (oder archive)
 *                                      # personen geht auch als people
 *
 * MIT-Lizenz · https://github.com/johnkily/ticket-board-card
 */
const TB_VERSION = "1.1.0";
const TB_MARKE = "\n\n⚙ ";

const TB_TEXTE = {
  de: {
    spalten: { neu: "Reingerotzt", beredet: "Wird beredet", arbeit: "In Arbeit", abnahme: "Abnahme", erledigt: "Erledigt" },
    prio: { 1: "Irgendwann", 2: "Diese Woche", 3: "Brennt" },
    alle: "Alle", ich: "Meine", suche: "Suchen …", neu: "Neues Ticket", titel: "Was ist zu tun?",
    beschreibung: "Beschreibung", status: "Status", prioritaet: "Wie eilig?", zustaendig: "Wer kümmert sich?",
    niemand: "Offen", herz: "Wie wichtig?", faellig: "Fällig", keinTermin: "Kein Termin", woche: "In 1 Woche",
    zweiWochen: "In 2 Wochen", monat: "In 1 Monat", speichern: "Speichern", anlegen: "Anlegen", loeschen: "Löschen",
    loeschenFrage: "Ticket wirklich löschen?", schliessen: "Schließen", kommentar: "Kommentar …", senden: "Senden",
    verlauf: "Verlauf", angelegt: "angelegt", statusAuf: "Status →", abnahmeDurch: "Abnahme durch", mehr: "Alle %n anzeigen",
    weniger: "Weniger anzeigen", leer: "Nichts zu tun 🎉", ueberfaellig: "überfällig", heute: "heute", morgen: "morgen",
    fehlt: "Entität nicht gefunden: ", kein: "Bitte eine To-do-Liste angeben (entity: todo.…)", gewuenscht: "Gewünscht von",
  },
  en: {
    spalten: { neu: "Inbox", beredet: "Discussing", arbeit: "In progress", abnahme: "Review", erledigt: "Done" },
    prio: { 1: "Someday", 2: "This week", 3: "Urgent" },
    alle: "All", ich: "Mine", suche: "Search …", neu: "New ticket", titel: "What needs doing?",
    beschreibung: "Description", status: "Status", prioritaet: "How urgent?", zustaendig: "Who takes care?",
    niemand: "Open", herz: "How important?", faellig: "Due", keinTermin: "No date", woche: "In 1 week",
    zweiWochen: "In 2 weeks", monat: "In 1 month", speichern: "Save", anlegen: "Create", loeschen: "Delete",
    loeschenFrage: "Really delete this ticket?", schliessen: "Close", kommentar: "Comment …", senden: "Send",
    verlauf: "History", angelegt: "created", statusAuf: "Status →", abnahmeDurch: "Review by", mehr: "Show all %n",
    weniger: "Show less", leer: "Nothing to do 🎉", ueberfaellig: "overdue", heute: "today", morgen: "tomorrow",
    fehlt: "Entity not found: ", kein: "Please set a to-do list (entity: todo.…)", gewuenscht: "Requested by",
  },
};

const TB_SPALTEN = [
  { key: "neu", icon: "mdi:inbox-arrow-down", farbe: "#90a4ae" },
  { key: "beredet", icon: "mdi:chat-processing-outline", farbe: "#4fc3f7" },
  { key: "arbeit", icon: "mdi:hammer-wrench", farbe: "#ffb74d" },
  { key: "abnahme", icon: "mdi:clipboard-check-outline", farbe: "#ce93d8" },
  { key: "erledigt", icon: "mdi:check-circle-outline", farbe: "#81c784" },
];
const TB_PRIO = { 1: "#78909c", 2: "#ffb74d", 3: "#ef5350" };

function tbEsc(s) {
  return String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

class TicketBoardCard extends HTMLElement {
  static getStubConfig() {
    return { entity: "todo.hausmeisterei", titel: "Hausmeisterei" };
  }

  setConfig(config) {
    if (!config || !config.entity || !String(config.entity).startsWith("todo.")) throw new Error(TB_TEXTE.de.kein);
    const c = Object.assign({}, config);   // englische Namen gehen auch: title, people, archive
    if (c.title != null && c.titel == null) c.titel = c.title;
    if (c.people != null && c.personen == null) c.personen = c.people;
    if (c.archive != null && c.archiv == null) c.archiv = c.archive;
    this._config = Object.assign({ archiv: 6, personen: [] }, c);
    this._items = this._items || [];
    this._filter = this._filter || "alle";
    this._suche = this._suche || "";
    this._archivAuf = false;
    if (!this.shadowRoot) this.attachShadow({ mode: "open" });
    this._geruest();
    if (this._hass) { this._abonnieren(); this._kopf(); }
  }

  set hass(hass) {
    const erst = !this._hass;
    this._hass = hass;
    this._t = TB_TEXTE[(hass.language || "de").startsWith("de") ? "de" : "en"];
    if (erst || this._abo_entity !== this._config.entity) this._abonnieren();
    if (erst) this._kopf();
  }

  getCardSize() { return 8; }
  getGridOptions() { return { columns: "full", min_columns: 6 }; }

  disconnectedCallback() {
    if (this._abo) { this._abo.then((f) => f && f()).catch(() => {}); this._abo = null; this._abo_entity = null; }
  }

  connectedCallback() {
    if (this._hass && !this._abo) this._abonnieren();
  }

  // ---------- Daten ----------
  _abonnieren() {
    if (!this._hass || !this._hass.connection) return;
    if (this._abo) this._abo.then((f) => f && f()).catch(() => {});
    this._abo_entity = this._config.entity;
    this._abo = this._hass.connection.subscribeMessage((m) => {
      this._items = (m.items || []).map((i) => this._lesen(i));
      this._board();
      if (this._dialog && this._dialog.uid) {
        const neu = this._items.find((x) => x.uid === this._dialog.uid);
        if (neu) { this._dialog.item = neu; this._verlaufZeigen(); }
      }
    }, { type: "todo/item/subscribe", entity_id: this._config.entity });
    this._abo.catch((e) => this._fehler(this._t.fehlt + this._config.entity + " (" + (e.message || e.code || e) + ")"));
  }

  _lesen(i) {
    const d = i.description || "";
    const pos = d.lastIndexOf(TB_MARKE);
    let text = d, m = {};
    if (pos >= 0) {
      try { m = JSON.parse(d.slice(pos + TB_MARKE.length)); text = d.slice(0, pos); } catch (e) { m = {}; }
    }
    if (!m.s) m.s = i.status === "completed" ? "erledigt" : "neu";
    if (i.status === "completed" && m.s !== "erledigt") m.s = "erledigt";
    m.p = Number(m.p) || 1;
    m.h = Number(m.h) || 0;
    m.v = Array.isArray(m.v) ? m.v : [];
    return { uid: i.uid, titel: i.summary || "", text: text.trim(), due: i.due || null, status: i.status, m };
  }

  _beschreibung(text, m) {
    return (text || "").trim() + TB_MARKE + JSON.stringify(m);
  }

  _ich() {
    const u = this._hass.user || {};
    const p = Object.values(this._hass.states).find((s) => s.entity_id.startsWith("person.") && s.attributes.user_id === u.id);
    return { name: u.name || "?", person: p ? p.entity_id : "" };
  }

  async _speichern(item, aend) {
    const m = Object.assign({}, item.m, aend.m || {});
    const ich = this._ich();
    const jetzt = new Date().toISOString();
    if (aend.m && aend.m.s && aend.m.s !== item.m.s) m.v = [...(m.v || []), { t: jetzt, w: ich.name, x: "→ " + aend.m.s }];
    if (aend.kommentar) m.v = [...(m.v || []), { t: jetzt, w: ich.name, k: aend.kommentar }];
    m.g = jetzt;
    const daten = { item: item.uid, description: this._beschreibung(aend.text != null ? aend.text : item.text, m) };
    if (aend.titel != null && aend.titel !== item.titel) daten.rename = aend.titel;
    if (m.s !== item.m.s || aend.m) daten.status = m.s === "erledigt" ? "completed" : "needs_action";
    if (aend.due !== undefined && aend.due !== item.due) daten.due_date = aend.due;
    try {
      await this._hass.callService("todo", "update_item", daten, { entity_id: this._config.entity });
    } catch (e) {
      if (daten.due_date === null) {   // ältere HA-Versionen kennen das Löschen des Termins nicht
        delete daten.due_date;
        await this._hass.callService("todo", "update_item", daten, { entity_id: this._config.entity });
      } else { alert(e.message || e); }
    }
  }

  async _anlegen(w) {
    const ich = this._ich();
    const jetzt = new Date().toISOString();
    const m = { s: w.s || "neu", p: w.p || 1, h: w.h || 0, a: w.a || "", e: ich.person || ich.name, c: jetzt, g: jetzt,
                v: [{ t: jetzt, w: ich.name, x: this._t.angelegt }] };
    const daten = { item: w.titel, description: this._beschreibung(w.text, m) };
    if (w.due) daten.due_date = w.due;
    await this._hass.callService("todo", "add_item", daten, { entity_id: this._config.entity });
  }

  // ---------- Gerüst & Kopf ----------
  _geruest() {
    this.shadowRoot.innerHTML = `<style>${TB_CSS}</style>
      <ha-card><div class="kopf"></div><div class="board"></div></ha-card><div class="ueber"></div>`;
    this.shadowRoot.querySelector(".board").addEventListener("click", (e) => this._klickBoard(e));
    this._ziehen();
  }

  _kopf() {
    const t = this._t, kopf = this.shadowRoot.querySelector(".kopf");
    const personen = this._config.personen || [];
    const chips = [["alle", t.alle, ""], ["ich", t.ich, ""]].concat(personen.map((p) => [p, this._name(p), p]));
    kopf.innerHTML = `
      <div class="titel"><ha-icon icon="mdi:hammer-screwdriver"></ha-icon><span>${tbEsc(this._config.titel || "Tickets")}</span><b class="zahl"></b></div>
      <div class="werkzeug">
        <div class="filter">${chips.map(([k, n, p]) => `<button class="chip ${this._filter === k ? "an" : ""}" data-f="${tbEsc(k)}">${p ? this._avatar(p, 20) : ""}${tbEsc(n)}</button>`).join("")}</div>
        <input class="suche" type="search" placeholder="${tbEsc(t.suche)}" value="${tbEsc(this._suche)}">
        <button class="plus" title="${tbEsc(t.neu)}"><ha-icon icon="mdi:plus"></ha-icon><span>${tbEsc(t.neu)}</span></button>
      </div>`;
    kopf.querySelectorAll(".chip").forEach((b) => b.addEventListener("click", () => {
      this._filter = b.dataset.f;
      kopf.querySelectorAll(".chip").forEach((x) => x.classList.toggle("an", x === b));
      this._board();
    }));
    kopf.querySelector(".suche").addEventListener("input", (e) => { this._suche = e.target.value; this._board(); });
    kopf.querySelector(".plus").addEventListener("click", () => this._oeffnen(null));
    this._board();
  }

  _name(p) {
    const s = this._hass && this._hass.states[p];
    return s ? (s.attributes.friendly_name || p).split(" ")[0] : p.replace("person.", "");
  }

  _avatar(p, groesse) {
    const s = this._hass && this._hass.states[p];
    if (!p) return "";
    const bild = s && s.attributes.entity_picture;
    const name = s ? (s.attributes.friendly_name || p) : String(p);
    const farbe = ["#4fc3f7", "#f06292", "#81c784", "#ffb74d", "#ba68c8", "#4db6ac"][[...name].reduce((a, c) => a + c.charCodeAt(0), 0) % 6];
    return bild
      ? `<img class="av" style="width:${groesse}px;height:${groesse}px" src="${tbEsc(bild)}" alt="${tbEsc(name)}">`
      : `<span class="av" style="width:${groesse}px;height:${groesse}px;background:${farbe};font-size:${Math.round(groesse * 0.45)}px">${tbEsc(name.trim()[0] || "?")}</span>`;
  }

  // ---------- Board ----------
  _sichtbar(i) {
    const f = this._filter;
    if (f === "ich") { const ich = this._ich(); if (i.m.a !== ich.person && i.m.e !== ich.person && i.m.e !== ich.name) return false; }
    else if (f !== "alle" && i.m.a !== f) return false;
    const q = this._suche.trim().toLowerCase();
    return !q || (i.titel + " " + i.text).toLowerCase().includes(q);
  }

  _board() {
    if (!this._t || !this.shadowRoot) return;
    const board = this.shadowRoot.querySelector(".board");
    if (!board) return;
    const t = this._t;
    const items = this._items.filter((i) => this._sichtbar(i));
    const offen = this._items.filter((i) => i.m.s !== "erledigt").length;
    const zahl = this.shadowRoot.querySelector(".kopf .zahl");
    if (zahl) zahl.textContent = offen ? String(offen) : "";
    board.innerHTML = TB_SPALTEN.map((sp) => {
      let liste = items.filter((i) => i.m.s === sp.key);
      if (sp.key === "erledigt") liste.sort((a, b) => String(b.m.g || "").localeCompare(String(a.m.g || "")));
      else liste.sort((a, b) => (b.m.p - a.m.p) || String(a.due || "9999").localeCompare(String(b.due || "9999")) || String(a.m.c || "").localeCompare(String(b.m.c || "")));
      const gesamt = liste.length;
      const kurz = sp.key === "erledigt" && !this._archivAuf && gesamt > this._config.archiv;
      if (kurz) liste = liste.slice(0, this._config.archiv);
      return `<section class="spalte" data-s="${sp.key}" style="--sf:${sp.farbe}">
        <header><ha-icon icon="${sp.icon}"></ha-icon><span>${tbEsc(t.spalten[sp.key])}</span><b>${gesamt}</b></header>
        <div class="karten">${liste.map((i) => this._karte(i)).join("") || (sp.key === "neu" && !this._items.length ? `<p class="leer">${tbEsc(t.leer)}</p>` : "")}</div>
        ${sp.key === "erledigt" && gesamt > this._config.archiv ? `<button class="mehr">${tbEsc(this._archivAuf ? t.weniger : t.mehr.replace("%n", gesamt))}</button>` : ""}
      </section>`;
    }).join("");
  }

  _faellig(due) {
    if (!due) return "";
    const t = this._t;
    const heute = new Date(); heute.setHours(0, 0, 0, 0);
    const d = new Date(due.length > 10 ? due : due + "T00:00:00");
    const tage = Math.round((new Date(d.getFullYear(), d.getMonth(), d.getDate()) - heute) / 864e5);
    const text = tage < 0 ? t.ueberfaellig : tage === 0 ? t.heute : tage === 1 ? t.morgen : d.toLocaleDateString(this._hass.language || "de", { day: "numeric", month: "numeric" });
    return `<span class="faellig ${tage < 0 ? "rot" : tage <= 1 ? "gelb" : ""}"><ha-icon icon="mdi:calendar-clock"></ha-icon>${tbEsc(text)}</span>`;
  }

  _karte(i) {
    const kommentare = i.m.v.filter((x) => x.k).length;
    const abnahme = i.m.s === "abnahme" && i.m.e && String(i.m.e).startsWith("person.") ? `<span class="abn" title="${tbEsc(this._t.abnahmeDurch)}">${this._avatar(i.m.e, 18)}<ha-icon icon="mdi:check-bold"></ha-icon></span>` : "";
    return `<article class="karte p${i.m.p}" draggable="true" data-uid="${tbEsc(i.uid)}" style="--pf:${TB_PRIO[i.m.p]}">
      <div class="zeile1"><span class="kt">${tbEsc(i.titel)}</span>${i.m.a ? this._avatar(i.m.a, 26) : ""}</div>
      <div class="zeile2">
        ${i.m.p > 1 ? `<span class="prio">${tbEsc(this._t.prio[i.m.p])}</span>` : ""}
        ${this._faellig(i.due)}
        ${i.m.h ? `<span class="herz">${"♥".repeat(i.m.h)}</span>` : ""}
        ${kommentare ? `<span class="kom"><ha-icon icon="mdi:comment-outline"></ha-icon>${kommentare}</span>` : ""}
        ${abnahme}
      </div>
    </article>`;
  }

  _klickBoard(e) {
    if (e.target.closest(".mehr")) { this._archivAuf = !this._archivAuf; this._board(); return; }
    const k = e.target.closest(".karte");
    if (k) this._oeffnen(this._items.find((x) => x.uid === k.dataset.uid));
  }

  _ziehen() {
    const board = this.shadowRoot.querySelector(".board");
    board.addEventListener("dragstart", (e) => {
      const k = e.target.closest(".karte"); if (!k) return;
      e.dataTransfer.setData("text/plain", k.dataset.uid); k.classList.add("zieht");
    });
    board.addEventListener("dragend", (e) => { const k = e.target.closest(".karte"); if (k) k.classList.remove("zieht"); });
    board.addEventListener("dragover", (e) => {
      const sp = e.target.closest(".spalte"); if (!sp) return;
      e.preventDefault();
      board.querySelectorAll(".spalte").forEach((s) => s.classList.toggle("ziel", s === sp));
    });
    board.addEventListener("dragleave", (e) => { if (!e.relatedTarget || !board.contains(e.relatedTarget)) board.querySelectorAll(".ziel").forEach((s) => s.classList.remove("ziel")); });
    board.addEventListener("drop", (e) => {
      const sp = e.target.closest(".spalte"); if (!sp) return;
      e.preventDefault();
      board.querySelectorAll(".ziel").forEach((s) => s.classList.remove("ziel"));
      const item = this._items.find((x) => x.uid === e.dataTransfer.getData("text/plain"));
      if (item && item.m.s !== sp.dataset.s) this._speichern(item, { m: { s: sp.dataset.s } });
    });
  }

  // ---------- Dialog ----------
  _oeffnen(item) {
    const t = this._t, neu = !item;
    const w = neu ? { titel: "", text: "", s: "neu", p: 1, h: 0, a: "", due: null } :
      { titel: item.titel, text: item.text, s: item.m.s, p: item.m.p, h: item.m.h, a: item.m.a || "", due: item.due ? String(item.due).slice(0, 10) : null };
    this._dialog = { uid: neu ? null : item.uid, item, w };
    const ueber = this.shadowRoot.querySelector(".ueber");
    const personen = this._config.personen || [];
    const von = !neu && item.m.e ? (String(item.m.e).startsWith("person.") ? this._name(item.m.e) : item.m.e) : "";
    ueber.innerHTML = `<div class="schleier"></div><div class="dlg" role="dialog">
      <div class="dkopf"><input class="dtitel" placeholder="${tbEsc(t.titel)}" value="${tbEsc(w.titel)}"><button class="zu" title="${tbEsc(t.schliessen)}"><ha-icon icon="mdi:close"></ha-icon></button></div>
      ${von ? `<div class="von">${tbEsc(t.gewuenscht)} ${tbEsc(von)}</div>` : ""}
      <textarea class="dtext" rows="3" placeholder="${tbEsc(t.beschreibung)}">${tbEsc(w.text)}</textarea>
      <label>${tbEsc(t.status)}</label>
      <div class="seg st">${TB_SPALTEN.map((s) => `<button data-v="${s.key}" style="--sf:${s.farbe}" class="${w.s === s.key ? "an" : ""}"><ha-icon icon="${s.icon}"></ha-icon>${tbEsc(t.spalten[s.key])}</button>`).join("")}</div>
      <label>${tbEsc(t.prioritaet)}</label>
      <div class="seg pr">${[1, 2, 3].map((p) => `<button data-v="${p}" style="--sf:${TB_PRIO[p]}" class="${w.p === p ? "an" : ""}">${tbEsc(t.prio[p])}</button>`).join("")}</div>
      ${personen.length ? `<label>${tbEsc(t.zustaendig)}</label>
      <div class="seg pe"><button data-v="" class="${!w.a ? "an" : ""}">${tbEsc(t.niemand)}</button>${personen.map((p) => `<button data-v="${tbEsc(p)}" class="${w.a === p ? "an" : ""}">${this._avatar(p, 20)}${tbEsc(this._name(p))}</button>`).join("")}</div>` : ""}
      <div class="zwei">
        <div><label>${tbEsc(t.faellig)}</label>
          <div class="seg du"><button data-v="">${tbEsc(t.keinTermin)}</button><button data-v="7">${tbEsc(t.woche)}</button><button data-v="14">${tbEsc(t.zweiWochen)}</button><button data-v="30">${tbEsc(t.monat)}</button></div>
          <input class="datum" type="date" value="${tbEsc(w.due || "")}"></div>
        <div><label>${tbEsc(t.herz)}</label><div class="herzen">${[1, 2, 3, 4, 5].map((h) => `<button data-v="${h}" class="${h <= w.h ? "an" : ""}">♥</button>`).join("")}</div></div>
      </div>
      ${neu ? "" : `<label>${tbEsc(t.verlauf)}</label><div class="verlauf"></div>
      <div class="komm"><textarea rows="2" placeholder="${tbEsc(t.kommentar)}"></textarea><button class="senden"><ha-icon icon="mdi:send"></ha-icon></button></div>`}
      <div class="fuss">${neu ? "" : `<button class="weg">${tbEsc(t.loeschen)}</button>`}<span></span><button class="ok">${tbEsc(neu ? t.anlegen : t.speichern)}</button></div>
    </div>`;
    const d = ueber.querySelector(".dlg");
    const seg = (cls, feld, zahl) => d.querySelectorAll(`.${cls} button`).forEach((b) => b.addEventListener("click", () => {
      w[feld] = zahl ? Number(b.dataset.v) : b.dataset.v;
      d.querySelectorAll(`.${cls} button`).forEach((x) => x.classList.toggle("an", x === b));
    }));
    seg("st", "s"); seg("pr", "p", true); seg("pe", "a");
    d.querySelectorAll(".du button").forEach((b) => b.addEventListener("click", () => {
      const v = b.dataset.v;
      if (!v) w.due = null; else { const x = new Date(); x.setDate(x.getDate() + Number(v)); w.due = x.toISOString().slice(0, 10); }
      d.querySelector(".datum").value = w.due || "";
    }));
    d.querySelector(".datum").addEventListener("change", (e) => { w.due = e.target.value || null; });
    d.querySelectorAll(".herzen button").forEach((b) => b.addEventListener("click", () => {
      const v = Number(b.dataset.v); w.h = w.h === v ? 0 : v;
      d.querySelectorAll(".herzen button").forEach((x) => x.classList.toggle("an", Number(x.dataset.v) <= w.h));
    }));
    const zu = () => { ueber.innerHTML = ""; this._dialog = null; };
    ueber.querySelector(".schleier").addEventListener("click", zu);
    d.querySelector(".zu").addEventListener("click", zu);
    d.addEventListener("keydown", (e) => { if (e.key === "Escape") zu(); });
    d.querySelector(".ok").addEventListener("click", async () => {
      w.titel = d.querySelector(".dtitel").value.trim(); w.text = d.querySelector(".dtext").value;
      if (!w.titel) { d.querySelector(".dtitel").focus(); return; }
      if (neu) await this._anlegen(w);
      // immer den aktuellen Stand nehmen – ein Kommentar im offenen Dialog hat das Ticket inzwischen geändert
      else await this._speichern(this._dialog.item || item, { titel: w.titel, text: w.text, due: w.due, m: { s: w.s, p: w.p, h: w.h, a: w.a } });
      zu();
    });
    if (!neu) {
      d.querySelector(".weg").addEventListener("click", async () => {
        if (!confirm(t.loeschenFrage)) return;
        await this._hass.callService("todo", "remove_item", { item: item.uid }, { entity_id: this._config.entity });
        zu();
      });
      d.querySelector(".senden").addEventListener("click", async () => {
        const feld = d.querySelector(".komm textarea"); const k = feld.value.trim(); if (!k) return;
        feld.value = "";
        await this._speichern(this._dialog.item, { kommentar: k });
      });
      this._verlaufZeigen();
    } else { setTimeout(() => d.querySelector(".dtitel").focus(), 50); }
  }

  _verlaufZeigen() {
    const box = this.shadowRoot.querySelector(".ueber .verlauf");
    if (!box || !this._dialog || !this._dialog.item) return;
    const t = this._t;
    const v = [...this._dialog.item.m.v].reverse();
    box.innerHTML = v.map((x) => {
      const wann = new Date(x.t).toLocaleString(this._hass.language || "de", { day: "numeric", month: "numeric", hour: "2-digit", minute: "2-digit" });
      const was = x.k ? `<p>${tbEsc(x.k).replace(/\n/g, "<br>")}</p>` :
        `<i>${x.x && x.x.startsWith("→ ") ? tbEsc(t.statusAuf + " " + (t.spalten[x.x.slice(2)] || x.x.slice(2))) : tbEsc(x.x || "")}</i>`;
      return `<div class="ve ${x.k ? "k" : ""}"><span>${tbEsc(x.w || "")} · ${tbEsc(wann)}</span>${was}</div>`;
    }).join("");
  }

  _fehler(text) {
    const b = this.shadowRoot.querySelector(".board");
    if (b) b.innerHTML = `<p class="fehler">${tbEsc(text)}</p>`;
  }
}

const TB_CSS = `
:host { --tb-glas: rgba(255,255,255,0.045); --tb-rand: rgba(127,127,127,0.18); }
ha-card { padding: 14px 14px 16px; overflow: hidden; }
.kopf .titel { display:flex; align-items:center; gap:10px; font-size:20px; font-weight:600; margin:2px 2px 12px; }
.kopf .titel ha-icon { color: var(--primary-color); }
.kopf .zahl { margin-left:auto; min-width:26px; padding:2px 9px; border-radius:12px; background: var(--primary-color); color: var(--text-primary-color, #fff); font-size:14px; text-align:center; }
.kopf .zahl:empty { display:none; }
.werkzeug { display:flex; flex-wrap:wrap; gap:8px; align-items:center; margin-bottom:12px; }
.filter { display:flex; gap:6px; flex-wrap:wrap; }
.chip { display:inline-flex; align-items:center; gap:6px; border:1px solid var(--tb-rand); background:var(--tb-glas); color:var(--primary-text-color); border-radius:18px; padding:5px 12px; font:inherit; font-size:13px; cursor:pointer; }
.chip.an { background: var(--primary-color); border-color: var(--primary-color); color: var(--text-primary-color, #fff); }
.suche { flex:1; min-width:120px; border:1px solid var(--tb-rand); background:var(--tb-glas); color:var(--primary-text-color); border-radius:18px; padding:7px 14px; font:inherit; font-size:13px; outline:none; }
.plus { display:inline-flex; align-items:center; gap:4px; border:0; background:var(--primary-color); color:var(--text-primary-color,#fff); border-radius:18px; padding:6px 14px 6px 10px; font:inherit; font-size:13px; font-weight:600; cursor:pointer; }
.plus ha-icon { --mdc-icon-size:18px; }
.board { display:grid; grid-auto-flow:column; grid-auto-columns:minmax(220px,1fr); gap:10px; overflow-x:auto; scroll-snap-type:x mandatory; padding-bottom:4px; }
@media (max-width: 600px) { .board { grid-auto-columns: 84%; } .werkzeug .suche { order: 3; flex-basis: 100%; } }
.spalte { scroll-snap-align:start; background:var(--tb-glas); border:1px solid var(--tb-rand); border-radius:16px; padding:10px; min-height:120px; transition: box-shadow .15s, border-color .15s; }
.spalte.ziel { border-color: var(--sf); box-shadow: 0 0 0 2px var(--sf) inset; }
.spalte header { display:flex; align-items:center; gap:8px; font-size:13px; font-weight:600; letter-spacing:.3px; color:var(--sf); margin:2px 2px 10px; text-transform:uppercase; }
.spalte header ha-icon { --mdc-icon-size:18px; }
.spalte header b { margin-left:auto; background:color-mix(in srgb, var(--sf) 22%, transparent); color:var(--primary-text-color); border-radius:10px; padding:1px 8px; font-size:12px; }
.karten { display:flex; flex-direction:column; gap:8px; }
.karte { position:relative; background: var(--ha-card-background, var(--card-background-color)); border:1px solid var(--tb-rand); border-left:4px solid var(--pf); border-radius:12px; padding:10px 10px 9px 11px; cursor:pointer; transition: transform .12s, box-shadow .12s; }
.karte:hover { transform: translateY(-1px); box-shadow: 0 4px 14px rgba(0,0,0,.18); }
.karte.zieht { opacity:.45; }
.karte.p3 { box-shadow: 0 0 0 1px color-mix(in srgb, #ef5350 45%, transparent), 0 0 14px color-mix(in srgb, #ef5350 25%, transparent); }
.zeile1 { display:flex; gap:8px; align-items:flex-start; }
.kt { flex:1; font-size:14px; font-weight:500; line-height:1.3; color:var(--primary-text-color); word-break:break-word; }
.zeile2 { display:flex; flex-wrap:wrap; gap:6px; margin-top:7px; align-items:center; font-size:11.5px; color:var(--secondary-text-color); }
.zeile2:empty { display:none; }
.prio { background: color-mix(in srgb, var(--pf) 20%, transparent); color: var(--pf); border-radius:8px; padding:1px 7px; font-weight:600; }
.faellig, .kom { display:inline-flex; align-items:center; gap:3px; }
.faellig ha-icon, .kom ha-icon { --mdc-icon-size:14px; }
.faellig.rot { color:#ef5350; font-weight:600; } .faellig.gelb { color:#ffb74d; font-weight:600; }
.herz { color:#f06292; letter-spacing:-1px; }
.abn { display:inline-flex; align-items:center; gap:2px; margin-left:auto; color:#81c784; } .abn ha-icon { --mdc-icon-size:14px; }
.av { border-radius:50%; object-fit:cover; flex:none; display:inline-flex; align-items:center; justify-content:center; color:#fff; font-weight:700; }
.leer { color:var(--secondary-text-color); font-size:13px; text-align:center; margin:18px 0; }
.mehr { width:100%; margin-top:8px; border:1px dashed var(--tb-rand); background:none; color:var(--secondary-text-color); border-radius:10px; padding:6px; font:inherit; font-size:12px; cursor:pointer; }
.fehler { color:#ef5350; padding:10px; }
.schleier { position:fixed; inset:0; background:rgba(0,0,0,.5); z-index:9; backdrop-filter: blur(2px); }
.dlg { position:fixed; z-index:10; left:50%; top:50%; transform:translate(-50%,-50%); width:min(560px, calc(100vw - 20px)); max-height:calc(100vh - 30px); overflow:auto; background: var(--ha-card-background, var(--card-background-color, #1c1f26)); color:var(--primary-text-color); border-radius:20px; padding:16px 18px 14px; box-shadow:0 20px 60px rgba(0,0,0,.45); box-sizing:border-box; }
.dkopf { display:flex; gap:8px; align-items:center; }
.dtitel { flex:1; font:inherit; font-size:18px; font-weight:600; border:0; border-bottom:2px solid var(--tb-rand); background:none; color:inherit; padding:6px 2px; outline:none; }
.dtitel:focus { border-bottom-color: var(--primary-color); }
.zu { border:0; background:none; color:var(--secondary-text-color); cursor:pointer; padding:4px; }
.von { font-size:12px; color:var(--secondary-text-color); margin:6px 2px 0; }
.dtext, .komm textarea { width:100%; box-sizing:border-box; margin-top:10px; font:inherit; font-size:14px; border:1px solid var(--tb-rand); border-radius:12px; background:var(--tb-glas); color:inherit; padding:9px 11px; resize:vertical; outline:none; }
.dlg label { display:block; font-size:11.5px; font-weight:600; letter-spacing:.4px; text-transform:uppercase; color:var(--secondary-text-color); margin:14px 2px 6px; }
.seg { display:flex; flex-wrap:wrap; gap:6px; }
.seg button { display:inline-flex; align-items:center; gap:5px; border:1px solid var(--tb-rand); background:var(--tb-glas); color:var(--primary-text-color); border-radius:12px; padding:6px 10px; font:inherit; font-size:12.5px; cursor:pointer; }
.seg button ha-icon { --mdc-icon-size:16px; color: var(--sf, inherit); }
.seg button.an { border-color: var(--sf, var(--primary-color)); background: color-mix(in srgb, var(--sf, var(--primary-color)) 22%, transparent); font-weight:600; }
.zwei { display:grid; grid-template-columns: 1.4fr 1fr; gap:12px; }
@media (max-width: 520px) { .zwei { grid-template-columns: 1fr; } }
.datum { margin-top:6px; font:inherit; font-size:13px; border:1px solid var(--tb-rand); border-radius:10px; background:var(--tb-glas); color:inherit; padding:5px 8px; color-scheme: light dark; }
.herzen button { border:0; background:none; font-size:24px; color:var(--tb-rand); cursor:pointer; padding:0 2px; }
.herzen button.an { color:#f06292; }
.verlauf { display:flex; flex-direction:column; gap:6px; max-height:180px; overflow:auto; }
.ve { font-size:12.5px; color:var(--secondary-text-color); } .ve span { font-size:11px; opacity:.8; }
.ve p { margin:3px 0 0; padding:7px 10px; border-radius:10px; background:var(--tb-glas); color:var(--primary-text-color); }
.ve i { display:block; margin-top:1px; }
.komm { display:flex; gap:6px; align-items:flex-end; } .komm textarea { margin-top:6px; }
.senden { border:0; background:var(--primary-color); color:var(--text-primary-color,#fff); border-radius:12px; padding:9px 11px; cursor:pointer; }
.fuss { display:flex; align-items:center; margin-top:16px; } .fuss span { flex:1; }
.ok { border:0; background:var(--primary-color); color:var(--text-primary-color,#fff); border-radius:14px; padding:9px 22px; font:inherit; font-weight:600; cursor:pointer; }
.weg { border:1px solid color-mix(in srgb, #ef5350 50%, transparent); background:none; color:#ef5350; border-radius:14px; padding:8px 14px; font:inherit; font-size:13px; cursor:pointer; }
`;

customElements.get("ticket-board-card") || customElements.define("ticket-board-card", TicketBoardCard);
window.customCards = window.customCards || [];
if (!window.customCards.find((c) => c.type === "ticket-board-card")) {
  window.customCards.push({ type: "ticket-board-card", name: "Ticket-Board", preview: false,
    description: "Kanban-Board für alles, was im Haus zu tun ist – Daten in einer To-do-Liste.",
    documentationURL: "https://github.com/johnkily/ha-blueprints/blob/main/docs/ticket_board.md" });
}
console.info("%c TICKET-BOARD %c " + TB_VERSION + " ", "background:#1e88e5;color:#fff;border-radius:3px 0 0 3px;padding:1px 4px", "background:#424242;color:#fff;border-radius:0 3px 3px 0;padding:1px 4px");

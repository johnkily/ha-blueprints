# Müll: Kachel-Karte, Erinnerung und Ampel

Alles aus einem Abfallkalender – ohne HACS, ohne `configuration.yaml`:

- **Kachel-Karte** fürs Dashboard: vier Tonnen mit „in 6 Tagen“, darunter zwei Wochen als Mini-Kalender mit farbigen Punkten und „Als Nächstes“.
- **Erinnerung am Vorabend** (Blueprint): „🟦 Papier, 🟨 Gelber Sack – bitte heute Abend rausstellen.“
- **Müll-Ampel** auf der AWTRIX-Pixeluhr (Blueprint): siehe [AWTRIX-Anleitung](awtrix.md#müll-ampel).

![Müll-Kachel-Karte](bilder/muell_kacheln.png)

## 1. Abfallkalender einbinden

Fast jede Stadt oder jeder Entsorger bietet den Abfuhrkalender als **ICS-Datei** oder **Kalender-Abo** an (Suchbegriffe: „Abfallkalender ICS“ + Stadtname).

1. Den Link zur ICS-Datei kopieren (er endet meist auf `.ics`).
2. In Home Assistant: *Einstellungen → Geräte & Dienste → Integration hinzufügen* → **Remote Calendar**.
3. Name „Abfall“ eintragen und den Link einfügen. Der Kalender heißt dann `calendar.abfall`.

Alternativ liefert die HACS-Integration [Waste Collection Schedule](https://github.com/mampfes/hacs_waste_collection_schedule) für sehr viele Städte direkt einen Kalender.

## 2. Kachel-Karte

Die Karte braucht die Termine **je Tonne**. Die sammelt ein Blueprint in einem Text-Helfer.

**a) Helfer anlegen:** *Einstellungen → Geräte & Dienste → Helfer → Helfer erstellen → **Text***. Name **Müll-Plan**, maximale Länge **255**. (Home Assistant nennt ihn dann `input_text.mull_plan` – das „ü“ wird zu „u“.)

**b) Blueprint „Müll – Plan für die Kachel-Karte“:**

[![Importieren](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fmuell%2Fmuell_plan.yaml)

Unter *Einstellungen → Automationen & Szenen → Blueprints* öffnen, **Abfallkalender** und den Helfer **Müll-Plan** auswählen, speichern. Er aktualisiert sich alle drei Stunden, nach Mitternacht und beim Start von Home Assistant.

**c) Karte einfügen:** Dashboard → **Bearbeiten** → **Karte hinzufügen** → ganz unten **Manuell** → alles hineinkopieren → **Speichern**.

```yaml
# Müll-Kachel-Karte für Home Assistant – nur die eingebaute Markdown-Karte, kein HACS.
# Braucht den Text-Helfer „Müll-Plan“ (input_text.mull_plan), den der Blueprint
# „Müll – Plan für die Kachel-Karte“ füllt.
# Einfügen: Dashboard bearbeiten → Karte hinzufügen → ganz unten „Manuell“ →
# alles hier hineinkopieren → Speichern. Heißt dein Helfer anders, Zeile 14 anpassen.
# Anleitung: https://github.com/johnkily/ha-blueprints/blob/main/docs/muell.md
type: markdown
content: |
  {%- set tonnen = {
    'p': {'name': 'Papier', 'icon': 'mdi:package-variant', 'farbe': '#42a5f5'},
    'b': {'name': 'Bio', 'icon': 'mdi:leaf', 'farbe': '#66bb6a'},
    'g': {'name': 'Gelb', 'icon': 'mdi:recycle-variant', 'farbe': '#ffb300'},
    'r': {'name': 'Rest', 'icon': 'mdi:trash-can-outline', 'farbe': '#9e9e9e'}} -%}
  {%- set roh = states('input_text.mull_plan') -%}
  {%- set wt = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'] -%}
  {%- set heute = now().date() -%}
  {%- set teile = roh.split('|') if '|' in roh else ['', ''] -%}
  {%- set ns = namespace(l=[]) -%}
  {%- for x in teile[0].split() if x[0] in tonnen and x[1:] | as_datetime is not none -%}
    {%- set tag = (x[1:] | as_datetime).date() -%}
    {%- set ns.l = ns.l + [{'k': x[0], 'tag': tag, 'tage': (tag - heute).days}] -%}
  {%- endfor -%}
  {%- set liste = ns.l | sort(attribute='tage') -%}
  {%- if liste | count == 0 -%}
  Noch keine Abholtermine – läuft der Blueprint „Müll – Plan für die Kachel-Karte“?
  {%- else -%}
  <table width="100%"><tr>
  {%- for t in liste %}{% set c = tonnen[t.k] %}
  <td align="center" width="25%"><font color="{{ c.farbe }}"><ha-icon icon="{{ c.icon }}"></ha-icon></font><br><b>{{ c.name | upper }}</b><br><font color="{{ c.farbe }}"><b>{% if t.tage <= 0 %}Heute{% elif t.tage == 1 %}Morgen{% else %}{{ t.tage }} Tage{% endif %}</b></font><br><small>{{ wt[t.tag.weekday()] }} {{ t.tag.strftime('%d.%m.') }}</small></td>
  {%- endfor %}
  </tr></table>

  <table width="100%">
  {%- for woche in [0, 7] %}<tr>
  {%- for i in range(woche, woche + 7) %}{% set d = heute + timedelta(days=i) %}
  <td align="center" width="14%"><small>{{ wt[d.weekday()] }}<br>{% if i == 0 %}<b>{{ d.day }}</b>{% else %}{{ d.day }}{% endif %}</small><br>{% for s in teile[1].split() if s[:10] == d.isoformat() and s[10:] in tonnen %}<font color="{{ tonnen[s[10:]].farbe }}">●</font>{% else %}&nbsp;{% endfor %}</td>
  {%- endfor %}</tr>
  {%- endfor %}
  </table>

  {% set n = liste[0] %}{% set c = tonnen[n.k] -%}
  <ha-icon icon="{{ c.icon }}"></ha-icon> Als Nächstes: **{{ c.name }}** · {{ wt[n.tag.weekday()] }} {{ n.tag.strftime('%d.%m.') }} · {% if n.tage <= 0 %}heute{% elif n.tage == 1 %}morgen{% else %}in {{ n.tage }} Tagen{% endif %}
  {%- if n.tage == 1 and now().hour >= 15 %}

  <ha-alert alert-type="warning">Heute Abend rausstellen!</ha-alert>
  {%- endif %}
  {%- endif %}
```

Die Tonnen sind nach der nächsten Abholung sortiert. Nachmittags vor einer Abholung erscheint „Heute Abend rausstellen!“.

### Ohne Helfer: die schlichte Variante

Wer keinen Helfer anlegen möchte: Diese Karte liest den nächsten Termin direkt aus dem Kalender (nur die nächste Tonne, darunter die Wochenliste).

<details><summary>Schlichte Karte anzeigen</summary>

```yaml
# Müll-Karte für Home Assistant – nur eingebaute Karten, kein HACS.
# Einfügen: Dashboard bearbeiten → Karte hinzufügen → ganz unten „Manuell“ →
# alles hier hineinkopieren → in Zeile 11 und 38 „calendar.abfall“ durch deinen
# Abfallkalender ersetzen → Speichern.
# Anleitung: https://github.com/johnkily/ha-blueprints/blob/main/docs/muell.md
type: vertical-stack
cards:
  - type: markdown
    title: 🗑️ Müllabfuhr
    content: |
      {%- set k = 'calendar.abfall' -%}
      {%- set titel = state_attr(k, 'message') -%}
      {%- set beginn = state_attr(k, 'start_time') -%}
      {%- if titel and beginn -%}
      {%- set tag = as_datetime(beginn).date() -%}
      {%- set tage = (tag - now().date()).days -%}
      {%- set t = titel | lower -%}
      {%- if 'papier' in t or 'blau' in t or 'ppk' in t -%}{%- set z = '🟦' -%}
      {%- elif 'gelb' in t or 'wertstoff' in t or 'verpackung' in t -%}{%- set z = '🟨' -%}
      {%- elif 'bio' in t or 'grün' in t or 'braun' in t or 'kompost' in t -%}{%- set z = '🟫' -%}
      {%- elif 'rest' in t or 'grau' in t or 'schwarz' in t -%}{%- set z = '⬛' -%}
      {%- else -%}{%- set z = '🗑️' -%}{%- endif -%}
      {%- set wt = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'][tag.weekday()] %}
      ## {{ z }} {{ titel }}

      **{% if tage <= 0 %}Heute{% elif tage == 1 %}Morgen{% else %}In {{ tage }} Tagen{% endif %}** · {{ wt }}, {{ tag.strftime('%d.%m.') }}
      {% if tage == 1 and now().hour >= 15 %}
      <ha-alert alert-type="warning">Heute Abend rausstellen!</ha-alert>
      {% elif tage <= 0 %}
      <ha-alert alert-type="info">Heute ist Abholung.</ha-alert>
      {% endif %}
      {%- else -%}
      Kein Termin im Kalender.
      {%- endif %}
  - type: calendar
    initial_view: listWeek
    entities:
      - calendar.abfall
```

</details>

## 3. Erinnerung am Vorabend

[![Importieren](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fmuell%2Fmuell_erinnerung.yaml)

*Einstellungen → Automationen & Szenen → Blueprints* → **Müll – Erinnerung am Vorabend**.

| Feld | Was eintragen |
|---|---|
| Abfallkalender | `calendar.abfall` |
| Uhrzeit | Vorgabe 19:00 |
| Handys | wer erinnert werden soll |
| Nur Handys, die zu Hause sind | Vorgabe aus – wer unterwegs ist, weiß dann trotzdem Bescheid |
| Tonnen *(aufklappen)* | Stichwörter je Tonne, falls dein Kalender die Tonnen anders nennt |

Stehen mehrere Tonnen an, kommen alle in eine Nachricht. Einträge, die zu keiner Tonne passen (z. B. „Sperrmüll“), erscheinen mit ihrem eigenen Namen.

## Tonnen und Stichwörter

| Tonne | Farbe | erkannt an (Groß-/Kleinschreibung egal) |
|---|---|---|
| Papier | blau | Papier, Blau, PPK |
| Gelber Sack / Wertstoff | gelb | Gelb, Wertstoff, Verpackung, Leichtverpackung |
| Bio | grün | Bio, Grün, Braun, Kompost |
| Restmüll | grau | Rest, Grau, Schwarz |

Heißen die Termine in deinem Kalender anders, die Stichwörter im Blueprint (Abschnitt *Tonnen*) ergänzen.

## Klappt nicht?

| Problem | Lösung |
|---|---|
| „Noch keine Abholtermine“ | Läuft der Blueprint *Müll – Plan*? Einmal in der Automation oben rechts auf **Ausführen** tippen. Heißt der Helfer anders als `input_text.mull_plan`, in Zeile 14 der Karte anpassen. |
| Eine Tonne fehlt | Der Kalender nennt sie anders – Stichwort ergänzen (siehe oben). |
| Keine Erinnerung | *Automation → Traces*: Ist morgen ein Termin im Kalender? |

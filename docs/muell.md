# Müll: Dashboard-Karte und Erinnerung am Vorabend

Drei Bausteine, alle mit demselben Abfallkalender:

- **Müll-Karte** fürs Dashboard: die nächste Tonne in ihrer Farbe, „Heute / Morgen / In 3 Tagen“, abends ein Hinweis zum Rausstellen – darunter die Termine der Woche. Nur eingebaute Karten, kein HACS.
- **Erinnerung am Vorabend** (Blueprint): „🟦 Papier, 🟨 Gelber Sack – bitte heute Abend rausstellen.“
- **Müll-Ampel** auf der AWTRIX-Pixeluhr (Blueprint): siehe [AWTRIX-Anleitung](awtrix.md#müll-ampel).

## 1. Abfallkalender einbinden

Fast jede Stadt oder jeder Entsorger bietet den Abfuhrkalender als **ICS-Datei** oder **Kalender-Abo** an (Suchbegriffe: „Abfallkalender ICS“ + Stadtname).

1. Den Link zur ICS-Datei kopieren (er endet meist auf `.ics`).
2. In Home Assistant: *Einstellungen → Geräte & Dienste → Integration hinzufügen* → **Remote Calendar**.
3. Name „Abfall“ eintragen und den Link einfügen. Der Kalender heißt dann `calendar.abfall`.

Alternativ liefert die HACS-Integration [Waste Collection Schedule](https://github.com/mampfes/hacs_waste_collection_schedule) für sehr viele Städte direkt einen Kalender.

## 2. Müll-Karte einfügen

1. Dashboard öffnen → oben rechts **Bearbeiten** → **Karte hinzufügen** → ganz unten **Manuell**.
2. Den gesamten Text unten hineinkopieren.
3. Heißt dein Kalender nicht `calendar.abfall`, die zwei Stellen mit `calendar.abfall` anpassen.
4. **Speichern.**

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

So sieht sie aus:

| Fall | Anzeige |
|---|---|
| morgen Papier, nachmittags | 🟦 **Papiertonne** · **Morgen** · Samstag, 24.10. + Hinweis „Heute Abend rausstellen!“ |
| heute Restmüll | ⬛ **Restmülltonne** · **Heute** + „Heute ist Abholung.“ |
| in vier Tagen Bio | 🟫 **Biotonne** · **In 4 Tagen** · Dienstag, 27.10. |

Die Farbe kommt aus dem Titel des Termins: Papier/Blau 🟦, Gelb/Wertstoff/Verpackung 🟨, Bio/Grün/Braun 🟫, Rest/Grau/Schwarz ⬛. Steht an einem Tag mehr als eine Tonne an, zeigt die obere Zeile die erste – die Liste darunter zeigt alle.

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

## Klappt nicht?

| Problem | Lösung |
|---|---|
| Karte zeigt „Kein Termin im Kalender.“ | Stimmt der Name `calendar.abfall`? Unter *Einstellungen → Geräte & Dienste → Entitäten* nach „calendar.“ suchen. |
| Karte zeigt eine falsche Farbe | Der Titel des Termins enthält keines der Stichwörter – im YAML der Karte die Wörter ergänzen. |
| Keine Erinnerung | *Automation → Traces*: Ist morgen ein Termin im Kalender? Ganztägige Termine von morgen werden erkannt. |

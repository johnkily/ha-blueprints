# Monatsrückblick – dein Haus-Wrapped

*[English version](en/monatsrueckblick.md)*

Spotify zeigt einem am Jahresende, was man gehört hat. Dieser Blueprint macht das jeden Monat fürs Haus. Am 1. kommt eine Nachricht mit den Zahlen des letzten Monats, mit Vergleich zum Vormonat und einem Highlight:

```
📊 Dein Haus im November
☀️ PV-Ertrag: 312 kWh (↓ 68 %)
⚡ Netzbezug: 140 kWh (↑ 35 %)
🌡️ Wohnzimmer: Ø 21,3 °C, höchstens 23,8 °C (+0,8 °C)
🚗 Das reicht für 1.733 km im E-Auto
🏆 Größte Veränderung: PV-Ertrag ↓ 68 %
```

Die Zahlen kommen aus der **Langzeitstatistik** von Home Assistant. Du brauchst keine Hilfszähler und kein Skript. Jeder Sensor, der im Energie-Dashboard oder in einem Verlaufs-Diagramm über Monate auftaucht, geht.

## Was du brauchst

| | |
|---|---|
| **Home Assistant 2026.10 oder neuer** | wegen der Aktion `recorder.get_statistics` |
| **Sensoren mit Statistik** | z. B. PV-Ertrag, Netzbezug, Einspeisung, Wärmepumpe, Gas, Wasser, Temperaturen |
| **Handy** *(optional)* | die Home-Assistant-App für die Nachricht |

## 1. Blueprint importieren

[![Importieren](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fhaus%2Fmonatsrueckblick.yaml)

## 2. Automation anlegen

*Einstellungen → Automationen & Szenen → Blueprints* → **Monatsrückblick – dein Haus-Wrapped**

| Feld | Was eintragen |
|---|---|
| Sensoren für den Rückblick | fünf bis acht Sensoren, die Reihenfolge ist die in der Nachricht |
| Uhrzeit am 1. des Monats | Vorgabe 10 Uhr |
| Vergleich zum Vormonat | Pfeil mit Prozent bei Zählern, Differenz bei Messwerten |
| Umrechnen in E-Auto-Kilometer | z. B. der PV-Ertrag, dazu der Verbrauch deines Autos (Vorgabe 18 kWh/100 km) |
| Handys / Auch in Home Assistant / Eigenes Skript | wohin die Nachricht geht |
| Dashboard-Pfad | Antippen der Nachricht öffnet z. B. dein Energie-Dashboard |

**Zum Ausprobieren**, ohne bis zum 1. zu warten: Automation öffnen → ⋮ → **Ausführen**. Dann kommt der Rückblick für den letzten Monat sofort.

## Wie rechnet er?

- **Zähler** (kWh, m³, €, alles, was nur wächst) → Summe im Monat, Vergleich in Prozent.
- **Messwerte** (°C, %, W) → Durchschnitt und Höchstwert, Vergleich als Differenz.
- **Highlight** ist der Zähler mit der größten Veränderung zum Vormonat.
- Sensoren ohne Werte im letzten Monat (z. B. gerade erst angelegt) lässt er einfach weg.
- Das Symbol sucht er selbst aus: ☀️ bei PV/Solar im Namen, 🔋 bei Akku, ⚡ Energie, 🌡️ Temperatur, 💧 Feuchte, 🔥 Gas, 🚿 Wasser, 💶 Geld.

## Klappt nicht?

| Problem | Lösung |
|---|---|
| Ein Sensor fehlt in der Nachricht | Hat er eine Langzeitstatistik? Im Verlauf muss er über Monate zu sehen sein (`state_class` gesetzt). Ganz neue Sensoren haben noch keinen vollen Monat. |
| Werte wirken zu hoch | Zähler, die sich zwischendurch zurücksetzen, brauchen `state_class: total_increasing`. |
| Fehler beim Import | Home Assistant älter als 2026.10 – dort gibt es `recorder.get_statistics` noch nicht. |

---

Unser eigenes Haus-Wrapped ist eine ganze Dashboard-Seite mit Waschgängen, Mähroboter und Tickets – wie es aussieht, steht im Blog: [Kily's World](https://kilysworld.com). Gefällt dir der Blueprint? Ein ⭐ auf [GitHub](https://github.com/johnkily/ha-blueprints) hilft anderen, ihn zu finden.

# Smartladen mit Abfahrtszeit (evcc)

*[English version](en/smartladen.md)*

*📰 Im Blog: [Günstig E-Auto laden: Home Assistant, evcc und Tibber](https://kilysworld.com/2025/11/25/kostengunstig-elektro-auto-fahren-unser-setup-mit-home-assistant-evcc-und-dynamischen-strompreisen/) – wie wir das im Alltag nutzen, mit Fotos*

„Morgen um 7 muss das Auto voll sein“ – und zwar mit dem günstigsten Strom der Nacht. In Home Assistant stellst du Abfahrt und Ladeziel ein, **evcc** sucht sich die günstigsten Viertelstunden aus und lädt bis kurz vor der Abfahrt. Danach lädt die Wallbox wieder wie gewohnt, bei uns nur mit Sonne.

Rechnen tut evcc – es kennt die Preise, die Ladeleistung und das Auto. Home Assistant übergibt nur den Ladeplan und räumt hinterher auf: **100-%-Pläne bleiben in evcc sonst einfach stehen** und laden beim nächsten Mal wieder voll.

## Was du brauchst

| | |
|---|---|
| **evcc** | mit dynamischem Tarif (z. B. Tibber), damit es Preise kennt |
| **Die evcc-Integration** | aus dem Marketplace (früher HACS) [![Im Marketplace öffnen](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=marq24&repository=ha-evcc&category=integration) – sie bringt die Aktionen zum Setzen und Löschen des Plans |
| **Drei Helfer** | Schalter „Smartladen“, Datum/Uhrzeit „Abfahrt“ (mit Datum **und** Uhrzeit), Zahl „Ladeziel“ (20–100, Schritt 5) |

## 1. Helfer anlegen

*Einstellungen → Geräte & Dienste → Helfer → Helfer erstellen* – dreimal: **Schalter** „Smartladen“, **Datum und/oder Uhrzeit** „Abfahrt“ (Datum und Uhrzeit), **Zahl** „Ladeziel“ (Minimum 20, Maximum 100, Schrittweite 5, Einheit %).

## 2. Fahrzeug-Kennung herausfinden

evcc braucht für den Plan die Kennung des Autos. Öffne `http://<deine-evcc-adresse>:7070/api/state` im Browser und suche bei `vehicles` – der Schlüssel vor dem Namen ist die Kennung, z. B. `db:6` für Autos, die in der evcc-Oberfläche angelegt wurden, oder der Name aus der `evcc.yaml`.

## 3. Blueprint importieren

[![Importieren](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fautos%2Fsmartladen.yaml)

| Feld | Was eintragen |
|---|---|
| Fahrzeug in evcc | die Kennung aus Schritt 2 |
| Schalter / Abfahrt / Ladeziel | die Helfer aus Schritt 1 |
| Fertig so viele Minuten vor der Abfahrt | Vorgabe 30 – etwas Luft, falls die Ladung länger dauert |
| Auto angesteckt | optional, z. B. `binary_sensor.…_connected` – steckst du später an, wird der Plan neu übergeben |
| Handys / Eigenes Skript | Nachricht „Plan steht“, „zu nah“ und „Gute Fahrt“ |

## So benutzt du es

Abfahrt und Ladeziel einstellen, Schalter an – fertig. Die drei Helfer passen gut zusammen in eine Karte im Dashboard. Änderst du später Abfahrt oder Ziel, bekommt evcc den neuen Plan. Zur Abfahrtszeit geht der Schalter von selbst aus und der Plan wird gelöscht.

**Abfahrt zu nah?** Liegt das Ladeende weniger als 10 Minuten in der Zukunft, bleibt Smartladen aus und du bekommst Bescheid.

## Klappt nicht?

| Problem | Lösung |
|---|---|
| „Action evcc_intg.set_vehicle_plan not found“ | Die evcc-Integration aus dem Marketplace installieren. |
| Plan wird nicht angenommen | Stimmt die Fahrzeug-Kennung? Hat evcc einen dynamischen Tarif? |
| Lädt sofort statt günstig | In evcc muss der Ladepunkt auf „Smart“ stehen (bei älteren evcc-Versionen „PV“ oder „Min+PV“) – bei „Sofort“ lädt evcc immer gleich. |

---

Gefällt er dir? Ein ⭐ auf [GitHub](https://github.com/johnkily/ha-blueprints) hilft anderen, ihn zu finden.

**Hat's geklappt?** Dann freue ich mich über einen [Kaffee auf Ko-fi ☕](https://ko-fi.com/johnkily).

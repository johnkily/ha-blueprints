# Stumme Geräte melden: leere Batterien finden, bevor etwas schiefgeht

*[English version](en/stumme_geraete.md)*

Ein Fensterkontakt mit leerer Batterie meldet in Home Assistant tagelang „zu“ – und dazu noch 80 % Batterie. Home Assistant zeigt einfach den letzten Wert weiter, denn ein Gerät mit leerer Batterie sagt gar nichts mehr. Bei uns hat der erste Durchlauf fünf Geräte gefunden, die komplett still waren, der älteste seit Januar.

Der Blueprint schaut jede Stunde, wann sich jedes Zigbee-Gerät zuletzt gemeldet hat. Ist das länger her als die Grenze (Vorgabe 48 Stunden), kommt eine Nachricht aufs Handy. Nach dem Batterietausch kommt „Wieder da“. Auf Wunsch gibt es einmal pro Woche eine Übersicht mit allen stummen Geräten und fast leeren Batterien.

Mehr zum Hintergrund im Blog: [Welcher Sensor ist still?](https://kilysworld.com/2026/11/11/welcher-sensor-ist-still-so-findet-home-assistant-leere-batterien-bevor-etwas-schiefgeht/)

## Was du brauchst

| | |
|---|---|
| **Zigbee2MQTT** | mit der Entität „Last seen“ je Gerät (siehe Schritt 1) |
| **Text-Helfer** *(empfohlen)* | damit sich der Blueprint merkt, was er schon gemeldet hat (Schritt 2) |
| **Handy** | für die Nachricht: die Home-Assistant-App |

## 1. „Last seen“ einschalten

1. In Zigbee2MQTT: *Einstellungen → Erweitert → Last seen* auf **ISO_8601** stellen und speichern.
2. In Home Assistant: *Einstellungen → Geräte & Dienste → Entitäten*, oben nach **last seen** suchen. Die Entitäten sind anfangs deaktiviert: alle markieren (Auswahlmodus oben links) → **Aktivieren**. Nach etwa 30 Sekunden sind sie da.

## 2. Text-Helfer anlegen *(empfohlen)*

*Einstellungen → Geräte & Dienste → Helfer → Helfer erstellen → **Text***, Name **Stumme Geräte**, maximale Länge **255**.

Ohne Helfer funktioniert der Blueprint auch, meldet dann aber nur, was in der letzten Stunde neu verstummt ist – kein „Wieder da“, und fällt Zigbee2MQTT ganz aus, bleibt er still statt einmal Bescheid zu sagen.

## 3. Blueprint importieren

[![Importieren](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fzigbee%2Fstumme_geraete.yaml)

## 4. Automation anlegen

*Einstellungen → Automationen & Szenen → Blueprints* → **Stumme Geräte melden (leere Batterie)**.

| Feld | Was eintragen |
|---|---|
| Nachricht an | wessen Handy Bescheid bekommt |
| Still ab | Vorgabe 48 Stunden. Fensterkontakte und Taster funken oft nur alle paar Stunden – kürzer gibt Fehlalarme. |
| Nur Geräte mit Batterie | Vorgabe an. Aus = auch Steckdosen und Lampen prüfen. |
| Text-Helfer „Stumme Geräte“ | der Helfer aus Schritt 2 |
| Wochenübersicht am / um *(aufklappen)* | Vorgabe Samstag, 10 Uhr; „Keine Wochenübersicht“ schaltet sie ab |
| Batterie fast leer unter | für die Wochenübersicht, Vorgabe 15 %; 0 = nicht prüfen |
| Nicht prüfen | „Last seen“ von Geräten, die bewusst lange schweigen dürfen |

## Was du aufs Handy bekommst

| Fall | Nachricht |
|---|---|
| Gerät verstummt | 🔋 **Gerät meldet sich nicht mehr** – Fensterkontakt Bad – vermutlich ist die Batterie leer. |
| Batterie getauscht | ✅ **Wieder da** – Fensterkontakt Bad meldet sich wieder. Danke fürs Batterietauschen! |
| Wochenübersicht | 📋 **Wochenübersicht Batterien** – Still: … Batterie fast leer: Dimmer Flur (8 %). |
| Zigbee2MQTT ausgefallen | ⚠️ **Viele Zigbee-Geräte still** – 12 von 14 Geräten melden sich nicht. Läuft Zigbee2MQTT? Danach einmal ✅ **Zigbee wieder normal**. |

Jede Meldung kommt einmal, nicht stündlich. Fallen mehr als die Hälfte der Geräte gleichzeitig aus, liegt es an Zigbee2MQTT oder am Koordinator, nicht an Batterien – dann kommt nur die eine Ausfall-Meldung. Hängt bei dir öfter der Koordinator, hilft der [Zigbee-Wächter](zigbee_waechter.md).

## Gut zu wissen

- **Neue Geräte kommen von selbst dazu** – der Blueprint nimmt jede „Last seen“-Entität, die es gibt.
- **Zigbee2MQTT-Verfügbarkeit:** Ist sie eingeschaltet, werden stille Batteriegeräte nach 25 Stunden „nicht verfügbar“. Der Blueprint zählt auch das als still.
- **Nach einem Neustart** sind alle Geräte kurz nicht verfügbar – das ignoriert er die ersten 15 Minuten.
- Der Helfer merkt sich bis zu etwa 15 gleichzeitig stumme Geräte.

## Klappt nicht?

| Problem | Lösung |
|---|---|
| Keine Meldung, obwohl ein Gerät still ist | Gibt es die Entität „Last seen“ für das Gerät, und ist sie aktiviert? Steht in Zigbee2MQTT „Last seen“ auf ISO_8601? |
| Gerät ohne Batterie wird nicht geprüft | „Nur Geräte mit Batterie“ ausschalten |
| Ein Gerät meldet sich ständig als still | Es funkt seltener als die Grenze – unter „Nicht prüfen“ eintragen oder die Grenze erhöhen |

**Gefällt dir der Blueprint?** Ein ⭐ auf [GitHub](https://github.com/johnkily/ha-blueprints) hilft anderen, ihn zu finden – und Fragen oder Wünsche gern als [Issue](https://github.com/johnkily/ha-blueprints/issues) oder unter [Ideen](https://github.com/johnkily/ha-blueprints/discussions/categories/ideas).

# AWTRIX-Blueprints – Schritt für Schritt

Vier Blueprints für die Pixeluhr AWTRIX:

- **Strompreis** – eine eigene App auf der Uhr zeigt den aktuellen Preis, z. B. `24,1` in Grün, `29,0` in Gelb, `33,0` in Rot.
- **Akku-Ampel** – eine Ecke der Uhr leuchtet je nach Ladestand: leer rot, halb gelb, voll grün, stufenlos dazwischen.
- **Müll-Ampel** – eine Ecke leuchtet ab dem Vorabend in der Farbe der Tonne, die abgeholt wird; am Abholtag morgens blinkt sie.
- **Tür/Tor offen** – eine Ecke blinkt, solange Garagentor, Hoftor oder Fenster offen sind; auf Wunsch mit Meldung, die stehen bleibt, bis alles zu ist.

Alle lassen sich einzeln nutzen und funktionieren mit mehreren Uhren gleichzeitig.

## Was du brauchst

| | |
|---|---|
| **Uhr** | Ulanzi TC001 Smart Pixel Clock* ([Amazon](https://link.amazon/B06xvJcpa)) mit der kostenlosen Firmware **AWTRIX 3** |
| **MQTT** | Das Add-on **Mosquitto broker** und die Integration **MQTT** in Home Assistant |
| **Strompreis** | Ein Sensor mit dem aktuellen Preis – z. B. aus der Tibber-Integration*, Nordpool oder EPEX Spot. €/kWh und ct/kWh werden beide erkannt. |
| **Akku-Ampel** | Ein Sensor in Prozent, z. B. der Ladestand deines Hausakkus oder E-Autos |
| **Müll-Ampel** | Dein Abfallkalender als Kalender in Home Assistant (siehe [unten](#abfallkalender-einbinden)) |

*Noch kein dynamischer Stromtarif? Mit meinem [Tibber-Einladungslink](https://invite.tibber.com/pu65s7le)\* bekommen wir beide 50 € für den Tibber Store oder 6 Monate ohne Tibber-Gebühr.*

## 1. Uhr vorbereiten (einmalig)

1. **AWTRIX 3 aufspielen:** Uhr per USB-C an den Rechner, im Chrome- oder Edge-Browser den [AWTRIX-3-Flasher](https://blueforcer.github.io/awtrix3/#/flasher) öffnen und den Anweisungen folgen. **Beim ersten Mal das Häkchen „Erase“ setzen**, sonst bleibt die Original-Firmware im Weg. Dauert etwa zwei Minuten.
2. **WLAN:** Die Uhr öffnet danach ein eigenes WLAN „awtrix_…“. Damit verbinden, dein Heim-WLAN eintragen. Die Uhr zeigt anschließend ihre IP-Adresse.
3. **MQTT in Home Assistant:** *Einstellungen → Add-ons → Add-on-Store* → **Mosquitto broker** installieren und starten. Home Assistant bietet danach die Integration **MQTT** an – hinzufügen.
4. **Benutzer für die Uhr:** *Einstellungen → Personen → Benutzer* → neuen Benutzer anlegen, z. B. `awtrix` mit einem Passwort. (Mosquitto nimmt die Benutzer von Home Assistant.)
5. **Uhr mit MQTT verbinden:** Die IP der Uhr im Browser öffnen → **MQTT**:
   - Broker: IP-Adresse deines Home Assistant
   - Port: `1883`
   - Benutzer und Passwort aus Schritt 4
   - **Prefix** merken (z. B. `awtrix_a1b2c3`) – das ist der *MQTT-Name der Uhr*, den die Blueprints brauchen.

   Speichern, die Uhr startet neu. In Home Assistant erscheint sie jetzt als Gerät unter *MQTT*.

## 2. Blueprint importieren

| Strompreis | Akku-Ampel | Müll-Ampel |
|---|---|---|
| [![Importieren](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fawtrix%2Fstrompreis.yaml) | [![Importieren](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fawtrix%2Fakku_ampel.yaml) | [![Importieren](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fawtrix%2Fmuell_ampel.yaml) |

Knopf antippen → **„Blueprint importieren“**.

Fragen und Erfahrungen zum Strompreis-Blueprint: [Thema im Home-Assistant-Forum](https://community.home-assistant.io/t/awtrix-3-current-electricity-price-in-traffic-light-colours-works-with-any-price-sensor-tibber-nordpool-epex/1030093) (Englisch).

## 3. Automation anlegen

*Einstellungen → Automationen & Szenen → Blueprints* → Blueprint antippen.

### Strompreis

| Feld | Was eintragen |
|---|---|
| Strompreis-Sensor | dein Preissensor, z. B. „Strompreis“ von Tibber |
| MQTT-Name der Uhr(en) | der Prefix aus Schritt 1.5 – mehrere Uhren mit Komma: `awtrix_a1b2c3, awtrix_d4e5f6` |
| Grün bis / Rot ab | deine Preisgrenzen in ct/kWh (Vorgabe: grün bis 25, rot ab 33) |
| Nachkommastellen | 1 passt gut auf die Uhr; mit Icon sind 2 Nachkommastellen eng |
| Icons (optional) | ein Icon, das auf der Uhr liegt (siehe unten); leer lassen geht auch |
| Anzeigedauer | Sekunden pro Durchlauf (Vorgabe 10) |

Der Preis wird bei jeder Änderung und zusätzlich alle 15 Minuten neu geschickt. Meldet sich der Sensor 30 Minuten nicht, verschwindet die App, statt einen veralteten Preis zu zeigen.

### Akku-Ampel

| Feld | Was eintragen |
|---|---|
| Ladestand-Sensor | z. B. „Batterie Ladezustand“ deines Wechselrichters |
| MQTT-Name der Uhr(en) | wie oben |
| Ecke | eine der drei Ecken rechts (Vorgabe: Mitte) |

**Speichern** – fertig. Die Uhr reagiert beim nächsten neuen Wert, spätestens nach einem Neustart von Home Assistant.

### Müll-Ampel

| Feld | Was eintragen |
|---|---|
| Abfallkalender | dein Abfallkalender (siehe nächster Abschnitt) |
| MQTT-Name der Uhr(en) | wie oben |
| Ecke | Vorgabe: oben rechts. Nicht dieselbe Ecke wie die Akku-Ampel nehmen. |
| Anzeigen ab / bis | Vorgabe: ab 15 Uhr am Vortag bis 10 Uhr am Abholtag |
| Am Abholtag blinken | morgens als Erinnerung, dass die Tonne raus muss |
| Tonnen *(aufklappen)* | Welche Wörter im Kalendereintrag zu welcher Tonne gehören, und die Farben. Die Vorgaben (Rest/Grau, Papier/Blau, Gelb/Wertstoff, Bio/Braun …) passen für die meisten Städte. Heißt es bei dir anders, z. B. „Altpapier-Tonne“, reicht das Wort „Papier“. |

Die Ampel prüft alle 10 Minuten. Stehen zwei Tonnen am selben Tag an, zeigt sie die erste aus der Liste.

Fragen und Erfahrungen gern im [Home-Assistant-Forum](https://community.home-assistant.io/t/awtrix-3-waste-bin-indicator-corner-lights-up-in-the-colour-of-tomorrows-bin-from-any-waste-calendar-ics/1030267).

### Tür/Tor offen

[![Importieren](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fawtrix%2Foffen_warnung.yaml)

| Feld | Was eintragen |
|---|---|
| Türen, Tore, Fenster | die Sensoren, z. B. Garagentor und Hoftor (Binärsensoren oder Tore/Rollläden) |
| MQTT-Name der Uhr(en) | wie oben |
| Erst warnen nach | z. B. 5 Minuten – dann warnt die Uhr nicht, wenn das Garagentor beim Rausfahren kurz offen steht. 0 = sofort. |
| Ecke, Farbe, Blinken | Vorgabe: oben rechts, rot, 500 ms. 0 ms = leuchtet dauerhaft. |
| Zusätzlich Meldung anzeigen | Meldung „OFFEN: Garagentor“, die im Vordergrund bleibt, bis alles wieder zu ist (oder jemand die mittlere Taste drückt). Weckt auf Wunsch auch eine ausgeschaltete Uhr. |

Sind mehrere offen, nennt die Meldung alle; die Ecke bleibt rot, bis das letzte zu ist. Die Uhr läuft dabei ganz normal weiter durch ihre Anzeigen.

## Abfallkalender einbinden

Fast jede Stadt oder jeder Entsorger bietet den Abfuhrkalender als **ICS-Datei** oder **Kalender-Abo** an (Suchbegriffe: „Abfallkalender ICS“ + Stadtname).

1. Den Link zur ICS-Datei kopieren (er endet meist auf `.ics`).
2. In Home Assistant: *Einstellungen → Geräte & Dienste → Integration hinzufügen* → **Remote Calendar**.
3. Einen Namen vergeben (z. B. „Abfall“) und den Link einfügen. Fertig – der Kalender heißt dann `calendar.abfall`.

Alternativ liefert die HACS-Integration [Waste Collection Schedule](https://github.com/mampfes/hacs_waste_collection_schedule) für sehr viele Städte direkt einen Kalender.

## Icons auf die Uhr laden

AWTRIX zeigt nur Icons, die auf der Uhr gespeichert sind:

1. In der [LaMetric-Icon-Galerie](https://developer.lametric.com/icons) ein Icon suchen, die Nummer merken (z. B. `53295`).
2. Weboberfläche der Uhr → **Icons** → Nummer eintragen → herunterladen.
3. Die Nummer im Blueprint ins Icon-Feld eintragen.

## Klappt nicht?

| Problem | Lösung |
|---|---|
| Uhr zeigt nichts | Stimmt der **Prefix** exakt (Groß-/Kleinschreibung)? Ist die Uhr unter *Einstellungen → Geräte → MQTT* zu sehen? |
| Preis ist 100-mal zu groß oder zu klein | Welche Einheit zeigt dein Sensor? Erkannt werden alles mit „ct“ oder „Cent“ als Cent, alles andere als Euro. Bitte ein Issue anlegen, wenn dein Sensor anders heißt. |
| Icon fehlt | Das Icon ist nicht auf der Uhr gespeichert – siehe oben. |
| Müll-Ampel bleibt dunkel | Steht morgen wirklich ein Termin im Kalender? Kommt eines der Stichwörter im Titel des Termins vor? Ist es schon nach dem „Anzeigen bis“ am Abholtag? |
| Automation läuft nicht | Automation öffnen → **Traces** (oben rechts) zeigt, woran es hängt. |

---

*Mit \* gekennzeichnete Links sind Affiliate-Links. Kaufst du darüber, bekomme ich eine kleine Provision, für dich ändert sich am Preis nichts. Als Amazon-Partner verdiene ich an qualifizierten Verkäufen.*

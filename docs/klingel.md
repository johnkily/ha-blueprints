# Klingel-Blueprint – Schritt für Schritt

Klingelt es, kommt sofort eine Nachricht aufs Handy – mit einem Bild von der Tür, wenn du eine Kamera hast. Dazu braucht es keine neue Video-Klingel: Ein Vibrationssensor am alten Gong reicht.

## Was du brauchst

| | |
|---|---|
| **Sensor** | Irgendetwas, das beim Klingeln „an“ meldet. Am einfachsten: ein **Zigbee-Vibrationssensor** (z. B. von Aqara oder Tuya, ca. 10 €), mit doppelseitigem Klebeband innen auf den Gong geklebt. Ein smarter Klingeltaster oder ein Kontakt am Klingeltrafo geht genauso. |
| **Handy** | Die **Home-Assistant-App** auf jedem Handy, das benachrichtigt werden soll, angemeldet an deinem Home Assistant. |
| **Kamera** *(optional)* | Jede Kamera, die in Home Assistant eingebunden ist. Schwenkbare Kameras (z. B. Reolink) kann der Blueprint vorher auf die Tür drehen. |

## 1. Sensor einrichten

1. Sensor in Home Assistant einbinden (Zigbee2MQTT oder ZHA → *Gerät hinzufügen*).
2. Auf den Gong kleben – dort, wo es beim Klingeln am meisten schwingt, meist am Gehäuse neben der Glocke.
3. **Empfindlichkeit** in den Geräteeinstellungen auf *hoch* stellen, falls es sie gibt.
4. Einmal klingeln und unter *Einstellungen → Geräte* prüfen: Der Sensor muss kurz auf **„Erkannt“** springen.

## 2. Blueprint importieren

[![Importieren](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fklingel%2Fklingel_handy.yaml)

Knopf antippen → **„Blueprint importieren“**.

## 3. Automation anlegen

*Einstellungen → Automationen & Szenen → Blueprints* → **Klingel – Nachricht mit Kamerabild aufs Handy**.

| Feld | Was eintragen |
|---|---|
| Klingel-Sensor | dein Vibrationssensor (die Entität, die „Erkannt“ meldet) |
| Handys | ein oder mehrere Handys mit der Home-Assistant-App |
| Kamera | die Kamera über der Tür – oder leer lassen |
| Titel / Text | was in der Nachricht stehen soll |
| Beim Antippen öffnen | z. B. `/lovelace/kamera`, wenn du ein Dashboard mit Livebild hast |
| Kamera schwenken | nur bei schwenkbaren Kameras: die Auswahl der Positionen (bei Reolink „PTZ-Voreinstellung“) und der Name der Position, z. B. `Haustür` |
| Wartezeit | Sekunden, bis die Kamera ausgerichtet ist (Vorgabe 2) |
| Sperrzeit | so lange wird nach einem Klingeln nicht erneut gemeldet (Vorgabe 30 s) – Vibrationssensoren melden ein Klingeln oft mehrfach |
| Zusätzliche Aktionen | alles, was außerdem passieren soll (siehe unten) |

**Speichern** – fertig. Einmal klingeln zum Testen.

Das Bild holt die App direkt bei Home Assistant, im Moment, in dem die Nachricht ankommt. Es wird nichts auf der Festplatte gespeichert.

## Zusätzliche Aktionen – Ideen

Im Feld *Zusätzliche Aktionen* auf **„Aktion hinzufügen“** tippen:

- **Tablet aufwecken:** *Schalter einschalten* → der Bildschirm-Schalter deines Tablets (z. B. aus der Fully-Kiosk-Integration).
- **Livebild als Pop-up auf dem Tablet:** *Browser Mod: Popup* (Integration [Browser Mod](https://github.com/thomasloven/hass-browser_mod) aus HACS) mit einer Picture-Entity-Karte deiner Kamera.
- **Ansage:** *Text-to-Speech* auf einem Lautsprecher: „Es hat geklingelt.“
- **Licht im Flur an**, wenn es dunkel ist.

## Klappt nicht?

| Problem | Lösung |
|---|---|
| Keine Nachricht | *Automation → Traces* (oben rechts) zeigt, ob sie überhaupt gestartet ist. Startet sie nicht: Springt der Sensor beim Klingeln wirklich auf „an“? |
| Startet, aber keine Nachricht | Unter *Entwicklerwerkzeuge → Aktionen* nach `notify.mobile_app_` suchen. Heißt dein Handy dort anders als in der Geräteliste (weil es in der App umbenannt wurde), die App einmal ab- und wieder anmelden. |
| Nachricht ohne Bild | Ist die Kamera in Home Assistant zu sehen? Auf iPhones das Bild lange drücken, dann erscheint es groß. |
| Meldet ein Klingeln mehrfach | Sperrzeit erhöhen. |
| Meldet ohne Klingeln (Türenknallen, Lkw) | Empfindlichkeit des Sensors senken oder einen anderen Platz am Gong suchen. |

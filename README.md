<p align="center"><img src="docs/bilder/logo.png" width="96" alt="Kily's World"></p>

# Home-Assistant-Blueprints aus Kily's World

Fertige Automationen für [Home Assistant](https://www.home-assistant.io/) – mit einem Klick importieren, Geräte auswählen, fertig. Kein YAML, kein Kopieren von Code.

🇬🇧 *English: guides and overview [below](#english).*

Sortiert nach den Seiten unseres Dashboards. Wie es bei uns aussieht und was noch kommt, steht im Blog: **[Kily's World – Unser Dashboard](https://kilysworld.com/dashboard/)**.

## Übersicht

Die Startseite: Strompreis, Müll, Hausgeräte – und alles, was auf den AWTRIX-Pixeluhren landet.

<p><img src="docs/bilder/awtrix_uhr.gif" width="49%" alt="AWTRIX-Uhr mit Strompreis-App und Eck-Ampeln"> <img src="docs/bilder/muell_karte.gif" width="49%" alt="Müll-Kachel-Karte, die morgige Tonne wackelt"></p>

| Blueprint | Was er macht | Importieren |
|---|---|---|
| **AWTRIX – aktueller Strompreis** | Zeigt den Strompreis auf der Pixeluhr, grün/gelb/rot je nach Preis | [![Importieren](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fawtrix%2Fstrompreis.yaml) |
| **AWTRIX – Akku-Ampel in der Ecke** | Färbt eine Ecke der Uhr nach dem Akkustand, von Rot über Gelb nach Grün | [![Importieren](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fawtrix%2Fakku_ampel.yaml) |
| **AWTRIX – Müll-Ampel in der Ecke** | Eine Ecke leuchtet in der Farbe der Tonne, die morgen abgeholt wird – aus jedem Abfallkalender | [![Importieren](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fawtrix%2Fmuell_ampel.yaml) |
| **Waschmaschine, Trockner & Co. – fertig melden** | Nachricht aufs Handy, wenn das Gerät fertig ist – erkannt über eine Steckdose mit Strommessung, mit Erinnerung, wenn die Wäsche noch drin ist | [![Importieren](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fgeraete%2Fgeraet_fertig.yaml) |
| **Müll – Erinnerung am Vorabend** | „🟦 Papier, 🟨 Gelber Sack – bitte heute Abend rausstellen.“ aus jedem Abfallkalender | [![Importieren](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fmuell%2Fmuell_erinnerung.yaml) |
| **Müll – Plan für die Kachel-Karte** | Sammelt die Termine je Tonne für die Müll-Kachel-Karte | [![Importieren](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fmuell%2Fmuell_plan.yaml) |
| **Monatsrückblick – dein Haus-Wrapped** | Am 1. eine Nachricht mit den Zahlen des letzten Monats: PV, Netz, Verbrauch, Temperaturen – mit Vergleich zum Vormonat, Highlight und auf Wunsch „reicht für X km im E-Auto“. Aus der Langzeitstatistik, ohne Hilfszähler. Dazu die [Haus-Wrapped-Karte](docs/monatsrueckblick.md#profi-die-haus-wrapped-karte) als Profi-Variante | [![Importieren](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fhaus%2Fmonatsrueckblick.yaml) |

**Energie:** die [Prognose mit Preisband](docs/energie_prognose.md) – Strompreis als farbiges Band mit den günstigsten Stunden, Solar-Prognose und Tageskurve.

**Unsere Optik zum Nachbauen:** das [Glas-Kit](docs/glas_karten.md) – button-card-Vorlagen für Glas-Kacheln, Licht in Lampenfarbe, Fenster mit Puls und eine Statusleiste.

**Dazu passend:** die [Müll-Kachel-Karte fürs Dashboard](docs/muell.md#2-kachel-karte) – nur eingebaute Karten, zum Einfügen per Kopieren – und die [Profi-Variante](docs/muell.md#profi-variante-unsere-karte-mit-button-card) mit button-card, so wie bei uns.

## Kamera

| Blueprint | Was er macht | Importieren |
|---|---|---|
| **Klingel – Nachricht mit Kamerabild** | Klingelt es, kommt eine Nachricht mit Bild von der Tür aufs Handy – auch mit einem 10-€-Vibrationssensor am alten Gong | [![Importieren](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fklingel%2Fklingel_handy.yaml) |
| **Klingel aufs TV – Bild-im-Bild** | Klingelt es, während der Fernseher läuft, pausiert der Film und die Haustür erscheint als Bild-im-Bild, mit „Weiterschauen“ und „Bild schließen“ (App QuickBars auf Android TV) | [![Importieren](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fklingel%2Fklingel_tv.yaml) |

## Autos

| Blueprint | Was er macht | Importieren |
|---|---|---|
| **Willkommenslicht – in der Farbe der Person** | Kommt jemand heim, leuchtet das Licht im Eingang in seiner Farbe (bei uns die Farbe des Autos), kommen zwei, wechseln die Farben; danach wieder wie vorher | [![Importieren](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Flicht%2Fwillkommenslicht.yaml) |
| **Smartladen mit Abfahrtszeit (evcc)** | Abfahrt und Ladeziel in Home Assistant einstellen, evcc lädt in den günstigsten Viertelstunden – zur Abfahrt wird der Plan wieder gelöscht, später angesteckt wird nachgezogen | [![Importieren](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fautos%2Fsmartladen.yaml) |

[Was noch kommt](https://kilysworld.com/dashboard/#cars)

## Automatisierung

| Blueprint | Was er macht | Importieren |
|---|---|---|
| **Sonnenschutz je Fassade** | Rollos runter, wenn die Sonne wirklich auf die Seite scheint und es warm ist – hoch erst, wenn sie weg ist. Kein Jo-Jo bei Wolken | [![Importieren](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fbeschattung%2Fsonnenschutz.yaml) |
| **Türen abschließen, wenn niemand zu Hause ist** | Sind alle weg, schließen die smarten Schlösser nach 30 Minuten ab – eine offen stehende Tür wird nicht verriegelt, sondern gemeldet. Mit Schalter für Gäste | [![Importieren](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fsicherheit%2Ftueren_abschliessen.yaml) |
| **Gute Nacht per Sprachbefehl** | „Hey Google, gute Nacht“ schaltet einen Helfer, Home Assistant macht den Rest: Lichter aus, Rollos zu, abschließen (nur bei geschlossener Tür), Flurlicht noch ein paar Minuten an. Offene Fenster sagt der Lautsprecher an. Optional Frost-, Hitze- und Gästemodus | [![Importieren](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fhaus%2Fgute_nacht.yaml) |
| **Licht- und Radiowecker** | Sonnenaufgang am Bett (rot → orange → warmweiß) vor der Weckzeit, dann das Radio – nur an Arbeitstagen, nicht im Urlaub, Abbruch durch Ausschalten, danach gedimmt aus | [![Importieren](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Flicht%2Fwecker.yaml) |
| **AWTRIX – Warnung, solange Tür oder Tor offen ist** | Eine Ecke blinkt, solange Garagentor oder Hoftor offen sind – auf Wunsch mit Meldung, die bis zum Schließen stehen bleibt | [![Importieren](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fawtrix%2Foffen_warnung.yaml) |
| **Zigbee-Wächter** | Hängt der Zigbee-Koordinator, startet Home Assistant Chip und Zigbee2MQTT selbst neu und sagt Bescheid – fragt dafür alle 5 Minuten aktiv nach, statt auf Stille zu warten | [![Importieren](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fzigbee%2Fzigbee_waechter.yaml) |
| **Stumme Geräte melden** | Meldet Zigbee-Geräte, die sich nicht mehr melden – meist ist die Batterie leer, Home Assistant zeigt aber weiter den letzten Wert. Nach dem Tausch „Wieder da“, auf Wunsch Wochenübersicht | [![Importieren](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fzigbee%2Fstumme_geraete.yaml) |

➡️ **Schritt-für-Schritt-Anleitungen:** [AWTRIX-Blueprints](docs/awtrix.md) · [Klingel](docs/klingel.md) · [Klingel aufs TV](docs/klingel_tv.md) · [Sonnenschutz](docs/sonnenschutz.md) · [Waschmaschine & Co.](docs/geraet_fertig.md) · [Müll](docs/muell.md) · [Türen abschließen](docs/tueren_abschliessen.md) · [Zigbee-Wächter](docs/zigbee_waechter.md) · [Stumme Geräte](docs/stumme_geraete.md) · [Gute Nacht](docs/gute_nacht.md) · [Wecker](docs/wecker.md) · [Smartladen](docs/smartladen.md) · [Monatsrückblick](docs/monatsrueckblick.md)

**Was soll als Nächstes kommen?** Wünsche gern unter [Ideen](https://github.com/johnkily/ha-blueprints/discussions/categories/ideas) oder in den Kommentaren im Blog.

## Hausmeisterei

Unser Ticketsystem für alles, was im Haus zu tun ist – zum Nachbauen in drei Stufen, ganz ohne Skripte: einfach mit To-do-Listen, als Profi-Board und mit Erinnerungen. [Anleitung](docs/ticket_board.md)

<p><img src="docs/bilder/ticketboard_desktop.png" width="100%" alt="Ticket-Board mit fünf Spalten"></p>

| Baustein | Was er macht | Importieren / Anleitung |
|---|---|---|
| **Ticket-Board einfach – Abhaken schiebt weiter** | Board aus zwei oder drei To-do-Listen mit eingebauten Karten: Abhaken schiebt einen Eintrag in die nächste Spalte, auf Wunsch mit Nachricht. Nichts zu installieren | [![Importieren](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Ftickets%2Fticket_board_einfach.yaml) |
| **Ticket-Board** | Kanban-Board für Wünsche und Aufgaben: Spalten, Priorität, Zuständige mit Foto, Fälligkeit, Herzchen, Verlauf und Abnahme. Daten in einer normalen To-do-Liste von Home Assistant. Installation über den Marketplace | [![Marketplace](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=johnkily&repository=ticket-board-card&category=plugin) [So geht's](docs/ticket_board.md) |
| **Ticket-Board – Erinnerungen** | Ergänzung zur Karte: jeden Morgen eine Nachricht mit Fälligem, Überfälligem, wartenden Abnahmen und liegengebliebenen „Brennt“-Tickets, jeder Zuständige bekommt seine eigenen. Neue „Brennt“-Tickets sofort | [![Importieren](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Ftickets%2Fticket_board_erinnerungen.yaml) |

## So funktioniert der Import

1. Auf den blauen Knopf **„Importieren“** klicken. Beim ersten Mal fragt die Seite nach der Adresse deines Home Assistant – eintragen, merken lassen.
2. In Home Assistant öffnet sich der Import-Dialog → **„Blueprint importieren“**.
3. Unter *Einstellungen → Automationen & Szenen → Blueprints* den Blueprint antippen, Geräte auswählen, **Speichern**.

**Aktualisieren:** Kommt eine neue Version, unter *Blueprints* auf die drei Punkte → **„Blueprint erneut importieren“**. Deine Einstellungen bleiben erhalten.

## Unterstützen

Alles hier ist kostenlos und bleibt es. Wenn dir ein Blueprint Zeit oder Strom spart, freue ich mich über einen Kaffee:

[![Unterstütze mich auf Ko-fi](https://storage.ko-fi.com/cdn/kofi2.png?v=3)](https://ko-fi.com/johnkily)

Oder einfach den Blog weiterempfehlen – und hier oben rechts einen ⭐ dalassen. Das hilft anderen, die Blueprints zu finden.

## Im Home-Assistant-Forum

- [AWTRIX 3 – current electricity price in traffic-light colours](https://community.home-assistant.io/t/awtrix-3-current-electricity-price-in-traffic-light-colours-works-with-any-price-sensor-tibber-nordpool-epex/1030093)
- [AWTRIX 3 – waste bin indicator from any waste calendar](https://community.home-assistant.io/t/awtrix-3-waste-bin-indicator-corner-lights-up-in-the-colour-of-tomorrows-bin-from-any-waste-calendar-ics/1030267)
- [Waste collection dashboard from any calendar – next pickup per bin, no HACS](https://community.home-assistant.io/t/waste-collection-dashboard-from-any-calendar-ics-next-pickup-per-bin-two-week-strip-no-hacs-needed/1030765)

## Probleme oder Ideen?

Bitte ein [Issue](https://github.com/johnkily/ha-blueprints/issues) anlegen – mit Home-Assistant-Version und dem, was du erwartet hättest.

---

*Mit \* gekennzeichnete Links sind Affiliate-Links. Kaufst du darüber, bekomme ich eine kleine Provision, für dich ändert sich am Preis nichts. Als Amazon-Partner verdiene ich an qualifizierten Verkäufen.*

## English

Ready-made Home Assistant automations: click **Import**, pick your devices, done. Like them? [Buy me a coffee on Ko-fi](https://ko-fi.com/johnkily).

**Step-by-step guides in English:** [AWTRIX blueprints](docs/en/awtrix.md) · [Doorbell](docs/en/klingel.md) · [Doorbell on the TV](docs/en/klingel_tv.md) · [Sun protection](docs/en/sonnenschutz.md) · [Washing machine & co.](docs/en/geraet_fertig.md) · [Waste bins](docs/en/muell.md) (with an English tile card) · [Lock the doors](docs/en/tueren_abschliessen.md) · [Zigbee watchdog](docs/en/zigbee_waechter.md) · [Silent devices](docs/en/stumme_geraete.md) · [Welcome light](docs/en/willkommenslicht.md) · [Good night](docs/en/gute_nacht.md) · [Alarm clock](docs/en/wecker.md) · [Smart charging](docs/en/smartladen.md) · [Monthly review](docs/en/monatsrueckblick.md) · [Glass kit for cards](docs/en/glas_karten.md) · [Forecast with price band](docs/en/energie_prognose.md) · [Ticket board card](docs/en/ticket_board.md)

| Blueprint | What it does | Import |
|---|---|---|
| AWTRIX – current electricity price | Current electricity price on the pixel clock, green/yellow/red | [![Import](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fen%2Fawtrix%2Felectricity_price.yaml) |
| AWTRIX – battery traffic light in the corner *(German labels)* | A corner of the clock shows the battery level, red → yellow → green | [![Import](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fawtrix%2Fakku_ampel.yaml) |
| AWTRIX – waste bin indicator in the corner | A corner lights up in the colour of tomorrow's bin, from any waste calendar | [![Import](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fen%2Fawtrix%2Fwaste_bin_indicator.yaml) |
| AWTRIX – warning while a door or gate is open *(German labels)* | A corner blinks while the garage door or gate is open, optional notification on the clock | [![Import](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fawtrix%2Foffen_warnung.yaml) |
| Doorbell – notification with camera picture *(German labels)* | Doorbell rings → notification with a camera picture, works with a 10 € vibration sensor on an old chime | [![Import](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fklingel%2Fklingel_handy.yaml) |
| Doorbell on the TV – picture-in-picture *(German labels)* | Doorbell rings while the TV is on → playback pauses, the door camera shows as picture-in-picture with "continue" / "close" buttons (QuickBars app on Android TV) | [![Import](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fklingel%2Fklingel_tv.yaml) |
| Sun protection per facade *(German labels)* | Blinds go down when the sun really hits that side of the house – no up and down with every cloud | [![Import](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fbeschattung%2Fsonnenschutz.yaml) |
| Washing machine, dryer & co. – done notification *(German labels)* | Notification when the appliance is done, detected via a power-metering plug | [![Import](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fgeraete%2Fgeraet_fertig.yaml) |
| Waste – plan for the tile card | Data for the waste bin tile card: next pickup per bin and a two-week strip | [![Import](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fen%2Fwaste%2Fwaste_plan.yaml) |
| Waste – reminder the evening before | Notification the evening before a pickup, several bins in one message | [![Import](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fen%2Fwaste%2Fwaste_reminder.yaml) |
| Lock doors when nobody is home | Locks the smart locks once everybody has left – doors that are open are reported, not bolted | [![Import](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fen%2Fsecurity%2Flock_doors_when_away.yaml) |
| Zigbee watchdog – restart a stuck coordinator *(German labels)* | If the Zigbee coordinator gets stuck, restarts the chip and Zigbee2MQTT and notifies you – asks a device every 5 minutes instead of waiting for silence | [![Import](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fzigbee%2Fzigbee_waechter.yaml) |
| Report silent devices (empty battery) | Notifies when Zigbee devices stop reporting – usually an empty battery, while Home Assistant keeps showing the last value. “Back again” after the swap, optional weekly overview | [![Import](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fen%2Fzigbee%2Fsilent_devices.yaml) |
| Welcome light in each person's colour *(German labels)* | Someone comes home → the entrance light glows in their colour (ours: the car colour), two people → alternating colours, then back to before | [![Import](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Flicht%2Fwillkommenslicht.yaml) |
| Good night by voice command *(German labels, English announcements)* | “Hey Google, good night” switches a helper, Home Assistant does the rest: lights off, blinds down, locks (only if the door is closed), path light for a few minutes. Open windows are announced | [![Import](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fhaus%2Fgute_nacht.yaml) |
| Light and radio alarm clock *(German labels)* | Sunrise at the bed (red → orange → warm white) before the alarm, then the radio – workdays only, not on holiday, stops when you switch the light off, dims before turning off | [![Import](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Flicht%2Fwecker.yaml) |
| Smart charging with departure time (evcc) *(German labels)* | Set departure and target in Home Assistant, evcc charges in the cheapest quarter hours – the plan is deleted at departure | [![Import](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fautos%2Fsmartladen.yaml) |
| Monthly review – your home's “Wrapped” *(German labels, English messages)* | On the 1st a message with last month's numbers: PV, grid, consumption, temperatures – compared to the month before, with a highlight and optional “enough for X km in an EV”. From long-term statistics, no helper counters | [![Import](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fhaus%2Fmonatsrueckblick.yaml) |
| Simple ticket board – ticking moves items on *(German labels)* | Two or three to-do lists as columns with built-in cards: ticking an item moves it to the next list, optional notification. Nothing to install | [![Import](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Ftickets%2Fticket_board_einfach.yaml) |
| Ticket board reminders *(German labels, English messages)* | Add-on for the ticket board card: a morning message with due, overdue, waiting reviews and urgent tickets nobody touches, every assignee gets their own. New urgent tickets right away | [![Import](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Ftickets%2Fticket_board_erinnerungen.yaml) |

Blueprints marked *(German labels)* show German field names in Home Assistant – the English guides explain every field. More English versions will follow; tell us in an [issue](https://github.com/johnkily/ha-blueprints/issues) which one you need first. Questions in English are welcome there or under [Ideas](https://github.com/johnkily/ha-blueprints/discussions/categories/ideas).

Lizenz / License: [MIT](LICENSE) · [Impressum](https://kilysworld.com/impressum/) · [Datenschutz](https://kilysworld.com/datenschutz/)

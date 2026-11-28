<p align="center"><img src="docs/bilder/logo.png" width="96" alt="Kily's World"></p>

# Home-Assistant-Blueprints aus Kily's World

[![Blueprints geprüft](https://github.com/johnkily/ha-blueprints/actions/workflows/pruefen.yml/badge.svg)](https://github.com/johnkily/ha-blueprints/actions/workflows/pruefen.yml) [![Release](https://img.shields.io/github/v/release/johnkily/ha-blueprints)](https://github.com/johnkily/ha-blueprints/releases) [![Lizenz: MIT](https://img.shields.io/badge/Lizenz-MIT-blue)](LICENSE) [![Ko-fi](https://img.shields.io/badge/Ko--fi-Kaffee_oder_Tee_spendieren-FF5E5B?logo=ko-fi&logoColor=white)](https://ko-fi.com/johnkily)

Fertige Automationen für [Home Assistant](https://www.home-assistant.io/) – mit einem Klick importieren, Geräte auswählen, fertig. Kein YAML, kein Kopieren von Code.

🇬🇧 *English: guides and overview [below](#english).*

Sortiert nach den Seiten unseres Dashboards. Wie es bei uns aussieht und was noch kommt, steht im Blog: **[Kily's World – Unser Dashboard](https://kilysworld.com/dashboard/)**.

**So geht's:** Erst kurz in die 📖 **Anleitung** schauen – dort steht, was du brauchst (Geräte, Helfer, Apps). Dann auf **Importieren** klicken. Alle Anleitungen auf einen Blick: [docs](docs/README.md).

<details>
<summary><b>Wie funktioniert der Import?</b></summary>

1. Auf den blauen Knopf **„Importieren“** klicken. Beim ersten Mal fragt die Seite nach der Adresse deines Home Assistant – eintragen, merken lassen.
2. In Home Assistant öffnet sich der Import-Dialog → **„Blueprint importieren“**.
3. Unter *Einstellungen → Automationen & Szenen → Blueprints* den Blueprint antippen, Geräte auswählen, **Speichern**.

**Aktualisieren:** Kommt eine neue Version, unter *Blueprints* auf die drei Punkte → **„Blueprint erneut importieren“**. Deine Einstellungen bleiben erhalten.

</details>

## Übersicht

Die Startseite: Strompreis, Müll, Hausgeräte – und alles, was auf den AWTRIX-Pixeluhren landet.

<p><img src="docs/bilder/awtrix_uhr.gif" width="49%" alt="AWTRIX-Uhr mit Strompreis-App und Eck-Ampeln"> <img src="docs/bilder/muell_karte.gif" width="49%" alt="Müll-Kachel-Karte, die morgige Tonne wackelt"></p>

| Blueprint | Was er macht | Importieren & Anleitung |
|---|---|---|
| **[AWTRIX – aktueller Strompreis](docs/awtrix.md)** | Zeigt den Strompreis auf der Pixeluhr, grün/gelb/rot je nach Preis | [![Importieren](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fawtrix%2Fstrompreis.yaml)<br>[📖 Anleitung](docs/awtrix.md) |
| **[AWTRIX – Akku-Ampel in der Ecke](docs/awtrix.md)** | Färbt eine Ecke der Uhr nach dem Akkustand, von Rot über Gelb nach Grün | [![Importieren](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fawtrix%2Fakku_ampel.yaml)<br>[📖 Anleitung](docs/awtrix.md) |
| **[AWTRIX – Müll-Ampel in der Ecke](docs/awtrix.md)** | Eine Ecke leuchtet in der Farbe der Tonne, die morgen abgeholt wird – aus jedem Abfallkalender | [![Importieren](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fawtrix%2Fmuell_ampel.yaml)<br>[📖 Anleitung](docs/awtrix.md) |
| **[Waschmaschine, Trockner & Co. – fertig melden](docs/geraet_fertig.md)** | Nachricht aufs Handy, wenn das Gerät fertig ist – erkannt über eine Steckdose mit Strommessung, mit Erinnerung, wenn die Wäsche noch drin ist | [![Importieren](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fgeraete%2Fgeraet_fertig.yaml)<br>[📖 Anleitung](docs/geraet_fertig.md) |
| **[Müll – Erinnerung am Vorabend](docs/muell.md#3-erinnerung-am-vorabend)** | „🟦 Papier, 🟨 Gelber Sack – bitte heute Abend rausstellen.“ aus jedem Abfallkalender | [![Importieren](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fmuell%2Fmuell_erinnerung.yaml)<br>[📖 Anleitung](docs/muell.md#3-erinnerung-am-vorabend) |
| **[Müll – Plan für die Kachel-Karte](docs/muell.md#2-kachel-karte)** | Sammelt die Termine je Tonne für die Müll-Kachel-Karte | [![Importieren](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fmuell%2Fmuell_plan.yaml)<br>[📖 Anleitung](docs/muell.md#2-kachel-karte) |
| **[Monatsrückblick – dein Haus-Wrapped](docs/monatsrueckblick.md)** | Am 1. eine Nachricht mit den Zahlen des letzten Monats: PV, Netz, Verbrauch, Temperaturen – mit Vergleich zum Vormonat, Highlight und auf Wunsch „reicht für X km im E-Auto“. Aus der Langzeitstatistik, ohne Hilfszähler. Dazu die [Haus-Wrapped-Karte](docs/monatsrueckblick.md#profi-die-haus-wrapped-karte) als Profi-Variante | [![Importieren](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fhaus%2Fmonatsrueckblick.yaml)<br>[📖 Anleitung](docs/monatsrueckblick.md) |
| **[Morgenbericht – Was war nachts los?](docs/morgenbericht.md)** | Sammelt nachts Türen, Schlösser, Bewegung, Ausfälle und hohen Stromverbrauch in einer To-do-Liste – eine Nachricht kommt nur, wenn wirklich etwas war | [![Importieren](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fhaus%2Fmorgenbericht.yaml)<br>[📖 Anleitung](docs/morgenbericht.md) |

## Kamera

| Blueprint | Was er macht | Importieren & Anleitung |
|---|---|---|
| **[Klingel – Nachricht mit Kamerabild](docs/klingel.md)** | Klingelt es, kommt eine Nachricht mit Bild von der Tür aufs Handy – auch mit einem 10-€-Vibrationssensor am alten Gong | [![Importieren](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fklingel%2Fklingel_handy.yaml)<br>[📖 Anleitung](docs/klingel.md) |
| **[Klingel aufs TV – Bild-im-Bild](docs/klingel_tv.md)** | Klingelt es, während der Fernseher läuft, pausiert der Film und die Haustür erscheint als Bild-im-Bild, mit „Weiterschauen“ und „Bild schließen“ (App QuickBars auf Android TV) | [![Importieren](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fklingel%2Fklingel_tv.yaml)<br>[📖 Anleitung](docs/klingel_tv.md) |

## Autos

| Blueprint | Was er macht | Importieren & Anleitung |
|---|---|---|
| **[Willkommenslicht – in der Farbe der Person](docs/willkommenslicht.md)** | Kommt jemand heim, leuchtet das Licht im Eingang in seiner Farbe (bei uns die Farbe des Autos), kommen mehrere, wechseln die Farben; danach wieder wie vorher | [![Importieren](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Flicht%2Fwillkommenslicht.yaml)<br>[📖 Anleitung](docs/willkommenslicht.md) |
| **[Smartladen mit Abfahrtszeit (evcc)](docs/smartladen.md)** | Abfahrt und Ladeziel in Home Assistant einstellen, evcc lädt in den günstigsten Viertelstunden – zur Abfahrt wird der Plan wieder gelöscht, später angesteckt wird nachgezogen | [![Importieren](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fautos%2Fsmartladen.yaml)<br>[📖 Anleitung](docs/smartladen.md) |

[Was noch kommt](https://kilysworld.com/dashboard/#cars)

## Automatisierung

| Blueprint | Was er macht | Importieren & Anleitung |
|---|---|---|
| **[Sonnenschutz je Fassade](docs/sonnenschutz.md)** | Rollos runter, wenn die Sonne wirklich auf die Seite scheint und es warm ist – hoch erst, wenn sie weg ist. Kein Jo-Jo bei Wolken | [![Importieren](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fbeschattung%2Fsonnenschutz.yaml)<br>[📖 Anleitung](docs/sonnenschutz.md) |
| **[Türen abschließen, wenn niemand zu Hause ist](docs/tueren_abschliessen.md)** | Sind alle weg, schließen die smarten Schlösser nach 30 Minuten ab – eine offen stehende Tür wird nicht verriegelt, sondern gemeldet. Mit Schalter für Gäste | [![Importieren](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fsicherheit%2Ftueren_abschliessen.yaml)<br>[📖 Anleitung](docs/tueren_abschliessen.md) |
| **[Gute Nacht per Sprachbefehl](docs/gute_nacht.md)** | „Hey Google, gute Nacht“ schaltet einen Helfer, Home Assistant macht den Rest: Lichter aus, Rollos zu, abschließen (nur bei geschlossener Tür), Flurlicht noch ein paar Minuten an. Offene Fenster sagt der Lautsprecher an. Optional Frost-, Hitze- und Gästemodus | [![Importieren](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fhaus%2Fgute_nacht.yaml)<br>[📖 Anleitung](docs/gute_nacht.md) |
| **[Licht- und Radiowecker](docs/wecker.md)** | Sonnenaufgang am Bett (rot → orange → warmweiß) vor der Weckzeit, dann das Radio – nur an Arbeitstagen, nicht im Urlaub, Abbruch durch Ausschalten, danach gedimmt aus | [![Importieren](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Flicht%2Fwecker.yaml)<br>[📖 Anleitung](docs/wecker.md) |
| **[Saugroboter – Wochenplan](docs/saugplan.md)** | Saugen an manchen Tagen, saugen und wischen an anderen – ruht im Urlaub und an Feiertagen, wartet auf Wunsch, bis alle weg sind, meldet „fertig“ und „hängt fest“ | [![Importieren](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fgeraete%2Fsaugplan.yaml)<br>[📖 Anleitung](docs/saugplan.md) |
| **[AWTRIX – Warnung, solange Tür oder Tor offen ist](docs/awtrix.md)** | Eine Ecke blinkt, solange Garagentor oder Hoftor offen sind – auf Wunsch mit Meldung, die bis zum Schließen stehen bleibt | [![Importieren](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fawtrix%2Foffen_warnung.yaml)<br>[📖 Anleitung](docs/awtrix.md) |
| **[Zigbee-Wächter](docs/zigbee_waechter.md)** | Hängt der Zigbee-Koordinator, startet Home Assistant Chip und Zigbee2MQTT selbst neu und sagt Bescheid – fragt dafür alle 5 Minuten aktiv nach, statt auf Stille zu warten | [![Importieren](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fzigbee%2Fzigbee_waechter.yaml)<br>[📖 Anleitung](docs/zigbee_waechter.md) |
| **[Stumme Geräte melden](docs/stumme_geraete.md)** | Meldet Zigbee-Geräte, die sich nicht mehr melden – meist ist die Batterie leer, Home Assistant zeigt aber weiter den letzten Wert. Nach dem Tausch „Wieder da“, auf Wunsch Wochenübersicht | [![Importieren](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fzigbee%2Fstumme_geraete.yaml)<br>[📖 Anleitung](docs/stumme_geraete.md) |

**Was soll als Nächstes kommen?** Wünsche gern unter [Ideen](https://github.com/johnkily/ha-blueprints/discussions/categories/ideas) oder in den Kommentaren im Blog.

## Hausmeisterei

Unser Ticketsystem für alles, was im Haus zu tun ist – zum Nachbauen in drei Stufen, ganz ohne Skripte: einfach mit To-do-Listen, als Profi-Board und mit Erinnerungen. [Anleitung](docs/ticket_board.md)

<p><img src="docs/bilder/ticketboard_desktop.png" width="100%" alt="Ticket-Board mit fünf Spalten"></p>

| Baustein | Was er macht | Importieren & Anleitung |
|---|---|---|
| **[Ticket-Board einfach – Abhaken schiebt weiter](docs/ticket_board.md#einfach-ohne-installation)** | Board aus zwei oder drei To-do-Listen mit eingebauten Karten: Abhaken schiebt einen Eintrag in die nächste Spalte, auf Wunsch mit Nachricht. Nichts zu installieren | [![Importieren](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Ftickets%2Fticket_board_einfach.yaml)<br>[📖 Anleitung](docs/ticket_board.md#einfach-ohne-installation) |
| **Ticket-Board** | Kanban-Board für Wünsche und Aufgaben: Spalten, Priorität, Zuständige mit Foto, Fälligkeit, Herzchen, Verlauf und Abnahme. Daten in einer normalen To-do-Liste von Home Assistant. Installation über den Marketplace | [![Marketplace](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=johnkily&repository=ticket-board-card&category=plugin)<br>[📖 Anleitung](docs/ticket_board.md#profi-das-ticket-board) |
| **[Ticket-Board – Erinnerungen](docs/ticket_board.md#erinnerungen-stufe-3)** | Ergänzung zur Karte: jeden Morgen eine Nachricht mit Fälligem, Überfälligem, wartenden Abnahmen und liegengebliebenen „Brennt“-Tickets, jeder Zuständige bekommt seine eigenen. Neue „Brennt“-Tickets sofort | [![Importieren](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Ftickets%2Fticket_board_erinnerungen.yaml)<br>[📖 Anleitung](docs/ticket_board.md#erinnerungen-stufe-3) |

## Dashboard-Karten & Optik

| Karte | Was sie zeigt | Anleitung |
|---|---|---|
| [Glas-Kit](docs/glas_karten.md) | Unsere Optik zum Nachbauen: button-card-Vorlagen für Glas-Kacheln, Licht in Lampenfarbe, Fenster mit Puls und eine Statusleiste | [Anleitung](docs/glas_karten.md) |
| [Prognose mit Preisband](docs/energie_prognose.md) | Strompreis als farbiges Band mit den günstigsten Stunden, Solar-Prognose und Tageskurve | [Anleitung](docs/energie_prognose.md) |
| [Müll-Kachel-Karte](docs/muell.md#2-kachel-karte) | Welche Tonne als Nächstes raus muss – nur eingebaute Karten, dazu eine [Profi-Variante](docs/muell.md#profi-variante-unsere-karte-mit-button-card) mit button-card | [Anleitung](docs/muell.md#2-kachel-karte) |
| [Haus-Wrapped-Karte](https://github.com/johnkily/haus-wrapped-card) | Monatsrückblick wie bei Spotify, direkt aus der Langzeitstatistik – eigene Karte aus dem Marketplace | [Anleitung](docs/monatsrueckblick.md) |
| [Ticket-Board-Karte](https://github.com/johnkily/ticket-board-card) | Kanban-Board für alles, was im Haus zu tun ist – eigene Karte aus dem Marketplace | [Anleitung](docs/ticket_board.md) |

## Unterstützen

Alles hier ist kostenlos und bleibt es. Hat dir ein Blueprint Zeit oder Strom gespart, freue ich mich über einen Kaffee oder Tee:

[![Unterstütze mich auf Ko-fi](https://storage.ko-fi.com/cdn/kofi2.png?v=3)](https://ko-fi.com/johnkily)

Oder einfach hier oben rechts einen ⭐ dalassen und den Blog weiterempfehlen – das hilft anderen, die Blueprints zu finden.

## Im Home-Assistant-Forum

- [AWTRIX 3 – current electricity price in traffic-light colours](https://community.home-assistant.io/t/awtrix-3-current-electricity-price-in-traffic-light-colours-works-with-any-price-sensor-tibber-nordpool-epex/1030093)
- [AWTRIX 3 – waste bin indicator from any waste calendar](https://community.home-assistant.io/t/awtrix-3-waste-bin-indicator-corner-lights-up-in-the-colour-of-tomorrows-bin-from-any-waste-calendar-ics/1030267)
- [Waste collection dashboard from any calendar – next pickup per bin, no HACS](https://community.home-assistant.io/t/waste-collection-dashboard-from-any-calendar-ics-next-pickup-per-bin-two-week-strip-no-hacs-needed/1030765)

## Probleme oder Ideen?

Bitte ein [Issue](https://github.com/johnkily/ha-blueprints/issues) anlegen – mit Home-Assistant-Version und dem, was du erwartet hättest.

---

*Mit \* gekennzeichnete Links sind Affiliate-Links. Kaufst du darüber, bekomme ich eine kleine Provision, für dich ändert sich am Preis nichts. Als Amazon-Partner verdiene ich an qualifizierten Verkäufen.*

## English

Ready-made Home Assistant automations: click **Import**, pick your devices, done. Have a quick look at the 📖 **guide** first – it lists what you need. All guides at a glance: [docs](docs/README.md#english).

**Dashboard cards:** [Glass kit](docs/en/glas_karten.md) (our look as button-card templates) · [Forecast with price band](docs/en/energie_prognose.md) · [Waste bin tile card](docs/en/muell.md) · [Home Wrapped card](https://github.com/johnkily/haus-wrapped-card) · [Ticket board card](https://github.com/johnkily/ticket-board-card)

| Blueprint | What it does | Import & guide |
|---|---|---|
| [AWTRIX – current electricity price](docs/en/awtrix.md) | Current electricity price on the pixel clock, green/yellow/red | [![Import](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fen%2Fawtrix%2Felectricity_price.yaml)<br>[📖 Guide](docs/en/awtrix.md) |
| [AWTRIX – battery traffic light in the corner](docs/en/awtrix.md) *(German labels)* | A corner of the clock shows the battery level, red → yellow → green | [![Import](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fawtrix%2Fakku_ampel.yaml)<br>[📖 Guide](docs/en/awtrix.md) |
| [AWTRIX – waste bin indicator in the corner](docs/en/awtrix.md) | A corner lights up in the colour of tomorrow's bin, from any waste calendar | [![Import](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fen%2Fawtrix%2Fwaste_bin_indicator.yaml)<br>[📖 Guide](docs/en/awtrix.md) |
| [AWTRIX – warning while a door or gate is open](docs/en/awtrix.md) *(German labels)* | A corner blinks while the garage door or gate is open, optional notification on the clock | [![Import](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fawtrix%2Foffen_warnung.yaml)<br>[📖 Guide](docs/en/awtrix.md) |
| [Doorbell – notification with camera picture](docs/en/klingel.md) *(German labels)* | Doorbell rings → notification with a camera picture, works with a 10 € vibration sensor on an old chime | [![Import](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fklingel%2Fklingel_handy.yaml)<br>[📖 Guide](docs/en/klingel.md) |
| [Doorbell on the TV – picture-in-picture](docs/en/klingel_tv.md) *(German labels)* | Doorbell rings while the TV is on → playback pauses, the door camera shows as picture-in-picture with "continue" / "close" buttons (QuickBars app on Android TV) | [![Import](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fklingel%2Fklingel_tv.yaml)<br>[📖 Guide](docs/en/klingel_tv.md) |
| [Robot vacuum weekly schedule](docs/en/saugplan.md) *(German labels)* | Vacuum on some days, vacuum + mop on others – rests on holiday and public holidays, optionally waits until nobody is home, notifies "done" and "stuck" | [![Import](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fgeraete%2Fsaugplan.yaml)<br>[📖 Guide](docs/en/saugplan.md) |
| [Morning report – what happened last night?](docs/en/morgenbericht.md) *(German labels)* | Collects doors, locks, motion, unavailable devices and high power use at night in a to-do list – notifies only if something happened | [![Import](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fhaus%2Fmorgenbericht.yaml)<br>[📖 Guide](docs/en/morgenbericht.md) |
| [Sun protection per facade](docs/en/sonnenschutz.md) *(German labels)* | Blinds go down when the sun really hits that side of the house – no up and down with every cloud | [![Import](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fbeschattung%2Fsonnenschutz.yaml)<br>[📖 Guide](docs/en/sonnenschutz.md) |
| [Washing machine, dryer & co. – done notification](docs/en/geraet_fertig.md) *(German labels)* | Notification when the appliance is done, detected via a power-metering plug | [![Import](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fgeraete%2Fgeraet_fertig.yaml)<br>[📖 Guide](docs/en/geraet_fertig.md) |
| [Waste – plan for the tile card](docs/en/muell.md#3-tile-card) | Data for the waste bin tile card: next pickup per bin and a two-week strip | [![Import](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fen%2Fwaste%2Fwaste_plan.yaml)<br>[📖 Guide](docs/en/muell.md#3-tile-card) |
| [Waste – reminder the evening before](docs/en/muell.md#4-reminder-the-evening-before) | Notification the evening before a pickup, several bins in one message | [![Import](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fen%2Fwaste%2Fwaste_reminder.yaml)<br>[📖 Guide](docs/en/muell.md#4-reminder-the-evening-before) |
| [Lock doors when nobody is home](docs/en/tueren_abschliessen.md) | Locks the smart locks once everybody has left – doors that are open are reported, not bolted | [![Import](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fen%2Fsecurity%2Flock_doors_when_away.yaml)<br>[📖 Guide](docs/en/tueren_abschliessen.md) |
| [Zigbee watchdog – restart a stuck coordinator](docs/en/zigbee_waechter.md) *(German labels)* | If the Zigbee coordinator gets stuck, restarts the chip and Zigbee2MQTT and notifies you – asks a device every 5 minutes instead of waiting for silence | [![Import](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fzigbee%2Fzigbee_waechter.yaml)<br>[📖 Guide](docs/en/zigbee_waechter.md) |
| [Report silent devices (empty battery)](docs/en/stumme_geraete.md) | Notifies when Zigbee devices stop reporting – usually an empty battery, while Home Assistant keeps showing the last value. “Back again” after the swap, optional weekly overview | [![Import](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fen%2Fzigbee%2Fsilent_devices.yaml)<br>[📖 Guide](docs/en/stumme_geraete.md) |
| [Welcome light in each person's colour](docs/en/willkommenslicht.md) *(German labels)* | Someone comes home → the entrance light glows in their colour (ours: the car colour), several people → alternating colours, then back to before | [![Import](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Flicht%2Fwillkommenslicht.yaml)<br>[📖 Guide](docs/en/willkommenslicht.md) |
| [Good night by voice command](docs/en/gute_nacht.md) *(German labels, English announcements)* | “Hey Google, good night” switches a helper, Home Assistant does the rest: lights off, blinds down, locks (only if the door is closed), path light for a few minutes. Open windows are announced | [![Import](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fhaus%2Fgute_nacht.yaml)<br>[📖 Guide](docs/en/gute_nacht.md) |
| [Light and radio alarm clock](docs/en/wecker.md) *(German labels)* | Sunrise at the bed (red → orange → warm white) before the alarm, then the radio – workdays only, not on holiday, stops when you switch the light off, dims before turning off | [![Import](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Flicht%2Fwecker.yaml)<br>[📖 Guide](docs/en/wecker.md) |
| [Smart charging with departure time (evcc)](docs/en/smartladen.md) *(German labels)* | Set departure and target in Home Assistant, evcc charges in the cheapest quarter hours – the plan is deleted at departure | [![Import](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fautos%2Fsmartladen.yaml)<br>[📖 Guide](docs/en/smartladen.md) |
| [Monthly review – your home's “Wrapped”](docs/en/monatsrueckblick.md) | On the 1st a message with last month's numbers: PV, grid, consumption, temperatures – compared to the month before, with a highlight and optional “enough for X km in an EV”. From long-term statistics, no helper counters | [![Import](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fen%2Fhome%2Fmonthly_review.yaml)<br>[📖 Guide](docs/en/monatsrueckblick.md) |
| [Simple ticket board – ticking moves items on](docs/en/ticket_board.md#simple-no-installation) *(German labels)* | Two or three to-do lists as columns with built-in cards: ticking an item moves it to the next list, optional notification. Nothing to install | [![Import](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Ftickets%2Fticket_board_einfach.yaml)<br>[📖 Guide](docs/en/ticket_board.md#simple-no-installation) |
| [Ticket board reminders](docs/en/ticket_board.md#reminders-level-3) *(German labels, English messages)* | Add-on for the ticket board card: a morning message with due, overdue, waiting reviews and urgent tickets nobody touches, every assignee gets their own. New urgent tickets right away | [![Import](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Ftickets%2Fticket_board_erinnerungen.yaml)<br>[📖 Guide](docs/en/ticket_board.md#reminders-level-3) |

Blueprints marked *(German labels)* show German field names in Home Assistant – the English guides explain every field. More English versions will follow; tell us in an [issue](https://github.com/johnkily/ha-blueprints/issues) which one you need first. Questions in English are welcome there or under [Ideas](https://github.com/johnkily/ha-blueprints/discussions/categories/ideas).

**Did it work?** Everything here is free and stays free. If a blueprint saved you time or energy, I'd be happy about a coffee or tea – or a ⭐ at the top right:

[![Support me on Ko-fi](https://storage.ko-fi.com/cdn/kofi2.png?v=3)](https://ko-fi.com/johnkily)

Lizenz / License: [MIT](LICENSE) · [Impressum](https://kilysworld.com/impressum/) · [Datenschutz](https://kilysworld.com/datenschutz/)

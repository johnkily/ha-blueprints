<p align="center"><img src="docs/bilder/logo.png" width="96" alt="Kily's World"></p>

# Home-Assistant-Blueprints aus Kily's World

Fertige Automationen für [Home Assistant](https://www.home-assistant.io/) – mit einem Klick importieren, Geräte auswählen, fertig. Kein YAML, kein Kopieren von Code.

🇬🇧 *English: guides and overview [below](#english).*

Sortiert nach den Seiten unseres Dashboards. Wie es bei uns aussieht und was noch kommt, steht im Blog: **[Kily's World – Unser Dashboard](https://kilysworld.wordpress.com/dashboard/)**.

## Übersicht

Die Startseite: Strompreis, Müll, Hausgeräte – und alles, was auf den AWTRIX-Pixeluhren landet.

| Blueprint | Was er macht | Importieren |
|---|---|---|
| **AWTRIX – aktueller Strompreis** | Zeigt den Strompreis auf der Pixeluhr, grün/gelb/rot je nach Preis | [![Importieren](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fawtrix%2Fstrompreis.yaml) |
| **AWTRIX – Akku-Ampel in der Ecke** | Färbt eine Ecke der Uhr nach dem Akkustand, von Rot über Gelb nach Grün | [![Importieren](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fawtrix%2Fakku_ampel.yaml) |
| **AWTRIX – Müll-Ampel in der Ecke** | Eine Ecke leuchtet in der Farbe der Tonne, die morgen abgeholt wird – aus jedem Abfallkalender | [![Importieren](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fawtrix%2Fmuell_ampel.yaml) |
| **Waschmaschine, Trockner & Co. – fertig melden** | Nachricht aufs Handy, wenn das Gerät fertig ist – erkannt über eine Steckdose mit Strommessung, mit Erinnerung, wenn die Wäsche noch drin ist | [![Importieren](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fgeraete%2Fgeraet_fertig.yaml) |
| **Müll – Erinnerung am Vorabend** | „🟦 Papier, 🟨 Gelber Sack – bitte heute Abend rausstellen.“ aus jedem Abfallkalender | [![Importieren](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fmuell%2Fmuell_erinnerung.yaml) |
| **Müll – Plan für die Kachel-Karte** | Sammelt die Termine je Tonne für die Müll-Kachel-Karte | [![Importieren](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fmuell%2Fmuell_plan.yaml) |

**Dazu passend:** die [Müll-Kachel-Karte fürs Dashboard](docs/muell.md#2-kachel-karte) – nur eingebaute Karten, zum Einfügen per Kopieren – und die [Profi-Variante](docs/muell.md#profi-variante-unsere-karte-mit-button-card) mit button-card, so wie bei uns.

## Kamera

| Blueprint | Was er macht | Importieren |
|---|---|---|
| **Klingel – Nachricht mit Kamerabild** | Klingelt es, kommt eine Nachricht mit Bild von der Tür aufs Handy – auch mit einem 10-€-Vibrationssensor am alten Gong | [![Importieren](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fklingel%2Fklingel_handy.yaml) |

## Autos

Noch kein Blueprint – als Nächstes geplant: Smartladen bis zur Abfahrtszeit. [Was noch kommt](https://kilysworld.wordpress.com/dashboard/#cars)

## Automatisierung

| Blueprint | Was er macht | Importieren |
|---|---|---|
| **Sonnenschutz je Fassade** | Rollos runter, wenn die Sonne wirklich auf die Seite scheint und es warm ist – hoch erst, wenn sie weg ist. Kein Jo-Jo bei Wolken | [![Importieren](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fbeschattung%2Fsonnenschutz.yaml) |
| **Türen abschließen, wenn niemand zu Hause ist** | Sind alle weg, schließen die smarten Schlösser nach 30 Minuten ab – eine offen stehende Tür wird nicht verriegelt, sondern gemeldet. Mit Schalter für Gäste | [![Importieren](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fsicherheit%2Ftueren_abschliessen.yaml) |
| **AWTRIX – Warnung, solange Tür oder Tor offen ist** | Eine Ecke blinkt, solange Garagentor oder Hoftor offen sind – auf Wunsch mit Meldung, die bis zum Schließen stehen bleibt | [![Importieren](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fawtrix%2Foffen_warnung.yaml) |

➡️ **Schritt-für-Schritt-Anleitungen:** [AWTRIX-Blueprints](docs/awtrix.md) · [Klingel](docs/klingel.md) · [Sonnenschutz](docs/sonnenschutz.md) · [Waschmaschine & Co.](docs/geraet_fertig.md) · [Müll](docs/muell.md) · [Türen abschließen](docs/tueren_abschliessen.md)

**Was soll als Nächstes kommen?** Wünsche gern unter [Ideen](https://github.com/johnkily/ha-blueprints/discussions/categories/ideas) oder in den Kommentaren im Blog.

## So funktioniert der Import

1. Auf den blauen Knopf **„Importieren“** klicken. Beim ersten Mal fragt die Seite nach der Adresse deines Home Assistant – eintragen, merken lassen.
2. In Home Assistant öffnet sich der Import-Dialog → **„Blueprint importieren“**.
3. Unter *Einstellungen → Automationen & Szenen → Blueprints* den Blueprint antippen, Geräte auswählen, **Speichern**.

**Aktualisieren:** Kommt eine neue Version, unter *Blueprints* auf die drei Punkte → **„Blueprint erneut importieren“**. Deine Einstellungen bleiben erhalten.

## Unterstützen

Alles hier ist kostenlos und bleibt es. Wenn dir ein Blueprint Zeit oder Strom spart, freue ich mich über einen Kaffee:

[![Unterstütze mich auf Ko-fi](https://storage.ko-fi.com/cdn/kofi2.png?v=3)](https://ko-fi.com/johnkily)

Oder einfach den Blog weiterempfehlen – das hilft genauso.

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

**Step-by-step guides in English:** [AWTRIX blueprints](docs/en/awtrix.md) · [Doorbell](docs/en/klingel.md) · [Sun protection](docs/en/sonnenschutz.md) · [Washing machine & co.](docs/en/geraet_fertig.md) · [Waste bins](docs/en/muell.md) (with an English tile card) · [Lock the doors](docs/en/tueren_abschliessen.md)

| Blueprint | What it does |
|---|---|
| AWTRIX – aktueller Strompreis | Current electricity price on the pixel clock, green/yellow/red |
| AWTRIX – Akku-Ampel in der Ecke | A corner of the clock shows the battery level, red → yellow → green |
| AWTRIX – Müll-Ampel in der Ecke | A corner lights up in the colour of tomorrow's bin, from any waste calendar |
| AWTRIX – Warnung, solange Tür oder Tor offen ist | A corner blinks while the garage door or gate is open, optional notification on the clock |
| Klingel – Nachricht mit Kamerabild aufs Handy | Doorbell rings → notification with a camera picture, works with a 10 € vibration sensor on an old chime |
| Sonnenschutz je Fassade | Blinds go down when the sun really hits that side of the house – no up and down with every cloud |
| Waschmaschine, Trockner & Co. – fertig melden | Notification when the appliance is done, detected via a power-metering plug |
| Müll – Erinnerung am Vorabend / Plan für die Kachel-Karte | Reminder the evening before and data for the waste bin tile card |
| Türen abschließen, wenn niemand zu Hause ist | Locks the smart locks once everybody has left – doors that are open are reported, not bolted |

The import buttons are in the tables above and in each guide. **The input labels inside the blueprints are German** – the English guides list every field with its German label and meaning. Questions in English are welcome as an [issue](https://github.com/johnkily/ha-blueprints/issues) or under [Ideas](https://github.com/johnkily/ha-blueprints/discussions/categories/ideas).

Lizenz / License: [MIT](LICENSE) · [Impressum](https://kilysworld.wordpress.com/impressum/) · [Datenschutz](https://kilysworld.wordpress.com/datenschutz/)

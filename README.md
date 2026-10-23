# Home-Assistant-Blueprints aus Kily's World

Fertige Automationen für [Home Assistant](https://www.home-assistant.io/) – mit einem Klick importieren, Geräte auswählen, fertig. Kein YAML, kein Kopieren von Code.

Hintergründe und Erfahrungen stehen im Blog: **[Kily's World](https://kilysworld.wordpress.com/)** – zum Beispiel [Strompreis und Hausakku auf der AWTRIX-Uhr](https://kilysworld.wordpress.com/2026/10/23/strompreis-und-hausakku-auf-der-awtrix-uhr-jetzt-mit-einem-klick/).

## Die Blueprints

| Blueprint | Was er macht | Importieren |
|---|---|---|
| **AWTRIX – aktueller Strompreis** | Zeigt den Strompreis auf der Pixeluhr, grün/gelb/rot je nach Preis | [![Importieren](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fawtrix%2Fstrompreis.yaml) |
| **AWTRIX – Akku-Ampel in der Ecke** | Färbt eine Ecke der Uhr nach dem Akkustand, von Rot über Gelb nach Grün | [![Importieren](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fawtrix%2Fakku_ampel.yaml) |
| **AWTRIX – Müll-Ampel in der Ecke** | Eine Ecke leuchtet in der Farbe der Tonne, die morgen abgeholt wird – aus jedem Abfallkalender | [![Importieren](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fawtrix%2Fmuell_ampel.yaml) |
| **Klingel – Nachricht mit Kamerabild** | Klingelt es, kommt eine Nachricht mit Bild von der Tür aufs Handy – auch mit einem 10-€-Vibrationssensor am alten Gong | [![Importieren](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fklingel%2Fklingel_handy.yaml) |
| **Sonnenschutz je Fassade** | Rollos runter, wenn die Sonne wirklich auf die Seite scheint und es warm ist – hoch erst, wenn sie weg ist. Kein Jo-Jo bei Wolken | [![Importieren](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fbeschattung%2Fsonnenschutz.yaml) |
| **Waschmaschine, Trockner & Co. – fertig melden** | Nachricht aufs Handy, wenn das Gerät fertig ist – erkannt über eine Steckdose mit Strommessung, mit Erinnerung, wenn die Wäsche noch drin ist | [![Importieren](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fgeraete%2Fgeraet_fertig.yaml) |
| **Müll – Erinnerung am Vorabend** | „🟦 Papier, 🟨 Gelber Sack – bitte heute Abend rausstellen.“ aus jedem Abfallkalender | [![Importieren](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fmuell%2Fmuell_erinnerung.yaml) |

| **Müll – Plan für die Kachel-Karte** | Sammelt die Termine je Tonne für die Müll-Kachel-Karte | [![Importieren](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fmuell%2Fmuell_plan.yaml) |

**Dazu passend:** die [Müll-Kachel-Karte fürs Dashboard](docs/muell.md#2-kachel-karte) – nur eingebaute Karten, zum Einfügen per Kopieren.

➡️ **Schritt-für-Schritt-Anleitungen:** [AWTRIX-Blueprints](docs/awtrix.md) · [Klingel](docs/klingel.md) · [Sonnenschutz](docs/sonnenschutz.md) · [Waschmaschine & Co.](docs/geraet_fertig.md) · [Müll](docs/muell.md)

## So funktioniert der Import

1. Auf den blauen Knopf **„Importieren“** klicken. Beim ersten Mal fragt die Seite nach der Adresse deines Home Assistant – eintragen, merken lassen.
2. In Home Assistant öffnet sich der Import-Dialog → **„Blueprint importieren“**.
3. Unter *Einstellungen → Automationen & Szenen → Blueprints* den Blueprint antippen, Geräte auswählen, **Speichern**.

**Aktualisieren:** Kommt eine neue Version, unter *Blueprints* auf die drei Punkte → **„Blueprint erneut importieren“**. Deine Einstellungen bleiben erhalten.

## Unterstützen

Alles hier ist kostenlos und bleibt es. Wenn dir ein Blueprint Zeit oder Strom spart, freue ich mich über einen Kaffee:

[![Unterstütze mich auf Ko-fi](https://storage.ko-fi.com/cdn/kofi2.png?v=3)](https://ko-fi.com/johnkily)

Oder einfach den Blog weiterempfehlen – das hilft genauso.

## Probleme oder Ideen?

Bitte ein [Issue](https://github.com/johnkily/ha-blueprints/issues) anlegen – mit Home-Assistant-Version und dem, was du erwartet hättest.

---

*Mit \* gekennzeichnete Links sind Affiliate-Links. Kaufst du darüber, bekomme ich eine kleine Provision, für dich ändert sich am Preis nichts. Als Amazon-Partner verdiene ich an qualifizierten Verkäufen.*

## English

Ready-made Home Assistant automations: click **Import**, pick your devices, done. Like them? [Buy me a coffee on Ko-fi](https://ko-fi.com/johnkily). Each blueprint has an English summary in its description; the step-by-step guide is in German for now – feel free to open an issue in English.

Lizenz / License: [MIT](LICENSE) · [Impressum](https://kilysworld.wordpress.com/impressum/) · [Datenschutz](https://kilysworld.wordpress.com/datenschutz/)

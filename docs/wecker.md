# Licht- und Radiowecker

*[English version](en/wecker.md)*

Aufwachen mit Sonnenaufgang statt mit Piepen: Vor der Weckzeit geht eine Lampe ganz langsam an, von tiefem Rot über Orange zu warmem Weiß. Zur Weckzeit startet auf Wunsch das Radio. Beides geht auch einzeln – nur Licht oder nur Radio.

Bei uns weckt eine Hue-Lightstripe am Bett mit einem Sonnenaufgang über 20 Minuten, und auf dem Nachttisch meiner Frau läuft werktags um 7 der Lokalsender. Ein Funktaster neben dem Bett beendet den Wecker sofort.

## Was der Blueprint kann

- **Sonnenaufgang** über eine einstellbare Zeit (Vorgabe 20 Minuten), rot → orange → warmweiß – wahlweise **vor** der Weckzeit (zur Weckzeit ist es hell) oder **ab** der Weckzeit (das Licht weckt). Die Helligkeit steigt nicht gleichmäßig, sondern erst langsam, dann schneller – so, wie das Auge es wahrnimmt. Am Ende steht genau die gewählte Lichtfarbe, bei uns dieselbe wie abends bei der Bettlampe. Für Lampen ohne Farbe gibt es einen Verlauf in Weißtönen.
- **Taster neben dem Bett:** Ein Druck springt sofort zum hellen Endlicht.
- **Radio** zur Weckzeit, auf Wunsch mit fester Lautstärke – direkt über den Lautsprecher oder über Music Assistant.
- **Nur an den gewählten Tagen**, auf Wunsch nicht an Feiertagen, und **pausiert**, solange ein Schalter wie „Urlaub“ an ist.
- **Abbruch von Hand:** Wer das Licht ausmacht, beendet den Sonnenaufgang.
- **Gedimmt aus:** Nach der Weckzeit geht das Licht aus – vorher kurz auf gedimmt warm. Sonst kommt die Lampe abends beim normalen Einschalten im hellen Weck-Zustand hoch.
- **Radio aus** nach einer Weile, aber nur, wenn noch dieser Sender läuft. Hat jemand inzwischen etwas anderes gestartet, bleibt es an.

## Was du brauchst

| | |
|---|---|
| **Eine Farblampe oder einen LED-Streifen** | bei uns ein [Philips Hue Lightstrip](https://www.amazon.de/dp/B0GHS99N3N?tag=elcamdob-21)\* am Bett – geht aber mit jeder dimmbaren Lampe |
| **Einen Funktaster** *(optional)* | z. B. den [Hue Dimmschalter](https://www.amazon.de/dp/B08PKMT2DV?tag=elcamdob-21)\* (über die Hue Bridge) oder den [BILRESA von IKEA](https://www.ikea.com/de/de/p/bilresa-fernbedienung-weiss-smart-dualschalter-10604165/) (Matter über Thread) – bei uns noch der ältere IKEA-Schalter mit Zigbee |
| **Einen Lautsprecher** *(optional)* | für das Radio |

\* Affiliate-Links: Kaufst du darüber, bekomme ich eine kleine Provision – für dich ändert sich am Preis nichts.

## 1. Helfer anlegen

*Einstellungen → Geräte & Dienste → Helfer → Helfer erstellen → **Datum und/oder Uhrzeit*** → „Weckzeit“, nur **Uhrzeit**. Den Helfer kannst du ins Dashboard legen und dort die Weckzeit verstellen.

## 2. Blueprint importieren

[![Importieren](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Flicht%2Fwecker.yaml)

## 3. Automation anlegen

| Feld | Was eintragen |
|---|---|
| Weckzeit | der Helfer aus Schritt 1 |
| An diesen Tagen | Vorgabe Montag bis Freitag |
| Arbeitstag-Sensor | optional, aus der Integration „Arbeitstag“ – dann bleibt der Wecker an Feiertagen still |
| Pausieren, wenn eingeschaltet | z. B. Urlaubsmodus |
| Licht / Dauer | die Lampe am Bett, wie lange der Sonnenaufgang dauert (Vorgabe 20 Minuten) |
| Wann der Sonnenaufgang läuft | vor der Weckzeit oder ab der Weckzeit |
| Lichtfarbe am Ende / Helligkeit am Ende | Warmweiß in Kelvin (Vorgabe 3500 K) und wie hell es wird |
| Taster beendet den Sonnenaufgang | optional: Ereignis- oder Aktions-Entität eines Funktasters (z. B. von Zigbee2MQTT) |
| Farbverlauf | „Sonnenaufgang“ für Farblampen, „Warmweiß“ für Lampen, die nur Weißtöne können |
| Licht aus nach dem Sonnenaufgang | Vorgabe 60 Minuten, 0 = bleibt an |
| Lautsprecher / Sender | z. B. ein Google- oder Sonos-Lautsprecher und die Adresse des Radio-Streams |
| Über Music Assistant abspielen | an, wenn du Music Assistant nutzt – dann geht als Sender auch `library://radio/1` |
| Lautstärke | 0 = so lassen, wie sie am Lautsprecher steht |
| Radio aus nach | Vorgabe 60 Minuten, 0 = läuft weiter |

**Wo finde ich die Adresse eines Senders?** Auf [radio-browser.info](https://www.radio-browser.info) den Sender suchen und die Stream-Adresse kopieren (endet meist auf `.mp3` oder `.aac`).

## Klappt nicht?

| Problem | Lösung |
|---|---|
| Licht wird nicht rot | Kann die Lampe Farbe? Sonst „Warmweiß“ wählen. |
| Sonnenaufgang bricht gleich ab | Hat jemand das Licht ausgeschaltet? Manche Lampen melden sich beim ersten Schritt erst nach ein paar Sekunden – der Blueprint wartet bis zu 15 Sekunden. |
| Kein Radio | Stream-Adresse direkt im Browser testen. Manche Lautsprecher brauchen Music Assistant. |
| Wecker klingelt im Urlaub | Den Urlaubsschalter unter „Pausieren, wenn eingeschaltet“ eintragen. |

---

Gefällt er dir? Ein ⭐ auf [GitHub](https://github.com/johnkily/ha-blueprints) hilft anderen, ihn zu finden. Mehr aus unserem Haus: [Kily's World](https://kilysworld.com).

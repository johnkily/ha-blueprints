# Sonnenschutz je Fassade – Schritt für Schritt

Die Rollos einer Hausseite fahren herunter, wenn die Sonne wirklich auf diese Fassade scheint und es warm genug ist – und erst wieder hoch, wenn die Sonne weg ist. Keine Wolke bringt sie dazwischen hoch und wieder runter.

**Pro Hausseite eine Automation** – Süd, West und Ost haben unterschiedliche Winkel.

## Was du brauchst

| | |
|---|---|
| **Rollos** | Rollos, Jalousien oder Raffstores, die in Home Assistant eine **Position in Prozent** anfahren können (z. B. über Shelly, Homematic, Zigbee-Aktoren) |
| **Sonnenstand** | ist in Home Assistant eingebaut (`sun.sun`), wenn dein Standort eingetragen ist |
| *optional* **Raumtemperatur** | ein Temperatursensor im Raum, z. B. ein [Aqara-Temperatursensor](https://www.amazon.de/dp/B07D37FKGY?tag=elcamdob-21)\* wie bei uns |
| *optional* **Außentemperatur und Bewölkung** | eine Wetter-Integration (z. B. die eingebaute *Met.no*, oder DWD) |

## 1. Winkel für deine Fassade herausfinden

Auf [sonnenverlauf.de](https://www.sonnenverlauf.de) deine Adresse suchen und den Pin vor das Fenster setzen. Die Linien zeigen, in welcher Richtung die Sonne steht.

- **Sonne kommt ab:** ab welchem Winkel (Azimut) die Sonne auf die Fassade trifft.
- **Sonne ist weg ab:** ab welchem Winkel sie die Fassade verlässt.

| Fassade | kommt ab | weg ab |
|---|---|---|
| Ost | 60° | 160° |
| Süd | 130° | 250° |
| West | 200° | 300° |

Die Werte sind Anhaltspunkte – Bäume, Dachüberstände und Nachbarhäuser verschieben sie. Lieber ein paar Tage beobachten und nachstellen.

## 2. Merker anlegen (empfohlen)

*Einstellungen → Geräte & Dienste → Helfer → Helfer erstellen → **Schalter***, Name z. B. „Sonnenschutz Süd heute“.

Damit beschattet die Automation **einmal am Tag**: Öffnest du ein Rollo von Hand, bleibt es offen. Um Mitternacht setzt sie den Merker selbst zurück. Ohne Merker fährt ein von Hand geöffnetes Rollo beim nächsten Durchlauf (spätestens nach 10 Minuten) wieder runter.

## 3. Blueprint importieren

[![Importieren](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fbeschattung%2Fsonnenschutz.yaml)

## 4. Automation anlegen

*Einstellungen → Automationen & Szenen → Blueprints* → **Sonnenschutz je Fassade**.

| Feld | Was eintragen |
|---|---|
| Rollos dieser Hausseite | alle Rollos der Fassade |
| Beschattungs-Position | z. B. 20 % (0 = zu, 100 = offen) |
| Sonnenstand | die Winkel aus Schritt 1; *Mindesthöhe* 20° passt meistens, *Hochfahren unter* 5° sorgt dafür, dass die Rollos abends sicher hochkommen |
| Temperatur und Wolken *(aufklappen)* | optional: Raumtemperatur (z. B. ab 22 °C), Außentemperatur (z. B. ab 20 °C), Bewölkung (z. B. unter 80 %). Leer gelassene Felder werden nicht geprüft. |
| Merker | der Schalter aus Schritt 2 |
| Position beim Hochfahren | meist 100 % |

**Speichern** – fertig. Die Automation prüft alle 10 Minuten.

## So entscheidet die Automation

- **Herunter** nur, wenn **alles** stimmt: Sonne im Winkelbereich und hoch genug, die eingestellten Temperaturen überschritten, nicht zu bewölkt – und der Merker ist noch aus.
- **Nur Rollos, die weiter offen sind** als die Beschattungs-Position. Hast du ein Rollo selbst ganz geschlossen, bleibt es zu.
- **Hoch**, wenn die Sonne die Fassade verlassen hat (Winkel überschritten oder nachmittags zu tief). Hochgefahren werden **nur Rollos, die noch auf der Beschattungs-Position stehen** – was du zwischendurch selbst verstellt hast, bleibt, wie es ist.
- **Wolken holen die Rollos nicht hoch.** Ist einmal beschattet, bleibt es dabei, bis die Sonne weg ist.

## Klappt nicht?

| Problem | Lösung |
|---|---|
| Rollos fahren nie | *Automation → Traces* zeigt die Werte jedes Durchlaufs (Azimut, Höhe, Temperaturen). Oft ist der Winkelbereich zu eng oder die Mindesthöhe zu hoch. |
| Rollos fahren zu früh oder zu spät | Winkel um 10–20° anpassen. |
| Rollo fährt nach Handbedienung wieder runter | Merker einrichten (Schritt 2). |
| Rollo fährt abends nicht hoch | Steht es noch genau auf der Beschattungs-Position? Von Hand verstellte Rollos fasst die Automation absichtlich nicht an. |
| Fehler „Position“ | Das Rollo kann keine Position anfahren (nur auf/zu). Dann passt dieser Blueprint nicht. |

---

*Mit \* gekennzeichnete Links sind Affiliate-Links. Kaufst du darüber, bekomme ich eine kleine Provision, für dich ändert sich am Preis nichts. Als Amazon-Partner verdiene ich an qualifizierten Verkäufen.*

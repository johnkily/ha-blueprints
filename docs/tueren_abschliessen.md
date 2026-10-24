# Türen abschließen, wenn niemand zu Hause ist

Sind alle aus dem Haus, schließt Home Assistant nach einer Wartezeit die smarten Türschlösser ab, die noch offen sind. Steht eine Tür tatsächlich offen, wird sie **nicht** verriegelt – der Riegel würde ins Leere fahren und die Tür ließe sich nicht mehr zudrücken –, stattdessen kommt eine Warnung aufs Handy. Eine Nachricht gibt es nur, wenn etwas passiert ist; sind die Türen schon zu, bleibt es still.

## Was du brauchst

| | |
|---|---|
| **Smartes Türschloss** | Jedes Schloss, das in Home Assistant als Schloss erscheint (`lock.…`) – Nuki, Bosch, Yale, Danalock, ein Zigbee- oder Z-Wave-Schloss. Bei uns sind es zwei Nuki an Haustür und Hintertür. |
| **Anwesenheit** | Je Person ein Handy mit der Home-Assistant-App (Standortfreigabe an) – oder ein anderer Tracker. Unter *Einstellungen → Personen* muss jeder Person ihr Gerät zugeordnet sein. |
| **Türkontakt** *(empfohlen)* | Ein Fenster-/Türkontakt am Türblatt, z. B. der [Aqara MCCGQ11LM (Zigbee)](https://www.amazon.de/dp/B07D37VDM3?tag=elcamdob-21)\* – der hängt bei uns an der Hintertür. Viele Schlösser haben auch einen eingebauten Türsensor (Nuki „Door Sensor“), der geht genauso. |
| **Handy** | Für die Nachricht: die Home-Assistant-App |

## 1. Blueprint importieren

[![Importieren](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fsicherheit%2Ftueren_abschliessen.yaml)

## 2. Ausnahme-Schalter anlegen *(empfohlen)*

Sind Gäste, der Tiersitter oder die Großeltern im Haus, aber ohne Handy in Home Assistant, sieht es für Home Assistant aus, als sei niemand da. Damit sie nicht ausgesperrt werden:

*Einstellungen → Geräte & Dienste → Helfer → Helfer erstellen → Schalter*, Name z. B. **Gäste im Haus**. Den Schalter legst du dir aufs Dashboard und schaltest ihn ein, solange jemand da ist.

## 3. Automation anlegen

*Einstellungen → Automationen & Szenen → Blueprints* → **Türen abschließen, wenn niemand zu Hause ist**.

| Feld | Was eintragen |
|---|---|
| Wer muss weg sein | alle Personen, die einen Schlüssel haben |
| Türschlösser | die Schlösser, die abgeschlossen werden sollen |
| Abschließen nach | Vorgabe 30 Minuten – fängt das „Ich hab was vergessen“ ab |
| Nachricht an | wessen Handy Bescheid bekommt; leer = keine Nachricht |
| Türkontakte *(aufklappen)* | **in derselben Reihenfolge wie die Schlösser** – der erste Kontakt gehört zum ersten Schloss |
| Nicht abschließen, solange eingeschaltet | der Schalter aus Schritt 2 |

## Was du aufs Handy bekommst

| Fall | Nachricht |
|---|---|
| Alles geklappt | 🔒 **Türen abgeschlossen** – Niemand zu Hause. Abgeschlossen: Haustür, Hintertür. |
| Tür steht offen | ⚠️ **Tür nicht abgeschlossen** – … Steht offen, nicht verriegelt: Hintertür. |
| Schloss reagiert nicht | ⚠️ **Tür nicht abgeschlossen** – … Schloss hat nicht reagiert: Hintertür. (nach 60 Sekunden Warten, z. B. Batterie leer oder Riegel klemmt) |

## Gut zu wissen

- **Abgeschlossen wird einmal.** Schließt danach jemand per App wieder auf (etwa für den Paketboten), bleibt die Tür offen, bis wieder jemand nach Hause kommt und erneut alle gehen.
- **Neustart von Home Assistant:** Fällt ein Update in die Zeit, in der alle weg sind, beginnt die Wartezeit nach dem Neustart von vorn – danach wird trotzdem abgeschlossen.
- **Die Tür wird nur abgeschlossen, nie geöffnet.** Der Blueprint schickt ausschließlich den Befehl „Abschließen“.

## Klappt nicht?

| Problem | Lösung |
|---|---|
| Schließt nie ab | *Einstellungen → Personen*: Steht bei allen „Abwesend“ bzw. ein anderer Ort? Ohne Standortfreigabe der App bleibt eine Person für immer „Zu Hause“. |
| Schließt ab, obwohl jemand da ist | Diese Person fehlt unter *Wer muss weg sein* – oder sie hat kein Handy dabei. Dafür ist der Ausnahme-Schalter da. |
| Warnt „steht offen“, obwohl die Tür zu ist | Kontakte und Schlösser stehen in unterschiedlicher Reihenfolge. Reihenfolge prüfen: erster Kontakt = erstes Schloss. |
| Keine Nachricht | Handy unter *Nachricht an* ausgewählt? Im Zweifel unter *Automation → Traces* nachsehen, ob sie gelaufen ist. |

---

*Mit \* gekennzeichnete Links sind Affiliate-Links. Kaufst du darüber, bekomme ich eine kleine Provision, für dich ändert sich am Preis nichts. Als Amazon-Partner verdiene ich an qualifizierten Verkäufen.*

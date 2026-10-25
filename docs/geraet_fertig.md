# Waschmaschine, Trockner & Co. – fertig melden

*[English version](en/geraet_fertig.md)*

Eine Steckdose mit Strommessung erkennt, wann das Gerät läuft und wann es fertig ist. Dann kommt eine Nachricht aufs Handy – mit Laufzeit und auf Wunsch dem Verbrauch. Funktioniert mit jeder Waschmaschine, jedem Trockner und jeder Spülmaschine, egal wie alt.

## Was du brauchst

| | |
|---|---|
| **Steckdose mit Strommessung** | z. B. die [NOUS A1Z (Zigbee, 16 A)](https://www.amazon.de/dp/B0CCQH61RD?tag=elcamdob-21)\* – die steckt bei uns hinter der Waschmaschine. Wichtig: **16 A**, Waschmaschinen und Trockner ziehen beim Heizen über 2 kW. Jede andere Steckdose, die in Home Assistant einen Leistungs-Sensor in Watt liefert, geht genauso (Shelly Plug, Tasmota …). |
| **Handy** | Die Home-Assistant-App, angemeldet an deinem Home Assistant |

## 1. Steckdose einbinden

Zwischen Wandsteckdose und Gerät stecken, in Home Assistant einbinden (Zigbee: *Gerät hinzufügen*). Danach gibt es einen Sensor **Leistung** (in W) und meist einen **Energie**-Zähler (in kWh).

## 2. Blueprint importieren

[![Importieren](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fgeraete%2Fgeraet_fertig.yaml)

## 3. Automation anlegen

*Einstellungen → Automationen & Szenen → Blueprints* → **Waschmaschine, Trockner & Co. – fertig melden**. Für jedes Gerät eine eigene Automation.

| Feld | Was eintragen |
|---|---|
| Leistung der Steckdose | der Leistungs-Sensor in W |
| Name des Geräts | steht so in der Nachricht: „✅ Trockner ist fertig“ |
| Handys | wer benachrichtigt werden soll |
| Nur Handys, die zu Hause sind | Vorgabe an – unterwegs bringt die Nachricht nichts |
| Erkennung *(aufklappen)* | siehe Tabelle unten |
| Extras *(aufklappen)* | Energiezähler (kWh in der Nachricht), Erinnerung, zusätzliche Aktionen |

## Richtwerte je Gerät

| Gerät | Läuft ab | … für | Fertig unter | … für | Erinnerung |
|---|---|---|---|---|---|
| **Waschmaschine** | 20 W | 2 min | 5 W | 5 min | 30 min (wenn sie danach nicht ausgeschaltet wird) |
| **Trockner (Wärmepumpe)** | 200 W | 2 min | 20 W | 3 min | 30 min, *Ausgeschaltet/Tür offen unter* 1 W |
| **Spülmaschine** | 20 W | 2 min | 5 W | 15 min | – |

**Warum so unterschiedlich?**

- **Trockner** mit Wärmepumpe laufen nach dem Trocknen noch rund 20 Minuten mit etwa 100 W zum Abkühlen weiter – das gehört noch zum Programm. Danach kommt der Knitterschutz: Alle paar Minuten dreht die Trommel kurz, dazwischen braucht das Gerät ein paar Watt. Genau daran erkennt die **Erinnerung**, dass die Tür noch zu ist. Wird die Tür geöffnet oder das Gerät ausgeschaltet, fällt die Leistung auf 0 W – dann kommt keine Erinnerung.
- **Spülmaschinen** machen lange Pausen (Einweichen, Trocknen ohne Heizung). Deshalb 15 Minuten, bevor „fertig“ gemeldet wird.

**Eigene Werte finden:** Einen Lauf abwarten, dann den Leistungs-Sensor öffnen und den Verlauf ansehen. *Läuft ab* liegt deutlich über dem Standby, *Fertig unter* knapp darüber; die längste Pause im Programm bestimmt die zweite Dauer.

## Klappt nicht?

| Problem | Lösung |
|---|---|
| Meldet „fertig“ mitten im Programm | *Fertig unter … für* verlängern – das Programm hat eine längere Pause. |
| Meldet gar nicht | *Automation → Traces*: Startet sie? Wenn nicht, liegt *Läuft ab* zu hoch. Startet sie, wird aber nie fertig: *Fertig unter* liegt unter dem Standby des Geräts. |
| Keine Nachricht, obwohl zu Hause | Die Home-Assistant-App braucht die Standortfreigabe, sonst weiß Home Assistant nicht, wer zu Hause ist – oder *Nur Handys, die zu Hause sind* ausschalten. |
| Nach einem Neustart von Home Assistant keine Meldung | Läuft das Gerät während des Neustarts, verliert die Automation den Lauf. Beim nächsten Mal klappt es wieder. |

---

*Mit \* gekennzeichnete Links sind Affiliate-Links. Kaufst du darüber, bekomme ich eine kleine Provision, für dich ändert sich am Preis nichts. Als Amazon-Partner verdiene ich an qualifizierten Verkäufen.*

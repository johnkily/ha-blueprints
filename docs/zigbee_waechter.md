# Zigbee-Wächter: Koordinator hängt → automatisch neu starten

*[English version](en/zigbee_waechter.md)*

Manchmal hängt der Zigbee-Chip im Koordinator: Zigbee2MQTT läuft, Home Assistant läuft, aber kein Gerät meldet sich mehr und jeder Befehl scheitert (im Log von Zigbee2MQTT z. B. `SRSP - AF - dataRequest after 6000ms`). Licht, Schalter und Automationen mit Zigbee gehen dann ins Leere – und nachts oder im Urlaub merkt es niemand.

Der Wächter fragt alle 5 Minuten ein Zigbee-Gerät nach seinem Zustand und wartet auf die Antwort. Antwortet keines der ausgewählten Geräte, startet er den Zigbee-Chip und Zigbee2MQTT neu, prüft danach, ob Zigbee wieder antwortet, und sagt dir Bescheid.

**Warum er aktiv nachfragt, statt auf Stille zu warten:** Home Assistant verwirft Meldungen, deren Wert sich nicht geändert hat. Nach außen sieht Zigbee dann oft minutenlang still aus, obwohl alles funkt – bei uns nachts bis zu 17 Minuten. Ein Wächter, der auf Stille wartet, schlägt entweder ständig falschen Alarm oder viel zu spät an.

## Was du brauchst

| | |
|---|---|
| **Zigbee2MQTT** | als App in Home Assistant (für den Neustart) und die MQTT-Integration |
| **Geräte zum Nachfragen** | zwei oder drei Zigbee-Geräte **am Strom**, am besten Steckdosen – sie antworten auch, wenn sie ausgeschaltet sind. Batteriegeräte schlafen und eignen sich nicht. |
| **Koordinator mit Neustart-Knopf** *(empfohlen)* | Bei SMLIGHT-Koordinatoren wie dem [SLZB-06](https://www.amazon.de/dp/B0BL6DQSB3?tag=elcamdob-21)\* findet Home Assistant die SMLIGHT-Integration von selbst; sie bringt den Knopf „Zigbee-Neustart“ mit. Ein Neustart von Zigbee2MQTT allein erreicht einen hängenden Chip nicht zuverlässig. Ohne Knopf startet der Wächter nur Zigbee2MQTT neu. |
| **Handy** | für die Nachricht: die Home-Assistant-App |

## 1. Blueprint importieren

[![Importieren](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fzigbee%2Fzigbee_waechter.yaml)

## 2. Automation anlegen

*Einstellungen → Automationen & Szenen → Blueprints* → **Zigbee-Wächter – Koordinator hängt, automatisch neu starten**.

| Feld | Was eintragen |
|---|---|
| Zigbee-Geräte zum Nachfragen | die Namen der Geräte **wie in Zigbee2MQTT** (friendly name), durch Kommas getrennt, z. B. `Steckdose Waschmaschine, Steckdose Flur` |
| Nachricht an | wessen Handy Bescheid bekommt; leer = keine Nachricht |
| Neustart-Knopf des Zigbee-Chips *(aufklappen)* | bei SMLIGHT z. B. `button.slzb_06_zigbee_neustart`; leer lassen, wenn es keinen gibt |
| Zigbee2MQTT-App (Slug) | Vorgabe `45df7312_zigbee2mqtt` passt für die offizielle Zigbee2MQTT-App; sonst steht die Kennung unter *Einstellungen → Apps → Zigbee2MQTT* in der Adresszeile |
| Verbindungsstatus von Zigbee2MQTT | der Binärsensor „Connection state“ am Gerät „Zigbee2MQTT Bridge“ – dann prüft der Wächter erst, wenn Zigbee2MQTT seit 5 Minuten verbunden ist |
| Höchstens ein Neustart pro | Vorgabe 30 Minuten |
| Auf Antwort warten, Basis-Topic von Zigbee2MQTT, Meldung auch in Home Assistant anzeigen *(Feinheiten)* | meist passen die Vorgaben: 15 Sekunden, `zigbee2mqtt`, aus |

**Ausprobieren:** In Zigbee2MQTT ein Gerät aus der Liste umbenennen – beim nächsten Durchgang fragt der Wächter das nächste Gerät. Erst wenn **keines** antwortet, startet er neu.

## Was du aufs Handy bekommst

| Fall | Nachricht |
|---|---|
| Kein Gerät antwortet | ⚠️ **Zigbee hängt – Neustart** – Keines der Geräte (…) hat geantwortet. Zigbee-Chip und Zigbee2MQTT werden neu gestartet. |
| Nach dem Neustart wieder da | ✅ **Zigbee läuft wieder** |
| Neustart hat nicht geholfen | ❌ **Zigbee antwortet weiter nicht** – Bitte den Zigbee-Koordinator kurz vom Strom nehmen. |

Solange alles läuft, bleibt es still.

## Gut zu wissen

- **Ein Neustart pro Sperrzeit:** Nach einem Neustart wartet der Wächter die Sperrzeit ab, bevor er wieder prüft. So schaukelt sich nichts auf, wenn Zigbee wirklich kaputt ist.
- **Während Updates:** Mit dem Verbindungsstatus prüft der Wächter nicht, solange Zigbee2MQTT gerade startet oder aktualisiert wird.
- **Die Nachfrage ist harmlos:** Sie liest nur den Zustand (`/get`), schaltet nichts.

## Klappt nicht?

| Problem | Lösung |
|---|---|
| Startet ständig neu | Stimmen die Namen genau so wie in Zigbee2MQTT (Groß-/Kleinschreibung, Leerzeichen)? Unter *Automation → Traces* sieht man, welches Topic gefragt wurde. Sind es Batteriegeräte? Die antworten nicht. |
| Neustart passiert, aber Zigbee2MQTT startet nicht neu | Slug prüfen (*Einstellungen → Apps → Zigbee2MQTT*, Adresszeile). Läuft Zigbee2MQTT nicht als App, das Feld leer lassen. |
| Anderes Basis-Topic | steht in Zigbee2MQTT unter *Einstellungen → MQTT* – unter *Feinheiten* eintragen |

---

*Mit \* gekennzeichnete Links sind Affiliate-Links. Kaufst du darüber, bekomme ich eine kleine Provision, für dich ändert sich am Preis nichts. Als Amazon-Partner verdiene ich an qualifizierten Verkäufen.*

**Gefällt er dir?** Ein ⭐ auf [GitHub](https://github.com/johnkily/ha-blueprints) hilft anderen, ihn zu finden – Fragen und Wünsche gern als [Issue](https://github.com/johnkily/ha-blueprints/issues) oder unter [Ideen](https://github.com/johnkily/ha-blueprints/discussions/categories/ideas).

# Morgenbericht – Schritt für Schritt

*[English version](en/morgenbericht.md)*

Was war nachts los? Der Blueprint schreibt nachts in eine To-do-Liste, was auffällt: eine Tür, die aufgeht, ein Schloss, das aufgeschlossen wird, Bewegung an der Einfahrt, ein Gerät, das nicht mehr erreichbar ist, oder ungewöhnlich viel Stromverbrauch. Morgens steht der Bericht in der Liste. Die Liste kannst du als Karte ins Dashboard legen.

**Eine Nachricht aufs Handy kommt nur, wenn wirklich etwas war.** Ein tägliches „alles ruhig“ liest nach einer Woche niemand mehr. In der Liste steht dann einfach „✓ Nacht ruhig“.

## Was du brauchst

| | |
|---|---|
| **Eine Lokale To-do-Liste** | *Einstellungen → Geräte & Dienste → Integration hinzufügen → Lokale To-do-Liste*, Name z. B. „Nachtbericht“. Sie gehört dem Blueprint allein: Er leert sie jeden Abend. |
| **Kontakte, Schlösser, Bewegungsmelder** | was du hast – alles ist optional |
| **Stromzähler** *(optional)* | ein Energie-Sensor in kWh, z. B. der Netzbezug aus dem Energie-Dashboard. Diese Prüfung braucht Home Assistant 2026.10 oder neuer. |

## 1. Blueprint importieren

[![Importieren](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fhaus%2Fmorgenbericht.yaml)

## 2. Automation anlegen

*Einstellungen → Automationen & Szenen → Blueprints* → **Morgenbericht – Was war nachts los?**

| Feld | Was eintragen |
|---|---|
| To-do-Liste für den Bericht | die Liste aus „Was du brauchst“ |
| Nacht beginnt um / Nacht endet um | Vorgabe 23:00 bis 6:00. Zum Beginn wird die Liste geleert, am Ende wird geprüft, was noch offen ist |
| Bericht um | Vorgabe 7:00 – dann kommt die Nachricht, falls etwas war |
| Türen und Fenster | Kontakte. Geht einer nachts auf, steht es mit Uhrzeit im Bericht. Ist er am Morgen noch offen, auch |
| Schlösser | wird nachts aufgeschlossen oder ist am Morgen nicht abgeschlossen |
| Bewegung draußen | z. B. Bewegungsmelder oder Personenerkennung der Kamera |
| Geräte, die erreichbar sein sollen | länger als 30 Minuten „nicht verfügbar“ → steht im Bericht |
| Stromzähler / Melden ab | verbraucht das Haus nachts mehr als das, steht es im Bericht (Vorgabe 5 kWh) |
| Handys / Eigenes Skript | wohin die Nachricht geht |
| Auch „Nacht ruhig“ als Nachricht schicken | aus lassen, wenn du nur bei Auffälligem etwas hören willst |

**Speichern** – fertig. Den ersten Bericht gibt es am nächsten Morgen.

Passiert dasselbe mehrmals, gibt es keinen zweiten Eintrag. Der vorhandene wird hochgezählt, z. B. „🚪 Haustür geöffnet 3×, zuletzt 04:12“.

## Wie hoch soll die Stromgrenze sein?

Schau im Energie-Dashboard nach, was das Haus in einer normalen Nacht braucht, und nimm etwas mehr. Bei uns sind es zwischen 3 und 5 kWh pro Nacht. Wer nachts das Auto lädt oder den Hausakku aus dem Netz füllt, nimmt besser den Zähler eines einzelnen Geräts oder lässt das Feld leer.

## Im Dashboard zeigen

Einfach eine **To-do-Liste-Karte** mit der Liste anlegen. Die Haken zum Abhaken stören dabei nicht: Abhaken heißt „gesehen“, und am Abend ist die Liste sowieso wieder leer.

## Klappt nicht?

| Problem | Lösung |
|---|---|
| Liste bleibt leer, auch nicht „Nacht ruhig“ | *Automation → Traces* um die Berichtszeit ansehen. Ist es die richtige Liste? |
| Tür steht nicht drin | Nur Ereignisse zwischen Nachtbeginn und Nachtende zählen. Und nur, wenn der Kontakt von „zu“ auf „offen“ geht – nach einem Neustart zählt das erste Melden nicht. |
| Kein Stromhinweis | Hat der Zähler eine Langzeitstatistik (taucht er im Energie-Dashboard auf)? Und läuft Home Assistant 2026.10 oder neuer? |
| Zu viele Einträge von der Kamera | Bewegungsmelder weglassen oder nur die Personenerkennung nehmen. |


**Gefällt dir der Blueprint?** Ein ⭐ auf [GitHub](https://github.com/johnkily/ha-blueprints) hilft anderen, ihn zu finden – und Fragen oder Wünsche gern als [Issue](https://github.com/johnkily/ha-blueprints/issues) oder unter [Ideen](https://github.com/johnkily/ha-blueprints/discussions/categories/ideas).

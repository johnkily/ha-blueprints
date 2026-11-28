# Saugroboter-Wochenplan – Schritt für Schritt

*[English version](en/saugplan.md)*

Der Saugroboter saugt an den Tagen, die du in Home Assistant auswählst, und an anderen Tagen saugt und wischt er. Im Urlaub bleibt er in der Station, auf Wunsch auch an Feiertagen. Wenn du willst, wartet er, bis niemand mehr zu Hause ist. Ist er fertig oder bleibt er hängen, kommt eine Nachricht aufs Handy.

Warum nicht einfach der Timer in der App? Weil die App nichts vom Urlaub weiß und nicht merkt, ob noch jemand im Homeoffice sitzt.

## Was du brauchst

| | |
|---|---|
| **Saugroboter in Home Assistant** | jeder, der als `vacuum.…` auftaucht – Roborock, Dreame, Xiaomi, Ecovacs, iRobot … |
| **Urlaubsmodus** *(optional)* | ein Schalter-Helfer, der im Urlaub an ist – oder jeder andere Schalter, der den Plan pausieren soll |
| **Workday-Integration** *(optional)* | für „an Feiertagen nicht“ – unter *Einstellungen → Geräte & Dienste → Integration hinzufügen → Workday* |

## 1. Timer in der App ausschalten

Sonst saugt er doppelt. In der App des Herstellers alle Zeitpläne löschen oder deaktivieren.

## 2. Blueprint importieren

[![Importieren](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fgeraete%2Fsaugplan.yaml)

## 3. Automation anlegen

*Einstellungen → Automationen & Szenen → Blueprints* → **Saugroboter – Wochenplan aus Home Assistant**. Für zwei Roboter einfach zwei Automationen anlegen.

| Feld | Was eintragen |
|---|---|
| Saugroboter | dein Roboter |
| Uhrzeit | wann er startet (Vorgabe 14:00) |
| Saugen an diesen Tagen | z. B. Dienstag und Donnerstag |
| Saugen und wischen an diesen Tagen | z. B. Mittwoch und Freitag – leer lassen, wenn er nicht wischt |
| Pausieren, wenn eingeschaltet | z. B. der Urlaubsmodus; mehrere möglich |
| Arbeitstag-Sensor | der Sensor aus Workday – dann ruht er an Feiertagen (Montag bis Freitag) |
| Erst wenn niemand zu Hause ist | an = ist noch jemand da, wartet er, bis alle weg sind. *Längstens warten bis:* ist dann noch jemand da, fällt die Runde aus |
| Vor dem Saugen / Vor dem Saugen und Wischen | was vor dem Start umgestellt werden soll, siehe unten |
| Nachrichten | Handys oder ein eigenes Skript; *Melden, wenn er fertig ist* |

**Speichern** – fertig. Er startet nur, wenn er in der Station steht. Läuft er gerade oder hat einen Fehler, fällt die Runde aus.

## Saugen oder wischen umstellen

Jeder Hersteller macht das anders. Deshalb gibt es zwei freie Felder, in die du Aktionen einträgst. Sie laufen kurz vor dem Start, je nachdem, ob heute ein Saug- oder ein Wischtag ist.

**Roborock** (offizielle Integration) – bei uns so eingestellt:

| Vor dem Saugen | Vor dem Saugen und Wischen |
|---|---|
| *Auswahl: Option auswählen* → `select.…_reinigungsmodus` → `vacuum` | `select.…_reinigungsmodus` → `vac_and_mop` |
| `select.…_wischintensitat` → `off` | `select.…_wischintensitat` → `medium` |

Die Auswahl-Entitäten heißen je nach Sprache etwas anders („Mop mode“, „Mop intensity“). Unter *Einstellungen → Geräte* beim Roboter nachsehen, welche Auswahlfelder er hat.

**Andere Roboter:** Viele haben ebenfalls eine Auswahl für Wischen/Saugen oder die Wassermenge. Wer keine hat, lässt beide Felder leer – dann wischt der Roboter einfach so, wie er gerade eingestellt ist.

Auch die Saugstärke lässt sich hier setzen: *Saugroboter: Lüftergeschwindigkeit festlegen*.

## Klappt nicht?

| Problem | Lösung |
|---|---|
| Startet nicht | *Automation → Traces*: Welche Bedingung hat abgebrochen? Häufig steht der Roboter nicht auf „angedockt“, oder ein Pause-Schalter ist an. |
| Saugt doppelt | Timer in der App ausschalten (Schritt 1). |
| Startet trotz „niemand zu Hause“ | Gezählt werden die Personen, die auf „Zuhause“ stehen (unter *Einstellungen → Personen*). Jede Person braucht ein Gerät zur Ortung – das Handy mit der Home-Assistant-App oder z. B. die Anmeldung am Router. |
| Keine Fertig-Nachricht | Die Nachricht kommt, sobald er nach dem Saugen wieder „angedockt“ oder „untätig“ meldet. Meldet er gar nicht erst „reinigt“, wartet der Blueprint 5 Minuten und meldet dann trotzdem – im Trace sieht man, welche Zustände er geliefert hat. |


**Gefällt dir der Blueprint?** Ein ⭐ auf [GitHub](https://github.com/johnkily/ha-blueprints) hilft anderen, ihn zu finden – und Fragen oder Wünsche gern als [Issue](https://github.com/johnkily/ha-blueprints/issues) oder unter [Ideen](https://github.com/johnkily/ha-blueprints/discussions/categories/ideas).

**Hat's geklappt?** Dann freue ich mich über einen [Kaffee oder Tee auf Ko-fi 🍵](https://ko-fi.com/johnkily).

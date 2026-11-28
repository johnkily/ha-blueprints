# Klingel aufs TV – Schritt für Schritt

*[English version](en/klingel_tv.md)*

Klingelt es, während der Fernseher läuft, pausiert der Film. Oben rechts erscheint die Kamera an der Tür als Bild-im-Bild, oben links eine Meldung mit zwei Knöpfen: **Weiterschauen** und **Bild schließen**. Weiter geht es erst, wenn du „Weiterschauen“ drückst. So verpasst niemand etwas, während er an der Tür ist.

Das Ganze läuft über die App **QuickBars for Home Assistant** auf dem Fernseher. Eine zusätzliche Integration in Home Assistant braucht es nicht: Die App hört selbst auf Home Assistant, der Blueprint schickt ihr nur Bescheid.

## Was du brauchst

| | |
|---|---|
| **TV-Box oder Fernseher mit Android TV / Google TV** | z. B. Nvidia Shield (bei uns), Chromecast mit Google TV oder ein Fernseher mit Google TV. Darauf die kostenlose App [QuickBars for Home Assistant](https://play.google.com/store/apps/details?id=dev.trooped.tvquickbars) aus dem Play Store. |
| **Klingel-Sensor** | Irgendetwas, das beim Klingeln „an“ meldet – z. B. ein Vibrationssensor am alten Gong, siehe [Klingel-Anleitung](klingel.md#was-du-brauchst). |
| **Kamera** | Jede Kamera, die in Home Assistant eingebunden ist. Bei uns ist es eine [Reolink TrackMix WiFi](https://www.amazon.de/dp/B0B4KB6CTB?tag=elcamdob-21)\* über dem Eingang. |
| **Fernseher in Home Assistant** | Am besten über die Integration **Android TV Remote** (ist bei Home Assistant dabei). Darüber pausiert der Film in jeder App, auch in Netflix oder YouTube. |

## 1. QuickBars einrichten

1. QuickBars auf dem Fernseher installieren und öffnen.
2. Mit Home Assistant verbinden: Adresse eingeben und einen **langlebigen Zugangstoken** (in Home Assistant unter *Profil → Sicherheit*, ganz unten).
3. In den Einstellungen der App **„Background Connection“** einschalten.

> **Wichtig:** Ohne „Background Connection“ kommt nichts an. Home Assistant merkt davon nichts, es gibt keine Fehlermeldung. Bei uns war genau das der Grund, warum der erste Test leer blieb.

## 2. Blueprint importieren

[![Importieren](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fklingel%2Fklingel_tv.yaml)

Knopf antippen → **„Blueprint importieren“**.

## 3. Automation anlegen

*Einstellungen → Automationen & Szenen → Blueprints* → **Klingel aufs TV – Kamerabild als Bild-im-Bild (QuickBars)**.

| Feld | Was eintragen |
|---|---|
| Klingel-Sensor | dein Sensor, der beim Klingeln „an“ meldet |
| Kamera | die Kamera an der Tür |
| Fernseher | der Media-Player deiner TV-Box, am besten der aus **Android TV Remote**. Steht er auf „aus“, passiert nichts. |
| Wiedergabe erkennen über | *optional.* Android TV Remote zeigt nur „an“ oder „aus“, nicht, ob gerade ein Film läuft. Hat deine Box noch einen zweiten Eintrag, der „spielt“ meldet (bei der Shield der Chromecast-Eintrag), den hier wählen. Leer = der Fernseher oben. |
| Film pausieren | an = läuft etwas, wird es pausiert und erst mit „Weiterschauen“ fortgesetzt |
| Bild und Meldung | Ecke und Größe des Kamerabilds, wie lange Bild (Vorgabe 90 s) und Meldung (30 s) stehen, Texte und Beschriftung der Knöpfe |
| Nur wenn | *für Fortgeschrittene:* eine zusätzliche Bedingung, z. B. eine bestimmte Harmony-Aktivität |
| Sperrzeit | so lange wird nach einem Klingeln nicht erneut gemeldet (Vorgabe 60 s) |
| Kennung der Knöpfe | nur ändern, wenn du den Blueprint für mehrere Fernseher nutzt – dann je Fernseher eine eigene |

**Speichern** – fertig.

## So verhält er sich

- **Weiterschauen:** Das Kamerabild geht zu, der Film läuft weiter – aber nur, wenn ihn der Blueprint vorher pausiert hat.
- **Bild schließen:** Nur das Kamerabild geht zu. Lief vorher nichts, ist das der einzige Knopf, den du brauchst.
- **Kein Knopf gedrückt:** Das Bild geht nach der eingestellten Zeit von selbst zu, der Film **bleibt pausiert**. Mit Absicht: Wer gerade an der Tür ist, soll nichts verpassen.
- **Fernseher aus:** Es passiert nichts. Für die Nachricht aufs Handy gibt es den [Klingel-Blueprint](klingel.md) – beide laufen gut nebeneinander.

## Ohne zu klingeln testen

*Entwicklerwerkzeuge → Ereignisse* → Ereignistyp `quickbars.open`, Daten:

```yaml
camera_entity: camera.deine_kamera
position: top_right
size: large
auto_hide: 20
```

**Ereignis auslösen** – jetzt muss das Kamerabild 20 Sekunden auf dem Fernseher stehen. Kommt nichts, liegt es an der App (siehe unten), nicht am Blueprint.

## Klappt nicht?

| Problem | Lösung |
|---|---|
| Auf dem Fernseher kommt nichts | In QuickBars **„Background Connection“** einschalten. Danach mit dem Test oben prüfen. |
| Automation startet gar nicht | *Automation → Traces* zeigen, woran es liegt. Meist steht der Fernseher auf „aus“ oder „Standby“ – dann ist das so gewollt. |
| Film pausiert nicht | Unter *Fernseher* den Eintrag aus **Android TV Remote** wählen. Cast-Einträge pausieren nur Apps, die selbst casten. |
| „Film ist pausiert“ fehlt, obwohl etwas lief | Der gewählte Fernseher zeigt nicht „spielt“ an. Unter *Wiedergabe erkennen über* einen Eintrag wählen, der es tut. |
| Bild bleibt schwarz | Läuft die Kamera in Home Assistant? Manche Kameras brauchen einen Moment, bis das Bild steht. |
| Meldet ein Klingeln mehrfach | Sperrzeit erhöhen. |

QuickBars ist ein Projekt von [Trooped](https://github.com/Trooped/QuickBars) und hat mit diesem Blueprint nichts zu tun – Fragen zur App am besten dort.


**Gefällt dir der Blueprint?** Ein ⭐ auf [GitHub](https://github.com/johnkily/ha-blueprints) hilft anderen, ihn zu finden – und Fragen oder Wünsche gern als [Issue](https://github.com/johnkily/ha-blueprints/issues) oder unter [Ideen](https://github.com/johnkily/ha-blueprints/discussions/categories/ideas).

---

*Mit \* gekennzeichnete Links sind Affiliate-Links. Kaufst du darüber, bekomme ich eine kleine Provision, für dich ändert sich am Preis nichts. Als Amazon-Partner verdiene ich an qualifizierten Verkäufen.*

**Hat's geklappt?** Dann freue ich mich über einen [Kaffee oder Tee auf Ko-fi 🍵](https://ko-fi.com/johnkily).

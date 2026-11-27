# Willkommenslicht – Begrüßung in der Farbe der Person

*[English version](en/willkommenslicht.md)*

*📰 Im Blog: [Willkommen zu Hause: Der Windfang leuchtet in der Farbe des Autos, das heimkommt](https://kilysworld.com/2026/11/25/willkommen-zu-hause-der-windfang-leuchtet-in-der-farbe-des-autos-das-heimkommt/) – wie wir das im Alltag nutzen, mit Fotos*

Kommt jemand heim, leuchtet ein Licht im Eingang in „seiner“ Farbe. Bei uns sind das die Farben unserer Autos: Türkis für mich, Pink für meine Frau. Kommen beide kurz hintereinander, wechseln die Farben. Ist die Haustür wieder zu, ist das Licht nach 20 Sekunden wieder so wie vorher.

## Was du brauchst

| | |
|---|---|
| **Ein farbiges Licht** | z. B. ein LED-Streifen mit WLED – bei uns [dieser Streifen](https://www.amazon.de/dp/B0BTVB7WRY?tag=elcamdob-21)\* mit diesem [WLED-Controller](https://www.amazon.de/dp/B0D8LKXTTK?tag=elcamdob-21)\* –, eine farbige Lampe oder ein [Philips Hue Lightstrip](https://www.amazon.de/dp/B0GHS99N3N?tag=elcamdob-21)\* geht genauso |
| **Handys** | die Home-Assistant-App, damit Home Assistant weiß, wer heimkommt (Personen unter *Einstellungen → Personen*) |
| **Türkontakt** *(empfohlen)* | an der Haustür für das saubere Ende, z. B. von [SONOFF](https://www.amazon.de/dp/B0HB933HR1?tag=elcamdob-21)\* oder [Aqara](https://www.amazon.de/dp/B09TP7VMKB?tag=elcamdob-21)\* |

## 1. Blueprint importieren

[![Importieren](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Flicht%2Fwillkommenslicht.yaml)

## 2. Automation anlegen

*Einstellungen → Automationen & Szenen → Blueprints* → **Willkommenslicht – Begrüßung in der Farbe der Person**

| Feld | Was eintragen |
|---|---|
| Personen | wer begrüßt wird, bis zu fünf – die Reihenfolge bestimmt die Farbe |
| Farbe 1 | Farbe der ersten Person (Vorgabe Türkis) |
| Farbe 2 | Farbe der zweiten Person (Vorgabe Pink) |
| Farbe 3 | Farbe der dritten Person (Vorgabe Orange) |
| Farbe 4 / Farbe 5 | für die vierte und fünfte Person (Vorgabe Lila und Grün) |
| Licht im Eingang | dein farbiges Licht |
| Türkontakt der Haustür | 20 Sekunden nachdem sie zu ist, endet die Begrüßung |
| *Feinheiten (aufklappen)* | wie lange jemand weg gewesen sein muss (Vorgabe 15 min), Höchstdauer (5 min), eine weitere Tür (z. B. Hintertür – geht sie auf, endet es sofort), Helligkeit tagsüber und nachts (0–6 Uhr), ein Effekt (z. B. „Breathe“ bei WLED für sanftes Pulsieren), Lampen, die bei Dunkelheit zusätzlich angehen (z. B. Einfahrt und Flur), und wie lange |

## So läuft es ab

- Begrüßt wird nur, wer vorher mindestens 15 Minuten weg war – sonst würde jeder Gang zum Briefkasten das Licht auslösen.
- Das Handy meldet die Ankunft meist ein, zwei Minuten bevor die Tür aufgeht. Kommt die Meldung erst, wenn man schon drin ist, leuchtet es nur kurz.
- Kommt die zweite Person, während es noch leuchtet, wechseln die Farben alle paar Sekunden.
- Danach stellt Home Assistant den Zustand von vorher wieder her (an/aus, Farbe, Helligkeit).
- Zusätzliche Lampen gehen nur an, wenn es dunkel ist und sie aus waren – und nur diese gehen nach der Nachlaufzeit wieder aus.

## Gut zu wissen

- **WLED:** War der Streifen vorher aus, schaltet Home Assistant ihn danach wieder aus. Beim nächsten Einschalten zeigt WLED aber noch die Willkommensfarbe. Wer das nicht will, speichert seine normale Farbe in WLED als Voreinstellung und lässt sie beim Einschalten laden.
- Die Farben gibt es nur beim Heimkommen. Zum Ausprobieren ohne Rausgehen: unter *Automation → ⋮ → Ausführen* geht das nicht, weil die Bedingung „vorher weg“ fehlt – am einfachsten einmal kurz um den Block gehen 🙂

## Klappt nicht?

| Problem | Lösung |
|---|---|
| Es passiert nichts | Steht die Person bei der Ankunft auf „Zuhause“? Unter *Einstellungen → Personen* muss ihr Handy als Gerät eingetragen sein. War sie lange genug weg (Feinheiten)? |
| Licht wird nur weiß | Kann das Licht Farben? Bei manchen Lampen nur, wenn kein Effekt gesetzt ist – Effekt-Feld leer lassen. |
| Endet nicht | Türkontakt eingetragen? Ohne endet es erst nach der Höchstdauer. |

---

*Mit \* gekennzeichnete Links sind Affiliate-Links. Kaufst du darüber, bekomme ich eine kleine Provision, für dich ändert sich am Preis nichts. Als Amazon-Partner verdiene ich an qualifizierten Verkäufen.*

**Gefällt er dir?** Ein ⭐ auf [GitHub](https://github.com/johnkily/ha-blueprints) hilft anderen, ihn zu finden – Fragen und Wünsche gern als [Issue](https://github.com/johnkily/ha-blueprints/issues) oder unter [Ideen](https://github.com/johnkily/ha-blueprints/discussions/categories/ideas).

**Hat's geklappt?** Dann freue ich mich über einen [Kaffee auf Ko-fi ☕](https://ko-fi.com/johnkily).

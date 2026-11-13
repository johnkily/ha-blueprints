# Änderungen

## Seit v1.2

**Müll-Erinnerung: erinnern, bis die Tonne draußen ist** – neue Option „Wiederholen, bis bestätigt“: Die Nachricht hat einen Knopf „Rausgestellt ✅“ und kommt stündlich wieder, bis jemand tippt (längstens bis 21 Uhr); Tippen löscht sie auf allen Handys. Optional ein Datums-Helfer – die Profi-Karte zeigt dann „✓ Draußen“ statt zu wackeln – und ein Pause-Schalter (z. B. Urlaubsmodus). „Nur Handys, die zu Hause sind“: Ist niemand zu Hause, bekommen jetzt alle Bescheid. Bestehende Automationen laufen unverändert weiter (Vorgabe aus). Idee von Stefan auf Facebook.

**Neu: Stumme Geräte melden** – prüft stündlich die „Last seen“-Entitäten von Zigbee2MQTT und meldet Geräte, die sich länger als 48 Stunden nicht gemeldet haben (meist leere Batterie), nach dem Tausch „Wieder da“, auf Wunsch eine Wochenübersicht mit fast leeren Batterien. Fällt Zigbee2MQTT ganz aus, gibt es eine einzige Meldung statt vieler. Deutsch und Englisch. Wunsch aus den Blog-Kommentaren zum Batterie-Beitrag.

**Müll-Karte Profi:** Die wackelnde Kachel wird beim Drehen leicht verkleinert – vorher schnitt button-card die Ecken ab (Hinweis von Frank auf Facebook). Karte neu hineinkopieren. In der Anleitung: iCal-Link kopieren statt anklicken, und was beim Jahreswechsel zu tun ist.

**English versions:** Türen abschließen, AWTRIX-Strompreis, AWTRIX-Müll-Ampel, Müll-Plan und Müll-Erinnerung gibt es jetzt auch mit englischen Feldnamen, Stichwörtern und Meldungen (`blueprints/automation/en/…`, Strompreis mit Dezimalpunkt). Erzeugt aus dem deutschen Original mit `tools/englisch.py` – die deutsche Datei bleibt unverändert. Anregung aus dem HA-Forum (danke, fleskefjes).

**Neu:** Zigbee-Wächter – fragt alle 5 Minuten Zigbee-Geräte über Zigbee2MQTT nach ihrem Zustand; antwortet keines, startet er Zigbee-Chip (z. B. SMLIGHT SLZB-06) und Zigbee2MQTT neu und meldet das Ergebnis. Höchstens ein Neustart pro Sperrzeit.

**Müll: Stichwörter ausschließen** – ein `!` davor sortiert Termine aus, z. B. `Restmüll, !Container`, wenn der Entsorger „Restmüll“ und „Restmüll Container“ getrennt führt. In *Müll – Plan*, *Müll – Erinnerung* und der AWTRIX-Müll-Ampel; bestehende Stichwörter funktionieren unverändert. Wunsch aus Issue #1 (danke, RealMunichMan). Blueprint unter *Blueprints → ⋮ → Blueprint erneut importieren* aktualisieren.

**Müll-Karten:** Werden zwei Tonnen am selben Tag abgeholt, nennt „Als Nächstes“ jetzt beide; in der Profi-Variante leuchten beide Kacheln und das Kästchen im Streifen ist in beide Farben geteilt. Hinweis aus dem simon42-Forum (danke, moonsorrox). Karte neu hineinkopieren – der Blueprint bleibt unverändert.

## v1.2 – 03.11.2026

**Neu:** Türen abschließen, wenn niemand zu Hause ist – schließt die smarten Schlösser ab, die noch offen sind, sobald alle ausgewählten Personen eine Weile weg sind. Eine Tür, die laut Kontakt offen steht, wird nicht verriegelt, sondern gemeldet. Mit Ausnahme-Schalter für Gäste.

**Anleitungen auf Englisch** unter `docs/en/` (die Feldnamen in den Blueprints bleiben deutsch, die Anleitungen nennen sie mit Übersetzung) und eine englische Müll-Kachel-Karte.

**Sonst:** README nach den Seiten unseres Dashboards gegliedert, GIFs von AWTRIX-Uhr und Müll-Karte, aktuelle Nuki-Modelle und ein Shelly-Beispiel in den Anleitungen. Die Beschreibungen der Blueprints verlinken die Anleitung und bitten um einen ⭐ – an der Funktion ändert sich nichts.

## v1.1 – 24.10.2026

**Neu:** AWTRIX – Warnung, solange Tür oder Tor offen ist. Eine Ecke blinkt, optional eine Meldung, die bis zum Schließen stehen bleibt; Verzögerung einstellbar. Angeregt durch eine Frage im Home-Assistant-Forum.

Die übrigen Blueprints sind unverändert.

## v1.0 – 23.10.2026

Erste Version. Jeder Baustein ist auf einem frisch installierten Home Assistant (HAOS 18.3, Core 2026.10) mit dem Import-Knopf von GitHub installiert und durchgetestet.

**Blueprints**
- AWTRIX – aktueller Strompreis (grün/gelb/rot, €/kWh und ct/kWh, mehrere Uhren)
- AWTRIX – Akku-Ampel in der Ecke
- AWTRIX – Müll-Ampel in der Ecke (jeder Abfallkalender)
- Klingel – Nachricht mit Kamerabild aufs Handy
- Sonnenschutz je Fassade
- Waschmaschine, Trockner & Co. – fertig melden
- Müll – Erinnerung am Vorabend
- Müll – Plan für die Kachel-Karte

**Karten**
- Müll-Kachel-Karte (nur eingebaute Karten)
- Müll-Kachel-Karte, Profi-Variante (button-card)
- Müll-Karte, schlichte Variante

**Aktualisieren:** In Home Assistant unter *Blueprints* auf die drei Punkte → „Blueprint erneut importieren“. Deine Einstellungen bleiben erhalten.

# Änderungen

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

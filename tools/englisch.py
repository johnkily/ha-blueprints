#!/usr/bin/env python3
"""English versions of the blueprints – generated from the German originals.

The German files stay the source of truth and stay untouched (existing imports keep working).
This script copies each listed blueprint to blueprints/automation/en/… and replaces every
user-visible German text (name, description, input labels, notifications) with English.
Input keys stay the same, so both versions behave identically.

Each replacement must match at least once – if the German original changes and a text no
longer matches, the script stops instead of writing a half-translated file.

    python3 tools/englisch.py           # write all English files
    python3 tools/englisch.py --check   # only check that all replacements still match
"""
import os
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RAW = "https://github.com/johnkily/ha-blueprints/blob/main/"


def block(old_start, old_end, new):
    """Replace a multi-line block from old_start up to (excl.) old_end."""
    return ("BLOCK", old_start, old_end, new)


BLUEPRINTS = {
    "blueprints/automation/sicherheit/tueren_abschliessen.yaml": {
        "ziel": "blueprints/automation/en/security/lock_doors_when_away.yaml",
        "ersetzen": [
            ("name: Türen abschließen, wenn niemand zu Hause ist", "name: Lock doors when nobody is home"),
            block("  description: >\n    Sind alle", "  domain: automation",
                  "  description: >\n"
                  "    Once all selected people have been away for a while, Home Assistant locks\n"
                  "    the smart locks that are still unlocked. A door that is actually standing\n"
                  "    open (according to its door contact) is not locked – the bolt would shoot\n"
                  "    into thin air – you get a warning instead. A notification is only sent\n"
                  "    when something happened. Optional exception switch for guests or pet sitters.\n\n\n"
                  "    Guide: https://github.com/johnkily/ha-blueprints/blob/main/docs/en/tueren_abschliessen.md"
                  " – like it? A ⭐ on GitHub helps others find it.\n"),
            ("name: Wer muss weg sein", "name: Who has to be away"),
            ("description: Abgeschlossen wird erst, wenn keine dieser Personen zu Hause ist.",
             "description: Doors are only locked when none of these people is home."),
            ("name: Türschlösser", "name: Door locks"),
            ("name: Abschließen nach", "name: Lock after"),
            ("description: So lange muss niemand zu Hause sein. Fängt das kurze „Ich hab was vergessen“ ab.",
             "description: How long nobody has to be home. Catches the quick “I forgot something”."),
            ("name: Nachricht an", "name: Notify"),
            ("description: Leer lassen = keine Nachricht.", "description: Leave empty for no notification."),
            ("name: Türkontakte und Ausnahme (empfohlen)", "name: Door contacts and exception (recommended)"),
            ("name: Türkontakte\n", "name: Door contacts\n"),
            block("          description: >\n            In derselben Reihenfolge", "          default: []",
                  "          description: >\n"
                  "            In the same order as the locks (first contact belongs to the first\n"
                  "            lock, and so on). A door that is standing open is not locked but\n"
                  "            reported. If a lock has no contact, select fewer contacts – or move\n"
                  "            that lock to the end of the list.\n"),
            ("name: Nicht abschließen, solange eingeschaltet", "name: Don't lock while this is on"),
            block("          description: >\n            Ein Schalter", "          default: \"\"",
                  "          description: >\n"
                  "            A toggle helper you switch on when someone without a phone is in\n"
                  "            the house – guests, pet sitter, grandparents.\n"),
            ("'⚠️ Tür nicht abgeschlossen'", "'⚠️ Door not locked'"),
            ("'🔒 Türen abgeschlossen'", "'🔒 Doors locked'"),
            ("['Abgeschlossen: '", "['Locked: '"),
            ("['Schloss hat nicht reagiert: '", "['Lock did not respond: '"),
            ("['Steht offen, nicht verriegelt: '", "['Standing open, not locked: '"),
            ("Niemand zu Hause. {{", "Nobody home. {{"),
            ("# Für die Dauer im Auslöser (normale Variablen gibt es dort noch nicht)",
             "# For the duration in the trigger (normal variables are not available there yet)"),
            ("  # Nach einem Neustart von Home Assistant fängt die Wartezeit neu an –\n"
             "  # sonst würde nie abgeschlossen, wenn das Update fällt, während alle weg sind.",
             "  # After a Home Assistant restart the waiting time starts again –\n"
             "  # otherwise nothing would be locked if an update happens while everybody is away."),
            ("      # Je Schloss: noch offen? Kontakt (gleiche Position in der Liste) meldet „offen“?",
             "      # Per lock: still unlocked? Does the contact (same position in the list) report “open”?"),
        ],
    },
}


STERN = "like it? A ⭐ on GitHub helps others find it."
MQTT_UHREN = [
    ("name: MQTT-Name der Uhr(en)", "name: MQTT name of the clock(s)"),
    block("      description: >\n        Steht in der AWTRIX-Weboberfläche", "      selector:\n        text:",
          "      description: >\n"
          "        Shown in the AWTRIX web interface under MQTT → Prefix, e.g.\n"
          "        “awtrix_a1b2c3”. Separate several clocks with commas.\n"),
]
# Bins: German defaults → English keywords (the English guide suggests the same words)
TONNEN = [
    block("      description: >-\n        Welche Wörter im Kalendereintrag", "      collapsed: true",
          "      description: >-\n"
          "        Which words in the calendar event belong to which bin. Separate several words with\n"
          "        commas, case doesn't matter. A ! in front excludes: `General, !Bulky` matches\n"
          "        “General waste” but not “Bulky general waste”.\n"),
    ("name: Tonnen\n", "name: Bins\n"),
    ("name: Restmüll – Stichwörter", "name: General waste – keywords"),
    ("default: Rest, Grau, Schwarz", "default: General, Rubbish, Residual, Refuse, Landfill"),
    ("name: Papier – Stichwörter", "name: Paper – keywords"),
    ("default: Papier, Blau, PPK", "default: Paper, Cardboard"),
    ("name: Gelber Sack / Wertstoff – Stichwörter", "name: Recycling – keywords"),
    ("default: Gelb, Wertstoff, Verpackung, Leichtverpackung", "default: Recycling, Plastic, Packaging, Cans"),
    ("name: Bio – Stichwörter", "name: Organic – keywords"),
    ("default: Bio, Grün, Braun, Kompost", "default: Garden, Food, Organic, Compost"),
]

BLUEPRINTS.update({
    "blueprints/automation/awtrix/strompreis.yaml": {
        "ziel": "blueprints/automation/en/awtrix/electricity_price.yaml",
        "ersetzen": [
            ("name: AWTRIX – aktueller Strompreis", "name: AWTRIX – current electricity price"),
            block("  description: >\n    Zeigt den aktuellen", "  domain: automation",
                  "  description: >\n"
                  "    Shows the current electricity price as its own app on one or more AWTRIX\n"
                  "    pixel clocks (e.g. Ulanzi TC001 with AWTRIX 3) – green, yellow or red\n"
                  "    depending on the price. Works with any price sensor (Tibber, Nordpool,\n"
                  "    EPEX Spot …), whether it reports €/kWh or ct/kWh.\n\n\n"
                  "    Requirement: AWTRIX 3 is connected to the same MQTT broker as Home\n"
                  "    Assistant. Guide: https://github.com/johnkily/ha-blueprints/blob/main/docs/en/awtrix.md – " + STERN + "\n"),
            ("name: Strompreis-Sensor", "name: Electricity price sensor"),
            ("description: Der Sensor mit dem aktuellen Preis, z. B. von Tibber.",
             "description: The sensor with the current price, e.g. from Tibber or Nordpool."),
            *MQTT_UHREN,
            ("name: Grün bis (ct/kWh)", "name: Green up to (ct/kWh)"),
            ("description: Bis zu diesem Preis leuchtet die Zahl grün.", "description: Up to this price the number is green."),
            ("name: Rot ab (ct/kWh)", "name: Red from (ct/kWh)"),
            ("description: Ab diesem Preis leuchtet die Zahl rot, dazwischen gelb.",
             "description: From this price on the number is red, in between yellow."),
            ("name: Nachkommastellen", "name: Decimal places"),
            ("name: Icon bei günstigem Preis (optional)", "name: Icon for a low price (optional)"),
            block("      description: >\n        ID oder Name eines Icons", "      default: \"\"",
                  "      description: >\n"
                  "        ID or name of an icon stored on the clock (load it from LaMetric in the\n"
                  "        AWTRIX web interface under “Icons”). Empty = no icon.\n"),
            ("name: Icon bei mittlerem und hohem Preis (optional)", "name: Icon for a medium or high price (optional)"),
            ("name: Anzeigedauer (Sekunden)", "name: Display time (seconds)"),
            ("description: Wie lange die App bei jedem Durchlauf zu sehen ist.",
             "description: How long the app is shown in each cycle."),
            ("name: Name der App auf der Uhr", "name: Name of the app on the clock"),
            ("description: Nur ändern, wenn du den Blueprint mehrfach nutzt.",
             "description: Only change this if you use the blueprint more than once."),
            ("default: strompreis", "default: electricity_price"),
            ("  # €/kWh -> ct/kWh; Sensoren in ct (oder Cent) bleiben, wie sie sind.",
             "  # €/kWh -> ct/kWh; sensors in ct (or cent) stay as they are."),
            ("            # Text, Farbe und Icon erst hier: als eigene Variable würde HA „24,1“\n"
             "            # als Zahlenpaar (24, 1) lesen.",
             "            # Text, colour and icon are built here: as a separate variable HA would\n"
             "            # read a number like “24,1” as a pair (24, 1)."),
            ("{# lifetime: kommt 30 min kein neuer Preis, verschwindet die App, statt einen alten Preis zu zeigen #}",
             "{# lifetime: if no new price arrives for 30 min, the app disappears instead of showing an old price #}"),
            # decimal point instead of the German comma
            ("| format(ct | float)) | replace('.', ',') %}", "| format(ct | float)) %}"),
        ],
    },
    "blueprints/automation/awtrix/muell_ampel.yaml": {
        "ziel": "blueprints/automation/en/awtrix/waste_bin_indicator.yaml",
        "ersetzen": [
            ("name: AWTRIX – Müll-Ampel in der Ecke", "name: AWTRIX – waste bin indicator in the corner"),
            block("  description: >\n    Eine Ecke", "  domain: automation",
                  "  description: >\n"
                  "    A corner of the AWTRIX pixel clock lights up in the colour of the bin that\n"
                  "    is collected tomorrow – from the evening before, blinking in the morning of\n"
                  "    collection day. Reads any waste calendar that exists in Home Assistant as a\n"
                  "    calendar: your city's ICS link via the “Remote Calendar” integration, Waste\n"
                  "    Collection Schedule or your own calendar.\n\n\n"
                  "    Requirement: AWTRIX 3 is connected to the same MQTT broker as Home\n"
                  "    Assistant. Guide: https://github.com/johnkily/ha-blueprints/blob/main/docs/en/awtrix.md – " + STERN + "\n"),
            ("name: Abfallkalender", "name: Waste calendar"),
            *MQTT_UHREN,
            ("name: Ecke\n", "name: Corner\n"),
            ("label: Oben rechts (1)", "label: Top right (1)"),
            ("label: Mitte rechts (2)", "label: Middle right (2)"),
            ("label: Unten rechts (3)", "label: Bottom right (3)"),
            ("name: Anzeigen ab (Vortag)", "name: Show from (day before)"),
            ("name: Anzeigen bis (Abholtag)", "name: Show until (collection day)"),
            ("name: Am Abholtag blinken", "name: Blink on collection day"),
            *TONNEN,
            ("description: Mehrere mit Komma trennen. Groß-/Kleinschreibung egal.",
             "description: Separate several with commas. Case doesn't matter."),
            ("name: Restmüll – Farbe", "name: General waste – colour"),
            ("name: Papier – Farbe", "name: Paper – colour"),
            ("name: Gelber Sack – Farbe", "name: Recycling – colour"),
            ("name: Bio – Farbe", "name: Organic – colour"),
            ("      # Vorabend: Termine von morgen; am Abholtag bis „bis“: Termine von heute",
             "      # Evening before: tomorrow's events; on collection day until “until”: today's events"),
        ],
    },
    "blueprints/automation/muell/muell_plan.yaml": {
        "ziel": "blueprints/automation/en/waste/waste_plan.yaml",
        "ersetzen": [
            ("name: Müll – Plan für die Kachel-Karte", "name: Waste – plan for the tile card"),
            block("  description: >\n    Liest den Abfallkalender", "  domain: automation",
                  "  description: >\n"
                  "    Reads the waste calendar and writes the next pickup per bin into a text\n"
                  "    helper. The waste tile card draws the four bins with “in 6 days” and the\n"
                  "    two-week strip from it.\n\n\n"
                  "    Create a text helper first (Settings → Devices & services → Helpers →\n"
                  "    Text, name “Waste plan”, maximum length 255).\n\n"
                  "    Guide: https://github.com/johnkily/ha-blueprints/blob/main/docs/en/muell.md – " + STERN + "\n"),
            ("name: Abfallkalender", "name: Waste calendar"),
            ("name: Text-Helfer „Müll-Plan“", "name: Text helper “Waste plan”"),
            ("description: Maximale Länge 255.", "description: Maximum length 255."),
            *TONNEN,
            ("      # Schlichtes Textformat (JSON würde HA beim Schreiben in ein Objekt umdeuten):\n"
             "      #   „p2026-10-29 b2026-11-05 g2026-11-09 r2026-12-12 | 2026-10-29p 2026-11-05b“\n"
             "      #   vorn der nächste Termin je Tonne (p Papier, b Bio, g Gelb, r Rest),\n"
             "      #   hinten alle Termine der nächsten 14 Tage für den Streifen.",
             "      # Plain text format (HA would turn JSON into an object when writing it):\n"
             "      #   “p2026-10-29 b2026-11-05 g2026-11-09 r2026-12-12 | 2026-10-29p 2026-11-05b”\n"
             "      #   first the next pickup per bin (p paper, b organic, g recycling, r general),\n"
             "      #   then all pickups of the next 14 days for the strip."),
        ],
    },
    "blueprints/automation/muell/muell_erinnerung.yaml": {
        "ziel": "blueprints/automation/en/waste/waste_reminder.yaml",
        "ersetzen": [
            ("name: Müll – Erinnerung am Vorabend", "name: Waste – reminder the evening before"),
            block("  description: >\n    Schickt am Vorabend", "  domain: automation",
                  "  description: >\n"
                  "    Sends a notification to your phones the evening before, telling which bin\n"
                  "    is collected tomorrow – for example “🟦 Paper – please put it out tonight”.\n"
                  "    Reads any waste calendar that exists in Home Assistant as a calendar\n"
                  "    (your city's ICS link via “Remote Calendar”, Waste Collection Schedule,\n"
                  "    your own calendar). Several bins on the same day go into one notification.\n\n\n"
                  "    Guide: https://github.com/johnkily/ha-blueprints/blob/main/docs/en/muell.md – " + STERN + "\n"),
            ("name: Abfallkalender", "name: Waste calendar"),
            ("name: Uhrzeit der Erinnerung", "name: Time of the reminder"),
            ("name: Handys\n", "name: Phones\n"),
            ("name: Nur Handys, die zu Hause sind", "name: Only phones that are at home"),
            ("description: Unterwegs kann niemand die Tonne rausstellen. Aus = alle Handys.",
             "description: Nobody can put the bin out while away. Off = all phones."),
            *TONNEN,
            ("    - name: Restmüll\n", "    - name: General waste\n"),
            ("    - name: Papier\n", "    - name: Paper\n"),
            ("    - name: Gelber Sack\n", "    - name: Recycling\n"),
            ("    - name: Bio\n", "    - name: Organic\n"),
            ("      # Jede Tonne nur einmal; unbekannte Einträge mit ihrem eigenen Titel",
             "      # Each bin only once; unknown events with their own title"),
            ('title: "Morgen ist Abholung"', 'title: "Waste collection tomorrow"'),
            ("– bitte heute Abend rausstellen.", "– please put out tonight."),
        ],
    },
})


def uebersetzen(quelle, regeln):
    text = open(os.path.join(ROOT, quelle), encoding="utf-8").read()
    fehlt = []
    for r in regeln["ersetzen"]:
        if r[0] == "BLOCK":
            _, start, ende, neu = r
            a = text.find(start)
            e = text.find(ende, a + 1) if a >= 0 else -1
            if a < 0 or e < 0:
                fehlt.append(start[:60])
                continue
            text = text[:a] + neu + text[e:]
        else:
            alt, neu = r
            if alt not in text:
                fehlt.append(alt[:60])
                continue
            text = text.replace(alt, neu)
    text = text.replace(RAW + quelle, RAW + regeln["ziel"])
    return text, fehlt


def main():
    nur_pruefen = "--check" in sys.argv
    ok = True
    for quelle, regeln in BLUEPRINTS.items():
        text, fehlt = uebersetzen(quelle, regeln)
        if fehlt:
            ok = False
            print("✗ %s – no match for:\n  %s" % (quelle, "\n  ".join(fehlt)))
            continue
        print("✓", regeln["ziel"])
        if not nur_pruefen:
            ziel = os.path.join(ROOT, regeln["ziel"])
            os.makedirs(os.path.dirname(ziel), exist_ok=True)
            open(ziel, "w", encoding="utf-8").write(text)
    sys.exit(0 if ok else 1)


if __name__ == "__main__":
    main()

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

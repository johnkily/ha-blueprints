#!/usr/bin/env python3
"""Prüft alle Blueprints und Links im Repo – läuft bei jedem Push als GitHub Action (Badge in der README).

* jede Datei unter blueprints/ ist gültiges YAML (mit !input) und hat name, domain, input, source_url,
* source_url zeigt auf genau diese Datei,
* jeder Import-Knopf in README und Anleitungen zeigt auf eine Datei, die es gibt,
* jede Eingabe, die im Blueprint per !input benutzt wird, ist auch deklariert.

    python3 tools/pruefen.py
"""
import glob
import os
import re
import sys
import urllib.parse

import yaml

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FEHLER = []


class Lader(yaml.SafeLoader):
    pass


Lader.add_constructor("!input", lambda l, n: ("!input", l.construct_scalar(n)))


def eingaben(inp, aus):
    for k, v in (inp or {}).items():
        if isinstance(v, dict) and "input" in v and "selector" not in v:   # Abschnitt
            eingaben(v["input"], aus)
        else:
            aus.add(k)
    return aus


def benutzt(x, aus):
    if isinstance(x, tuple) and x and x[0] == "!input":
        aus.add(x[1])
    elif isinstance(x, dict):
        for v in x.values():
            benutzt(v, aus)
    elif isinstance(x, list):
        for v in x:
            benutzt(v, aus)
    return aus


dateien = sorted(glob.glob(os.path.join(REPO, "blueprints", "**", "*.yaml"), recursive=True))
for d in dateien:
    rel = os.path.relpath(d, REPO)
    try:
        y = yaml.load(open(d, encoding="utf-8"), Loader=Lader)
    except yaml.YAMLError as e:
        FEHLER.append("%s: kein gültiges YAML (%s)" % (rel, str(e).splitlines()[0]))
        continue
    b = y.get("blueprint", {})
    for feld in ("name", "domain", "input", "source_url"):
        if feld not in b:
            FEHLER.append("%s: blueprint.%s fehlt" % (rel, feld))
    if b.get("source_url") and not b["source_url"].endswith("/blob/main/" + rel):
        FEHLER.append("%s: source_url zeigt nicht auf diese Datei" % rel)
    dekl = eingaben(b.get("input"), set())
    rest = {k: v for k, v in y.items() if k != "blueprint"}
    for fehlt in sorted(benutzt(rest, set()) - dekl):
        FEHLER.append("%s: !input %s ist nicht deklariert" % (rel, fehlt))

for md in [os.path.join(REPO, "README.md")] + glob.glob(os.path.join(REPO, "docs", "**", "*.md"), recursive=True):
    for u in re.findall(r"blueprint_url=([^)\s\"&]+)", open(md, encoding="utf-8").read()):
        ziel = urllib.parse.unquote(u).split("/blob/main/")[-1]
        if not os.path.exists(os.path.join(REPO, ziel)):
            FEHLER.append("%s: Import-Knopf zeigt auf %s – gibt es nicht" % (os.path.relpath(md, REPO), ziel))

for f in FEHLER:
    print("FEHLER", f)
print("%d Blueprints geprüft, %d Fehler" % (len(dateien), len(FEHLER)))
sys.exit(1 if FEHLER else 0)

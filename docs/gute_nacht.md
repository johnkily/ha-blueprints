# Gute Nacht per Sprachbefehl

*[English version](en/gute_nacht.md)*

„Hey Google, gute Nacht.“ Mehr sagen wir abends nicht. Google schaltet in Home Assistant einen Helfer ein, und den Rest macht Home Assistant: Lichter aus, Rollos zu, abschließen. Das Licht im Flur bleibt noch ein paar Minuten an, bis wir oben sind. Steht noch ein Fenster offen, sagt der Lautsprecher Bescheid.

Warum nicht alles in Google? Weil Home Assistant mehr weiß. Es sieht, ob die Haustür zu ist, bevor es abschließt, und kann Szenen, Rollos und Schlösser jeder Marke schalten. Google ist nur der Knopf.

## Was du brauchst

| | |
|---|---|
| **Einen Sprachassistenten** | Google Home (bei uns), Alexa oder Siri – oder einfach einen Taster bzw. Knopf im Dashboard |
| **Die Verbindung zu Home Assistant** | am einfachsten über Home Assistant Cloud (Nabu Casa), sonst die [manuelle Google-Assistant-Einrichtung](https://www.home-assistant.io/integrations/google_assistant/) |
| **Was abends passieren soll** | Lichter, Steckdosen, Rollos, Schlösser – alles optional |
| **Fenster- und Türkontakte** *(empfohlen)* | damit das Haus offene Fenster meldet und nicht gegen eine offene Tür abschließt |

## 1. Helfer anlegen

*Einstellungen → Geräte & Dienste → Helfer → Helfer erstellen → **Schalter*** → Name „Gute Nacht“. Das ergibt `input_boolean.gute_nacht`.

## 2. Blueprint importieren

[![Importieren](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fhaus%2Fgute_nacht.yaml)

## 3. Automation anlegen

*Einstellungen → Automationen & Szenen → Blueprints* → **Gute Nacht per Sprachbefehl**

| Feld | Was eintragen |
|---|---|
| Helfer „Gute Nacht“ | der Schalter aus Schritt 1 |
| Szenen einschalten | z. B. eine Szene „Nachtruhe“ – oder leer lassen |
| Lichter ausschalten | alle Lichter, die abends ausgehen sollen. Das Weglicht darf mit drinstehen, es geht später aus |
| Geräte ausschalten | Steckdosen, Fernseher, Lüfter |
| Rollos schließen | die Rollos für die Nacht |
| Licht, das noch an bleibt | z. B. Flur oder Treppe – geht nach **Geht aus nach** (Vorgabe 5 Minuten) aus |
| Frost, Hitze und Gäste | optional, siehe unten |
| Schlösser abschließen | werden nacheinander abgeschlossen, mit kurzer Pause dazwischen |
| Nur abschließen, wenn diese Türen zu sind | Türkontakte der Türen mit Schloss |
| Fenster und Türen, die zu sein sollten | werden in Ansage und Nachricht genannt, wenn sie offen sind |
| Ansage auf diesen Lautsprechern + Sprachausgabe (TTS) | z. B. der Google-Lautsprecher im Schlafzimmer und `tts.google_translate_de_de` |
| Handy-Nachricht, wenn etwas offen ist | kommt nur, wenn etwas offen oder nicht abgeschlossen ist – oder immer, mit **auch, wenn alles zu ist** |
| Eigenes Skript | für Telegram, Signal & Co., bekommt `titel` und `nachricht` |
| Helfer wieder ausschalten nach | Vorgabe 10 Sekunden, damit „gute Nacht“ morgen wieder auslöst |

## Frost, Hitze und Gäste (optional)

Bei uns fahren die Rollos nicht jede Nacht gleich. Dafür gibt es drei Modi. Jeder hängt an einem Schalter-Helfer oder Sensor, der „an“ ist, solange der Modus gilt. Wie der Helfer an- und ausgeht, entscheidest du: von Hand, per Wetter-Automation oder über einen Sensor.

| Modus | Was dann passiert |
|---|---|
| **Frostwarnung** | Die Rollos unter „Rollos, die bei Frost oben bleiben“ bleiben oben bzw. fahren hoch, damit sie nicht am Fenster festfrieren. Feld leer = alle Rollos |
| **Hitzemodus** | Die Rollos fahren nur auf **Position bei Hitze** (Vorgabe 10 %), damit nachts Luft reinkommt. Was unter „Rollos, die bei Hitze ganz oben bleiben“ steht, bleibt ganz offen, z. B. das Schlafzimmer |
| **Gästemodus** | Alles unter **Gästezimmer** (Rollos, Lichter, Geräte) bleibt unberührt, damit niemand im Dunkeln sitzt |

Lichter, Schlösser und die Ansage laufen in allen Modi ganz normal.

## 4. Google Home verbinden

1. **Helfer freigeben:** *Einstellungen → Sprachassistenten → Freigeben* → `Gute Nacht` hinzufügen (mit Home Assistant Cloud). In der Google-Home-App taucht er als Schalter „Gute Nacht“ auf.
2. **Routine anlegen:** Google-Home-App → *Automatisierungen* → **Gute Nacht** (gibt es schon als Vorlage) oder eine neue Routine mit dem Satz „Gute Nacht“ → *Aktion hinzufügen → Smart-Home-Geräte anpassen* → **Gute Nacht** einschalten.
3. Ausprobieren: „Hey Google, gute Nacht.“

**Alexa:** genauso – Helfer an Alexa freigeben, Routine „Alexa, gute Nacht“ → Gerät „Gute Nacht“ einschalten.
**Taster:** eine kleine Automation „Taster gedrückt → `input_boolean.turn_on` Gute Nacht“, oder den Helfer als Kachel ins Dashboard.

## Was passiert, wenn …

- **… ein Fenster offen ist?** Alles andere läuft trotzdem. Die Ansage sagt „Gute Nacht. Noch offen: Küchenfenster.“, aufs Handy kommt dieselbe Liste.
- **… die Haustür offen ist?** Dann schließt er nicht ab und sagt es dir. Viele Schlösser blockieren sonst halb ausgefahren.
- **… ein Schloss nicht reagiert?** Nach 20 Sekunden schaut er nach. Was dann nicht „abgeschlossen“ meldet, steht in der Nachricht.
- **… ich zweimal „gute Nacht“ sage?** Nichts. Solange ein Durchlauf läuft, wird der zweite ignoriert.

## So sieht die Nachricht aus

```
🌙 Gute Nacht
Noch offen: Küchenfenster
Nicht abgeschlossen: Haustür (Tür offen)
```

Ist alles zu, kommt keine Nachricht – außer du willst sie jeden Abend („Alles zu. Schlaf gut!“).

## Klappt nicht?

| Problem | Lösung |
|---|---|
| Google sagt „Gerät nicht gefunden“ | Helfer freigegeben (Schritt 4.1)? Danach „Hey Google, synchronisiere meine Geräte“. |
| Es passiert nur beim ersten Mal etwas | „Helfer wieder ausschalten nach“ steht auf 0 – dann bleibt der Helfer an. Auf 10 Sekunden stellen. |
| Keine Ansage | Ist eine Sprachausgabe (TTS) eingetragen? Ohne TTS-Entität gibt es nur die Nachricht. |
| Handy-Nachricht kommt nicht | Handy unter „Handy-Nachricht“ ausgewählt? Sie kommt nur, wenn etwas offen ist – oder mit „auch, wenn alles zu ist“. |

---

Gefällt er dir? Ein ⭐ auf [GitHub](https://github.com/johnkily/ha-blueprints) hilft anderen, ihn zu finden. Wie wir das im Alltag nutzen: [Kily's World](https://kilysworld.com).

**Hat's geklappt?** Dann freue ich mich über einen [Kaffee oder Tee auf Ko-fi 🍵](https://ko-fi.com/johnkily).

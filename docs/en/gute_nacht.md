# Good night by voice command

*[Deutsche Fassung](../gute_nacht.md)*

“Hey Google, good night.” That's all we say in the evening. Google switches on a helper in Home Assistant, and Home Assistant does the rest: lights off, blinds down, doors locked. The hallway light stays on for a few minutes until we're upstairs. If a window is still open, the speaker tells you.

Why not do it all in Google? Because Home Assistant knows more. It checks that the front door is closed before locking and can switch scenes, blinds and locks of any brand. Google is just the button.

> The blueprint has German field names – this guide translates them. Set “Sprache” (*language*) to **English** for English announcements and messages.

## What you need

| | |
|---|---|
| **A voice assistant** | Google Home (ours), Alexa or Siri – or just a button or a dashboard tile |
| **The link to Home Assistant** | easiest with Home Assistant Cloud (Nabu Casa), otherwise the [manual Google Assistant setup](https://www.home-assistant.io/integrations/google_assistant/) |
| **What should happen** | lights, plugs, blinds, locks – all optional |
| **Window and door sensors** *(recommended)* | so the house reports open windows and doesn't lock against an open door |

## 1. Create a helper

*Settings → Devices & services → Helpers → Create helper → **Toggle*** → name “Good night”. That gives you e.g. `input_boolean.good_night`.

## 2. Import the blueprint

[![Import](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fhaus%2Fgute_nacht.yaml)

## 3. Create the automation

*Settings → Automations & scenes → Blueprints* → **Gute Nacht per Sprachbefehl**

| Field | What to enter |
|---|---|
| Helfer „Gute Nacht“ (*helper*) | the toggle from step 1 |
| Szenen einschalten (*scenes*) | e.g. a “night” scene – or leave empty |
| Lichter ausschalten (*lights off*) | all lights that should go off. The path light may be in there too, it goes off later |
| Geräte ausschalten (*devices off*) | plugs, TV, fans |
| Rollos schließen (*close blinds*) | blinds for the night |
| Licht, das noch an bleibt (*path light*) | e.g. hallway or stairs – goes off after **Geht aus nach** (default 5 minutes) |
| Frost, Hitze und Gäste (*frost, heat, guests*) | optional, see below |
| Schlösser abschließen (*locks*) | locked one after another with a short pause |
| Nur abschließen, wenn diese Türen zu sind (*only lock if these doors are closed*) | door sensors of the doors with a lock |
| Fenster und Türen, die zu sein sollten (*windows and doors*) | named in the announcement and message if open |
| Ansage auf diesen Lautsprechern + Sprachausgabe (*speakers + TTS*) | e.g. the bedroom Google speaker and `tts.google_translate_en_com` |
| Handy-Nachricht, wenn etwas offen ist (*phone message*) | only if something is open or not locked – or always, with **auch, wenn alles zu ist** |
| Eigenes Skript (*own script*) | for Telegram, Signal etc., gets `titel` (*title*) and `nachricht` (*message*) |
| Sprache (*language*) | English or German announcements and messages |
| Helfer wieder ausschalten nach (*switch helper off after*) | default 10 seconds, so “good night” works again tomorrow |

## Frost, heat and guests (optional)

Our blinds don't do the same thing every night, so there are three modes. Each one is tied to a toggle helper or sensor that is “on” while the mode applies. How it gets switched is up to you: by hand, by a weather automation or by a sensor.

| Mode | What happens |
|---|---|
| **Frostwarnung** (*frost warning*) | Blinds under “Rollos, die bei Frost oben bleiben” stay up or go up, so they don't freeze to the window. Empty = all blinds |
| **Hitzemodus** (*heat mode*) | Blinds only go to **Position bei Hitze** (default 10 %) to let air in at night. Blinds under “Rollos, die bei Hitze ganz oben bleiben” stay fully open, e.g. the bedroom |
| **Gästemodus** (*guest mode*) | Everything under **Gästezimmer** (*guest room*: blinds, lights, devices) is left alone, so nobody sits in the dark |

Lights, locks and the announcement work as usual in all modes.

## 4. Connect Google Home

1. **Expose the helper:** *Settings → Voice assistants → Expose* → add `Good night` (with Home Assistant Cloud). It shows up as a switch in the Google Home app.
2. **Create a routine:** Google Home app → *Automations* → **Good night** (exists as a template) or a new routine with the phrase “good night” → *Add action → Adjust home devices* → turn **Good night** on.
3. Try it: “Hey Google, good night.”

**Alexa:** the same – expose the helper to Alexa, routine “Alexa, good night” → turn on device “Good night”.
**Button:** a small automation “button pressed → `input_boolean.turn_on` Good night”, or put the helper on the dashboard.

## What happens if …

- **… a window is open?** Everything else still runs. The speaker says “Good night. Still open: kitchen window.”, the phone gets the same list.
- **… the front door is open?** It doesn't lock and tells you. Many locks get stuck half-way otherwise.
- **… a lock doesn't respond?** After 20 seconds it checks. Anything not reporting “locked” is in the message.
- **… I say “good night” twice?** Nothing. While a run is active, a second one is ignored.

## Not working?

| Problem | Solution |
|---|---|
| Google says “device not found” | Helper exposed (step 4.1)? Then “Hey Google, sync my devices”. |
| It only works the first time | “Helfer wieder ausschalten nach” is 0 – the helper stays on. Set it to 10 seconds. |
| No announcement | Is a TTS entity selected? Without one there's only the message. |
| No phone message | Phone selected? It only comes if something is open – or with “auch, wenn alles zu ist”. |

---

Like it? A ⭐ on [GitHub](https://github.com/johnkily/ha-blueprints) helps others find it. How we use it every day: [Kily's World](https://kilysworld.com) (German).

**Did it work?** Then I'd be happy about a [coffee on Ko-fi ☕](https://ko-fi.com/johnkily).

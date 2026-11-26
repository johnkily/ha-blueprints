# Welcome light – a greeting in each person's colour

*[Deutsche Fassung](../willkommenslicht.md)*

*📰 From our house: [Kily's World in English](https://kilysworld.com/in-english/) – what our smart home looks like day to day*

When someone comes home, a light in the entrance glows in "their" colour. Ours are the colours of our cars: turquoise for me, pink for my wife. If both arrive shortly after each other, the colours alternate. 20 seconds after the front door is closed, the light is back to what it was before.

> The blueprint has German field names – this guide translates them.

## What you need

| | |
|---|---|
| **A colour light** | e.g. an LED strip with WLED – ours runs on this [WLED controller](https://www.amazon.de/dp/B0D8LKXTTK?tag=elcamdob-21)\* –, a colour bulb or a [Philips Hue Lightstrip](https://www.amazon.de/dp/B0GHS99N3N?tag=elcamdob-21)\* works just as well |
| **Phones** | the Home Assistant app, so Home Assistant knows who's coming home (persons under *Settings → People*) |
| **Door contact** *(recommended)* | on the front door for a clean end, e.g. from [SONOFF](https://www.amazon.de/dp/B0HB933HR1?tag=elcamdob-21)\* or [Aqara](https://www.amazon.de/dp/B09TP7VMKB?tag=elcamdob-21)\* |

## 1. Import the blueprint

[![Import](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Flicht%2Fwillkommenslicht.yaml)

## 2. Create the automation

*Settings → Automations & scenes → Blueprints* → **Willkommenslicht – Begrüßung in der Farbe der Person**

| Field | What to enter |
|---|---|
| Personen – *persons* | who gets greeted, up to three – the order decides the colour |
| Farbe 1 – *colour 1* | colour of the first person (default turquoise) |
| Farbe 2 – *colour 2* | colour of the second person (default pink) |
| Farbe 3 – *colour 3* | colour of the third person (default orange) |
| Licht im Eingang – *light in the entrance* | your colour light |
| Türkontakt der Haustür – *front door contact* | 20 seconds after it closes, the greeting ends |
| *Feinheiten – fine-tuning (expand)* | how long someone must have been away (default 15 min), maximum duration (5 min), another door (e.g. back door – if it opens, it ends right away), brightness by day and at night (0–6 am), an effect (e.g. “Breathe” on WLED for soft pulsing), lights that also switch on when it's dark (e.g. driveway and hallway), and for how long |

## How it works

- Only people who were away for at least 15 minutes get greeted – otherwise every trip to the letterbox would trigger it.
- The phone usually reports the arrival a minute or two before the door opens. If it only reports once you're already inside, the light just glows briefly.
- If the second person arrives while it's still glowing, the colours alternate every few seconds.
- Afterwards Home Assistant restores the previous state (on/off, colour, brightness).
- Extra lights only switch on when it's dark and they were off – and only those switch off again after the run-on time.

## Good to know

- **WLED:** If the strip was off before, Home Assistant switches it off again. The next time it's switched on, WLED still shows the welcome colour. If you don't want that, save your normal colour as a preset in WLED and load it on power-on.
- The colours only come when you arrive home. *Automation → ⋮ → Run* doesn't work for testing because the "was away" condition is missing – easiest is a short walk around the block 🙂

## Not working?

| Problem | Solution |
|---|---|
| Nothing happens | Does the person switch to “Home” on arrival? The phone has to be assigned to the person under *Settings → People*. Were they away long enough (fine-tuning)? |
| Light only turns white | Can the light do colours? Some only do when no effect is set – leave the effect field empty. |
| Doesn't end | Door contact entered? Without one it only ends after the maximum duration. |

---

*Links marked with \* are affiliate links. If you buy through them, I get a small commission; the price stays the same for you. As an Amazon Associate I earn from qualifying purchases.*

**Like it?** A ⭐ on [GitHub](https://github.com/johnkily/ha-blueprints) helps others find it – questions and wishes welcome as an [issue](https://github.com/johnkily/ha-blueprints/issues) or under [Ideas](https://github.com/johnkily/ha-blueprints/discussions/categories/ideas).

**Did it work?** Then I'd be happy about a [coffee on Ko-fi ☕](https://ko-fi.com/johnkily).

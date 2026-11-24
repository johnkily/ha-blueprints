# Light and radio alarm clock

*[Deutsche Fassung](../wecker.md)*

Wake up to a sunrise instead of a beep: before your alarm time a lamp slowly turns on, from deep red through orange to warm white. At alarm time the radio starts if you like. Both work on their own too.

> The blueprint has German field names – this guide translates them.

## What it does

- **Sunrise** over an adjustable time (default 20 minutes), either **before** the alarm time or **from** the alarm time; brightness rises slowly first, then faster, ending exactly in the chosen colour temperature; a white-only option for lamps without colour
- **Bedside button:** one press jumps straight to the full light
- **Radio** at alarm time, optionally with a fixed volume – directly or via Music Assistant
- **Only on chosen days**, optionally not on public holidays, and **paused** while a switch like “holiday” is on
- **Manual stop:** turning the light off ends the sunrise
- **Dimmed off:** after the alarm the light goes to dim warm before switching off, so it doesn't come up bright in the evening
- **Radio off** after a while – only if that station is still playing

## What you need

| | |
|---|---|
| **A colour lamp or LED strip** | ours is a [Philips Hue Lightstrip](https://www.amazon.de/dp/B0GHS99N3N?tag=elcamdob-21)\* by the bed – any dimmable lamp works |
| **A wireless button** *(optional)* | e.g. the [Hue dimmer switch](https://www.amazon.de/dp/B08PKMT2DV?tag=elcamdob-21)\* (via the Hue Bridge) or IKEA's [BILRESA](https://www.ikea.com/de/de/p/bilresa-fernbedienung-weiss-smart-dualschalter-10604165/) (Matter over Thread) – we still use the older IKEA Zigbee switch |
| **A speaker** *(optional)* | for the radio |

\* Affiliate links: if you buy through them, I get a small commission; the price stays the same for you.

## Setup

1. *Settings → Devices & services → Helpers → Create helper → **Date and/or time*** → “Alarm”, **time only**.
2. Import: [![Import](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Flicht%2Fwecker.yaml)
3. Create the automation:

| Field | What to enter |
|---|---|
| Weckzeit (*alarm time*) | the helper from step 1 |
| An diesen Tagen (*on these days*) | default Monday to Friday |
| Arbeitstag-Sensor (*workday sensor*) | optional – then no alarm on public holidays |
| Pausieren, wenn eingeschaltet (*pause while on*) | e.g. holiday mode |
| Licht / Dauer (*light / duration*) | bedside lamp, sunrise length (default 20 min) |
| Wann der Sonnenaufgang läuft (*when*) | before or from the alarm time |
| Lichtfarbe am Ende / Helligkeit am Ende (*final colour / brightness*) | warm white in kelvin (default 3500 K) and final brightness |
| Taster beendet den Sonnenaufgang (*button*) | optional event or action entity of a wireless button |
| Farbverlauf (*colour*) | “Sonnenaufgang” for colour lamps, “Warmweiß” for white-only lamps |
| Licht aus nach dem Sonnenaufgang (*light off after*) | default 60 min, 0 = stays on |
| Lautsprecher / Sender (*speaker / station*) | speaker and the stream URL (find it on radio-browser.info) |
| Über Music Assistant abspielen | on if you use Music Assistant |
| Lautstärke (*volume*) | 0 = leave as is |
| Radio aus nach (*radio off after*) | default 60 min, 0 = keeps playing |

---

Like it? A ⭐ on [GitHub](https://github.com/johnkily/ha-blueprints) helps others find it.

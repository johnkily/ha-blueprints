# Light and radio alarm clock

*[Deutsche Fassung](../wecker.md)*

Wake up to a sunrise instead of a beep: before your alarm time a lamp slowly turns on, from deep red through orange to warm white. At alarm time the radio starts if you like. Both work on their own too.

> The blueprint has German field names – this guide translates them.

## What it does

- **Sunrise** over an adjustable time (default 30 minutes); a warm-white-only option for lamps without colour
- **Radio** at alarm time, optionally with a fixed volume – directly or via Music Assistant
- **Only on chosen days**, optionally not on public holidays, and **paused** while a switch like “holiday” is on
- **Manual stop:** turning the light off ends the sunrise
- **Dimmed off:** after the alarm the light goes to dim warm before switching off, so it doesn't come up bright in the evening
- **Radio off** after a while – only if that station is still playing

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
| Licht / Dauer / Helligkeit (*light / duration / brightness*) | bedside lamp, sunrise length, final brightness |
| Farbverlauf (*colour*) | “Sonnenaufgang” for colour lamps, “Warmweiß” for white-only lamps |
| Licht aus nach der Weckzeit (*light off after*) | default 60 min, 0 = stays on |
| Lautsprecher / Sender (*speaker / station*) | speaker and the stream URL (find it on radio-browser.info) |
| Über Music Assistant abspielen | on if you use Music Assistant |
| Lautstärke (*volume*) | 0 = leave as is |
| Radio aus nach (*radio off after*) | default 60 min, 0 = keeps playing |

---

Like it? A ⭐ on [GitHub](https://github.com/johnkily/ha-blueprints) helps others find it.

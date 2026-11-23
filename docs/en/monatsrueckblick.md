# Monthly review – your home's “Wrapped”

*[Deutsche Fassung](../monatsrueckblick.md)*

Spotify shows you what you listened to at the end of the year. This blueprint does that every month for your home. On the 1st you get a message with last month's numbers, compared to the month before, plus a highlight:

```
📊 Your home in November
☀️ PV yield: 312 kWh (↓ 68 %)
⚡ Grid import: 140 kWh (↑ 35 %)
🌡️ Living room: Ø 21.3 °C, max 23.8 °C (+0.8 °C)
🚗 Enough for 1,733 km in an EV
🏆 Biggest change: PV yield ↓ 68 %
```

The numbers come from Home Assistant's **long-term statistics** – no helper counters, no scripts. Any sensor that shows months of history in the energy dashboard or a history graph works.

> The blueprint has German field names – this guide translates them. Set “Sprache der Nachricht” to **English** for English messages.

## What you need

| | |
|---|---|
| **Home Assistant 2026.10 or newer** | for the action `recorder.get_statistics` |
| **Sensors with statistics** | e.g. PV yield, grid import, export, heat pump, gas, water, temperatures |
| **Phone** *(optional)* | the Home Assistant app for the message |

## 1. Import the blueprint

[![Import](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fhaus%2Fmonatsrueckblick.yaml)

## 2. Create the automation

*Settings → Automations & scenes → Blueprints* → **Monatsrückblick – dein Haus-Wrapped**

| Field | What to enter |
|---|---|
| Sensoren für den Rückblick (*sensors*) | five to eight sensors, in the order of the message |
| Uhrzeit am 1. des Monats (*time on the 1st*) | default 10:00 |
| Vergleich zum Vormonat (*compare to last month*) | arrow with percent for meters, difference for measurements |
| Umrechnen in E-Auto-Kilometer (*convert to EV km*) | e.g. PV yield, plus your car's consumption (default 18 kWh/100 km) |
| Handys / Auch in Home Assistant / Eigenes Skript | where the message goes (phones, HA notification, own script) |
| Dashboard-Pfad (*dashboard path*) | tapping the message opens e.g. your energy dashboard |

**To try it** without waiting for the 1st: open the automation → ⋮ → **Run**. You get last month's review right away.

## How it calculates

- **Meters** (kWh, m³, €, anything that only grows) → monthly total, compared in percent.
- **Measurements** (°C, %, W) → average and maximum, compared as a difference.
- **Highlight** is the meter with the biggest change compared to the month before.
- Sensors without values last month (e.g. brand new) are simply left out.

## Not working?

| Problem | Solution |
|---|---|
| A sensor is missing | Does it have long-term statistics (`state_class` set)? Brand new sensors don't have a full month yet. |
| Values look too high | Meters that reset need `state_class: total_increasing`. |
| Import error | Home Assistant older than 2026.10 – `recorder.get_statistics` doesn't exist there yet. |

---

Like it? A ⭐ on [GitHub](https://github.com/johnkily/ha-blueprints) helps others find it.

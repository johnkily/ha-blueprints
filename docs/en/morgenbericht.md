# Morning report – step by step

*[Deutsche Fassung](../morgenbericht.md)*

*📰 From our house: [Kily's World in English](https://kilysworld.com/in-english/) – what our smart home looks like day to day*

What happened last night? At night the blueprint writes into a to-do list whatever stands out: a door that opens, a lock that gets unlocked, motion on the driveway, a device that becomes unavailable, or unusually high power use. In the morning the report is in the list. You can put the list on your dashboard as a card.

**You only get a notification when something actually happened.** A daily "all quiet" stops being read after a week. In that case the list simply says "✓ Nacht ruhig" (quiet night).

> **Note:** the input labels and the list entries are German. This guide gives the German label as it appears in Home Assistant, followed by its meaning.

## What you need

| | |
|---|---|
| **A Local To-do list** | *Settings → Devices & services → Add integration → Local To-do*, name e.g. "Night report". It belongs to the blueprint alone: it clears it every evening. |
| **Contacts, locks, motion sensors** | whatever you have – everything is optional |
| **Energy meter** *(optional)* | an energy sensor in kWh, e.g. grid import from the Energy dashboard. This check needs Home Assistant 2026.10 or newer. |

## 1. Import the blueprint

[![Import](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fhaus%2Fmorgenbericht.yaml)

## 2. Create the automation

*Settings → Automations & scenes → Blueprints* → **Morgenbericht – Was war nachts los?**

| Field | What to enter |
|---|---|
| To-do-Liste für den Bericht – *to-do list for the report* | the list from "What you need" |
| Nacht beginnt um / Nacht endet um – *night starts / ends at* | default 23:00 to 6:00. The list is cleared at the start; at the end it checks what's still open |
| Bericht um – *report at* | default 7:00 – the notification comes then, if anything happened |
| Türen und Fenster – *doors and windows* | contacts. If one opens at night, it's listed with the time. If it's still open in the morning, too |
| Schlösser – *locks* | unlocked at night or not locked in the morning |
| Bewegung draußen – *motion outside* | e.g. motion sensors or the camera's person detection |
| Geräte, die erreichbar sein sollen – *devices that should be available* | "unavailable" for more than 30 minutes → listed |
| Stromzähler / Melden ab – *energy meter / report above* | if the house uses more than this at night, it's listed (default 5 kWh) |
| Handys / Eigenes Skript – *phones / own script* | where the notification goes |
| Auch „Nacht ruhig“ als Nachricht schicken – *also send "quiet night"* | leave off if you only want to hear about unusual things |

**Save** – done. The first report arrives the next morning.

If the same thing happens several times, there's no second entry. The existing one is counted up, e.g. "🚪 Haustür geöffnet 3×, zuletzt 04:12" (front door opened 3×, last at 04:12).

## How high should the power limit be?

Check in the Energy dashboard what your house needs on a normal night and add a bit. Ours uses between 3 and 5 kWh per night. If you charge your car at night or fill a home battery from the grid, better use the meter of a single device or leave the field empty.

## Show it on the dashboard

Just add a **To-do list card** with the list. The checkboxes don't get in the way: checking means "seen", and the list is empty again in the evening anyway.

## Not working?

| Problem | Solution |
|---|---|
| The list stays empty, not even "Nacht ruhig" | Look at *Automation → Traces* around the report time. Is it the right list? |
| A door is missing | Only events between the start and end of the night count. And only when the contact goes from "closed" to "open" – the first report after a restart doesn't count. |
| No power entry | Does the meter have long-term statistics (does it show up in the Energy dashboard)? And are you on Home Assistant 2026.10 or newer? |
| Too many entries from the camera | Leave out motion sensors or use only person detection. |


**Like it?** A ⭐ on [GitHub](https://github.com/johnkily/ha-blueprints) helps others find it – questions and wishes are welcome as an [issue](https://github.com/johnkily/ha-blueprints/issues) or under [Ideas](https://github.com/johnkily/ha-blueprints/discussions/categories/ideas).

**Did it work?** Then I'd be happy about a [coffee or tea on Ko-fi 🍵](https://ko-fi.com/johnkily).

# Silent devices: find empty batteries before something goes wrong

*[Deutsche Fassung](../stumme_geraete.md)*

A window contact with an empty battery shows “closed” in Home Assistant for days – and 80 % battery on top. Home Assistant just keeps showing the last value, because a device with an empty battery doesn't say anything anymore. Our first run found five devices that were completely silent, the oldest since January.

Every hour the blueprint checks when each Zigbee device last reported. If that is longer ago than the limit (default 48 hours), your phone gets a notification. After the battery swap you get “Back again”. Optionally there is a weekly overview of all silent devices and nearly empty batteries.

## What you need

| | |
|---|---|
| **Zigbee2MQTT** | with the “Last seen” entity per device (step 1) |
| **Text helper** *(recommended)* | so the blueprint remembers what it has already reported (step 2) |
| **Phone** | for the notification: the Home Assistant app |

## 1. Turn on “Last seen”

1. In Zigbee2MQTT: *Settings → Advanced → Last seen* = **ISO_8601**, save.
2. In Home Assistant: *Settings → Devices & services → Entities*, search for **last seen**. The entities are disabled at first: select them all (selection mode, top left) → **Enable**. They appear after about 30 seconds.

## 2. Create a text helper *(recommended)*

*Settings → Devices & services → Helpers → Create helper → **Text***, name **Silent devices**, maximum length **255**.

Without a helper the blueprint still works, but it only reports what went silent within the last hour – no “Back again”, and if Zigbee2MQTT fails completely it stays quiet instead of telling you once.

## 3. Import the blueprint

[![Import](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fen%2Fzigbee%2Fsilent_devices.yaml)

*(English labels and notifications. The original German blueprint is in the [German guide](../stumme_geraete.md).)*

## 4. Create the automation

*Settings → Automations & scenes → Blueprints* → **Report silent devices (empty battery)**.

| Field | What to enter |
|---|---|
| Notify | whose phone gets the notification |
| Silent after | default 48 hours. Window contacts and buttons often only report every few hours – shorter gives false alarms. |
| Only devices with a battery | default on. Off = also check plugs and lights. |
| Text helper “Silent devices” | the helper from step 2 |
| Weekly overview on / at *(expand)* | default Saturday, 10:00; “No weekly overview” turns it off |
| Battery nearly empty below | for the weekly overview, default 15 %; 0 = don't check |
| Don't check | “Last seen” of devices that are allowed to stay quiet for long |

## What you get on your phone

| Case | Notification |
|---|---|
| Device went silent | 🔋 **Device stopped reporting** – Window contact bathroom – probably the battery is empty. |
| Battery replaced | ✅ **Back again** – Window contact bathroom reports again. Thanks for changing the battery! |
| Weekly overview | 📋 **Weekly battery overview** – Silent: … Battery nearly empty: Dimmer hallway (8 %). |
| Zigbee2MQTT down | ⚠️ **Many Zigbee devices silent** – 12 of 14 devices are not reporting. Is Zigbee2MQTT running? Later once ✅ **Zigbee back to normal**. |

Each notification comes once, not every hour. If more than half of the devices go silent at the same time, it's Zigbee2MQTT or the coordinator, not batteries – then you only get the one outage notification. If your coordinator gets stuck now and then, have a look at the [Zigbee watchdog](zigbee_waechter.md).

## Good to know

- **New devices are included automatically** – the blueprint uses every “Last seen” entity there is.
- **Zigbee2MQTT availability:** if it's on, silent battery devices become “unavailable” after 25 hours. The blueprint counts that as silent too.
- **After a restart** all devices are briefly unavailable – the blueprint ignores that for the first 15 minutes.
- The helper remembers up to about 15 silent devices at the same time.

## Not working?

| Problem | Solution |
|---|---|
| No notification although a device is silent | Does the device have a “Last seen” entity, and is it enabled? Is “Last seen” set to ISO_8601 in Zigbee2MQTT? |
| Mains-powered device is not checked | Turn off “Only devices with a battery” |
| A device keeps showing up as silent | It reports less often than the limit – add it under “Don't check” or raise the limit |

**Like it?** A ⭐ on [GitHub](https://github.com/johnkily/ha-blueprints) helps others find it – questions and wishes are welcome as an [issue](https://github.com/johnkily/ha-blueprints/issues) or under [Ideas](https://github.com/johnkily/ha-blueprints/discussions/categories/ideas).

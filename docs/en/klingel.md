# Doorbell blueprint – step by step

*[Deutsche Fassung](../klingel.md)*

When someone rings, your phone gets a notification right away – with a picture of the door if you have a camera. You don't need a new video doorbell for this: a vibration sensor on your old chime is enough.

> **Note:** the input labels inside the blueprint are German. This guide gives the German label as it appears in Home Assistant, followed by its meaning.

## What you need

| | |
|---|---|
| **Sensor** | Anything that reports “on” when the bell rings. The easiest option: a **Zigbee vibration sensor**, e.g. a [Tuya vibration sensor TS0210](https://www.amazon.de/dp/B0G4R5VWXW?tag=elcamdob-21)\* like ours, stuck to the inside of the chime with double-sided tape. A smart doorbell button or a contact on the bell transformer works just as well. |
| **Phone** | The **Home Assistant app** on every phone that should be notified, logged in to your Home Assistant. |
| **Camera** *(optional)* | Any camera that is set up in Home Assistant. The blueprint can turn pan/tilt cameras towards the door first – we have a [Reolink TrackMix WiFi](https://www.amazon.de/dp/B0B4KB6CTB?tag=elcamdob-21)\* above the entrance. |

## 1. Set up the sensor

1. Add the sensor to Home Assistant (Zigbee2MQTT or ZHA → *Add device*).
2. Stick it on the chime – where it vibrates most when the bell rings, usually on the housing next to the bell.
3. Set the **sensitivity** to *high* in the device settings, if available.
4. Ring once and check under *Settings → Devices*: the sensor must briefly switch to **“Detected”**.

## 2. Import the blueprint

[![Import](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fklingel%2Fklingel_handy.yaml)

Tap the button → **“Import blueprint”**.

## 3. Create the automation

*Settings → Automations & scenes → Blueprints* → **Klingel – Nachricht mit Kamerabild aufs Handy**.

| Field (German label) | What to enter |
|---|---|
| Klingel-Sensor – *doorbell sensor* | your vibration sensor (the entity that reports “Detected”). It has to be a binary sensor – for doorbells that only provide an *event* entity (e.g. Google Nest), create a template binary sensor first. |
| Handys – *phones* | one or more phones with the Home Assistant app |
| Kamera (optional) – *camera* | the camera above the door – or leave empty |
| Titel / Text – *title / text* | what the notification should say (defaults are German, just overwrite them) |
| Beim Antippen öffnen (optional) – *open on tap* | e.g. `/lovelace/camera` if you have a dashboard with the live view. Always include the view, not just the dashboard. Works on iPhone and Android. |
| Kamera schwenken – *pan camera* | only for pan/tilt cameras: the entity with the saved positions (for Reolink “PTZ preset”) and the name of the position, e.g. `Front door` |
| Wartezeit vor der Nachricht – *wait before the notification* | seconds until the camera is in position (default 2) |
| Sperrzeit – *cool-down* | no new notification for this long after a ring (default 30 s) – vibration sensors often report one ring several times |
| Zusätzliche Aktionen (optional) – *additional actions* | anything else that should happen (see below) |

**Save** – done. Ring once to test.

The app fetches the picture directly from Home Assistant at the moment the notification arrives. Nothing is saved to disk and nothing ends up in the `www` folder (which can be opened without logging in).

## Additional actions – ideas

In the *Zusätzliche Aktionen* field, tap **“Add action”**:

- **Wake up a tablet:** *Switch: Turn on* → the screen switch of your tablet (e.g. from the Fully Kiosk integration). We have a [Lenovo Tab M11](https://www.amazon.de/dp/B0CQT8CKNZ?tag=elcamdob-21)\* on the wall.
- **Live view as a pop-up on the tablet:** *Browser Mod: Popup* (the [Browser Mod](https://github.com/thomasloven/hass-browser_mod) integration from HACS) with a picture entity card of your camera.
- **Announcement:** *Text-to-speech* on a speaker: “Someone is at the door.”
- **Hallway light on** when it's dark.

## Not working?

| Problem | Solution |
|---|---|
| No notification | *Automation → Traces* (top right) shows whether it started at all. If it doesn't start: does the sensor really switch to “on” when the bell rings? |
| Starts, but no notification | Search for `notify.mobile_app_` under *Developer tools → Actions*. If your phone has a different name there than in the device list (because it was renamed in the app), log out of the app and back in once. |
| Notification without picture | Can you see the camera in Home Assistant? On iPhones, long-press the notification to see the picture large. |
| Reports one ring several times | Increase *Sperrzeit*. |
| Reports without ringing (doors slamming, trucks) | Lower the sensor's sensitivity or find another spot on the chime. |

---

*Links marked with \* are affiliate links. If you buy through them, I get a small commission; the price stays the same for you. As an Amazon Associate I earn from qualifying purchases.*

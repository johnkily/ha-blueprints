# Doorbell on the TV – step by step

*[Deutsche Fassung](../klingel_tv.md)*

*📰 From our house: [Kily's World in English](https://kilysworld.com/in-english/) – what our smart home looks like day to day*

When someone rings while the TV is on, playback pauses. The door camera appears as picture-in-picture in the top right corner, and a notification in the top left offers two buttons: **Weiterschauen** (continue watching) and **Bild schließen** (close picture). Playback only resumes when you press "continue". Whoever goes to the door doesn't miss anything.

It works through the **QuickBars for Home Assistant** app on the TV. No extra integration is needed in Home Assistant: the app listens to Home Assistant itself, and the blueprint just tells it what to show.

> **Note:** the input labels inside the blueprint are German. This guide gives the German label as it appears in Home Assistant, followed by its meaning. The button labels and texts on the TV can be changed to English in the blueprint.

## What you need

| | |
|---|---|
| **TV box or TV with Android TV / Google TV** | e.g. Nvidia Shield (ours), Chromecast with Google TV or a TV with Google TV, with the free [QuickBars for Home Assistant](https://play.google.com/store/apps/details?id=dev.trooped.tvquickbars) app from the Play Store. |
| **Doorbell sensor** | Anything that turns "on" when someone rings – e.g. a vibration sensor on your old chime, see the [doorbell guide](klingel.md#what-you-need). |
| **Camera** | Any camera in Home Assistant. Ours is a [Reolink TrackMix WiFi](https://www.amazon.de/dp/B0B4KB6CTB?tag=elcamdob-21)\* above the entrance. |
| **TV in Home Assistant** | Ideally through the **Android TV Remote** integration (built into Home Assistant). It pauses playback in any app, including Netflix and YouTube. |

## 1. Set up QuickBars

1. Install QuickBars on the TV and open it.
2. Connect it to Home Assistant: enter the address and a **long-lived access token** (in Home Assistant under *Profile → Security*, at the bottom).
3. Turn on **"Background Connection"** in the app settings.

> **Important:** without "Background Connection" nothing arrives. Home Assistant doesn't notice, there is no error message. That's exactly why our first test stayed blank.

## 2. Import the blueprint

[![Import](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fklingel%2Fklingel_tv.yaml)

Tap the button → **"Import blueprint"**.

## 3. Create the automation

*Settings → Automations & scenes → Blueprints* → **Klingel aufs TV – Kamerabild als Bild-im-Bild (QuickBars)**.

| Field | What to enter |
|---|---|
| Klingel-Sensor – *doorbell sensor* | your sensor that turns "on" when someone rings |
| Kamera – *camera* | the camera at the door |
| Fernseher – *TV* | the media player of your TV box, ideally the one from **Android TV Remote**. If it is "off", nothing happens. |
| Wiedergabe erkennen über – *detect playback via* | *optional.* Android TV Remote only shows "on" or "off", not whether something is playing. If your box has a second entry that reports "playing" (on the Shield it's the Chromecast entry), pick it here. Empty = the TV above. |
| Film pausieren – *pause playback* | on = if something is playing, it pauses and only resumes with "continue" |
| Bild und Meldung – *picture and notification* | corner and size of the camera picture, how long the picture (default 90 s) and the notification (30 s) stay, texts and button labels |
| Nur wenn – *only if* | *advanced:* an extra condition, e.g. a specific Harmony activity |
| Sperrzeit – *lockout time* | no new alert for this long after a ring (default 60 s) |
| Kennung der Knöpfe – *button ID* | only change it if you use the blueprint for several TVs – then one per TV |

**Save** – done.

## How it behaves

- **Continue:** the camera picture closes and playback resumes – but only if the blueprint paused it.
- **Close picture:** only the camera picture closes. If nothing was playing, this is the only button you need.
- **No button pressed:** the picture closes by itself after the set time, playback **stays paused**. On purpose: whoever is at the door shouldn't miss anything.
- **TV off:** nothing happens. For a notification on your phone there is the [doorbell blueprint](klingel.md) – both run fine side by side.

## Test without ringing

*Developer tools → Events* → event type `quickbars.open`, data:

```yaml
camera_entity: camera.your_camera
position: top_right
size: large
auto_hide: 20
```

**Fire event** – the camera picture should now show on the TV for 20 seconds. If nothing appears, it's the app (see below), not the blueprint.

## Not working?

| Problem | Solution |
|---|---|
| Nothing shows on the TV | Turn on **"Background Connection"** in QuickBars, then check with the test above. |
| The automation doesn't start at all | *Automation → Traces* shows why. Usually the TV is "off" or "standby" – which is intended. |
| Playback doesn't pause | Pick the **Android TV Remote** entry as *Fernseher*. Cast entries only pause apps that cast themselves. |
| "Film ist pausiert" is missing although something was playing | The selected TV doesn't report "playing". Pick an entry that does under *Wiedergabe erkennen über*. |
| Picture stays black | Is the camera working in Home Assistant? Some cameras need a moment until the picture is there. |
| One ring is reported several times | Increase the lockout time. |

QuickBars is a project by [Trooped](https://github.com/Trooped/QuickBars) and has nothing to do with this blueprint – questions about the app are best asked there.


**Like it?** A ⭐ on [GitHub](https://github.com/johnkily/ha-blueprints) helps others find it – questions and wishes are welcome as an [issue](https://github.com/johnkily/ha-blueprints/issues) or under [Ideas](https://github.com/johnkily/ha-blueprints/discussions/categories/ideas).

---

*Links marked with \* are affiliate links. If you buy through them, I get a small commission; the price stays the same for you. As an Amazon Associate I earn from qualifying purchases.*

**Did it work?** Then I'd be happy about a [coffee or tea on Ko-fi 🍵](https://ko-fi.com/johnkily).

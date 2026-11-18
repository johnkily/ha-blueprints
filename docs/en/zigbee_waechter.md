# Zigbee watchdog: coordinator stuck → restart automatically

*[Deutsche Fassung](../zigbee_waechter.md)*

Sometimes the Zigbee chip in the coordinator gets stuck: Zigbee2MQTT is running, Home Assistant is running, but no device reports anymore and every command fails (in the Zigbee2MQTT log e.g. `SRSP - AF - dataRequest after 6000ms`). Lights, switches and automations using Zigbee stop working – and at night or on holiday nobody notices.

The watchdog asks a Zigbee device for its state every 5 minutes and waits for the answer. If none of the selected devices answers, it restarts the Zigbee chip and Zigbee2MQTT, checks whether Zigbee answers again and notifies you.

**Why it asks actively instead of waiting for silence:** Home Assistant discards messages whose value hasn't changed. Zigbee then often looks silent for minutes although everything is working – at our place up to 17 minutes at night. A watchdog that waits for silence either raises false alarms all the time or reacts far too late.

> **Note:** the input labels inside the blueprint are German. This guide gives the German label as it appears in Home Assistant, followed by its meaning.

## What you need

| | |
|---|---|
| **Zigbee2MQTT** | as an app in Home Assistant (for the restart) and the MQTT integration |
| **Devices to ask** | two or three **mains-powered** Zigbee devices, ideally smart plugs – they answer even when switched off. Battery devices sleep and don't work for this. |
| **Coordinator with a restart button** *(recommended)* | For SMLIGHT coordinators like the [SLZB-06](https://www.amazon.de/dp/B0BL6DQSB3?tag=elcamdob-21)\* Home Assistant discovers the SMLIGHT integration by itself; it provides a “Zigbee restart” button. Restarting Zigbee2MQTT alone doesn't reliably reach a stuck chip. Without the button the watchdog only restarts Zigbee2MQTT. |
| **Phone** | for the notification: the Home Assistant app |

## 1. Import the blueprint

[![Import](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fzigbee%2Fzigbee_waechter.yaml)

## 2. Create the automation

*Settings → Automations & scenes → Blueprints* → **Zigbee-Wächter – Koordinator hängt, automatisch neu starten**.

| Field (German label) | What to enter |
|---|---|
| Zigbee-Geräte zum Nachfragen – *Zigbee devices to ask* | the device names **as in Zigbee2MQTT** (friendly name), separated by commas, e.g. `Plug washing machine, Plug hallway` |
| Nachricht an – *notify* | whose phone gets notified; empty = no notification |
| Weitere Benachrichtigungen – *further notifications* (optional, expand) | in addition to the phones: **notify entities** (e.g. Telegram, Pushover, a notify group) and/or **a script** for everything else – Signal, e-mail (SMTP), Threema; template below |
| Neustart-Knopf des Zigbee-Chips – *restart button of the Zigbee chip* (expand) | for SMLIGHT the “Zigbee restart” button of your coordinator; leave empty if there is none |
| Steckdose des Koordinators – *coordinator's power plug* (optional) | if the restart doesn't help, the watchdog switches this plug off for 10 seconds and on again, then checks once more – **only a Wi-Fi or other non-Zigbee plug**, a Zigbee plug can't be reached while the coordinator is stuck; for PoE coordinators only with a switchable PoE port |
| Zigbee2MQTT-App (Slug) – *Zigbee2MQTT app slug* | the default `45df7312_zigbee2mqtt` fits the official Zigbee2MQTT app; otherwise it's in the address bar under *Settings → Apps → Zigbee2MQTT* |
| Verbindungsstatus von Zigbee2MQTT – *Zigbee2MQTT connection state* | the binary sensor “Connection state” of the “Zigbee2MQTT Bridge” device – then the watchdog only checks once Zigbee2MQTT has been connected for 5 minutes |
| Höchstens ein Neustart pro – *at most one restart per* | default 30 minutes |
| Auf Antwort warten, Basis-Topic von Zigbee2MQTT, Meldung auch in Home Assistant anzeigen – *wait for answer, base topic, also show in Home Assistant* (expand) | the defaults usually fit: 15 seconds, `zigbee2mqtt`, off |

**Try it:** rename one device from the list in Zigbee2MQTT – on the next run the watchdog asks the next device. Only when **none** answers does it restart.

## What you get on your phone

| Case | Notification |
|---|---|
| No device answers | ⚠️ **Zigbee hängt – Neustart** (Zigbee stuck – restarting) |
| Back after the restart | ✅ **Zigbee läuft wieder** (Zigbee running again) |
| Back only after the power cycle *(with plug)* | ✅ **Zigbee läuft wieder** – after power-cycling the coordinator |
| Restart didn't help | ❌ **Zigbee antwortet weiter nicht** (Zigbee still not answering) – unplug the coordinator briefly. (With plug: restart and power cycle both didn't help.) |

As long as everything works, it stays quiet.

## Notifications via Signal, e-mail or Threema

These services often have no notify entity in Home Assistant but a classic service such as `notify.signal` or `notify.email`. Create a small script (*Settings → Automations & scenes → Scripts → Create script → ⋮ → Edit in YAML*) and select it in the blueprint under „Zusätzlich ein Skript ausführen“ (*also run a script*):

```yaml
alias: Forward Zigbee message
mode: queued
sequence:
  - action: notify.signal        # ← your service, e.g. notify.email
    data:
      title: "{{ titel }}"
      message: "{{ nachricht }}"
```

The blueprint passes `titel` (title) and `nachricht` (message) to the script. Why a script instead of a text field: a mistyped service name would abort the whole watchdog run – a missing script does not.

## Good to know

- **One restart per lock time:** after a restart the watchdog waits for the lock time before checking again. Nothing escalates if Zigbee is really broken.
- **During updates:** with the connection state set, the watchdog doesn't check while Zigbee2MQTT is starting or updating.
- **Asking is harmless:** it only reads the state (`/get`), nothing is switched.

## Not working?

| Problem | Solution |
|---|---|
| Restarts all the time | Are the names exactly as in Zigbee2MQTT (case, spaces)? *Automation → Traces* shows which topic was asked. Battery devices or plain repeaters/range extenders? They don't answer – they have no on/off state that can be queried. Use plugs, lights or mains-powered switches. |
| Restart happens, but Zigbee2MQTT doesn't restart | Check the slug (*Settings → Apps → Zigbee2MQTT*, address bar). If Zigbee2MQTT doesn't run as an app, leave the field empty. |
| Different base topic | It's in Zigbee2MQTT under *Settings → MQTT* – enter it under the expandable fine-tuning section |

---

*Links marked with \* are affiliate links. If you buy through them, I get a small commission; the price stays the same for you. As an Amazon Associate I earn from qualifying purchases.*

**Like it?** A ⭐ on [GitHub](https://github.com/johnkily/ha-blueprints) helps others find it – questions and wishes are welcome as an [issue](https://github.com/johnkily/ha-blueprints/issues) or under [Ideas](https://github.com/johnkily/ha-blueprints/discussions/categories/ideas).

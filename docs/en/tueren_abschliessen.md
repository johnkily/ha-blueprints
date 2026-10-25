# Lock the doors when nobody is home

*[Deutsche Fassung](../tueren_abschliessen.md)*

Once everybody has left, Home Assistant waits a while and then locks the smart locks that are still unlocked. If a door is actually standing open, it is **not** locked – the bolt would shoot into thin air and the door couldn't be pushed shut any more – instead your phone gets a warning. There is only a notification when something happened; if the doors were already locked, it stays quiet.

> **Note:** the input labels inside the blueprint are German. This guide gives the German label as it appears in Home Assistant, followed by its meaning. The notifications are German for now (see below).

## What you need

| | |
|---|---|
| **Smart lock** | Any lock that shows up in Home Assistant as a lock (`lock.…`) – Nuki, Bosch, Yale, Danalock, a Zigbee or Z-Wave lock. We have two older Nuki locks on the front and back door; Nuki currently offers the [Smart Lock Pro (5th generation)](https://www.amazon.de/dp/B0DX2FPQFQ?tag=elcamdob-21)\* and the more compact [Smart Lock Ultra](https://www.amazon.de/dp/B0DN1SZCTL?tag=elcamdob-21)\* – both with Wi-Fi and Matter. |
| **Presence** | A phone with the Home Assistant app (location access on) per person – or another tracker. Under *Settings → People*, each person must have their device assigned. |
| **Door contact** *(recommended)* | A window/door contact on the door leaf, e.g. the [Aqara MCCGQ11LM (Zigbee)](https://www.amazon.de/dp/B07D37VDM3?tag=elcamdob-21)\* – that's the one on our back door. Many locks also have a built-in door sensor (Nuki “Door Sensor”), which works just as well. |
| **Phone** | For the notification: the Home Assistant app |

## 1. Import the blueprint

[![Import](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fsicherheit%2Ftueren_abschliessen.yaml)

## 2. Create an exception switch *(recommended)*

If guests, the pet sitter or the grandparents are in the house but have no phone in Home Assistant, it looks to Home Assistant as if nobody is there. So that they don't get locked in or out:

*Settings → Devices & services → Helpers → Create helper → Toggle*, name e.g. **Guests in the house**. Put the toggle on your dashboard and switch it on while someone is there.

## 3. Create the automation

*Settings → Automations & scenes → Blueprints* → **Türen abschließen, wenn niemand zu Hause ist**.

| Field (German label) | What to enter |
|---|---|
| Wer muss weg sein – *who has to be away* | everyone who has a key |
| Türschlösser – *door locks* | the locks that should be locked |
| Abschließen nach – *lock after* | default 30 minutes – catches the “I forgot something” |
| Nachricht an – *notify* | whose phone gets the notification; empty = no notification |
| Türkontakte – *door contacts* (expand) | **in the same order as the locks** – the first contact belongs to the first lock |
| Nicht abschließen, solange eingeschaltet – *don't lock while switched on* | the toggle from step 2 |

## What you get on your phone

| Case | Notification (German) | Meaning |
|---|---|---|
| All good | 🔒 **Türen abgeschlossen** – Niemand zu Hause. Abgeschlossen: Haustür, Hintertür. | Doors locked – nobody home. Locked: front door, back door. |
| Door is open | ⚠️ **Tür nicht abgeschlossen** – … Steht offen, nicht verriegelt: Hintertür. | Door not locked – it's open, not bolted. |
| Lock doesn't respond | ⚠️ **Tür nicht abgeschlossen** – … Schloss hat nicht reagiert: Hintertür. | Lock didn't respond (after waiting 60 seconds, e.g. battery empty or bolt jammed). |

The door names come from your locks.

## Good to know

- **It locks once.** If somebody unlocks a door via the app afterwards (e.g. for the delivery driver), it stays unlocked until someone comes home and everybody leaves again.
- **Home Assistant restart:** if an update happens while everybody is away, the waiting time starts again after the restart – and the doors are still locked afterwards.
- **The door is only ever locked, never opened.** The blueprint only sends the “lock” command.

## Not working?

| Problem | Solution |
|---|---|
| Never locks | *Settings → People*: does everybody show “Away” or another place? Without location access in the app, a person stays “Home” forever. |
| Locks although someone is home | That person is missing under *Wer muss weg sein* – or doesn't have their phone with them. That's what the exception switch is for. |
| Warns “open” although the door is closed | Contacts and locks are in a different order. Check the order: first contact = first lock. |
| No notification | Phone selected under *Nachricht an*? If in doubt, check under *Automation → Traces* whether it ran. |

---

*Links marked with \* are affiliate links. If you buy through them, I get a small commission; the price stays the same for you. As an Amazon Associate I earn from qualifying purchases.*

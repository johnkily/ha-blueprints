# Washing machine, dryer & co. – done notification

*[Deutsche Fassung](../geraet_fertig.md)*

A plug with power metering detects when the appliance is running and when it's done. Then your phone gets a notification – with the run time and, if you like, the energy used. Works with any washing machine, dryer or dishwasher, however old.

> **Note:** the input labels inside the blueprint are German. This guide gives the German label as it appears in Home Assistant, followed by its meaning. The notification is German for now: *“✅ Waschmaschine ist fertig – Nach 1:12 h, 0,85 kWh.”* – the appliance name in it is whatever you enter (e.g. “Washing machine”).

## What you need

| | |
|---|---|
| **Plug with power metering** | e.g. the [NOUS A1Z (Zigbee, 16 A)](https://www.amazon.de/dp/B0CCQH61RD?tag=elcamdob-21)\* – that's the one behind our washing machine. Important: **16 A**, washing machines and dryers draw more than 2 kW while heating. Any other plug that provides a power sensor in watts in Home Assistant works just as well (Shelly Plug, Tasmota …). |
| **Phone** | The Home Assistant app, logged in to your Home Assistant |

## 1. Add the plug

Put it between the wall socket and the appliance and add it to Home Assistant (Zigbee: *Add device*). You then get a **power** sensor (in W) and usually an **energy** counter (in kWh).

## 2. Import the blueprint

[![Import](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fgeraete%2Fgeraet_fertig.yaml)

## 3. Create the automation

*Settings → Automations & scenes → Blueprints* → **Waschmaschine, Trockner & Co. – fertig melden**. One automation per appliance.

| Field (German label) | What to enter |
|---|---|
| Leistung der Steckdose – *power of the plug* | the power sensor in W |
| Name des Geräts – *name of the appliance* | appears in the notification: “✅ Dryer ist fertig” |
| Handys – *phones* | who should be notified |
| Nur Handys, die zu Hause sind – *only phones at home* | default on – the notification is no use when you're out |
| Erkennung – *detection* (expand) | see the table below |
| Extras (optional) (expand) | *Energiezähler der Steckdose* (energy counter → kWh in the notification), *Erinnerung nach* (reminder), *Ausgeschaltet/Tür offen unter* (switched off/door open below), *Zusätzliche Aktionen* (additional actions) |

## Recommended values per appliance

Fields under **Erkennung**: *Läuft ab* (running from) · *… für mindestens* (for at least) · *Fertig unter* (done below) · *… für mindestens* · *Längste Laufzeit* (longest run time).

| Appliance | Läuft ab | … for | Fertig unter | … for | Reminder (*Erinnerung nach*) |
|---|---|---|---|---|---|
| **Washing machine** | 20 W | 2 min | 5 W | 5 min | 30 min (if it isn't switched off afterwards) |
| **Dryer (heat pump)** | 200 W | 2 min | 20 W | 3 min | 30 min, *Ausgeschaltet/Tür offen unter* 1 W |
| **Dishwasher** | 20 W | 2 min | 5 W | 15 min | – |

**Why so different?**

- **Heat pump dryers** keep running for about 20 minutes at around 100 W after drying to cool down – that's still part of the programme. Then the anti-crease phase starts: every few minutes the drum turns briefly, in between the appliance draws a few watts. That's exactly how the **reminder** knows the door is still closed. If the door is opened or the appliance switched off, the power drops to 0 W – then no reminder comes.
- **Dishwashers** take long breaks (soaking, drying without heating). That's why it waits 15 minutes before reporting “done”.

**Finding your own values:** wait for one run, then open the power sensor and look at the history. *Läuft ab* is clearly above standby, *Fertig unter* just above it; the longest break in the programme determines the second duration.

## Not working?

| Problem | Solution |
|---|---|
| Reports “done” in the middle of the programme | Increase *Fertig unter … für mindestens* – the programme has a longer break. |
| Never reports | *Automation → Traces*: does it start? If not, *Läuft ab* is too high. If it starts but never finishes: *Fertig unter* is below the appliance's standby. |
| No notification although at home | The Home Assistant app needs location access, otherwise Home Assistant doesn't know who is at home – or switch off *Nur Handys, die zu Hause sind*. |
| No notification after a Home Assistant restart | If the appliance is running during the restart, the automation loses that run. Next time it works again. |

---

*Links marked with \* are affiliate links. If you buy through them, I get a small commission; the price stays the same for you. As an Amazon Associate I earn from qualifying purchases.*

# Sun protection per façade – step by step

*[Deutsche Fassung](../sonnenschutz.md)*

The blinds on one side of the house go down when the sun really shines on that façade and it's warm enough – and only go back up once the sun has gone. A passing cloud doesn't send them up and down in between.

**One automation per side of the house** – south, west and east have different angles.

> **Note:** the input labels inside the blueprint are German. This guide gives the German label as it appears in Home Assistant, followed by its meaning.

## What you need

| | |
|---|---|
| **Blinds** | Roller shutters, blinds or venetian blinds that can move to a **position in percent** in Home Assistant (e.g. via Shelly, Homematic, Zigbee actuators) – we use [Shelly Plus 2PM](https://www.amazon.de/dp/B0B33R523C?tag=elcamdob-21)\* |
| **Sun position** | built into Home Assistant (`sun.sun`) once your location is set |
| *optional* **room temperature** | a temperature sensor in the room, e.g. an [Aqara temperature sensor](https://www.amazon.de/dp/B07D37FKGY?tag=elcamdob-21)\* like ours |
| *optional* **outdoor temperature and cloud cover** | a weather integration (e.g. the built-in *Met.no*) |

## 1. Find the angles for your façade

Search for your address on [sunearthtools.com](https://www.sunearthtools.com/dp/tools/pos_sun.php) or [suncalc.org](https://www.suncalc.org) and place the pin in front of the window. The lines show the direction of the sun.

- **Sun arrives from:** the angle (azimuth) at which the sun starts hitting the façade.
- **Sun gone from:** the angle at which it leaves the façade.

| Façade | arrives from | gone from |
|---|---|---|
| East | 60° | 160° |
| South | 130° | 250° |
| West | 200° | 300° |

These values are rough guides – trees, roof overhangs and neighbouring houses shift them. Better watch for a few days and adjust.

## 2. Create a flag (recommended)

*Settings → Devices & services → Helpers → Create helper → **Toggle***, name e.g. “Sun protection south today”.

With it, the automation shades **once a day**: if you open a blind by hand, it stays open. At midnight the automation resets the flag itself. Without the flag, a blind you opened by hand goes down again on the next run (after 10 minutes at the latest).

## 3. Import the blueprint

[![Import](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fbeschattung%2Fsonnenschutz.yaml)

## 4. Create the automation

*Settings → Automations & scenes → Blueprints* → **Sonnenschutz je Fassade**.

| Field (German label) | What to enter |
|---|---|
| Rollos dieser Hausseite – *blinds on this side* | all blinds of the façade |
| Beschattungs-Position – *shading position* | e.g. 20 % (0 = closed, 100 = open) |
| Sonnenstand – *sun position* (expand) | *Sonne kommt ab (Azimut)* / *Sonne ist weg ab (Azimut)*: the angles from step 1. *Mindesthöhe der Sonne* (minimum elevation) 20° usually fits; *Hochfahren, wenn die Sonne tiefer steht als* (raise when the sun is lower than) 5° makes sure the blinds come up in the evening. |
| Temperatur und Wolken (optional) – *temperature and clouds* (expand) | *Raumtemperatur* + *Nur wenn drinnen wärmer als* (room temperature, e.g. above 22 °C), *Außentemperatur* + *Nur wenn draußen wärmer als* (outdoor, e.g. above 20 °C), *Bewölkung* + *Nur wenn weniger bewölkt als* (cloud cover, e.g. below 80 %). Fields left empty are not checked. |
| Merker „heute schon beschattet“ – *flag “already shaded today”* | the toggle from step 2 |
| Position beim Hochfahren – *position when raising* | usually 100 % |

**Save** – done. The automation checks every 10 minutes.

## How the automation decides

- **Down** only when **everything** fits: sun within the angle range and high enough, the set temperatures exceeded, not too cloudy – and the flag is still off.
- **Only blinds that are more open** than the shading position. If you closed a blind completely yourself, it stays closed.
- **Up** when the sun has left the façade (angle passed, or too low in the afternoon). **Only blinds still at the shading position** are raised – whatever you changed by hand in the meantime stays as it is.
- **Clouds don't bring the blinds up.** Once shaded, they stay down until the sun is gone.

## Not working?

| Problem | Solution |
|---|---|
| Blinds never move | *Automation → Traces* shows the values of every run (azimuth, elevation, temperatures). Often the angle range is too narrow or the minimum elevation too high. |
| Blinds move too early or too late | Adjust the angles by 10–20°. |
| Blind goes down again after manual operation | Set up the flag (step 2). |
| Blind doesn't go up in the evening | Is it still exactly at the shading position? The automation deliberately leaves blinds alone that were moved by hand. |
| “Position” error | The blind can't move to a position (only open/close). This blueprint doesn't fit then. |

---

*Links marked with \* are affiliate links. If you buy through them, I get a small commission; the price stays the same for you. As an Amazon Associate I earn from qualifying purchases.*

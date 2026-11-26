# Robot vacuum weekly schedule – step by step

*[Deutsche Fassung](../saugplan.md)*

*📰 From our house: [Kily's World in English](https://kilysworld.com/in-english/) – what our smart home looks like day to day*

The robot vacuums on the days you pick in Home Assistant, and on other days it vacuums and mops. On holiday it stays in the dock, optionally on public holidays too. If you like, it waits until nobody is home. When it's done or gets stuck, you get a notification.

Why not just use the timer in the app? Because the app knows nothing about your holiday and doesn't notice that someone is still working from home.

> **Note:** the input labels inside the blueprint are German. This guide gives the German label as it appears in Home Assistant, followed by its meaning.

## What you need

| | |
|---|---|
| **Robot vacuum in Home Assistant** | anything that shows up as `vacuum.…` – Roborock, Dreame, Xiaomi, Ecovacs, iRobot … |
| **Holiday mode** *(optional)* | a toggle helper that is on while you're away – or any other switch that should pause the schedule |
| **Workday integration** *(optional)* | for "not on public holidays" – *Settings → Devices & services → Add integration → Workday* |

## 1. Turn off the timer in the app

Otherwise it cleans twice. Delete or disable all schedules in the manufacturer's app.

## 2. Import the blueprint

[![Import](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fgeraete%2Fsaugplan.yaml)

## 3. Create the automation

*Settings → Automations & scenes → Blueprints* → **Saugroboter – Wochenplan aus Home Assistant**. For two robots, simply create two automations.

| Field | What to enter |
|---|---|
| Saugroboter – *robot vacuum* | your robot |
| Uhrzeit – *time* | when it starts (default 14:00) |
| Saugen an diesen Tagen – *vacuum on these days* | e.g. Tuesday and Thursday |
| Saugen und wischen an diesen Tagen – *vacuum and mop on these days* | e.g. Wednesday and Friday – leave empty if it doesn't mop |
| Pausieren, wenn eingeschaltet – *pause while on* | e.g. holiday mode; several allowed |
| Arbeitstag-Sensor – *workday sensor* | the Workday sensor – then it rests on public holidays (Monday to Friday) |
| Erst wenn niemand zu Hause ist – *only when nobody is home* | on = if someone is still home, it waits until everybody has left. *Längstens warten bis (wait until at most):* if someone is still home then, the run is skipped |
| Vor dem Saugen / Vor dem Saugen und Wischen – *before vacuuming / before vacuum + mop* | what to switch before starting, see below |
| Nachrichten – *notifications* | phones or your own script; *Melden, wenn er fertig ist* = notify when done |

**Save** – done. It only starts when it's in the dock. If it's running or reports an error, the run is skipped.

## Switching between vacuum and mop

Every manufacturer does this differently. That's why there are two free fields for actions. They run just before the start, depending on whether today is a vacuum or a mop day.

**Roborock** (official integration) – our settings:

| Before vacuuming | Before vacuum + mop |
|---|---|
| *Select: Select option* → `select.…_mop_mode` / cleaning mode → `vacuum` | cleaning mode → `vac_and_mop` |
| mop intensity → `off` | mop intensity → `medium` |

The select entities are named depending on your language. Look under *Settings → Devices* at your robot to see which selects it has.

**Other robots:** many also have a select for mop/vacuum or the water level. If yours has none, leave both fields empty – it then mops just the way it's currently set.

You can also set the suction power here: *Vacuum: Set fan speed*.

## Not working?

| Problem | Solution |
|---|---|
| Doesn't start | *Automation → Traces*: which condition stopped it? Often the robot isn't "docked", or a pause switch is on. |
| Cleans twice | Turn off the timer in the app (step 1). |
| Starts although "only when nobody is home" | It counts the persons whose state is "Home" (under *Settings → People*). Every person needs a device for tracking – the phone with the Home Assistant app or e.g. the router connection. |
| No "done" notification | It comes as soon as the robot reports "docked" or "idle" after cleaning. If it never reports "cleaning", the blueprint waits 5 minutes and notifies anyway – the trace shows which states it reported. |


**Like it?** A ⭐ on [GitHub](https://github.com/johnkily/ha-blueprints) helps others find it – questions and wishes are welcome as an [issue](https://github.com/johnkily/ha-blueprints/issues) or under [Ideas](https://github.com/johnkily/ha-blueprints/discussions/categories/ideas).

**Did it work?** Then I'd be happy about a [coffee on Ko-fi ☕](https://ko-fi.com/johnkily).

# Smart charging with departure time (evcc)

*[Deutsche Fassung](../smartladen.md)*

*📰 From our house: [Kily's World in English](https://kilysworld.com/in-english/) – what our smart home looks like day to day*

Set departure and target in Home Assistant, **evcc** picks the cheapest quarter hours and charges until shortly before departure. Home Assistant only hands over the charging plan and cleans up afterwards – **100 % plans otherwise stay in evcc**.

> The blueprint has German field names – this guide translates them.

## What you need

- **evcc** with a dynamic tariff (e.g. Tibber)
- **The evcc integration** from the Marketplace (formerly HACS) [![Open](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=marq24&repository=ha-evcc&category=integration)
- **Three helpers:** toggle “Smart charging”, date/time “Departure” (date **and** time), number “Target” (20–100, step 5)

## Setup

1. Create the three helpers (*Settings → Devices & services → Helpers*).
2. Find the vehicle id: open `http://<evcc>:7070/api/state`, look under `vehicles` – e.g. `db:6` or the name from `evcc.yaml`.
3. Import: [![Import](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fautos%2Fsmartladen.yaml)

| Field | What to enter |
|---|---|
| Fahrzeug in evcc (*vehicle*) | the id from step 2 |
| Schalter / Abfahrt / Ladeziel (*toggle / departure / target*) | the helpers |
| Fertig so viele Minuten vor der Abfahrt (*ready before departure*) | default 30 |
| Auto angesteckt (*plugged in*) | optional – the plan is handed over again when you plug in later |
| Handys / Eigenes Skript (*phones / own script*) | notifications |

Switch on – done. Changing departure or target updates the plan; at departure time the toggle switches off and the plan is deleted. Messages are German.

---

Like it? A ⭐ on [GitHub](https://github.com/johnkily/ha-blueprints) helps others find it.

**Did it work?** Then I'd be happy about a [coffee or tea on Ko-fi 🍵](https://ko-fi.com/johnkily).

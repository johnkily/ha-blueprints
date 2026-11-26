# Ticket board – everything that needs doing around the house

*[Deutsche Fassung](../ticket_board.md)*

*📰 From our house: [Kily's World in English](https://kilysworld.com/in-english/) – what our smart home looks like day to day*

A Kanban board for Home Assistant: wishes and tasks become tickets in columns, and you see at a glance who takes care of what, what's urgent and what's due. We call ours “Hausmeisterei” (the caretaker's office), and since then no idea gets lost.

The tickets live in a normal **Home Assistant to-do list**. No scripts, no `configuration.yaml`, and everything is part of every backup automatically. You can even see the list in the HA app.

**Three levels – start wherever it suits you:**

![How a ticket goes round and the levels](../bilder/ticketboard_stufen_en.png)

| Level | What you get | What you need | Time |
|---|---|---|---|
| **1 · [Simple](#simple-no-installation)** | Two or three lists side by side. Ticking moves an item to the next column, optional notification | Local To-do lists + one blueprint | 5 minutes |
| **2 · [Pro](#pro-the-ticket-board)** | A real board with priority, assignees with pictures, due dates, filters, history, comments and review | plus one file (the card) | 15 minutes |
| **3 · [Pro + reminders](#reminders-level-3)** | The house reminds you by itself: due, overdue, review waiting, urgent tickets nobody touches. Everyone gets their own tickets on their phone | plus one blueprint | 10 minutes |

All levels use **Home Assistant to-do lists**. Going from level 2 to 3 loses nothing, the blueprint simply reads along. Only when switching from 1 to 2 you add the open tickets once more – the pro card doesn't take over the items of the simple version.

**And beyond that?** In our house an AI also works through approved tickets at night and leaves them for review. That isn't a building block to copy (yet), it's our own system that grew over months. Our blog describes it (in German) – start at [Kily's World in English](https://kilysworld.com/in-english/).

## Simple (no installation)

![Simple board made of three to-do lists](../bilder/ticketboard_einfach.png)

> The blueprint has German field names – this guide translates them.

**1. Create the lists:** *Settings → Devices & services → Add integration* → **Local To-do**, two or three times, e.g. “Ideas”, “In progress” and “Review”.

**2. Import the blueprint:**

[![Import](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Ftickets%2Fticket_board_einfach.yaml)

*Settings → Automations & scenes → Blueprints* → **Ticket-Board einfach – Abhaken schiebt weiter**: enter the lists in order – Erste Spalte (*first column*), Zweite Spalte (*second column*), Dritte Spalte (*third column, optional*). Under “Nachricht, wenn etwas in der letzten Spalte landet” (*notify when something lands in the last column*) pick phones if you like.

**3. Add the cards:** one **To-do list** card per list (*Add card → To-do list*), ideally side by side in a sections view.

**How you use it:** new things go into “Ideas” (also by voice: “Add new bulb bathroom to Ideas”). Ticking moves an item to “In progress”, ticking there moves it to “Review”. Ticked in the last list means done – it stays under “Completed” until you delete it. Description and due date move along. Urgent things get a 🔥 in front of the title.

## Pro: the ticket board

![Ticket board on a desktop](../bilder/ticketboard_desktop.png)

### What it does

- **Five columns:** Inbox, Discussing, In progress, Review, Done (German labels in the screenshots). On a PC, drag cards between columns; on a phone, tap and pick the status.
- **How urgent:** Someday, This week, Urgent. Urgent tickets glow red.
- **Who takes care:** with the picture of the person in Home Assistant. Filters for All, Mine or per person.
- **Due date:** with quick picks “in 1 week”, “in 2 weeks”, “in 1 month”. Overdue tickets are marked red.
- **How important:** up to five hearts.
- **History and comments:** every status change with name and time, plus comments like in a chat.
- **Review:** in the Review column the card shows who asked for the ticket – they check whether it's done right.
- **Archive:** Done shows the newest six, the rest is one tap away. Nothing gets deleted.
- **English and German,** following your Home Assistant language. Light and dark, following your theme.

![Opening a ticket](../bilder/ticketboard_dialog.png)

### 1. Create a to-do list

*Settings → Devices & services → Add integration* → **Local To-do** → name e.g. “Household”. You then have the entity `todo.household`.

### 2. Install the card

**Via the Marketplace (formerly HACS), recommended** – updates come with one click:

[![Open in the Marketplace](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=johnkily&repository=ticket-board-card&category=plugin)

The button opens the card in the Marketplace → **Download**, then reload the browser or app. Without the button: *Settings → Marketplace → ⋮ → Custom repositories* → `https://github.com/johnkily/ticket-board-card`, type **Dashboard**.

**Or by hand:**

1. Download [`ticket-board-card.js`](https://github.com/johnkily/ticket-board-card/blob/main/ticket-board-card.js) (“Download raw file” at the top right).
2. Copy it to `/config/www/` in Home Assistant, e.g. with the *File editor* or *Samba* app. Create the `www` folder if it doesn't exist yet.
3. *Settings → Dashboards → ⋮ → Resources → Add resource*: URL `/local/ticket-board-card.js?v=1`, type **JavaScript module**.
4. Reload the browser or app once.

For a new version, replace the file and increase the number after `?v=` in the resource, otherwise the browser keeps the old one.

### 3. Add the card

Edit dashboard → *Add card* → at the very bottom **Manual** → paste:

```yaml
type: custom:ticket-board-card
entity: todo.household
titel: Household
personen:
  - person.anna
  - person.ben
```

- `entity` – your to-do list (required)
- `titel` – heading above the board (*title*)
- `personen` – who can take on tickets (*persons*). Without these lines there are no assignees and no person filters.
- `archiv` – how many done tickets are visible (*archive*, default 6)

The card fits best in a **Panel** view or a full-width section.

## Reminders (level 3)

A board only helps if somebody looks at it. The blueprint **Ticket-Board – Erinnerungen** (*reminders*) looks once a day for you and sends a message when something is left lying around:

| Sign | When | Default |
|---|---|---|
| 🔥 | Urgent (“Brennt”), in the first two columns and untouched for … days | 1 day |
| 📅 | Due today or overdue (not in review or done) | on |
| 👀 | Waiting for review for … days | 2 days |
| 💤 | Sitting in the first column for … days | off |

New urgent tickets are reported **right away**, not the next morning.

**Who gets what?** The phones under “Handys” get the whole list. With “Zuständige bekommen ihre eigenen Tickets” (*assignees get their own tickets*) on, each assignee also gets a message with only their tickets, on the phone that belongs to their person in Home Assistant (companion app). Phones already listed under “Handys” don't get it twice. For Telegram, Signal or e-mail add your own script, it receives `titel` (*title*) and `nachricht` (*message*) – templates in the [Zigbee watchdog guide](zigbee_waechter.md).

**Setup:**

[![Import](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fjohnkily%2Fha-blueprints%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Ftickets%2Fticket_board_erinnerungen.yaml)

> The blueprint has German field names, but set “Sprache der Meldung” (*language of the message*) to **English** and the messages are in English.

*Settings → Automations & scenes → Blueprints* → **Ticket-Board – Erinnerungen**: under “Board” pick the same to-do list as in the card, choose a time (“Uhrzeit der Tagesmeldung”) and the recipients. With “Dashboard-Pfad zum Board” (*dashboard path*, e.g. `/lovelace/tickets`) tapping the message opens the board.

The morning message looks like this:

```
📋 Ticket board (4)
🔥 Flickering hall light – burning, untouched for 2 d
📅 Washing machine alert – overdue for 1 d · Ben
📅 Living room blind sticks – due today
👀 Doorbell on the phone – waiting for review for 3 d · Anna
```

If nothing is due, nothing is sent. The blueprint belongs to the pro card: items without the ⚙ line (e.g. from the simple version) are skipped.

## Good to know

- **Whoever creates a ticket is saved as “requested by”.** For that, the HA user has to be linked to their person (*Settings → People*). Otherwise the user name is shown.
- **The extra data** (status, priority, history …) is stored at the end of the to-do item's description after a ⚙. If you open the list in the HA app you'll see it there – please don't edit that line by hand.
- **Done** also ticks the item in the to-do list. If someone ticks an item in the app, it moves to Done on the board.
- **Photos and files** aren't supported by the card. Our own system has a folder per ticket on the NAS for that, but it's a lot more work.

## Not working?

| Problem | Solution |
|---|---|
| “Custom element doesn't exist” | Card downloaded in the Marketplace or resource added (step 2)? Then reload the browser or app. |
| Board stays empty with an error | Is the to-do list name under `entity` correct? |
| “Mine” shows nothing | Is your HA user linked to your person? |
| The old version is shown | Installed by hand: increase the number after `?v=`. Marketplace: reload the app or browser. |

---

**Like it?** A ⭐ on [GitHub](https://github.com/johnkily/ha-blueprints) helps others find it – questions and wishes welcome as an [issue](https://github.com/johnkily/ha-blueprints/issues) or under [Ideas](https://github.com/johnkily/ha-blueprints/discussions/categories/ideas).

**Did it work?** Then I'd be happy about a [coffee on Ko-fi ☕](https://ko-fi.com/johnkily).

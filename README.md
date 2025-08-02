# Cyberpunk Fantasy System for Foundry VTT

This repository contains the beginnings of a custom **Cyberpunk Fantasy** game system for Foundry Virtual Tabletop.  It draws on a set of PDF rule handouts (armour, weapons, classes, cybernetics, exploits, feats, guns, injectors, spells) to provide a blend of cybernetic grit and spell‑powered heroics.  The system is intentionally thin at this stage, offering a starting point for your own development rather than a finished rules engine.

## Features

* **System skeleton** – `system.json` defines the manifest, compatibility, document types and compendium pack structure used by Foundry VTT.  Feel free to modify titles, descriptions and metadata to suit your own campaign.
* **Custom actor and item classes** – basic extensions of Foundry's `Actor` and `Item` documents provide a place to compute derived statistics such as ability modifiers, hit points and stress.
* **Character sheet** – a clean, three‑tab sheet implemented as Handlebars templates and styled with CSS.  It exposes core resources (level, hit points, temporary HP, arcane stress) and allows editing of ability scores.  Items assigned to the actor appear in an inventory list.
* **Item sheet** – a simple form that displays the name, description and a handful of generic fields (level, price, traits).  Additional fields appear for weapon and firearm sub‑types.

This system does **not** yet include populated compendium packs for classes, feats, equipment or spells.  Instead it lays the groundwork – you can fill the `packs/` directories with your own JSON or `.db` compendia and expand the data model in the actor and item classes.

## Installation

1. Clone or download this repository.  The folder name must match the `id` defined in `system.json`, so ensure the directory is called `cyberpunkfantasy`.
2. Place the folder in your Foundry data directory under `Data/systems/`.  The path should look like `Data/systems/cyberpunkfantasy/`.
3. Start Foundry VTT, create or load a world and activate the **Cyberpunk Fantasy** system when prompted.

### Installing via Manifest URL

Foundry can install systems directly from a remote manifest.  Once your repository is hosted publicly on GitHub you can provide users with a manifest URL that points at the raw `system.json` file on the default branch.  For example:

```
https://raw.githubusercontent.com/your‑github‑username/cyberpunkfantasy/main/system.json
```

Users can paste this URL into the *Install System* dialog in Foundry's package manager.  When you cut a new release, update the `download` property in `system.json` to point at a zip archive of your tagged release (GitHub generates these automatically).  See the [Foundry packaging guide](https://foundryvtt.com/article/system-development/) for details.

## Repository Structure

```
cyberpunkfantasy/
├─ system.json               # System manifest and metadata
├─ module/
│  ├─ cyberpunkfantasy.mjs    # Entry point that registers documents and sheets
│  ├─ documents/
│  │  ├─ actor.js             # Custom Actor class with derived data
│  │  └─ item.js              # Custom Item class
│  └─ sheets/
│     ├─ actor-sheet.js       # Character sheet class
│     └─ item-sheet.js        # Item sheet class
├─ templates/
│  ├─ actor-sheet.hbs         # Handlebars layout for actors
│  └─ item-sheet.hbs          # Handlebars layout for items
├─ styles/
│  └─ cyberpunkfantasy.css    # CSS to style the sheets
├─ lang/
│  └─ en.json                 # English language strings
├─ packs/                     # Empty compendium folders for content
│  ├─ classes/
│  ├─ cybernetics/
│  ├─ exploits/
│  ├─ feats/
│  ├─ guns/
│  ├─ armor/
│  ├─ injectors/
│  └─ spells/
├─ README.md                  # This documentation
└─ CHANGELOG.md               # Version history (currently empty)
```

## Next Steps

This system is just a foundation.  To build out your game you will need to:

* Populate the compendium packs with items representing the rules from your PDFs.  Each item should include a `type` matching one of the keys in the `documentTypes.Item` section of `system.json` and appropriate `system` data (e.g. damage, price, effects).
* Expand the `CyberpunkFantasyActor` class to handle skills, attack rolls, saving throws, encumbrance, class features and other game mechanics.  Consider adding sheet tabs for spells, cybernetics or feats as your rules require.
* Flesh out the `CyberpunkFantasyItemSheet` to handle unique fields for each item type (e.g. damage dice for weapons or implant slots for cybernetics).
* Implement active effects or macros to automate repetitive calculations like applying temp HP or computing the consequences of arcane stress.

## Contributing

If you plan to collaborate or share your system publicly you should choose a license and place it in `LICENSE.txt`.  Feel free to fork this repository and make it your own!
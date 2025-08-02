/*
 * Cyberpunk Fantasy System entry point.
 *
 * This script registers the system with Foundry VTT, defines custom Actor and Item
 * document classes, and provides basic sheet implementations.  It is intentionally
 * minimal to give you a clear starting point for further development.  Refer to
 * the Foundry API documentation and the community wiki for guidance on expanding
 * your system with additional functionality.
 */

import { CyberpunkFantasyActor } from "./documents/actor.js";
import { CyberpunkFantasyItem } from "./documents/item.js";
import { CyberpunkFantasyActorSheet } from "./sheets/actor-sheet.js";
import { CyberpunkFantasyItemSheet } from "./sheets/item-sheet.js";

/**
 * The init hook fires first when the VTT is initializing.  Register your
 * classes and sheets here.  Avoid accessing `game` data until the ready hook.
 */
Hooks.once('init', async function() {
  console.log('CyberpunkFantasy | Initializing CyberpunkFantasy system');

  // Register custom document classes.  This tells Foundry to use our actor
  // and item classes instead of the default ones when creating new documents.
  CONFIG.Actor.documentClass = CyberpunkFantasyActor;
  CONFIG.Item.documentClass = CyberpunkFantasyItem;

  // Unregister the core sheets and register our own.
  Actors.unregisterSheet('core', ActorSheet);
  Actors.registerSheet('cyberpunkfantasy', CyberpunkFantasyActorSheet, { makeDefault: true });
  Items.unregisterSheet('core', ItemSheet);
  Items.registerSheet('cyberpunkfantasy', CyberpunkFantasyItemSheet, { makeDefault: true });

  // Preload Handlebars templates.  Without this you may get "Failed to load
  // template" errors when rendering sheets.
  await loadTemplates([
    'systems/cyberpunkfantasy/templates/actor-sheet.hbs',
    'systems/cyberpunkfantasy/templates/item-sheet.hbs'
  ]);
});

/**
 * The ready hook fires once the game data is fully prepared.  You can perform
 * additional setup here such as migrating documents or registering settings.
 */
Hooks.once('ready', async function() {
  console.log('CyberpunkFantasy | System ready');
});
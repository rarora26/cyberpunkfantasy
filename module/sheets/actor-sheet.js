import { CyberpunkFantasyItemSheet } from './item-sheet.js';

/**
 * CyberpunkFantasyActorSheet
 *
 * This class defines the default sheet used to render actors of type
 * "character" and "npc" within the Cyberpunk Fantasy system.  It leverages
 * simple HTML structure to expose key statistics to the user.  Additional
 * interactivity such as item management or rolling can be added by extending
 * activateListeners.
 */
export class CyberpunkFantasyActorSheet extends ActorSheet {
  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ['cyberpunkfantasy', 'sheet', 'actor'],
      template: 'systems/cyberpunkfantasy/templates/actor-sheet.hbs',
      width: 680,
      height: 730,
      tabs: [
        { navSelector: '.sheet-tabs', contentSelector: '.sheet-body', initial: 'stats' }
      ]
    });
  }

  /** @override */
  getData(options = {}) {
    const context = super.getData(options);
    context.system = context.data.system;
    context.abilities = context.system.abilities || {};
    return context;
  }

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);
    // If the sheet is not editable there is nothing to do.
    if (!this.isEditable) return;
    // Add custom listeners here as your system grows.
  }
}
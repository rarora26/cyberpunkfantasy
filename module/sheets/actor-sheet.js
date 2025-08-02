// Note: Item sheet import is unused here but retained for potential future expansions.
// import { CyberpunkFantasyItemSheet } from './item-sheet.js';

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
        { navSelector: '.sheet-tabs', contentSelector: '.sheet-body', initial: 'skills' }
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
    // Highlight drop zones when dragging items
    html.find('.feature-level ul').on('dragover', ev => {
      ev.preventDefault();
      ev.currentTarget.classList.add('dragover');
    });
    html.find('.feature-level ul').on('dragleave', ev => {
      ev.currentTarget.classList.remove('dragover');
    });
    // Delegate drop handling to the sheet
    html.find('.feature-level ul').on('drop', ev => this._onDrop(ev));
  }

  /**
   * Handle dropping of items onto this actor sheet.  By default we allow the
   * dropped item to be created on the actor.  You could extend this logic to
   * categorise class or feat items by level.
   *
   * @param {DragEvent} event
   */
  async _onDrop(event) {
    const data = await TextEditor.getDragEventData(event);
    // Call the parent drop handler to create the item on the actor.
    return super._onDrop(event);
  }
}
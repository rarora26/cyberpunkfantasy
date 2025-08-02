/**
 * CyberpunkFantasyItemSheet
 *
 * Defines the default sheet used to render items across all types in the
 * Cyberpunk Fantasy system.  For now this simply displays the name and
 * description fields for any item.  As you add more complex item types (such
 * as weapons or spells) you can extend this sheet or register multiple sheet
 * classes for different item subtypes.
 */
export class CyberpunkFantasyItemSheet extends ItemSheet {
  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ['cyberpunkfantasy', 'sheet', 'item'],
      template: 'systems/cyberpunkfantasy/templates/item-sheet.hbs',
      width: 520,
      height: 480
    });
  }

  /** @override */
  getData(options = {}) {
    const context = super.getData(options);
    context.system = context.data.system;
    return context;
  }
}
/**
 * CyberpunkFantasyItem
 *
 * Extend the base Foundry Item class to support the various item types used
 * by this system (classes, feats, weapons, armor, cybernetics, etc.).  At the
 * moment this class only normalises the item data; additional methods can be
 * added later to handle roll logic or active effects.
 */
export class CyberpunkFantasyItem extends Item {
  /**
   * Prepare derived data for the item.  For example, you could compute the
   * final damage of a weapon based on its traits here.  This method is
   * intentionally empty and provided as a hook for future development.
   */
  prepareData() {
    super.prepareData();
    const data = this.system;
    // Future derived calculations can go here.
  }
}
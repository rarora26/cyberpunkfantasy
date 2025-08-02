/**
 * CyberpunkFantasyActor
 *
 * Extend the base Foundry Actor class to include a default data schema for
 * characters in the Cyberpunk Fantasy system.  This example focuses on core
 * statistics such as ability scores, hit points, and stress.  Additional
 * properties should be added as your system evolves (class features, skills,
 * resistances, cybernetics slots, etc.).
 */
export class CyberpunkFantasyActor extends Actor {
  /**
   * Prepare derived data.  Called automatically by Foundry each time the
   * document is constructed or its data changes.  Use this to compute
   * modifiers and other derived attributes.
   */
  prepareData() {
    super.prepareData();
    const data = this.system;
    this._prepareAbilities(data);
    this._prepareResources(data);
  }

  /**
   * Compute ability score modifiers.
   *
   * @param {object} data   The system data object for the actor
   */
  _prepareAbilities(data) {
    if (!data.abilities) return;
    for (const [ability, stats] of Object.entries(data.abilities)) {
      // Derive the modifier using the standard (value - 10) / 2 formula.
      stats.mod = Math.floor((stats.value - 10) / 2);
    }
  }

  /**
   * Ensure HP and Stress resources always have sane values and do not fall
   * below zero or above their maximums.
   *
   * @param {object} data   The system data object for the actor
   */
  _prepareResources(data) {
    // Hit points
    if (!data.attributes) data.attributes = {};
    if (!data.attributes.hp) {
      data.attributes.hp = { value: 0, max: 0, temp: 0 };
    }
    data.attributes.hp.value = Math.clamped(data.attributes.hp.value, 0, data.attributes.hp.max);
    data.attributes.hp.temp = Math.max(data.attributes.hp.temp || 0, 0);
    // Arcane Stress resource
    if (!data.resources) data.resources = {};
    if (!data.resources.stress) {
      data.resources.stress = { value: 0, threshold: 0 };
    }
    data.resources.stress.value = Math.max(data.resources.stress.value, 0);
  }
}
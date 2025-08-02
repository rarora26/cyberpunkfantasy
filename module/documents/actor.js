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

    // Ensure class and level fields exist
    if (!data.class) data.class = { name: '', archetype: '' };
    if (data.level === undefined) data.level = 0;
    if (!data.xp) data.xp = 0;

    // Derived statistics
    if (!data.derived) data.derived = {};
    if (!data.derived.ac) data.derived.ac = 10;
    if (!data.derived.threshold) data.derived.threshold = 0;
    if (!data.derived.speed) data.derived.speed = 25;
    if (!data.derived.initiative) data.derived.initiative = 0;

    // Saves
    if (!data.saves) {
      data.saves = { fort: 0, ref: 0, will: 0 };
    }

    // Skills: define default skill list if missing.  Skills are stored as an object
    // keyed by a short name with properties for a label, associated ability and
    // current value.
    if (!data.skills) {
      data.skills = {
        athletics: { label: 'Athletics', ability: 'str', value: 0 },
        acrobatics: { label: 'Acrobatics', ability: 'dex', value: 0 },
        stealth: { label: 'Stealth', ability: 'dex', value: 0 },
        thievery: { label: 'Thievery', ability: 'dex', value: 0 },
        drinking: { label: 'Drinking', ability: 'con', value: 0 },
        diplomacy: { label: 'Diplomacy', ability: 'cha', value: 0 },
        performance: { label: 'Performance', ability: 'cha', value: 0 },
        magitech: { label: 'Magitech', ability: 'int', value: 0 },
        engineering: { label: 'Engineering', ability: 'int', value: 0 },
        hacking: { label: 'Hacking', ability: 'int', value: 0 },
        society: { label: 'Society', ability: 'int', value: 0 },
        deception: { label: 'Deception', ability: 'cha', value: 0 },
        intimidation: { label: 'Intimidation', ability: 'cha', value: 0 },
        lore: { label: 'Lore', ability: 'int', value: 0 }
      };
    }

    // Cybernetics: define implant slots
    if (!data.cybernetics) {
      data.cybernetics = {
        eyes: { tier: '', effect: '' },
        brain: { tier: '', effect: '' },
        chest: { tier: '', effect: '' },
        spine: { tier: '', effect: '' },
        arms: { tier: '', effect: '' },
        legs: { tier: '', effect: '' },
        skin: { tier: '', effect: '' }
      };
    }

    // Spell frames: start with three blank entries
    if (!data.spells) {
      data.spells = [
        { name: '', targets: 0, range: '', area: '', baseAS: 0 },
        { name: '', targets: 0, range: '', area: '', baseAS: 0 },
        { name: '', targets: 0, range: '', area: '', baseAS: 0 }
      ];
    }

    // Features by level (L1-L20)
    if (!data.features) {
      data.features = {};
      for (let lvl = 1; lvl <= 20; lvl++) {
        data.features[lvl] = [];
      }
    }

    // Currency
    if (data.credits === undefined) data.credits = 0;

    // Player field
    if (!data.player) data.player = '';
  }
}
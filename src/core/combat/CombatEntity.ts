import { CombatManager } from "./CombatManager";

export class CombatEntity {
  protected combatManager: CombatManager;
  constructor(combatManager: CombatManager) {
    this.combatManager = combatManager;
  }
}

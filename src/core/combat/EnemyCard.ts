import { CardData, TokenType } from "../CardData";
import { CombatEntity } from "./CombatEntity";
import { CombatManager } from "./CombatManager";

export class EnemyCard extends CombatEntity {
  private cardData: CardData;
  // state for each of the enemy's card tokens
  private activeTokens: boolean[];

  constructor(combatManager: CombatManager, cardData: CardData) {
    super(combatManager);
    this.cardData = cardData;
    this.activeTokens = new Array<boolean>(this.cardData.tokens.length).fill(
      false
    );
  }

  public getCardData(): CardData {
    return this.cardData;
  }

  public activateTokenWithType(tokenType: TokenType): boolean {
    for (let i = 0; i < this.cardData.tokens.length; i++) {
      if (this.cardData.tokens[i] === tokenType && !this.activeTokens[i]) {
        this.activeTokens[i] = true;
        this.combatManager.eventPublisher.emit({
          type: "tokenAssigned",
          payload: { card: this.cardData, tokenType },
        });
        return true;
      }
    }
    return false;
  }

  public readyToPlay(): boolean {
    return this.activeTokens.every((token) => token);
  }
}

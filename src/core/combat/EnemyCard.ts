import { CardData, TokenType } from "../CardData";

export class EnemyCard {
  private cardData: CardData;
  // state for each of the enemy's card tokens
  private activeTokens: boolean[];

  constructor(cardData: CardData) {
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
        return true;
      }
    }
    return false;
  }

  public readyToPlay(): boolean {
    return this.activeTokens.every((token) => token);
  }
}

import { CardData, TokenType } from "../CardData";
import { PlayerData } from "../PlayerData";
import { shuffleArray } from "../utils";

export class Player {
  private playerData: PlayerData;
  private hand: CardData[];
  private discardPile: CardData[];
  private drawPile: CardData[];
  private playerDefeatedCallback: () => void;

  constructor(playerData: PlayerData, playerDefeatedCallback: () => void) {
    this.playerData = playerData;
    this.drawPile = playerData.deck.slice();
    this.hand = [];
    this.discardPile = [];
    this.playerDefeatedCallback = playerDefeatedCallback;
  }

  public getDrawPile(): CardData[] {
    return this.drawPile;
  }

  public takeDamage(damage: number): void {
    this.playerData.health -= damage;
    if (this.playerData.health <= 0) {
      // Handle player defeat
      this.playerDefeatedCallback();
    }
  }

  public playCard(
    cardIndex: number,
    tokenHandler: (tokenTypes: TokenType[]) => void,
    damageHandler: (damage: number) => void
  ): void {
    const card = this.hand[cardIndex];
    if (!card) return;

    console.log(
      `Playing card: ${card.text} with tokens: [${card.tokens.join(
        ", "
      )}] and damage: ${card.damage}`
    );
    // Remove the card from the player's hand
    this.hand.splice(cardIndex, 1);

    damageHandler(card.damage);

    // Add the card to the discard pile
    this.discardPile.push(card);

    // Activate the card's tokens
    tokenHandler(card.tokens);
  }

  public drawCards(numCards: number): CardData[] {
    const drawnCards: CardData[] = [];

    if (this.drawPile.length === 0) {
      if (this.discardPile.length > 0) {
        this.drawPile = this.discardPile.slice();
        this.discardPile = [];
        shuffleArray(this.drawPile);
      }
    }

    for (let i = 0; i < numCards; i++) {
      if (this.drawPile.length === 0) break;
      const card = this.drawPile.pop();
      if (card) {
        this.hand.push(card);
        drawnCards.push(card);
      }
    }

    return drawnCards;
  }
}

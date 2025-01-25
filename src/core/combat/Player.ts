import { CardData, TokenType } from "../CardData";
import { PlayerData } from "../PlayerData";
import { shuffleArray } from "../utils";
import { CombatEntity } from "./CombatEntity";
import { CombatManager } from "./CombatManager";

export class Player extends CombatEntity {
  private playerData: PlayerData;
  private hand: CardData[];
  private discardPile: CardData[];
  private drawPile: CardData[];

  constructor(combatManager: CombatManager, playerData: PlayerData) {
    super(combatManager);
    this.playerData = playerData;
    this.drawPile = playerData.deck.slice();
    this.hand = [];
    this.discardPile = [];
  }

  public getDrawPile(): CardData[] {
    return this.drawPile;
  }

  public takeDamage(damage: number): void {
    this.playerData.health -= damage;
    this.combatManager.eventPublisher.emit({
      type: "playerTakesDamage",
      payload: { damage },
    });
    if (this.playerData.health <= 0) {
      // Handle player defeat
      this.combatManager.eventPublisher.emit({
        type: "playerDefeated",
        payload: {},
      });
    }
  }

  public playCard(cardIndex: number): void {
    const card = this.hand[cardIndex];
    if (!card) return;

    // Remove the card from the player's hand
    this.hand.splice(cardIndex, 1);

    this.combatManager.enemy.takeDamage(card.damage);

    // Add the card to the discard pile
    this.discardPile.push(card);

    // Activate the card's tokens
    this.combatManager.enemy.distributeTokens(card.tokens);
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
        this.combatManager.eventPublisher.emit({
          type: "playerDrawsCard",
          payload: { card },
        });
      }
    }

    return drawnCards;
  }
}

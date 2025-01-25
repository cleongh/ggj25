import { CardData, TokenType } from "../CardData";
import { PlayerStatus } from "../general/PlayerStatus";
import { shuffleArray } from "../utils";
import { CombatEntity } from "./CombatEntity";
import { CombatManager } from "./CombatManager";

export class Player extends CombatEntity {
  private playerStatus: PlayerStatus;
  private hand: CardData[];
  private discardPile: CardData[];
  private drawPile: CardData[];

  constructor(combatManager: CombatManager, playerStatus: PlayerStatus) {
    super(combatManager);
    this.playerStatus = playerStatus;
    this.drawPile = playerStatus.deck.slice();
    this.hand = [];
    this.discardPile = [];
  }

  public getDrawPile(): CardData[] {
    return this.drawPile;
  }

  public takeDamage(damage: number): void {
    this.playerStatus.health -= damage;
    this.combatManager.eventPublisher.emit({
      type: "playerTakesDamage",
      payload: { damage },
    });
    if (this.playerStatus.health <= 0) {
      // Handle player defeat
      this.combatManager.eventPublisher.emit({
        type: "playerDefeated",
        payload: {},
      });
    }
  }

  public playCard(cardData: CardData): void {
    const cardIndex = this.hand.findIndex((c) => c === cardData);
    if (cardIndex < 0) return;

    const card = this.hand[cardIndex];

    // Remove the card from the player's hand
    this.hand.splice(cardIndex, 1);

    this.combatManager.eventPublisher.emit({
      type: "playerPlaysCard",
      payload: { card: card },
    });

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

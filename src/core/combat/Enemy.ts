import { TokenType } from "../CardData";
import { EnemyData } from "../EnemyData";
import { shuffleArray } from "../utils";
import { CombatEntity } from "./CombatEntity";
import { CombatManager } from "./CombatManager";
import { EnemyCard } from "./EnemyCard";

export class Enemy extends CombatEntity {
  private health: number;
  private visibleCards: EnemyCard[];
  private enemyData: EnemyData;

  constructor(combatManager: CombatManager, enemyData: EnemyData) {
    super(combatManager);
    this.enemyData = enemyData;
    this.health = enemyData.health;
    this.visibleCards = [];
  }

  public getMaxHealth(): number {
    return this.enemyData.health;
  }

  public getCurrentHealth(): number {
    return this.health;
  }

  public getTextureName(): string {
    return this.enemyData.texture;
  }

  public getName(): string {
    return this.enemyData.name;
  }

  public takeDamage(damage: number): void {
    this.health -= damage;
    this.combatManager.eventPublisher.emit({
      type: "enemyTakesDamage",
      payload: { damage },
    });
    if (this.health <= 0) {
      // Handle enemy defeat
      this.combatManager.eventPublisher.emit({
        type: "enemyDefeated",
        payload: {},
      });
    }
  }

  public getVisibleCards(): EnemyCard[] {
    return this.visibleCards;
  }

  public playReadyCards() {
    // Get the cards that are ready to play
    const cardsToPlay: EnemyCard[] = this.visibleCards.filter((card) =>
      card.readyToPlay()
    );

    // Play the cards that are ready
    cardsToPlay.forEach((card) => {
      this.combatManager.eventPublisher.emit({
        type: "enemyPlaysCard",
        payload: { card: card.getCardData() },
      });
      this.combatManager.player.takeDamage(card.getCardData().damage);
    });
    // Remove the cards that were played
    this.visibleCards = this.visibleCards.filter(
      (card) => !cardsToPlay.includes(card)
    );

    // Draw new cards to replace the ones that were played
    this.drawCards(cardsToPlay.length);
  }

  public drawCards(numCards: number): EnemyCard[] {
    const drawnCards: EnemyCard[] = [];
    for (let i = 0; i < numCards; i++) {
      const randomIndex = Math.floor(
        Math.random() * this.enemyData.deck.length
      );
      const card = new EnemyCard(
        this.combatManager,
        this.enemyData.deck[randomIndex]
      );
      this.visibleCards.push(card);
      drawnCards.push(card);
      this.combatManager.eventPublisher.emit({
        type: "enemyDrawsCard",
        payload: { card: card.getCardData() },
      });
    }

    return drawnCards;
  }

  public distributeTokens(tokenTypes: TokenType[]): void {
    tokenTypes.forEach((tokenType) => {
      const indices = Array.from(
        { length: this.visibleCards.length },
        (_, i) => i
      );
      shuffleArray(indices);
      for (let i = 0; i < indices.length; i++) {
        if (this.visibleCards[indices[i]].activateTokenWithType(tokenType))
          break;
      }
    });
  }
}

import { TokenType } from "../CardData";
import { EnemyData } from "../EnemyData";
import { shuffleArray } from "../utils";
import { EnemyCard } from "./EnemyCard";

export class Enemy {
  private health: number;
  private visibleCards: EnemyCard[];
  private enemyData: EnemyData;
  private enemyDefeatedCallback: () => void;

  constructor(enemyData: EnemyData, enemyDefeatedCallback: () => void) {
    this.enemyData = enemyData;
    this.health = enemyData.health;
    this.visibleCards = [];
    this.enemyDefeatedCallback = enemyDefeatedCallback;
  }

  public takeDamage(damage: number): void {
    this.health -= damage;
    if (this.health <= 0) {
      // Handle enemy defeat
      this.enemyDefeatedCallback();
    }
  }

  public getVisibleCards(): EnemyCard[] {
    return this.visibleCards;
  }

  public playReadyCards(damageHandler: (damage: number) => void) {
    // Get the cards that are ready to play
    const cardsToPlay: EnemyCard[] = this.visibleCards.filter((card) =>
      card.readyToPlay()
    );

    console.log("Playing enemy cards:");
    console.log(cardsToPlay);

    // Play the cards that are ready
    cardsToPlay.forEach((card) => damageHandler(card.getCardData().damage));
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
      const card = new EnemyCard(this.enemyData.deck[randomIndex]);
      this.visibleCards.push(card);
      drawnCards.push(card);
    }

    return drawnCards;
  }

  public distributeTokens(tokenTypes: TokenType[]): void {
    console.log(`Distributing tokens: [${tokenTypes.join(", ")}]`);
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
    console.log(this.visibleCards);
  }
}

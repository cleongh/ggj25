import CardCombatScene from "../scenes/CardCombatScene";
import { CardData, TokenType } from "./CardData";
import { EnemyData } from "./EnemyData";
import { PlayerData } from "./PlayerData";

export class CombatManager {
  private scene: CardCombatScene;
  private enemy: Enemy;
  private player: Player;
  private ongoing: boolean = true;

  constructor(
    scene: CardCombatScene,
    enemyData: EnemyData,
    playerData: PlayerData
  ) {
    console.log("CombatManager constructor");
    this.scene = scene;
    this.enemy = new Enemy(enemyData, () => this.endCombat(true));
    this.player = new Player(playerData, () => this.endCombat(false));
    this.ongoing = true;
  }

  public playCard(cardIndex: number): void {
    this.player.playCard(
      cardIndex,
      (tokenTypes) => this.enemy.distributeTokens(tokenTypes),
      (damage) => this.enemy.takeDamage(damage)
    );

    if (!this.ongoing) return;
    // play any enemy cards that are ready
    this.enemy.playReadyCards((damage) => this.player.takeDamage(damage));
  }

  public startCombat(): void {
    this.enemy.drawCards(3);
    this.player.drawCards(4);
  }

  public isOngoing(): boolean {
    return this.ongoing;
  }

  public endCombat(victory: boolean): void {
    // Handle end of combat logic
    console.log(victory ? "Player wins!" : "Enemy wins!");
    this.ongoing = false;
  }
}

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

  public drawCards(numCards: number): void {
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
      }
    }
  }
}

const shuffleArray = <T>(array: T[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

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

  public drawCards(numCards: number): void {
    for (let i = 0; i < numCards; i++) {
      const randomIndex = Math.floor(
        Math.random() * this.enemyData.deck.length
      );
      this.visibleCards.push(new EnemyCard(this.enemyData.deck[randomIndex]));
    }
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

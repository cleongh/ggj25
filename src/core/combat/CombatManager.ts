import { CardData } from "../CardData";
import { EnemyData } from "../EnemyData";
import { PlayerData } from "../PlayerData";
import { Enemy } from "./Enemy";
import { Player } from "./Player";

export type CombatEvent =
  | { type: "playerDrawsCard"; card: CardData }
  | { type: "enemyDrawsCard"; card: CardData }
  | { type: "playerPlaysCard"; card: CardData }
  | { type: "enemyPlaysCard"; card: CardData }
  | { type: "playerTakesDamage"; damage: number }
  | { type: "enemyTakesDamage"; damage: number }
  | { type: "playerDefeated" }
  | { type: "enemyDefeated" };

export class CombatManager {
  private enemy: Enemy;
  private player: Player;
  private ongoing: boolean = true;
  private eventCallback: (event: CombatEvent) => void;

  constructor(
    enemyData: EnemyData,
    playerData: PlayerData,
    eventCallback: (event: CombatEvent) => void
  ) {
    this.enemy = new Enemy(enemyData, () => this.endCombat(true));
    this.player = new Player(playerData, () => this.endCombat(false));
    this.ongoing = true;
    this.eventCallback = eventCallback;
  }

  public getPlayerDeck(): CardData[] {
    return this.player.getDrawPile();
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
    // draw initial cards and emmit the corresponding draw events
    const drawnEnemyCards = this.enemy.drawCards(3);
    for (const card of drawnEnemyCards) {
      this.eventCallback({ type: "enemyDrawsCard", card: card.getCardData() });
    }

    const drawnPlayerCards = this.player.drawCards(4);
    for (const card of drawnPlayerCards) {
      this.eventCallback({ type: "playerDrawsCard", card: card });
    }
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

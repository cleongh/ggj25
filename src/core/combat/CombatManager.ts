import { CardData } from "../CardData";
import { EnemyData } from "../EnemyData";
import { PlayerStatus } from "../general/PlayerStatus";
import { CombatEventPublisher } from "./CombatEvents";
import { Enemy } from "./Enemy";
import { Player } from "./Player";

export class CombatManager {
  public readonly enemy: Enemy;
  public readonly player: Player;
  private ongoing: boolean = true;
  public readonly eventPublisher: CombatEventPublisher;

  constructor(enemyData: EnemyData, playerStatus: PlayerStatus) {
    this.eventPublisher = new CombatEventPublisher();
    this.enemy = new Enemy(this, enemyData);
    this.player = new Player(this, playerStatus);
    this.ongoing = true;
    this.eventPublisher.subscribe("enemyDefeated", () => this.endCombat());
    this.eventPublisher.subscribe("playerDefeated", () => this.endCombat());
  }

  public getPlayerDeck(): CardData[] {
    return this.player.getDrawPile();
  }

  public playCard(cardData: CardData): void {
    this.player.playCard(cardData);

    if (!this.ongoing) return;
    // play any enemy cards that are ready
    this.enemy.playReadyCards();

    this.player.drawCards(1);
  }

  public startCombat(): void {
    // draw initial cards
    this.enemy.drawCards(3);
    this.player.drawCards(4);
  }

  public isOngoing(): boolean {
    return this.ongoing;
  }

  public endCombat(): void {
    // Handle end of combat logic
    this.ongoing = false;
  } // endCombat
}

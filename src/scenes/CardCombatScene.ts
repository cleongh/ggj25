import Phaser from "phaser";
import { CombatManager } from "../core/combat/CombatManager";
import { enemyDefinitions } from "../data/enemyDefinitions";
import { playerDefinitions } from "../data/cardDefinitions";
import Deck from "../gameObjects/Deck";
import PlayerZone from "../gameObjects/PlayerZone";
import { CombatEvent } from "../core/combat/CombatEvents";

export default class CardCombatScene extends Phaser.Scene {
  quit: Phaser.GameObjects.Text;
  winPlaceholder: Phaser.GameObjects.Text;
  playerDeck: Deck;
  playerZone: PlayerZone;

  private combatManager: CombatManager;
  constructor() {
    super("card-combat");

    this.combatManager = new CombatManager(enemyDefinitions["phdStudent"], {
      deck: playerDefinitions,
      health: 10,
      maxHealth: 10,
      name: "Player",
    });
  }

  create() {
    this.add.text(100, 100, "card combat babe!");

    // Baraja del jugador en la esquinita izq.
    this.playerDeck = new Deck(
      this,
      80,
      510,
      this.combatManager.getPlayerDeck()
    );

    this.playerZone = new PlayerZone(this, 280, 510);

    this.combatManager.eventPublisher.subscribe("playerDrawsCard", () => {
      this.handleDrawEvent(() => {
        console.log("robo terminado");
      });
    });
    this.combatManager.startCombat();

    this.quit = this.add.text(300, 100, "X").setInteractive();

    this.quit.on("pointerdown", () => {
      this.scene.start("main-menu");
    });

    this.winPlaceholder = this.add.text(300, 300, "win").setInteractive();

    this.winPlaceholder.on("pointerdown", () => {
      this.scene.start("combat-reward");
    });
  }

  private handleDrawEvent(onAnimationComplete) {
    const drawnCard = this.playerDeck.draw();
    if (drawnCard) {
      drawnCard.reveal(() => {
        this.playerZone.addCard(drawnCard, onAnimationComplete);
      });
    }
  }
}

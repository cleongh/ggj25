import Phaser from "phaser";
import { CombatManager } from "../core/combat/CombatManager";
import { enemyDefinitions } from "../data/enemyDefinitions";
import { playerDefinitions } from "../data/cardDefinitions";
import Deck from "../gameObjects/Deck";
import { CombatEvent } from "../core/combat/CombatEvents";

export default class CardCombatScene extends Phaser.Scene {
  quit: Phaser.GameObjects.Text;
  winPlaceholder: Phaser.GameObjects.Text;
  playerDeck: Deck;

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

  handleModelEvent(event: CombatEvent) {
    switch (event.type) {
      case "enemyDrawsCard":
        console.log("enemy draws card");
        //const enemyCard = event.card;

        break;
      case "playerDrawsCard":
        console.log("player draws card");
        const drawnCard = this.playerDeck.draw();
        if (drawnCard) drawnCard.reveal();
        break;
      case "playerDefeated":
        console.log("player defeated");
        break;
      case "enemyDefeated":
        console.log("enemy defeated");
        break;
      case "playerPlaysCard":
        console.log("player plays card");
        break;
      case "enemyPlaysCard":
        console.log("enemy plays card");
        break;
      case "playerTakesDamage":
        console.log("player takes damage");
        break;
      case "enemyTakesDamage":
        console.log("enemy takes damage");
        break;
      default:
        console.log("unknown event type");
        break;
    }
  }

  create() {
    this.add.text(100, 100, "card combat babe!");

    this.playerDeck = new Deck(
      this,
      300,
      400,
      this.combatManager.getPlayerDeck()
    );

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
}

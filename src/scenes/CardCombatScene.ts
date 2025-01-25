import Phaser from "phaser";
import { CombatManager } from "../core/combat/CombatManager";
import { enemyDefinitions } from "../data/enemyDefinitions";
import { playerDefinitions } from "../data/cardDefinitions";
import Deck from "../gameObjects/Deck";
import PlayerZone from "../gameObjects/PlayerZone";
import { EffectQueue } from "./EffectQueue";
import EnemyZone from "../gameObjects/EnemyZone";
import { CombatEvent } from "../core/combat/CombatEvents";
import Card from "../gameObjects/Card";

export default class CardCombatScene extends Phaser.Scene {
  quit: Phaser.GameObjects.Text;
  winPlaceholder: Phaser.GameObjects.Text;
  playerDeck: Deck;
  playerZone: PlayerZone;
  enemyZone: EnemyZone;

  private combatManager: CombatManager;
  private effectQueue: EffectQueue;

  constructor() {
    super("card-combat");

    this.combatManager = new CombatManager(enemyDefinitions["phdStudent"], {
      deck: playerDefinitions,
      health: 10,
      maxHealth: 10,
      name: "Player",
    });
    this.effectQueue = new EffectQueue();
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

    // Zona de cartas del jugador
    this.playerZone = new PlayerZone(this, 280, 510);

    // Zona de cartas del enemigo
    this.enemyZone = new EnemyZone(this, 360, 120);

    //Eventos de prueba
    this.combatManager.eventPublisher.subscribe("playerDrawsCard", () => {
      this.effectQueue.enqueue((onAnimationComplete) =>
        this.handleDrawEvent(onAnimationComplete)
      );
    });
    this.combatManager.eventPublisher.subscribe("enemyDrawsCard", (evt) => {
      this.handleEnemyDrawEvent(evt.payload.card, () => {
        console.log("robo enemigo terminado");
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

  private handleDrawEvent(onAnimationComplete: () => void) {
    const drawnCard = this.playerDeck.draw();
    if (drawnCard) {
      drawnCard.reveal(() => {
        this.playerZone.addCard(drawnCard, onAnimationComplete);
      });
    }
  }

  private handleEnemyDrawEvent(cardData, onAnimationComplete) {
    //generar carta
    console.log(cardData)
    const card = new Card(this, 0, 0, "", cardData, () => { });

    // añadir carta a la mano enemiga
    this.enemyZone.addCard(card, () => {
      onAnimationComplete();
    });

  }
}

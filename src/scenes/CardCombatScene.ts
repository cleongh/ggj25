import Phaser from "phaser";
import { CombatManager } from "../core/combat/CombatManager";
import { enemyDefinitions } from "../data/enemyDefinitions";
import { playerDefinitions } from "../data/cardDefinitions";
import Deck from "../gameObjects/Deck";
import PlayerZone from "../gameObjects/PlayerZone";
import { EffectQueue } from "./EffectQueue";
import EnemyZone from "../gameObjects/EnemyZone";
import Card from "../gameObjects/Card";
import { CardData, TokenType } from "../core/CardData";
import PlayerDiscard from "../gameObjects/PlayerDiscard";
import { gameManager } from "../core/general/GameManager";
import HealthBar from "../gameObjects/HealthBar";

export default class CardCombatScene extends Phaser.Scene {
  quit: Phaser.GameObjects.Text;
  winPlaceholder: Phaser.GameObjects.Text;
  playerDeck: Deck;
  playerZone: PlayerZone;
  enemyZone: EnemyZone;
  playerDiscard: PlayerDiscard;
  lastCardPlayer: Card;
  playerHealthBar: HealthBar;
  enemyHealthBar: HealthBar;
  playerSprite: Phaser.GameObjects.Sprite;
  enemySprite: Phaser.GameObjects.Sprite;

  private effectQueue: EffectQueue;

  constructor() {
    super("card-combat");
    this.effectQueue = new EffectQueue();
  }

  create() {
    this.add.text(100, 100, "card combat babe!");

    const cm = gameManager.getCombatManager();
    if (!cm) return;

    // Baraja del jugador en la esquinita izq.
    this.playerDeck = new Deck(this, 80, 510, cm.getPlayerDeck());

    // Zona de cartas del jugador
    this.playerZone = new PlayerZone(this, 280, 510, (card) => {
      this.handleCardPlayed(card);
    });

    // Zona de descarte del jugador
    this.playerDiscard = new PlayerDiscard(this, 900, 510);

    // Zona de cartas del enemigo
    this.enemyZone = new EnemyZone(this, 360, 120);

    // Sprite del jugador y su barra de salud
    this.playerHealthBar = new HealthBar(this, 100 - (128 / 2), 375, 128, 16, cm.player.getMaxHealth(), cm.player.getCurrentHealth())
    this.playerSprite = this.add.sprite(100, 315, "mrbuble-animations").play("idle_mrbuble-animations")

    // Sprite del enemigo y su barra de salud
    this.enemyHealthBar = new HealthBar(this, 680 - (128 / 2), 375, 128, 16, cm.enemy.getMaxHealth(), cm.enemy.getCurrentHealth())
    this.enemySprite = this.add.sprite(680, 300, cm.enemy.getTextureName() + "-animations").play("idle_" + cm.enemy.getTextureName() + "-animations")

    //Eventos de prueba
    cm.eventPublisher.subscribe("playerDrawsCard", (evt) => {
      this.effectQueue.enqueue((onAnimationComplete) =>
        this.handleDrawEvent(onAnimationComplete)
      );
    });

    cm.eventPublisher.subscribe("enemyDrawsCard", (evt) => {
      this.effectQueue.enqueue((onAnimationComplete) =>
        this.handleEnemyDrawEvent(evt.payload.card, onAnimationComplete)
      );
    });

    cm.eventPublisher.subscribe("enemyPlaysCard", (evt) => {
      this.effectQueue.enqueue((onAnimationComplete) =>
        this.enemyPlayCard(evt.payload.card, onAnimationComplete)
      );
    });

    cm.eventPublisher.subscribe("enemyDefeated", (_) => {
      this.scene.start("combat-reward");
    });

    cm.eventPublisher.subscribe("playerShuffleDiscardIntoDraw", (evt) => {
      this.effectQueue.enqueue((onAnimationComplete) =>
        this.reloadDeck(evt.payload.deck, onAnimationComplete)
      );
    });

    cm.eventPublisher.subscribe("playerDiscardsCard", (evt) => {
      this.effectQueue.enqueue((onAnimationComplete) =>
        this.handlePlayerDiscardEvent(evt.payload.card, onAnimationComplete)
      );
    });

    cm.eventPublisher.subscribe("tokenAssigned", (evt) => {
      this.effectQueue.enqueue((onAnimationComplete) =>
        this.addTokenToCard(
          evt.payload.card,
          evt.payload.tokenType,
          onAnimationComplete
        )
      );
    });

    cm.eventPublisher.subscribe("playerTakesDamage", (evt) => {
      this.effectQueue.enqueue((onAnimationComplete) => {
        this.playerHealthBar.dealDamage(evt.payload.damage);
        onAnimationComplete();
      });
      console.log("Player takes damage event received, damage: ", evt.payload.damage)
    })

    cm.eventPublisher.subscribe("enemyTakesDamage", (evt) => {
      this.effectQueue.enqueue((onAnimationComplete) => {
        this.enemyHealthBar.dealDamage(evt.payload.damage);
        onAnimationComplete();
      });
      console.log("Enemy takes damage event received, damage: ", evt.payload.damage)

    })

    cm.startCombat();

    this.quit = this.add.text(300, 100, "X").setInteractive();

    this.quit.on("pointerdown", () => {
      this.scene.start("main-menu");
    });

    this.winPlaceholder = this.add.text(300, 300, "win").setInteractive();

    this.winPlaceholder.on("pointerdown", () => {
      cm.enemy.takeDamage(5000);
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

  private handleCardPlayed(card: Card) {
    gameManager.getCombatManager()?.playCard(card.getCardData());
  }

  private handleEnemyDrawEvent(
    cardData: CardData,
    onAnimationComplete: () => void
  ) {
    //generar carta
    const card = new Card(this, 0, 0, "enemyCard", null, cardData);

    // añadir carta a la mano enemiga
    this.enemyZone.addCard(card, () => {
      onAnimationComplete();
    });
  }

  private handlePlayerDiscardEvent(
    cardData: CardData,
    onAnimationComplete: () => void
  ) {
    let card = this.playerZone.getCardByData(cardData);

    if (card) {
      this.playerDiscard.addToDiscard(card, onAnimationComplete);
    }
  }

  private reloadDeck(cardData: CardData[], onAnimationComplete: () => void) {
    this.playerDiscard.clearDiscard();
    this.playerDeck.loadDeck(cardData, onAnimationComplete);
  }

  private enemyPlayCard(cardData: CardData, onAnimationComplete: () => void) {
    this.enemyZone.playCard(cardData, onAnimationComplete);
  }

  private addTokenToCard(
    cardData: CardData,
    token: TokenType,
    onAnimationComplete
  ) {
    this.enemyZone
      .getCardByData(cardData)
      ?.fillToken(token, onAnimationComplete);
  }
}

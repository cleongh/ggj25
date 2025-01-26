import Phaser from "phaser";
import Deck from "../gameObjects/Deck";
import PlayerZone from "../gameObjects/PlayerZone";
import { EffectQueue } from "./EffectQueue";
import EnemyZone from "../gameObjects/EnemyZone";
import Card from "../gameObjects/Card";
import { CardData, TokenType } from "../core/CardData";
import PlayerDiscard from "../gameObjects/PlayerDiscard";
import { gameManager } from "../core/general/GameManager";
import HealthBar from "../gameObjects/HealthBar";
import BubbleArea from "../gameObjects/BubbleArea";

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
  enemyBubble: BubbleArea;
  playerBubble: BubbleArea;

  private effectQueue: EffectQueue;
  sfx_card:
    | Phaser.Sound.NoAudioSound
    | Phaser.Sound.HTML5AudioSound
    | Phaser.Sound.WebAudioSound;
  sfx_click:
    | Phaser.Sound.NoAudioSound
    | Phaser.Sound.HTML5AudioSound
    | Phaser.Sound.WebAudioSound;

  constructor() {
    super("card-combat");
    this.effectQueue = new EffectQueue();
  }

  create() {
    this.effectQueue.clearQueue();
    this.add.image(0, 0, "bg").setOrigin(0, 0);
    this.sfx_card = this.sound.add("sfx_card", { volume: 2.0 });
    this.sfx_click = this.sound.add("sfx_click", { volume: 2.0 });

    const cm = gameManager.getCombatManager();
    if (!cm) return;

    // Zona de cartas del jugador
    this.playerZone = new PlayerZone(this, 280, 510, (card) => {
      this.handleCardPlayed(card);
    });

    // Zona de descarte del jugador
    this.playerDiscard = new PlayerDiscard(this, 900, 510);

    // Zona de cartas del enemigo
    this.enemyZone = new EnemyZone(this, 360, 120);

    // Sprite del jugador y su barra de salud
    this.playerHealthBar = new HealthBar(
      this,
      100 - 128 / 2,
      365,
      128,
      16,
      cm.player.getMaxHealth(),
      cm.player.getCurrentHealth(),
      "Mr. Buble"
    );
    this.playerSprite = this.add.sprite(100, 300, "mrbuble-animations");
    this.playerSprite.play("idle_mrbuble-animations");

    // Sprite del enemigo y su barra de salud
    this.enemyHealthBar = new HealthBar(
      this,
      680 - 128 / 2,
      365,
      128,
      16,
      cm.enemy.getMaxHealth(),
      cm.enemy.getCurrentHealth(),
      cm.enemy.getName()
    );
    this.enemySprite = this.add.sprite(
      680,
      285,
      cm.enemy.getTextureName() + "-animations"
    );
    this.enemySprite.play("idle_" + cm.enemy.getTextureName() + "-animations");

    this.enemyBubble = new BubbleArea(this, 415, 260, "right");
    this.playerBubble = new BubbleArea(this, 380, 260, "left");

    // Baraja del jugador en la esquinita izq.
    this.playerDeck = new Deck(this, 80, 520, cm.getPlayerDeck());

    //Eventos de prueba
    cm.eventPublisher.subscribe("playerDrawsCard", (evt) => {
      this.sfx_card.play();
      this.effectQueue.enqueue((onAnimationComplete) =>
        this.handleDrawEvent(onAnimationComplete)
      );
    });

    cm.eventPublisher.subscribe("enemyDrawsCard", (evt) => {
      this.sfx_card.play();
      this.effectQueue.enqueue((onAnimationComplete) =>
        this.handleEnemyDrawEvent(evt.payload.card, onAnimationComplete)
      );
    });

    cm.eventPublisher.subscribe("enemyPlaysCard", (evt) => {
      this.sfx_card.play();
      this.effectQueue.enqueue((onAnimationComplete) =>
        this.enemyPlayCard(evt.payload.card, onAnimationComplete)
      );
    });

    cm.eventPublisher.subscribe("playerPlaysCard", (evt) => {
      this.sfx_card.play();
      this.effectQueue.enqueue((onAnimationComplete) =>
        this.displayDialogue(
          evt.payload.card.text,
          "player",
          onAnimationComplete
        )
      );
    });

    cm.eventPublisher.subscribe("enemyDefeated", (_) => {
      // TODO: ¿Animación?
      this.effectQueue.enqueue((onAnimationComplete) => {
        this.scene.start("combat-reward");
        onAnimationComplete();
      });
    });

    cm.eventPublisher.subscribe("playerDefeated", (_) => {
      this.effectQueue.enqueue((onAnimationComplete) => {
        this.scene.start("lose");
        onAnimationComplete();
      });
    });

    cm.eventPublisher.subscribe("playerShuffleDiscardIntoDraw", (evt) => {
      this.sfx_card.play();
      this.effectQueue.enqueue((onAnimationComplete) =>
        this.reloadDeck(evt.payload.deck, onAnimationComplete)
      );
    });

    cm.eventPublisher.subscribe("playerDiscardsCard", (evt) => {
      this.sfx_card.play();
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
    });

    cm.eventPublisher.subscribe("enemyTakesDamage", (evt) => {
      this.effectQueue.enqueue((onAnimationComplete) => {
        this.enemyHealthBar.dealDamage(evt.payload.damage);
        onAnimationComplete();
      });
    });

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
    this.sfx_card.play();
    const drawnCard = this.playerDeck.draw();
    if (drawnCard) {
      drawnCard.reveal(() => {
        this.playerZone.addCard(drawnCard, onAnimationComplete);
      });
    }
  }

  private handleCardPlayed(card: Card) {
    this.sfx_card.play();
    gameManager.getCombatManager()?.playCard(card.getCardData());
  }

  private handleEnemyDrawEvent(
    cardData: CardData,
    onAnimationComplete: () => void
  ) {
    this.sfx_card.play();
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
    this.sfx_card.play();
    let card = this.playerZone.getCardByData(cardData);

    if (card) {
      this.playerDiscard.addToDiscard(card, onAnimationComplete);
    } else {
      onAnimationComplete();
    }
  }

  private reloadDeck(cardData: CardData[], onAnimationComplete: () => void) {
    this.playerDiscard.clearDiscard();
    this.playerDeck.loadDeck(cardData, onAnimationComplete);
  }

  private enemyPlayCard(cardData: CardData, onAnimationComplete: () => void) {
    this.sfx_card.play();
    this.enemyZone.playCard(cardData, () => {
      this.displayDialogue(cardData.text, "enemy", onAnimationComplete);
    });
  }

  private displayDialogue(
    dialogueText: string,
    dialogueSource: "player" | "enemy",
    onAnimationComplete: () => void
  ) {
    const cm = gameManager.getCombatManager();
    if (!cm) return;

    if (dialogueSource === "player") {
      this.playerSprite.play("talk_mrbuble-animations");
      this.playerBubble.setText(dialogueText);
    } else {
      this.enemySprite.play(
        "talk_" + cm.enemy.getTextureName() + "-animations"
      );
      this.enemyBubble.setText(dialogueText);
    }

    this.time.delayedCall(1500, () => {
      if (dialogueSource === "player") {
        this.playerSprite.play("idle_mrbuble-animations");
        this.playerBubble.setText("");
      } else {
        this.enemySprite.play(
          "idle_" + cm.enemy.getTextureName() + "-animations"
        );
        this.enemyBubble.setText("");
      }
      onAnimationComplete();
    });
  }

  private addTokenToCard(
    cardData: CardData,
    token: TokenType,
    onAnimationComplete: () => void
  ) {
    this.enemyZone
      .getCardByData(cardData)
      ?.fillToken(token, onAnimationComplete);
  }
}

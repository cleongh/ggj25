import Phaser from "phaser";
import Card from "./Card";
import { CardData } from "../core/CardData";

const OFFSET_CARDS = 4;
const START_Y = -200;
const CARD_WIDTH: integer = 120;
const CARD_HEIGHT: integer = 150;
const PADDING: integer = 4;

export default class EnemyZone extends Phaser.GameObjects.Container {
  private cards: (Card | undefined)[] = [undefined, undefined, undefined];

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);
    for (let i = 0; i < 3; i++) {
      let bg = new Phaser.GameObjects.Rectangle(
        this.scene,
        i * (PADDING + CARD_WIDTH),
        0,
        CARD_WIDTH,
        CARD_HEIGHT,
        0xcacaff
      );
      bg.setStrokeStyle(1, 0xcacaca);
      this.add(bg);
    }
    scene.add.existing(this);
  }

  /**
   * Añade la carta a la mano del enemigo, las cartas salen desde fuera de la pantalla
   * @param card Carta robada
   * @param onAnimationComplete callback que sucede después de la animación de añadir la carta
   * @param duration Tiempo de la animación
   * @returns
   */
  public addCard(card: Card, onAnimationComplete, duration = 500) {
    console.log("ADD CARRRD");
    card.instantClearToken();
    card.instantShow();
    for (let i = 0; i < this.cards.length; i++) {
      if (!this.cards[i]) {
        this.cards[i] = card;
        this.add(card);
        card.x = i * (PADDING + CARD_WIDTH);
        card.y = START_Y;

        this.scene.tweens.add({
          targets: card,
          props: {
            y: { value: 0, duration: duration, delay: 0 },
          },
          onComplete: () => {
            onAnimationComplete();
          },
          ease: "Linear",
        });

        return;
      }
    }
    onAnimationComplete();
  }

  /**
   * Elimina la carta de la mano del enemigo.
   * @param card
   * @returns
   */
  public removeCardByCard(card: Card): Card | undefined {
    for (let i = 0; i < this.cards.length; i++) {
      if (this.cards[i] === card) {
        this.cards[i] = undefined;
        this.remove(card);
        return card;
      }
    }
    return undefined;
  }

  /**
   * Elimina la carta en la posición dicha de la mano del enemigo
   * @param pos posición de la carta
   * @returns
   */
  public removeCardByPos(pos: integer): Card | undefined {
    let c = this.cards[pos];
    if (c) this.remove(c);
    this.cards[pos] = undefined;

    return c;
  }

  public playCard(data: CardData, onAnimationComplete, duration = 500) {
    let card = this.getCardByData(data);
    this.scene.tweens.add({
      targets: card,
      props: {
        y: { value: -200, duration: duration, delay: 0 },
      },
      onComplete: () => {
        if (card) {
          this.removeCardByCard(card);
          this.remove(card);
          card.destroy();
        }
        onAnimationComplete();
      },
      ease: "Linear",
    });
  }

  public getCardByData(data: CardData): Card | undefined {
    return this.cards.find((c) => !!c && c.getCardData() === data);
  }
}

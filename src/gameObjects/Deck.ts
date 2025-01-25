import Phaser from "phaser";
import { CardData } from "../core/CardData";
import Card from "./Card";

const OFFSET_CARDS = 4;

export default class Deck extends Phaser.GameObjects.Container {
  private cards: Card[] = [];

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    cardsData: CardData[]
  ) {
    super(scene, x, y);
    this.loadDeck(cardsData, () => { });
    // Add the deck to the scene
    scene.add.existing(this);
  }

  public draw(): Card | undefined {
    if (this.cards.length === 0) {
      return undefined;
    }

    return this.cards.pop();
  }

  public loadDeck(cardsData: CardData[], onAnimationComplete, duration = 500) {
    this.cards.forEach(element => {
      element.destroy();
    });

    let offsetX = 0;
    let offsetY = 0;
    cardsData.forEach((element) => {
      let card = new Card(this.scene, -200, 0, "", element);

      this.add(card);
      this.cards.push(card);

      this.scene.tweens.add({
        targets: card,
        props: {
          x: { value: offsetX, duration: duration, delay: 0 },
          y: { value: offsetY, duration: duration, delay: 0 },
        },
        onComplete: () => {
          if (element === cardsData[cardsData.length - 1])
            onAnimationComplete();
        },
        ease: "Linear",
      });
      offsetX += OFFSET_CARDS;
      offsetY -= OFFSET_CARDS;
    });
  }

  /*
  public addCards(newCards: CardData[]) {
    this.cards = this.cards.concat(newCards);
  }*/
}

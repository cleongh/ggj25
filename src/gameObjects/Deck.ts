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
    originalCards: CardData[]
  ) {
    super(scene, x, y);

    let offsetX = 0;
    let offsetY = 0;
    originalCards.forEach(element => {
      let card = new Card(scene, offsetX, offsetY, "", element, () => { });
      offsetX += OFFSET_CARDS;
      offsetY -= OFFSET_CARDS;
      this.add(card);
      this.cards.push(card);
    });

    // Add the deck to the scene
    scene.add.existing(this);
  }

  public draw(): Card | undefined {
    if (this.cards.length === 0) {
      return undefined;
    }

    return this.cards.pop();
  }

  /*
  public addCards(newCards: CardData[]) {
    this.cards = this.cards.concat(newCards);
  }*/
}

import Phaser from "phaser";
import { CardData } from "../core/CardData";
import Card from "./Card";

export default class Deck extends Phaser.GameObjects.Container {
  private cards: CardData[];

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    originalCards: CardData[]
  ) {
    super(scene, x, y);
    this.cards = originalCards;

    // Add the deck to the scene
    scene.add.existing(this);
  }

  public draw(): CardData | undefined {
    if (this.cards.length === 0) {
      return undefined;
    }

    return this.cards.pop();
  }
}

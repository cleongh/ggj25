import Phaser from "phaser";
import { CardData } from "../core/CardData";

export default class Discard extends Phaser.GameObjects.Container {
  private cards: CardData[];

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    originalCards: CardData[]
  ) {
    super(scene, x, y);
    this.cards = originalCards;

    // Add the discard pile to the scene
    scene.add.existing(this);
  }

  public getCards(): CardData[] {
    return this.cards;
  }
}

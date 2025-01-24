import Phaser from "phaser";
import { CardData, TokenType } from "../core/CardData";

type CardCallback = (card: Card) => void;

export default class Card extends Phaser.GameObjects.Sprite {
  private cardData: CardData;
  private onClickCallback: CardCallback;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    cardData: CardData,
    onClickCallback: CardCallback
  ) {
    super(scene, x, y, texture);
    this.cardData = cardData;
    this.onClickCallback = onClickCallback;

    this.setInteractive();
    this.on("pointerdown", this.handleClick, this);

    scene.add.existing(this);
  }

  private handleClick(): void {
    this.onClickCallback(this);
  }

  public getCardData(): CardData {
    return this.cardData;
  }

  public setTokenStatus(tokenStates: TokenType[]) {}
}

import Phaser from "phaser";
import { CardData, TokenType } from "../core/CardData";
import Token from "./Token";
import { cardTextStyle, cardValueStyle } from '../defaultFont.js';

type CardCallback = (card: Card) => void;

const CARD_WIDTH: integer = 120;
const CARD_HEIGHT: integer = 150;
const PADDING: integer = 20;

export default class Card extends Phaser.GameObjects.Container {
  private cardData: CardData;
  private onClickCallback?: CardCallback;

  private bg: Phaser.GameObjects.Rectangle | Phaser.GameObjects.Sprite;
  private back: Phaser.GameObjects.Rectangle | Phaser.GameObjects.Sprite;
  private tokens: Token[] = [];
  private text: Phaser.GameObjects.Text;
  private value: Phaser.GameObjects.Text;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    textureFront: string | null,
    textureBack: string | null,
    cardData: CardData
  ) {
    super(scene, x, y);
    this.cardData = cardData;

    if (!textureBack) {
      this.back = new Phaser.GameObjects.Rectangle(
        this.scene,
        0,
        0,
        CARD_WIDTH,
        CARD_HEIGHT,
        0x121212
      );
      this.back.setStrokeStyle(1, 0xcacaca);
    } else {
      this.back = new Phaser.GameObjects.Sprite(scene, 0, 0, textureBack);
    }

    if (!textureFront) {
      this.bg = new Phaser.GameObjects.Rectangle(
        this.scene,
        0,
        0,
        CARD_WIDTH,
        CARD_HEIGHT,
        0xffffff
      );
      this.bg.setStrokeStyle(1, 0xcacaca);
    } else {
      this.bg = new Phaser.GameObjects.Sprite(scene, 0, 0, textureFront)
    }
    this.bg.setVisible(false);


    this.text = new Phaser.GameObjects.Text(
      scene,
      -CARD_WIDTH / 2 + PADDING,
      -CARD_HEIGHT / 2 + PADDING,
      cardData.text,
      cardTextStyle
    )
      .setAlign("center")
      .setOrigin(0, 0);
    this.text.setVisible(false);

    this.value = new Phaser.GameObjects.Text(
      scene,
      -10,
      6,
      cardData.damage.toString(),
      cardValueStyle
    )
      .setAlign("center")
      .setOrigin(0, 0);
    this.value.setVisible(false);

    this.add(this.back);
    this.add(this.bg);
    this.add(this.text);
    this.add(this.value);

    let i = 0;
    cardData.tokens.forEach((element) => {
      let token = new Token(
        this.scene,
        PADDING / 2 - CARD_WIDTH / 2 + (i + 1) * PADDING,
        44,
        element
      )
        .setOrigin(0, 0);
      this.tokens.push(token);
      this.add(token);
      token.setVisible(false);
      i++;
    });

    scene.add.existing(this);

    this.bg.setInteractive();
    this.bg.on("pointerdown", this.handleClick, this);
  }
  public setClickHandler(onClick: CardCallback) {
    this.onClickCallback = onClick;
  }

  public instantFillTokens() {
    this.tokens.forEach(element => {
      element.instantActivate();
    });
  }

  public instantClearToken() {
    this.tokens.forEach(element => {
      element.instantDeactivate();
    });
  }

  public fillToken(token: TokenType, onAnimationComplete) {
    const t = this.tokens.find(element => element.getTokenType() === token && !element.isActive)
    if (t) {
      t.activate(onAnimationComplete);
      return;
    }
    onAnimationComplete();
  }

  public instantShow() {
    this.bg.setVisible(true);
    this.back.setVisible(false);
    this.text.setVisible(true);
    this.value.setVisible(true);
    this.tokens.forEach((element) => {
      element.setVisible(true);
    });
  }

  public instantHide() {
    this.bg.setVisible(false);
    this.back.setVisible(true);
    this.text.setVisible(false);
    this.value.setVisible(false);
    this.tokens.forEach((element) => {
      element.setVisible(false);
    });
  }

  public reveal(onAnimationComplete: () => void, t = 500): void {
    this.scene.tweens.add({
      targets: this,
      props: {
        y: { value: this.y - 100, duration: t / 3, delay: 0 },
        x: { value: this.x + 40, duration: t / 3, delay: 0 },
        scaleX: { value: 0, duration: t / 3, delay: t / 3, yoyo: true },
      },
      ease: "Linear",
    });
    this.scene.time.addEvent({
      delay: (2 * t) / 3,
      callback: () => {
        this.bg.setVisible(true);
        this.back.setVisible(false);
        this.text.setVisible(true);
        this.value.setVisible(true);
        this.tokens.forEach((element) => {
          element.setVisible(true);
        });
        onAnimationComplete();
      },
    });
  }

  private handleClick(): void {
    if (this.onClickCallback) this.onClickCallback(this);
  }

  public getCardData(): CardData {
    return this.cardData;
  }

  public setTokenStatus(tokenStates: TokenType[]) { }
}

import Phaser from "phaser";
import { TokenType } from "../core/CardData";

function getTexture(tokenType: TokenType) {
  switch (tokenType) {
    case TokenType.PHYSICAL: return 1
    case TokenType.RELATIONSHIPS: return 5
    case TokenType.WORK: return 3
  }
}

export default class Token extends Phaser.GameObjects.Sprite {
  public isActive: boolean;
  private tokenType: TokenType;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    type: TokenType,
    active: boolean = true
  ) {
    let frame: integer = getTexture(type)
    if (!active)
      frame -= 1;
    super(scene, x, y, 'tokens', frame);
    this.tokenType = type;
    this.isActive = active;
    if (this.isActive) this.instantActivate(); else this.instantDeactivate();
    this.setInteractive();
    scene.add.existing(this);
  }

  activate(onAnimationComplete): void {
    if (!this.isActive) {
      this.setFrame(getTexture(this.tokenType));
      this.isActive = true;
    }
    onAnimationComplete();
  }

  instantActivate() {
    if (!this.isActive) {
      this.setFrame(getTexture(this.tokenType));
      this.isActive = true;
    }
  }

  deactivate(onAnimationComplete): void {
    if (this.isActive) {
      this.setFrame(getTexture(this.tokenType) - 1);
      this.isActive = false;
    }
    onAnimationComplete();

  }

  instantDeactivate() {
    if (this.isActive) {
      this.setFrame(getTexture(this.tokenType) - 1);
      this.isActive = false;
    }
  }

  toggle(onAnimationComplete): void {
    if (this.isActive) {
      this.deactivate(onAnimationComplete);
    } else {
      this.activate(onAnimationComplete);
    }
  }

  getTokenType(): TokenType {
    return this.tokenType;
  }

}

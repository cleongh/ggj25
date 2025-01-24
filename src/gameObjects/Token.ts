import Phaser from "phaser";
import { TokenType } from "../core/CardData";

function getTexture(tokenType: TokenType) {
  switch (tokenType) {
    case TokenType.PHYSICAL: return "physical"
    case TokenType.RELATIONSHIPS: return "relationships"
    case TokenType.WORK: return "work"
  }
}

export default class Token extends Phaser.GameObjects.Sprite {
  private isActive: boolean;
  
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    type: TokenType,
    active: boolean = true,
    frame?: string | number
  ) {
    const texture: string = getTexture(type)
    super(scene, x, y, texture, frame);
    
    this.isActive = active;
    if (this.isActive) this.activate(); else this.deactivate();
    this.setInteractive();
    scene.add.existing(this);
  }

  activate(): void {
    this.isActive = true;
    this.alpha = 1;
  }

  deactivate(): void {
    this.isActive = false;
    this.alpha = 0.3;
  }

  toggle(): void {
    if (this.isActive) {
      this.deactivate();
    } else {
      this.activate();
    }
  }

}

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
    frame?: string | number
  ) {
    const texture: string = getTexture(type)
    super(scene, x, y, texture, frame);
    
    this.isActive = false;
    this.setInteractive();
    scene.add.existing(this);
  }

  activate(): void {
    this.isActive = true;
    this.setTint(0x00ff00); // Green tint to indicate active state
  }

  deactivate(): void {
    this.isActive = false;
    this.clearTint(); // Remove tint to indicate inactive state
  }

  toggle(): void {
    if (this.isActive) {
      this.deactivate();
    } else {
      this.activate();
    }
  }

}

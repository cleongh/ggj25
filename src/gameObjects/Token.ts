import Phaser from "phaser";

export default class Token extends Phaser.GameObjects.Sprite {
  private isActive: boolean;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame?: string | number
  ) {
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

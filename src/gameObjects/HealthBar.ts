import Phaser from "phaser";

export default class HealthBar extends Phaser.GameObjects.Container {
  private bar: Phaser.GameObjects.Graphics;
  private maxHealth: number;
  private currentHealth: number;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    maxHealth: number,
    currentHealth: number
  ) {
    super(scene, x, y);
    this.maxHealth = maxHealth;
    this.currentHealth = currentHealth;

    this.bar = new Phaser.GameObjects.Graphics(scene);
    this.add(this.bar);

    this.draw();
    scene.add.existing(this);
  }

  private draw() {
    this.bar.clear();
    this.bar.fillStyle(0x000000);
    this.bar.fillRect(0, 0, 100, 20);
    this.bar.fillStyle(0xff0000);
    this.bar.fillRect(2, 2, 96 * (this.currentHealth / this.maxHealth), 16);
  }

  public setHealth(health: number) {
    this.currentHealth = Phaser.Math.Clamp(health, 0, this.maxHealth);
    this.draw();
  }
}

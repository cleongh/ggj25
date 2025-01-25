import Phaser from "phaser";

export default class HealthBar extends Phaser.GameObjects.Container {
  private bar: Phaser.GameObjects.Graphics;
  private maxHealth: number;
  private currentHealth: number;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    width: number,
    height: number, 
    maxHealth: number,
    currentHealth: number
  ) {
    super(scene, x, y);
    this.maxHealth = maxHealth;
    this.currentHealth = currentHealth;
    this.width = width
    this.height = height

    this.bar = new Phaser.GameObjects.Graphics(scene);
    this.add(this.bar);

    this.draw();
    scene.add.existing(this);
  }

  private draw() {
    this.bar.clear();
    this.bar.fillStyle(0x999999);
    this.bar.fillRect(0, 0, this.width, this.height);
    this.bar.fillStyle(this.colorFromHealth());
    this.bar.fillRect(2, 2, (this.width-4) * (this.currentHealth / this.maxHealth), this.height-4);
  }

  public setHealth(health: number) {
    this.currentHealth = Phaser.Math.Clamp(health, 0, this.maxHealth);
    this.draw();
  }
  
  public dealDamage(damage: number) {
    this.currentHealth = Phaser.Math.Clamp(this.currentHealth - damage, 0, this.maxHealth);
    this.draw()
  }

  colorFromHealth(): number {
    let healthRatio = this.currentHealth / this.maxHealth
    if (healthRatio < 0.1) {
      return 0xde042c
    } else if (healthRatio < 0.5) {
      return 0xff9900
    } else {
      return 0x00d45f
    }
  }
}

import Phaser from "phaser";
import defaultTextStyle from '../defaultFont';

export default class HealthBar extends Phaser.GameObjects.Container {
  private bar: Phaser.GameObjects.Graphics;
  private healthDisplay: Phaser.GameObjects.Text;
  private maxHealth: number;
  private currentHealth: number;
  private fontStyle = { ...defaultTextStyle, fontSize: 10 };

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
    this.healthDisplay = scene.add.text(this.width / 2, height + 8, "", this.fontStyle).setOrigin(0.5, 0.5);

    this.add(this.bar);
    this.add(this.healthDisplay);

    this.draw();
    scene.add.existing(this);
  }

  private draw() {
    this.bar.clear();
    this.bar.fillStyle(0x333333);
    this.bar.fillRect(0, 0, this.width, this.height);
    this.bar.fillStyle(0x888888);
    this.bar.fillRect(2, 2, this.width - 4, this.height - 4);
    this.bar.fillStyle(this.colorFromHealth());
    this.bar.fillRect(2, 2, (this.width - 4) * (this.currentHealth / this.maxHealth), this.height - 4);
    this.healthDisplay.text = this.currentHealth + "/" + this.maxHealth
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
    if (healthRatio <= 0.2) {
      return 0xde042c
    } else if (healthRatio <= 0.5) {
      return 0xff9900
    } else {
      return 0x00d45f
    }
  }
}

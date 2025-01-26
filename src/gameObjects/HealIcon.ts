import Phaser from "phaser";
import defaultTextStyle from '../defaultFont';

export default class HealIcon extends Phaser.GameObjects.Container {
    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        healedAmount: number
    ) {
        super(scene, x, y);
        let heal = new Phaser.GameObjects.Image(scene, 0, 0, "heal").setOrigin(0.5, 0.5);
        let t = new Phaser.GameObjects.Text(scene, 0, 0, healedAmount.toString(), defaultTextStyle).setOrigin(0.5, 0.5);

        heal.setTint(0x42f5cb);

        this.add(heal)
        this.add(t)
        this.setScale(0.3);
        this.scene.tweens.add({
            targets: this,
            props: {
                scale: { value: 1, duration: 500, delay: 0, yoyo: true }
            },
            ease: "Linear",
            onComplete: () => {
                t.destroy();
                heal.destroy();
                this.destroy();
            }
        });

        this.scene.add.existing(this);
    }
}
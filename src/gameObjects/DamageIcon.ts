import Phaser from "phaser";
import defaultTextStyle from '../defaultFont';

export default class DamageIcon extends Phaser.GameObjects.Container {
    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        damage: number
    ) {
        super(scene, x, y);
        let dam = new Phaser.GameObjects.Image(scene, 0, 0, "damage").setOrigin(0.5, 0.5);
        let t = new Phaser.GameObjects.Text(scene, 0, 0, damage.toString(), defaultTextStyle).setOrigin(0.5, 0.5);

        if (damage <= 1) {
            dam.setTint(0xf2e879);
        } else if (damage == 2) {
            dam.setTint(0xf5a40c);
        } else {
            dam.setTint(0xf5130c);
        }
        this.add(dam)
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
                dam.destroy();
                this.destroy();
            }
        });

        this.scene.add.existing(this);
    }
}
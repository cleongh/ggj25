import Phaser from 'phaser';

export default class CombatRewardScene extends Phaser.Scene {
    next: Phaser.GameObjects.Text;
    constructor() {
        super('combat-reward');
    }

    create() {

        this.add.text(100, 100, "choose a card");


        this.next = this.add.text(300, 100, "next combat").setInteractive();

        this.next.on('pointerdown', () => {
            this.scene.start('card-combat')
        });

    }
}

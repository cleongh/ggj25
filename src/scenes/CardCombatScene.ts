import Phaser from 'phaser';

export default class CardCombatScene extends Phaser.Scene {
    quit: Phaser.GameObjects.Text;
    constructor() {
        super('card-combat');



    }

    create() {
        this.add.text(100, 100, "card combat babe!");

        this.quit = this.add.text(300, 100, "X").setInteractive();

        this.quit.on('pointerdown', () => {
            this.scene.start('main-menu')
        });

    }
}

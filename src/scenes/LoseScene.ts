import Phaser from 'phaser'

export default class WinScene extends Phaser.Scene {
    constructor() {
        super('lose');
    }

    create() {
        this.add.text(100, 100, "Has perdido");

        this.add.text(100, 150, "Menu").setInteractive().on('pointerdown', () => {
            this.scene.start('main-menu')
        });

    }
}

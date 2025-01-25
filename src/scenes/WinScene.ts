import Phaser from 'phaser'

export default class WinScene extends Phaser.Scene {
    constructor() {
        super('win');
    }

    create() {
        this.add.text(100, 100, "Has ganado");

        this.add.text(100, 150, "Menu").setInteractive().on('pointerdown', () => {
            this.scene.start('main-menu')
        });

    }
}

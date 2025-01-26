import Phaser from 'phaser'

export default class WinScene extends Phaser.Scene {
    constructor() {
        super('win');
    }

    create() {
        this.add.text(100, 100, "Has ganado");
        
        let sfx_click = this.sound.add("sfx_click", {volume: 2.0});

        this.add.text(100, 150, "Menu").setInteractive().on('pointerdown', () => {
            sfx_click.play()
            this.scene.start('main-menu')
        });

    }
}

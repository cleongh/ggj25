import Phaser from 'phaser';

export default class MapScene extends Phaser.Scene {
    constructor() {
        super('map')
    }

    create() {

        this.add.text(100, 100, "the map");

        this.add.text(100, 150, "O").setInteractive().on('pointerdown', () => {
            this.scene.start('card-combat');
        }); 

        this.add.line(0, 0, 100, 150, 200, 200, 0xff0000);
    }
}
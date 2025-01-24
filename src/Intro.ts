export default class Intro extends Phaser.Scene {
    next: Phaser.GameObjects.Text;
    constructor() {
        super('intro');


    }

    create() {
        this.next = this.add.text(100, 100, "Next").setInteractive();
        this.next.on('pointerdown', () => {
            this.scene.start('card-combat')
        });
    }
}


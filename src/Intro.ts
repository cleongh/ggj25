export default class Intro extends Phaser.Scene {
    next: Phaser.GameObjects.Text;
    constructor() {
        super('intro');


    }

    create() {
        this.next = this.add.text(100, 100, "Sr. Bubble ha sufrido mucho en la vida. Ahora quiere tomarse la revancha.").setInteractive();

        this.next = this.add.text(100, 150, "Jugar").setInteractive();
        this.next.on('pointerdown', () => {
            this.scene.start('card-combat');
        });
    }
}


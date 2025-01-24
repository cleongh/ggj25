export default class Credits extends Phaser.Scene {
    goback: Phaser.GameObjects.Text;
    constructor() {
        super('credits');
    }

    create() {
        this.goback = this.add.text(100, 100, "Menu!").setInteractive();
        this.goback.on('pointerdown', () => {
            this.scene.start('main-menu')
        });
    }
}


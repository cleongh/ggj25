export default class Credits extends Phaser.Scene {
    goback: Phaser.GameObjects.Text;
    constructor() {
        super('credits');
    }

    create() {        
        let sfx_click = this.sound.add("sfx_click", {volume: 1.0});

        this.goback = this.add.text(100, 100, "Menu!").setInteractive();
        this.goback.on('pointerdown', () => {
            sfx_click.play()
            this.scene.start('main-menu')
        });
    }
}


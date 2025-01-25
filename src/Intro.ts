import defaultTextStyle from './defaultFont.js'

export default class Intro extends Phaser.Scene {
    next: Phaser.GameObjects.Text;
    constructor() {
        super('intro');


    }

    create() {
        this.add.image(0, 0, "menuBackground").setOrigin(0, 0)/* .setTint(0xffffff) */;

        this.next = this.add.text(100, 100, "El Sr. Buble ha sufrido mucho en la vida. Ahora quiere tomarse la revancha.\n\n¡Ve, Sr. Buble y ajusta cuentas con el mundo!", {
            ...defaultTextStyle, wordWrap: { width: 600 },
            align: 'center'
        }).setInteractive();

        this.add.text(this.cameras.main.width / 2, 300, "Jugar", defaultTextStyle).setInteractive().on('pointerdown', () => {
            this.scene.start('map');
        }).setOrigin(0.5, 0.5);
    }
}


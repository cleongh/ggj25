import defaultTextStyle from '../defaultFont.js'

export default class BubleScene extends Phaser.Scene {
    next: Phaser.GameObjects.Text;
    constructor() {
        super('buble-easter');
    }

    create() {
        this.add.image(0, 0, "bg").setOrigin(0, 0)/* .setTint(0xffffff) */;

        const menuFont = { ...defaultTextStyle, fontSize: 63 };

        this.add.text(this.cameras.main.width / 2, 120, "Mr. Bublé", menuFont).
    setOrigin(0.5, 0.5);

        // this.next = this.add.text(100, 100, "¿Por qué está tan enfadado Mr. Buble?\n\n¿Por la burbuja inmobiliaria?\n¿Demasiadas bebidas con burbujas?\n¿O porque hemos escrito mal su nombre?\n\n¡Ve, Mr. Buble, y ajusta cuentas con el mundo!", {
        //     ...defaultTextStyle, wordWrap: { width: 600 },
        //     align: 'center'
        // }).setInteractive();

        this.add.text(this.cameras.main.width-10, this.cameras.main.height-20, "Volver al menú", defaultTextStyle).setInteractive().on('pointerdown', () => {
            this.scene.start('main-menu');
        }).setOrigin(1, 0.5);
    }
}


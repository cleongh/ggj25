import defaultTextStyle from './defaultFont.js'

export default class Intro extends Phaser.Scene {
    next: Phaser.GameObjects.Text;
    play: Phaser.GameObjects.Text;
    constructor() {
        super('intro');


    }

    create() {
        this.add.image(0, 0, "menuBackground").setOrigin(0, 0)/* .setTint(0xffffff) */;
        
        let sfx_click = this.sound.add("sfx_click", {volume: 2.0});

        this.next = this.add.text(100, 100, "¿Por qué está tan enfadado Mr. Buble?\n\n¿Por la burbuja inmobiliaria?\n¿Demasiadas bebidas con burbujas?\n¿O porque hemos escrito mal su nombre?\n\n¡Ve, Mr. Buble, y ajusta cuentas con el mundo!", {
            ...defaultTextStyle, wordWrap: { width: 600 },
            align: 'center'
        }).setInteractive();

        this.play = this.add.text(this.cameras.main.width / 2, 300, "Jugar", defaultTextStyle).setInteractive().on('pointerdown', () => {
            sfx_click.play()
            this.scene.start('map');
        }).setOrigin(0.5, 0.5);

        this.play.setInteractive().on('pointerover', () => this.enterButtonHoverState() )
        .on('pointerout', () => this.enterButtonRestState() );
    }

    enterButtonHoverState()
    {
        this.play.setStyle({ fill: '#ff0'});
    }

    enterButtonRestState()
    {
        this.play.setStyle({ fill: '#1e1e1e' });
    }
}


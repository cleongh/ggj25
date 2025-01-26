import Phaser from 'phaser'
import defaultTextStyle from '../defaultFont';

export default class WinScene extends Phaser.Scene {
    textMenu: Phaser.GameObjects.Text;

    constructor() {
        super('win');
    }

    create() {

        this.add.image(0, 0, "winBackground").setOrigin(0, 0).setTint(0xffffff);
		let sfx_click = this.sound.add("sfx_click", {volume: 3.0});
        const buttonFont = { ...defaultTextStyle, fontSize: 28 };

        this.add.text(this.cameras.main.width / 2, 100, "HAS GANADO", buttonFont).
        setOrigin(0.5, 0.5);

        
        this.textMenu = this.add.text(this.cameras.main.width / 2, 150, "Menu", buttonFont);
        this.textMenu.setInteractive().on('pointerdown', () => {
            sfx_click.play()
            this.scene.start('main-menu')
        });


        this.textMenu.setOrigin(0.5, 0.5);

        this.textMenu.setInteractive().on('pointerover', () => this.enterButtonHoverState() )
        .on('pointerout', () => this.enterButtonRestState() );

    }

    enterButtonHoverState()
    {
        this.textMenu.setStyle({ fill: '#ff0'});
    }

    enterButtonRestState()
    {
        this.textMenu.setStyle({ fill: '#1e1e1e' });
    }
}

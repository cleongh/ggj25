import Phaser from 'phaser'
import defaultTextStyle from '../defaultFont';

export default class MainMenuScene extends Phaser.Scene {

  constructor() {
    super('main-menu');
  }

  create() {
    const menuFont = { ...defaultTextStyle, fontSize: 53 };

    this.add.image(0, 0, "menuBackground").setOrigin(0, 0).setTint(0xffffff);

    this.add.text(this.cameras.main.width / 2, 100, "Play", menuFont).
      setInteractive().
      setOrigin(0.5, 0.5).
      on('pointerdown', () => {
        this.scene.start('intro')
      });


    this.add.text(this.cameras.main.width / 2, 400, "Credits", menuFont).
      setInteractive().
      setOrigin(0.5, 0.5).
      on('pointerdown', () => {
        this.scene.start('credits')
      });
  }
}

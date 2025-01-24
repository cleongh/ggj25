import Phaser from 'phaser'

export default class MainMenuScene extends Phaser.Scene {
  play: Phaser.GameObjects.Text;
  credits: Phaser.GameObjects.Text;
  constructor() {
    super('main-menu');

   
    // this.quit = this.add.text(100, 100, "Quit").setInteractive();
    
  }

  create() {
    this.play = this.add.text(100, 100, "Play").setInteractive();
    this.play.on('pointerdown', () => {
      this.scene.start('intro')
    });


    this.credits = this.add.text(100, 150, "Credits").setInteractive();

    this.credits.on('pointerdown', () => {
      this.scene.start('credits')
    });
  }
}

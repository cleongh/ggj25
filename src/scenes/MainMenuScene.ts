import Phaser from 'phaser'
import defaultTextStyle from '../defaultFont';

export default class MainMenuScene extends Phaser.Scene {
  static music: any;

  music = null ;



  static playMusic(scene) {
    if(!MainMenuScene.music) {
      MainMenuScene.music = scene.sound.add('music_mainmenu', {volume: 2.0});
      if(!MainMenuScene.music.isPlaying){
      MainMenuScene.music.play({ loop: true });
  }
    }
  }

  constructor() {
    super('main-menu');
  }

  create() {
    MainMenuScene.playMusic(this);
    const menuFont = { ...defaultTextStyle, fontSize: 53 };
    const buttonFont = { ...defaultTextStyle, fontSize: 28 };

    this.add.image(0, 0, "menuBackground").setOrigin(0, 0).setTint(0xffffff);

    this.add.text(this.cameras.main.width / 2, 120, "Mr. Buble", menuFont).
    setOrigin(0.5, 0.5);
    
    let sfx_click = this.sound.add("sfx_click", {volume: 3.0});

    this.add.sprite(610, 100, "smoke")
      .setOrigin(0.5, 1)
      .play("idle_smoke")
      .setInteractive()
      .on('pointerdown', () => {
        sfx_click.play()
        this.scene.start('buble-easter')
      });


    this.add.text(this.cameras.main.width / 2, 220, "Play", buttonFont).
      setInteractive().
      setOrigin(0.5, 0.5).
      on('pointerdown', () => {
        sfx_click.play()
        this.scene.start('intro')
      });


    this.add.text(this.cameras.main.width / 2, 280, "Credits", buttonFont).
      setInteractive().
      setOrigin(0.5, 0.5).
      on('pointerdown', () => {
        sfx_click.play()
        this.scene.start('credits')
      });
  }
}

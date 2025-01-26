import Phaser from 'phaser'
import defaultTextStyle from '../defaultFont';

export default class MainMenuScene extends Phaser.Scene {
  playText: Phaser.GameObjects.Text;
  creditsText: Phaser.GameObjects.Text;
  constructor() {
    super('main-menu');
  }

  create() {
    
    const debug = false;

    const menuFont = { ...defaultTextStyle, fontSize: 53 };
    const buttonFont = { ...defaultTextStyle, fontSize: 28 };

    this.add.image(0, 0, "menuBackground").setOrigin(0, 0).setTint(0xffffff);

    this.add.text(this.cameras.main.width / 2, 120, "Mr. Buble", menuFont).
    setOrigin(0.5, 0.5);
    
    let sfx_click = this.sound.add("sfx_click", {volume: 1.0});

    this.add.sprite(610, 100, "smoke")
      .setOrigin(0.5, 1)
      .play("idle_smoke")
      .setInteractive()
      .on('pointerdown', () => {
        sfx_click.play()
        this.scene.start('buble-easter')
      });


    this.playText = this.add.text(this.cameras.main.width / 2, 220, "Jugar", buttonFont).
      setInteractive().
      setOrigin(0.5, 0.5).
      on('pointerdown', () => {
        sfx_click.play()
        this.scene.start('intro')
      });


    this.creditsText = this.add.text(this.cameras.main.width / 2, 280, "Créditos", buttonFont).
      setInteractive().
      setOrigin(0.5, 0.5).
      on('pointerdown', () => {
        sfx_click.play()
        this.scene.start('credits')
      });

      this.playText.setInteractive().on('pointerover', () => this.enterButtonHoverStatePlay() )
        .on('pointerout', () => this.enterButtonRestStatePlay() );

      this.creditsText.setInteractive().on('pointerover', () => this.enterButtonHoverStateCredits() )
        .on('pointerout', () => this.enterButtonRestStateCredits() );

      if(debug)
      {
        this.add.text(this.cameras.main.width / 2, 340, "win", buttonFont).
        setInteractive().
        setOrigin(0.5, 0.5).
        on('pointerdown', () => {
          sfx_click.play()
          this.scene.start('win')
        });
  
        this.add.text(this.cameras.main.width / 2, 400, "lose", buttonFont).
        setInteractive().
        setOrigin(0.5, 0.5).
        on('pointerdown', () => {
          sfx_click.play()
          this.scene.start('lose')
        });
      }

  }

  enterButtonHoverStatePlay()
  {
      this.playText.setStyle({ fill: '#ff0'});
  }

  enterButtonRestStatePlay()
  {
      this.playText.setStyle({ fill: '#1e1e1e' });
  }

  enterButtonHoverStateCredits()
  {
      this.creditsText.setStyle({ fill: '#ff0'});
  }

  enterButtonRestStateCredits()
  {
      this.creditsText.setStyle({ fill: '#1e1e1e' });
  }
}

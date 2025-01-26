import defaultTextStyle from '../defaultFont.js'
import Phaser from 'phaser'

export default class BubleScene extends Phaser.Scene {

    //theMusic: Phaser.Sound.WebAudioSound | Phaser.Sound.NoAudioSound | Phaser.Sound.HTML5AudioSound;
    mrbuble: Phaser.GameObjects.Image;
    music: Phaser.Sound.NoAudioSound | Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound;
    constructor() {
        super('buble-easter');
    }

    // preload() {
    //     // Sounds
    //     this.load.audio("buble", "ggj25/assets/buble.mp3");
    // }

    create() {


        (this.sound as Phaser.Sound.WebAudioSoundManager).decodeAudio('buble');
        this.music = this.sound.add('buble');
        this.music.play({ loop: false });

        //this.theMusic = this.sound.add("buble");
        //this.theMusic.play("buble");
        this.add.image(0, 0, "bg").setOrigin(0, 0)/* .setTint(0xffffff) */;

        const menuFont = { ...defaultTextStyle, fontSize: 63 };

        this.add.text(this.cameras.main.width / 2, 120, "Mr. Bublé", menuFont).
            setOrigin(0.5, 0.5);

        this.mrbuble = this.add.image(this.cameras.main.width / 2, this.cameras.main.height + 450, "realbuble").setOrigin(0, 1);
        this.tweens.add({
            targets: this.mrbuble,
            y: { value: this.cameras.main.height, duration: 2000, delay: 0 },
            // onComplete: () => {
            //     this.scene.start('main-menu');
            // },
            ease: "Linear",
        });

        // this.next = this.add.text(100, 100, "¿Por qué está tan enfadado Mr. Buble?\n\n¿Por la burbuja inmobiliaria?\n¿Demasiadas bebidas con burbujas?\n¿O porque hemos escrito mal su nombre?\n\n¡Ve, Mr. Buble, y ajusta cuentas con el mundo!", {
        //     ...defaultTextStyle, wordWrap: { width: 600 },
        //     align: 'center'
        // }).setInteractive();

        this.add.text(10, this.cameras.main.height - 20, "Volver al menú", defaultTextStyle).setInteractive().on('pointerdown', () => {
            this.music.stop();
            this.scene.start('main-menu');
        }).setOrigin(0, 0.5);
    }
}


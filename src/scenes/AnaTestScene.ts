import Phaser from 'phaser'



export default class TestScene extends Phaser.Scene {
    constructor() {
        super('test-scene');
    }

    preload() {
        this.load.path = '/ggj25/assets/';

        this.load.spritesheet("bubble_text_right", "bubble_text_right.png", { frameWidth: 128, frameHeight: 128 })

    }

    create() {

        let bg = this.add.sprite(400, 300, "bg");

        let mrbuble = this.add.sprite(128, 100, "mrbuble-animations").play("talk_mrbuble-animations")

        let mrbatpat = this.add.sprite(256, 100, "mrbatpat").play("idle_mrbatpat")

        let mrmagoo = this.add.sprite(128*3, 100, "mrmagoo").play("idle_mrmagoo")

        let mrdrop = this.add.sprite(128*4, 100, "mrdrop").play("idle_mrdrop")

        this.anims.create({
            key: 'bubble_text_right_anim',
            frames: this.anims.generateFrameNumbers("bubble_text_right", { start: 0, end: 2 }),
            frameRate: 6,
            repeat: -1
          })

          
          let speechBubble = this.add.sprite(100, 500, "bubble_text_right").play('bubble_text_right_anim')
          

          this.add.nineslice(200, 300, "bubble_text_right",0, 400, 128, 33, 33, 33, 33)

    }
}


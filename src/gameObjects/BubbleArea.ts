import Phaser from "phaser";
import { cardTextStyle } from "../defaultFont";

export default class BubbleArea extends Phaser.GameObjects.Container {
  private bubbleSprite: Phaser.GameObjects.NineSlice;
  private bubbleText: Phaser.GameObjects.Text;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    type: "left" | "right"
  ) {
    super(scene, x, y);

    const frameKey = `bubble_text_${type}`;
    this.scene.anims.create({
      key: "bubble_text_right_anim",
      frames: this.scene.anims.generateFrameNumbers(frameKey, {
        start: 0,
        end: 2,
      }),
      frameRate: 6,
      repeat: -1,
    });

    const BUBBLE_WIDTH = 420;
    const BUBBLE_HEIGHT = 128;
    const PADDING = 20;

    this.bubbleSprite = new Phaser.GameObjects.NineSlice(
      this.scene,
      0,
      0,
      frameKey,
      0,
      BUBBLE_WIDTH,
      BUBBLE_HEIGHT,
      33,
      33,
      33,
      33
    );

    this.add(this.bubbleSprite);

    // Create the text on top of the bubble
    /*this.bubbleText = this.scene.add.text(0, 0, "", {
      fontSize: "16px",
      color: "#000000",
      align: "center",
    });*/

    const wrapWidth = BUBBLE_WIDTH - PADDING;
    this.bubbleText = this.scene.add.text(0, 0, "", {
      fontSize: "16px",
      color: "#000000",
      align: "center",
      wordWrap: { width: wrapWidth, useAdvancedWrap: true },
    });

    this.bubbleText.setOrigin(0.5, 0.5);
    this.add(this.bubbleText);

    // Add this container to the scene
    this.scene.add.existing(this);

    this.setVisible(false);
  }

  public setText(text: string) {
    this.bubbleText.setText(text);
    this.setVisible(text.length > 0);
  }
}

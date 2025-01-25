import Phaser from "phaser";
import { CardData } from "../core/CardData";
import Card from "./Card";
import { transformCoordinates } from "../core/utils";

const OFFSET_CARDS = 4;
const CARD_WIDTH: integer = 120;
const CARD_HEIGHT: integer = 150;

export default class PlayerDiscard extends Phaser.GameObjects.Container {
    private cards: Card[] = [];

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
    ) {
        super(scene, x, y);

        let bg = new Phaser.GameObjects.Rectangle(
            this.scene,
            0,
            0,
            CARD_WIDTH,
            CARD_HEIGHT,
            0xffffff
        );
        bg.setStrokeStyle(1, 0xcacaca);
        this.add(bg);

        // Add the deck to the scene
        scene.add.existing(this);
    }

    public addToDiscard(card: Card, onAnimationComplete, duration = 1000) {
        this.cards.push(card);
        const localCoords = transformCoordinates(
            card.parentContainer,
            this,
            card.x,
            card.y
        );
        if (card.parentContainer) {
            card.parentContainer.remove(card);
        }
        this.add(card);
        card.x = localCoords.x;
        card.y = localCoords.y;

        let targetX = OFFSET_CARDS * this.cards.length;
        let targetY = -OFFSET_CARDS * this.cards.length;

        this.scene.tweens.add({
            targets: card,
            props: {
                x: { value: targetX, duration: duration, delay: 0 },
                y: { value: targetY, duration: duration, delay: 0 },
            },
            onComplete: () => {
                onAnimationComplete();
            },
            ease: "Linear",
        });
    }
}

import Phaser from "phaser";
import Card from "./Card";

const OFFSET_CARDS = 4;
const CARD_WIDTH: integer = 120;
const CARD_HEIGHT: integer = 150;
const PADDING: integer = 4;

export default class PlayerZone extends Phaser.GameObjects.Container {
    private cards: (Card | undefined)[] = [undefined, undefined, undefined, undefined];

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
    ) {
        super(scene, x, y);
        for (let i = 0; i < 4; i++) {
            let bg = new Phaser.GameObjects.Rectangle(
                this.scene,
                i * (PADDING + CARD_WIDTH),
                0,
                CARD_WIDTH,
                CARD_HEIGHT,
                0xffffff
            );
            bg.setStrokeStyle(1, 0xcacaca);
            this.add(bg);
        }
        scene.add.existing(this);
    }

    /**
     * Añade la carta a la mano del jugador
     * @param card 
     * @param onAnimationComplete 
     * @returns 
     */
    public addCard(card: Card, onAnimationComplete) {
        for (let i = 0; i < this.cards.length; i++) {
            if (!this.cards[i]) {
                this.cards[i] = card;
                const localCoords = this.transformCoordinates(card.parentContainer, this, card.x, card.y);
                if (card.parentContainer) {
                    card.parentContainer.remove(card)
                }
                this.add(card);
                card.x = localCoords.x
                card.y = localCoords.y;
                this.moveToSlot(card, i, onAnimationComplete);
                return;
            }
        }
    }

    /**
     * Elimina la carta de la mano del jugador
     * @param card 
     * @returns 
     */
    public removeCardByCard(card: Card): Card | undefined {
        for (let i = 0; i < this.cards.length; i++) {
            if (this.cards[i] === card) {
                this.cards[i] = undefined;
                this.remove(card);
                return card;
            }
        }
        return undefined;
    }

    /**
     * Elimina la carta de la mano del jugador en base a la posición dicha
     * @param pos 
     * @returns 
     */
    public removeCardByPos(pos: integer): Card | undefined {
        let c = this.cards[pos];
        if (c)
            this.remove(c);
        this.cards[pos] = undefined;

        return c;
    }


    /**
     * Mueve una carta desde su posición al primer hueco vacío de la mano.
     * @param card 
     * @param pos 
     * @param onAnimationComplete 
     * @param duration 
     */
    public moveToSlot(card: Card, pos: integer, onAnimationComplete, duration = 1000) {
        let targetX = pos * (PADDING + CARD_WIDTH);
        let targetY = 0;

        this.scene.tweens.add({
            targets: card,
            props: {
                x: { value: targetX, duration: duration, delay: 0 },
                y: { value: targetY, duration: duration, delay: 0 }
            },
            onComplete: () => {
                onAnimationComplete();
            },
            ease: "Linear",
        });
    }

    /**
     * Función para transformar coordenadas relativas de un padre a otro. Esto habría que moverlo a utils.
     * @param sourceContainer 
     * @param targetContainer 
     * @param x 
     * @param y 
     * @returns 
     */
    private transformCoordinates(
        sourceContainer: Phaser.GameObjects.Container,
        targetContainer: Phaser.GameObjects.Container,
        x: number,
        y: number
    ): { x: number, y: number } {
        // Get the world transform matrix of the source container
        const sourceMatrix = sourceContainer.getWorldTransformMatrix();

        // Apply the matrix to the coordinates to get the world coordinates
        const worldX = sourceMatrix.tx + x * sourceMatrix.a + y * sourceMatrix.c;
        const worldY = sourceMatrix.ty + x * sourceMatrix.b + y * sourceMatrix.d;

        // Get the inverse world transform matrix of the target container
        const targetMatrix = targetContainer.getWorldTransformMatrix();
        const inverseTargetMatrix = targetMatrix.invert();

        // Apply the inverse matrix to the world coordinates to get the local coordinates of the target container
        const localX = inverseTargetMatrix.tx + worldX * inverseTargetMatrix.a + worldY * inverseTargetMatrix.c;
        const localY = inverseTargetMatrix.ty + worldX * inverseTargetMatrix.b + worldY * inverseTargetMatrix.d;

        return { x: localX, y: localY };
    }
}
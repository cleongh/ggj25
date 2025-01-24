import Phaser from 'phaser';

export default class CardCombatScene extends Phaser.Scene {
    constructor() {
        super('card-combat');



    }

    create() {
        this.add.text(100, 100, "card combat babe!");

    }
}

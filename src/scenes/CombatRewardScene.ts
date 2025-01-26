import Phaser from "phaser";
import { gameManager } from "../core/general/GameManager";
import Card from "../gameObjects/Card";

export default class CombatRewardScene extends Phaser.Scene {
  next: Phaser.GameObjects.Text;
  constructor() {
    super("combat-reward");
  }

  create() {
    this.add.image(0, 0, "bg").setOrigin(0, 0);
    this.add.text(100, 100, "choose a card");

    const rewardCards = gameManager.getCurrentRewardCards();
    if (!rewardCards) return;

    rewardCards.forEach((card, i) => {
      const c = new Card(this, 200 + 200 * i, 300, "playerCard", "backCard", card);
      c.instantShow();
      c.setClickHandler(() => {
        gameManager.selectRewardCard(card);
      });
    });

    gameManager.eventPublisher.subscribe(
      "mapStageEntered",
      this.handleMapStageEntered.bind(this)
    );
  }

  private handleMapStageEntered() {
    this.scene.start("map");
    gameManager.eventPublisher.unsubscribe(
      "mapStageEntered",
      this.handleMapStageEntered // todo
    );
  }
}

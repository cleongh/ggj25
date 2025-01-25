import Phaser from "phaser";
import { gameManager } from "../core/general/GameManager";
import Card from "../gameObjects/Card";

export default class CombatRewardScene extends Phaser.Scene {
  next: Phaser.GameObjects.Text;
  constructor() {
    super("combat-reward");
  }

  create() {
    this.add.text(100, 100, "choose a card");

    const rewardCards = gameManager.getCurrentRewardCards();
    if (!rewardCards) return;

    console.log(rewardCards);
    rewardCards.forEach((card, i) => {
      const c = new Card(this, 100 + 100 * i, 200, "", card);
      c.setClickHandler(() => {
        gameManager.selectRewardCard(card);
      });
    });

    gameManager.eventPublisher.subscribe(
      "mapStageEntered",
      this.handleMapStageEntered
    );
  }

  private handleMapStageEntered() {
    this.scene.start("map");
    gameManager.eventPublisher.unsubscribe(
      "mapStageEntered",
      this.handleMapStageEntered
    );
  }
}

import Phaser from "phaser";
import { gameManager } from "../core/general/GameManager";
import Card from "../gameObjects/Card";
import defaultTextStyle from "../defaultFont";

export default class CombatRewardScene extends Phaser.Scene {
  next: Phaser.GameObjects.Text;
  constructor() {
    super("combat-reward");
  }

  create() {
    this.add.image(0, 0, "bg").setOrigin(0, 0);
    this.add.text(this.cameras.main.width / 2, 100, "¡Buen trabajo!\n\nElige una nueva carta para seguir tu camino.",
      { ...defaultTextStyle, align: 'center' }
    ).setOrigin(0.5, 0.5);

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

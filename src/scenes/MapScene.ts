import Phaser from "phaser";
import { LevelData, LevelNode } from "../core/LevelData";
import { gameManager } from "../core/general/GameManager";

export default class MapScene extends Phaser.Scene {
  constructor() {
    super("map");
  }

  create() {
    this.add.text(100, 100, "El Mapa");

    gameManager.levelData.nodes.forEach((levelNode) => {
      this.drawNode(levelNode);
      levelNode.nextNodes.forEach((neighbourId) => {
        const nnode = gameManager.levelData.nodes.find(
          (n) => n.id === neighbourId
        );
        if (!nnode) return;
        this.add
          .line(
            0,
            0,
            levelNode.x + 20,
            levelNode.y + 5,
            nnode.x - 5,
            nnode.y + 5,
            0xff0000
          )
          .setOrigin(0);
      });
    });

    const currentNode = gameManager.levelData.nodes.find(
      (n) => n.id === gameManager.levelData.rootNodeId
    );
    if (!currentNode) return;
    const playerMarker = new Phaser.GameObjects.Ellipse(
      this,
      currentNode.x,
      currentNode.y,
      30,
      30,
      0xff0000,
      1
    );
    this.add.existing(playerMarker);
  }

  private drawNode(nodeData: LevelNode) {
    const nodeType = nodeData.interaction.type;
    this.add
      .text(nodeData.x, nodeData.y, nodeType === "enemy" ? "E" : "H")
      .setInteractive()
      .on("pointerdown", () => {
        this.scene.start("card-combat", nodeData.interaction.payload);
      });
  }
}

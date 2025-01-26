import Phaser from "phaser";
import { LevelNode } from "../core/LevelData";
import { gameManager } from "../core/general/GameManager";
import { GameEvent } from "../core/general/GameEvents";

import defaultTextStyle from "./../defaultFont.js";

export default class MapScene extends Phaser.Scene {
  private combatEnteredHandler: (
    event: Extract<GameEvent, { type: "combatEntered" }>
  ) => void;

  constructor() {
    super("map");
    this.combatEnteredHandler = (enemyData) => {
      gameManager.eventPublisher.unsubscribe(
        "combatEntered",
        this.combatEnteredHandler
      );
      this.scene.start("card-combat", enemyData);
    };
  }

  create() {
    this.add.image(0, 0, "bg").setOrigin(0, 0);
    this.paintNodes();

    gameManager.eventPublisher.subscribe("healingAreaEntered", () => {
      this.scene.start("map");
    });
    gameManager.eventPublisher.subscribe(
      "combatEntered",
      this.combatEnteredHandler
    );
  }

  private paintNodes() {
    const currentNode = gameManager.levelData.nodes.find(
      (n) => n.id === gameManager.getCurrentNodeId()
    );

    gameManager.levelData.nodes.forEach((levelNode) => {
      const node = this.drawNode(levelNode);
      if (
        (!currentNode && levelNode.id === gameManager.levelData.rootNodeId) ||
        (currentNode && currentNode.nextNodes.includes(levelNode.id))
      ) {
        node.setInteractive({ useHandCursor: true });
        this.tweens.add({
          targets: node,
          scale: 1.2,
          duration: 800,
          yoyo: true,
          repeat: -1,
          ease: "Sine.easeInOut",
        });
      }
      levelNode.nextNodes.forEach((neighbourId) => {
        const nnode = gameManager.levelData.nodes.find(
          (n) => n.id === neighbourId
        );
        if (!nnode) return;

        const ax = levelNode.x + 0.15 * (nnode.x - levelNode.x);
        const ay = levelNode.y + 0.15 * (nnode.y - levelNode.y);
        const bx = levelNode.x + 0.85 * (nnode.x - levelNode.x);
        const by = levelNode.y + 0.85 * (nnode.y - levelNode.y);
        this.add.graphics().lineStyle(5, 0x8f563b).lineBetween(ax, ay, bx, by);
        //this.add.line(0, 0, ax, ay, bx, by, 0xff0000).setOrigin(0);
      });
    });
  }

  private drawNode(nodeData: LevelNode) {
    const nodeType = nodeData.interaction.type;
    return this.add
      .image(
        nodeData.x,
        nodeData.y,
        nodeType === "enemy"
          ? "fight_node"
          : nodeType === "healing"
          ? "health_node"
          : "empty_node"
      )
      .setInteractive()
      .on("pointerdown", () => {
        console.log("CLICK NODO", nodeData.id);
        gameManager.selectNextNode(nodeData.id);
      });
  }
}

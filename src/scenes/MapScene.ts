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

    this.add
      .text(
        this.cameras.main.width / 2,
        550,
        "Elige tu camino",
        defaultTextStyle
      )
      .setOrigin(0.5, 0.5);

    gameManager.levelData.nodes.forEach((levelNode) => {
      this.drawNode(levelNode);
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

    this.drawNode({
      x: 250,
      y: 550,
      nextNodes: [gameManager.levelData.rootNodeId],
      id: "startingArea",
      interaction: { type: "startingNode", payload: {} },
    });

    const currentNode = gameManager.levelData.nodes.find(
      (n) => n.id === gameManager.levelData.rootNodeId
    );
    if (!currentNode) return;

    const graphics = this.add.graphics();

    const ellipse = new Phaser.Geom.Ellipse(
      currentNode.x + 5,
      currentNode.y + 5,
      32,
      32
    );
    Phaser.Geom.Ellipse.Circumference(ellipse);

    graphics.lineStyle(3, 0xff0000);
    graphics.strokeEllipseShape(ellipse);

    gameManager.eventPublisher.subscribe(
      "combatEntered",
      this.combatEnteredHandler
    );
  }

  private drawNode(nodeData: LevelNode) {
    const nodeType = nodeData.interaction.type;
    // 'enemy' 'healing' 'startingNode'
    // const img =
    this.add
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
        gameManager.selectNextNode(nodeData.id);
      });

    // this.add
    //   .text(
    //     nodeData.x,
    //     nodeData.y,
    //     nodeType === "enemy" ? "E" : nodeType === "healing" ? "H" : "S"
    //   )
    //   .setInteractive()
    //   .on("pointerdown", () => {
    //     gameManager.selectNextNode(nodeData.id);
    //   });
  }
}

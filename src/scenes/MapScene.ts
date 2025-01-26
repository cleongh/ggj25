import Phaser from "phaser";
import { LevelNode } from "../core/LevelData";
import { gameManager } from "../core/general/GameManager";
import { GameEvent } from "../core/general/GameEvents";

import HealthBar from "../gameObjects/HealthBar.js";

export default class MapScene extends Phaser.Scene {
  private combatEnteredHandler: (
    event: Extract<GameEvent, { type: "combatEntered" }>
  ) => void;
  sfx_click:
    | Phaser.Sound.NoAudioSound
    | Phaser.Sound.HTML5AudioSound
    | Phaser.Sound.WebAudioSound;
  private playerHealthBar: HealthBar;
  private idToMapNodeDic: Map<string, Phaser.GameObjects.Image>;

  constructor() {
    super("map");
    this.combatEnteredHandler = (enemyData) => {
      gameManager.eventPublisher.unsubscribe(
        "combatEntered",
        this.combatEnteredHandler
      );
      this.scene.start("card-combat", enemyData);
    };
    this.idToMapNodeDic = new Map();
  }

  create() {
    this.idToMapNodeDic.clear();

    this.add.image(0, 0, "bg").setOrigin(0, 0);
    this.paintNodes();
    
    this.sfx_click = this.sound.add("sfx_click", {volume: 3.0});

    gameManager.eventPublisher.subscribe("healingAreaEntered", (evt) => {
      const currentNodeId = gameManager.getCurrentNodeId();
      if (!currentNodeId) return;
      const currentNode = gameManager.levelData.nodes.find(
        (n) => n.id === currentNodeId
      );
      if (!currentNode) return;
      const currentMapNode = this.idToMapNodeDic.get(currentNodeId);
      if (!currentMapNode) return;
      this.toggleNodeAnimation(currentMapNode, false);

      currentNode.nextNodes.forEach((nn) => {
        const nnMapNode = this.idToMapNodeDic.get(nn);
        if (!nnMapNode) return;
        this.toggleNodeAnimation(nnMapNode, true);
      });

      this.playerHealthBar.dealDamage(-evt.payload.healedAmount)
    });
    gameManager.eventPublisher.subscribe(
      "combatEntered",
      this.combatEnteredHandler
    );

    this.paintPlayer(
      gameManager.getCurrentPlayerHealth(),
      gameManager.getPlayerMaxHealth()
    );
  }

  private paintNodes() {
    const currentNode = gameManager.levelData.nodes.find(
      (n) => n.id === gameManager.getCurrentNodeId()
    );

    gameManager.levelData.nodes.forEach((levelNode) => {
      const node = this.drawNode(levelNode);
      this.idToMapNodeDic.set(levelNode.id, node);
      if (
        (!currentNode && levelNode.id === gameManager.levelData.rootNodeId) ||
        (currentNode && currentNode.nextNodes.includes(levelNode.id))
      ) {
        this.toggleNodeAnimation(node, true);
      } else {
        this.toggleNodeAnimation(node, false);
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
      });
    });
  }

  private toggleNodeAnimation(
    node: Phaser.GameObjects.Image,
    enabled: boolean
  ) {
    if (enabled) {
      node.setInteractive({ useHandCursor: true });
      this.tweens.add({
        targets: node,
        scale: 1.2,
        duration: 800,
        yoyo: true,
        repeat: -1,
        ease: "Sine.easeInOut",
      });
    } else {
      node.removeInteractive();
      this.tweens.getTweensOf(node).forEach((tw) => tw.destroy());
    }
  }

  private paintPlayer(playerHealth: number, playerMaxHealth: number) {
    console.log("painting player and its health");
    this.playerHealthBar = new HealthBar(
      this,
      20,
      560,
      128,
      16,
      playerMaxHealth,
      playerHealth
    );
    this.add
      .sprite(20 + 128 / 2, 560 - 128 / 2, "mrbuble-animations")
      .play("idle_mrbuble-animations");
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
        this.sfx_click.play();
        gameManager.selectNextNode(nodeData.id);
      });
  }
}

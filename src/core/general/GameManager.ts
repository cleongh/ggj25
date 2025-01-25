import { playerDefinitions } from "../../data/cardDefinitions";
import { levelDefinitions } from "../../data/levelDefinitions";
import { CombatManager } from "../combat/CombatManager";
import { LevelData } from "../LevelData";
import { PlayerData } from "../PlayerData";
import { GameEventPublisher } from "./GameEvents";
import { PlayerStatus } from "./PlayerStatus";

export enum GamePhase {
  NODE_SELECT,
  GAME_OVER,
  GAME_COMPLETED,
  BATTLE_STAGE,
}
export class GameManager {
  private playerStatus: PlayerStatus;
  private currentNodeId: string | undefined;
  private phase: GamePhase;
  public readonly levelData: LevelData;
  public readonly eventPublisher: GameEventPublisher;
  private combatManager: CombatManager | undefined;

  constructor(levelData: LevelData, playerData: PlayerData) {
    this.playerStatus = {
      health: playerData.maxHealth,
      maxHealth: playerData.maxHealth,
      deck: playerData.deck.slice(),
    };
    this.levelData = levelData;
    this.phase = GamePhase.NODE_SELECT;
    this.currentNodeId = undefined;
    this.eventPublisher = new GameEventPublisher();
  }

  public getCurrentNodeId() {
    return this.currentNodeId;
  }

  public selectNextNode(nodeId: string) {
    if (this.phase !== GamePhase.NODE_SELECT) return;
    if (!this.currentNodeId) {
      // root node is the only choice
      if (nodeId !== this.levelData.rootNodeId) return;
    } else {
      const currentNode = this.levelData.nodes.find((n) => n.id === nodeId);
      if (!currentNode || !currentNode.nextNodes.includes(nodeId)) return;
    }
    this.currentNodeId = nodeId;
    this.eventPublisher.emit({ type: "nodeSelected", payload: { nodeId } });
    this.invokeCurrentNode();
  }

  public invokeCurrentNode() {
    const node = this.levelData.nodes.find((n) => n.id === this.currentNodeId);
    if (!node) return;

    switch (node.interaction.type) {
      case "enemy": {
        this.combatManager = new CombatManager(
          node.interaction.payload,
          this.playerStatus
        );
        this.phase = GamePhase.BATTLE_STAGE;
        this.combatManager.startCombat();
        this.eventPublisher.emit({
          type: "combatEntered",
          payload: { enemyData: node.interaction.payload },
        });
        break;
      }
      case "healing": {
        this.eventPublisher.emit({
          type: "healingAreaEntered",
          payload: { healedAmount: node.interaction.payload.amountHealed },
        });
      }
      default: {
        break;
      }
    }
  }
}

export const gameManager = new GameManager(levelDefinitions["level01"], {
  name: "Mr Bubble",
  maxHealth: 100,
  deck: playerDefinitions,
});

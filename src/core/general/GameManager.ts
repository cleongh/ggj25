import {
  getRandomRewardChoice,
  playerDefinitions,
} from "../../data/cardDefinitions";
import { levelDefinitions } from "../../data/levelDefinitions";
import { CardData } from "../CardData";
import { CombatManager } from "../combat/CombatManager";
import { LevelData } from "../LevelData";
import { PlayerData } from "../PlayerData";
import { GameEventPublisher } from "./GameEvents";
import { PlayerStatus } from "./PlayerStatus";

export enum GamePhase {
  NODE_SELECT,
  CHOOSE_NEW_CARD,
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
  private rewardCards: CardData[] | undefined;

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
    this.rewardCards = undefined;
  }

  public getCurrentNodeId() {
    return this.currentNodeId;
  }

  public getCurrentRewardCards() {
    return this.rewardCards;
  }

  public getCombatManager() {
    return this.combatManager;
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

  public selectRewardCard(cardData: CardData) {
    if (
      this.phase !== GamePhase.CHOOSE_NEW_CARD ||
      !this.rewardCards ||
      !this.rewardCards.includes(cardData)
    )
      return;

    this.playerStatus.deck.push(cardData);
    this.phase = GamePhase.NODE_SELECT;
    this.eventPublisher.emit({ type: "mapStageEntered", payload: {} });
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

        // enter card reward phase when defeating an enemy
        this.combatManager.eventPublisher.subscribe("enemyDefeated", () => {
          this.phase = GamePhase.CHOOSE_NEW_CARD;
          this.rewardCards = getRandomRewardChoice(3);
          this.eventPublisher.emit({
            type: "cardRewardEntered",
            payload: { cards: this.rewardCards },
          });
        });

        // end game in failure when being defeated in combat
        this.combatManager.eventPublisher.subscribe("playerDefeated", () => {
          this.phase = GamePhase.GAME_OVER;
          this.eventPublisher.emit({
            type: "gameFinished",
            payload: { victory: false },
          });
        });

        // enter combat stage
        this.phase = GamePhase.BATTLE_STAGE;
        this.eventPublisher.emit({
          type: "combatEntered",
          payload: { enemyData: node.interaction.payload },
        });
        break;
      }
      case "healing": {
        // heal player
        this.playerStatus.health = Math.min(
          this.playerStatus.maxHealth,
          this.playerStatus.health + node.interaction.payload.amountHealed
        );
        this.eventPublisher.emit({
          type: "healingAreaEntered",
          payload: { healedAmount: node.interaction.payload.amountHealed },
        });
        this.phase = GamePhase.NODE_SELECT;
        //this.eventPublisher.emit({ type: "mapStageEntered", payload: {} });
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

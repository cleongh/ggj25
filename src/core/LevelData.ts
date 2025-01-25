import { EnemyData } from "./EnemyData";

export interface LevelData {
  rootNodeId: string;
  /** list of nodes included in the level */
  nodes: LevelNode[];
}

export type NodeInteraction =
  | { type: "enemy"; payload: EnemyData }
  | { type: "healing"; payload: { amountHealed: number } }
  | { type: "startingNode"; payload: {} };
// TODO: add any other node interaction that might be needed (healing?)

export interface LevelNode {
  /**
   * ids of the nodes accesible to the player after completing this one.
   */
  nextNodes: string[];
  interaction: NodeInteraction;
  x: number;
  y: number;
  /**
   * Unique ID of this node in the level.
   */
  id: string;
}

import { LevelData } from "../core/LevelData";
import { enemyDefinitions } from "./enemyDefinitions";

export const levelDefinitions: { [key: string]: LevelData } = {
  level01: {
    rootNodeId: "00",
    nodes: [
      {
        id: "00",
        x: 0,
        y: 0,
        nextNodes: [],
        interaction: {
          type: "enemy",
          payload: enemyDefinitions["phdStudent"],
        },
      },
    ],
  },
};

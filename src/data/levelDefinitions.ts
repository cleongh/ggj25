import { LevelData } from "../core/LevelData";
import { enemyDefinitions } from "./enemyDefinitions";

export const levelDefinitions: { [key: string]: LevelData } = {
  level01: {
    rootNodeId: "00",
    nodes: [
      {
        id: "00",
        x: 100,
        y: 260,
        nextNodes: ["01", "02"],
        interaction: {
          type: "enemy",
          payload: enemyDefinitions["phdStudent"],
        },
      },
      {
        id: "01",
        x: 250,
        y: 180,
        nextNodes: ["03", "04"],
        interaction: {
          type: "enemy",
          payload: enemyDefinitions["phdStudent"],
        },
      },
      {
        id: "02",
        x: 250,
        y: 360,
        nextNodes: [],
        interaction: {
          type: "healing",
          payload: { amountHealed: 5 },
        },
      },
      {
        id: "03",
        x: 400,
        y: 100,
        nextNodes: [],
        interaction: {
          type: "enemy",
          payload: enemyDefinitions["phdStudent"],
        },
      },
      {
        id: "04",
        x: 400,
        y: 400,
        nextNodes: [],
        interaction: {
          type: "enemy",
          payload: enemyDefinitions["phdStudent"],
        },
      },
    ],
  },
};

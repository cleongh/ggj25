import { LevelData } from "../core/LevelData";
import { enemyDefinitions } from "./enemyDefinitions";

export const levelDefinitions: { [key: string]: LevelData } = {
  level01: {
    rootNodeId: "00",
    nodes: [
      {
        id: "00",
        x: 440,
        y: 539,
        nextNodes: ["01", "02"],
        interaction: {
          type: "enemy",
          payload: enemyDefinitions.guille,
        },
      },
      {
        id: "01",
        x: 302,
        y: 418,
        nextNodes: ["h1"],
        interaction: {
          type: "enemy",
          payload: enemyDefinitions.ishmael,
        },
      },
      {
        id: "02",
        x: 589,
        y: 464,
        nextNodes: ["04"],
        interaction: {
          type: "enemy",
          payload: enemyDefinitions.maria,
        },
      },
      {
        id: "03",
        x: 236,
        y: 247,
        nextNodes: ["05"],
        interaction: {
          type: "enemy",
          payload: enemyDefinitions.cleon,
        },
      },
      {
        id: "04",
        x: 668,
        y: 341,
        nextNodes: ["h2"],
        interaction: {
          type: "enemy",
          payload: enemyDefinitions.pablo,
        },
      },
      {
        id: "05",
        x: 349,
        y: 173,
        nextNodes: ["06"],
        interaction: {
          type: "enemy",
          payload: enemyDefinitions.tony,
        },
      },
      {
        id: "06",
        x: 328,
        y: 66,
        nextNodes: [],
        interaction: {
          type: "enemy",
          payload: enemyDefinitions.ana,
        },
      },
      {
        id: "h1",
        x: 79,
        y: 286,
        nextNodes: ["03"],
        interaction: {
          type: "healing",
          payload: { amountHealed: 10 },
        },
      },
      {
        id: "h2",
        x: 496,
        y: 254,
        nextNodes: ["05"],
        interaction: {
          type: "healing",
          payload: { amountHealed: 10 },
        },
      }
    ],
  },
};

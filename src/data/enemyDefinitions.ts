import { TokenType } from "../core/CardData";
import { EnemyData } from "../core/EnemyData";

export const enemyDefinitions: { [key: string]: EnemyData } = {
  phdStudent: {
    name: "Assistant Professor",
    health: 32,
    deck: [
      {
        text: "I'm not THAT tiny.",
        damage: 5,
        tokens: [TokenType.PHYSICAL, TokenType.PHYSICAL],
      },
      {
        text: "I don't give a f**k about your failed experiment.",
        damage: 3,
        tokens: [TokenType.WORK, TokenType.WORK],
      },
      {
        text: "You are gonna graduate with your grandchildren.",
        damage: 2,
        tokens: [TokenType.RELATIONSHIPS],
      },
      {
        text: "Tiny or not, at least I have a PhD. What do you have? Not even a friend.",
        damage: 8,
        tokens: [TokenType.PHYSICAL, TokenType.RELATIONSHIPS, TokenType.WORK],
      },
    ],
  },
};

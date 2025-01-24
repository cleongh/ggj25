import { CardData, TokenType } from "../core/CardData";

export const playerDefinitions: CardData[] = [
  {
    text: "You will never finish your thesis, loser.",
    damage: 2,
    tokens: [TokenType.WORK, TokenType.WORK],
  },
  {
    text: "You are a terrible friend.",
    damage: 2,
    tokens: [TokenType.RELATIONSHIPS, TokenType.RELATIONSHIPS],
  },
  {
    text: "You are so out of shape.",
    damage: 1,
    tokens: [TokenType.PHYSICAL],
  },
];



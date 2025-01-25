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
  {
    text: "You are a loser.",
    damage: 3,
    tokens: [TokenType.WORK, TokenType.RELATIONSHIPS],
  },
  {
    text: "Nobody likes you.",
    damage: 2,
    tokens: [TokenType.RELATIONSHIPS, TokenType.RELATIONSHIPS],
  },
  {
    text: "Do you really want another donut?",
    damage: 1,
    tokens: [TokenType.PHYSICAL],
  },
  {
    text: "No work... no friends... no girlfriend...",
    damage: 3,
    tokens: [TokenType.WORK, TokenType.RELATIONSHIPS],
  },
];

export interface CardData {
  text: string;
  damage: number;
  tokens: TokenType[];
}

export enum TokenType {
  RELATIONSHIPS = "RELATIONSHIPS",
  WORK = "WORK",
  PHYSICAL = "PHYSICAL",
}

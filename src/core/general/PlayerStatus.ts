import { CardData } from "../CardData";

export interface PlayerStatus {
  health: number;
  maxHealth: number;
  deck: CardData[];
}

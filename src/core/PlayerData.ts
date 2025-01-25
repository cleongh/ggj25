import { CardData } from "./CardData";

export interface PlayerData {
  name: string;
  health: number;
  maxHealth: number;
  deck: CardData[];
}
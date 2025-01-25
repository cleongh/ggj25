import { CardData } from "./CardData";

export interface PlayerData {
  name: string;
  maxHealth: number;
  deck: CardData[];
}

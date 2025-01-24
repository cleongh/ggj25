import { CardData } from "./CardData";

export interface EnemyData {
  name: string;
  health: number;
  deck: CardData[];
}

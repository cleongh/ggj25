import { CardData } from "../CardData";
import { EnemyData } from "../EnemyData";

export type GameEvent =
  | { type: "nodeSelected"; payload: { nodeId: string } }
  | { type: "combatEntered"; payload: { enemyData: EnemyData } }
  | { type: "healingAreaEntered"; payload: { healedAmount: number } }
  | { type: "cardRewardEntered"; payload: { cards: CardData[] } }
  | { type: "gameFinished"; payload: { victory: boolean } }
  | { type: "mapStageEntered"; payload: {} };

export type TypedEventHandler<T extends GameEvent["type"]> = (
  event: Extract<GameEvent, { type: T }>
) => void;

export class GameEventPublisher {
  private handlers: {
    [T in GameEvent["type"]]?: TypedEventHandler<T>[];
  } = {};

  subscribe<T extends GameEvent["type"]>(
    eventType: T,
    handler: TypedEventHandler<T>
  ): void {
    if (!this.handlers[eventType]) {
      this.handlers[eventType] = [];
    }
    this.handlers[eventType]!.push(handler);
  }

  unsubscribe<T extends GameEvent["type"]>(
    eventType: T,
    handler: TypedEventHandler<T>
  ): void {
    const handlers = this.handlers[eventType];
    if (!handlers) {
      return;
    }

    //const filtered = handlers.filter((h) => h !== handler);
    // SOBERANA ÑAPA. Ahora mismo se borran todos los handlers, pero no encuentra el bueno si no
    this.handlers[eventType] = [];
  }

  emit<T extends GameEvent["type"]>(
    event: Extract<GameEvent, { type: T }>
  ): void {
    const handlers = this.handlers[event.type];
    if (handlers) {
      handlers.forEach((handler) => handler(event));
    }
  }
}

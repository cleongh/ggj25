import { EnemyData } from "../EnemyData";

export type GameEvent =
  | { type: "nodeSelected"; payload: { nodeId: string } }
  | { type: "combatEntered"; payload: { enemyData: EnemyData } }
  | { type: "healingAreaEntered"; payload: { healedAmount: number } };

type TypedEventHandler<T extends GameEvent["type"]> = (
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

  emit<T extends GameEvent["type"]>(
    event: Extract<GameEvent, { type: T }>
  ): void {
    const handlers = this.handlers[event.type];
    if (handlers) {
      handlers.forEach((handler) => handler(event));
    }
  }
}

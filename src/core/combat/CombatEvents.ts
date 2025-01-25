import { CardData, TokenType } from "../CardData";

export type CombatEvent =
  | { type: "playerDrawsCard"; payload: { card: CardData } }
  | { type: "playerDiscardsCard"; payload: { card: CardData } }
  | { type: "enemyDrawsCard"; payload: { card: CardData } }
  | { type: "playerPlaysCard"; payload: { card: CardData } }
  | { type: "enemyPlaysCard"; payload: { card: CardData } }
  | { type: "playerTakesDamage"; payload: { damage: number } }
  | { type: "enemyTakesDamage"; payload: { damage: number } }
  | { type: "playerDefeated"; payload: {} }
  | { type: "enemyDefeated"; payload: {} }
  | {
      type: "tokenAssigned";
      payload: { card: CardData; tokenType: TokenType };
    };

type TypedEventHandler<T extends CombatEvent["type"]> = (
  event: Extract<CombatEvent, { type: T }>
) => void;

export class CombatEventPublisher {
  private handlers: {
    [T in CombatEvent["type"]]?: TypedEventHandler<T>[];
  } = {};

  subscribe<T extends CombatEvent["type"]>(
    eventType: T,
    handler: TypedEventHandler<T>
  ): void {
    if (!this.handlers[eventType]) {
      this.handlers[eventType] = [];
    }
    this.handlers[eventType]!.push(handler);
  }

  unsubscribe<T extends CombatEvent["type"]>(
    eventType: T,
    handler: TypedEventHandler<T>
  ): void {
    const handlers = this.handlers[eventType];
    if (!handlers) {
      return;
    }

    const filtered = handlers.filter((h) => h !== handler);
    // SOBERANA ÑAPA. Pero no caigo en el tipado.
    this.handlers[eventType] = filtered as any;
  }

  emit<T extends CombatEvent["type"]>(
    event: Extract<CombatEvent, { type: T }>
  ): void {
    const handlers = this.handlers[event.type];
    if (handlers) {
      handlers.forEach((handler) => handler(event));
    }
  }
}

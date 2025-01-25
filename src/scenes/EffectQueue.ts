export type Effect = (onEffectCompleted: () => void) => void;

export class EffectQueue {
  private queue: (() => Promise<void>)[] = [];
  private isProcessing: boolean = false;

  public enqueue(effect: () => Promise<void>): void {
    this.queue.push(effect);
    if (!this.isProcessing) {
      this.processNext();
    }
  }

  private async processNext(): Promise<void> {
    if (this.queue.length === 0) {
      this.isProcessing = false;
      return;
    }

    this.isProcessing = true;
    const effect = this.queue.shift();
    if (effect) {
      await effect();
      this.processNext();
    }
  }
}

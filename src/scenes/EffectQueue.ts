export type Effect = (onEffectCompleted: (value?: unknown) => void) => void;

export class EffectQueue {
  private queue: Effect[] = [];
  private isProcessing: boolean = false;

  public enqueue(effect: Effect): void {
    this.queue.push(effect);
    if (!this.isProcessing) {
      this.processNext();
    }
  } // enqueue

  private async processNext(): Promise<void> {
    if (this.queue.length === 0) {
      this.isProcessing = false;
      return;
    }

    this.isProcessing = true;
    const effect = this.queue.shift();
    if (effect) {
      await new Promise((resolve, _) => {
        effect(resolve);
      });
      this.processNext();
    }
  }

  public clearQueue() {
    this.isProcessing = false;
    this.queue = [];
  }
}

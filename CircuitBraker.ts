export class CircuitBraker {
  private failures = 0;
  private treshold = 5;
  private state = "CLOSED";

  async execute(fn: () => Promise<any>) {
    if (this.state === "OPEN") {
      throw new Error("Circuit braker is OPEN");
    }

    try {
      const res = await fn();
      this.failures = 0;
      return res;
    } catch (ex) {
      this.failures++;
      if (this.failures >= this.treshold) {
        this.state = "OPEN";
      }
      throw ex;
    }
  }
}

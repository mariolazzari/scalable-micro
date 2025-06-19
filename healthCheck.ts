export class HealthCheck {
  private failures = 0;
  private threshold = 5;
  private state: "CLOSED" | "OPEN" = "CLOSED";

  async execute(fn: () => Promise<any>) {
    if (this.state === "OPEN") {
      throw new Error("Health check is OPEN");
    }

    try {
      const res = await fn();
      this.failures = 0;
      return res;
    } catch (ex) {
      this.failures++;
      if (this.failures >= this.threshold) {
        this.state = "OPEN";
      }
      throw ex;
    }
  }

  reset() {
    this.failures = 0;
    this.state = "CLOSED";
  }
}

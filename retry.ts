export function retryWithBackoff(
  fn: () => Promise<any>,
  maxRetries: number = 3
) {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return fn();
    } catch (error) {
      if (attempt === maxRetries - 1) {
        throw error; // Rethrow the last error after max retries
      }
      const backoffTime = Math.pow(2, attempt) * 100; // Exponential backoff
      console.log(`Retrying in ${backoffTime}ms...`);
      return new Promise(resolve => setTimeout(resolve, backoffTime));
    }
  }
  throw new Error("Max retries reached without success");
}

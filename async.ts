export async function processBatch(batch: any[]): Promise<any[]> {
  const results: any[] = await Promise.all(batch);

  return results;
}

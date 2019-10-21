/** provides a friendly way to pause execution when using async/await symantics */
export async function wait(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

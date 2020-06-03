/** provides a friendly way to pause execution when using async/await symantics */
export async function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

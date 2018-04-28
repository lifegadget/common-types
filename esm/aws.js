export function isLambdaProxyRequest(message) {
    return message.headers !== undefined;
}
export function getBodyFromPossibleLambdaProxyRequest(input) {
    return isLambdaProxyRequest(input) ? JSON.parse(input.body) : input;
}

export function serverlessConfigHasApiGatewayTracing(config) {
    return (config?.tracing && config?.tracing === true) ||
        (typeof config.tracing === "object" && config.tracing.apiGateway)
        ? true
        : false;
}
export function serverlessConfigHasLambdaTracing(config) {
    return (config?.tracing && config?.tracing === true) || (typeof config.tracing === "object" && config.tracing.lambda)
        ? true
        : false;
}

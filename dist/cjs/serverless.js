"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverlessConfigHasLambdaTracing = exports.serverlessConfigHasApiGatewayTracing = void 0;
function serverlessConfigHasApiGatewayTracing(config) {
    return (config.tracing && config.tracing === true) ||
        (typeof config.tracing === "object" && config.tracing.apiGateway)
        ? true
        : false;
}
exports.serverlessConfigHasApiGatewayTracing = serverlessConfigHasApiGatewayTracing;
function serverlessConfigHasLambdaTracing(config) {
    return (config.tracing && config.tracing === true) || (typeof config.tracing === "object" && config.tracing.lambda)
        ? true
        : false;
}
exports.serverlessConfigHasLambdaTracing = serverlessConfigHasLambdaTracing;

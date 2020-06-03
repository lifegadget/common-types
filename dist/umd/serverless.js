(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.serverlessConfigHasLambdaTracing = exports.serverlessConfigHasApiGatewayTracing = void 0;
    function serverlessConfigHasApiGatewayTracing(config) {
        return (config?.tracing && config?.tracing === true) ||
            (typeof config.tracing === "object" && config.tracing.apiGateway)
            ? true
            : false;
    }
    exports.serverlessConfigHasApiGatewayTracing = serverlessConfigHasApiGatewayTracing;
    function serverlessConfigHasLambdaTracing(config) {
        return (config?.tracing && config?.tracing === true) || (typeof config.tracing === "object" && config.tracing.lambda)
            ? true
            : false;
    }
    exports.serverlessConfigHasLambdaTracing = serverlessConfigHasLambdaTracing;
});

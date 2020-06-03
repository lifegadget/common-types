(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./stackTrace"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ApiGatewayError = exports.apiGatewayError = void 0;
    const stackTrace_1 = require("./stackTrace");
    function apiGatewayError(code, message, priorError) {
        const messagePrefix = `[${code}] `;
        const e = new ApiGatewayError(priorError ? priorError.message : "");
        e.errorMessage = !priorError
            ? messagePrefix + message
            : messagePrefix + priorError.message + message;
        e.name = priorError ? priorError.name : "ApiGatewayError";
        e.errorCode = code;
        e.stack = priorError
            ? priorError.stack ||
                stackTrace_1.default(e.stack)
                    .slice(2)
                    .join("\n")
            : stackTrace_1.default(e.stack)
                .slice(2)
                .join("\n");
        return e;
    }
    exports.apiGatewayError = apiGatewayError;
    class ApiGatewayError extends Error {
    }
    exports.ApiGatewayError = ApiGatewayError;
});

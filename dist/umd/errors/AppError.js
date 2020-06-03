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
    exports.AppError = exports.createError = void 0;
    const stackTrace_1 = require("./stackTrace");
    function createError(fullName, message, priorError) {
        const messagePrefix = `[${fullName}] `;
        const e = new AppError(!priorError
            ? messagePrefix + message
            : messagePrefix + priorError.message + message);
        e.name = priorError ? priorError.code || priorError.name : fullName;
        const parts = fullName.split("/");
        e.code = [...parts].pop();
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
    exports.createError = createError;
    class AppError extends Error {
    }
    exports.AppError = AppError;
});

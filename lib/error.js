"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createError(code, messageOrPrior) {
    const messagePrefix = `[${code}]: `;
    const e = new AppError(typeof messageOrPrior === "string"
        ? messagePrefix + messageOrPrior
        : messagePrefix + messageOrPrior.message);
    e.name = typeof messageOrPrior === "string" ? "AppError" : messageOrPrior.name;
    e.code = code;
    e.stack = typeof messageOrPrior === "string" ? e.stack : messageOrPrior.stack || e.stack;
    return e;
}
exports.createError = createError;
class AppError extends Error {
}
exports.AppError = AppError;
//# sourceMappingURL=error.js.map
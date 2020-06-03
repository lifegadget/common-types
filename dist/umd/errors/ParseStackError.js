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
    exports.ParseStackError = void 0;
    class ParseStackError extends Error {
        constructor(code, message, originalString, structuredString) {
            super();
            this.originalString = originalString;
            this.structuredString = structuredString;
            this.message = `[parseStack/${code}] ` + message;
            this.code = code;
            this.name = `parseStack/${code}`;
        }
    }
    exports.ParseStackError = ParseStackError;
});

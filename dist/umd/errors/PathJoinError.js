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
    exports.PathJoinError = void 0;
    class PathJoinError extends Error {
        constructor(code, message) {
            super();
            this.message = `[pathJoin/${code}] ` + message;
            this.code = code;
            this.name = `pathJoin/${code}`;
        }
    }
    exports.PathJoinError = PathJoinError;
});

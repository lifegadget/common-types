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
    exports.wait = void 0;
    /** provides a friendly way to pause execution when using async/await symantics */
    async function wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    exports.wait = wait;
});

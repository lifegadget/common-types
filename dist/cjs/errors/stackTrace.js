"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function stackTrace(trace) {
    return trace ? trace.split("\n") : [];
}
exports.default = stackTrace;

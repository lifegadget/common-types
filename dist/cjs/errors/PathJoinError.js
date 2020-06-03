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

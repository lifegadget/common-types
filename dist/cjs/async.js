"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wait = void 0;
/** provides a friendly way to pause execution when using async/await symantics */
async function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
exports.wait = wait;

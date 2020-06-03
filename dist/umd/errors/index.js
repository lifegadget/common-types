// #autoindex:named
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./ApiGatewayError", "./AppError", "./ParseStackError", "./PathJoinError", "./stackTrace"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    //#region autoindexed files
    // indexed at: 6th Jun, 2020, 08:21 AM ( GMT-7 )
    __exportStar(require("./ApiGatewayError"), exports);
    __exportStar(require("./AppError"), exports);
    __exportStar(require("./ParseStackError"), exports);
    __exportStar(require("./PathJoinError"), exports);
    __exportStar(require("./stackTrace"), exports);
});
//#endregion

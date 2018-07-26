var AWSGatewayStatusCode;
(function (AWSGatewayStatusCode) {
    AWSGatewayStatusCode[AWSGatewayStatusCode["Success"] = 200] = "Success";
    AWSGatewayStatusCode[AWSGatewayStatusCode["BadRequest"] = 400] = "BadRequest";
    AWSGatewayStatusCode[AWSGatewayStatusCode["Unauthorized"] = 401] = "Unauthorized";
    AWSGatewayStatusCode[AWSGatewayStatusCode["Forbidden"] = 403] = "Forbidden";
    AWSGatewayStatusCode[AWSGatewayStatusCode["NotFound"] = 404] = "NotFound";
    AWSGatewayStatusCode[AWSGatewayStatusCode["UnprocessableEntity"] = 422] = "UnprocessableEntity";
    AWSGatewayStatusCode[AWSGatewayStatusCode["InternalServerError"] = 500] = "InternalServerError";
    AWSGatewayStatusCode[AWSGatewayStatusCode["BadGateway"] = 502] = "BadGateway";
    AWSGatewayStatusCode[AWSGatewayStatusCode["GatewayTimeout"] = 504] = "GatewayTimeout";
})(AWSGatewayStatusCode || (AWSGatewayStatusCode = {}));
function isLambdaProxyRequest(message) {
    return message.headers ? true : false;
}
function getBodyFromPossibleLambdaProxyRequest(input) {
    return isLambdaProxyRequest(input) ? JSON.parse(input.body) : input;
}

function createError(code, message, priorError) {
    const messagePrefix = `[${code}] `;
    const e = new AppError(!priorError ? messagePrefix + message : messagePrefix + priorError.message + message);
    e.name = priorError ? priorError.name : "AppError";
    e.code = code;
    e.stack = priorError ? priorError.stack || e.stack.slice(2) : e.stack.slice(2);
    return e;
}
class AppError extends Error {
}

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function wait(ms) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise(resolve => setTimeout(resolve, ms));
    });
}

var moreThanThreePeriods = /\.{3,}/g;
if (!Array.isArray) {
    Array.isArray = function (arg) {
        return Object.prototype.toString.call(arg) === "[object Array]";
    };
}
var errorStr = "tried to join something other than a string or array, it was ignored in pathJoin's result";
function pathJoin(...args) {
    return args
        .reduce(function (prev, val) {
        if (typeof prev === "undefined")
            return;
        return typeof val === "string" || typeof val === "number"
            ? joinStringsWithSlash(prev, "" + val)
            : Array.isArray(val)
                ? joinStringsWithSlash(prev, pathJoin.apply(null, val))
                : (console.error ? console.error(errorStr) : console.log(errorStr)) || "";
    }, "")
        .replace(moreThanThreePeriods, "..");
}
function joinStringsWithSlash(str1, str2) {
    const str1isEmpty = !str1.length;
    const str1EndsInSlash = str1[str1.length - 1] === "/";
    const str2StartsWithSlash = str2[0] === "/";
    var res = (str1EndsInSlash && str2StartsWithSlash && str1 + str2.slice(1)) ||
        (!str1EndsInSlash && !str2StartsWithSlash && !str1isEmpty && str1 + "/" + str2) ||
        str1 + str2;
    return res;
}
function dotNotation(input) {
    return input.replace(/\//g, ".");
}

export { AWSGatewayStatusCode, isLambdaProxyRequest, getBodyFromPossibleLambdaProxyRequest, createError, AppError, wait, pathJoin, dotNotation };
//# sourceMappingURL=common-types.es2015.js.map

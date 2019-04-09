var ApiGatewayStatusCode;
(function (ApiGatewayStatusCode) {
    ApiGatewayStatusCode[ApiGatewayStatusCode["Success"] = 200] = "Success";
    ApiGatewayStatusCode[ApiGatewayStatusCode["BadRequest"] = 400] = "BadRequest";
    ApiGatewayStatusCode[ApiGatewayStatusCode["Unauthorized"] = 401] = "Unauthorized";
    ApiGatewayStatusCode[ApiGatewayStatusCode["Forbidden"] = 403] = "Forbidden";
    ApiGatewayStatusCode[ApiGatewayStatusCode["NotFound"] = 404] = "NotFound";
    ApiGatewayStatusCode[ApiGatewayStatusCode["UnprocessableEntity"] = 422] = "UnprocessableEntity";
    ApiGatewayStatusCode[ApiGatewayStatusCode["InternalServerError"] = 500] = "InternalServerError";
    ApiGatewayStatusCode[ApiGatewayStatusCode["BadGateway"] = 502] = "BadGateway";
    ApiGatewayStatusCode[ApiGatewayStatusCode["GatewayTimeout"] = 504] = "GatewayTimeout";
})(ApiGatewayStatusCode || (ApiGatewayStatusCode = {}));
/**
 * Provides a logical test to see if the passed in event is a LambdaProxy request or just a
 * straight JS object response. This is useful when you have both an HTTP event and a Lambda-to-Lambda
 * or Step-Function-to-Lambda interaction.
 *
 * @param message the body of the request (which is either of type T or a LambdaProxy event)
 */
function isLambdaProxyRequest(message) {
    return typeof message === "object" &&
        message.headers &&
        message.body
        ? true
        : false;
}
/**
 * **getBodyFromPossibleLambdaProxyRequest**
 *
 * Returns the message body/payload regardless of whether Lambda was called by API Gateway's LambdaProxy
 * or from another Lambda function.
 *
 * @param input either a [Lambda Proxy Request](https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html)
 * or type `T` as defined by consumer
 * @return type of `T`
 */
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

/** provides a friendly way to pause execution when using async/await symantics */
async function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// THIS IS A mildly TYPED VERSION OF NPM "iso-path-join"
var moreThanThreePeriods = /\.{3,}/g;
// polyfill Array.isArray if necessary
if (!Array.isArray) {
    Array.isArray = function (arg) {
        return Object.prototype.toString.call(arg) === "[object Array]";
    };
}
/** An ISO-morphic path join that works everywhere */
function pathJoin(...args) {
    return args
        .reduce(function (prev, val) {
        if (typeof prev === "undefined")
            return;
        return typeof val === "string" || typeof val === "number"
            ? joinStringsWithSlash(prev, "" + val) // if string or number just keep as is
            : Array.isArray(val)
                ? joinStringsWithSlash(prev, pathJoin.apply(null, val)) // handle array with recursion
                : false;
    }, "")
        .replace(moreThanThreePeriods, ".."); // join the resulting array together
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
/** converts a slash delimited filepath to a dot notation path */
function dotNotation(input) {
    return input.replace(/\//g, ".");
}

export { ApiGatewayStatusCode, AppError, createError, dotNotation, getBodyFromPossibleLambdaProxyRequest, isLambdaProxyRequest, pathJoin, wait };
//# sourceMappingURL=common-types.es2015.js.map

import { isLambdaProxyRequest as isLambdaProxyRequest$1 } from 'common-types';

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
function parsed(input) {
    try {
        const output = JSON.parse(input.body.replace(/[\n\t]/g, ""));
        return output;
    }
    catch (e) {
        const err = apiGatewayError(400, `The body of the POST message is meant to contain a valid JSON stringified object but there were problems parsing it: ${e.message}`);
        throw err;
    }
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
    return isLambdaProxyRequest(input) ? parsed(input) : input;
}

function stackTrace(trace) {
    return trace ? trace.split("\n") : [];
}

function createError(code, message, priorError) {
    const messagePrefix = `[${code}] `;
    const e = new AppError(!priorError ? messagePrefix + message : messagePrefix + priorError.message + message);
    e.name = priorError ? priorError.name : "AppError";
    e.code = code;
    e.stack = priorError
        ? priorError.stack ||
            stackTrace(e.stack)
                .slice(2)
                .join("\n")
        : stackTrace(e.stack)
            .slice(2)
            .join("\n");
    return e;
}
class AppError extends Error {
}

function apiGatewayError(code, message, priorError) {
    const messagePrefix = `[${code}] `;
    const e = new ApiGatewayError(priorError ? priorError.message : "");
    e.errorMessage = !priorError
        ? messagePrefix + message
        : messagePrefix + priorError.message + message;
    e.name = priorError ? priorError.name : "ApiGatewayError";
    e.errorCode = code;
    e.stack = priorError
        ? priorError.stack ||
            stackTrace(e.stack)
                .slice(2)
                .join("\n")
        : stackTrace(e.stack)
            .slice(2)
            .join("\n");
    return e;
}
class ApiGatewayError extends Error {
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

/**
 * **LambdaEventParser**
 *
 * Ensures that the _typed_ `request` is separated from a possible Proxy Integration
 * Request that would have originated from API Gateway; also returns the `apiGateway`
 * payload with the "body" removed (as it would be redundant to the request).
 *
 * Typical usage is:
 *
```typescript
const { request, apiGateway } = LambdaEventParser.parse(event);
```
 *
 * this signature is intended to mimic the `LambdaSequence.from(event)` API but
 * without the parsing of a `sequence` property being extracted.
 *
 */
class LambdaEventParser {
    /**
     * **parse**
     *
     * A static method which returns an object with both `request` and `apiGateway`
     * properties. The `request` is typed to **T** and the `apiGateway` will be a
     * `IAWSLambdaProxyIntegrationRequest` object with the "body" removed _if_
     * the event came from **API Gateway** otherwise it will be undefined.
     */
    static parse(event) {
        const request = isLambdaProxyRequest$1(event) ? JSON.parse(event.body) : event;
        if (isLambdaProxyRequest$1(event)) {
            delete event.body;
        }
        else {
            event = undefined;
        }
        return {
            request,
            apiGateway: event
        };
    }
}

export { ApiGatewayError, ApiGatewayStatusCode, AppError, LambdaEventParser, apiGatewayError, createError, dotNotation, getBodyFromPossibleLambdaProxyRequest, isLambdaProxyRequest, pathJoin, wait };
//# sourceMappingURL=common-types.es2015.js.map

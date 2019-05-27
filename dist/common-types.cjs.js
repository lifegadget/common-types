'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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
})(exports.ApiGatewayStatusCode || (exports.ApiGatewayStatusCode = {}));
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

var moreThanThreePeriods = /\.{3,}/g;
// polyfill Array.isArray if necessary
if (!Array.isArray) {
    Array.isArray = function (arg) {
        return Object.prototype.toString.call(arg) === "[object Array]";
    };
}
function parseStack(stack, ignorePatterns = ["mocha/lib"], limit) {
    const structured = stack
        .replace(/Error.*?at/, "at")
        .replace(/at (\S*) \(([^\0]*?)\:([0-9]*?)\:([0-9]*)\)/g, '{ fn: "$1", line: $3, col: $4, file: "$2" },');
    let parsed;
    try {
        parsed = JSON.parse(structured).filter((i) => {
            let result = true;
            ignorePatterns.forEach(pattern => {
                if (i.fn.includes(pattern) || i.file.includes(pattern)) {
                    result = false;
                }
            });
            return result;
        });
        // .map((i: IStackFrame) => {
        //   const parts = i.file.split("/");
        //   const start = Math.max(parts.length, 0);
        //   i.file = parts.slice(start, parts.length - start).join("/");
        //   return i;
        // });
        if (limit) {
            parsed = parsed.slice(0, limit);
        }
    }
    catch (e) {
        console.log(e.message);
    }
    return parsed ? parsed : structured;
}
/**
 * An ISO-morphic path join that works everywhere;
 * all paths are separated by the `/` character and both
 * leading and trailing delimiters are stripped
 */
function pathJoin(...args) {
    if (!args.every(i => !["undefined"].includes(typeof i))) {
        let problems = [];
        args = args.filter((v, i) => {
            if (!v) {
                problems.push({ type: typeof v, position: i });
            }
            return v;
        });
        // const stack = parseStack(new Error().stack, ["mocha/lib", "Object.pathJoin"]);
        console.warn(`pathJoin(...args) was called with ${problems.length} undefined values. Undefined values will be ignored but may indicate a hidden problem. [ ${problems
            .map(i => `${i.type}@${i.position}`)
            .join(", ")} ]`);
    }
    if (!args.every(i => ["string", "number"].includes(typeof i))) {
        const e = new Error(`Attempt to use pathJoin failed because some of the path parts were of the wrong type. Path parts must be either a string or an number: ${args.map(i => typeof i)}`);
        e.code = "invalid-path-part";
        e.name = "pathJoin/invalid-path-part";
        throw e;
    }
    try {
        const reducer = function (agg, pathPart) {
            const parts = agg.split("/");
            parts.push(typeof pathPart === "number" ? String(pathPart) : pathPart);
            return parts.filter(i => i).join("/");
        };
        const result = args.reduce(reducer, "").replace(moreThanThreePeriods, ".."); // join the resulting array together
        return result.slice(-1) === "/" ? result.slice(0, result.length - 1) : result;
    }
    catch (e) {
        const err = createError("common-types/pathJoin", e.message, e);
        throw err;
    }
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
        const request = isLambdaProxyRequest(event) ? JSON.parse(event.body) : event;
        if (isLambdaProxyRequest(event)) {
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

function createBindDeploymentConfig(config, methodSettings) {
    const defaultMethodSettings = [
        {
            DataTraceEnabled: true,
            HttpMethod: "*",
            LoggingLevel: "INFO",
            ResourcePath: "/*",
            MetricsEnabled: true
        }
    ];
    const stageName = `${config.service}-${config.stage}`;
    const defaultConfig = {
        resources: {
            Resources: {
                PathMapping: {
                    Type: "AWS::ApiGateway::BasePathMapping",
                    DependsOn: "ApiGatewayStage",
                    Properties: {
                        DomainName: config.domainName ? config.domainName : undefined,
                        RestApiId: {
                            Ref: "ApiGatewayRestApi"
                        },
                        Stage: stageName
                    }
                },
                __deployment__: {
                    Properties: {
                        Description: "(default deployment description)"
                    }
                },
                ApiGatewayStage: {
                    Type: "AWS::ApiGateway::Stage",
                    Properties: {
                        DeploymentId: {
                            Ref: "__deployment__"
                        },
                        RestApiId: {
                            Ref: "ApiGatewayRestApi"
                        },
                        StageName: stageName,
                        MethodSettings: methodSettings || defaultMethodSettings
                    }
                }
            }
        }
    };
    return Object.assign({}, defaultConfig, config);
}

exports.ApiGatewayError = ApiGatewayError;
exports.AppError = AppError;
exports.LambdaEventParser = LambdaEventParser;
exports.apiGatewayError = apiGatewayError;
exports.createBindDeploymentConfig = createBindDeploymentConfig;
exports.createError = createError;
exports.dotNotation = dotNotation;
exports.getBodyFromPossibleLambdaProxyRequest = getBodyFromPossibleLambdaProxyRequest;
exports.isLambdaProxyRequest = isLambdaProxyRequest;
exports.parseStack = parseStack;
exports.pathJoin = pathJoin;
exports.wait = wait;
//# sourceMappingURL=common-types.cjs.js.map

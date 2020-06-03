"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBodyFromPossibleLambdaProxyRequest = exports.isLambdaProxyRequest = void 0;
/**
 * Provides a logical test to see if the passed in event is a LambdaProxy request or just a
 * straight JS object response. This is useful when you have both an HTTP event and a Lambda-to-Lambda
 * or Step-Function-to-Lambda interaction.
 *
 * @param message the body of the request (which is either of type T or a LambdaProxy event)
 */
function isLambdaProxyRequest(message) {
    return typeof message === "object" &&
        message.resource &&
        message.path &&
        message.httpMethod
        ? true
        : false;
}
exports.isLambdaProxyRequest = isLambdaProxyRequest;
function parsed(input) {
    try {
        const output = JSON.parse(input.body.replace(/[\n\t]/g, ""));
        return output;
    }
    catch (e) {
        return input.body;
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
exports.getBodyFromPossibleLambdaProxyRequest = getBodyFromPossibleLambdaProxyRequest;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
})(AWSGatewayStatusCode = exports.AWSGatewayStatusCode || (exports.AWSGatewayStatusCode = {}));
/**
 * Provides a logical test to see if the passed in event is a LambdaProxy request or just a
 * straight JS object response. This is useful when you have both an HTTP event and a Lambda-to-Lambda
 * or Step-Function-to-Lambda interaction.
 *
 * @param message the body of the request (which is either of type T or a LambdaProxy event)
 */
function isLambdaProxyRequest(message) {
    return message.headers ? true : false;
}
exports.isLambdaProxyRequest = isLambdaProxyRequest;
/**
 * Returns the message body regardless of whether Lambda was called by API Gateway's LambdaProxy
 * or from another Lambda function.
 *
 * @param input either the LambdaProxy object or type T
 */
function getBodyFromPossibleLambdaProxyRequest(input) {
    return isLambdaProxyRequest(input) ? JSON.parse(input.body) : input;
}
exports.getBodyFromPossibleLambdaProxyRequest = getBodyFromPossibleLambdaProxyRequest;
//# sourceMappingURL=aws.js.map
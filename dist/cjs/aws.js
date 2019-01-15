"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var APIGatewayStatusCode;
(function (APIGatewayStatusCode) {
    APIGatewayStatusCode[APIGatewayStatusCode["Success"] = 200] = "Success";
    APIGatewayStatusCode[APIGatewayStatusCode["BadRequest"] = 400] = "BadRequest";
    APIGatewayStatusCode[APIGatewayStatusCode["Unauthorized"] = 401] = "Unauthorized";
    APIGatewayStatusCode[APIGatewayStatusCode["Forbidden"] = 403] = "Forbidden";
    APIGatewayStatusCode[APIGatewayStatusCode["NotFound"] = 404] = "NotFound";
    APIGatewayStatusCode[APIGatewayStatusCode["UnprocessableEntity"] = 422] = "UnprocessableEntity";
    APIGatewayStatusCode[APIGatewayStatusCode["InternalServerError"] = 500] = "InternalServerError";
    APIGatewayStatusCode[APIGatewayStatusCode["BadGateway"] = 502] = "BadGateway";
    APIGatewayStatusCode[APIGatewayStatusCode["GatewayTimeout"] = 504] = "GatewayTimeout";
})(APIGatewayStatusCode = exports.APIGatewayStatusCode || (exports.APIGatewayStatusCode = {}));
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
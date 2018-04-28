export var AWSGatewayStatusCode;
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
export function isLambdaProxyRequest(message) {
    return message.headers !== undefined;
}
export function getBodyFromPossibleLambdaProxyRequest(input) {
    return isLambdaProxyRequest(input) ? JSON.parse(input.body) : input;
}

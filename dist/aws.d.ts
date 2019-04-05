import { IDictionary, BooleanAsString, epoch } from "./basics";
/**
 * **IAwsHandlerFunction**
 *
 * A type definition for any AWS Lambda "Handler Function". It does require a type
 * definition for the expected "payload" being sent in as the `event` but it allows
 * for this payload to come in directly (as would be the case when a Lambda calls
 * another Lambda) or if API Gateway calls this function (where the payload is a
 * _stringified_ version of the payload in the "body" parameter).
 *
 * Note: the handler function can be either _synchronous_ or _asynchronous_.
 */
export declare type IAwsHandlerFunction<T, R = IDictionary> = (event: IAwsLambdaEvent<T>, context: IAWSLambaContext, cb: IAwsLambdaCallback<R>) => void | Promise<void>;
/**
 * **IAwsLambdaEvent**
 *
 * Provides a simple way to state that the event will either be a raw payload of
 * type `T` or that it may be wrapped in a
 * [AWS Proxy Request](https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html).
 */
export declare type IAwsLambdaEvent<T> = T | IAWSLambdaProxyIntegrationRequest;
export interface IAPIGatewayErrorResponse<T = any> {
    errorCode?: string | number;
    errorMessage?: string;
    errorType: "Error";
    errors?: T[];
    stackTrace?: string[];
}
/**
 * **IAwsLambdaCallback**
 *
 * Provides the typing for the basic structure of a Lambda callback
 * (aka, `(err, response) => void` but also requires that you state
 * the stucture of a successful response). Optionally you may state
 * the Error Responses that this function may return too but that is
 * optional and will be expressed simply as the type of `Error` if
 * left off.
 */
export declare type IAwsLambdaCallback<T, E = IAPIGatewayErrorResponse> = IAwsLambdaSuccessCallback<T> & IAwsLambdaFailureCallback<E>;
/** A Lambda function called to indicate the SUCCESSFUL end-state of a lambda function */
export interface IAwsLambdaSuccessCallback<T = IDictionary> {
    (error: null, response: T): void;
}
/** A Lambda function called to indicate a FAILED end-state of a lambda function */
export interface IAwsLambdaFailureCallback<E = IAPIGatewayErrorResponse> {
    (error: E | Error, response?: null): void;
}
/**
 * **IAwsApiGatewayResponse**
 *
 * A Lambda function called that is returning to an API Gateway endpoint
 */
export interface IAwsApiGatewayResponse {
    statusCode: keyof ApiGatewayStatusCode;
    headers?: IDictionary<string>;
    body?: string;
    error?: string;
}
export declare enum ApiGatewayStatusCode {
    Success = 200,
    BadRequest = 400,
    Unauthorized = 401,
    Forbidden = 403,
    NotFound = 404,
    UnprocessableEntity = 422,
    InternalServerError = 500,
    BadGateway = 502,
    GatewayTimeout = 504
}
export declare type RestMethod = "GET" | "POST" | "PUT" | "DELETE";
/**
 * Provides a logical test to see if the passed in event is a LambdaProxy request or just a
 * straight JS object response. This is useful when you have both an HTTP event and a Lambda-to-Lambda
 * or Step-Function-to-Lambda interaction.
 *
 * @param message the body of the request (which is either of type T or a LambdaProxy event)
 */
export declare function isLambdaProxyRequest<T>(message: T | IAWSLambdaProxyIntegrationRequest): message is IAWSLambdaProxyIntegrationRequest;
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
export declare function getBodyFromPossibleLambdaProxyRequest<T>(input: T | IAWSLambdaProxyIntegrationRequest): T;
/**
 * **IAWSLambdaProxyIntegrationRequest**
 *
 * When a Lambda function is executed by API Gateway, the default option is
 * to turn on "Lambda Proxy Integration" which provides a lot of meta data
 * regarding the request. When this is on, the message payload will be found
 * in the "body" attribute as a JSON string.
 */
export interface IAWSLambdaProxyIntegrationRequest {
    resource: string;
    path: string;
    httpMethod: RestMethod;
    headers: {
        Accept: string;
        ["Accept-Encoding"]: string;
        ["cache-control"]: string;
        ["CloudFront-Forwarded-Proto"]: BooleanAsString;
        ["CloudFront-Is-Desktop-Viewer"]: BooleanAsString;
        ["CloudFront-Is-Mobile-Viewer"]: BooleanAsString;
        ["CloudFront-Is-SmartTV-Viewer"]: BooleanAsString;
        ["CloudFront-Is-Tablet-Viewer"]: BooleanAsString;
        ["CloudFront-Viewer-Country"]: string;
        ["Content-Type"]: string;
        ["Host"]: string;
        ["User-Agent"]: string;
        ["Via"]: string;
        ["X-Amz-Cf-Id"]: string;
        ["X-Amzn-Trace-Id"]: string;
        ["X-Forwarded-For"]: string;
        ["X-Forwarded-Proto"]: string;
        ["x-correlation-id"]: string;
    };
    queryStringParameters?: any;
    pathParameters?: any;
    requestContext: {
        requestTime: string;
        path: string;
        accountId: string;
        protocol: string;
        resourceId: string;
        stage: string;
        requestTimeEpoch: number;
        requestId: string;
        identity: {
            cognitoIdentityPoolId?: string;
            accountId?: string;
            cognitoIdentityId: string;
            caller: string;
            sourceIp: string;
            accessKey: string;
            cognitoAuthenticationType: string;
            cognitoAuthenticationProvider: string;
            userArn: string;
            userAgent: string;
            user: string;
        };
        resourcePath: string;
        httpMethod: RestMethod;
        apiId: string;
    };
    /** The payload that the client has sent to you; if the content was originally in JSON/object format you will need to parse it */
    body: string;
    isBase64Encoded: boolean;
}
export interface IAWSLambaContext {
    /** The default value is true. This property is useful only to modify the default behavior of the callback. By default, the callback will wait until the Node.js runtime event loop is empty before freezing the process and returning the results to the caller. You can set this property to false to request AWS Lambda to freeze the process soon after the callback is called, even if there are events in the event loop. AWS Lambda will freeze the process, any state data and the events in the Node.js event loop (any remaining events in the event loop processed when the Lambda function is called next and if AWS Lambda chooses to use the frozen process). For more information about callback, see Using the Callback Parameter. */
    callbackWaitsForEmptyEventLoop?: boolean;
    /** Name of the Lambda function that is executing. */
    functionName: string;
    /** The Lambda function version that is executing. If an alias is used to invoke the function, then function_version will be the version the alias points to. */
    functionVersion: string;
    /** The ARN used to invoke this function. It can be a function ARN or an alias ARN. An unqualified ARN executes the $LATEST version and aliases execute the function version it is pointing to. */
    invokedFunctionArn: string;
    /** Memory limit, in MB, you configured for the Lambda function. You set the memory limit at the time you create a Lambda function and you can change it later. */
    memoryLimitInMB: string;
    /** AWS request ID associated with the request. This is the ID returned to the client that called the invoke method. Note: if AWS Lambda retries the invocation (for example, in a situation where the Lambda function that is processing Kinesis records throws an exception), the request ID remains the same.*/
    awsRequestId: string;
    /** The name of the CloudWatch log group where you can find logs written by your Lambda function */
    logGroupName: string;
    /** The name of the CloudWatch log group where you can find logs written by your Lambda function. The log stream may or may not change for each invocation of the Lambda function.  The value is null if your Lambda function is unable to create a log stream, which can happen if the execution role that grants necessary permissions to the Lambda function does not include permissions for the CloudWatch actions. */
    logStreamName: string;
    /** Information about the Amazon Cognito identity provider when invoked through the AWS Mobile SDK. It can be null. */
    identity?: string;
    /** Information about the client application and device when invoked through the AWS Mobile SDK */
    clientContext?: {
        client: {
            installation_id: string;
            app_title: string;
            app_version_name: string;
            app_version_code: string;
            app_package_name: string;
        };
        Custom: IDictionary;
        env: {
            platform: string;
            platform_version: string;
            make: string;
            model: string;
            locale: string;
        };
    };
}
export interface IAWSGatewayRequest {
    done?: () => void;
    succeed?: () => void;
    fail?: () => void;
    logGroupName?: string;
    logStreamName?: string;
    memoryLimitInMB?: string;
    functionVersion?: string;
    getRemainingTimeInMillis?: string;
    invokeid?: string;
    awsRequestId?: string;
    invokedFunctionArn?: string;
    stage?: "dev" | "stage" | "prod";
    parentRequestId?: string;
}
/** A decorator signature for a class property */
export declare type PropertyDecorator = (target: any, key: string | symbol) => void;
/** A decorator signature for a class */
export declare type ClassDecorator = <TFunction extends Function>(target: TFunction) => TFunction | void;
export interface ReflectionProperty<T> {
    get: () => T;
    set: (value?: any) => void;
    enumerable: boolean;
    configurable: boolean;
}
export interface ICloudWatchEvent {
    messageType: string | "DATA_MESSAGE";
    owner: string;
    logGroup: string;
    logStream: string;
    subscriptionFilters: string[];
    logEvents: ICloudWatchLogEvent[];
}
export interface ICloudWatchLogEvent {
    id: string;
    timestamp: epoch;
    message: string;
    extractedFields?: IDictionary[];
}

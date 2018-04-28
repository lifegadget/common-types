import { IDictionary, booleanAsString } from "./basics";
export interface ILambdaErrorResponse<T = any> {
    errorCode?: string | number;
    errorMessage?: string;
    errorType: "Error";
    errors?: T[];
    stackTrace?: string[];
}
export interface ILambdaSuccessCallback<T = IDictionary> {
    (error: null, response: T): void;
}
export interface ILambdaFailureCallback<E = ILambdaErrorResponse> {
    (error: E | Error): void;
}
export declare type LambdaCallback<T = IDictionary, E = ILambdaErrorResponse> = ILambdaSuccessCallback<T> & ILambdaFailureCallback<E>;
export interface IAWSGatewayResponse {
    statusCode: keyof AWSGatewayStatusCode;
    headers?: IDictionary<string>;
    body?: string;
    error?: string;
}
export declare enum AWSGatewayStatusCode {
    BadRequest = 400,
    Unauthorized = 401,
    Forbidden = 403,
    NotFound = 404,
    UnprocessableEntity = 422,
    InternalServerError = 500,
    BadGateway = 502,
    GatewayTimeout = 504,
}
export declare type REST_Methods = "GET" | "POST" | "PUT" | "DELETE";
export declare function isLambdaProxyRequest<T>(message: T | IAWSLambdaProxyIntegrationRequest): message is IAWSLambdaProxyIntegrationRequest;
export declare function getBodyFromPossibleLambdaProxyRequest<T>(input: T | IAWSLambdaProxyIntegrationRequest): T;
export interface IAWSLambdaProxyIntegrationRequest {
    resource: string;
    path: string;
    httpMethod: REST_Methods;
    headers: {
        Accept: string;
        ["Accept-Encoding"]: string;
        ["cache-control"]: string;
        ["CloudFront-Forwarded-Proto"]: booleanAsString;
        ["CloudFront-Is-Desktop-Viewer"]: booleanAsString;
        ["CloudFront-Is-Mobile-Viewer"]: booleanAsString;
        ["CloudFront-Is-SmartTV-Viewer"]: booleanAsString;
        ["CloudFront-Is-Tablet-Viewer"]: booleanAsString;
        ["CloudFront-Viewer-Country"]: string;
        ["Content-Type"]: string;
        ["Host"]: string;
        ["User-Agent"]: string;
        ["Via"]: string;
        ["X-Amz-Cf-Id"]: string;
        ["X-Amzn-Trace-Id"]: string;
        ["X-Forwarded-For"]: string;
        ["X-Forwarded-Proto"]: string;
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
        httpMethod: REST_Methods;
        apiId: string;
    };
    body: string;
    isBase64Encoded: boolean;
}
export interface IAWSLambaContext {
    callbackWaitsForEmptyEventLoop?: boolean;
    functionName: string;
    functionVersion: string;
    invokedFunctionArn: string;
    memoryLimitInMB: string;
    awsRequestId: string;
    logGroupName: string;
    logStreamName: string;
    identity?: string;
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
    functionName?: string;
    memoryLimitInMB?: string;
    functionVersion?: string;
    getRemainingTimeInMillis?: string;
    invokeid?: string;
    awsRequestId?: string;
    invokedFunctionArn?: string;
    stage?: "dev" | "stage" | "prod";
    parentRequestId?: string;
}
export declare type PropertyDecorator = (target: any, key: string | symbol) => void;
export declare type ClassDecorator = <TFunction extends Function>(target: TFunction) => TFunction | void;
export interface ReflectionProperty<T> {
    get: () => T;
    set: (value?: any) => void;
    enumerable: boolean;
    configurable: boolean;
}

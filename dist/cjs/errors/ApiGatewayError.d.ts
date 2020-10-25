/**
 * @deprecated apiGatewayError you should not use this function; consider using a library like `brilliant-errors`.
 */
export declare function apiGatewayError(code: number, message: string, priorError?: Error): ApiGatewayError;
export declare class ApiGatewayError extends Error {
    code: string;
    errorCode?: number;
    errorMessage?: string;
}

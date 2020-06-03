import stackTrace from "./stackTrace";
export function apiGatewayError(code, message, priorError) {
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
export class ApiGatewayError extends Error {
}

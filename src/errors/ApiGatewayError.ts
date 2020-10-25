import stackTrace from "./stackTrace";
/**
 * @deprecated apiGatewayError you should not use this function; consider using a library like `brilliant-errors`.
 */
export function apiGatewayError(code: number, message: string, priorError?: Error) {
  const messagePrefix = `[${code}] `;
  const e = new ApiGatewayError(priorError ? priorError.message : "");
  e.errorMessage = !priorError
    ? messagePrefix + message
    : messagePrefix + priorError.message + message;
  e.name = priorError ? priorError.name : "ApiGatewayError";
  e.errorCode = code;
  e.stack = priorError
    ? priorError.stack || stackTrace(e.stack).slice(2).join("\n")
    : stackTrace(e.stack).slice(2).join("\n");

  return e;
}

export class ApiGatewayError extends Error {
  public code: string;
  public errorCode?: number;
  public errorMessage?: string;
}

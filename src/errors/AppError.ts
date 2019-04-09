import stackTrace from "./stackTrace";

export function createError(code: string, message: string, priorError?: Error) {
  const messagePrefix = `[${code}] `;
  const e = new AppError(
    !priorError ? messagePrefix + message : messagePrefix + priorError.message + message
  );
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

export class AppError extends Error {
  public code: string;
  public errCode?: number;
  public errMessage?: string;
}

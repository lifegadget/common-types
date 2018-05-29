export function createError(code: string, message: string, priorError?: Error) {
  const messagePrefix = `[${code}] `;
  const e = new AppError(
    !priorError ? messagePrefix + message : messagePrefix + priorError.message + message
  );
  e.name = priorError ? priorError.name : "AppError";
  e.code = code;
  e.stack = priorError ? priorError.stack || e.stack.slice(2) : e.stack.slice(2);

  return e;
}

export class AppError extends Error {
  public code: string;
}

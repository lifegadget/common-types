import stackTrace from "./stackTrace";

/**
 * @deprecated createError you should not use this function; consider using a library like `brilliant-errors`.
 */
export function createError(
  fullName: string,
  message: string,
  priorError?: Error & { code?: string }
) {
  const messagePrefix = `[${fullName}] `;

  const e = new AppError(
    !priorError ? messagePrefix + message : messagePrefix + priorError.message + message
  );
  e.name = priorError ? priorError.code || priorError.name : fullName;
  const parts = fullName.split("/");

  e.code = [...parts].pop();
  e.stack = priorError
    ? priorError.stack || stackTrace(e.stack).slice(2).join("\n")
    : stackTrace(e.stack).slice(2).join("\n");

  return e;
}

export class AppError extends Error {
  public code: string;
  public errCode?: number;
  public errMessage?: string;
}

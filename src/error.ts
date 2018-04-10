export function createError(code: string, messageOrPrior: string | Error) {
  const messagePrefix = `[${code}]: `;
  const e = new AppError(
    typeof messageOrPrior === "string"
      ? messagePrefix + messageOrPrior
      : messagePrefix + messageOrPrior.message
  );
  e.name = typeof messageOrPrior === "string" ? "AppError" : messageOrPrior.name;
  e.code = code;
  e.stack = typeof messageOrPrior === "string" ? e.stack : messageOrPrior.stack || e.stack;
}

export class AppError extends Error {
  public code: string;
}

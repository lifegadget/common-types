import stackTrace from "./stackTrace";
export function createError(fullName, message, priorError) {
    const messagePrefix = `[${fullName}] `;
    const e = new AppError(!priorError
        ? messagePrefix + message
        : messagePrefix + priorError.message + message);
    e.name = priorError ? priorError.code || priorError.name : fullName;
    const parts = fullName.split("/");
    e.code = [...parts].pop();
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
}

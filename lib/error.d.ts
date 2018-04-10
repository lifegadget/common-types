export declare function createError(code: string, message: string, priorError?: Error): AppError;
export declare class AppError extends Error {
    code: string;
}

export declare function createError(code: string, messageOrPrior: string | Error): AppError;
export declare class AppError extends Error {
    code: string;
}

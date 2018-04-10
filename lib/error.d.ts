export declare function createError(code: string, messageOrPrior: string | Error): void;
export declare class AppError extends Error {
    code: string;
}

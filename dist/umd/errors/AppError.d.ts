export declare function createError(fullName: string, message: string, priorError?: Error & {
    code?: string;
}): AppError;
export declare class AppError extends Error {
    code: string;
    errCode?: number;
    errMessage?: string;
}

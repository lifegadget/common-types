/**
 * @deprecated createError you should not use this function; consider using a library like `brilliant-errors`.
 */
export declare function createError(fullName: string, message: string, priorError?: Error & {
    code?: string;
}): AppError;
export declare class AppError extends Error {
    code: string;
    errCode?: number;
    errMessage?: string;
}

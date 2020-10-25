/**
 * @deprecated PathJoinError you should not use this class; consider using a library like `brilliant-errors`.
 */
export declare class PathJoinError extends Error {
    code: string;
    name: string;
    message: string;
    constructor(code: string, message: string);
}

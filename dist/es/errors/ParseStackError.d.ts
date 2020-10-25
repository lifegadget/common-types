/**
 * @deprecated ParseStackError you should not use this class; consider using a library like `brilliant-errors`.
 */
export declare class ParseStackError extends Error {
    originalString: string;
    structuredString: string;
    code: string;
    name: string;
    message: string;
    constructor(code: string, message: string, originalString: string, structuredString: string);
}

export interface IStackFrame {
    fn: string;
    line: number;
    col: number;
    filePath?: string;
    shortPath?: string;
    file: string;
}
/** @deprecated */
export interface IParseStackOptions {
    /**
     * state text to look for in the function name or file
     * name and filter out if found
     */
    ignorePatterns?: string[];
    /**
     * optionally specify the max depth of the stack
     * trace you want
     */
    limit?: number;
}
/**
 * @deprecated getStackInfo() is deprecated; the `common-types` library
 * aims almost exclusively to provide _types_ and this does not fit this
 * ambition.
 */
export declare function parseStack(
/** the default stack trace string */
stack: string, options?: IParseStackOptions): IStackFrame[];

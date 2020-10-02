export interface IStackFrame {
    fn: string;
    line: number;
    col: number;
    filePath?: string;
    shortPath?: string;
    file: string;
}
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
 * parses an Error's `stack` property into a structured
 * object. Optionally allowing for filtering and size limiting
 */
export declare function parseStack(
/** the default stack trace string */
stack: string, options?: IParseStackOptions): IStackFrame[];

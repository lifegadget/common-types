export interface IStackFrame {
    fn: string;
    line: number;
    col: number;
    filePath?: string;
    file: string;
}
export declare function parseStack(stack: string, ignorePatterns?: string[], limit?: number): string | IStackFrame[];
/**
 * An ISO-morphic path join that works everywhere;
 * all paths are separated by the `/` character and both
 * leading and trailing delimiters are stripped
 */
export declare function pathJoin(...args: any[]): any;
/** converts a slash delimited filepath to a dot notation path */
export declare function dotNotation(input: string): string;

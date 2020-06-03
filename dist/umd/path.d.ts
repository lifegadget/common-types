/**
 * An ISO-morphic path join that works everywhere;
 * all paths are separated by the `/` character and both
 * leading and trailing delimiters are stripped
 */
export declare function pathJoin(...args: any[]): string;
/** converts a slash delimited filepath to a dot notation path */
export declare function dotNotation(input: string): string;

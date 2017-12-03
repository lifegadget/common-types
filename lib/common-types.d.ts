/**
 * A Javascript hash which allows for any set of keys
 */
export interface IDictionary<T = any> {
    [key: string]: T;
}
/**
 * A numeric Javascript array
 */
export interface INumericArray<T = any> {
    [key: number]: T;
}
/** A function for sorting JS arrays */
export declare type SortingFunction = (a: any, b: any) => number;
/** a string of the format: "YYYY-MM-DD" */
export declare type datestring = string;
/** a string of the format: "HH:mm:ss" */
export declare type timestring = string;
/** a string of the format: "UTC" */
export declare type timezone = string;
/** string representation of datetime in format of "2016-07-17T13:29:11.652Z" */
export declare type datetime = string;
/** unix epoch datetime format (aka, seconds since 1970) */
export declare type epoch = number;
/** foreign key reference */
export declare type fk = string;
/** primary key reference */
export declare type pk = string;
export declare enum STAGE {
    prod = "prod",
    stage = "stage",
    test = "test",
    dev = "dev",
    production = "prod",
    staging = "stage",
    testing = "test",
    development = "dev",
}
export declare enum FirebaseEvent {
    value = "value",
    child_added = "child_added",
    child_moved = "child_moved",
    child_removed = "child_removed",
    child_changed = "child_changed",
}
export declare type AWSGatewayCallback<T = IAWSGatewayResponse> = (error: any, response: T) => void;
export interface IAWSGatewayResponse {
    statusCode: number;
    headers?: IDictionary<string>;
    body?: string;
    error?: string;
}
export interface IAWSGatewayRequest {
    callbackWaitsForEmptyEventLoop?: boolean;
    done?: () => void;
    succeed?: () => void;
    fail?: () => void;
    logGroupName?: string;
    logStreamName?: string;
    functionName?: string;
    memoryLimitInMB?: string;
    functionVersion?: string;
    getRemainingTimeInMillis?: string;
    invokeid?: string;
    awsRequestId?: string;
    invokedFunctionArn?: string;
    stage?: "dev" | "stage" | "prod";
    parentRequestId?: string;
}
/** A decorator signature for a class property */
export declare type PropertyDecorator = (target: any, key: string | symbol) => void;
/** A decorator signature for a class */
export declare type ClassDecorator = <TFunction extends Function>(target: TFunction) => TFunction | void;
export interface ReflectionProperty<T> {
    get: () => T;
    set: (value?: any) => void;
    enumerable: boolean;
    configurable: boolean;
}
export interface IVerboseError {
    /** A short and unique identifier for the error; typically would not have any spaces in it */
    code: string;
    /** A user-friendly description of the error message */
    message: string;
    module?: string;
    function?: string;
    fileName?: string;
    stackFrames?: any[];
}
export declare type LazyString = () => string;
export interface IStackFrame {
    getTypeName: LazyString;
    getFunctionName: LazyString;
    getMethodName: LazyString;
    getFileName: LazyString;
    getLineNumber: LazyString;
    getColumnNumber: LazyString;
    isNative: LazyString | string;
}
export declare class VerboseError extends Error implements IVerboseError {
    private static stackParser(err);
    /**
     * If you want to use a library like stack-trace(node) or stacktrace-js(client) add in the "get"
     * function that they provide
     */
    static setStackParser(fn: (err: IVerboseError) => any): void;
    static useColor: true;
    static filePathDepth: 3;
    code: string;
    message: string;
    module?: string;
    function?: string;
    stackFrames?: IStackFrame[];
    constructor(err: IVerboseError, ...args: any[]);
    toString(): string;
    toJSON(): string;
    toObject(): {
        code: string;
        message: string;
        module: string;
    };
}

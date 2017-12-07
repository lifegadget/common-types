import chalk = require("chalk");
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
export type SortingFunction = (a: any, b: any) => number;

/** a string of the format: "YYYY-MM-DD" */
export type datestring = string;
/** a string of the format: "HH:mm:ss" */
export type timestring = string;
/** a string of the format: "UTC" */
export type timezone = string;
/** string representation of datetime in format of "2016-07-17T13:29:11.652Z" */
export type datetime = string;
/** unix epoch datetime format (aka, seconds since 1970) */
export type epoch = number;
/** a string representing a URL resource */
export type url = string;
/** a string representing a URI resource */
export type uri = string;

/** foreign key reference */
export type fk = string;
/** primary key reference */
export type pk = string;

export enum STAGE {
  prod = "prod",
  stage = "stage",
  test = "test",
  dev = "dev",
  production = prod,
  staging = stage,
  testing = test,
  development = dev
}

export enum FirebaseEvent {
  value = "value",
  child_added = "child_added",
  child_moved = "child_moved",
  child_removed = "child_removed",
  child_changed = "child_changed"
}

export type AWSGatewayCallback<T = IAWSGatewayResponse> = (
  error: any,
  response: T
) => void;

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
  /* passed explicitly from parent Lambda to child */
  stage?: "dev" | "stage" | "prod";
  /* the parent Lambda's request Id */
  parentRequestId?: string;
}

// DECORATORS

/** A decorator signature for a class property */
export type PropertyDecorator = (target: any, key: string | symbol) => void;
/** A decorator signature for a class */
export type ClassDecorator = <TFunction extends Function>(
  target: TFunction
) => TFunction | void;
export interface ReflectionProperty<T> {
  get: () => T;
  set: (value?: any) => void;
  enumerable: boolean;
  configurable: boolean;
}

// ERRORS
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

export type LazyString = () => string;
export interface IStackFrame {
  getTypeName: LazyString;
  getFunctionName: LazyString;
  getMethodName: LazyString;
  getFileName: LazyString;
  getLineNumber: LazyString;
  getColumnNumber: LazyString;
  isNative: LazyString | string;
}

export class VerboseError extends Error implements IVerboseError {
  private static stackParser(err: VerboseError): void | any[] {
    return undefined;
  }
  /**
   * If you want to use a library like stack-trace(node) or stacktrace-js(client) add in the "get"
   * function that they provide
   */
  public static setStackParser(fn: (err: IVerboseError) => any) {
    VerboseError.stackParser = fn;
  }
  public static useColor: true;
  public static filePathDepth: 3;

  code: string;
  message: string;
  module?: string;
  function?: string;
  stackFrames?: IStackFrame[];

  constructor(err: IVerboseError, ...args: any[]) {
    super(...args);
    this.code = err.code;
    this.message = err.message;
    this.module = err.module;
    this.function = err.function;
    const stackFrames = VerboseError.stackParser(this);
    if (stackFrames) {
      this.stackFrames = stackFrames.filter(
        frame => (frame.getFileName() || "").indexOf("common-types") === -1
      );
      this.function = stackFrames[0].getMethodName();
      this.stack =
        this.message +
        "\n\n" +
        this.stackFrames
          .map(frame => {
            const isNative =
              typeof frame.isNative === "function"
                ? frame.isNative()
                : frame.isNative;
            const colorize = (content: string) =>
              VerboseError.useColor && isNative
                ? chalk.grey.italic(content)
                : content;
            const className = frame.getTypeName()
              ? frame.getTypeName() + " → "
              : "";
            const functionName =
              frame.getMethodName() || frame.getFunctionName() || "<anonymous>";
            const classAndFunction = VerboseError.useColor
              ? chalk.bold(`${className}${functionName}`)
              : `${className}${functionName}`;
            const fileName = (frame.getFileName() || "")
              .split("/")
              .slice(-1 * VerboseError.filePathDepth)
              .join("/");
            const details = isNative
              ? "( native function )"
              : `[ line ${frame.getLineNumber()}, col ${frame.getColumnNumber()} in ${
                  fileName
                } ]`;

            return colorize(`\t at ${classAndFunction} ${details}`);
          })
          .join("\n");
    } else {
      this.stack = this.stack
        .split("\n")
        .filter(line => line.indexOf("VerboseError") === -1)
        .join("\n");
    }
  }

  toString() {
    return this.message + this.stack;
  }

  toJSON() {
    return JSON.stringify(this.toObject(), null, 2);
  }

  toObject() {
    return {
      code: this.code,
      message: this.message,
      module: this.module
    };
  }
}

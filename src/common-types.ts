// import chalk from "chalk";
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
/** universal resource locator */
export type url = string;
/** universal resource indicator */
export type uri = string;

export const STAGE_MAP: IDictionary<string> = {
  prod: "prod",
  stage: "stage",
  test: "test",
  dev: "dev",
  production: "prod",
  staging: "stage",
  testing: "test",
  development: "dev"
};

export function STAGE(stage: string) {
  if (new Set(Object.keys(STAGE_MAP)).has(stage)) {
    return STAGE_MAP[stage];
  } else {
    console.warn(
      `An invalid stage was passed in: "${stage}"; will use "dev" as default`
    );
    return "dev";
  }
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

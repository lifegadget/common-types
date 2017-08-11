
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

export enum STAGE {
  prod = 'prod',
  stage = 'stage',
  test = 'test',
  dev = 'dev',
  production = prod,
  staging = stage,
  testing = test,
  development = dev
}

export enum FirebaseEvent {
  value = 'value',
  child_added = 'child_added',
  child_moved = 'child_moved',
  child_removed = 'child_removed',
  child_changed = 'child_changed'
};
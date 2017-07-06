
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

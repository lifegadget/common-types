/** 
 * A Javascript hash which allows for any set of keys
 */
interface IDictionary<T = any> {
  [key: string]: T;
}

/**
 * A numeric Javascript array
 */
interface INumericArray<T> {
  [key: number]: T;
}

/** a string of the format: "YYYY-MM-DD" */
type datestring = string;
/** a string of the format: "HH:mm:ss" */
type timestring = string;
/** a string of the format: "UTC" */
type timezone = string;
/** string representation of datetime in format of "2016-07-17T13:29:11.652Z" */
type datetime = string;
/** unix epoc datetime format (aka, seconds since 1970) */
type epoc = number;

/**
 * A Javascript hash which allows for any set of keys
 */
export interface IDictionary<T = any> {
  [key: string]: T;
}

export type INameValuePair<T = any> = INameValuePairWithId<T> | INameValuePairWithKey<T>;
export interface INameValuePairWithId<T = any> {
  id: string | number;
  value: T;
}

export interface INameValuePairWithKey<T = any> {
  key: string | number;
  value: T;
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
/** javascript datetime format (aka, milliseconds since 1970) */
export declare type epochWithMilliseconds = number;
/** a numeric value representing the number of minutes */
export declare type minutes = number;
/** a numeric value representing the number of seconds */
export declare type seconds = number;
/** foreign key reference */
export declare type fk = string;
/** primary key reference */
export declare type pk = string;
/** universal resource locator */
export declare type url = string;
/** universal resource indicator */
export declare type uri = string;
/** a string which represents zipped content run through a base64 conversion process to a string */
export declare type Base64Zip = string;
/** a numeric value which is represented as a string */
export declare type numberAsString = string;
export declare const STAGE_MAP: IDictionary<string>;
export declare function STAGE(stage: string): string;

export type BooleanAsString = "true" | "false";

/**
 * Allows a type T to have certain properties "omitted" and thereby
 * creating a new type definition. Very useful for omitting an "id"
 * property before a record is saved, etc.
 */
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

/**
 * **Nullable**
 *
 * Allows properties of an object to be assigned either to their defined _type_
 * or alternatively to `null`. This has several use cases but is particularly
 * useful when working with a database like Firebase where setting a value to
 * `null` is equivalent to telling the DB to "remove" the property.
 */
export type Nullable<T, K extends keyof T> = { [key in keyof T]: T[K] | null };

/**
 * For a given hash/object, this produces a type which is just the
 * names of functions contained within hash.
 */
type FunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? K : never
}[keyof T];

type FunctionProperties<T> = Pick<T, FunctionPropertyNames<T>>;

/**
 * The properties on a given hash/object
 */
type NonFunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? never : K
}[keyof T];
/**
 * A type definition which reduces the type of the T to just those non-function
 * properties.
 */
type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;

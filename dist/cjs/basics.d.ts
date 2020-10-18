/**
 * A Javascript hash which allows for any set of keys
 */
export interface IDictionary<T = any> {
    [key: string]: T;
}
/**
 * The class constructor for a class (or _interface_ for class)
 */
export declare type ConstructorFor<TInstance, TParams extends Array<any> = any[]> = new (...params: TParams) => TInstance;
export declare type INameValuePair<T = any> = INameValuePairWithId<T> | INameValuePairWithKey<T>;
export interface INameValuePairWithId<T = any> {
    id: string | number;
    value: T;
}
export interface INameValuePairWithKey<T = any> {
    key: string | number;
    value: T;
}
/** A function for sorting JS arrays */
export declare type SortingFunction = (a: any, b: any) => number;
/** a string of the format: "YYYY-MM-DD" */
export declare type datestring = string;
/** a string of the format: "HH:mm:ss" */
export declare type timestring = string;
/**
 * an array containing hours and minutes since midnight with the optional
 * ability to add _seconds_ or even _miliseconds_
 * a useful way of representing _time of day_ that has human readable
 * elements, and is easily incorporated into a Javascript `Date`.
 *
 * example:
 * ```typescript
 * const tod: todStructured = [5,15]
 * const date = new Date();
 * date.setHours(...todStructured)
 * ```
 */
export declare type todStructured = [hours, minutes] | [hours, minutes, seconds] | [hours, minutes, seconds, ms];
export declare type hours = number;
export declare type ms = number;
/**
 * The _time-of-day_ expressed as the number of **minutes** since midnight
 */
export declare type todMinutes = minutes;
/**
 * The _time-of-day_ expressed as the number of **seconds** since midnight
 */
export declare type todSeconds = seconds;
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
/** a given year in the gregorian calendar*/
export declare type year = number;
/** a number which should represent a percentage value */
export declare type percentage = number;
/** a string blob that represents JSON structured data */
export declare type json = string;
/** a string blob that represents CSV structured data */
export declare type csv = string;
/** a _string_ variable which contains **Markdown** content */
export declare type markdown = string;
/** a _string_ variable which contains **HTML** content */
export declare type html = string;
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
/** a binary value (represented as a number in JS) */
export declare type binary = number;
/** an email address (alias to string) */
export declare type email = string;
/** a numeric value which is represented as a string */
export declare type numberAsString = string;
export declare const STAGE_MAP: IDictionary<string>;
export declare function STAGE(stage: string): string;
export declare type BooleanAsString = "true" | "false";
/**
 * Allows a type T to have certain properties "omitted" and thereby
 * creating a new type definition. Very useful for omitting an "id"
 * property before a record is saved, etc.
 */
export declare type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export declare type Callback<T, P extends Array<any> = any[]> = (...args: P) => T;
export declare type AsyncCallback<T, P extends Array<any> = any[]> = (...args: P) => Promise<T>;
/**
 * **CallbackOption**
 *
 * Allows values to be typed as defined by `T[K]` but also will allow a callback function
 * which returns the same `T[K]`
 */
export declare type CallbackOption<T, K extends keyof T = keyof T> = {
    [key in keyof T]: T[K] | Callback<T[K]>;
};
/**
 * **Nullable**
 *
 * Allows properties of an object to be assigned either to their _defined type_
 * or alternatively to `null`. This has several use cases but is particularly
 * useful when working with a database like Firebase where setting a value to
 * `null` is equivalent to telling the DB to "remove" the property.
 */
export declare type Nullable<T, K extends keyof T = keyof T> = {
    [key in keyof T]: T[K] | null;
};

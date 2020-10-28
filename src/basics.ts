/**
 * A Javascript hash which allows for any set of keys
 */
export interface IDictionary<T = any> {
  [key: string]: T;
}

/**
 * The class constructor for a class (or _interface_ for class)
 */
export type ConstructorFor<TInstance, TParams extends Array<any> = any[]> = new (
  ...params: TParams
) => TInstance;

export type INameValuePair<T = any> = INameValuePairWithId<T> | INameValuePairWithKey<T>;
export interface INameValuePairWithId<T = any> {
  id: string | number;
  value: T;
}

export interface INameValuePairWithKey<T = any> {
  key: string | number;
  value: T;
}

/** A function for sorting JS arrays */
export type SortingFunction = (a: any, b: any) => number;

/** a number which should represent a percentage value */
export type percentage = number;
/** a string blob that represents JSON structured data */
export type json = string;
/** a string blob that represents CSV structured data */
export type csv = string;

/** a _string_ variable which contains **Markdown** content */
export type markdown = string;
/** a _string_ variable which contains **HTML** content */
export type html = string;

/** foreign key reference */
export type fk = string;
/** primary key reference */
export type pk = string;

/** universal resource locator */
export type url = string;
/** universal resource indicator */
export type uri = string;

/**
 * A string which represents a UUID in it's standard
 * dasherized format (aka, 32 random string values separated by
 * dashes): `xxxxxxxx-xxxx-xxxx-xxxxxxxxxxxxx`.
 *
 * If you prefer to use the non-dasherized representation,
 * you should use `uuid_unformatted` instead.
 */
export type uuid = string;
/**
 * A string which represents a UUID but in a _non_-dasherized version
 * (aka., just 32 random string values with no separation)
 */
export type uuid_unformatted = string;

/** a string which represents zipped content run through a base64 conversion process to a string */
export type Base64Zip = string;
/** a binary value (represented as a number in JS) */
export type binary = number;

/** an email address (alias to string) */
export type email = string;
/** a numeric value which is represented as a string */
export type numberAsString = string;
export declare const STAGE_MAP: IDictionary<string>;
export declare function STAGE(stage: string): string;

export type BooleanAsString = "true" | "false";

/**
 * Allows a type T to have certain properties "omitted" and thereby
 * creating a new type definition. Very useful for omitting an "id"
 * property before a record is saved, etc.
 */
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type Callback<T, P extends Array<any> = any[]> = (...args: P) => T;
export type AsyncCallback<T, P extends Array<any> = any[]> = (...args: P) => Promise<T>;

/**
 * **CallbackOption**
 *
 * Allows values to be typed as defined by `T[K]` but also will allow a callback function
 * which returns the same `T[K]`
 */
export type CallbackOption<T, K extends keyof T = keyof T> = {
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
export type Nullable<T, K extends keyof T = keyof T> = {
  [key in keyof T]: T[K] | null;
};

/**
 * For a given hash/object, this produces a type which is just the
 * names of functions contained within hash.
 */
type FunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];

type FunctionProperties<T> = Pick<T, FunctionPropertyNames<T>>;

/**
 * The properties on a given hash/object
 */
type NonFunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];
/**
 * A type definition which reduces the type of the T to just those non-function
 * properties.
 */
type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;

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

export declare const STAGE_MAP: IDictionary<string>;
export declare function STAGE(stage: string): string;

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
 * For a given hash/object, this produces a type which is just the
 * names of functions contained within hash.
 *
 * @depreacted this type of abstraction tends to obfuscate rather than clarify
 */
type FunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];

type FunctionProperties<T> = Pick<T, FunctionPropertyNames<T>>;

/**
 * The properties on a given hash/object
 *
 * @depreacted this type of abstraction tends to obfuscate rather than clarify
 */
type NonFunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];

/**
 * A type definition which reduces the type of the T to just those non-function
 * properties.
 *
 * @depreacted this type of abstraction tends to obfuscate rather than clarify
 */
type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;

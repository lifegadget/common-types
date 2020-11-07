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
export declare const STAGE_MAP: IDictionary<string>;
export declare function STAGE(stage: string): string;
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

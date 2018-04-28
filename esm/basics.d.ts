export interface IDictionary<T = any> {
    [key: string]: T;
}
export interface INumericArray<T = any> {
    [key: number]: T;
}
export declare type SortingFunction = (a: any, b: any) => number;
export declare type datestring = string;
export declare type timestring = string;
export declare type timezone = string;
export declare type datetime = string;
export declare type epoch = number;
export declare type fk = string;
export declare type pk = string;
export declare type url = string;
export declare type uri = string;
export declare type Base64Zip = string;
export declare const STAGE_MAP: IDictionary<string>;
export declare function STAGE(stage: string): string;
export declare type booleanAsString = "true" | "false";

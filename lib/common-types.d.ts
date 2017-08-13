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
export declare enum STAGE {
    prod = "prod",
    stage = "stage",
    test = "test",
    dev = "dev",
    production = "prod",
    staging = "stage",
    testing = "test",
    development = "dev",
}
export declare enum FirebaseEvent {
    value = "value",
    child_added = "child_added",
    child_moved = "child_moved",
    child_removed = "child_removed",
    child_changed = "child_changed",
}

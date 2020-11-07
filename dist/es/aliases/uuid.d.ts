/**
 * A string which represents a UUID in it's standard
 * dasherized format (aka, 32 random string values separated by
 * dashes): `xxxxxxxx-xxxx-xxxx-xxxxxxxxxxxxx`.
 *
 * If you prefer to use the non-dasherized representation,
 * you should use `uuid_unformatted` instead.
 */
export declare type uuid = string;
/**
 * A string which represents a UUID but in a _non_-dasherized version
 * (aka., just 32 random string values with no separation)
 */
export declare type uuid_unformatted = string;

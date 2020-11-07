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
/**
 * A 4-digit year in the gregorian calendar (represented numerically).
 *
 * > Note: use `yearString` for same format as a string.
 */
export declare type year = number;
/**
 * A 4-digit year in the gregorian calendar (represented as a string).
 *
 * > Note: use `year` for the same format represented numerically.
 */
export declare type yearString = string;
/**
 * A **2-digit** abbreviation for the year _ending in_ "xx".
 *
 * This form of year representation is still used a decent
 * amount as a "shortcut" to the full 4-digit variation but
 * as we've crossed over into the 2000's it is far less
 * common that it used to be.
 *
 * This abbreviated form is always represented as a _string_
 * to preserve the form/structure and convey clearer meaning
 * in the first part of a century.
 */
export declare type yearAbbreviated = string;

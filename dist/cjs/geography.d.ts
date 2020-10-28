/**
 * The ISO 2 letter standard for [country codes](https://www.iso.org/iso-3166-country-codes.html).
 *
 * You can find a full listing here: https://www.iso.org/obp/ui/#search
 */
export declare type Iso3166 = "US" | "CA" | "MX" | "GB" | "DE" | "FR" | string;
/**
 * The ISO standard for country principle subdivisions; which
 * in the US is a State but could be a _provence_, _parish_, etc.
 *
 * > **Note:** we use _snake\_case_ instead of the standard ISO convension
 * of using _dasherization_.
 */
export declare type Iso3166_2 = "US_CA" | "US_MI" | "US_AZ" | "US_NV" | string;
/**
 * The ISO 3 letter standard for country codes
 */
export declare type Iso3166_Alpha3 = "USA" | string;
/**
 * A US Zipcode represented as a 5 digit sequence of number
 * but stored as a string to preserve leading zeros.
 */
export declare type zip5 = string;
/**
 * A US Zipcode which is represented by a leading 5 digits,
 * a dash character, and then four more digits which bring
 * the resolution of the area down to a street level.
 *
 * Note: these are used for postal shipping to aid in precision
 * in the US but more often they are left off.
 */
export declare type zip5_4 = string;

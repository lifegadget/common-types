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

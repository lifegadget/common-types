import { Hexadecimal, OptThreeDigit } from "./numeric";
import { OptSpace } from "./stringAliases";

export type RgbObject = { r: number; g: number; b: number };
export type RgbArray = [number, number, number];

/**
 * Defines a tuple of length 3 to represent the RGB colors but where values are
 * strings rather than numbers. This _could_ be useful because we can more strongly
 * type them as strings than as numbers and 
 */
export type RgbStrArray = [OptThreeDigit, OptThreeDigit, OptThreeDigit];
/**
 * Strong typing for a string representation of an RGB value which will look like:
 * 
 * ```ts
 * const color: RgbStr = "{ r: 0, g: 0, b: 0 }";
 * const colorSomeSpace: RgbStr = "{ r:0, g:0, b:0 }";
 * const colorNoSpace: RgbStr = "{r:0,g:0,b:0}";
 * ```
 * 
 * Note: due to TS limitations the `r` value MUST be hexadecimal and the broader 
 * structure much match but `g` and `b` can be any string value.
 */
export type RgbStr = `{${OptSpace}r:${OptSpace}${OptThreeDigit},${OptSpace}g:${OptSpace}${string},${OptSpace}b:${OptSpace}${string}}`;

/**
 * Provides strong but -- though not perfect -- type support for a hexadecimal 
 * representation of color.
 * 
 * ```ts
 * const color: HexColor = "F0A703";
 * ```
 * 
 * Note: the first four digits are forced to be valid hexadecimal digits; after that we revert
 * to just a plain string due to TS limitations on complexity.
 */
export type HexColor = `${Hexadecimal}${Hexadecimal}${Hexadecimal}${Hexadecimal}${string}`;

/**
 * A variant of the type `HexColor` which requires the Hexadecimal string to start with a
 * `#` character as is common in HTML.
 * 
 * ```ts
 * const color: HtmlHexColor = "#F0A703";
 * ```
 * 
 * Note: like `HexColor`, there is strong typing for first four (of six) Hexadecimal characters
 * but afterward it is typed as a simple string.
 */
export type HtmlHexColor = `#${HexColor}`;
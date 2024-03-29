import { OptSpace } from "./stringAliases";

export type integer = number;
export type int32 = number;
export type int64 = number;
export type float = number;

export type NumericCharacter = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
export type Hexadecimal = NumericCharacter | "A" | "B" | "C" | "D" | "E" | "F";

export type Digit = NumericCharacter;

export type TwoDigit = `${Digit}${Digit}`;
export type OptTwoDigit = Digit | TwoDigit;

export type ThreeDigit = `${Digit}${Digit}${Digit}`;
type MostSignificantDigit = "0" | "1" | "2";
export type OptThreeDigit = Digit | TwoDigit | ThreeDigit;

/**
 * Provides strong typing for an eight bit number, represented as a string.
 * First digit must be 0-3, remaining two digits can be whatever you like.
 *
 * Must be three digits. If you want to provide length flexibility use `OptEightBitBase10`
 * instead.
 */
export type EightBitBase10 = `${MostSignificantDigit}${Digit}${Digit}`;

/**
 * Provides strong typing for an eight bit number, represented as a string.
 * First digit -- in a three digit number -- is limited to "1" or "2" others
 * are any valid digit.
 */
export type OptEightBitBase10 =
  | `${Exclude<MostSignificantDigit, "0">}${Digit}${Digit}`
  | Digit
  | TwoDigit;

export type FourDigit = `${Digit}${Digit}${Digit}${Digit}`;
export type OptFourDigit = Digit | TwoDigit | ThreeDigit | FourDigit;

/** an aspect ration represented in the normal convention of "x:y" */
export type AspectRatioColon = `${number}:${number}`;
/** an aspect ratio represented in the CSS syntax */
export type AspectRatioCss = `${number}${OptSpace}/${OptSpace}${number}`;

/**
 * Allows the expression of an Aspect Ratio with both the standard "x:y"
 * convention _or_ the CSS variant of "a / y".
 */
export type AspectRatio = AspectRatioColon | AspectRatioCss;

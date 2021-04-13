export type sql = string;

export type NumericCharacter = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";

/**
 * A string representation of the common Type/SubType classification.
 */
export type TypeSubtype = `${string}/${string}`;

/**
 * A type guard to check that a string is of the type `TypeSubtype`
 */
export function isTypeSubtype(str: string): str is TypeSubtype {
  const parts = str.split("/");
  return parts.length === 2;
}

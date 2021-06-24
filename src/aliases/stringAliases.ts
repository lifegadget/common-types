export type sql = string;

/**
 * A string representation of the common Type/SubType classification.
 */
export type TypeSubtype<
  T extends string = string,
  S extends string = string
  > = `${T}/${S}`;

/**
 * Stages of development.
 *
 * Starting with "local" which is intended for local-only environment.
 * After that each stage typically indicates a _server_ based
 * environment your code should point to.
 */
export type DevelopmentStage<T extends string = ""> = "local" | "dev" | "prod" | "test" | "stage" & T;

export type OptSpace = "" | " ";

/**
 * Lowercase alphabetic character
 */
export type LowerAlpha = "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i" | "j" | "k" | "l" | "m" | "n" | "o" | "p" | "q" | "r" | "s" | "t" | "u" | "v" | "w" | "x" | "y" | "z";

/** Uppercase alphabetic character */
export type UpperAlpha = Uppercase<LowerAlpha>;

/**
 * An alphabetic character (upper or lower)
 */
export type Alpha = LowerAlpha | UpperAlpha;
export type sql = string;

export type NumericCharacter = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";

/**
 * A string representation of the common Type/SubType classification.
 */
export type TypeSubtype = `${string}/${string}`;

/**
 * Stages of development.
 *
 * Starting with "local" which is intended for local-only environment.
 * After that each stage typically indicates a _server_ based
 * environment your code should point to.
 */
export type DevelopmentStage = "local" | "dev" | "prod" | "test" | "stage";

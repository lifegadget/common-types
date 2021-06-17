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

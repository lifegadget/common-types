import { TypeSubtype } from "./aliases";

/**
 * A _type guard_ designed to test whether an input is of type `TypeSubtype`
 */
export function isTypeSubtype(input: unknown): input is TypeSubtype {
  return typeof input === "string" && input.split("/").length === 2;
}

/**
 * A type guard that checks whether an input is an "object" but also
 * _not_ `null`.
 *
 * This is useful test in its own right but can also be an important
 * building block for other type guards.
 */
export function isNonNullObject<T extends object>(input: unknown): input is T {
  return typeof input === "object" && input !== null;
}

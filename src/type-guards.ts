import { TypeSubtype } from "./aliases";

/**
 * A _type guard_ designed to test whether an input is of type `TypeSubtype`
 */
export function isTypeSubtype(input: unknown): input is TypeSubtype {
  return typeof input === "string" && input.split("/").length === 2;
}

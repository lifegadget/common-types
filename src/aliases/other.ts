/** a number which should represent a percentage value */
export type percentage = number;

export type scalar = string | number | boolean;

/** a object which has been serialized to a string in JSON notation */
export type JSONstring = string;

/** foreign key reference */
export type fk = string;
/** primary key reference */
export type pk = string;

/** universal resource locator */
export type url = string;
/** universal resource indicator */
export type uri = string;

/** an email address (alias to string) */
export type email = string;
/** a numeric value which is represented as a string */
export type numberAsString = string;

/**
 * A boolean value sometimes gets converted into a string
 * representation of "true" or "false"
 */
export type BooleanAsString = "true" | "false";

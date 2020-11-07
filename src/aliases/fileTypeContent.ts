/** a string blob that represents JSON structured data */
export type json = string;
/** a string blob that represents CSV structured data */
export type csv = string;

/** a _string_ variable which contains **Markdown** content */
export type markdown = string;
/** a _string_ variable which contains **HTML** content */
export type html = string;

/**
 * a _string_ which represents zipped content run through a base64
 * conversion process to a string
 */
export type Base64Zip = string;

/** a binary value (represented as a number in JS) */
export type binary = number;

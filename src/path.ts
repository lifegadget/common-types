import { createError } from "./errors/AppError";

// THIS IS A mildly TYPED VERSION OF NPM "iso-path-join"

var moreThanThreePeriods = /\.{3,}/g;

// polyfill Array.isArray if necessary
if (!Array.isArray) {
  (Array.isArray as any) = function(arg: any) {
    return Object.prototype.toString.call(arg) === "[object Array]";
  };
}

var errorStr =
  "tried to join something other than a string or array, it was ignored in pathJoin's result";

/**
 * An ISO-morphic path join that works everywhere;
 * all paths are separated by the `/` character and both
 * leading and trailing delimiters are stripped
 */
export function pathJoin(...args: any[]) {
  if (!args.every(i => ["string", "number"].includes(typeof i))) {
    const e: Error & { code?: string } = new Error(
      `Attempt to use pathJoin failed because some of the path parts were of the wrong type. Path parts must be either a string or an number`
    );
    e.code = "invalid-path-part";
    e.name = "pathJoin/invalid-path-part";
    throw e;
  }
  try {
    const reducer = function(agg: string, pathPart: string | number) {
      const parts = agg.split("/");
      parts.push(typeof pathPart === "number" ? String(pathPart) : pathPart);
      return parts.filter(i => i).join("/");
    };
    const result = args.reduce(reducer, "").replace(moreThanThreePeriods, ".."); // join the resulting array together
    return result.slice(-1) === "/" ? result.slice(0, result.length - 1) : result;
  } catch (e) {
    const err = createError("common-types/pathJoin", e.message, e);
    throw err;
  }
}

function joinStringsWithSlash(str1: string, str2: string) {
  const str1isEmpty = !str1.length;
  const str1EndsInSlash = str1[str1.length - 1] === "/";
  const str2StartsWithSlash = str2[0] === "/";
  var res =
    (str1EndsInSlash && str2StartsWithSlash && str1 + str2.slice(1)) ||
    (!str1EndsInSlash && !str2StartsWithSlash && !str1isEmpty && str1 + "/" + str2) ||
    str1 + str2;
  return res;
}

/** converts a slash delimited filepath to a dot notation path */
export function dotNotation(input: string) {
  return input.replace(/\//g, ".");
}

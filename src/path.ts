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

/** An ISO-morphic path join that works everywhere */
export function pathJoin(...args: any[]) {
  return args
    .reduce(function(prev: string, val: string) {
      if (typeof prev === "undefined") return;

      return typeof val === "string" || typeof val === "number"
        ? joinStringsWithSlash(prev, "" + val) // if string or number just keep as is
        : Array.isArray(val)
          ? joinStringsWithSlash(prev, pathJoin.apply(null, val)) // handle array with recursion
          : false;
    }, "")
    .replace(moreThanThreePeriods, ".."); // join the resulting array together
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

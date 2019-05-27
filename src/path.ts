import { createError } from "./errors/AppError";

var moreThanThreePeriods = /\.{3,}/g;

// polyfill Array.isArray if necessary
if (!Array.isArray) {
  (Array.isArray as any) = function(arg: any) {
    return Object.prototype.toString.call(arg) === "[object Array]";
  };
}

export interface IStackFrame {
  fn: string;
  line: number;
  col: number;
  filePath?: string;
  file: string;
}

export function parseStack(
  stack: string,
  ignorePatterns: string[] = ["mocha/lib"],
  limit?: number
) {
  const structured = stack
    .replace(/Error.*?at/, "at")
    .replace(
      /at (\S*) \(([^\0]*?)\:([0-9]*?)\:([0-9]*)\)/g,
      '{ fn: "$1", line: $3, col: $4, file: "$2" },'
    );
  let parsed: IStackFrame[];
  try {
    parsed = JSON.parse(structured).filter((i: IStackFrame) => {
      let result = true;
      ignorePatterns.forEach(pattern => {
        if (i.fn.includes(pattern) || i.file.includes(pattern)) {
          result = false;
        }
      });
      return result;
    });
    // .map((i: IStackFrame) => {
    //   const parts = i.file.split("/");
    //   const start = Math.max(parts.length, 0);
    //   i.file = parts.slice(start, parts.length - start).join("/");
    //   return i;
    // });
    if (limit) {
      parsed = parsed.slice(0, limit);
    }
  } catch (e) {
    console.log(e.message);
  }

  return parsed ? parsed : structured;
}

/**
 * An ISO-morphic path join that works everywhere;
 * all paths are separated by the `/` character and both
 * leading and trailing delimiters are stripped
 */
export function pathJoin(...args: any[]) {
  if (!args.every(i => !["undefined"].includes(typeof i))) {
    let problems: Array<{ type: string; position: number }> = [];
    args = args.filter((v, i) => {
      if (!v) {
        problems.push({ type: typeof v, position: i });
      }
      return v;
    });
    // const stack = parseStack(new Error().stack, ["mocha/lib", "Object.pathJoin"]);

    console.warn(
      `pathJoin(...args) was called with ${
        problems.length
      } undefined values. Undefined values will be ignored but may indicate a hidden problem. [ ${problems
        .map(i => `${i.type}@${i.position}`)
        .join(", ")} ]`
    );
  }
  if (!args.every(i => ["string", "number"].includes(typeof i))) {
    const e: Error & { code?: string } = new Error(
      `Attempt to use pathJoin failed because some of the path parts were of the wrong type. Path parts must be either a string or an number: ${args.map(
        i => typeof i
      )}`
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

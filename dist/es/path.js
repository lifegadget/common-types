import { PathJoinError } from "./errors/PathJoinError";
import { parseStack } from "./parseStack";
var moreThanThreePeriods = /\.{3,}/g;
// polyfill Array.isArray if necessary
if (!Array.isArray) {
    Array.isArray = function (arg) {
        return Object.prototype.toString.call(arg) === "[object Array]";
    };
}
function getStackInfo() {
    // GET stack info
    try {
        const result = parseStack(new Error().stack, {
            ignorePatterns: ["mocha/lib", "timers.js", "runners/node"]
        }).slice(1);
        return result;
    }
    catch (e) {
        return [];
    }
}
/**
 * An ISO-morphic path join that works everywhere;
 * all paths are separated by the `/` character and both
 * leading and trailing delimiters are stripped
 */
export function pathJoin(...args) {
    // strip undefined segments
    if (!args.every(i => !["undefined"].includes(typeof i))) {
        args = args.filter(a => a);
    }
    // remaining invalid types
    if (!args.every(i => ["string", "number"].includes(typeof i))) {
        throw new PathJoinError("invalid-path-part", `Attempt to use pathJoin() failed because some of the path parts were of the wrong type. Path parts must be either a string or an number: ${args.map(i => typeof i)}`);
    }
    // JOIN paths
    try {
        const reducer = function (agg, pathPart) {
            let { protocol, parts } = pullOutProtocols(agg);
            parts.push(typeof pathPart === "number"
                ? String(pathPart)
                : stripSlashesAtExtremities(pathPart));
            return protocol + parts.filter(i => i).join("/");
        };
        const result = removeSingleDotExceptToStart(doubleDotOnlyToStart(args.reduce(reducer, "").replace(moreThanThreePeriods, "..")));
        return result;
    }
    catch (e) {
        if (e.name.includes("pathJoin")) {
            throw e;
        }
        else {
            throw new PathJoinError(e.name || "unknown", e.message);
        }
    }
}
function pullOutProtocols(content) {
    const protocols = ["https://", "http://", "file://", "tel://"];
    let protocol = "";
    protocols.forEach(p => {
        if (content.includes(p)) {
            protocol = p;
            content = content.replace(p, "");
        }
    });
    return { protocol, parts: content.split("/") };
}
function stripSlashesAtExtremities(pathPart) {
    const front = pathPart.slice(0, 1) === "/" ? pathPart.slice(1) : pathPart;
    const back = front.slice(-1) === "/" ? front.slice(0, front.length - 1) : front;
    return back.slice(0, 1) === "/" || back.slice(-1) === "/"
        ? stripSlashesAtExtremities(back)
        : back;
}
/**
 * checks to ensure that a ".." path notation is only employed at the
 * very start of the path or else throws an error
 */
function doubleDotOnlyToStart(path) {
    if (path.slice(2).includes("..")) {
        throw new PathJoinError("not-allowed", `The path "${path}" is not allowed because it  has ".." in it. This notation is fine at the beginning of a path but no where else.`);
    }
    return path;
}
/**
 * removes `./` in path parts other than leading segment
 */
function removeSingleDotExceptToStart(path) {
    let parts = path.split("/");
    return (parts[0] +
        "/" +
        parts
            .slice(1)
            .filter(i => i !== ".")
            .join("/"));
}
function joinStringsWithSlash(str1, str2) {
    const str1isEmpty = !str1.length;
    const str1EndsInSlash = str1[str1.length - 1] === "/";
    const str2StartsWithSlash = str2[0] === "/";
    var res = (str1EndsInSlash && str2StartsWithSlash && str1 + str2.slice(1)) ||
        (!str1EndsInSlash &&
            !str2StartsWithSlash &&
            !str1isEmpty &&
            str1 + "/" + str2) ||
        str1 + str2;
    return res;
}
/** converts a slash delimited filepath to a dot notation path */
export function dotNotation(input) {
    return input.replace(/\//g, ".");
}

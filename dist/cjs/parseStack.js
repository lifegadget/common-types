"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseStack = void 0;
const ParseStackError_1 = require("./errors/ParseStackError");
function separateFileAndFilepath(fileinfo) {
    const parts = fileinfo.split("/");
    return parts.length < 2
        ? { file: fileinfo, filePath: "" }
        : { file: parts.pop(), filePath: parts.slice(0, parts.length - 1).join("/") };
}
function fileMapper(i) {
    const { file, filePath } = separateFileAndFilepath(i.file);
    i.file = file;
    if (filePath) {
        i.filePath = filePath;
        i.shortPath = filePath
            .split("/")
            .slice(-3)
            .join("/");
    }
    return i;
}
/**
 * parses an Error's `stack` property into a structured
 * object. Optionally allowing for filtering and size limiting
 */
function parseStack(
/** the default stack trace string */
stack, options = {}) {
    const ignorePatterns = options.ignorePatterns || [];
    const limit = options.limit;
    const structured = stack
        .replace(/Error.*\n.*?at/, " at")
        .replace(/at (\S*) \(([^\0]*?)\:([0-9]*?)\:([0-9]*)\)| at (\/.*?)\:([0-9]*?)\:([0-9]*)/g, '{ "fn": "$1", "line": $3$6, "col": $4$7, "file": "$2$5" },');
    let parsed;
    try {
        parsed = JSON.parse(`[ ${structured.replace(/\,$/, "")} ]`)
            .filter((i) => {
            let result = true;
            ignorePatterns.forEach(pattern => {
                if (i.fn.includes(pattern) || i.file.includes(pattern)) {
                    result = false;
                }
            });
            return result;
        })
            .map(fileMapper);
        if (limit) {
            parsed = parsed.slice(0, limit);
        }
    }
    catch (e) {
        throw new ParseStackError_1.ParseStackError("parsing-error", e.message, stack, structured);
    }
    return parsed;
}
exports.parseStack = parseStack;

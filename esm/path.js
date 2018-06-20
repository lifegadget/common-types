var moreThanThreePeriods = /\.{3,}/g;
if (!Array.isArray) {
    Array.isArray = function (arg) {
        return Object.prototype.toString.call(arg) === "[object Array]";
    };
}
var errorStr = "tried to join something other than a string or array, it was ignored in pathJoin's result";
export function pathJoin() {
    return Array.prototype.slice
        .call(arguments)
        .reduce(function (prev, val) {
        if (typeof prev === "undefined")
            return;
        return typeof val === "string" || typeof val === "number"
            ? joinStringsWithSlash(prev, "" + val)
            : Array.isArray(val)
                ? joinStringsWithSlash(prev, pathJoin.apply(null, val))
                : (console.error ? console.error(errorStr) : console.log(errorStr)) || "";
    }, "")
        .replace(moreThanThreePeriods, "..");
}
function joinStringsWithSlash(str1, str2) {
    const str1isEmpty = !str1.length;
    const str1EndsInSlash = str1[str1.length - 1] === "/";
    const str2StartsWithSlash = str2[0] === "/";
    var res = (str1EndsInSlash && str2StartsWithSlash && str1 + str2.slice(1)) ||
        (!str1EndsInSlash && !str2StartsWithSlash && !str1isEmpty && str1 + "/" + str2) ||
        str1 + str2;
    return res;
}

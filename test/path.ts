import { pathJoin, dotNotation } from "../src/path";

console.log(pathJoin("foo", "bar", "baz"));
console.log(pathJoin("foo/", "/bar", "baz/"));
console.log(pathJoin("/foo/", "/bar", "baz/"));
console.log(dotNotation(pathJoin("foo", "/bar", "baz/")));

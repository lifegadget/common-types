"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk = require("chalk");
var STAGE;
(function (STAGE) {
    STAGE["prod"] = "prod";
    STAGE["stage"] = "stage";
    STAGE["test"] = "test";
    STAGE["dev"] = "dev";
    STAGE["production"] = "prod";
    STAGE["staging"] = "stage";
    STAGE["testing"] = "test";
    STAGE["development"] = "dev";
})(STAGE = exports.STAGE || (exports.STAGE = {}));
var FirebaseEvent;
(function (FirebaseEvent) {
    FirebaseEvent["value"] = "value";
    FirebaseEvent["child_added"] = "child_added";
    FirebaseEvent["child_moved"] = "child_moved";
    FirebaseEvent["child_removed"] = "child_removed";
    FirebaseEvent["child_changed"] = "child_changed";
})(FirebaseEvent = exports.FirebaseEvent || (exports.FirebaseEvent = {}));
class VerboseError extends Error {
    static stackParser(err) {
        return undefined;
    }
    /**
     * If you want to use a library like stack-trace(node) or stacktrace-js(client) add in the "get"
     * function that they provide
     */
    static setStackParser(fn) {
        VerboseError.stackParser = fn;
    }
    constructor(err, ...args) {
        super(...args);
        this.code = err.code;
        this.message = err.message;
        this.module = err.module;
        this.function = err.function;
        const stackFrames = VerboseError.stackParser(this);
        if (stackFrames) {
            this.stackFrames = stackFrames.filter(frame => (frame.getFileName() || "").indexOf("common-types") === -1);
            this.function = stackFrames[0].getMethodName();
            this.stack =
                this.message +
                    "\n\n" +
                    this.stackFrames
                        .map(frame => {
                        const isNative = typeof frame.isNative === "function"
                            ? frame.isNative()
                            : frame.isNative;
                        const colorize = (content) => VerboseError.useColor && isNative
                            ? chalk.grey.italic(content)
                            : content;
                        const className = frame.getTypeName()
                            ? frame.getTypeName() + " → "
                            : "";
                        const functionName = frame.getMethodName() || frame.getFunctionName() || "<anonymous>";
                        const classAndFunction = VerboseError.useColor
                            ? chalk.bold(`${className}${functionName}`)
                            : `${className}${functionName}`;
                        const fileName = (frame.getFileName() || "")
                            .split("/")
                            .slice(-1 * VerboseError.filePathDepth)
                            .join("/");
                        const details = isNative
                            ? "( native function )"
                            : `[ line ${frame.getLineNumber()}, col ${frame.getColumnNumber()} in ${fileName} ]`;
                        return colorize(`\t at ${classAndFunction} ${details}`);
                    })
                        .join("\n");
        }
        else {
            this.stack = this.stack
                .split("\n")
                .filter(line => line.indexOf("VerboseError") === -1)
                .join("\n");
        }
    }
    toString() {
        return this.message + this.stack;
    }
    toJSON() {
        return JSON.stringify(this.toObject(), null, 2);
    }
    toObject() {
        return {
            code: this.code,
            message: this.message,
            module: this.module
        };
    }
}
exports.VerboseError = VerboseError;
//# sourceMappingURL=common-types.js.map
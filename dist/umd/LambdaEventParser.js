(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./aws"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LambdaEventParser = void 0;
    const aws_1 = require("./aws");
    /**
     * **LambdaEventParser**
     *
     * Ensures that the _typed_ `request` is separated from a possible Proxy Integration
     * Request that would have originated from API Gateway; also returns the `apiGateway`
     * payload with the "body" removed (as it would be redundant to the request).
     *
     * Typical usage is:
     *
    ```typescript
    const { request, apiGateway } = LambdaEventParser.parse(event);
    ```
     *
     * this signature is intended to mimic the `LambdaSequence.from(event)` API but
     * without the parsing of a `sequence` property being extracted.
     *
     */
    class LambdaEventParser {
        /**
         * **parse**
         *
         * A static method which returns an object with both `request` and `apiGateway`
         * properties. The `request` is typed to **T** and the `apiGateway` will be a
         * `IAWSLambdaProxyIntegrationRequest` object with the "body" removed _if_
         * the event came from **API Gateway** otherwise it will be undefined.
         */
        static parse(event) {
            const request = aws_1.isLambdaProxyRequest(event)
                ? JSON.parse(event.body)
                : event;
            if (aws_1.isLambdaProxyRequest(event)) {
                delete event.body;
            }
            else {
                event = undefined;
            }
            return {
                request,
                apiGateway: event
            };
        }
    }
    exports.LambdaEventParser = LambdaEventParser;
});

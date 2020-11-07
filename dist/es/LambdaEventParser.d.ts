import { IAWSLambdaProxyIntegrationRequest } from "./aws";
import { IDictionary } from "./basics";
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
export declare class LambdaEventParser {
    /**
     * **parse**
     *
     * A static method which returns an object with both `request` and `apiGateway`
     * properties. The `request` is typed to **T** and the `apiGateway` will be a
     * `IAWSLambdaProxyIntegrationRequest` object with the "body" removed _if_
     * the event came from **API Gateway** otherwise it will be undefined.
     *
     * @deprecated `common-types` should not have run-time code out of a the exception
     * case of **enum** values and _type guards_.
     */
    static parse<T extends IDictionary = IDictionary>(event: T | IAWSLambdaProxyIntegrationRequest): T | {
        request: T;
        apiGateway: Pick<IAWSLambdaProxyIntegrationRequest, "resource" | "path" | "httpMethod" | "headers" | "queryStringParameters" | "pathParameters" | "requestContext" | "isBase64Encoded">;
    };
}

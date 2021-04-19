import {
  IAwsGatewayRequest,
  IAwsLambdaContext,
  IAwsLambdaProxyIntegrationRequest,
  IAwsLambdaProxyIntegrationRequestHeaders,
  isLambdaProxyRequest,
  IAwsLambdaProxyClientCert,
  IAwsLambdaProxyJwtAuthorizer,
  IAwsCloudWatchLogEvent,
  IAwsApiGatewayResponse,
} from "./aws";
import { IAwsApiGatewayErrorResponse } from "./aws/aws";
import { IAwsLayerVersion } from "./aws/aws-layers";
import { IDictionary, Omit } from "./basics";
import { IServerlessYaml } from "./serverless";

/**
 * @deprecated prefer `IServerlessYaml` over this
 */
export type IServerlessConfig = IServerlessYaml;

/**
 * @deprecated the `common-types` repo is moving toward a zero implementation target
 * and this class does not fit the goals for this repo. Expect this to be removed in
 * the next release.
 * 
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
export class LambdaEventParser {
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
  public static parse<T extends IDictionary = IDictionary>(
    event: T | IAwsLambdaProxyIntegrationRequest
  ) {
    const request = isLambdaProxyRequest(event) ? (JSON.parse(event.body) as T) : event;

    return isLambdaProxyRequest(event)
      ? {
          request: JSON.parse(event.body) as T,
          apiGateway: event as Omit<IAwsLambdaProxyIntegrationRequest, "body">,
        }
      : request;
  }
}

/**
 * @deprecated this incorrect spelling will be removed in favor of the
 * correct spelling and consistent use of caps. Going forward prefer `IAwsLambdaContext`.
 */
export type IAWSLambaContext = IAwsLambdaContext;

/**
 * @deprecated use `IAwsApiGatewayResponse` instead.
 */
export type IApiGatewayResponse = IAwsApiGatewayResponse;

/**
 * @deprecated use `IAwsLambdaProxyIntegrationRequestHeaders` instead.
 */
export type IAWSLambdaProxyIntegrationRequestHeaders = IAwsLambdaProxyIntegrationRequestHeaders;

/**
 * @deprecated use `IAwsLambdaProxyIntegrationRequest` instead.
 */
export type IAWSLambdaProxyIntegrationRequest = IAwsLambdaProxyIntegrationRequest;

/**
 * @deprecated use `IAwsLambdaProxyIntegrationRequest` instead.
 */
export type IAWSLambdaProxyClientCert = IAwsLambdaProxyClientCert;

/**
 * @deprecated use `IAwsLambdaProxyJwtAuthorizer` instead.
 */
export type IAWSLambdaProxyJwtAuthorizer = IAwsLambdaProxyJwtAuthorizer;

/**
 * @deprecated use `IAwsGatewayRequest` instead.
 */
export type IAWSGatewayRequest = IAwsGatewayRequest;

/**
 * @deprecated use `IAwsApiGatewayErrorResponse` instead.
 */
export type IApiGatewayErrorResponse = IAwsApiGatewayErrorResponse;

/**
 * @deprecated use `IAwsLayerVersion` instead.
 */
export type IAWSLayerVersion = IAwsLayerVersion;

/**
 * @deprecated use `IAwsCloudWatchLogEvent` instead.
 */
export type ICloudWatchLogEvent = IAwsCloudWatchLogEvent;

/** @deprecated this symbol should NOT be used; it was
 * included in the past when this package mistakenly
 * tried to take on error handling in a way that had
 * implementation details included.*/
export interface IStackFrame {
  fn: string;
  line: number;
  col: number;
  filePath?: string;
  shortPath?: string;
  file: string;
}

/** @deprecated */
function separateFileAndFilepath(fileinfo: string) {
  const parts = fileinfo.split("/");
  return parts.length < 2
    ? { file: fileinfo, filePath: "" }
    : { file: parts.pop(), filePath: parts.slice(0, parts.length - 1).join("/") };
}

/** @deprecated */
function fileMapper(i: IStackFrame) {
  const { file, filePath } = separateFileAndFilepath(i.file);
  i.file = file as string;
  if (filePath) {
    i.filePath = filePath;
    i.shortPath = filePath.split("/").slice(-3).join("/");
  }
  return i;
}

/** @deprecated */
export interface IParseStackOptions {
  /**
   * state text to look for in the function name or file
   * name and filter out if found
   */
  ignorePatterns?: string[];
  /**
   * optionally specify the max depth of the stack
   * trace you want
   */
  limit?: number;
}

/** @deprecated */
export function parseStack(
  /** the default stack trace string */
  stack: string,
  options: any = {}
): IStackFrame[] {
  const ignorePatterns = options.ignorePatterns || [];
  const limit = options.limit;
  const structured = stack
    .replace(/Error.*\n.*?at/, " at")
    .replace(
      /at (\S*) \(([^\0]*?)\:([0-9]*?)\:([0-9]*)\)| at (\/.*?)\:([0-9]*?)\:([0-9]*)/g,
      '{ "fn": "$1", "line": $3$6, "col": $4$7, "file": "$2$5" },'
    );

  let parsed: IStackFrame[];
  try {
    parsed = JSON.parse(`[ ${structured.replace(/\,$/, "")} ]`)
      .filter((i: IStackFrame) => {
        let result = true;
        ignorePatterns.forEach((pattern: any) => {
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
  } catch (e) {
    e.message = `parsing-error: ${e.message}}`;
    throw e;
  }

  return parsed;
}

/**
 * @deprecated the `common-types` repo is moving as close to zero config as we can and this function does not
 * fit with it's focus.
 *
 * **getBodyFromPossibleLambdaProxyRequest**
 *
 * Returns the message body/payload regardless of whether Lambda was called by API Gateway's LambdaProxy
 * or from another Lambda function.
 *
 * @param input either a [Lambda Proxy Request](https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html)
 * or type `T` as defined by consumer
 * @return type of `T`
 */
export function getBodyFromPossibleLambdaProxyRequest<T>(
  input: T | IAwsLambdaProxyIntegrationRequest
): T {
  return isLambdaProxyRequest<T>(input) ? (JSON.parse(input.body) as T) : (input as T);
}

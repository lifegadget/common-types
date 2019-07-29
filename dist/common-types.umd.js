(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global['common-types'] = {}));
}(this, function (exports) { 'use strict';

  (function (ApiGatewayStatusCode) {
      ApiGatewayStatusCode[ApiGatewayStatusCode["Success"] = 200] = "Success";
      ApiGatewayStatusCode[ApiGatewayStatusCode["BadRequest"] = 400] = "BadRequest";
      ApiGatewayStatusCode[ApiGatewayStatusCode["Unauthorized"] = 401] = "Unauthorized";
      ApiGatewayStatusCode[ApiGatewayStatusCode["Forbidden"] = 403] = "Forbidden";
      ApiGatewayStatusCode[ApiGatewayStatusCode["NotFound"] = 404] = "NotFound";
      ApiGatewayStatusCode[ApiGatewayStatusCode["UnprocessableEntity"] = 422] = "UnprocessableEntity";
      ApiGatewayStatusCode[ApiGatewayStatusCode["InternalServerError"] = 500] = "InternalServerError";
      ApiGatewayStatusCode[ApiGatewayStatusCode["BadGateway"] = 502] = "BadGateway";
      ApiGatewayStatusCode[ApiGatewayStatusCode["GatewayTimeout"] = 504] = "GatewayTimeout";
  })(exports.ApiGatewayStatusCode || (exports.ApiGatewayStatusCode = {}));
  /**
   * Provides a logical test to see if the passed in event is a LambdaProxy request or just a
   * straight JS object response. This is useful when you have both an HTTP event and a Lambda-to-Lambda
   * or Step-Function-to-Lambda interaction.
   *
   * @param message the body of the request (which is either of type T or a LambdaProxy event)
   */
  function isLambdaProxyRequest(message) {
      return typeof message === "object" &&
          message.headers &&
          message.body
          ? true
          : false;
  }
  function parsed(input) {
      try {
          const output = JSON.parse(input.body.replace(/[\n\t]/g, ""));
          return output;
      }
      catch (e) {
          const err = apiGatewayError(400, `The body of the POST message is meant to contain a valid JSON stringified object but there were problems parsing it: ${e.message}`);
          throw err;
      }
  }
  /**
   * **getBodyFromPossibleLambdaProxyRequest**
   *
   * Returns the message body/payload regardless of whether Lambda was called by API Gateway's LambdaProxy
   * or from another Lambda function.
   *
   * @param input either a [Lambda Proxy Request](https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html)
   * or type `T` as defined by consumer
   * @return type of `T`
   */
  function getBodyFromPossibleLambdaProxyRequest(input) {
      return isLambdaProxyRequest(input) ? parsed(input) : input;
  }

  function stackTrace(trace) {
      return trace ? trace.split("\n") : [];
  }

  function createError(fullName, message, priorError) {
      const messagePrefix = `[${fullName}] `;
      const e = new AppError(!priorError
          ? messagePrefix + message
          : messagePrefix + priorError.message + message);
      e.name = priorError ? priorError.code || priorError.name : fullName;
      const parts = fullName.split("/");
      e.code = [...parts].pop();
      e.stack = priorError
          ? priorError.stack ||
              stackTrace(e.stack)
                  .slice(2)
                  .join("\n")
          : stackTrace(e.stack)
              .slice(2)
              .join("\n");
      return e;
  }
  class AppError extends Error {
  }

  function apiGatewayError(code, message, priorError) {
      const messagePrefix = `[${code}] `;
      const e = new ApiGatewayError(priorError ? priorError.message : "");
      e.errorMessage = !priorError
          ? messagePrefix + message
          : messagePrefix + priorError.message + message;
      e.name = priorError ? priorError.name : "ApiGatewayError";
      e.errorCode = code;
      e.stack = priorError
          ? priorError.stack ||
              stackTrace(e.stack)
                  .slice(2)
                  .join("\n")
          : stackTrace(e.stack)
              .slice(2)
              .join("\n");
      return e;
  }
  class ApiGatewayError extends Error {
  }

  /** provides a friendly way to pause execution when using async/await symantics */
  async function wait(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
  }

  class PathJoinError extends Error {
      constructor(code, message) {
          super();
          this.message = `[pathJoin/${code}] ` + message;
          this.code = code;
          this.name = `pathJoin/${code}`;
      }
  }

  class ParseStackError extends Error {
      constructor(code, message, originalString, structuredString) {
          super();
          this.originalString = originalString;
          this.structuredString = structuredString;
          this.message = `[parseStack/${code}] ` + message;
          this.code = code;
          this.name = `parseStack/${code}`;
      }
  }

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
          throw new ParseStackError("parsing-error", e.message, stack, structured);
      }
      return parsed;
  }

  var moreThanThreePeriods = /\.{3,}/g;
  // polyfill Array.isArray if necessary
  if (!Array.isArray) {
      Array.isArray = function (arg) {
          return Object.prototype.toString.call(arg) === "[object Array]";
      };
  }
  /**
   * An ISO-morphic path join that works everywhere;
   * all paths are separated by the `/` character and both
   * leading and trailing delimiters are stripped
   */
  function pathJoin(...args) {
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
  /** converts a slash delimited filepath to a dot notation path */
  function dotNotation(input) {
      return input.replace(/\//g, ".");
  }

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
          const request = isLambdaProxyRequest(event) ? JSON.parse(event.body) : event;
          if (isLambdaProxyRequest(event)) {
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

  function createBindDeploymentConfig(config, methodSettings) {
      const defaultMethodSettings = [
          {
              DataTraceEnabled: true,
              HttpMethod: "*",
              LoggingLevel: "INFO",
              ResourcePath: "/*",
              MetricsEnabled: true
          }
      ];
      const stageName = `${config.service}-${config.stage}`;
      const defaultConfig = {
          resources: {
              Resources: {
                  PathMapping: {
                      Type: "AWS::ApiGateway::BasePathMapping",
                      DependsOn: "ApiGatewayStage",
                      Properties: {
                          DomainName: config.domainName ? config.domainName : undefined,
                          RestApiId: {
                              Ref: "ApiGatewayRestApi"
                          },
                          Stage: stageName
                      }
                  },
                  __deployment__: {
                      Properties: {
                          Description: "(default deployment description)"
                      }
                  },
                  ApiGatewayStage: {
                      Type: "AWS::ApiGateway::Stage",
                      Properties: {
                          DeploymentId: {
                              Ref: "__deployment__"
                          },
                          RestApiId: {
                              Ref: "ApiGatewayRestApi"
                          },
                          StageName: stageName,
                          MethodSettings: methodSettings || defaultMethodSettings
                      }
                  }
              }
          }
      };
      return Object.assign({}, defaultConfig, config);
  }

  exports.ApiGatewayError = ApiGatewayError;
  exports.AppError = AppError;
  exports.LambdaEventParser = LambdaEventParser;
  exports.apiGatewayError = apiGatewayError;
  exports.createBindDeploymentConfig = createBindDeploymentConfig;
  exports.createError = createError;
  exports.dotNotation = dotNotation;
  exports.getBodyFromPossibleLambdaProxyRequest = getBodyFromPossibleLambdaProxyRequest;
  exports.isLambdaProxyRequest = isLambdaProxyRequest;
  exports.parseStack = parseStack;
  exports.pathJoin = pathJoin;
  exports.wait = wait;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=common-types.umd.js.map

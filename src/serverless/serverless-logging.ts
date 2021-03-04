import { JSONstring } from "../aliases";

export interface IServerlessLogging {
  /**
   * Optional configuration which specifies if API Gateway logs are used.
   * This can either be set to `true` to use defaults, or configured via subproperties.
   */
  restApi?: IRestApiLogging;
  /**
   * Optional configuration which specifies if Websocket logs are used.
   * This can either be set to `true` to use defaults, or configured
   * via subproperties
   */
  websocket?: IWebsocketLogging;
  httpApi?: IHttpApiLogging;
}

export type IRestApiLogging =
  | true
  | {
      /** Optional configuration which enables or disables access logging. Defaults to true */
      accessLogging?: boolean;
      /** Optional configuration which specifies the log format to use for access logging */
      format?: string;
      /** Optional configuration which enables or disables execution logging. Defaults to true. */
      executionLogging?: boolean;
      /**
       * Optional configuration which specifies the log level to use for execution logging.
       * May be set to either INFO or ERROR.
       */
      level?: "INFO" | "ERROR";
      /**
       * Optional configuration which specifies whether or not to log full requests/responses
       * for execution logging. Defaults to true.
       */
      fullExecutionData?: boolean;
      /**
       * Existing IAM role for ApiGateway to use when managing CloudWatch Logs. If 'role' is not
       * configured, a new role is automatically created.
       */
      role?: string;
      /**
       * Specifies whether the ApiGateway CloudWatch Logs role setting is not managed by Serverless.
       * Defaults to false.
       */
      roleManagedExternally?: boolean;
    };

export type IHttpApiLogging =
  | true
  | {
      /**
       * Change the format of the logs being written to Cloudwatch. As an example, the
       * default format (which you get when setting to `true`) is:
       *
       * ```json
       * {
       *  "requestId":"$context.requestId",
       *  "ip": "$context.identity.sourceIp",
       *  "requestTime":"$context.requestTime",
       *  "httpMethod":"$context.httpMethod",
       *  "routeKey":"$context.routeKey",
       *  "status":"$context.status",
       *  "protocol":"$context.protocol",
       *  "responseLength":"$context.responseLength"
       * }
       * ```
       */
      format: JSONstring;
    };

export type IWebsocketLogging =
  | true
  | {
      level: "INFO" | "ERROR";
    };

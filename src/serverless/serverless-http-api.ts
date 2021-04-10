import { RestMethod } from "../aws";
import { seconds } from "../aliases/datetime";
import { YamlExpression } from "./serverless-global";

/**
 * In it's most basic form, an HTTP API can be
 * defined simply by a string. Examples include:
 *
 * ```typescript
 * functions: {
 *   foobar: {
 *    handler: 'foobar.handler',
 *    events: {
 *      httpApi: "PATCH /foobar"
 *     }
 *   }
 * }
 *
 * For more information see the [**Serverless** docs](https://serverless.com/framework/docs/providers/aws/events/http-api/#http-api)
 * ```
 */
export type IHttpApiSimple = string;

/**
 * Beyond the simple string based signature, an HTTP API can be defined by a more
 * complex format which might look something like:
 *
 * ```typescript
 * const fns:  = functions: {
 *   foobar: {
 *    handler: 'foobar.handler',
 *    events: {
 *      httpApi: {
 *        method: 'GET',
 *        path: '/my/endpoint/{id}',
 *        cors: true
 *      }
 *     }
 *   }
 * }
 * ```
 *
 * For more information see the [**Serverless** docs](https://serverless.com/framework/docs/providers/aws/events/http-api/#http-api)
 */
export interface IHttpApiComplex {
  /** the RESTful verb or the `*` wildcard character for _catch-alls_ */
  method: RestMethod | "*";
  /**
   * the path to the endpoint; this can include use of `{` / `}` characters to represent
   * dynamic segments
   */
  path: string;
  /**
   * Setting to `true` turns on the _default_ configuration ( see
   * [docs](https://serverless.com/framework/docs/providers/aws/events/http-api#cors-setup) );
   * you can also set this manually with finer resolution, for instance:
   *
   *
   */
  cors?: boolean | IHttpApiCors;
  /** add a custom authorizer for the endpoint */
  authorizer?: IHttpApiAuthorizer;
  /**
   * Turn on access logging for a given endpoint.
   *
   * > **Note:** if you want to configure the logs then you should
   * refer to the `IHttpApiLogging` type and configure this in the
   * **provider** section.
   */
  logs?: boolean;
}

/**
 * If you want to take control over your CORs configuration
 * (versus just accepting the default config) you can use this
 * interface. For more info see the [docs](https://serverless.com/framework/docs/providers/aws/events/http-api#cors-setup)
 */
export interface IHttpApiCors {
  allowedOrigins?: string[] | YamlExpression;
  allowedHeaders?: string[];
  allowedMethods?: RestMethod[];
  allowCredentials?: boolean;
  exposedResponseHeaders?: string[];
  maxAge?: seconds;
}

export interface IHttpApiAuthorizer {
  name: string;
  scopes?: string[];
}

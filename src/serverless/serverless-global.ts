import { IDictionary } from "../basics";
import { IServerlessApiGatewayLoggingConfig } from "../serverless-plugins";
import { ILayerDefinition, IServerlessConfigCustom } from "./serverless";
import {
  IArnStringReference,
  ICloudformationReference,
  IServerlessFunction,
} from "./serverless-function";
import { IServerlessLogging } from "./serverless-logging";
import { IServerlessPackage } from "./serverless-package";
import { IServerlessProvider } from "./serverless-provider";
import { IServerlessResources } from "./serverless-resources";
import { IServerlessTracing } from "./serverless-tracing";
import { IStateMachine } from "./step-functions";

export interface IServerlessConfig<T = IServerlessConfigCustom>
  extends IServerlessRootConfig {
  package: IServerlessPackage;
  custom?: T;
  plugins?: string[];
  provider: IServerlessProvider;
  resources?: IServerlessResources;
  functions?: Record<string, IServerlessFunction>;
  stepFunctions?: {
    stateMachines: Record<string, IStateMachine>;
    activities?: string[];
  };
  layers?: IArnStringReference[] | ICloudformationReference[] | ILayerDefinition;
  logs?: IServerlessLogging;
  tracing?: IServerlessTracing;
}

export interface IServerlessRootConfig {
  service: string | { name: string };
  /** the major version of the serverless framework being used; defaults to 2 */
  frameworkVersion?: 1 | 2;
  /**
   * Modes for config validation. `error` throws an exception, `warn` logs error to console,
   * `off` disables validation at all. The default is warn.
   */
  configValidationMode?: "error" | "warn" | "off";
  /**
   * If set to 'true', guarantees that it's a locally (for service, in its node_modules) installed
   * framework which processes the command
   */
  enableLocalInstallationFallback?: boolean;
  /**
   * If set to 'true', environment variables will be automatically loaded from .env files
   */
  useDotenv?: boolean;
  /**
   * To crash on variable resolution errors (as coming from new resolver),
   * set this value to "20210219".
   */
  variablesResolutionMode?: null | "20210219";
  /**
   * If set to 'error', references to variables that cannot be resolved will result in an error
   * being thrown (applies to legacy resolver)
   */
  unresolvedVariablesNotificationMode?: "warn" | "error";
  /** Disable deprecation logs by their codes. Default is empty. */
  disableDeprecations?: undefined | "DEP_CODE_1" | "*";
}

import { IDictionary } from "../basics";
import { IApiGatewayAliasConfig } from "../serverless-plugins/serverless-alias-plugin";
import { arn } from "../aws";
import { IServerlessEvent } from "./serverless-events";
import { IStateMachine } from "./step-functions";

/** A typing for the serverless framework's "serverless.yml" file */

export type IServerlessStage = "dev" | "prod" | "test" | "stage";

export type IServerlessVariable = string;
export interface IServerlessAccountInfo {
  name: string;
  accountId: string;
  region: string;
  profile: string;
  /**
   * Add X-RAY tracing to API Gateway and Lambda. Using the boolean flags
   * you are setting both but if you only want one you can state which one
   * as the value.
   */
  tracing?: IServerlessDiscreteTracingConfig | boolean;
  /**
   * if you want to forward logs to another lambda you can state the **ARN** here
   */
  logForwarding?: arn;
  /**
   * a list of serverless plugins installed
   */
  pluginsInstalled: string[];
  /**
   * a list of all Development Dependencies
   */
  devDependencies: string[];
}

export interface IServerlessDiscreteTracingConfig {
  apiGateway?: boolean;
  lambda?: boolean;
}

export type AWSRuntime =
  | "nodejs6.10"
  | "nodejs8.10"
  | "nodejs10.x"
  | "nodejs12.x"
  | "node4"
  | "java8"
  | "python2.7"
  | "python3.6"
  | "go1.x";

export interface IServerlessConfigCustom extends IDictionary {
  stage?: string;
  region?: string;
  accountId?: string;
  webpack?: IDictionary;
  logForwarding?: {
    /** a fully qualified ARN to the function who will act as the "shipper" */
    destinationARN: arn;
  };
}

export interface IServerlessConfig<T = IServerlessConfigCustom> {
  service: string | { name: string };
  custom?: T;
  plugins?: string[];
  package?: IServerlessPackage;
  provider?: IServerlessProvider;
  stepFunctions?: {
    stateMachines: IDictionary<IStateMachine>;
    activities?: string[];
  };
  functions?: IDictionary<IServerlessFunction>;
  layers?: IArnStringReference[] | ICloudformationReference[] | ILayerDefinition;
}

export interface ILayerDefinition {
  [layerName: string]: {
    /**
     * This indicates the path in the layer repos file system where
     * content will be picked up. So if you're adding a layer with
     * NPM modules -- for instance -- you'd move into the specified
     * directory and then do your yarn/npm adds to this directory
     */
    path: string;
    /** what is says on the tin ... a description of your layer */
    description: string;
  };
}

export interface IServerlessPackage {
  individually?: boolean;
  excludeDevDependencies?: boolean;
  browser?: boolean;
  include?: string[];
  exclude?: string[];
  /** path to the artifact ZIP file */
  artifact?: string;
}

export interface IServerlessProvider {
  /** The name of your service. This name will be the prefix for all your functions  */
  name: string;
  runtime?: AWSRuntime;
  /** this refers to the AWS profile in your ~/aws/credentials file */
  profile?: string;
  /** Service wide environment variables */
  environment?: string | IDictionary<string>;
  /** Set the default stage used. Default is "dev". */
  stage?: string;
  /** Set the default region. Default is "us-east-1". */
  region?: string;
  /** Set the default RetentionInDays for a CloudWatch LogGroup. */
  logRetentionInDays?: number;
  /** Set the default memory size; default is 1024 */
  memorySize?: number;
  stackTags?: IDictionary<string>;
  stackPolicy?: any;
  /** if you are using the serverless-plugin-tracing then you can enable tracing with this flag */
  tracing?:
    | boolean
    | {
        lambda?: boolean;
        apiGateway?: boolean;
      };
  deploymentBucket?: {
    /** overwrite the default deployment bucket */
    name: string;
    /** specificies the type of encryption, when using server-side encryption */
    serverSideEncryption?: string;
  };
  apiKeys?: Array<string | { name: string; value: string }>;
  usagePlan?: IServerlessUsagePlan;
  /** default is EDGE */
  endpointType?: "REGIONAL" | "EDGE";
  apiGateway?: {
    restApiId: string;
    restApiRootResourceId: string;
    restApiResources?: IDictionary;
    binaryMediaTypes?: string[];
  };
  iamRoleStatements?: any[];
  versionFunctions?: boolean;
  /**
   * **aliasStage**
   *
   * If using the the [serverless-aws-alias](https://github.com/HyperBrain/serverless-aws-alias)
   * plugin then you can configure settings here.
   */
  aliasStage?: IApiGatewayAliasConfig;
  /** turn on logging for API Gateway */
  logs?: {
    restApi: boolean;
  };
}

export interface IServerlessUsagePlan {
  quota?: {
    limit: number;
    offset?: number;
    period: "MONTH" | "WEEK" | "DAY";
  };
  throttle?: {
    burstLimit?: number;
    rateLimit?: number;
  };
}

export interface IServerlessIAMRole {
  Effect: "Allow" | "Deny";
  /** A list of scopes (such as "s3:ListBucket" or "states:ListStateMachines") which are being allowed/denied */
  Action: string[];
  /** A list of resources (aka, arn's) which are to receive this role grant */
  Resource: string[];
}

export type ServerlessFunctionMemorySize =
  | 128
  | 192
  | 256
  | 320
  | 384
  | 448
  | 512
  | 576
  | 640
  | 704
  | 768
  | 832
  | 896
  | 960
  | 1024
  | 1088
  | 1152
  | 1216
  | 1280
  | 1344
  | 1408
  | 1472
  | 1536
  | 1600
  | 1664
  | 1728
  | 1792
  | 1856
  | 1920
  | 1984
  | 2048
  | 2112
  | 2176
  | 2240
  | 2304
  | 2368
  | 2432
  | 2496
  | 2560
  | 2624
  | 2688
  | 2752
  | 2816
  | 2880
  | 2944
  | 3008;

/**
 * The configuration for your serverless function.
 * The only required property is a "handler" property
 * pointing to the function definition itself and the
 * function to call within the file.
 */
export interface IServerlessFunction {
  /**
   * Allows you to set environment variables specific to that
   * function.
   */
  environment?: string | IDictionary;
  description?: string;
  /**
   * the handler function in the form of "/path/to/file.HANDLER_FN" where
   * HANDLER_FN is typically "handler".
   */
  handler: string;
  /**
   * A functions X-Ray tracing configuration.
   *
   * **Pass Through:**
   * This is the default setting for all Lambda functions if you have added tracing permissions to your
   * function's execution role. This approach means the Lambda function is only traced if X-Ray has been
   * enabled on an upstream service, such as AWS Elastic Beanstalk.
   *
   * **Active:**
   * When a Lambda function has this setting, Lambda automatically samples invocation requests, based
   * on the sampling algorithm specified by X-Ray.
   */
  tracing?: "Active" | "Passthrough";
  runtime?: AWSRuntime;
  /** how many miliseconds before the function times out */
  timeout?: number;
  /**
   * the allocated "memory" of the virtual machine that will
   * run this function ... in reality is not only a proxy for
   * memory availability but also computational capability
   */
  memorySize?: ServerlessFunctionMemorySize;
  package?: {
    artifact?: string;
    exclude?: string[];
    include?: string[];
  };
  /**
   * Events which may call this function
   */
  events?: IServerlessEvent[];

  /**
   * **aliasStage**
   *
   * If using the the [serverless-aws-alias](https://github.com/HyperBrain/serverless-aws-alias)
   * plugin then you can configure settings here.
   */
  aliasStage?: IApiGatewayAliasConfig;
  /**
   * Add AWS Layers to your function. You can refer to it either as
   * an ARN or a via [Cloudformation Reference](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference-ref.html). A cloudformation reference
   * might look something like `{Ref:MyLambdaLayer}` whereas an ARN reference
   * is just a standard ARN string.
   *
   * **Note:** the layer will be accessible at `/opt/*`. If the layer you are using is in
   * `node_modules` then it is advisable to add the following to your function definition:
```typescript
const fn: IServerlessFunction = {
  environment: {
    NODE_PATH: "./:/opt/node_modules"
  }
}
```
   * as this will ensure that your layer's NPM modules are included in your path
   */
  layers?: IArnStringReference[] | ICloudformationReference[] | ILayerDefinition;
}

export interface ICloudformationReference {
  Ref: string;
}

export type IArnStringReference = string;

export interface IServerlessStatusCode {
  pattern: string;
  template?: string | IDictionary;
  headers: IDictionary;
}

export interface IServerlessRequest<T = unknown> {
  template?: IDictionary;
  parameters?: {
    querystrings?: IDictionary;
    headers?: IDictionary;
    paths?: IDictionary;
  };
  schema: T;
  passThrough?: "NEVER" | "WHEN_NO_MATCH" | "WHEN_NO_TEMPLATES";
}

export interface IServerlessAuthorizer {
  arn: string;
  claims?: string[];
  resultTtlInSeconds?: number;
  identitySource?: string | string[];
  identityValidationExpression?: string;
  type?: string;
}

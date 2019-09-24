import { IDictionary, datetime } from "./basics";
import { IApiGatewayAliasConfig } from "./serverless-alias";
import { arn } from "./aws";
export type JSONSchema4 = import("json-schema").JSONSchema4;
/** A typing for the serverless framework's "serverless.yml" file */

export type IServerlessStage = "dev" | "prod" | "test" | "stage";

export type IServerlessVariable = string;
export interface IServerlessAccountInfo {
  name?: string;
  accountId?: string;
  region?: string;
  profile?: string;
  /**
   * if you want to forward logs to another lambda you can state the **ARN** here
   */
  logForwarding?: arn;
  /**
   * a list of serverless plugins installed
   */
  pluginsInstalled: string[];
}

export type AWSRuntime =
  | "nodejs6.10"
  | "nodejs8.10"
  | "nodejs10.x"
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
  layers?: ILayerDefinition;
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
  tracing?: boolean;
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
  environment?: string | IDictionary;
  description?: string;
  /**
   * the handler function in the form of "/path/to/file.HANDLER_FN" where
   * HANDLER_FN is typically "handler".
   */
  handler: string;
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
   * used in conjunction with the serverless-plugin-tracing plugin,
   * this overrides the tracing setting at a function level
   */
  tracing?: boolean;

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
  layers?: IArnStringReference[] | ICloudformationReference[];
}

export interface ICloudformationReference {
  Ref: string;
}

export type IArnStringReference = string;

export interface IServerlessEvent {
  /**
   * Sets up a time based event trigger to run the function
   */
  schedule?:
    | IServerlessEventScheduleLongForm
    | IServerlessEventScheduleShortForm;
  /**
   * creates a API endpoint using API-Gateway
   */
  http?: IServerlessEventHttp;
  /**
   * Allows subscription (and optionally the creation of) an SNS topic.
   *
   * If defined with only a string, this string represents the name of an SNS topic
   * to be subscribed to and whenever this topic is called it triggers this function.
   * Note: if your name starts with "arn:" then it doesn't create the event but expects
   * it to exist.
   *
   * If you wish to more explicitly point to an existing SNS topic then you can
   * define with a hash like { arn: "<arn-descriptor>" }
   *
   * If you want to be more verbose about the definition of a new topic you can
   * define with a hash which provides the "topicName" and "displayName" properties.
   **/
  sns?: string | IServerlessEventExistingSNS | IServerlessEventVerboseSNS;
}

/** used to attach a function to a pre-existing  */
export interface IServerlessEventExistingSNS {
  arn: string;
}

export interface IServerlessEventVerboseSNS {
  topicName: string;
  displayName?: string;
}

export interface IServerlessEventScheduleShortForm {
  /** in the format of rate(10 minutes) or cron(0 12 * * ? *) */
  schedule: string;
}
export interface IServerlessEventScheduleLongForm {
  /** in the format of rate(10 minutes) or cron(0 12 * * ? *) */
  rate: string;
  enabled?: boolean;
  input?: IDictionary;
  inputPath?: string;
}

export interface IServerlessEventHttp {
  method: "get" | "put" | "post" | "delete";
  path: string;
  cors?: boolean;
  /** not sure what other values can be set here */
  integration?: "lambda";
  authorizer?: IServerlessAuthorizer | IServerlessVariable;
  private?: true;
  request?: IServerlessRequest;
  statusCodes?: {
    [key: number]: IServerlessStatusCode;
  };
}

export interface IServerlessStatusCode {
  pattern: string;
  template?: string | IDictionary;
  headers: IDictionary;
}

export interface IServerlessRequest {
  template?: IDictionary;
  parameters?: {
    querystrings?: IDictionary;
    headers?: IDictionary;
    paths?: IDictionary;
  };
  schema: JSONSchema4;
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

/** of the format of arn:aws:lambda:#{AWS::Region}:#{AWS::AccountId}:function:${self:service}-${opt:stage}-FUNCTION */
export declare type AwsFunctionArn = string;
export declare type StepFunctionBuiltinStates =
  | "States.Timeout"
  | "States.ALL"
  | "States.TaskFailed"
  | "States.Permissions";

export interface IStateMachine {
  /** the name of the function; can include variables like ${opt:stage} */
  name?: string;
  /** Schedule or HTTP events which trigger the step function */
  events?: IServerlessEvent[];
  /** optionally override the default role used to execute this step-function */
  role?: string;
  /** The definition of the State Machine */
  definition: IStepFunction;
}

export interface IStepFunction {
  /** Prose description of what this Step is about */
  Comment?: string;
  /** A pointer to one of the defined states in the States block which will be the starting point for execution */
  StartAt: string;
  /** The available states to this state machine */
  States: IDictionary<IStepFunctionStep>;
}

/** A generic type that allows for any of the various types of state to be applied */
export declare type IStepFunctionStep<T = IDictionary> =
  | IStepFunctionTask<T>
  | IStepFunctionChoice<T>
  | IStepFunctionWait<T>
  | IStepFunctionParallel<T>
  | IStepFunctionPass<T>
  | IStepFunctionFail
  | IStepFunctionSucceed;
export declare type IStepFunctionType =
  | "Task"
  | "Wait"
  | "Parallel"
  | "Choice"
  | "Succeed"
  | "Fail"
  | "Pass";
export interface IStepFunctionBaseState {
  Type: IStepFunctionType;
  /** A human readable description of the state */
  Comment?: string;
}

export interface IStepFunctionBaseWithPathMapping
  extends IStepFunctionBaseState {
  /** A path that selects a portion of the state's input to be passed to the state's task for processing. If omitted, it has the value $ which designates the entire input. For more information, see Input and Output Processing). */
  InputPath?: string;
  /** A path that selects a portion of the state's input to be passed to the state's output. If omitted, it has the value $ which designates the entire input. For more information, see Input and Output Processing. */
  OutputPath?: string;
}

export interface IStepFunctionTask<T = IDictionary>
  extends IStepFunctionBaseWithPathMapping {
  Type: "Task";
  /** string of the format arn:aws:lambda:#{AWS::Region}:#{AWS::AccountId}:function:${self:service}-${opt:stage}-FUNCTION_NAME */
  Resource: AwsFunctionArn;
  /** A string that must exactly match one of the state machine's state names. */
  Next?: keyof T;
  End?: true;
  Retry?: IStepFunctionRetrier[];
  Catch?: IStepFunctionCatcher[];
  /** If the task runs longer than the specified seconds, then this state fails with a States.Timeout Error Name. Must be a positive, non-zero integer. If not provided, the default value is 99999999. */
  TimeoutSeconds?: number;
  /** If more time than the specified seconds elapses between heartbeats from the task, then this state fails with an States.Timeout Error Name. Must be a positive, non-zero integer less than the number of seconds specified in the TimeoutSeconds field. If not provided, the default value is 99999999. */
  HeartbeatSeconds?: number;
}

export interface IStepFunctionChoice<T = IDictionary>
  extends IStepFunctionBaseState {
  Type: "Choice";
  Choices: IStepFunctionChoiceItem<T>[];
  /** The name of the state to transition to if none of the transitions in Choices is taken. */
  Default?: keyof T;
}

export type IStepFunctionChoiceItem<T> = Partial<IStepFunctionOperand> &
  IStepFunctionComplexChoiceItem<T>;

export interface IStepFunctionComplexChoiceItem<T>
  extends IStepFunctionBaseChoice<T> {
  // complex operators
  And?: IStepFunctionOperand[];
  Or?: IStepFunctionOperand[];
  Not?: IStepFunctionOperand;

  // State Machine
  /** the next state to move to when completed with this one */
  Next?: keyof T;
  /** the step-function should stop at this step */
  End?: boolean;
}

export type IStepFunctionOperand =
  | IStepFunctionOperand_StringEquals
  | IStepFunctionOperand_BooleanEquals
  | IStepFunctionOperand_StringGreaterThan
  | IStepFunctionOperand_StringGreaterThanEquals
  | IStepFunctionOperand_StringLessThan
  | IStepFunctionOperand_StringLessThanEquals
  | IStepFunctionOperand_NumericEquals
  | IStepFunctionOperand_NumericGreaterThan
  | IStepFunctionOperand_NumericGreaterThanEquals
  | IStepFunctionOperand_NumericLessThan
  | IStepFunctionOperand_NumericLessThanEquals;

export interface IStepFunctionOperand_BooleanEquals
  extends IStepFunctionBaseLogicalOperand {
  /** compare the value passed in -- and scoped by "Variable" -- to be equal to a stated string */
  BooleanEquals?: boolean;
}
export interface IStepFunctionOperand_StringEquals
  extends IStepFunctionBaseLogicalOperand {
  /** compare the value passed in -- and scoped by "Variable" -- to be equal to a stated string */
  StringEquals?: string;
}
export interface IStepFunctionOperand_StringGreaterThan
  extends IStepFunctionBaseLogicalOperand {
  /** compare the value passed in -- and scoped by "Variable" -- to be equal to a stated string */
  StringGreaterThan?: string;
}
export interface IStepFunctionOperand_StringGreaterThanEquals
  extends IStepFunctionBaseLogicalOperand {
  /** compare the value passed in -- and scoped by "Variable" -- to be equal to a stated string */
  StringGreaterThanEquals?: string;
}
export interface IStepFunctionOperand_StringLessThan
  extends IStepFunctionBaseLogicalOperand {
  /** compare the value passed in -- and scoped by "Variable" -- to be equal to a stated string */
  StringLessThan?: string;
}
export interface IStepFunctionOperand_StringLessThanEquals
  extends IStepFunctionBaseLogicalOperand {
  /** compare the value passed in -- and scoped by "Variable" -- to be equal to a stated string */
  StringLessThanEquals?: string;
}

export interface IStepFunctionOperand_NumericEquals
  extends IStepFunctionBaseLogicalOperand {
  /** compare the value passed in -- and scoped by "Variable" -- to be numerically equal to a stated number */
  NumericEquals?: number;
}
export interface IStepFunctionOperand_NumericGreaterThan
  extends IStepFunctionBaseLogicalOperand {
  /** compare the value passed in -- and scoped by "Variable" -- to be numerically equal to a stated number */
  NumericGreaterThan?: number;
}

export interface IStepFunctionOperand_NumericGreaterThanEquals
  extends IStepFunctionBaseLogicalOperand {
  /** compare the value passed in -- and scoped by "Variable" -- to be numerically equal to a stated number */
  NumericGreaterThanEquals?: number;
}
export interface IStepFunctionOperand_NumericLessThan
  extends IStepFunctionBaseLogicalOperand {
  /** compare the value passed in -- and scoped by "Variable" -- to be numerically equal to a stated number */
  NumericLessThan?: number;
}

export interface IStepFunctionOperand_NumericLessThanEquals
  extends IStepFunctionBaseLogicalOperand {
  /** compare the value passed in -- and scoped by "Variable" -- to be numerically equal to a stated number */
  NumericLessThanEquals?: number;
}

export interface IStepFunctionBaseLogicalOperand {
  /** points to the specific area of context which is being evaluated in the choice */
  Variable: string;
}

export interface IStepFunctionBaseChoice<T> {
  /** the next state to move to when completed with this one */
  Next?: keyof T;
  /** the step-function should stop at this step */
  End?: boolean;
}

export interface IStepFunctionWait<T = IDictionary>
  extends IStepFunctionBaseState {
  Type: "Wait";
  /** A time, in seconds, to wait before beginning the state specified in the Next field. */
  Seconds?: number;
  /** An absolute time to wait until before beginning the state specified in the Next field. Timestamps must conform to the RFC3339 profile of ISO 8601, with the further restrictions that an uppercase T must separate the date and time portions, and an uppercase Z must denote that a numeric time zone offset is not present, for example, 2016-08-18T17:33:00Z.*/
  Timestamp?: datetime;
  /** A time, in seconds, to wait before beginning the state specified in the Next field, specified using a path from the state's input data. */
  SecondsPath?: string;
  /** An absolute time to wait until before beginning the state specified in the Next field, specified using a path from the state's input data. */
  TimestampPath?: string;
  /** The next defined "state" to execute after waiting */
  Next: keyof T;
}

export interface IStepFunctionSucceed extends IStepFunctionBaseState {
  Type: "Succeed";
}

export interface IStepFunctionPass<T = IDictionary>
  extends IStepFunctionBaseState {
  Type: "Pass";
  /** Treated as the output of a virtual task to be passed on to the next state, and filtered as prescribed by the ResultPath field (if present). */
  Result?: any;
  /** Specifies where (in the input) to place the "output" of the virtual task specified in Result. The input is further filtered as prescribed by the OutputPath field (if present) before being used as the state's output. */
  ResultPath?: string;
  Next: keyof T;
}

export interface IStepFunctionFail extends IStepFunctionBaseState {
  Type: "Fail";
  Error?: string;
  Cause?: string;
}

export interface IStepFunctionParallel<T = IDictionary>
  extends IStepFunctionBaseState {
  Type: "Parallel";
  Branches: IStepFunctionParallelBranch[];
  Next?: keyof T;
  End?: true;
  /** An array of objects, called Retriers that define a retry policy in case the state encounters runtime errors. */
  Retry?: string[];
  Catch?: IStepFunctionCatcher[];
}

export interface IStepFunctionParallelBranch {
  StartAt: string;
  States?: IDictionary<IStepFunctionStep>;
}

export interface IStepFunctionCatcher<T = IDictionary> {
  /** A non-empty array of Strings that match Error Names, specified exactly as with the Retrier field of the same name. */
  ErrorEquals: string[];
  /** A string which must exactly match one of the state machine's state names. */
  Next: keyof T;
  /** A path which determines what is sent as input to the state specified by the Next field. */
  ResultPath?: string;
}

export interface IStepFunctionRetrier {
  /** A non-empty array of Strings that match error names, specified exactly as they are with the retrier field of the same name. */
  ErrorEquals: string[];
  /** An integer that represents the number of seconds before the first retry attempt (default 1). */
  IntervalSeconds?: number;
  /** A number that is the multiplier by which the retry interval increases on each attempt (default 2.0). */
  BackoffRate?: number;
  /** A positive integer, representing the maximum number of retry attempts (default 3). If the error recurs more times than specified, retries cease and normal error handling resumes. A value of 0 is permitted and indicates that the error or errors should never be retried. */
  MaxAttempts?: number;
}

interface IServerlessOpenApiDocumentationSchema {
  type: string;
  pattern?: string;
  enum?: "standard" | "premium";
}

interface IServerlessOpenApiDocumentationParams {
  name: string;
  description: string;
  required?: boolean;
  schema: IServerlessOpenApiDocumentationSchema;
}

interface IServerlessOpenApiDocumentationMethodResponses {
  statusCode: number;
  responseBody?: {
    description: string;
  };
  responseModels?: {
    "application/json": string;
  };
}

interface IServerlessOpenApiDocumentation {
  summary: string;
  description: string;
  requestBody?: {
    description: string;
    schema?: IServerlessOpenApiDocumentationSchema;
  };
  requestModels?: {
    "application/json": string;
  };
  pathParams?: IServerlessOpenApiDocumentationParams;
  queryParams?: IServerlessOpenApiDocumentationParams;
  cookieParams?: IServerlessOpenApiDocumentationParams;
  methodResponses?: IServerlessOpenApiDocumentationMethodResponses[];
}

export interface IServerlessEventHttpWithDocumentation
  extends IServerlessEventHttp {
  documentation?: IServerlessOpenApiDocumentation;
}

interface IServerlessOpenApiDocumentationModelSchema {
  $schema: string;
  properties: {};
}

interface IServerlessOpenApiDocumentationModel {
  name: string;
  description: string;
  contentType: "application/json" | "application/xml" | string;
  schema: IServerlessOpenApiDocumentationModelSchema | string;
}

export interface IServerlessOpenApiDocumentationConfiguration {
  version?: string;
  title: string;
  description: string;
  models: IServerlessOpenApiDocumentationModel[];
}

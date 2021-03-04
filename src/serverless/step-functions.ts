import { datetime } from "../aliases";
import { arn } from "../aws";
import { IDictionary } from "../basics";
import { IServerlessEvent } from "./serverless-events";

export interface IServerlessStepFunctions {
  stateMachines: Record<string, IStateMachine>;
}

/** of the format of arn:aws:lambda:#{AWS::Region}:#{AWS::AccountId}:function:${self:service}-${opt:stage}-FUNCTION */
export declare type AwsFunctionArn = string;
export declare type StepFunctionBuiltinStates =
  | "States.Timeout"
  | "States.ALL"
  | "States.TaskFailed"
  | "States.Permissions";

export interface IStateMachine {
  /** To declare an express workflow, specify type as _EXPRESS_ */
  type?: "STANDARD" | "EXPRESS";
  /**
   * There are some practical cases when you would like to prevent state machine from
   * deletion on stack delete or update. This can be achieved by adding retain property
   * to the state machine section.
   */
  retain?: boolean;
  /**
   * Disables the generation of outputs in the CloudFormation Outputs section. If you
   * define many state machines in serverless.yml you may reach the CloudFormation limit
   * of 60 outputs. If you define noOutput: true then this plugin will not generate outputs
   * automatically.
   */
  noOutput?: boolean;
  /**
   * To implement a blue-green deployment with Step Functions you need to reference the
   * exact versions of the functions. To do this, you can specify `useExactVersion: true`
   * in the state machine.
   */
  useExactVersion?: boolean;
  /**
   * By default, your state machine definition will be validated during deployment by StepFunctions.
   * This can be cumbersome when developing because you have to upload your service for every typo
   * in your definition. In order to go faster, you can enable pre-deployment validation using
   * asl-validator which should detect most of the issues (like a missing state property).
   */
  validate?: boolean;
  /** the name of the function; can include variables like ${opt:stage} */
  name?: string;
  /** Schedule or HTTP events which trigger the step function */
  events?: IServerlessEvent[];
  /** optionally override the default role used to execute this step-function */
  role?: string;
  /** The definition of the State Machine */
  definition: IStepFunction;
  /** Defines what execution history events are logged and where they are logged. */
  loggingConfig?: StepFunctionLoggingConfig;

  alarms?: {
    topics: IStepFunctionAlarmTopics;
    metrics: StepFunctionMetric[];
    treatMissingData?: StepFunctionMissingDataTreatment;
  };
  /**
   * You can monitor the execution state of your state machines via CloudWatch Events. It allows
   * you to be alerted when the status of your state machine changes to ABORTED, FAILED, RUNNING,
   * SUCCEEDED or TIMED_OUT.
   *
   * You can configure different notification targets for each type of status change.
   */
  notifications?: {
    ABORTED?: arn[];
    FAILED?: arn[];
    RUNNING?: arn[];
    SUCCEEDED?: arn[];
    TIMED_OUT?: arn[];
  };

  /**
   * You can enable X-Ray for your state machine, by specifing tracingConfig as shown below.
   */
  tracingConfig?: {
    enabled: boolean;
  };
}

/** Defines what execution history events are logged and where they are logged. */
export interface StepFunctionLoggingConfig {
  /** Defines which category of execution history events are logged. */
  level?: "ALL" | "ERROR" | "INFO";
  /** Determines whether execution data is included in your log. When set to `FALSE`, data is excluded.  */
  includeExecutionData?: boolean;
  /** An array of objects that describes where your execution history events will be logged. Limited to size 1. Required, if your log level is not set to `OFF`. */
  destinations: string[];
}

/**
 * Ways in which missing data can be treated.
 *
 * [Official Docs](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data)
 */
export enum StepFunctionMissingDataTreatment {
  /** The alarm does not consider missing data points when evaluating whether to change state. */
  missing = "missing",
  /** The current alarm state is maintained. */
  ignore = "ignore",
  /** Missing data points are treated as breaching the threshold. */
  breaching = "breaching",
  /** Missing data points are treated as being within the threshold. */
  notBreaching = "notBreaching",
}

export interface IStepFunctionAlarmTopics {
  ok?: arn;
  alarm?: arn;
  insufficientData?: arn;
}

/**
 * Metrics
 */
export type StepFunctionMetric =
  | "executionsTimedOut"
  | "executionsFailed"
  | "executionsAborted"
  | "executionThrottled"
  | "executionsSucceeded";

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
  | IStepFunctionMap<T>
  | IStepFunctionPass<T>
  | IStepFunctionFail
  | IStepFunctionSucceed;
export declare type IStepFunctionType =
  | "Task"
  | "Wait"
  | "Parallel"
  | "Map"
  | "Choice"
  | "Succeed"
  | "Fail"
  | "Pass";
export interface IStepFunctionBaseState {
  Type: IStepFunctionType;
  /** A human readable description of the state */
  Comment?: string;
}

export interface IStepFunctionBaseWithPathMapping extends IStepFunctionBaseState {
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
  /** A path which determines what is sent as input to the state specified by the Next field. */
  ResultPath?: string;
  Parameters?: IDictionary;
  End?: true;
  Retry?: IStepFunctionRetrier[];
  Catch?: IStepFunctionCatcher[];
  /** If the task runs longer than the specified seconds, then this state fails with a States.Timeout Error Name. Must be a positive, non-zero integer. If not provided, the default value is 99999999. */
  TimeoutSeconds?: number;
  /** If more time than the specified seconds elapses between heartbeats from the task, then this state fails with an States.Timeout Error Name. Must be a positive, non-zero integer less than the number of seconds specified in the TimeoutSeconds field. If not provided, the default value is 99999999. */
  HeartbeatSeconds?: number;
}

export interface IStepFunctionChoice<T = IDictionary> extends IStepFunctionBaseState {
  Type: "Choice";
  Choices: IStepFunctionChoiceItem<T>[];
  /** The name of the state to transition to if none of the transitions in Choices is taken. */
  Default?: keyof T;
}

export type IStepFunctionChoiceItem<T> = Partial<IStepFunctionOperand> &
  IStepFunctionComplexChoiceItem<T>;

export interface IStepFunctionComplexChoiceItem<T> extends IStepFunctionBaseChoice<T> {
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

export interface IStepFunctionWait<T = IDictionary> extends IStepFunctionBaseState {
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

export interface IStepFunctionPass<T = IDictionary> extends IStepFunctionBaseState {
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

export interface IStepFunctionParallel<T = IDictionary> extends IStepFunctionBaseState {
  Type: "Parallel";
  Branches: IStepFunctionParallelBranch[];
  Next?: keyof T;
  End?: true;
  /** An array of objects, called Retriers that define a retry policy in case the state encounters runtime errors. */
  Retry?: string[];
  Catch?: IStepFunctionCatcher[];
}

export interface IStepFunctionMap<T = IDictionary>
  extends IStepFunctionBaseWithPathMapping {
  Type: "Map";
  /**
   * The `ItemsPath` field’s value is a reference path identifying where in the effective input the array field is found.
   *
   * States within an `Iterator` field can only transition to each other, and no state outside the `ItemsPath` field can transition to a state within it.
   * If any iteration fails, entire Map state fails, and all iterations are terminated.
   */
  ItemsPath?: string;
  Parameters?: IDictionary;
  ResultPath?: string;
  /** The `Iterator` field’s value is an object that defines a state machine which will process each element of the array.  */
  Iterator: {
    StartAt: string;
    States?: IDictionary<IStepFunctionStep>;
  };
  /** The `MaxConcurrency`field’s value is an integer that provides an upper bound on how many invocations of the Iterator may run in parallel. For instance, a `MaxConcurrency` value of 10 will limit your Map state to 10 concurrent iterations running at one time. */
  MaxConcurrency?: number;
  /** A string that must exactly match one of the state machine's state names. */
  Next?: keyof T;
  /** Designates this state as a terminal state (ends the execution) if set to true. There can be any number of terminal states per state machine. Only one of Next or End can be used in a state. Some state types, such as Choice, don't support or use the End field.  */
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

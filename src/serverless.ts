import { IDictionary } from "./basics";
/** A typing for the serverless framework's "serverless.yml" file */
export interface IServerlessConfig {
  service: string;
  plugins?: string[];
  package?: {
    individually?: boolean;
    excludeDevDependencies?: boolean;
    browser?: boolean;
    include?: string[];
    exclude?: string[];
  };
  provider?: {
    name: string;
    runtime: "nodejs6.10" | "node4" | "java8" | "python2.7" | "python3.6" | "go1.x";
    profile?: string;
    stage?: string;
    region?: string;
    iamRoleStatements: any[];
  };
  stepFunctions?: {
    stateMachines: IDictionary<IStateMachine>;
    activities: string[];
  };
  functions?: IDictionary<IServerlessFunction>;
}

export interface IServerlessFunction {
  environment?: string;
  description?: string;
  handler: string;
  timeout?: number;
  memorySize: number;
  package: {
    exclude: string[];
    include: string[];
  };
  events?: ServerlessEvent[];
}

export declare type ServerlessEvent =
  | IServerlessEventScheduleShortForm
  | IServerlessEventScheduleLongForm
  | IServerlessEventHttp;

export interface IServerlessEventScheduleShortForm {
  /** in the format of rate(10 minutes) or cron(0 12 * * ? *) */
  schedule: string;
}
export interface IServerlessEventScheduleLongForm {
  schedule: {
    /** in the format of rate(10 minutes) or cron(0 12 * * ? *) */
    rate: string;
    enabled?: boolean;
    input: IDictionary;
    inputPath: string;
  };
}

export interface IServerlessEventHttp {
  http: {
    method: "get" | "put" | "post" | "delete";
    path: string;
    cors?: boolean;
  };
}

/** of the format of arn:aws:lambda:#{AWS::Region}:#{AWS::AccountId}:function:${self:service}-${opt:stage}-FUNCTION */
export declare type AwsFunctionArn = string;
export declare type StepFunctionBuiltinStates =
  | "States.Timeout"
  | "States.ALL"
  | "States.TaskFailed"
  | "States.Permissions";

export interface IStateMachine {
  /** Schedule or HTTP events which trigger the step function */
  events?: [ServerlessEvent];
  /** optionally override the default role used to execute this step-function */
  role?: string;
  /** The definition of the State Machine */
  definition?: {
    /** Prose description of what this Step is about */
    Comment?: string;
    /** A pointer to one of the defined states in the States block which will be the starting point for execution */
    StartAt: string;
    /** The available states to this state machine */
    States: IDictionary<StepFunctionState>;
  };
}
export declare type StepFunctionState =
  | IStepFunctionTask
  | IStepFunctionChoice
  | IStepFunctionWait
  | IStepFunctionParallel
  | IStepFunctionPass
  | IStepFunctionSucceed;
export declare type IStepFunctionType =
  | "Task"
  | "Wait"
  | "Parallel"
  | "Choice"
  | "Succeed"
  | "Pass";
export interface IStepFunctionBaseState {
  Type: IStepFunctionType;
}

export interface IStepFunctionTask extends IStepFunctionBaseState {
  Type: "Task";
  /** of the format arn:aws:lambda:#{AWS::Region}:#{AWS::AccountId}:function:${self:service}-${opt:stage}-FUNCTION_NAME */
  Resource: AwsFunctionArn;
  Next?: string;
  End?: true;
  Retry?: [
    {
      ErrorEquals: string[];
      IntervalSeconds: number;
      BackoffRate: number;
      MaxAttemps: number;
    }
  ];
  Catch?: [
    {
      ErrorEquals: string[];
      Next: string;
    }
  ];
}

export interface IStepFunctionChoice extends IStepFunctionBaseState {
  Type: "Choice";
  Choices: [
    {
      /** points to the specific area of context which is being evaluated in the choice */
      Variable: string;
      /** compare the value passed in -- and scoped by "Variable" -- to be numerically equal to a stated number */
      NumericEquals?: number;
      /** the next state to move to when completed with this one */
      Next?: string;
      /** the step-function should stop at this step */
      End?: boolean;
    }
  ];
}

export interface IStepFunctionWait extends IStepFunctionBaseState {
  Type: "Wait";
  Seconds: number;
  Next: AwsFunctionArn;
}

export interface IStepFunctionSucceed extends IStepFunctionBaseState {
  Type: "Succeed";
}

export interface IStepFunctionPass extends IStepFunctionBaseState {
  Type: "Pass";
  Result?: any;
  ResultPath?: string;
  Next: string;
}

export interface IStepFunctionParallel extends IStepFunctionBaseState {
  Type: "Parallel";
  Branches: IStepFunctionParallelBranch[];
  Next?: string;
  End?: true;
}

export interface IStepFunctionParallelBranch {
  StartAt: string;
  States?: IDictionary<StepFunctionState>;
}

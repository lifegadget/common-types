import { IDictionary, datetime } from "./basics";
export declare type AWSRuntime = "nodejs6.10" | "nodejs8.10" | "node4" | "java8" | "python2.7" | "python3.6" | "go1.x";
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
    provider?: IServerlessProvider;
    stepFunctions?: {
        stateMachines: IDictionary<IStateMachine>;
        activities?: string[];
    };
    functions?: IDictionary<IServerlessFunction>;
}
export interface IServerlessProvider {
    name: string;
    runtime?: AWSRuntime;
    profile?: string;
    stage?: string;
    region?: string;
    memorySize?: number;
    stackTags?: IDictionary<string>;
    stackPolicy?: any;
    deploymentBucket?: {
        name: string;
        serverSideEncryption?: string;
    };
    iamRoleStatements?: any[];
    versionFunctions?: boolean;
}
export interface IServerlessIAMRole {
    Effect: "Allow" | "Deny";
    Action: string[];
    Resource: string[];
}
export interface IServerlessFunction {
    environment?: string;
    description?: string;
    handler: string;
    runtime?: AWSRuntime;
    timeout?: number;
    memorySize?: number;
    package?: {
        artifact?: string;
        exclude?: string[];
        include?: string[];
    };
    events?: IServerlessEvent[];
}
export interface IServerlessEvent {
    schedule?: IServerlessEventScheduleLongForm | IServerlessEventScheduleShortForm;
    http?: IServerlessEventHttp;
    sns?: string | IServerlessEventExistingSNS | IServerlessEventVerboseSNS;
}
export interface IServerlessEventExistingSNS {
    arn: string;
}
export interface IServerlessEventVerboseSNS {
    topicName: string;
    displayName?: string;
}
export interface IServerlessEventScheduleShortForm {
    schedule: string;
}
export interface IServerlessEventScheduleLongForm {
    rate: string;
    enabled?: boolean;
    input?: IDictionary;
    inputPath?: string;
}
export interface IServerlessEventHttp {
    method: "get" | "put" | "post" | "delete";
    path: string;
    cors?: boolean;
}
export declare type AwsFunctionArn = string;
export declare type StepFunctionBuiltinStates = "States.Timeout" | "States.ALL" | "States.TaskFailed" | "States.Permissions";
export interface IStateMachine {
    name?: string;
    events?: IServerlessEvent[];
    role?: string;
    definition: IStepFunction;
}
export interface IStepFunction {
    Comment?: string;
    StartAt: string;
    States: IDictionary<IStepFunctionStep>;
}
export declare type IStepFunctionStep<T = IDictionary> = IStepFunctionTask<T> | IStepFunctionChoice<T> | IStepFunctionWait<T> | IStepFunctionParallel<T> | IStepFunctionPass<T> | IStepFunctionFail | IStepFunctionSucceed;
export declare type IStepFunctionType = "Task" | "Wait" | "Parallel" | "Choice" | "Succeed" | "Fail" | "Pass";
export interface IStepFunctionBaseState {
    Type: IStepFunctionType;
    Comment?: string;
}
export interface IStepFunctionBaseWithPathMapping extends IStepFunctionBaseState {
    InputPath?: string;
    OutputPath?: string;
}
export interface IStepFunctionTask<T = IDictionary> extends IStepFunctionBaseWithPathMapping {
    Type: "Task";
    Resource: AwsFunctionArn;
    Next?: keyof T;
    End?: true;
    Retry?: IStepFunctionRetrier[];
    Catch?: IStepFunctionCatcher[];
    TimeoutSeconds?: number;
    HeartbeatSeconds?: number;
}
export interface IStepFunctionChoice<T = IDictionary> extends IStepFunctionBaseState {
    Type: "Choice";
    Choices: IStepFunctionChoiceItem<T>[];
    Default?: keyof T;
}
export declare type IStepFunctionChoiceItem<T> = Partial<IStepFunctionOperand> & IStepFunctionComplexChoiceItem<T>;
export interface IStepFunctionComplexChoiceItem<T> extends IStepFunctionBaseChoice<T> {
    And?: IStepFunctionOperand[];
    Or?: IStepFunctionOperand[];
    Not?: IStepFunctionOperand;
    Next?: keyof T;
    End?: boolean;
}
export declare type IStepFunctionOperand = IStepFunctionOperand_StringEquals | IStepFunctionOperand_StringGreaterThan | IStepFunctionOperand_StringGreaterThanEquals | IStepFunctionOperand_StringLessThan | IStepFunctionOperand_StringLessThanEquals | IStepFunctionOperand_NumericEquals | IStepFunctionOperand_NumericGreaterThan | IStepFunctionOperand_NumericGreaterThanEquals | IStepFunctionOperand_NumericLessThan | IStepFunctionOperand_NumericLessThanEquals;
export interface IStepFunctionOperand_StringEquals extends IStepFunctionBaseLogicalOperand {
    StringEquals?: string;
}
export interface IStepFunctionOperand_StringGreaterThan extends IStepFunctionBaseLogicalOperand {
    StringGreaterThan?: string;
}
export interface IStepFunctionOperand_StringGreaterThanEquals extends IStepFunctionBaseLogicalOperand {
    StringGreaterThanEquals?: string;
}
export interface IStepFunctionOperand_StringLessThan extends IStepFunctionBaseLogicalOperand {
    StringLessThan?: string;
}
export interface IStepFunctionOperand_StringLessThanEquals extends IStepFunctionBaseLogicalOperand {
    StringLessThanEquals?: string;
}
export interface IStepFunctionOperand_NumericEquals extends IStepFunctionBaseLogicalOperand {
    NumericEquals?: number;
}
export interface IStepFunctionOperand_NumericGreaterThan extends IStepFunctionBaseLogicalOperand {
    NumericGreaterThan?: number;
}
export interface IStepFunctionOperand_NumericGreaterThanEquals extends IStepFunctionBaseLogicalOperand {
    NumericGreaterThanEquals?: number;
}
export interface IStepFunctionOperand_NumericLessThan extends IStepFunctionBaseLogicalOperand {
    NumericLessThan?: number;
}
export interface IStepFunctionOperand_NumericLessThanEquals extends IStepFunctionBaseLogicalOperand {
    NumericLessThanEquals?: number;
}
export interface IStepFunctionBaseLogicalOperand {
    Variable: string;
}
export interface IStepFunctionBaseChoice<T> {
    Next?: keyof T;
    End?: boolean;
}
export interface IStepFunctionWait<T = IDictionary> extends IStepFunctionBaseState {
    Type: "Wait";
    Seconds?: number;
    Timestamp?: datetime;
    SecondsPath?: string;
    TimestampPath?: string;
    Next: keyof T;
}
export interface IStepFunctionSucceed extends IStepFunctionBaseState {
    Type: "Succeed";
}
export interface IStepFunctionPass<T = IDictionary> extends IStepFunctionBaseState {
    Type: "Pass";
    Result?: any;
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
    Retry?: string[];
    Catch?: IStepFunctionCatcher[];
}
export interface IStepFunctionParallelBranch {
    StartAt: string;
    States?: IDictionary<IStepFunctionStep>;
}
export interface IStepFunctionCatcher<T = IDictionary> {
    ErrorEquals: string[];
    Next: keyof T;
    ResultPath?: string;
}
export interface IStepFunctionRetrier {
    ErrorEquals: string[];
    IntervalSeconds?: number;
    BackoffRate?: number;
    MaxAttempts?: number;
}

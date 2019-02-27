import { IDictionary, datetime } from "./basics";
export declare type AWSRuntime = "nodejs6.10" | "nodejs8.10" | "node4" | "java8" | "python2.7" | "python3.6" | "go1.x";
export interface IServerlessConfig {
    service: string;
    custom?: {};
    plugins?: string[];
    package?: IServerlessPackage;
    provider?: IServerlessProvider;
    stepFunctions?: {
        stateMachines: IDictionary<IStateMachine>;
        activities?: string[];
    };
    functions?: IDictionary<IServerlessFunction>;
}
export interface IServerlessPackage {
    individually?: boolean;
    excludeDevDependencies?: boolean;
    browser?: boolean;
    include?: string[];
    exclude?: string[];
    artifact?: string;
}
export interface IServerlessProvider {
    name: string;
    runtime?: AWSRuntime;
    profile?: string;
    environment?: string | {
        serviceEnvVar: string;
    };
    stage?: string;
    region?: string;
    memorySize?: number;
    stackTags?: IDictionary<string>;
    stackPolicy?: any;
    tracing?: boolean;
    deploymentBucket?: {
        name: string;
        serverSideEncryption?: string;
    };
    apiKeys?: string[];
    usagePlan?: IServerlessUsagePlan;
    endpointType?: "REGIONAL" | "EDGE";
    apiGateway?: {
        restApiId: string;
        restApiRootResourceId: string;
        restApiResources: IDictionary;
    };
    iamRoleStatements?: any[];
    versionFunctions?: boolean;
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
    Action: string[];
    Resource: string[];
}
export declare type ServerlessFunctionMemorySize = 128 | 192 | 256 | 320 | 384 | 448 | 512 | 576 | 640 | 704 | 768 | 832 | 896 | 960 | 1024 | 1088 | 1152 | 1216 | 1280 | 1344 | 1408 | 1472 | 1536 | 1600 | 1664 | 1728 | 1792 | 1856 | 1920 | 1984 | 2048 | 2112 | 2176 | 2240 | 2304 | 2368 | 2432 | 2496 | 2560 | 2624 | 2688 | 2752 | 2816 | 2880 | 2944 | 3008;
export interface IServerlessFunction {
    environment?: string | IDictionary;
    description?: string;
    handler: string;
    runtime?: AWSRuntime;
    timeout?: number;
    memorySize?: ServerlessFunctionMemorySize;
    package?: {
        artifact?: string;
        exclude?: string[];
        include?: string[];
    };
    events?: IServerlessEvent[];
    tracing?: boolean;
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
    integration?: "lambda";
    authorizer?: IServerlessAuthorizer;
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
export declare type IStepFunctionOperand = IStepFunctionOperand_StringEquals | IStepFunctionOperand_BooleanEquals | IStepFunctionOperand_StringGreaterThan | IStepFunctionOperand_StringGreaterThanEquals | IStepFunctionOperand_StringLessThan | IStepFunctionOperand_StringLessThanEquals | IStepFunctionOperand_NumericEquals | IStepFunctionOperand_NumericGreaterThan | IStepFunctionOperand_NumericGreaterThanEquals | IStepFunctionOperand_NumericLessThan | IStepFunctionOperand_NumericLessThanEquals;
export interface IStepFunctionOperand_BooleanEquals extends IStepFunctionBaseLogicalOperand {
    BooleanEquals?: boolean;
}
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
export interface IServerlessEventHttpWithDocumentation extends IServerlessEventHttp {
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
export {};

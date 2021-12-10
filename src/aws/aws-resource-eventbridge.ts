import { seconds, integer } from "~/aliases";
import { arn, AwsResourceType, SqsArn, IAwsResourceTag } from "~/aws";

/** The custom parameters to be used when the target is an AWS Batch job. */
export interface IAwsEventBatchParameters {
  ArrayProperties?: any;
  JobDefinition: string;
  JobName: string;
  RetryStrategy?: any;
}

export interface IAwsEventDeadLetterConfig {
  /** The ARN of the SQS queue specified as the target for the dead-letter queue. */
  Arn: SqsArn;
}

/**
 * These are custom parameter to be used when the target is an API Gateway REST APIs
 * or EventBridge ApiDestinations. In the latter case, these are merged with any
 * InvocationParameters specified on the Connection, with any values from the
 * Connection taking precedence.
 */
export interface IAwsEventHttpParameters {
  HeaderParameters?: Record<string, any>;
  PathParameterValues?: Record<string, any>;
  QueryStringParameters?: Record<string, any>;
}

/**
 * Contains the parameters needed for you to provide custom input to a target based on
 * one or more pieces of data extracted from the event.
 */
export interface IAwsEventInputTransformer {
  /**
   * Map of JSON paths to be extracted from the event. You can then insert these in
   * the template in InputTemplate to produce the output you want to be sent to the target.
   *
   * `InputPathsMap` is an array of key-value pairs, where each value is a valid JSON path.
   * You can have as many as 100 key-value pairs. You must use JSON dot notation, not bracket
   * notation.
   *
   * The keys cannot start with "AWS."
   *
   * Example:
   * ```json
   * {
   *   "InputPathsMap": {"instance": "$.detail.instance","status": "$.detail.status"}
   * }
   * ```
   */
  InputPathsMap?: Record<string, any>;
  /**
   * Input template where you specify placeholders that will be filled with the values of
   * the keys from `InputPathsMap` to customize the data sent to the target. Enclose each
   * `InputPathsMaps` value in brackets: <value> The InputTemplate must be valid JSON.
   *
   * Example:
   * ```json
   * {
   *  "InputTemplate": "<instance> is in state <status>"
   * }
   * ```
   */
  InputTemplate: string;
}

export interface IAwsEventRuleTarget {
  Arn: arn;
  BatchParameters?: IAwsEventBatchParameters;
  DeadLetterConfig?: IAwsEventDeadLetterConfig;
  /** The custom parameters to be used when the target is an Amazon ECS task. */
  EcsParameters?: any;
  /**
   * These are custom parameter to be used when the target is an API Gateway REST APIs
   * or EventBridge ApiDestinations. In the latter case, these are merged with any
   * InvocationParameters specified on the Connection, with any values from the
   * Connection taking precedence.
   */
  HttpParameters?: IAwsEventHttpParameters;
  Id: string;
  Input?: string;
  InputPath?: string;
  /**
   * Contains the parameters needed for you to provide custom input to a target based on
   * one or more pieces of data extracted from the event.
   */
  InputTransformer?: IAwsEventInputTransformer;
  KinesisParameters?: any;
  RedshiftDataParameters?: any;
  /**
   * A `RetryPolicy` object that includes information about the retry policy settings.
   */
  RetryPolicy?: {
    /** The maximum amount of time, in seconds, to continue to make retry attempts. */
    MaximumEventAgeInSeconds: seconds;
    /**
     * The maximum number of retry attempts to make before the request fails. Retry
     * attempts continue until either the maximum number of attempts is made or until
     * the duration of the MaximumEventAgeInSeconds is met.
     */
    MaximumRetryAttempts: integer;
  };
  /**
   * The Amazon Resource Name (ARN) of the IAM role to be used for this target when the
   * rule is triggered. If one rule triggers multiple targets, you can use a different
   * IAM role for each target.
   */
  RoleArn?: arn;
  RunCommandParameters?: {
    /**
     * Currently, we support including only one RunCommandTarget block, which specifies
     * either an array of InstanceIds or a tag.
     */
    RunCommandTargets: { Key: string; Values: string[] }[];
  };
  /**
   * Contains the message group ID to use when the target is a FIFO queue.
   * If you specify an SQS FIFO queue as a target, the queue must have content-based
   * deduplication enabled.
   */
  SqsParameters?: {
    /** The FIFO message group ID to use as the target. */
    MessageGroupId: string;
  };
}

export interface IAwsEventBus<T extends string = string> {
  Type: AwsResourceType.eventBridgeEventBus;
  Properties: {
    /**
     * The name of the new event bus.
     *
     * Note: _event bus names cannot contain the / character. You can't use the
     * name default for a custom event bus, as this name is already used for your account's default event bus._
     */
    Name: T;
    /**
     * If you are creating a partner event bus, this specifies the partner event source
     * that the new event bus will be matched with.
     */
    EventSourceName?: string;
  };
}

export interface IAwsEventRule<T extends string = string> {
  Type: AwsResourceType.eventBridgeRule;
  Properties: {
    /** The description of the rule */
    Description?: string;
    /** The name or ARN of the event bus associated with the rule. If you omit this, the default event bus is used. */
    EventBusName?: string;
    /**
     * The event pattern of the rule. For more information, see
     * [Events and Event Patterns](https://docs.aws.amazon.com/eventbridge/latest/userguide/eventbridge-and-event-patterns.html)
     * in the Amazon EventBridge User Guide.
     */
    EventPattern: any;
    /** The name of the rule */
    Name: T;
    /**
     * The Amazon Resource Name (ARN) of the role that is used for target invocation.
     *
     * If you're setting an event bus in another account as the target and that account
     * granted permission to your account through an organization instead of directly by
     * the account ID, you must specify a RoleArn with proper permissions in the Target
     * structure, instead of here in this parameter.
     */
    RoleArn?: arn;
    /**
     * The scheduling expression.
     *
     * Examples:
     * - "cron(0 20 * * ? *)"
     * - "rate(5 minutes)"
     *
     * For more information, see [Creating an Amazon EventBridge rule that runs on a schedule](https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-create-rule-schedule.html).
     */
    ScheduleExpression?: string;
    /** The state of the rule. */
    State?: string;
    /**
     * Adds the specified targets to the specified rule, or updates the targets if they are already
     * associated with the rule. Targets are the resources that are invoked when a rule is triggered.
     *
     * To be able to make API calls against the resources that you own, Amazon EventBridge needs
     * the appropriate permissions. For AWS Lambda and Amazon SNS resources, EventBridge relies on
     * resource-based policies. For EC2 instances, Kinesis Data Streams, AWS Step Functions state
     * machines and API Gateway REST APIs, EventBridge relies on IAM roles that you specify in the
     * RoleARN argument in PutTargets. For more information, see
     * [Authentication and Access Control in the Amazon EventBridge User Guide](https://docs.aws.amazon.com/eventbridge/latest/userguide/auth-and-access-control-eventbridge.html).
     */
    Targets?: IAwsEventRuleTarget[];
  };
}

/**
 * Use the AWS::EventSchemas::Schema resource to specify an event schema.
 *
 * [docs](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-eventschemas-schema.html)
 */
export interface IAwsEventSchema<T extends string = string> {
  Type: AwsResourceType.eventBridgeSchema;
  Properties: {
    Content: string;
    Description?: string;
    RegistryName: string;
    SchemaName?: T;
    Tags?: IAwsResourceTag[];
    Type: string;
  };
}

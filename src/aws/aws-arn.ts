import { AwsRegion } from "./aws-regions";

/**
 * The partition in which the resource is located. A partition is a group of AWS Regions.
 * Each AWS account is scoped to one partition.
 */
export type AwsArnPartition = "aws" | "aws-cn" | "aws-us-gov";

/**
 * A type alias for an AWS account id. Typically these accounts
 * are a 12-digit value but in the case of AWS owned things it
 * can also be "aws".
 */
export type AwsAccountId = `${number}` | "aws";

/**
 * A AWS _resource_ id which is used as part of AWS **ARN**.
 * This type provides a set of common examples but allows
 * any string as well to provide a safety hatch.
 */
export type AwsArnService =
  | "lambda"
  | "iam"
  | "logs"
  | "states"
  | "sqs"
  | "sns"
  | "dynamodb"
  | "events";

/**
 * AWS _resources_ are found in an ARN and tied to the parent _service_
 * that precedes it in the ARN.
 *
 * Note: there are some cases where a _resource_ is not included in the ARN
 * (for instance SNS). This type, however, does not accomodate an undefined
 * value.
 */
export type AwsArnResource =
  | "function"
  | "log-group"
  | "user"
  | "group"
  | "policy"
  | "role"
  | "stateMachine"
  | "table"
  | "event-bus";

export type AwsArnLambdaResource = "function";

/**
 * Describes the shape of a fully-qualified AWS **ARN** for a _Lambda function_.
 *
 * Note: _generics provides way to dial in a highly specific version_
 */
export type AwsArnLambda<
  T extends string = AwsArnLambdaResource,
  X extends string = string,
  P extends string = AwsArnPartition,
  R extends string = AwsRegion,
  A extends string = AwsAccountId
> = `arn:${P}:lambda:${R}:${A}:${T}:${X}`;

export type AwsArnDynamoDbResource = "table";

export type AwsArnDynamoDb<
  T extends string = AwsArnDynamoDbResource,
  /** the table name, in the case of a table */
  X extends string = string,
  P extends string = AwsArnPartition,
  R extends string = AwsRegion,
  A extends string = AwsAccountId
> = `arn:${P}:dynamodb:${R}:${A}:${T}:${X}`;

export type AwsArnCloudwatchResource = "log-group";

/**
 * Describes the shape of a fully-qualified AWS **ARN** for a _log group_.
 */
export type AwsArnCloudwatch<T extends string = AwsArnCloudwatchResource> =
  `arn:${AwsArnPartition}:logs:${AwsRegion}:${AwsAccountId}:${T}:${string}`;

/**
 * An AWS ARN for the `states` service. Typically this means a Step Function.
 *
 * If you pass in a value for `<T>` can go further and define
 * the Resource to `stateMachine` or whatever is appropriate.
 *
 * This further typing can be good but doing so makes it narrower than
 * the type `AwsArn` and so it should be seen as a tradeoff.
 */
export type AwsArnStepFunction<T extends string = string> =
  `arn:${AwsArnPartition}:states:${AwsRegion}:${AwsAccountId}:${T}:${string}`;

export type AwsIamResource = "user" | "group" | "role" | "policy";
export type AwsIamResourceName = string;

/**
 * Describes the shape of a fully-qualified AWS **ARN** for a _IAM Role_.
 */
export type AwsArnIam<
  R extends string = AwsIamResource,
  N extends string = AwsIamResourceName
> = `arn:${AwsArnPartition}:iam::${AwsAccountId}:${R}/${N}`;

export type AwsArnEventBridgeResource = `event-bus`;

/**
 * Describes the shape of a fully-qualified AWS **ARN** for a _EventBridge event_.
 *
 * Generics:
 *  - `X` provides a way to type the event buses name/path
 *  - `R` defaults to "event-bus" but if you can override with a differnt AWS Resource name where appropriate
 */
export type AwsArnEventBridge<
  X extends string = string,
  R extends string = AwsArnEventBridgeResource
> = `arn:${AwsArnPartition}:events:${AwsRegion}:${AwsAccountId}:${R}/${X}`;

/**
 * Describes the shape of a fully-qualified AWS **ARN** for an _SNS topic_
 * where the generic `<T>` is the _name_ of the topic.
 */
export type AwsArnSnsTopic<T extends string = string> =
  `arn:${AwsArnPartition}:sns:${AwsRegion}:${AwsAccountId}:${T}`;

/**
 * An AWS ARN string
 */
export type arn = `arn:${string}`;

/**
 * Provides good type support for a AWS ARN.
 *
 * Note: type support validates partition, service, region, and account but
 * not beyond that part. The first generic -- `<X>` -- can be used to reach
 * out to the last part of the string if you need it.
 *
 * The other generics are provided give fine grained control over what are
 * meant to be sensible defaults.
 */
export type AwsArn<
  X extends string = string,
  P extends string = AwsArnPartition,
  S extends string = AwsArnService,
  R extends string = AwsRegion,
  A extends string = AwsAccountId
> = `arn:${P}:${S}:${R}:${A}:${string}` | `arn:${P}:${S}::${A}:${X}`;

export type AwsGlobalArn<
  X extends string = string,
  P extends string = AwsArnPartition,
  S extends string = AwsArnService,
  A extends string = AwsAccountId
> = `arn:${P}:${S}::${A}:${string}` | `arn:${P}:${S}::${A}:${X}`;

export type SqsArn = AwsArn<string, string, "sqs", string>;
export type SnsArn = AwsArn<string, string, "sns", string>;

import { AwsRegion } from "./aws-regions";

/**
 * The partition in which the resource is located. A partition is a group of AWS Regions.
 * Each AWS account is scoped to one partition.
 */
export type ArnPartition = "aws" | "aws-cn" | "aws-us-gov";

/**
 * A type alias for an AWS account id. Typically these accounts
 * are a 12-digit value but this might not be absolute and this
 * type is provided more for semantic conveying what is intended
 * than strong type checking.
 *
 * > Note: sometimes account id's can be expressed with dashes
 * for human readability but this type is not meant to support
 * that formatting
 */
export type AwsAccountId = `${number}`;

/**
 * A AWS _resource_ id which is used as part of AWS **ARN**.
 * This type provides a set of common examples but allows
 * any string as well to provide a safety hatch.
 */
export type ArnService =
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
 */
export type ArnResource =
  | "function"
  | "logs"
  | "states"
  | "user"
  | "group"
  | "role"
  | "stateMachine"
  | "table"
  | "event-bus";

/**
 * Describes the shape of a fully-qualified AWS **ARN** for a _Lambda function_
 */
export type AwsLambdaArn = `arn:${ArnPartition}:lambda:${AwsRegion}:${AwsAccountId}:function:${string}`;

/**
 * Describes the shape of a fully-qualified AWS **ARN** for a _log group_.
 */
export type AwsLogGroupArn = `arn:${ArnPartition}:logs:${AwsRegion}:${AwsAccountId}:log-group:${string}`;

/**
 * Describes the shape of a fully-qualified AWS **ARN** for a _Step Function_.
 */
export type AwsStepFunctionArn = `arn:${ArnPartition}:states:${AwsRegion}:${AwsAccountId}:stateMachine:${string}`;

export type AwsIamResource = "user" | "group" | string;

/**
 * Describes the shape of a fully-qualified AWS **ARN** for a _IAM Role_.
 */
export type AwsIamArn = `arn:${ArnPartition}:iam:${AwsAccountId}:${AwsIamResource}/${string}`;

export type ArnEventBridgeResource = "event-bus";

/**
 * Describes the shape of a fully-qualified AWS **ARN** for a _EventBridge event_.
 */
export type AwsEventBridgeArn = `arn:${ArnPartition}:events:${AwsRegion}:${AwsAccountId}:${ArnEventBridgeResource}/${string}`;

/**
 * A type alias to indicate a AWS ARN.
 *
 * If you want a stronger typing you can use `AwsArn` instead.
 */
export type arn = string;

/**
 * Provides reasonably good type support for a AWS ARN but to ensure its
 * not too restrictive.
 */
export type AwsArn =
  | `arn:${ArnPartition}:${ArnService}:${AwsRegion}:${AwsAccountId}:${string}`
  | `arn:${ArnPartition}:${ArnService}::${AwsAccountId}:${string}`;
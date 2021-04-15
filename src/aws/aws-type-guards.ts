import {
  IAwsLambdaProxyIntegrationRequestV2,
  IAwsLambdaProxyIntegrationRequest,
} from "./aws";
import {
  AwsArn,
  AwsEventBridgeArn,
  AwsLambdaArn,
  ArnPartition,
  ArnResource,
  ArnService,
  AwsStepFunctionArn,
  AwsAccountId,
} from "./aws-arn";
import { AwsRegion } from "./aws-regions";
import { AwsStage } from "./aws-stage";

/**
 * Distinguishes between a V1 and V2 Proxy Integration Request
 */
export function isProxyRequestContextV2(
  ctx: IAwsLambdaProxyIntegrationRequest
): ctx is IAwsLambdaProxyIntegrationRequestV2 {
  return ctx.version === "2.0";
}

/**
 * Provides a type-guard to separate a generic string from a string which follows the
 * `AwsLambdaArn` string pattern.
 */
export function isLambdaArn(arn: string): arn is AwsLambdaArn {
  return /arn:aws(-cn|-us-gov)*:lambda:[\w-]+:(\d+):function:.*/.test(arn);
}

/**
 * Type guard to ensure that a given value is a `AwsRegion`
 */
export function isAwsRegion(region: unknown): region is AwsRegion {
  return (
    typeof region === "string" &&
    /^(us|eu|af|ap|me|sa|ca)\-(north|south|east|west|central|northeast|southeast)\-[1-3]$/.test(
      region
    )
  );
}

/**
 * Type guard to ensure that a given value is a valid `AwsStage`
 */
export function isAwsStage(stage: unknown): stage is AwsStage {
  return typeof stage === "string" && /(dev|test|prod|stage)/.test(stage);
}

/**
 * Type guard to ensure a ARN string is EventBridge event
 */
export function isEventBridgeArn(arn: string): arn is AwsEventBridgeArn {
  return /arn:(.*?):events:/.test(arn);
}

export function isStepFunctionArn(arn: string): arn is AwsStepFunctionArn {
  return /arn:(aws|aws-cn|aws-us-gov):states:.*:stateMachine/.test(arn);
}

/**
 * A reasonable strong type guard to validate that a string is in fact
 * a fully qualified ARN.
 */
export function isArn(arn: string): arn is AwsArn {
  return /arn:(aws|aws-cn|aws-us-gov):(.*):/.test(arn);
}

/**
 * A type guard that tests whether a string is a valid AWS _partition_ (from the standpoint of a ARN)
 */
export function isArnPartition(partition: string): partition is ArnPartition {
  return /(aws|aws-cn|aws-us-gov)/.test(partition);
}

/**
 * A type guard that tests whether a string is a valid AWS _resource_ (from the standpoint of a ARN)
 */
export function isArnResource(resource: string): resource is ArnResource {
  return /(function|logs|states|user|group|stateMachine|event-bus|table)/.test(resource);
}

/**
 * A type guard that tests whether a string is a valid AWS _service_ (from the standpoint of a ARN)
 */
export function isArnService(service: string): service is ArnService {
  return /(lambda|iam|logs|states|sqs|sns|dynamodb|events)/.test(service);
}

/**
 * validates that the provided input could be a valid
 * `AwsAccountId`
 */
export function isAwsAccountId(accountId: unknown): accountId is AwsAccountId {
  return typeof accountId === "string" && !isNaN(Number(accountId));
}

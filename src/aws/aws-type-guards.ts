import {
  IAwsLambdaProxyIntegrationRequestV2,
  IAwsLambdaProxyIntegrationRequest,
} from "./aws";
import {
  AwsArn,
  AwsEventBridgeArn,
  AwsLambdaArn,
  AwsPartition,
  AwsStepFunctionArn,
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
 * Type guard to ensure that a given string is a `AwsRegion`
 */
export function isAwsRegion(region: string): region is AwsRegion {
  return /^(us|eu|af|ap|me|sa|ca)\-(\w+)\-[0-9]$/.test(region);
}

/**
 * Type guard to ensure that a given string is a valid `AwsStage`
 */
export function isAwsStage(stage: string): stage is AwsStage {
  return /(dev|test|prod|stage)/.test(stage);
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
 * A reasonable strength type guard to validate that a string is in fact
 * a fully qualified ARN.
 */
export function isArn(arn: string): arn is AwsArn {
  return /arn:(aws|aws-cn|aws-us-gov):(.*):/.test(arn);
}

/**
 * A type guard that tests whether a string is a valid AWS _partition_
 */
export function isArnPartition(partition: string): partition is AwsPartition {
  return /(aws|aws-cn|aws-us-gov)/.test(partition);
}

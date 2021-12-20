import type {
  arn,
  IAwsLambdaProxyIntegrationRequestV2,
  IAwsLambdaProxyIntegrationRequest,
  AwsArn,
  AwsArnPartition,
  AwsArnResource,
  AwsArnService,
  AwsAccountId,
  AwsArnLambda,
  AwsArnEventBridge,
  AwsArnStepFunction,
  AwsRegion,
  AwsStage,
} from "~/aws";

/**
 * Distinguishes between a V1 and V2 Proxy Integration Request
 */
export function isProxyRequestContextV2(
  ctx: IAwsLambdaProxyIntegrationRequest
): ctx is IAwsLambdaProxyIntegrationRequestV2 {
  return ctx.version === "2.0";
}

/**
 * Provides a strong type guard for ARN's of Lambda _functions_ specifically.
 *
 * Note: this type-guard is often the best choice but because `AwsArn` can't
 * provide typing down to the _resource_ level, the resulting type will not
 * fit into broader `AwsArn` type. Use the more general `isLambdaArn()` if you
 * want this.
 */
export function isLambdaFunctionArn(arn: string): arn is AwsArnLambda<"function"> {
  return /arn:aws(-cn|-us-gov)*:lambda:[\w-]+:(\d+):function:.*/.test(arn);
}

/**
 * A type-guard to detect a Lambda based ARN and return a constrained version of
 * the `AwsArn` type.
 *
 * Note: if you want to constrain all the way down to a Lambda function you can
 * use the `isLambdaFunctionArn()` type guard but while it is more constrained,
 * it is no longer a subset of `AwsArn`.
 */
export function isLambdaArn(
  arn: string
): arn is AwsArn<string, AwsArnPartition, "lambda"> {
  return /arn:aws(-cn|-us-gov)*:lambda:[\w-]+:(\d+):.*:.*/.test(arn);
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
  return (
    typeof stage === "string" && /(dev|test|prod|stage|sb_\w+|feature_\w+)/.test(stage)
  );
}

/**
 * Type guard to ensure a ARN string is EventBridge event
 */
export function isEventBridgeArn(arn: string): arn is AwsArnEventBridge {
  return /arn:(.*?):events:/.test(arn);
}

/**
 * Type guard to ensure that an ARN string is a Step Function definition.
 *
 * Note: this narrows to both the Service and Resource level and therefore
 * is more detailed than the `AwsArn` type. For a slightly less strongly
 * typed guard you can opt for `isStatesArn()` and while not as strong
 * it will _roll up_ to `AwsArn`.
 */
export function isStepFunctionArn<T extends string = string>(
  arn: string
): arn is AwsArnStepFunction<T> {
  return /arn:(aws|aws-cn|aws-us-gov):states:.*:stateMachine/.test(arn);
}

/**
 * A reasonable strong type guard to validate that a string is in fact
 * a fully qualified ARN.
 */
export function isArn(arn: string): arn is arn {
  return /arn:(aws|aws-cn|aws-us-gov):(.*):/.test(arn);
}

/**
 * A type guard that tests whether a string is a valid AWS _partition_ (from the standpoint of a ARN)
 */
export function isArnPartition(partition: unknown): partition is AwsArnPartition {
  return typeof partition === "string" && /(aws|aws-cn|aws-us-gov)/.test(partition);
}

/**
 * A type guard that tests whether a string is a valid AWS _resource_ (from the standpoint of a ARN)
 */
export function isArnResource(resource: string): resource is AwsArnResource {
  return /(function|logs|states|user|group|stateMachine|event-bus|table)/.test(resource);
}

/**
 * A type guard that tests whether a string is a valid AWS _service_ (from the standpoint of a ARN)
 */
export function isArnService(service: string): service is AwsArnService {
  return /(lambda|iam|logs|states|sqs|sns|dynamodb|events)/.test(service);
}

/**
 * validates that the provided input could be a valid
 * `AwsAccountId`
 */
export function isAwsAccountId(accountId: unknown): accountId is AwsAccountId {
  return (
    accountId === "aws" || (typeof accountId === "string" && !isNaN(Number(accountId)))
  );
}

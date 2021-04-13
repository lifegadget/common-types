import {
  IAwsLambdaProxyIntegrationRequestV2,
  IAwsLambdaProxyIntegrationRequest,
} from "./aws";
import { AwsLambdaArn } from "./aws-arn";

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

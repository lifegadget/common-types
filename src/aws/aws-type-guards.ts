import {
  IAwsLambdaProxyIntegrationRequestV2,
  IAwsLambdaProxyIntegrationRequest,
} from "./aws";

/**
 * Distinguishes between a V1 and V2 Proxy Integration Request
 */
export function isProxyRequestContextV2(
  ctx: IAwsLambdaProxyIntegrationRequest
): ctx is IAwsLambdaProxyIntegrationRequestV2 {
  return ctx.version === "2.0";
}

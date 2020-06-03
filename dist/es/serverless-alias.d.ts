/**
 * meant to be used with the
 * [serverless-aws-alias](https://github.com/HyperBrain/serverless-aws-alias)
 * serverless plugin
 */
export interface IApiGatewayAliasConfig {
    /** Log full request/response bodies */
    dataTraceEnabled?: boolean;
    loggingLevel?: "INFO" | "ERROR" | "OFF";
    metricsEnabled?: boolean;
    cacheDataEncrypted?: boolean;
    cacheTtlInSeconds?: number;
    cachingEnabled?: boolean;
}

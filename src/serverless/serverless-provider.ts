import { minutes, scalar } from "../aliases";
import { arn } from "../aws";
import { IApiGatewayAliasConfig } from "../serverless-plugins/serverless-alias-plugin";
import { AWSRuntime, ServerlessFunctionMemorySize } from "./serverless";
import { IServerlessApiGatewayConfig } from "./serverless-api-gateway";
import {
  IServerlessAuthorizer,
  IServerlessJwtAuthorizer,
} from "./serverless-authorizers";
import { IHttpApiCors } from "./serverless-http-api";
import { IServerlessIAMRole } from "./serverless-iam";
import {
  IHttpApiLogging,
  IRestApiLogging,
  IWebsocketLogging,
} from "./serverless-logging";
import { IServerlessVpcConfig } from "./serverless-vpc";

export interface IServerlessProvider {
  /** The name of your service. This name will be the prefix for all your functions  */
  name: string;
  runtime?: AWSRuntime;
  /** this refers to the AWS profile in your ~/aws/credentials file */
  profile?: string;
  /** Service wide environment variables */
  environment?: Record<string, scalar> | string;
  /** Set the default stage used. Default is "dev". */
  stage?: "dev" | "test" | "prod" | string;
  /** Set the default region. Default is "us-east-1". */
  region?: string;
  /** Set the default RetentionInDays for a CloudWatch LogGroup. */
  logRetentionInDays?: number;
  /** Set the default memory size; default is 1024 */
  memorySize?: ServerlessFunctionMemorySize;

  /** KMS key arn which will be used for encryption for all functions */
  kmsKeyArn?: string;
  deploymentBucket?: IServerlessDeploymentBucket;
  deploymentPrefix?: "serverless" | string;
  lambdaHashingVersion?: "20201221" | string;
  ecr?: {
    images: Record<string, IServerlessEcr>;
  };
  /** optionally add a dictionary of cloudfront cache policies */
  cloudFront?: Record<string, IServerlessCloudfrontCachePolicy>;
  /** Optional function versioning */
  versionFunctions?: boolean;

  usagePlan?: IServerlessUsagePlan;
  /** default is EDGE */
  endpointType?: "REGIONAL" | "EDGE";
  /** Optional API Gateway global config */
  apiGateway?: IServerlessApiGatewayConfig;

  alb?: {
    targetGroupPrefix?: string;
    authorizers?: Record<string, IServerlessAuthorizer>;
  };

  httpApi: {
    id?: string;
    name?: string;
    payload?: "1.0" | "2.0";
    cors?: boolean | IHttpApiCors;
    authorizers?: Record<string, IServerlessJwtAuthorizer>;
  };
  /** Optional CF stack tags */
  stackTags?: Record<string, string>;

  iam?: {
    /** Allows overwriting the default IAM role or configuring a logical role */
    role?: IServerlessIAMRole;
    /** ARN of an IAM role for CloudFormation service. If specified, CloudFormation uses the role's credentials */
    deploymentRole?: string;
  };

  /**
   * Optional CF stack policy. The example below allows updates to all resources except
   * deleting/replacing EC2 instances (use with caution!)
   */
  stackPolicy?: Array<{
    Effect: "Allow" | "Deny";
    Principle: string;
    Action: string | string[];
    Resource: string | string[];
    Condition?: any;
  }>;

  /** if you use VPC then both subproperties (securityGroupIds and subnetIds) are required */
  vpc?: IServerlessVpcConfig;

  /**
   * List of existing Amazon SNS topics in the same region where notifications about stack events
   * are sent.
   */
  notificationArns?: string[];

  /**
   * optional Key/Value dictionary of stack parameters
   */
  stackParameters?: Record<string, string>;

  rollbackConfiguraiton?: {
    MonitoringTimeInMinutes: minutes;
    RollbackTriggers: Array<{
      Arn: arn;
      Type: "AWS::CloudWatch::Alarm" | string;
    }>;
  };

  /** Optional service wide function tags */
  tags?: Record<string, string>;

  tracing?:
    | boolean
    | {
        /** Optional, can be true (true equals 'Active'), 'Active' or 'PassThrough' */
        lambda?: boolean;
        apiGateway?: boolean;
      };

  iamRoleStatements?: any[];
  /**
   * **aliasStage**
   *
   * If using the the [serverless-aws-alias](https://github.com/HyperBrain/serverless-aws-alias)
   * plugin then you can configure settings here.
   */
  aliasStage?: IApiGatewayAliasConfig;
  logs?: {
    restApi?: IRestApiLogging;
    websocket?: IWebsocketLogging;
    httpApi?: IHttpApiLogging;
    /** Optional, whether to write CloudWatch logs for custom resource lambdas as added by the framework */
    frameworkLambda?: boolean;
  };
}

export interface IServerlessDeploymentBucket {
  blockPublicAccess?: boolean;
  skipPolicyStep?: boolean;
  name?: string;
  maxPreviousDeploymentArtifacts?: number;
  serverSideEncryption?: "AES256" | string;
  sseKMSKeyId?: string;
  sseCustomerKeyMD5?: "md5sum" | string;
  tags?: string[];
}

export interface IServerlessCloudfrontCachePolicy {
  DefaultTTL?: number;
  MinTTL?: number;
  MaxTTL?: number;
  Comment?: string;
  ParametersInCacheKeyAndForwardedToOrigin?: {
    CookiesConfig?: {
      CookiesBehavior: "whitelist" | "allExcept" | "all" | "none";
      Coookies: string[];
    };
    EnableAcceptEncodingBrotli?: boolean;
    EnableAcceptEncodingGzip?: boolean;
    HeadersConfig?: {
      HeadersBehavior: "none" | "whitelist";
      Headers: string[];
    };
    QueryStringsConfig?: {
      QueryStringBehavior: "allExcept" | "whitelist" | "all" | "none";
      QueryStrings: string[];
    };
  };
}

export type IServerlessEcr =
  | {
      /** Image uri of existing Docker image in ECR */
      uri: string;
    }
  | {
      /** Path to Docker context that will be used when building that image locally */
      path: string;
      /** Name of Dockerfile that should be used when building image locally. Equal to 'Dockerfile' by default */
      file: string;
    };

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

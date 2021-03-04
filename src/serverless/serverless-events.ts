import { seconds, sql } from "../aliases";
import { arn } from "../aws";
import { ICloudWatchConfigEvent } from "../aws/aws-events";
import { IDictionary } from "../basics";
import {
  IServerlessHttpAuthorizer,
  IServerlessRequest,
  IServerlessStatusCode,
  IServerlessVariable,
} from "./serverless";
import { IHttpApiComplex, IHttpApiSimple } from "./serverless-http-api";

export interface IServerlessEvent {
  /**
   * Sets up a time based event trigger to run the function
   */
  schedule?: IServerlessEventScheduleLongForm | IServerlessEventScheduleShortForm;
  /**
   * creates a API endpoint using API-Gateway's **REST API**
   *
   * > Note: in many cases now you should consider whether using the HTTP API is
   * a better optoin. This options can be configured off of the `httpApi` property.
   * For more on the two options see: [Comparison of REST versus HTTP API's](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-vs-rest.html)
   */
  http?: IServerlessEventHttp;
  /**
   * creates an API endpoint using API-Gateway's **HTTP API**. You may use either the simple
   * or more complex signature:
   *
   * - `IHttpApiSimple` - _a single string signature_
   * - `IHttpApiComplex` - _a structured configuration with more options_
   *
   * > Note: this the **HTTP API** is in contrast to the older REST API which is in some areas more
   * functionally complete ... but in most cases the HTTP API is the better option. See
   * [Comparison of REST versus HTTP API's](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-vs-rest.html) for more details.
   */
  httpApi?: IHttpApiSimple | IHttpApiComplex;
  /**
   * Allows subscription (and optionally the creation of) an SNS topic.
   *
   * If defined with only a string, this string represents the name of an SNS topic
   * to be subscribed to and whenever this topic is called it triggers this function.
   * Note: if your name starts with "arn:" then it doesn't create the event but expects
   * it to exist.
   *
   * If you wish to more explicitly point to an existing SNS topic then you can
   * define with a hash like { arn: "<arn-descriptor>" }
   *
   * If you want to be more verbose about the definition of a new topic you can
   * define with a hash which provides the "topicName" and "displayName" properties.
   **/
  sns?: string | IServerlessEventExistingSNS | IServerlessEventVerboseSNS;
  sqs?: IServerlessSQSEvent;
  /** Sets a S3 Event as a Lambda trigger. */
  s3?: IServerlessEventS3;
  stream?: IServerlessStreamEvent;
  /**
   * Config for Kafka events
   */
  msk?: IServerlessKafkaEvent;
  alexaSkill?: {
    appId: string;
    enabled: boolean;
  };
  alexaSmartHome?: {
    appId: string;
    enabled: boolean;
  };
  iot?: IServerlessIotEvent;

  /**
   * Allow a cloudwatch event to trigger execution of a lambda function or a step-function
   *
   * [Serverless Docs](https://www.serverless.com/plugins/serverless-step-functions#cloudwatch-event),
   * [AWS Docs]()
   */
  cloudwatchEvent?: {
    event: ICloudWatchConfigEvent;
  };

  cloudwatchLog?: {
    logGroup?: string;
    filter?: string;
  };

  cognitoUserPool?: {
    pool?: any;
    trigger?: any;
    existing?: boolean;
  };

  alb?: {
    listenerArn?: arn;
    priority?: number;
    conditions?: Record<string, string>;
    healthcheck?:
      | boolean
      | {
          path?: string;
          intervalSeconds?: seconds;
          timeoutSeconds?: seconds;
          healthyThresholdCount?: number;
          unhealthyThresholdCount?: number;
          matcher?: Record<string, string>;
        };
  };

  eventBridge: {
    /** using the default AWS event bus. Example might be "rate(10 minutes)" */
    schedule: string;
    /** creating or reusing an existing event-bus */
    eventBus: string;
    pattern: Record<"source" | "detail-type" | "detail" | string, any>;
    inputTransformer: {
      inputPathsMap: Record<string, string>;
      inputTemplate: string;
    };
    input: Record<string, any>;
    inputPath: string;
  };

  cloudFront?: {
    eventType?: string;
    includeBody?: boolean;
    pathPattern?: string;
    /** a cache policy is defined with either a `name` or `id` but not both */
    cachePolicy?:
      | {
          /** Refers to a Cache Policy defined in provider.cloudFront.cachePolicies */
          name: string;
        }
      | {
          /** Refers to any external Cache Policy id */
          id: string;
        };
    origin?: {
      DomainName?: string;
      OriginPath?: string;
      CustomOrginConfig?: Record<
        "OriginProtocolPolicy" | string,
        "match-viewer" | string
      >;
    };
  };
}

export interface IServerlessIotEvent {
  name: string;
  description?: string;
  enabled?: boolean;
  sql: sql;
  sqlVersion?: "beta" | string | number;
}

export interface IServerlessKafkaEvent {
  /** ARN of MSK Cluster */
  arn?: arn;
  /** name of Kafka topic to consume from */
  topic?: string;
  /** must be in 1-10000 range */
  batchSize?: number;
  startingPosition?: "LATEST" | "TRIM_HORIZON";
  /** true by default, can be used to disable event without deleting resource */
  enabled?: boolean;
}
export interface IServerlessSQSEvent {
  arn?: arn;
  batchSize?: number;
  /** minimum is 0 and the maximum is 300 (seconds) */
  maxiumBatchingWindow?: seconds;
  enabled?: boolean;
}

export interface IServerlessStreamEvent {
  arn?: arn;
  maximumRecordAgeInSeconds?: number;
  startingPosition?: "LATEST" | any;
  enabled?: boolean;
}

/** used to attach a function to a pre-existing  */
export interface IServerlessEventExistingSNS {
  arn: string;
}

export interface IServerlessEventVerboseSNS {
  topicName: string;
  displayName?: string;
}

export interface IServerlessEventScheduleShortForm {
  /** in the format of rate(10 minutes) or cron(0 12 * * ? *) */
  schedule: string;
}
export interface IServerlessEventScheduleLongForm {
  /** in the format of rate(10 minutes) or cron(0 12 * * ? *) */
  rate: string;
  enabled?: boolean;
  input?: IDictionary;
  inputPath?: string;
}

export interface IServerlessEventS3 {
  bucket: string;
  event: IS3EventType;
  rules?: IS3Rule[];
  existing?: boolean;
}

export interface IS3Rule {
  prefix?: string;
  suffix?: string;
}

export type IS3EventType =
  | "s3:ObjectCreated:*"
  | "s3:ObjectCreated:Put"
  | "s3:ObjectCreated:Post"
  | "s3:ObjectCreated:Copy"
  | "s3:ObjectCreated:CompleteMultipartUpload"
  | "s3:ObjectRemoved:*"
  | "s3:ObjectRemoved:Delete"
  | "s3:ObjectRemoved:DeleteMarkerCreated"
  | "s3:ObjectRestore:Post"
  | "s3:ObjectRestore:Completed"
  | "s3:ReducedRedundancyLostObject";

export interface IServerlessEventHttp {
  /** HTTP method for this endpoint */
  method: "get" | "put" | "post" | "delete";
  /** Path for this endpoint */
  path: string;
  /** Turn on CORS for this endpoint, but don't forget to return the right header in your response */
  cors?: boolean;
  /**
   * Requires clients to add API keys values in the `x-api-key` header of their request
   */
  private?: boolean;
  /** An AWS API Gateway custom authorizer function */
  authorizer?: IServerlessHttpAuthorizer | IServerlessVariable;

  /** configure method request and integration request settings */
  request?: IServerlessRequest;
  /** not sure what other values can be set here */
  integration?: "lambda";
  statusCodes?: {
    [key: number]: IServerlessStatusCode;
  };
}

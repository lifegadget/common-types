import { ICloudWatchConfigEvent } from "../aws/aws-events";
import { IDictionary } from "../basics";
import {
  IServerlessAuthorizer,
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
  /** Sets a S3 Event as a Lambda trigger. */
  s3?: IServerlessEventS3;

  /**
   * Allow a cloudwatch event to trigger execution of a lambda function or a step-function
   *
   * [Serverless Docs](https://www.serverless.com/plugins/serverless-step-functions#cloudwatch-event),
   * [AWS Docs]()
   */
  cloudwatchEvent?: {
    event: ICloudWatchConfigEvent;
  };
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
  method: "get" | "put" | "post" | "delete";
  path: string;
  cors?: boolean;
  /** not sure what other values can be set here */
  integration?: "lambda";
  authorizer?: IServerlessAuthorizer | IServerlessVariable;
  private?: true;
  request?: IServerlessRequest;
  statusCodes?: {
    [key: number]: IServerlessStatusCode;
  };
}

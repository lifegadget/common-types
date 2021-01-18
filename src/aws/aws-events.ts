import { datetime } from "../aliases";
import { arn } from "../aws";

type Source = "ec2" | "s3" | "codestar";
export type IAwsEventSource = `aws.${Source}` | string;

export type IAwsEventUrls = `${Source}.amazonaws.com` | string;

export type IAwsEventName = "PutObject" | "GetObject" | string;

export interface ICloudWatchConfigEvent {
  source: IAwsEventSource;
  "detail-type": string[];
  resources: arn[];
  detail: {
    state?: string;
    eventSource?: IAwsEventUrls[];
    eventName?: IAwsEventName[];
    requestParameters?: {
      bucketName: string[];
    };
    "changed-tag-keys": string[];
    tags: string[];
    eventDescription?: Array<{ language: string; latestDescription: string }>;
    userAgent?: string[];
    requestID?: string;
    eventID?: string;
    eventTime?: datetime;
    eventType?: string;
    sourceIPAddress: string;
    [key: string]: any;
  };
  enabled: boolean;
  input: Record<string, any>;
}

export interface ICloudWatchEvent extends ICloudWatchConfigEvent {
  id: string;
  account: string;
  time: datetime;
  region: string;
}

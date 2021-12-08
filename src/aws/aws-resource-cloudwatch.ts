import { int64, integer } from "~/aliases";
import { AwsResourceType } from "~/aws";

/**
 * The `AWS::CloudWatch::Alarm` type specifies an alarm and associates it with the specified metric or
 * metric math expression.
 *
 * When this operation creates an alarm, the alarm state is immediately set to INSUFFICIENT_DATA. The alarm
 * is then evaluated and its state is set appropriately. Any actions associated with the new state are then
 * executed.
 *
 * When you update an existing alarm, its state is left unchanged, but the update completely overwrites the
 * previous configuration of the alarm.
 */
export interface IAwsCloudwatchAlarm<T extends string = string> {
  Type: AwsResourceType.cloudwatchAlarm;
  Properties: {
    ActionsEnabled: Boolean;
    AlarmActions: string[];
    AlarmDescription: string;
    AlarmName: string;
    ComparisonOperator: string;
    DatapointsToAlarm: integer;
    Dimensions: any[];
    EvaluateLowSampleCountPercentile: string;
    EvaluationPeriods: integer;
    ExtendedStatistic: string;
    InsufficientDataActions: string[];
    MetricName: T;
    Metrics: any[];
    Namespace: string;
    OKActions: string[];
    Period: integer;
    Statistic: string;
    Threshold: int64;
    ThresholdMetricId: string;
    TreatMissingData: string;
    Unit: string;
  };
}

export interface IAwsMetricStat {
  Metric: {
    Dimensions?: any[];
    MetricName: string;
    Namespace: string;
  };
  Period: integer;
  Stat: string;
  Unit?:
    | "Bits"
    | "Bits/Second"
    | "Bytes"
    | "Bytes/Second"
    | "Count"
    | "Count/Second"
    | "Gigabits"
    | "Gigabits/Second"
    | "Gigabytes"
    | "Gigabytes/Second"
    | "Kilobits"
    | "Kilobits/Second"
    | "Kilobytes"
    | "Kilobytes/Second"
    | "Megabits"
    | "Megabits/Second"
    | "Megabytes"
    | "Megabytes/Second"
    | "Microseconds"
    | "Milliseconds"
    | "None"
    | "Percent"
    | "Seconds"
    | "Terabits"
    | "Terabits/Second"
    | "Terabytes"
    | "Terabytes/Second";
}

export interface IAwsAnomalyMetricDataQuery {
  AccountId: string;
  Expression: string;
  Id: string;
  Label: string;
  MetricStat: IAwsMetricStat;
  Period: integer;
  ReturnData: boolean;
}

/**
 * The `AWS::CloudWatch::AnomalyDetector` type specifies an anomaly detection band for a certain metric
 * and statistic. The band represents the expected "normal" range for the metric values. Anomaly
 * detection bands can be used for visualization of a metric's expected values, and for alarms.
 */
export interface IAwsCloudwatchAnomalyDetector<T extends string = string> {
  Type: AwsResourceType.cloudwatchAnomalyDetector;
  Properties: {
    Configuration: {
      /**
       * Specifies an array of time ranges to exclude from use when the anomaly detection model
       * is trained and updated. Use this to make sure that events that could cause unusual
       * values for the metric, such as deployments, aren't used when CloudWatch creates or
       * updates the model.
       */
      ExcludedTimeRanges?: {
        /**
         * The end time of the range to exclude. The format is yyyy-MM-dd'T'HH:mm:ss. For example, 2019-07-01T23:59:59.
         */
        EndTime: string;
        /** The start time of the range to exclude. The format is yyyy-MM-dd'T'HH:mm:ss. For example, 2019-07-01T23:59:59. */
        StartTime: string;
      }[];
      /**
       * The time zone to use for the metric. This is useful to enable the model to automatically
       * account for daylight savings time changes if the metric is sensitive to such time changes.
       */
      MetricTimeZone?: string;
    };
    Dimensions: {
      /** The name of the dimension. */
      Name: String;
      /**
       * The value of the dimension. Dimension values must contain only ASCII characters and must
       * include at least one non-whitespace character.
       */
      Value: String;
    }[];
    MetricMathAnomalyDetector: {
      MetricDataQueries: IAwsAnomalyMetricDataQuery[];
    };
    MetricName: T;
    Namespace: string;
    SingleMetricAnomalyDetector: any;
    Stat: string;
  };
}

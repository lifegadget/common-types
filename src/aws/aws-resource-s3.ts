import { seconds, integer, Iso8601DateTime } from "~/aliases";
import { arn, AwsResourceType, IAwsResourceTag } from "~/aws";

export interface IAwsS3BucketDestination {
  /**
   * The account ID that owns the destination S3 bucket. If no account ID is provided,
   * the owner is not validated before exporting data. It is strongly recommended that
   * this be set.
   */
  BucketAccountId?: string;
  /** The Amazon Resource Name (ARN) of the bucket to which data is exported. */
  BucketArn: arn;
  /** Specifies the file format used when exporting data to Amazon S3. */
  Format: "CSV" | "ORC" | "Parquet";
  /** The prefix to use when exporting data. The prefix is prepended to all results. */
  Prefix?: string;
}

/** Specifies a cross-origin access rule for an Amazon S3 bucket. */
export interface IAwsS3CorsRule {
  AllowedHeaders?: string[];
  AllowedMethods: string[];
  AllowedOrigins: string[];
  ExposedHeaders?: string[];
  Id?: string;
  MaxAge?: seconds;
}

export interface IAwsS3IntelligentTiering {
  /** The ID used to identify the S3 Intelligent-Tiering configuration. */
  Id: string;
  /** An object key name prefix that identifies the subset of objects to which the rule applies. */
  Prefix: string;
  /** Specifies the status of the configuration. */
  Status: "Disabled" | "Enabled";
  TagFilters: IAwsResourceTag[];
  /**
   * Specifies a list of S3 Intelligent-Tiering storage class tiers in the configuration. At least
   * one tier must be defined in the list. At most, you can specify two tiers in the list, one for
   * each available AccessTier: ARCHIVE_ACCESS and DEEP_ARCHIVE_ACCESS.
   */
  Tierings: {
    /** S3 Intelligent-Tiering access tier. */
    AccessTier: "ARCHIVE_ACCESS" | "DEEP_ARCHIVE_ACCESS";
    /**
     * The number of consecutive days of no access after which an object will be eligible to be
     * transitioned to the corresponding tier. The minimum number of days specified for Archive
     * Access tier must be at least 90 days and Deep Archive Access tier must be at least
     * 180 days. The maximum can be up to 2 years (730 days).
     */
    Days: integer;
  }[];
}

export type AwsS3OptionalInventoryFields =
  | "Size"
  | "LastModifiedDate"
  | "StorageClass"
  | "ETag"
  | "IsMultipartUploaded"
  | "ReplicationStatus"
  | "EncryptionStatus"
  | "ObjectLockRetainUntilDate"
  | "ObjectLockMode"
  | "ObjectLockLegalHoldStatus"
  | "IntelligentTieringAccessTier"
  | "BucketKeyStatus";

/**
 * Specifies the inventory configuration for an Amazon S3 bucket. For more information, see
 * [GET Bucket inventory](https://docs.aws.amazon.com/AmazonS3/latest/API/RESTBucketGETInventoryConfig.html)
 * in the Amazon S3 API Reference.
 */
export interface IAwsS3InventoryConfig {
  /** Contains information about where to publish the inventory results */
  Destination: IAwsS3BucketDestination;
  /**
   * Specifies whether the inventory is enabled or disabled. If set to True, an inventory list is
   * generated. If set to False, no inventory list is generated.
   */
  Enabled: boolean;
  /** The ID used to identify the inventory configuration. */
  Id: string;
  /**
   * Object versions to include in the inventory list. If set to All, the list includes all the
   * object versions, which adds the version-related fields VersionId, IsLatest, and DeleteMarker
   * to the list. If set to Current, the list does not contain these version-related fields.
   */
  IncludedObjectVersions: "All" | "Current";
  /** Contains the optional fields that are included in the inventory results. */
  OptionalFields?: AwsS3OptionalInventoryFields[];
  /** Specifies the inventory filter prefix. */
  Prefix?: string;
  /** Specifies the schedule for generating inventory results. */
  ScheduleFrequency: "Daily" | "Weekly";
}

export interface IAwsS3BucketRule {
  AbortIncompleteMultipartUpload: any;
  ExpirationDate: string;
  ExpirationInDays: integer;
  ExpiredObjectDeleteMarker?: boolean;
  Id?: string;
  NoncurrentVersionExpiration?: any;
  /**
   * For buckets with versioning enabled (or suspended), specifies the time, in days, between when
   * a new version of the object is uploaded to the bucket and when old versions of the object expire.
   * When object versions expire, Amazon S3 permanently deletes them. If you specify a transition and
   * expiration time, the expiration time must be later than the transition time.
   *
   * @deprecated
   */
  NoncurrentVersionExpirationInDays?: integer;
  /**
   * For buckets with versioning enabled (or suspended), specifies when non-current objects transition
   * to a specified storage class. If you specify a transition and expiration time, the expiration time
   * must be later than the transition time. If you specify this property, don't specify the
   * NoncurrentVersionTransitions property.
   *
   * @deprecated
   */
  NoncurrentVersionTransition?: any;
  /**
   * For buckets with versioning enabled (or suspended), one or more transition rules that specify when
   * non-current objects transition to a specified storage class. If you specify a transition and
   * expiration time, the expiration time must be later than the transition time. If you specify this
   * property, don't specify the NoncurrentVersionTransition property.
   *
   * You must specify at least one of the following properties: AbortIncompleteMultipartUpload, ExpirationDate,
   * ExpirationInDays, NoncurrentVersionExpirationInDays, NoncurrentVersionTransition, NoncurrentVersionTransitions,
   * Transition, or Transitions.
   */
  NoncurrentVersionTransitions: any[];
  /** Specifies the minimum object size in bytes for this rule to apply to. */
  ObjectSizeGreaterThan?: integer;
  /** Specifies the maximum object size in bytes for this rule to apply to. */
  ObjectSizeLessThan?: integer;
  /**
   * Object key prefix that identifies one or more objects to which this rule applies.
   *
   * Note: Replacement must be made for object keys containing special characters (such as carriage returns)
   * when using XML requests.
   */
  Prefix?: string;
  /** If Enabled, the rule is currently being applied. If Disabled, the rule is not currently being applied. */
  Status?: "Disabled" | "Enabled";
  /** Tags to use to identify a subset of objects to which the lifecycle rule applies. */
  TagFilters: IAwsResourceTag[];
  /** @deprecated */
  Transition?: any;
  /**
   * One or more transition rules that specify when an object transitions to a specified storage class.
   * If you specify an expiration and transition time, you must use the same time unit for both properties
   * (either in days or by date). The expiration time must also be later than the transition time. If you
   * specify this property, don't specify the Transition property.
   *
   * You must specify at least one of the following properties: AbortIncompleteMultipartUpload, ExpirationDate,
   * ExpirationInDays, NoncurrentVersionExpirationInDays, NoncurrentVersionTransition, NoncurrentVersionTransitions,
   * Transition, or Transitions.
   */
  Transitions: {
    /** The storage class to which you want the object to transition. */
    StorgeClass:
      | "DEEP_ARCHIVE"
      | "GLACIER"
      | "GLACIER_IR"
      | "INTELLIGENT_TIERING"
      | "ONEZONE_IA"
      | "STANDARD_IA";
    /**
     * Indicates when objects are transitioned to the specified storage class. The date value must be in
     * ISO 8601 format. The time is always midnight UTC.
     */
    TransitionDate?: Iso8601DateTime;
    /**
     * Indicates the number of days after creation when objects are transitioned to the specified storage class.
     * The value must be a positive integer.
     */
    TransitionInDays?: integer;
  }[];
}

/**
 * The `AWS::S3::Bucket` resource creates an Amazon S3 bucket in the same AWS Region where you
 * create the AWS CloudFormation stack. To control how AWS CloudFormation handles the bucket
 * when the stack is deleted, you can set a deletion policy for your bucket. You can choose
 * to retain the bucket or to delete the bucket. For more information, see
 * [DeletionPolicy Attribute](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-attribute-deletionpolicy.html).
 *
 * [CloudFormation docs](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-s3-bucket.html)
 */
export interface IAwsS3Bucket<T extends string = string> {
  Type: AwsResourceType.s3Bucket;
  DeletionPolicy?: "Retain" | "Delete";
  Properties: {
    /** Configures the transfer acceleration state for an Amazon S3 bucket. */
    AccelerateConfiguration?: {
      AccelerationStatus: "Enabled" | "Suspended";
    };
    /**
     * A canned access control list (ACL) that grants predefined permissions to the bucket.
     *
     * Be aware that the syntax for this property differs from the information provided in
     * the Amazon S3 User Guide. The AccessControl property is case-sensitive and must be
     * one of the following values: Private, PublicRead, PublicReadWrite, AuthenticatedRead,
     * LogDeliveryWrite, BucketOwnerRead, BucketOwnerFullControl, or AwsExecRead.
     */
    AccessControl?:
      | "Private"
      | "PublicRead"
      | "PublicReadWrite"
      | "AuthenticatedRead"
      | "LogDeliveryWrite"
      | "BucketOwnerRead"
      | "BucketOwnerFullControl"
      | "AwsExecRead";
    /** Specifies the configuration and any analyses for the analytics filter of an Amazon S3 bucket. */
    AnalyticsConfigurations?: {
      Id: string;
      Prefix?: string;
      StorageClassAnalysis: {
        /** Specifies how data related to the storage class analysis for an Amazon S3 bucket should be exported. */
        DataExport?: {
          Destination: IAwsS3BucketDestination;
          OutputSchemaVersion: string;
        };
      };
      /**
       * The tags to use when evaluating an analytics filter. The analytics only includes objects that meet
       * the filter's criteria. If no filter is specified, all of the contents of the bucket are included
       * in the analysis.
       */
      TagFilters?: IAwsResourceTag[];
    };
    /**
     * Specifies default encryption for a bucket using server-side encryption with Amazon S3-managed keys (SSE-S3)
     * or AWS KMS-managed keys (SSE-KMS) bucket. For information about the Amazon S3 default encryption feature,
     * see [Amazon S3 Default Encryption for S3 Buckets](https://docs.aws.amazon.com/AmazonS3/latest/dev/bucket-encryption.html)
     * in the Amazon S3 User Guide.
     */
    BucketEncryption?: {
      /** Specifies the default server-side-encryption configuration. */
      ServerSideEncryptionConfiguration: any[];
    };
    /**
     * A name for the bucket. If you don't specify a name, AWS CloudFormation generates a unique ID and uses
     * that ID for the bucket name. The bucket name must contain only lowercase letters, numbers, periods (.),
     * and dashes (-) and must follow Amazon S3 bucket restrictions and limitations. For more information,
     * see [Rules for naming Amazon S3 buckets](https://docs.aws.amazon.com/AmazonS3/latest/dev/BucketRestrictions.html)
     * in the Amazon S3 User Guide.
     *
     * Note: If you specify a name, you can't perform updates that require replacement of this resource.
     * You can perform updates that require no or some interruption. If you need to replace the resource,
     * specify a new name.
     */
    BucketName?: `${T}${string}`;
    /**
     * Describes the cross-origin access configuration for objects in an Amazon S3 bucket.
     * For more information, see
     * [Enabling Cross-Origin Resource Sharing](https://docs.aws.amazon.com/AmazonS3/latest/dev/cors.html)
     * in the Amazon S3 User Guide.
     */
    CorsConfiguration?: {
      CorsRules: IAwsS3CorsRule[];
    };
    /**
     * Defines how Amazon S3 handles Intelligent-Tiering storage.
     */
    IntelligentTieringConfigurations?: IAwsS3IntelligentTiering[];
    /**
     * Specifies the inventory configuration for an Amazon S3 bucket. For more information,
     * see [GET Bucket inventory](https://docs.aws.amazon.com/AmazonS3/latest/API/RESTBucketGETInventoryConfig.html)
     * in the Amazon S3 API Reference.
     */
    InventoryConfigurations?: IAwsS3InventoryConfig[];
    /**
     * Specifies the lifecycle configuration for objects in an Amazon S3 bucket. For more information,
     * see [Object Lifecycle Management](https://docs.aws.amazon.com/AmazonS3/latest/dev/object-lifecycle-mgmt.html)
     * in the Amazon S3 User Guide.
     */
    LifecycleConfiguration?: {
      /** A lifecycle rule for individual objects in an Amazon S3 bucket. */
      Rules: IAwsS3BucketRule[];
    };
    /**
     * Settings that define where logs are stored. [docs](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket-loggingconfiguration.html)
     */
    LoggingConfiguration?: {
      /**
       * The name of the bucket where Amazon S3 should store server access log files. You can store log files
       * in any bucket that you own. By default, logs are stored in the bucket where the LoggingConfiguration
       * property is defined.
       */
      DestinationBucketName?: string;
      /**
       * A prefix for all log object keys. If you store log files from multiple Amazon S3 buckets in a single bucket,
       * you can use a prefix to distinguish which log files came from which bucket.
       */
      LogFilePrefix?: string;
    };
    /**
     * Specifies a metrics configuration for the CloudWatch request metrics (specified by the metrics
     * configuration ID) from an Amazon S3 bucket. If you're updating an existing metrics configuration,
     * note that this is a full replacement of the existing metrics configuration. If you don't include
     * the elements you want to keep, they are erased. For more information,
     * see [PutBucketMetricsConfiguration](https://docs.aws.amazon.com/AmazonS3/latest/API/RESTBucketPUTMetricConfiguration.html).
     */
    MetricsConfigurations?: {
      Id: string;
      Prefix?: string;
      TagFilters?: IAwsResourceTag[];
    }[];
    /** Configuration that defines how Amazon S3 handles bucket notifications. */
    NotificationConfiguration?: {
      /** Describes the AWS Lambda functions to invoke and the events for which to invoke them. */
      LambdaConfigurations?: {
        Event: string;
        Filter?: any;
        Function: arn;
      }[];
      /** The Amazon Simple Queue Service queues to publish messages to and the events for which to publish messages. */
      QueueConfigurations?: {
        Event: string;
        Filter?: any;
        Queue: arn;
      }[];
      /** The topic to which notifications are sent and the events for which notifications are generated. */
      TopicConfigurations?: {
        /** The Amazon S3 bucket event about which to send notifications.  */
        Event: string;
        /**
         * The filtering rules that determine for which objects to send notifications. For example, you can
         * create a filter so that Amazon S3 sends notifications only when image files with a .jpg extension
         * are added to the bucket.
         */
        Filter?: any;
        /**
         * The Amazon Resource Name (ARN) of the Amazon SNS topic to which Amazon S3 publishes a message when
         * it detects events of the specified type.
         */
        Topic: arn;
      }[];
    };
    /**
     * Places an Object Lock configuration on the specified bucket. The rule specified in the Object Lock
     * configuration will be applied by default to every new object placed in the specified bucket. For more
     * information, see [Locking Objects](Locking Objects).
     */
    ObjectLockConfiguration?: {
      /**
       * Indicates whether this bucket has an Object Lock configuration enabled. Enable ObjectLockEnabled
       * when you apply ObjectLockConfiguration to a bucket.
       */
      ObjectLockEnabled?: "Enabled";
      Rule?: {
        DefaultRetention: {
          Days?: integer;
          Mode?: "COMPLIANCE" | "GOVERNANCE";
          Years?: integer;
        };
      };
    };
    /**
     * Indicates whether this bucket has an Object Lock configuration enabled. Enable ObjectLockEnabled
     * when you apply ObjectLockConfiguration to a bucket.
     */
    ObjectLockEnabled?: boolean;
    /**
     * Configuration that defines how Amazon S3 handles Object Ownership rules.
     */
    OwnershipControls?: {
      /** Specifies the container element for Object Ownership rules. */
      Rules: {
        ObjectOwnership?: "BucketOwnerEnforced" | "ObjectWriter" | "BucketOwnerPreferred";
      }[];
    };
    /**
     * Configuration that defines how Amazon S3 handles public access.
     */
    PublicAccessBlockConfiguration?: {
      /**
       * Specifies whether Amazon S3 should block public access control lists (ACLs) for this bucket
       * and objects in this bucket.
       */
      BlockPublicAcls?: boolean;
      /**
       * Specifies whether Amazon S3 should block public bucket policies for this bucket. Setting this element
       * to TRUE causes Amazon S3 to reject calls to PUT Bucket policy if the specified bucket policy allows
       * public access.
       *
       * Setting this element to TRUE causes the following behavior:
       * - PUT Bucket acl and PUT Object acl calls fail if the specified ACL is public.
       * - PUT Object calls fail if the request includes a public ACL.
       * - PUT Bucket calls fail if the request includes a public ACL.
       */
      BlockPublicPolicy?: boolean;
      /**
       * Specifies whether Amazon S3 should ignore public ACLs for this bucket and objects in this bucket.
       * Setting this element to TRUE causes Amazon S3 to ignore all public ACLs on this bucket and objects
       * in this bucket.
       *
       * Enabling this setting doesn't affect the persistence of any existing ACLs and doesn't prevent
       * new public ACLs from being set.
       */
      IgnorePublicAcls?: boolean;
      /**
       * Specifies whether Amazon S3 should restrict public bucket policies for this bucket. Setting this
       * element to TRUE restricts access to this bucket to only AWS service principals and authorized
       * users within this account if the bucket has a public policy.
       *
       * Enabling this setting doesn't affect previously stored bucket policies, except that public and
       * cross-account access within any public bucket policy, including non-public delegation to specific
       * accounts, is blocked.
       */
      RestrictPublicBuckets?: boolean;
    };
    /**
     * Configuration for replicating objects in an S3 bucket. To enable replication, you must also enable
     * versioning by using the VersioningConfiguration property.
     *
     * Amazon S3 can store replicated objects in a single destination bucket or multiple destination buckets.
     * The destination bucket or buckets must already exist.
     */
    ReplicationConfiguration?: {
      /**
       * The Amazon Resource Name (ARN) of the AWS Identity and Access Management (IAM) role that Amazon S3
       * assumes when replicating objects.
       */
      Role: arn;
      /**
       * A container for one or more replication rules. A replication configuration must have at least one rule
       * and can contain a maximum of 1,000 rules.
       */
      Rules: any[];
    };
    Tags?: IAwsResourceTag[];
    /**
     * Enables multiple versions of all objects in this bucket. You might enable versioning to prevent objects
     * from being deleted or overwritten by mistake or to archive objects so that you can retrieve previous
     * versions of them.
     */
    VersioningConfiguration?: {
      Status: "Enabled" | "Suspended";
    };
    /**
     * Information used to configure the bucket as a static website. For more information, see
     * [Hosting Websites on Amazon S3](https://docs.aws.amazon.com/AmazonS3/latest/dev/WebsiteHosting.html).
     */
    WebsiteConfiguration?: any;
  };
}

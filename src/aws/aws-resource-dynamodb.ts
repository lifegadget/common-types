import { arn, IAwsResourceTag } from "./index";

export type DynamoDbAttributeType = "S" | "N" | "BOOL" | 0 | 1 | "B" | "SS" | "NS" | "BS";

export interface DynamoTableProjection {
  NonKeyAtttributes: string[];
  ProjectionType?: "KEYS_ONLY" | " INCLUDE" | "ALL";
}

/**
 * A tuple with the hash/pk and then the range key/sk
 */
export type DynamoKeySchema = [hash: string, range: string];
export interface DynamoLSI {
  IndexName: string;
  KeySchema: DynamoKeySchema;
  Projection: DynamoTableProjection;
}
/**
 * Throughput for the specified table, which consists of values for ReadCapacityUnits and WriteCapacityUnits.
 * For more information about the contents of a provisioned throughput structure, see
 * [Amazon DynamoDB Table ProvisionedThroughput](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-dynamodb-provisionedthroughput.html).
 *
 * If you set BillingMode as PROVISIONED, you must specify this property. If you set BillingMode as PAY_PER_REQUEST,
 * you cannot specify this property.
 */
export interface IDynamoProvisionedThroughput {
  ReadCapacityUnits: number;
  WriteCapacityUnits: number;
}

export interface DynamoGSI {
  ContributorInsightsSpecification?: {
    Enabled: boolean;
  };
  IndexName: string;
  KeySchema: DynamoKeySchema;
  Projection: DynamoTableProjection;
  /**
   * Throughput for the specified table, which consists of values for ReadCapacityUnits and WriteCapacityUnits.
   * For more information about the contents of a provisioned throughput structure, see
   * [Amazon DynamoDB Table ProvisionedThroughput](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-dynamodb-provisionedthroughput.html).
   *
   * If you set BillingMode as PROVISIONED, you must specify this property. If you set BillingMode as PAY_PER_REQUEST,
   * you cannot specify this property.
   */
  ProvisionedThroughput?: IDynamoProvisionedThroughput;
}

export type DynamoBillingMode = "PROVISIONED" | "PAY_PER_REQUEST";

/**
 * a DynamoDB **Table** resource definition
 *
 * - [Cloudformation Docs](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-dynamodb-table.html)
 */
export interface IDynamoDbTableResource<T extends string = string> {
  Type: "AWS::DynamoDB::Table";
  Properties: {
    /**
     * The name of the table.
     *
     * This typically would consist of a common name `T` and then some additional
     * text at the end to
     */
    TableName: `${T}${string}`;
    TableClass?: "STANDARD" | "STANDARD_INFREQUENT_ACCESS";
    AttributeDefinitions: Array<{
      AttributeName: string;
      AttributeType: DynamoDbAttributeType;
    }>;
    /**
     * Specifies the attributes that make up the primary key for the table.
     *
     * The attributes in the KeySchema property must also be defined in the
     * `AttributeDefinitions` property.
     */
    KeySchema: Array<{ AttributeName: string; KeyType: "HASH" | "RANGE" }>;
    ProvisionedThroughput?: IDynamoProvisionedThroughput;
    /**
     * Specify how you are charged for read and write throughput and how you manage capacity.
     *
     * [ [docs](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-dynamodb-table.html#cfn-dynamodb-table-billingmode) ]
     */
    BillingMode?: DynamoBillingMode;
    /**
     * Global secondary indexes to be created on the table. You can create up to
     * 20 global secondary indexes.
     */
    GlobalSecondaryIndexes?: DynamoGSI[];
    LocalSecondaryIndexes?: DynamoLSI[];
    Tags?: IAwsResourceTag[];
    /**
     * Represents the DynamoDB Streams configuration for a table in DynamoDB.
     *
     * [ [docs](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-dynamodb-streamspecification.html) ]
     */
    StreamSpecification?: "KEYS_ONLY" | "NEW_IMAGE" | "OLD_IMAGE" | "NEW_AND_OLD_IMAGES";
    /** The settings used to enable or disable CloudWatch Contributor Insights. */
    ContributorInsightsSpecification?: {
      Enabled: boolean;
    };
    /** The Kinesis Data Streams configuration for the specified table. */
    KinesisStreamSpecification?: arn;
    PointInTimeRecoverySpecification?: {
      PointInTimeRecoveryEnabled: boolean;
    };
    SSESpecification?: {
      KMSMasterKeyId?: string;
      SSEEnabled: boolean;
      SSEType?: "KMS";
    };
    /** Represents the settings used to enable or disable Time to Live (TTL) for the specified table. */
    TimeToLiveSpecification?: {
      AttributeName: string;
      Enabled: boolean;
    };
  };
}

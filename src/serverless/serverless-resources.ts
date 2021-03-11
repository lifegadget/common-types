export interface IServerlessResources {
  // TODO: see if we can model some other examples
  Resources: IDynamoDbTableResource | Record<string, IServerlessResource>;
  extensions?: any;
  Outputs?: Record<string, IServerlessOutput>;
}

export interface IServerlessResource {
  Type: string;
  Properties: Record<string, any>;
}

export type DynamoDbAttributeType = "S" | "N" | "BOOL" | 0 | 1 | "B" | "SS" | "NS" | "BS";

export interface IDynamoDbTableResource {
  Type: "AWS::DynamoDB::Table";
  Properties: {
    TableName: string;
    AttributeDefinitions: Array<{
      AttributeName: string;
      AttributeType: DynamoDbAttributeType;
    }>;
    KeySchema: Array<{ AttributeName: string; KeyType: "HASH" | string }>;
    ProvisionedThroughput?: {
      ReadCapacityUnits?: number;
      WriteCapacityUnits?: number;
    };
  };
}

export interface IServerlessOutput {
  Description?: string;
  /**
   * Example:
   *
   * ```yaml
   * Value:
   *  'Fn::GetAtt': [userTable, Arn]
   * ```
   */
  Value: any;
  Export: {
    /**
     *  see Fn::ImportValue to use in other services and
     * [https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/outputs-section-structure.html](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/outputs-section-structure.html)
     * for documentation on use.
     */
    Name: string;
  };
}

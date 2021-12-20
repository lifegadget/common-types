import { IDynamoDbTableResource } from "~/aws";

export interface IServerlessResources {
  // TODO: see if we can model some other examples
  Resources: IDynamoDbTableResource | Record<string, IServerlessResource>;
  extensions?: any;
  Outputs?: Record<string, IServerlessOutput>;
}

/**
 * A generic representation of a _resource_ for CloudFormation
 */
export interface IServerlessResource {
  Type: string;
  Properties: Record<string, any>;
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

/**
 * Allows overwriting the default IAM role or configuring a logical role
 */
export type IServerlessIAMRole =
  /** Overwrite the default IAM role which is used for all functions */
  | string
  /** allows configure a logical role */
  | {
      /** IAM Managed Policies, which allows to include the policies into IAM Role */
      managedPolicies?: string;
      /** ARN of an Permissions Boundary for the role. */
      permissionsBoundary?: string;
      /** IAM role statements so that services can be accessed in the AWS account */
      statements: IServerlessIamRolePolicy[];
    };

export type IServerlessIamRolePolicy = {
  Effect: "Allow" | "Deny";
  /** A list of scopes (such as "s3:ListBucket" or "states:ListStateMachines") which are being allowed/denied */
  Action: string[];
  /** A list of resources (aka, arn's) which are to receive this role grant */
  Resource: string[] | any;
};

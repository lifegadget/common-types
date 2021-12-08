import { seconds } from "~/aliases";
import { arn, AwsResourceType, IAwsResourceTag } from "~/aws";

export interface IAwsIamRole<T extends string = string> {
  Type: AwsResourceType.iamRole;
  Properties: {
    /**
     * The trust policy that is associated with this role. Trust policies define which entities can assume the
     * role. You can associate only one trust policy with a role. For an example of a policy that can be used
     * to assume a role, see [Template Examples](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-role.html#aws-resource-iam-role--examples).
     * For more information about the elements that you can use in an IAM policy, see
     * [IAM Policy Elements Reference](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements.html) in the IAM User Guide.
     */
    AssumeRolePolicyDocument: JSON;
    /** A description of the role that you provide. */
    Description?: string;
    /**
     * A list of Amazon Resource Names (ARNs) of the IAM managed policies that you want to attach to the role.
     */
    ManagedPolicyArns?: arn[];
    /**
     * The maximum session duration (in seconds) that you want to set for the specified role. If you do not
     * specify a value for this setting, the default maximum of one hour is applied. This setting can have
     * a value from 1 hour to 12 hours.
     */
    MaxSessionDuration?: seconds;
    /**
     * The path to the role. For more information about paths, see
     * [IAM Identifiers](https://docs.aws.amazon.com/IAM/latest/UserGuide/Using_Identifiers.html) in the
     * IAM User Guide.
     *
     * This parameter is optional. If it is not included, it defaults to a slash (/).
     *
     * This parameter allows (through its regex pattern) a string of characters consisting of either a
     * forward slash (/) by itself or a string that must begin and end with forward slashes. In addition,
     * it can contain any ASCII character from the ! (\u0021) through the DEL character (\u007F), including
     * most punctuation characters, digits, and upper and lowercased letters.
     */
    Path?: string;
    /**
     * The ARN of the policy used to set the permissions boundary for the role.
     *
     * For more information about permissions boundaries,
     * see [Permissions boundaries for IAM identities](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_boundaries.html)
     * in the IAM User Guide.
     */
    PermissionsBoundary?: arn;
    /**
     * Adds or updates an inline policy document that is embedded in the specified IAM role.
     */
    Policies?: any;
    /**
     * A name for the IAM role, up to 64 characters in length. For valid values, see the
     * `RoleName` parameter for the [CreateRole](https://docs.aws.amazon.com/IAM/latest/APIReference/API_CreateRole.html)
     * action in the IAM User Guide.
     *
     * - If you don't specify a name, AWS CloudFormation generates a unique physical ID and uses that ID for the role name.
     * - If you specify a name, you must specify the CAPABILITY_NAMED_IAM value to acknowledge your template's capabilities.
     */
    RoleName?: T;
    /** A list of tags that are attached to the role.  */
    Tags?: IAwsResourceTag[];
  };
}

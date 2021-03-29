import { seconds } from "../aliases";
import { arn } from "../aws";
import { IApiGatewayAliasConfig } from "../serverless-plugins";
import { AWSRuntime, ILayerDefinition, ServerlessFunctionMemorySize } from "./serverless";
import { IServerlessEvent } from "./serverless-events";
import { IServerlessTracing } from "./serverless-tracing";
import { IServerlessVpcConfig } from "./serverless-vpc";

/**
 * The configuration for your serverless function.
 * The only required property is a "handler" property
 * pointing to the function definition itself and the
 * function to call within the file.
 */
export type IServerlessFunction = IServerlessFunctionHandler | IServerlessFunctionImage;

export interface IServerlessFunctionHandler extends IServerlessFunctionConfig {
  /**
   * the handler function in the form of "/path/to/file.HANDLER_FN" where
   * HANDLER_FN is typically "handler".
   *
   * Note: Cannot be used when `image` is defined.
   */
  handler: string;
}
export interface IServerlessFunctionImage extends IServerlessFunctionConfig {
  /**
   * Image to be used by function, cannot be used when `handler` is defined.
   * It can be configured as concrete uri of Docker image in ECR or as a
   * reference to image defined in `provider.ecr.images`
   */
  image: string;
}

/**
 * A type guard to ensure the passed in serverless configuration defines a "handler"
 * rather than an "image".
 *
 * @param config a serverless configuration
 */
export function isServerlessFunctionHandler(
  config: IServerlessFunction
): config is IServerlessFunctionHandler {
  return (config as IServerlessFunctionHandler).handler ? true : false;
}

/**
 * A type guard to ensure the passed in serverless configuration points to an
 * "image" rather than a "handler"
 *
 * @param config a serverless configuration
 */
export function isServerlessFunctionImage(
  config: IServerlessFunction
): config is IServerlessFunctionImage {
  return (config as IServerlessFunctionImage).image ? true : false;
}

export interface IServerlessFunctionConfig {
  /** optional, deployed Lambda name */
  name?: string;
  /** The description of your function. */
  description?: string;

  /**
   * the allocated "memory" of the virtual machine that will
   * run this function ... in reality is not only a proxy for
   * memory availability but also computational capability
   */
  memorySize?: ServerlessFunctionMemorySize;
  /**
   * Reserved concurrency limit for this function. By default, AWS uses account concurrency limit
   */
  reservedConcurrency?: number;
  /**
   * Count of provisioned lambda instances
   */
  provisionedConcurrency?: number;
  /**
   * Runtime for this specific function. Overrides the default which is set on the provider level.
   */
  runtime?: AWSRuntime;

  /** how many seconds before the function times out; overrides default set at provider level */
  timeout?: seconds;

  /** IAM role which will be used for this function */
  role?: string;

  /**
   * Optional SNS topic or SQS arn (Ref, Fn::GetAtt and Fn::ImportValue are supported as well)
   * which will be used for the DeadLetterConfig
   */
  onError?: arn;
  /**
   * Optional KMS key arn which will be used for encryption (overwrites the one defined on
   * the provider level)
   */
  kmsKeyArn?: arn;

  /**
   * Disables creation of CloudWatch Log Group
   */
  disableLogs?: boolean;

  /** Function level environment variables in key/value dictionary */
  environment?: Record<string, string>;

  /** Function level tags */
  tags?: Record<string, string>;

  /**
   * Optional VPC. But if you use VPC then both subproperties (securityGroupIds and subnetIds) are required
   */
  vpc?: IServerlessVpcConfig;

  /**
   * A functions X-Ray tracing configuration.
   *
   * **Pass Through:**
   * This is the default setting for all Lambda functions if you have added tracing permissions to your
   * function's execution role. This approach means the Lambda function is only traced if X-Ray has been
   * enabled on an upstream service, such as AWS Elastic Beanstalk.
   *
   * **Active:**
   * When a Lambda function has this setting, Lambda automatically samples invocation requests, based
   * on the sampling algorithm specified by X-Ray.
   */
  tracing?: "Active" | "Passthrough";

  package?: {
    artifact?: string;
    exclude?: string[];
    include?: string[];
  };

  /**
   * **aliasStage**
   *
   * If using the the [serverless-aws-alias](https://github.com/HyperBrain/serverless-aws-alias)
   * plugin then you can configure settings here.
   */
  aliasStage?: IApiGatewayAliasConfig;
  /**
   * Add AWS Layers to your function. You can refer to it either as
   * an ARN or a via [Cloudformation Reference](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference-ref.html). A cloudformation reference
   * might look something like `{Ref:MyLambdaLayer}` whereas an ARN reference
   * is just a standard ARN string.
   *
   * **Note:** the layer will be accessible at `/opt/*`. If the layer you are using is in
   * `node_modules` then it is advisable to add the following to your function definition:
```typescript
const fn: IServerlessFunction = {
  environment: {
    NODE_PATH: "/var/runtime/node_modules:/opt/node_modules"
  }
}
```
   * as this will ensure that your layer's NPM modules are included in your path
   */
  layers?: IArnStringReference[] | ICloudformationReference[] | ILayerDefinition;

  /** add 'Condition' clause */
  condition?: any;
  /**
   * appends these additional resources to the 'DependsOn' list
   */
  dependsOn?: string[];
  /** destinations for async invocations */
  destinations?: {
    /**
     * function name or ARN of a target (externally managed lambda, EventBridge event bus,
     * SQS queue or SNS topic)
     */
    onSuccess?: arn;
    /**
     * function name or ARN of a target (externally managed lambda, EventBridge event bus,
     * SQS queue or SNS topic)
     */
    onFailure?: arn;
  };
  /** allows configuration of an EFS mount point */
  fileSystemConfig?: {
    /** ARN of EFS Access Point */
    arn: arn;
    /** path under which EFS will be mounted and accessible by Lambda function */
    localMountPath: string;
  };
  /**
   * The Events that trigger this Function
   */
  events?: IServerlessEvent[];
}

export interface ICloudformationReference {
  Ref: string;
}

export type IArnStringReference = string;

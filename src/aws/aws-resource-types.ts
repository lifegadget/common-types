/**
 * CloudFormation resource types
 */
export enum AwsResourceType {
  /**
   * The `AWS::ApiGatewayV2::Model` resource updates data model for a WebSocket API. For more information,
   * see [Model Selection Expressions](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-websocket-api-selection-expressions.html#apigateway-websocket-api-model-selection-expressions)
   * in the API Gateway Developer Guide.
   *
   * [docs](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-model.html)
   */
  apiGatewayV2Model = "AWS::ApiGatewayV2::Model",
  /**
   * The `AWS::ApiGatewayV2::Api` resource creates an API. WebSocket APIs and HTTP APIs are supported. For more
   * information about WebSocket APIs, see About [WebSocket APIs in API Gateway ](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-websocket-api-overview.html)
   * in the API Gateway Developer Guide.
   * For more information about HTTP APIs, see [HTTP APIs](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api.html)
   * in the API Gateway Developer Guide.
   *
   * [docs](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-api.html)
   */
  apiGatewayV2Api = "AWS::ApiGatewayV2::Api",
  /**
   * [docs](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-route.html)
   */
  apiGatewayV2Route = "AWS::ApiGatewayV2::Route",
  /**
   * [docs](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-authorizer.html)
   */
  apiGatewayV2Authorizer = "AWS::ApiGatewayV2::Authorizer",
  /**
   * [docs](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-integration.html)
   */
  apiGatewayV2Integration = "AWS::ApiGatewayV2::Integration",
  /**
   * [docs](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-integrationresponse.html)
   */
  apiGatewayV2IntegrationResponse = "AWS::ApiGatewayV2::IntegrationResponse",

  /**
   * [docs](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-athena-datacatalog.html)
   */
  athenaDataCatalog = "AWS::Athena::DataCatalog",
  /**
   * [docs](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-athena-namedquery.html)
   */
  athenaNamedQuery = "AWS::Athena::NamedQuery",
  /**
   * [docs](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-athena-preparedstatement.html)
   */
  athenaPreparedStatement = "AWS::Athena::PreparedStatement",

  /**
   * Creates an Amazon Cognito identity pool.
   *
   * To avoid deleting the resource accidentally from AWS CloudFormation, use
   * [DeletionPolicy Attribute](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-attribute-deletionpolicy.html)
   * and the [UpdateReplacePolicy Attribute](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-attribute-updatereplacepolicy.html)
   * to retain the resource on deletion or replacement.
   *
   * [docs](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cognito-identitypool.html)
   */
  cognitoIdentityPool = "AWS::Cognito::IdentityPool",

  /**
   * The `AWS::Cognito::UserPool` resource creates an Amazon Cognito user pool. For more information on working with
   * Amazon Cognito user pools, see
   * [Amazon Cognito User Pools](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-identity-pools.html)
   * and [CreateUserPool](https://docs.aws.amazon.com/cognito-user-identity-pools/latest/APIReference/API_CreateUserPool.html).
   *
   * [CloudFormation Docs](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cognito-userpool.html)
   */
  cognitoUserPool = "AWS::Cognito::UserPool",

  /**
   * [docs](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cloudfront-distribution.html)
   */
  cloudfrontDistribution = "AWS::Cloudfront::Distribution",
  /**
   * [docs](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cloudfront-function.html)
   */
  cloudfrontFunction = "AWS::Cloudfront::Function",

  /**
   * The `AWS::CloudWatch::Alarm` type specifies an alarm and associates it with the specified metric
   * or metric math expression.
   *
   * [docs](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-cw-alarm.html)
   */
  cloudwatchAlarm = "AWS::CloudWatch::Alarm",
  /**
   * [docs](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cloudwatch-dashboard.html)
   */
  cloudwatchDashboard = "AWS::CloudWatch::Dashboard",
  /**
   * The `AWS::CloudWatch::AnomalyDetector` type specifies an anomaly detection band for a certain metric and statistic.
   * The band represents the expected "normal" range for the metric values. Anomaly detection bands can be used for
   * visualization of a metric's expected values, and for alarms.
   *
   * [docs](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cloudwatch-anomalydetector.html)
   */
  cloudwatchAnomalyDetector = "AWS::CloudWatch::AnomalyDetector",
  /**
   * [docs](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cloudwatch-insightrule.html)
   */
  cloudwatchInsightRule = "AWS::CloudWatch::InsightRule",

  /**
   * The `AWS::Logs::LogGroup` resource specifies a log group. A log group defines common properties for log streams,
   * such as their retention and access control rules. Each log stream must belong to one log group.
   *
   * [docs](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-logs-loggroup.html)
   */
  cloudwatchLogGroup = "AWS::CloudWatch::LogGroup",
  /**
   * The AWS::Logs::LogStream resource specifies an Amazon CloudWatch Logs log stream in a specific log group.
   * A log stream represents the sequence of events coming from an application instance or resource that you are monitoring.
   *
   * [docs](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-logs-logstream.html)
   */
  cloudwatchLogStream = "AWS::CloudWatch::LogStream",

  /**
   * The `AWS::Logs::MetricFilter` resource specifies a metric filter that describes how CloudWatch Logs extracts
   * information from logs and transforms it into Amazon CloudWatch metrics. If you have multiple metric filters
   * that are associated with a log group, all the filters are applied to the log streams in that group.
   *
   * [docs](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-logs-metricfilter.html)
   */
  cloudwatchMetricFilter = "AWS::CloudWatch::MetricFilter",
  /**
   * Creates or updates a resource policy that allows other AWS services to put log events to this account.
   * An account can have up to 10 resource policies per AWS Region.
   *
   * [docs](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-logs-resourcepolicy.html)
   */
  cloudwatchResourcePolicy = "AWS::CloudWatch::ResourcePolicy",

  /**
   * Creates a trail that specifies the settings for delivery of log data to an Amazon S3 bucket.
   *
   * [docs](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cloudtrail-trail.html)
   */
  cloudTrail = "AWS::CloudTrail::Trail",

  /**
   * [docs](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-role.html)
   */
  iamRole = "AWS::IAM::Role",
  /**
   * [docs](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-policy.html)
   */
  iamPolicy = "AWS::IAM::Policy",
  /**
   * [docs](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iam-user.html)
   */
  iamUser = "AWS::IAM::User",
  /**
   * [docs](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iam-group.html)
   */
  iamGroup = "AWS::IAM::Group",

  /**
   * [docs](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-dynamodb-table.html)
   */
  dynamoTable = "AWS::DynamoDB::Table",
  /**
   * [docs](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-dynamodb-globaltable.html)
   */
  dynamoGlobalTable = "AWS::DynamoDB::GlobalTable",

  /**
   * Creates a new event bus within your account. This can be a custom event bus which you can use to receive
   * events from your custom applications and services, or it can be a partner event bus which can be matched
   * to a partner event source.
   *
   * [docs](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-events-eventbus.html)
   */
  eventBridgeEventBus = "AWS::EVENTS::EventBus",
  /**
   * Creates or updates the specified rule. Rules are enabled by default, or based on value of the state.
   * You can disable a rule using [DisableRule](https://docs.aws.amazon.com/eventbridge/latest/APIReference/API_DisableRule.html).
   *
   * A single rule watches for events from a single event bus. Events generated by AWS services go to your
   * account's default event bus. Events generated by SaaS partner services or applications go to the matching
   * partner event bus. If you have custom applications or services, you can specify whether their events go
   * to your default event bus or a custom event bus that you have created. For more information, see
   * [CreateEventBus](https://docs.aws.amazon.com/eventbridge/latest/APIReference/API_CreateEventBus.html).
   *
   * [docs](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-events-rule.html)
   */
  eventBridgeRule = "AWS::EVENTS::Rule",
  /**
   * [docs](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-events-apidestination.html)
   */
  eventBridgeApiDestination = "AWS::EVENTS::ApiDestination",
  /**
   * Creates a connection. A connection defines the authorization type and credentials to use for authorization
   * with an API destination HTTP endpoint.
   *
   * [docs](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-events-connection.html)
   */
  eventBridgeConnection = "AWS::EVENTS::Connection",

  /**
   * Used to specify an event schema.
   *
   * [docs](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-eventschemas-schema.html)
   */
  eventBridgeSchema = "AWS::EventSchemas::Schema",

  /**
   * [docs](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-fms-policy.html)
   */
  firewallPolicy = "AWS::FMS::Policy",

  /**
   * [docs](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-lambda-permission.html)
   */
  lambdaPermission = "AWS::Lambda::Permission",
  /**
   * [docs](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-lambda-function.html)
   */
  lambdaFunction = "AWS::Lambda::Function",
  /**
   * [docs](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-lambda-alias.html)
   */
  lambdaAlias = "AWS::Lambda::Alias",

  /**
   * The `AWS::S3::Bucket` resource creates an Amazon S3 bucket in the same AWS Region where you
   * create the AWS CloudFormation stack. To control how AWS CloudFormation handles the bucket
   * when the stack is deleted, you can set a deletion policy for your bucket. You can choose
   * to retain the bucket or to delete the bucket. For more information, see
   * [DeletionPolicy Attribute](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-attribute-deletionpolicy.html).
   *
   * [CloudFormation docs](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-s3-bucket.html)
   */
  s3Bucket = "AWS::S3::Bucket",
  /**
   * [docs](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-s3-accesspoint.html)
   */
  s3AccessPoint = "AWS::S3::AccessPoint",

  /**
   * [docs](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sns-subscription.html) */
  snsSubscription = "AWS::SNS::Subscription",
  /**
   * [docs](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sns-topic.html)
   */
  snsTopic = "AWS::SNS::Topic",

  sesTemplate = "AWS::SES::Template",
  sesContactList = "AWS::SES::ContactList",
  sesReceiptRule = "AWS::SES::ReceiptRule",
  sesReceiptFilter = "AWS::SES::ReceiptFilter",
  sesReceiptRuleSet = "AWS::SES::ReceiptRuleSet",

  /**
   * Creates a new secret. A secret is a set of credentials, such as a user name and password, that you
   * store in an encrypted form in Secrets Manager. The secret also includes the connection information
   * to access a database or other service, which Secrets Manager doesn't encrypt. A secret in Secrets
   * Manager consists of both the protected secret data and the important information needed to manage
   * the secret.
   *
   * [docs](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-secretsmanager-secret.html)
   */
  secretsManagerSecret = "AWS::SecretsManager::Secret",

  /**
   * [docs](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ssm-parameter.html)
   */
  ssmParameter = "AWS::SSM:Parameter",

  /**
   * [docs](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sns-policy.html)
   */
  snsTopicPolicy = "AWS::SNS::TopicPolicy",
  /**
   * [docs](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sqs-queues.html)
   */
  sqsQueue = "AWS::SQS::Queue",
  /**
   * [docs](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sqs-queuepolicy.html)
   */
  sqsQueuePolicy = "AWS::SQS::QueuePolicy",

  /**
   * [docs](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-stepfunctions-activity.html)
   */
  stepFunctionsActivity = "AWS::StepFunctions::Activity",
  /**
   * [docs](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-stepfunctions-statemachine.html)
   */
  stepFunctionsStateMachine = "AWS::StepFunctions::StateMachine",

  /**
   * [docs](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-wafv2-rulegroup.html)
   */
  waf2RuleGroup = "AWS::WAFv2::RuleGroup",
  /**
   * [docs](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-wafv2-webacl.html)
   */
  waf2WebAcl = "AWS::WAFv2::WebACL",
}

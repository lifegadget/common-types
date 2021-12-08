import { integer } from "~/aliases";
import { arn, AwsResourceType } from "~/aws";

/**
 * The `AWS::ApiGatewayV2::Model` resource updates data model for a WebSocket API. For more information,
 * see [Model Selection Expressions](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-websocket-api-selection-expressions.html#apigateway-websocket-api-model-selection-expressions)
 * in the API Gateway Developer Guide.
 *
 * [docs](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-model.html)
 *
 * Example:
 * ```json
 * {
 *  "MyModel": {
 *      "Type": "AWS::ApiGatewayV2::Model",
 *      "Properties": {
 *          "Name": "ModelName",
 *          "ApiId": {
 *              "Ref": "MyApi"
 *          },
 *          "ContentType": "application/json",
 *          "Schema": {
 *              "$schema": "http://json-schema.org/draft-04/schema#",
 *              "title": "DummySchema",
 *              "type": "object",
 *              "properties": {
 *                  "id": {
 *                      "type": "string"
 *                  }
 *              }
 *          }
 *      }
 *  }
 * }
 * ```
 */
export interface IAwsApiGatewayV2Model {
  /** The API identifier. */
  ApiId: string;
  /**
   * The content-type for the model, for example, "application/json".
   */
  ContentType?: string;
  /** The description of the model. */
  Description?: string;
  /** The name of the model. */
  Name: string;
  /**
   * The schema for the model. For application/json models, this should be JSON schema draft 4 model.
   */
  Schema: JSON;
}

/**
 * The `AWS::ApiGatewayV2::Integration` resource creates an integration for an API.
 */
export interface IAwsAPiGatewayV2Integration {
  Type: AwsResourceType.apiGatewayV2Integration;
  Properties: {
    /** The API identifier. */
    ApiId: string;
    /**
     * The ID of the VPC link for a private integration. Supported only for HTTP APIs.
     */
    ConnectionId?: string;
    /**
     * The type of the network connection to the integration endpoint. Specify INTERNET for connections
     * through the public routable internet or VPC_LINK for private connections between API Gateway and
     * resources in a VPC. The default value is INTERNET.
     */
    ConnectionType?: "INTERNET" | "VPC_LINK";
    /**
     * Supported only for WebSocket APIs. Specifies how to handle response payload content type conversions.
     * - `CONVERT_TO_BINARY`: Converts a response payload from a Base64-encoded string to the corresponding binary blob.
     * - `CONVERT_TO_TEXT`: Converts a response payload from a binary blob to a Base64-encoded string.
     */
    ContentHandlingStrategy?: "CONVERT_TO_BINARY" | "CONVERT_TO_TEXT";
    /**
     * Specifies the credentials required for the integration, if any. For AWS integrations, three options
     * are available.
     * - To specify an IAM Role for API Gateway to assume, use the role's Amazon Resource Name (ARN).
     * - To require that the caller's identity be passed through from the request, specify the string arn:aws:iam::*:user/*.
     * - To use resource-based permissions on supported AWS services, don't specify this parameter.
     */
    CredentialsArn?: arn;
    Description?: string;
    /**
     * Specifies the integration's HTTP method type.
     */
    IntegrationMethod?: string;
    /**
     * Supported only for HTTP API AWS_PROXY integrations. Specifies the AWS service action to invoke.
     */
    IntegrationSubtype?: string;
    /**
     * The integration type of an integration.
     * - `AWS`: for integrating the route or method request with an AWS service action, including the Lambda function-invoking action. With the Lambda function-invoking action, this is referred to as the Lambda custom integration. With any other AWS service action, this is known as AWS integration. Supported only for WebSocket APIs.
     * - `AWS_PROXY`: for integrating the route or method request with a Lambda function or other AWS service action. This integration is also referred to as a Lambda proxy integration.
     * - `HTTP`: for integrating the route or method request with an HTTP endpoint. This integration is also referred to as the HTTP custom integration. Supported only for WebSocket APIs.
     * - `HTTP_PROXY`: for integrating the route or method request with an HTTP endpoint, with the client request passed through as-is. This is also referred to as HTTP proxy integration. For HTTP API private integrations, use an HTTP_PROXY integration.
     * - `MOCK`: for integrating the route or method request with API Gateway as a "loopback" endpoint without invoking any backend. Supported only for WebSocket APIs.
     */
    IntegrationType?: "AWS" | "AWS_PROXY" | "HTTP" | "HTTP_PROXY" | "MOCK";
    /**
     * - For a Lambda integration, specify the URI of a Lambda function.
     * - For an HTTP integration, specify a fully-qualified URL.
     * - For an HTTP API private integration, specify the ARN of an Application Load Balancer listener, Network Load Balancer listener, or AWS Cloud Map service.
     */
    IntegrationUri?: string;
    /**
     * Specifies the pass-through behavior for incoming requests based on the Content-Type header in the
     * request, and the available mapping templates specified as the requestTemplates property on the
     * Integration resource. There are three valid values: WHEN_NO_MATCH, WHEN_NO_TEMPLATES, and NEVER.
     * Supported only for WebSocket APIs.
     */
    PassthroughBehavior?: "WHEN_NO_MATCH" | "WHEN_NO_TEMPLATES" | "NEVER";
    /**
     * Specifies the format of the payload sent to an integration. Required for HTTP APIs. For HTTP APIs,
     * supported values for Lambda proxy integrations are 1.0 and 2.0. For all other integrations,
     * 1.0 is the only supported value. To learn more, see
     * [Working with AWS Lambda proxy integrations for HTTP APIs](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-develop-integrations-lambda.html).
     */
    PayloadFormatVersion?: string;
    /**
     * For WebSocket APIs, a key-value map specifying request parameters that are passed from the method
     * request to the backend. The key is an integration request parameter name and the associated value
     * is a method request parameter value or static value that must be enclosed within single quotes and
     * pre-encoded as required by the backend. The method request parameter value must match the pattern
     * of method.request.{location}.{name} , where {location} is querystring, path, or header; and {name}
     * must be a valid and unique method request parameter name.
     *
     * For HTTP API integrations with a specified integrationSubtype, request parameters are a key-value
     * map specifying parameters that are passed to AWS_PROXY integrations. You can provide static values,
     * or map request data, stage variables, or context variables that are evaluated at runtime. To learn more,
     * see [Working with AWS service integrations for HTTP APIs](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-develop-integrations-aws-services.html).
     *
     * For HTTP API integrations without a specified integrationSubtype request parameters are a key-value
     * map specifying how to transform HTTP requests before sending them to the backend. The key should follow
     * the pattern <action>:<header|querystring|path>.<location> where action can be append, overwrite or
     * remove. For values, you can provide static values, or map request data, stage variables, or context
     * variables that are evaluated at runtime. To learn more, see
     * [Transforming API requests and responses](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-parameter-mapping.html).
     */
    RequestParameters?: JSON;
    /**
     * Represents a map of Velocity templates that are applied on the request payload based on the value of
     * the Content-Type header sent by the client. The content type value is the key in this map, and the
     * template (as a String) is the value. Supported only for WebSocket APIs.
     */
    RequestTemplates?: JSON;
    /**
     * Supported only for HTTP APIs. You use response parameters to transform the HTTP response from a backend
     * integration before returning the response to clients. Specify a key-value map from a selection key to
     * response parameters. The selection key must be a valid HTTP status code within the range of 200-599.
     * The value is of type [ResponseParameterList](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apigatewayv2-integration-responseparameterlist.html).
     * To learn more, see
     * [Transforming API requests and responses](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-parameter-mapping.html).
     */
    ResponseParameters?: JSON;
    TemplateSelectionExpression?: string;
    TimeoutInMillis?: integer;
    TlsConfig?: {
      /**
       * If you specify a server name, API Gateway uses it to verify the hostname on the
       * integration's certificate. The server name is also included in the TLS handshake
       * to support Server Name Indication (SNI) or virtual hosting.
       */
      ServerNameToVerify?: string;
    };
  };
}

/**
 * The `AWS::ApiGatewayV2::IntegrationResponse` resource updates an integration response for
 * an WebSocket API. For more information, see
 * [Set up WebSocket API Integration Responses in API Gateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-websocket-api-integration-responses.html)
 * in the API Gateway Developer Guide.
 */
export interface IAwsApiGatewayV2IntegrationResponse {
  Type: AwsResourceType.apiGatewayV2IntegrationResponse;
  Properties: {
    ApiId: string;
    ContentHandlingStrategy: string;
    IntegrationId: string;
    IntegrationResponseKey: string;
    ResponseParameters: JSON;
    ResponseTemplates: JSON;
    TemplateSelectionExpression: string;
  };
}

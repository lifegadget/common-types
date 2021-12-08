import { arn, AwsResourceType } from ".";
import { integer } from "..";

export interface IAwsCognitoIdentityProvider {
  /** The client ID for the Amazon Cognito user pool. */
  ClientId?: string;
  /**
   * The provider name for an Amazon Cognito user pool.
   *
   * For example:
   * - `cognito-idp.us-east-2.amazonaws.com/us-east-2_123456789.`
   */
  ProviderName?: string;
  /**
   * TRUE if server-side token validation is enabled for the identity provider’s token.
   *
   * After you set the ServerSideTokenCheck to TRUE for an identity pool, that identity
   * pool checks with the integrated user pools to make sure the user has not been globally
   * signed out or deleted before the identity pool provides an OIDC token or AWS
   * credentials for the user.
   */
  ServerSideTokenCheck?: boolean;
}

/** Creates an Amazon Cognito identity pool. */
export interface IAwsCognitoIdentityPool<T extends string = string> {
  Type: AwsResourceType.cognitoIdentityPool;
  Properties: {
    AllowClassFlow?: boolean;
    AllowUnauthenticatedIdentities: boolean;
    CognitoEvents?: JSON;
    /** represents the Amazon Cognito user pool(s) and their client ID */
    CognitoIdentityProviders?: IAwsCognitoIdentityPool[];
    CognitoStreams?: {
      RoleArn?: arn;
      StreamingStatus?: string;
      StreamName?: string;
    };
    /**
     * The "domain" Amazon Cognito uses when referencing your users. This name acts as a
     * placeholder that allows your backend and the Amazon Cognito service to communicate
     * about the developer provider. For the DeveloperProviderName, you can use letters
     * and periods (.), underscores (_), and dashes (-).
     */
    DeveloperProviderName?: string;
    /** The name of your Amazon Cognito identity pool. */
    IdentityPoolName?: T;
    OpenIdConnectProviderARNs?: arn[];
    /**
     * `PushSync` is a property of the AWS::Cognito::IdentityPool resource that defines
     * the configuration options to be applied to an Amazon Cognito identity pool.
     */
    PushSync?: {
      ApplicationArns?: arn[];
      RoleArn?: arn;
    };
    /** The Amazon Resource Names (ARNs) of the Security Assertion Markup Language (SAML) providers. */
    SamlProviderARNs?: arn[];
    SupportedLoginProviders?: JSON;
  };
}

export interface IAwsCognitoRecoveryOption {
  /** Specifies the recovery method for a user. */
  Name?: "admin_only" | "verified_email" | "verified_phone_number";
  /** A positive integer specifying priority of a method with 1 being the highest priority. */
  Priority?: integer;
}

/** The configuration for `AdminCreateUser` requests. */
export interface IAwsCognitoAdminCreateUser {
  /**
   * Set to True if only the administrator is allowed to create user profiles.
   * Set to False if users can sign themselves up via an app.
   */
  AllowAdminCreateUserOnly?: boolean;
  /** The message template to be used for the welcome message to new users. */
  InviteMessageTemplate?: any;
  /**
   * The user account expiration limit, in days, after which the account is no longer usable.
   * To reset the account after that time limit, you must call AdminCreateUser again, specifying
   * "RESEND" for the MessageAction parameter. The default value for this parameter is 7.
   */
  UnusedAccountValidityDays?: integer;
}

export type CognitoAliasAttributes = "phone_number" | "email" | "preferred_username";
export type CognitoAutoVerfiedAttributes = "phone_number" | "email";
export type CognitoEmailSendingAccount = "COGNITO_DEFAULT" | "DEVELOPER";
export type CognitoMfaSetting = "SMS_MFA" | "SOFTWARE_TOKEN_MFA";

export interface IAwsCognitoEmailConfig {
  /**
   * The set of configuration rules that can be applied to emails sent using Amazon SES.
   * A configuration set is applied to an email by including a reference to the configuration
   * set in the headers of the email. Once applied, all of the rules in that configuration
   * set are applied to the email.
   *
   * Configuration sets can be used to apply the following types of rules to emails:
   *
   * - **Event publishing** – Amazon SES can track the number of send, delivery, open, click,
   * bounce, and complaint events for each email sent. Use event publishing to send information
   * about these events to other AWS services such as SNS and CloudWatch.
   * - **IP pool management** - When leasing dedicated IP addresses with Amazon SES, you can
   * create groups of IP addresses, called dedicated IP pools. You can then associate the
   * dedicated IP pools with configuration sets.
   */
  ConfigurationSet?: string;
  /**
   * Specifies whether Amazon Cognito emails your users by using its built-in email functionality
   * or your Amazon SES email configuration.
   */
  EmailSendingAccount?: CognitoEmailSendingAccount;
  /**
   * Identifies either the sender's email address or the sender's name with their email address.
   *
   * Examples:
   * - testuser@example.com
   * - Test User &lt;testuser@example.com&gt;
   */
  From?: string;
  /** The destination to which the receiver of the email should reply to. */
  ReplyToEmailAddress?: string;
  /**
   * The Amazon Resource Name (ARN) of a verified email address in Amazon SES. This email address
   * is used in one of the following ways, depending on the value that you specify for the EmailSendingAccount parameter:
   *
   * - If you specify COGNITO_DEFAULT, Amazon Cognito uses this address as the custom FROM address when it emails your users by using its built-in email account.
   * - If you specify DEVELOPER, Amazon Cognito emails your users with this address by calling Amazon SES on your behalf.
   */
  SourceArn: arn;
}

/** Specifies the configuration for AWS Lambda triggers. */
export interface IAwsCognitoLambdaConfig {
  /** Creates an authentication challenge. */
  CreateAuthChallenge?: string;
  /** Not currently supported by AWS CloudFormation. */
  CustomEmailSender?: {
    /** Not currently supported by AWS CloudFormation. */
    LambdaArn?: arn;
    /** Not currently supported by AWS CloudFormation. */
    LambdaVersion?: never;
  };
  /** A custom Message AWS Lambda trigger. */
  CustomMessage?: arn;
  /** Not currently supported by AWS CloudFormation. */
  CustomSMSSender?: {
    /** Not currently supported by AWS CloudFormation. */
    LambdaArn?: arn;
    /** Not currently supported by AWS CloudFormation. */
    LambdaVersion?: never;
  };
  /** Defines the authentication challenge. */
  DefineAuthChallenge?: string;
  /** Not currently supported by AWS CloudFormation. */
  KMSKeyID?: string;
  /** A post-authentication AWS Lambda trigger. */
  PostAuthentication?: arn;
  /** A post-confirmation AWS Lambda trigger. */
  PostConfirmation?: arn;
  /** A pre-authentication AWS Lambda trigger. */
  PreAuthentication?: arn;
  /** A pre-registration AWS Lambda trigger. */
  PreSignUp?: arn;
  /** A Lambda trigger that is invoked before token generation. */
  PreTokenGeneration?: arn;
  /** The user migration Lambda config type. */
  UserMigration?: arn;
  /** Verifies the authentication challenge response. */
  VerifyAuthChallengeRespose?: arn;
}

/** The password policy type. */
export interface IAwsCognitoPasswordPolicy {
  MinimumLength?: integer;
  RequireLowercase?: boolean;
  RequireNumbers?: boolean;
  RequireSymbols?: boolean;
  RequireUppercase?: boolean;
  TemporaryPasswordValidityDays?: integer;
}

/** Contains information about the schema attribute. */
export interface IAwsCognitoUserPoolSchemaAttribute {
  /**  */
  AttributeDataType?: "Boolean" | "DateTime" | "Number" | "String";
  /**
   * Specifies whether the attribute type is developer only. This attribute can only be
   * modified by an administrator. Users will not be able to modify this attribute
   * using their access token.
   */
  DeveloperOnlyAttribute?: boolean;
  /**
   * Specifies whether the value of the attribute can be changed.
   */
  Mutable?: boolean;
  /** A schema attribute of the name type. */
  Name?: string;
  /**Specifies the constraints for an attribute of the number type. */
  NumberAttributeConstraints?: {
    MaxValue?: string;
    MinValue?: string;
  };
  /**
   * Specifies whether a user pool attribute is required. If the attribute is required
   * and the user does not provide a value, registration or sign-in will fail.
   */
  Required?: boolean;

  StringAttributeConstraints?: {
    MaxValue?: string;
    MinValue?: string;
  };
}

/**
 * The `AWS::Cognito::UserPool` resource creates an Amazon Cognito user pool.
 * For more information on working with Amazon Cognito user pools,
 * see [Amazon Cognito User Pools](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-identity-pools.html)
 * and [CreateUserPool](https://docs.aws.amazon.com/cognito-user-identity-pools/latest/APIReference/API_CreateUserPool.html).
 */
export interface IAwsCognitoUserPool<T extends string = string> {
  Type: AwsResourceType.cognitoUserPool;
  Properties: {
    AccountRecoverySetting: {
      RecoverMechanims?: IAwsCognitoRecoveryOption[];
    };
    AdminCreateUserConfig?: IAwsCognitoAdminCreateUser;
    /** Attributes supported as an alias for this user pool. */
    AliasAttributes?: CognitoAliasAttributes[];
    /** The attributes to be auto-verified.  */
    AutoVerifiedAttributes?: CognitoAutoVerfiedAttributes[];
    /** The device configuration. */
    DeviceConfiguration?: {
      /** Indicates whether a challenge is required on a new device. Only applicable to a new device. */
      ChallengeRequiredOnNewDevice?: boolean;
      /** If true, a device is only remembered on user prompt. */
      DeviceOnlyRememberedOnUserPrompt?: boolean;
    };
    EmailConfiguration?: IAwsCognitoEmailConfig;
    /**
     * A string representing the email verification message.
     * EmailVerificationMessage is allowed only if EmailSendingAccount is DEVELOPER.
     */
    EmailVerificationMessage?: string;
    /**
     * A string representing the email verification subject.
     * EmailVerificationSubject is allowed only if EmailSendingAccount is DEVELOPER.
     */
    EmailVerificationSubject?: string;
    /**
     * Enables MFA on a specified user pool. To disable all MFAs after it has been enabled, set MfaConfiguration to “OFF”
     * and remove EnabledMfas. MFAs can only be all disabled if MfaConfiguration is OFF. Once SMS_MFA is enabled, SMS_MFA
     * can only be disabled by setting MfaConfiguration to “OFF”.
     *
     * Values can be:
     *
     * - **SMS_MFA** -  Enables SMS MFA for the user pool. SMS_MFA can only be enabled if SMS configuration is provided.
     * - **SOFTWARE_TOKEN_MFA** - Enables software token MFA for the user pool.
     */
    EnabledMfas?: CognitoMfaSetting[];
    /**
     * The Lambda trigger configuration information for the new user pool.
     */
    LambdaConfig?: IAwsCognitoLambdaConfig;
    MfaConfiguration?: "ON" | "OFF" | "OPTIONAL";
    /** The policy associated with a user pool. */
    Policiies?: {
      PasswordPolicy?: IAwsCognitoPasswordPolicy;
    };
    /**
     * The schema attributes for the new user pool. These attributes can be standard or custom attributes.
     *
     * Note: _during a user pool update, you can add new schema attributes but you cannot modify or delete an
     * existing schema attribute._
     */
    Schema: IAwsCognitoUserPoolSchemaAttribute[];
    SmsAuthenticationMessage: string;
    SmsConfiguration: any;
    SmsVerificationMessage: string;
    UsernameAttributes: string[];
    UsernameConfiguration: {
      CaseSensitive?: boolean;
    };
    UserPoolAddOns: {
      AdvancedSecurityMode?: "AUDIT" | "ENFORCED" | "OFF";
      [key: string]: any;
    };
    UserPoolName: T;
    UserPoolTags: JSON;
    VerificationMessageTemplate: {
      DefaultEmailOption?: "CONFIRM_WITH_CODE" | "CONFIRM_WITH_LINK";
      /**
       * The email message template. EmailMessage is allowed only if EmailSendingAccount is DEVELOPER.
       */
      EmailMessage?: string;
      /**
       * The email message template for sending a confirmation link to the user. EmailMessageByLink is
       * allowed only if EmailSendingAccount is DEVELOPER.
       */
      EmailMessageByLink?: string;
      /**
       * The subject line for the email message template. EmailSubject is allowed only if
       * EmailSendingAccount is DEVELOPER.
       */
      EmailSubject?: string;
      /**
       * The subject line for the email message template for sending a confirmation link to the user.
       * EmailSubjectByLink is allowed only EmailSendingAccount is DEVELOPER.
       */
      EmailSubjectByLink?: string;
      /** The SMS message template. */
      SmsMessage?: string;
    };
  };
}

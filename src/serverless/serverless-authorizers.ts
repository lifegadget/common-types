import { scalar, seconds, url } from "../aliases";

export type IServerlessAuthorizer = {
  /**
   * If set to 'allow' this allows the request to be forwarded to the target when user is
   * not authenticated. When omitted it defaults 'deny' which makes a HTTP 401 Unauthorized
   * error be returned. Alternatively configure to 'authenticate' to redirect request to IdP
   * authorization endpoint.
   */
  onUnauthenticatedRequest: "deny" | "allow";
  /**
   * The query parameters (up to 10) to include in the redirect request to the authorization
   * endpoint.
   */
  requestExtraParams?: Record<string, scalar>;
} & (IServerlessCognito | IServerlessOidc);

export interface IServerlessCognito {
  type: "cognito";
  userPoolArn: string;
  userPoolClientId: string;
  userPoolDomain: string;

  /**
   * Can be a combination of any system-reserved scopes or custom scopes associated with the client.
   * The default is `openid`.
   */
  scope?: string;
  /**
   * The name of the cookie used to maintain session information. The default is `AWSELBAuthSessionCookie`.
   */
  sessionCookieName?: string;
  /**
   * The maximum duration of the authentication session, in seconds. The default is 604800 seconds (7 days).
   */
  sessionTimeout?: seconds;
}

export interface IServerlessOidc {
  type: "oidc";
  authorizationEndpoint: string;
  clientId: string;
  /**
   * if creating a rule this is required. If modifying a rule, this can be omitted
   * if you set useExistingClientSecret to true (as below)
   */
  clientSecret?: string;
  /** only required if clientSecret is omitted */
  useExistingClientSecret: boolean;
  /**
   * The OIDC issuer identifier of the IdP. This must be a full URL, including the HTTPS protocol,
   * the domain, and the path.
   */
  issuer: url;
  tokenEndpoint: url;
  userInfoEndpoint: url;
}

export interface IServerlessJwtAuthorizer {
  /** for instance: `$request.header.Authorization` */
  identitySource: string;
  /** for instance: `https://cognito-idp.us-east-1.amazonaws.com/us-east-1_xxxxx` */
  issuerUrl: url;
  audience?: string[];
}

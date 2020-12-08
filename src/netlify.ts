import { numberAsString } from "./aliases";
import { IAWSLambdaProxyIntegrationRequest, IAWSLambdaProxyIntegrationRequestHeaders } from "./aws";

export interface INetlifyRequestHeader {
  "content-type": string;
  "user-agent": string;
  "cache-control": "no-cache" | string;
  host: string;
  "accept-encoding": string;
  connection: "keep-alive" | string;
  "content-length": numberAsString;
  /**
   * The Client's IP address; appears to report `::1` when
   * runnning in the "netlify dev" mode.
   */
  "client-ip": "::1" | "x.x.x.x" | string;
  [key: string]: string;
}

export interface INetlifyRequest extends Omit<IAWSLambdaProxyIntegrationRequest, "headers"> {
  queryStringParameters: Record<string, string | number | boolean>;
  headers: INetlifyRequestHeader;
}

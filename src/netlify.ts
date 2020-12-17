import { numberAsString } from "./aliases";
import {
  IAWSLambdaProxyIntegrationRequest,
  IAWSLambdaProxyIntegrationRequestHeaders,
} from "./aws";

export interface INetlifyRequestHeader {
  "content-type": string;
  "user-agent": string;
  "cache-control": "no-cache" | string;
  host: string;
  "accept-encoding": string;
  /** will look something like "en-GB,en-US;q=0.9,en;q=0.8" */
  "accept-language": string;
  connection: "keep-alive" | string;
  "content-length": numberAsString;
  /**
   * The Client's IP address; appears to report `::1` when
   * runnning in the "netlify dev" mode.
   */
  "client-ip": "::1" | "x.x.x.x" | string;
  "x-country": "US" | string;
  /** will look something like: `en,en,en;q=0.8` */
  "x-language": string;
  [key: string]: string;
}

export interface INetlifyRequest
  extends Omit<IAWSLambdaProxyIntegrationRequest, "headers"> {
  queryStringParameters: Record<string, string | number | boolean>;
  headers: INetlifyRequestHeader;
}

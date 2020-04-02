/**
 * A Javascript hash which allows for any set of keys
 */
export interface IDictionary<T = any> {
    [key: string]: T;
}
export declare type INameValuePair<T = any> = INameValuePairWithId<T> | INameValuePairWithKey<T>;
export interface INameValuePairWithId<T = any> {
    id: string | number;
    value: T;
}
export interface INameValuePairWithKey<T = any> {
    key: string | number;
    value: T;
}
/**
 * Identifies the most common properties included
 * in HTTP _**request**_ headers while leaving the structure the
 * flexibility to add more name/value pairs
 */
export interface IHttpRequestHeaders {
    /**
     * The `Accept` _request_ HTTP header advertises which content types, expressed as
     * MIME types, the client is able to understand. Using content negotiation, the
     * server then selects one of the proposals, uses it and informs the client of
     * its choice with the `Content-Type` response header. Browsers set adequate
     * values for this header depending on the context where the request is done:
     * when fetching a CSS stylesheet a different value is set for the request
     * than when fetching an image, video or a script.
     *
     * [...more](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept)
     */
    Accept?: string;
    /**
     * The `Accept-Encoding` request advertises which content encoding,
     * usually a compression algorithm, the client is able to understand. Using
     * content negotiation, the server selects one of the proposals, uses it and
     * informs the client of its choice with the Content-Encoding response header.
     *
     * > [More info](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Encoding)
     */
    ["Accept-Encoding"]?: string;
    /**
     * The HTTP Authorization _request_ header contains the credentials to authenticate
     * a user agent with a server, usually after the server has responded with
     * a `401 Unauthorized` status and the `WWW-Authenticate` header.
     */
    Authorization?: string;
    /**
     * The body of the message. This is always a _string_ but is often
     * a stringified JSON object which can be parsed back to a structured
     * object.
     */
    body?: string;
    /**
     * The Cookie HTTP _request_ header contains stored HTTP cookies previously
     * sent by the server with the Set-Cookie header.
     */
    cookie?: string;
    /**
     * an identifying property that an application has placed on
     * a set of of message to _group_ them into a logical grouping.
     */
    "X-Correlation-Id"?: string;
}
/**
 * Identifies the most common properties in the
 * HTTP _**Response**_ headers while leaving
 * the flexiblility to add more name/value pairs
 */
export interface IHttpResponseHeaders {
    /**
     * The `Allow` header lists the set of methods supported by a resource.
     *
     * [...more](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Allow)
     */
    Allow?: string;
    /**
     * The `If-Match` HTTP _request_ header makes the request conditional. For **GET** and
     * **HEAD** methods, the server will send back the requested resource only if it
     * matches one of the listed ETags. For **PUT** and other non-safe methods, it
     * will only upload the resource in this case.
     */
    ["If-Match"]?: string;
    /**
     * The `Expires` header contains the date/time after which the _response_ is considered
     * stale.
     *
     * > Example: `Expires: Wed, 21 Oct 2015 07:28:00 GMT`
     *
     * [...more](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Expires)
     */
    Expires?: string;
    /**
     * A comma-separated list of parameters, each consisting of an identifier
     * and a value separated by the equal sign ('='); of the format:
     * `timeout=5, max=1000`
     */
    ["Keep-Alive"]?: string;
    /**
     * The Last-Modified response HTTP header contains the date and time at which the
     * origin server believes the resource was last modified. It is used as a validator
     * to determine if a resource received or stored is the same. Less accurate than
     * an ETag header, it is a fallback mechanism. Conditional requests containing
     * `If-Modified-Since` or `If-Unmodified-Since` headers make use of this field.
     *
     * > example: `Last-Modified: Wed, 21 Oct 2015 07:28:00 GMT`
     */
    ["Last-Modified"]?: string;
    /**
     * The `Access-Control-Allow-Origin` response header indicates whether the response
     * can be shared with requesting code from the given origin.
     *
     * Examples:
     *   - `Access-Control-Allow-Origin: *`
     *   - `Access-Control-Allow-Origin: https://developer.mozilla.org`
     *
     * For requests without credentials, the literal value `*` can be specified, as
     * a wildcard; the value tells browsers to allow requesting code from any origin
     * to access the resource. Attempting to use the wildcard with credentials will
     * result in an error.
     *
     * [...more](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin)
     */
    "Access-Control-Allow-Origin"?: string;
    /**
     * The `Access-Control-Allow-Credentials` _response_ header tells browsers whether
     * to expose the response to frontend JavaScript code when the request's
     * credentials mode (Request.credentials) is "include".
     */
    "Access-Control-Allow-Credentials"?: boolean;
    /**
     * The HTTP `Cross-Origin-Resource-Policy` _response_ header conveys a desire
     * that the browser blocks no-cors cross-origin/cross-site requests to
     * the given resource.
     *
     * > Example: `Cross-Origin-Resource-Policy: same-site | same-origin | cross-site`
     *
     * [...more](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Resource-Policy)
     */
    ["Cross-Origin-Resource-Policy"]?: string;
    /**
     * The `Content-Type` entity header is used to indicate the media type of
     * the resource.
     *
     * In responses, a `Content-Type` header tells the client what the content
     * type of the returned content actually is. Browsers will do MIME sniffing
     * in some cases and will not necessarily follow the value of this header;
     * to prevent this behavior, the header `X-Content-Type-Options` can be set
     * to **nosniff**.
     */
    "Content-Type"?: string;
    /**
     * an identifying property that an application has placed on
     * a set of of message to _group_ them into a logical grouping.
     */
    "X-Correlation-Id"?: string;
    /**
     * The ETag HTTP response header is an identifier for a specific version of
     * a resource. It lets caches be more efficient and save bandwidth, as a web
     * server does not need to resend a full response if the content has not
     * changed. Additionally, etags help prevent simultaneous updates of a
     * resource from overwriting each other ("mid-air collisions").
     *
     * [...more](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/ETag)
     */
    etag?: string;
    /**
     * The body of the message. This is always a _string_ but is often
     * a stringified JSON object which can be parsed back to a structured
     * object.
     */
    body?: string;
    /**
     * The HTTP `WWW-Authenticate` _response_ header defines the authentication method
     * that should be used to gain access to a resource.
     *
     * [...more](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/WWW-Authenticate)
     */
    ["WWW-Authenticate"]?: string;
}
export declare enum HttpStatusCodes {
    /**
     * The client SHOULD continue with its request. This interim response is used to inform
     * the client that the initial part of the request has been received and has not yet
     * been rejected by the server. The client SHOULD continue by sending the remainder
     * of the request or, if the request has already been completed, ignore this response.
     * The server MUST send a final response after the request has been completed.
     */
    Continue = 100,
    /** The request has succeeded. */
    Success = 200,
    /**
     * The request has been fulfilled and resulted in a new resource being created. The newly
     * created resource can be referenced by the URI(s) returned in the entity of the response,
     * with the most specific URI for the resource given by a Location header field. The response
     * SHOULD include an entity containing a list of resource characteristics and location(s) from
     * which the user or user agent can choose the one most appropriate. The entity format is
     * specified by the media type given in the Content-Type header field. The origin server MUST
     * create the resource before returning the `201` status code. If the action cannot be carried
     * out immediately, the server SHOULD respond with `202` (Accepted) response instead.
     *
     * A `201` response MAY contain an ETag response header field indicating the current value of
     * the entity tag for the requested variant just created.
  
     */
    Created = 201,
    /**
     * The request has been accepted for processing, but the processing has not been completed.
     * The request might or might not eventually be acted upon, as it might be disallowed when
     * processing actually takes place. There is no facility for re-sending a status code from an
     * asynchronous operation such as this.
     *
     * The 202 response is intentionally non-committal. Its purpose is to allow a server to accept
     * a request for some other process (perhaps a batch-oriented process that is only run once
     * per day) without requiring that the user agent's connection to the server persist until the
     * process is completed. The entity returned with this response SHOULD include an indication
     * of the request's current status and either a pointer to a status monitor or some estimate
     * of when the user can expect the request to be fulfilled.
     */
    Accepted = 202,
    /**
     * The server has fulfilled the request but does not need to return an entity-body, and might
     * want to return updated meta-information. The response MAY include new or updated
     * meta-information in the form of entity-headers, which if present SHOULD be associated with
     * the requested variant.
     *
     * If the client is a _user agent_, it **SHOULD NOT** change its document view from that which
     * caused the request to be sent. This response is primarily intended to allow input for
     * actions to take place without causing a change to the user agent's active document view,
     * although any new or updated metainformation **SHOULD** be applied to the document
     * currently in the user agent's active view.
     *
     * The `204` response **MUST NOT** include a `message-body`, and thus is always terminated
     * by the first empty line after the header fields.
     */
    NoContent = 204,
    MovedPermenantly = 301,
    TemporaryRedirect = 307,
    /**
     * If the client has performed a conditional GET request and access is allowed, but the
     * document has not been modified, the server SHOULD respond with this status code. The
     * `304` response MUST NOT contain a _message-body_, and thus is always terminated by the
     * first empty line after the header fields.
     */
    NotModified = 304,
    /**
     * The request could not be understood by the server due to malformed syntax.
     * The client SHOULD NOT repeat the request without modifications.
     */
    BadRequest = 400,
    /**
     * The request requires user authentication. The response MUST include a WWW-Authenticate
     * header field containing a challenge applicable to the requested resource.
     * The client MAY repeat the request with a suitable Authorization header field. If the
     * request already included Authorization credentials, then the `401`
     * response indicates that authorization has been refused for those credentials. If the `401`
     * response contains the same challenge as the prior response, and the user agent has already
     * attempted authentication at least once, then the user SHOULD be presented the entity that
     * was given in the response, since that entity might include relevant diagnostic information.
     */
    Unauthorized = 401,
    PaymentRequired = 402,
    /**
     * The request could not be understood by the server due to malformed syntax. The client
     * SHOULD NOT repeat the request without modifications.
     */
    Forbidden = 403,
    /**
     * The server has not found anything matching the Request-URI. No indication is given of
     * whether the condition is temporary or permanent. The `410` (Gone) status code SHOULD be
     * used if the server knows, through some internally configurable mechanism, that an old
     * resource is permanently unavailable and has no forwarding address.
     *
     * This status code is commonly used when the server does not wish to reveal exactly
     * why the request has been refused, or when no other response is applicable.
     */
    NotFound = 404,
    /**
     * The method specified in the Request-Line is not allowed for the resource identified
     * by the Request-URI. The response MUST include an Allow header containing a list of
     * valid methods for the requested resource.
     */
    MethodNotAllowed = 405,
    /**
     * The client did not produce a request within the time that the server was
     * prepared to wait. The client MAY repeat the request without modifications
     * at any later time.
     */
    RequestTimeout = 408,
    /**
     * The request could not be completed due to a conflict with the current state of the
     * resource. This code is only allowed in situations where it is expected that the
     * user might be able to resolve the conflict and resubmit the request. The response
     * body SHOULD include enough information for the user to recognize the source of the
     * conflict. Ideally, the response entity would include enough information for the
     * user or user agent to fix the problem; however, that might not be possible and
     * is not required.
     *
     * Conflicts are most likely to occur in response to a PUT request. For example,
     * if versioning were being used and the entity being PUT included changes to a resource
     * which conflict with those made by an earlier (third-party) request, the server might
     * use the 409 response to indicate that it can't complete the request. In this case,
     * the response entity would likely contain a list of the differences between the
     * two versions in a format defined by the response Content-Type.
     */
    Conflict = 409,
    /**
     * The requested resource is no longer available at the server and no forwarding address
     * is known. This condition is expected to be considered permanent. Clients with link
     * editing capabilities SHOULD delete references to the Request-URI after user approval.
     * If the server does not know, or has no facility to determine, whether or not the
     * condition is permanent, the status code 404 (Not Found) SHOULD be used instead.
     * This response is cacheable unless indicated otherwise.
     *
     * The 410 response is primarily intended to assist the task of web maintenance by
     * notifying the recipient that the resource is intentionally unavailable and that
     * the server owners desire that remote links to that resource be removed. Such an
     * event is common for limited-time, promotional services and for resources belonging
     * to individuals no longer working at the server's site. It is not necessary to mark
     * all permanently unavailable resources as "gone" or to keep the mark for any length
     * of time -- that is left to the discretion of the server owner.
     */
    Gone = 410,
    /**
     * Indicates that the server refuses to brew coffee because it is, permanently, a teapot.
     * A combined coffee/tea pot that is temporarily out of coffee should instead return 503.
     * This error is a reference to Hyper Text Coffee Pot Control Protocol defined in April
     * Fools' jokes in 1998 and 2014.
     */
    IAmATeapot = 418,
    UnprocessableEntity = 422,
    /**
     * The 429 status code indicates that the user has sent too many requests in a given
     * amount of time ("rate limiting").
     */
    TooManyRequests = 429,
    /**
     * The server encountered an unexpected condition which prevented it from fulfilling
     * the request.
     */
    InternalServerError = 500,
    /**
     * The server does not support the functionality required to fulfill the request. This
     * is the appropriate response when the server does not recognize the request method
     * and is not capable of supporting it for any resource.
     */
    NotImplemented = 501,
    /**
     * The server, while acting as a gateway or proxy, received an invalid response from
     * the upstream server it accessed in attempting to fulfill the request.
     */
    BadGateway = 502,
    /**
     * Indicates that the server is not ready to handle the request.
     *
     * Common causes are a server that is down for maintenance or that is overloaded.
     * This response should be used for temporary conditions and the `Retry-After` HTTP
     * header should, if possible, contain the estimated time for the recovery of the
     * service.
     */
    ServiceUnavailable = 503,
    GatewayTimeout = 504,
    /**
     * The 511 status code indicates that the client needs to authenticate to gain
     * network access.
     *
     * The response representation SHOULD contain a link to a resource that allows
     * the user to submit credentials (e.g. with a HTML form).
     *
     * Note that the 511 response SHOULD NOT contain a challenge or the login interface
     * itself, because browsers would show the login interface as being associated with
     * the originally requested URL, which may cause confusion.
     */
    AuthenticationRequired = 511
}
/**
 * A numeric Javascript array
 */
export interface INumericArray<T = any> {
    [key: number]: T;
}
/** A function for sorting JS arrays */
export declare type SortingFunction = (a: any, b: any) => number;
/** a string of the format: "YYYY-MM-DD" */
export declare type datestring = string;
/** a string of the format: "HH:mm:ss" */
export declare type timestring = string;
/**
 * an array containing hours and minutes since midnight with the optional
 * ability to add _seconds_ or even _miliseconds_
 * a useful way of representing _time of day_ that has human readable
 * elements, and is easily incorporated into a Javascript `Date`.
 *
 * example:
 * ```typescript
 * const tod: todStructured = [5,15]
 * const date = new Date();
 * date.setHours(...todStructured)
 * ```
 */
export declare type todStructured = [hours, minutes] | [hours, minutes, seconds] | [hours, minutes, seconds, ms];
export declare type hours = number;
export declare type ms = number;
/**
 * The _time-of-day_ expressed as the number of **minutes** since midnight
 */
export declare type todMinutes = minutes;
/**
 * The _time-of-day_ expressed as the number of **seconds** since midnight
 */
export declare type todSeconds = seconds;
/** a string of the format: "UTC" */
export declare type timezone = string;
/** string representation of datetime in format of "2016-07-17T13:29:11.652Z" */
export declare type datetime = string;
/** unix epoch datetime format (aka, seconds since 1970) */
export declare type epoch = number;
/** javascript datetime format (aka, milliseconds since 1970) */
export declare type epochWithMilliseconds = number;
/** a numeric value representing the number of minutes */
export declare type minutes = number;
/** a numeric value representing the number of seconds */
export declare type seconds = number;
/** a given year in the gregorian calendar*/
export declare type year = number;
/** a number which should represent a percentage value */
export declare type percentage = number;
/** a string blob that represents JSON structured data */
export declare type json = string;
/** a string blob that represents CSV structured data */
export declare type csv = string;
/** foreign key reference */
export declare type fk = string;
/** primary key reference */
export declare type pk = string;
/** universal resource locator */
export declare type url = string;
/** universal resource indicator */
export declare type uri = string;
/** a string which represents zipped content run through a base64 conversion process to a string */
export declare type Base64Zip = string;
/** an email address (alias to string) */
export declare type email = string;
/** a numeric value which is represented as a string */
export declare type numberAsString = string;
export declare const STAGE_MAP: IDictionary<string>;
export declare function STAGE(stage: string): string;
export declare type BooleanAsString = "true" | "false";
/**
 * Allows a type T to have certain properties "omitted" and thereby
 * creating a new type definition. Very useful for omitting an "id"
 * property before a record is saved, etc.
 */
export declare type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export declare type Callback<T, P extends Array<any> = any[]> = (...args: P) => T;
export declare type AsyncCallback<T, P extends Array<any> = any[]> = (...args: P) => Promise<T>;
/**
 * **CallbackOption**
 *
 * Allows values to be typed as defined by `T[K]` but also will allow a callback function
 * which returns the same `T[K]`
 */
export declare type CallbackOption<T, K extends keyof T = keyof T> = {
    [key in keyof T]: T[K] | Callback<T[K]>;
};
/**
 * **Nullable**
 *
 * Allows properties of an object to be assigned either to their _defined type_
 * or alternatively to `null`. This has several use cases but is particularly
 * useful when working with a database like Firebase where setting a value to
 * `null` is equivalent to telling the DB to "remove" the property.
 */
export declare type Nullable<T, K extends keyof T = keyof T> = {
    [key in keyof T]: T[K] | null;
};

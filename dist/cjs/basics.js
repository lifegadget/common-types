"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpStatusCodes = void 0;
var HttpStatusCodes;
(function (HttpStatusCodes) {
    /**
     * The client SHOULD continue with its request. This interim response is used to inform
     * the client that the initial part of the request has been received and has not yet
     * been rejected by the server. The client SHOULD continue by sending the remainder
     * of the request or, if the request has already been completed, ignore this response.
     * The server MUST send a final response after the request has been completed.
     */
    HttpStatusCodes[HttpStatusCodes["Continue"] = 100] = "Continue";
    /** The request has succeeded. */
    HttpStatusCodes[HttpStatusCodes["Success"] = 200] = "Success";
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
    HttpStatusCodes[HttpStatusCodes["Created"] = 201] = "Created";
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
    HttpStatusCodes[HttpStatusCodes["Accepted"] = 202] = "Accepted";
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
    HttpStatusCodes[HttpStatusCodes["NoContent"] = 204] = "NoContent";
    HttpStatusCodes[HttpStatusCodes["MovedPermenantly"] = 301] = "MovedPermenantly";
    HttpStatusCodes[HttpStatusCodes["TemporaryRedirect"] = 307] = "TemporaryRedirect";
    /**
     * If the client has performed a conditional GET request and access is allowed, but the
     * document has not been modified, the server SHOULD respond with this status code. The
     * `304` response MUST NOT contain a _message-body_, and thus is always terminated by the
     * first empty line after the header fields.
     */
    HttpStatusCodes[HttpStatusCodes["NotModified"] = 304] = "NotModified";
    /**
     * The request could not be understood by the server due to malformed syntax.
     * The client SHOULD NOT repeat the request without modifications.
     */
    HttpStatusCodes[HttpStatusCodes["BadRequest"] = 400] = "BadRequest";
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
    HttpStatusCodes[HttpStatusCodes["Unauthorized"] = 401] = "Unauthorized";
    HttpStatusCodes[HttpStatusCodes["PaymentRequired"] = 402] = "PaymentRequired";
    /**
     * The request could not be understood by the server due to malformed syntax. The client
     * SHOULD NOT repeat the request without modifications.
     */
    HttpStatusCodes[HttpStatusCodes["Forbidden"] = 403] = "Forbidden";
    /**
     * The server has not found anything matching the Request-URI. No indication is given of
     * whether the condition is temporary or permanent. The `410` (Gone) status code SHOULD be
     * used if the server knows, through some internally configurable mechanism, that an old
     * resource is permanently unavailable and has no forwarding address.
     *
     * This status code is commonly used when the server does not wish to reveal exactly
     * why the request has been refused, or when no other response is applicable.
     */
    HttpStatusCodes[HttpStatusCodes["NotFound"] = 404] = "NotFound";
    /**
     * The method specified in the Request-Line is not allowed for the resource identified
     * by the Request-URI. The response MUST include an Allow header containing a list of
     * valid methods for the requested resource.
     */
    HttpStatusCodes[HttpStatusCodes["MethodNotAllowed"] = 405] = "MethodNotAllowed";
    /**
     * The client did not produce a request within the time that the server was
     * prepared to wait. The client MAY repeat the request without modifications
     * at any later time.
     */
    HttpStatusCodes[HttpStatusCodes["RequestTimeout"] = 408] = "RequestTimeout";
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
    HttpStatusCodes[HttpStatusCodes["Conflict"] = 409] = "Conflict";
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
    HttpStatusCodes[HttpStatusCodes["Gone"] = 410] = "Gone";
    /**
     * Indicates that the server refuses to brew coffee because it is, permanently, a teapot.
     * A combined coffee/tea pot that is temporarily out of coffee should instead return 503.
     * This error is a reference to Hyper Text Coffee Pot Control Protocol defined in April
     * Fools' jokes in 1998 and 2014.
     */
    HttpStatusCodes[HttpStatusCodes["IAmATeapot"] = 418] = "IAmATeapot";
    HttpStatusCodes[HttpStatusCodes["UnprocessableEntity"] = 422] = "UnprocessableEntity";
    /**
     * The 429 status code indicates that the user has sent too many requests in a given
     * amount of time ("rate limiting").
     */
    HttpStatusCodes[HttpStatusCodes["TooManyRequests"] = 429] = "TooManyRequests";
    /**
     * The server encountered an unexpected condition which prevented it from fulfilling
     * the request.
     */
    HttpStatusCodes[HttpStatusCodes["InternalServerError"] = 500] = "InternalServerError";
    /**
     * The server does not support the functionality required to fulfill the request. This
     * is the appropriate response when the server does not recognize the request method
     * and is not capable of supporting it for any resource.
     */
    HttpStatusCodes[HttpStatusCodes["NotImplemented"] = 501] = "NotImplemented";
    /**
     * The server, while acting as a gateway or proxy, received an invalid response from
     * the upstream server it accessed in attempting to fulfill the request.
     */
    HttpStatusCodes[HttpStatusCodes["BadGateway"] = 502] = "BadGateway";
    /**
     * Indicates that the server is not ready to handle the request.
     *
     * Common causes are a server that is down for maintenance or that is overloaded.
     * This response should be used for temporary conditions and the `Retry-After` HTTP
     * header should, if possible, contain the estimated time for the recovery of the
     * service.
     */
    HttpStatusCodes[HttpStatusCodes["ServiceUnavailable"] = 503] = "ServiceUnavailable";
    HttpStatusCodes[HttpStatusCodes["GatewayTimeout"] = 504] = "GatewayTimeout";
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
    HttpStatusCodes[HttpStatusCodes["AuthenticationRequired"] = 511] = "AuthenticationRequired";
})(HttpStatusCodes = exports.HttpStatusCodes || (exports.HttpStatusCodes = {}));

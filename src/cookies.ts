import { utcDateString } from "./aliases";

/**
 * the most basic cookie assignment for `Set-Cookie` header
 * is just a `name=value` pairing
 */
export type SimpleCookie = `${string}=${string}`;
/**
 * Most cookies start with the `SimpleCookie` and then
 * add some attributes.
 */
export type AttributedCookie = `${SimpleCookie};${string}`;

/**
 * This provides basic typing support for the `Set-Cookie` header
 * variable. If you want stronger support you can use `StrictCookie`.
 */
export type Cookie = SimpleCookie | AttributedCookie;

export type CookieSameSite = "Strict" | "Lax" | "None; Secure";
export type CookieExpires = `Expires=${utcDateString}`;
export type CookieMaxAge = `Max-Age=${number}`;
export type CookieHttpOnly = "HttpOnly";
export type CookieDomain = `Domain=${string}`;
export type CookieSecure = "Secure";
export type CookieAttribute =
  | CookieSameSite
  | CookieExpires
  | CookieMaxAge
  | CookieHttpOnly
  | CookieDomain
  | CookieSecure;
export type CookieAttributes =
  | CookieAttribute
  | `${CookieAttribute}; ${CookieAttribute}`
  | `${CookieAttribute}; ${CookieAttribute}; ${string}`;

/**
 * Provides typing for the `Set-Cookie` header variable. If for some
 * reason this ends up being too strict you can try the `Cookie` type
 * for a more relaxed typing.
 */
export type StrictCookie = SimpleCookie | `${SimpleCookie}; ${CookieAttributes}`;

export type BearerToken = `Bearer ${string}`;

export function isBearerToken(token: unknown): token is BearerToken {
  return typeof token === "string" && /^Bearer /.test(token);
}

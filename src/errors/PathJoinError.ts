/**
 * @deprecated PathJoinError you should not use this class; consider using a library like `brilliant-errors`.
 */
export class PathJoinError extends Error {
  public code: string;
  public name: string;
  public message: string;

  constructor(code: string, message: string) {
    super();
    this.message = `[pathJoin/${code}] ` + message;
    this.code = code;
    this.name = `pathJoin/${code}`;
  }
}

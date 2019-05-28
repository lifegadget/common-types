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

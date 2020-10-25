/**
 * @deprecated ParseStackError you should not use this class; consider using a library like `brilliant-errors`.
 */
export class ParseStackError extends Error {
  public code: string;
  public name: string;
  public message: string;

  constructor(
    code: string,
    message: string,
    public originalString: string,
    public structuredString: string
  ) {
    super();
    this.message = `[parseStack/${code}] ` + message;
    this.code = code;
    this.name = `parseStack/${code}`;
  }
}

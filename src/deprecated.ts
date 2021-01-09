/** @deprecated this symbol should NOT be used; it was
 * included in the past when this package mistakenly
 * tried to take on error handling in a way that had
 * implementation details included.*/
export interface IStackFrame {
  fn: string;
  line: number;
  col: number;
  filePath?: string;
  shortPath?: string;
  file: string;
}

/** @deprecated */
function separateFileAndFilepath(fileinfo: string) {
  const parts = fileinfo.split("/");
  return parts.length < 2
    ? { file: fileinfo, filePath: "" }
    : { file: parts.pop(), filePath: parts.slice(0, parts.length - 1).join("/") };
}

/** @deprecated */
function fileMapper(i: IStackFrame) {
  const { file, filePath } = separateFileAndFilepath(i.file);
  i.file = file as string;
  if (filePath) {
    i.filePath = filePath;
    i.shortPath = filePath.split("/").slice(-3).join("/");
  }
  return i;
}

/** @deprecated */
export interface IParseStackOptions {
  /**
   * state text to look for in the function name or file
   * name and filter out if found
   */
  ignorePatterns?: string[];
  /**
   * optionally specify the max depth of the stack
   * trace you want
   */
  limit?: number;
}

/** @deprecated */
export function parseStack(
  /** the default stack trace string */
  stack: string,
  options: any = {}
): IStackFrame[] {
  const ignorePatterns = options.ignorePatterns || [];
  const limit = options.limit;
  const structured = stack
    .replace(/Error.*\n.*?at/, " at")
    .replace(
      /at (\S*) \(([^\0]*?)\:([0-9]*?)\:([0-9]*)\)| at (\/.*?)\:([0-9]*?)\:([0-9]*)/g,
      '{ "fn": "$1", "line": $3$6, "col": $4$7, "file": "$2$5" },'
    );

  let parsed: IStackFrame[];
  try {
    parsed = JSON.parse(`[ ${structured.replace(/\,$/, "")} ]`)
      .filter((i: IStackFrame) => {
        let result = true;
        ignorePatterns.forEach((pattern: any) => {
          if (i.fn.includes(pattern) || i.file.includes(pattern)) {
            result = false;
          }
        });
        return result;
      })
      .map(fileMapper);
    if (limit) {
      parsed = parsed.slice(0, limit);
    }
  } catch (e) {
    e.message = `parsing-error: ${e.message}}`;
    throw e;
  }

  return parsed;
}

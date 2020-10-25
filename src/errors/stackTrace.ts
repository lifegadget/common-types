/**
 * @deprecated ParseStackError you should not use this class; consider using a library like `brilliant-errors`.
 */
export default function stackTrace(trace: string | undefined) {
  return trace ? trace.split("\n") : [];
}

export default function stackTrace(trace: string | undefined) {
  return trace ? trace.split("\n") : [];
}

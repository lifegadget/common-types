import { expect } from "chai";
import { parseStack, IStackFrame } from "../src/parseStack";

describe("parseStack => ", () => {
  it("Error string is converted into a structured array", async () => {
    const e = new Error("testing");
    const st = parseStack(e.stack);
    expect(st).to.be.an("array");
    st.forEach(i => {
      expect(i.fn).to.be.a("string");
      expect(i.file).to.be.a("string");
      expect(i.line).to.be.a("number");
      expect(i.col).to.be.a("number");
    });
  });

  it("Filtering by text phrases reduces unwanted line items", async () => {
    const e = new Error("testing");
    const st = parseStack(e.stack);
    const stFiltered = parseStack(e.stack, {
      ignorePatterns: ["timers.js", "mocha/lib", "runners/node"]
    });

    expect(st).to.be.an("array");
    expect(stFiltered).to.be.an("array");
    expect(st.length).to.be.greaterThan(stFiltered.length);
  });

  it.skip("Putting a limit on the trace is applied after filtering", async () => {
    //
  });
});

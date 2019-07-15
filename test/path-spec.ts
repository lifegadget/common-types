import { expect } from "chai";
import { pathJoin } from "../src/path";

describe("pathJoin() =>", () => {
  it("valid path segments work as expected", async () => {
    expect(pathJoin("foo", "bar", "baz")).to.equal("foo/bar/baz");
    expect(pathJoin("/foo", "/bar", "/baz")).to.equal("foo/bar/baz");
    expect(pathJoin("/foo/", "bar", "/baz")).to.equal("foo/bar/baz");
    expect(pathJoin("/foo///", "/bar", "/baz")).to.equal("foo/bar/baz");
    expect(pathJoin("../foo///", "/bar", "/baz")).to.equal("../foo/bar/baz");
    expect(pathJoin("./foo///", "/bar", "/baz")).to.equal("./foo/bar/baz");
    expect(pathJoin("./foo///", "./bar", "/baz")).to.equal("./foo/bar/baz");
    expect(pathJoin("./foo///", "./bar", "./baz")).to.equal("./foo/bar/baz");
    expect(pathJoin("https://foo.bar", "baz")).to.equal("https://foo.bar/baz");
    expect(pathJoin("https://foo.bar/", "baz")).to.equal("https://foo.bar/baz");
    expect(pathJoin("https://foo.bar/", "/baz")).to.equal(
      "https://foo.bar/baz"
    );
  });

  it("not allowed to put .. in non-starting segments", async () => {
    try {
      pathJoin("foo", "../bar", "baz");
      throw new Error(`pathJoin should have thrown an error`);
    } catch (e) {
      expect(e.code).to.equal("not-allowed");
      expect(e.name).to.equal("pathJoin/not-allowed");
    }
  });

  it("sending in undefined segments as part of path is handled but with warning", async () => {
    expect(pathJoin("foo", "bar", undefined, "baz")).to.equal("foo/bar/baz");
    expect(pathJoin("foo", undefined, "bar", undefined, "baz")).to.equal(
      "foo/bar/baz"
    );
  });

  it("sending in incorrect types will fail", async () => {
    try {
      pathJoin("foo", "bar", false, "baz");
      throw new Error();
    } catch (e) {
      expect(e.code).to.equal("invalid-path-part");
    }

    try {
      pathJoin("foo", "bar", { foo: "bar" }, "baz");
      throw new Error();
    } catch (e) {
      expect(e.code).to.equal("invalid-path-part");
    }
  });
});

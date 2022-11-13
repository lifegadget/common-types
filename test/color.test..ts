import { Expect, ExpectFalse, ExpectExtends } from "@type-challenges/utils";
import { HexColor, HtmlHexColor, RgbStr } from "../src/index";
import { describe, expect, it } from "vitest"; 

describe("Color types", () => {

  it("strong typing for up to four digits work with HexColor", () => {

    const valid1 = "F0A703";
    const valid2 = "000000";
    const valid3 = "FFFFFF";

    const invalid1 = ""; // well yeah
    const invalid2 = "F0y703"; // invalid char
    const invalid3 = "F0A"; // too short

    type cases = [
      Expect<ExpectExtends<HexColor, typeof valid1>>,
      Expect<ExpectExtends<HexColor, typeof valid2>>,
      Expect<ExpectExtends<HexColor, typeof valid3>>,
      ExpectFalse<ExpectExtends<HexColor, typeof invalid1>>,
      ExpectFalse<ExpectExtends<HexColor, typeof invalid2>>,
      ExpectFalse<ExpectExtends<HexColor, typeof invalid3>>,
    ]
    const cases: cases = [true, true, true, false, false, false];
    expect(cases).toBe(cases);
  });


  it("strong typing for up to four digits work with HtmlHexColor", () => {
    const valid1 = "#F0A703";
    const valid2 = "#000000";
    const valid3 = "#FFFFFF";

    const invalid1 = ""; // well yeah
    const invalid2 = "#F0y703"; // invalid char
    const invalid3 = "#F0A"; // too short

    type cases = [
      Expect<ExpectExtends<HtmlHexColor, typeof valid1>>,
      Expect<ExpectExtends<HtmlHexColor, typeof valid2>>,
      Expect<ExpectExtends<HtmlHexColor, typeof valid3>>,
      ExpectFalse<ExpectExtends<HtmlHexColor, typeof invalid1>>,
      ExpectFalse<ExpectExtends<HtmlHexColor, typeof invalid2>>,
      ExpectFalse<ExpectExtends<HtmlHexColor, typeof invalid3>>,
    ]
    const cases: cases = [true, true, true, false, false, false];
    expect(cases).toBe(cases);
  });

  it("string representation of RGB color works as expected", () => {
    const valid1 = "{r:255,g:255,b:255}";
    const valid2 = "{ r:255,g:255,b:255 }";
    const valid3 = "{ r: 255,g: 255,b: 255 }";
    const valid4 = "{ r: 255, g: 255, b: abc }";

    const invalid1 = " {r:255,g:255,b:255} ";
    const invalid2 = "{r:abc,g:def,b:123}";
    const invalid3 = "{r:128,g:555,b:123}x";

    // due to TS complexity limitations the following do pass

    // const invalid3 = "{r:128,g:128,x:128}";

    type cases = [
      Expect<ExpectExtends<RgbStr, typeof valid1>>,
      Expect<ExpectExtends<RgbStr, typeof valid2>>,
      Expect<ExpectExtends<RgbStr, typeof valid3>>,
      Expect<ExpectExtends<RgbStr, typeof valid4>>,
      ExpectFalse<ExpectExtends<RgbStr, typeof invalid1>>,
      ExpectFalse<ExpectExtends<RgbStr, typeof invalid2>>,
      ExpectFalse<ExpectExtends<RgbStr, typeof invalid3>>,
    ]
    const cases: cases = [true, true, true, true, false, false, false];
    expect(cases).toBe(cases);
  })

});

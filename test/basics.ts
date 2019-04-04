import { Nullable } from "../src";
interface ITesting {
  foo: number;
  bar?: string;
}

// not allowed
const t: ITesting = {
  foo: null,
  bar: null
};

const t2: Nullable<ITesting> = {
  foo: null,
  bar: null
};

const t3: Nullable<Partial<ITesting>> = {
  bar: null
};

import { Nullable, CallbackOption } from "../src";
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

const cbTest: CallbackOption<ITesting> = {
  foo: () => 5,
  bar: () => "a string"
};

// captures invalid props
const cbTest2: CallbackOption<ITesting> = {
  foo: 5,
  bar: () => "a string",
  baz: false
};

// missing props caught
const cbTest3: CallbackOption<ITesting> = {
  bar: () => "a string"
};

// should capture wrong return type but does not
const cbTest4: CallbackOption<ITesting> = {
  foo: () => "a string"
};

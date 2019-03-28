import { Nullable } from "../src/basics";

interface IName {
  first: string;
  last: string;
  age: number;
}

function update(name: Nullable<IName>) {
  //
}

function update2(name: Partial<Nullable<IName>>) {
  //
}

update({
  first: "bob",
  last: "marley",
  age: null
});

update2({
  age: null
});

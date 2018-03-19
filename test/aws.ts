import { ILambdaSuccessCallback, ILambdaFailureCallback, LambdaCallback } from "../src";

const success: ILambdaSuccessCallback = function(err, content) {
  return;
};
const fail: ILambdaFailureCallback = function(err, content) {
  return;
};

const either: LambdaCallback = function(err, content) {
  return;
};

success(null, {}); // expected outcome
success(500, {}); // should be an error; expected outcome

fail(500, {}); // expected outcome
fail(null, {}); // should be an error; NOT expected outcome
fail(new Error("test"));

either(null, {}); // should be fine and treated as success
either(500, {}); // should be fine and treated as failure
either(new Error("test"));

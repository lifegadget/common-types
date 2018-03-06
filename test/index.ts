import {
  LambdaCallback,
  ILambdaSuccessCallback,
  ILambdaFailureCallback
} from "../src/common-types";

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

either(null, {}); // should be fine and treated as success
either(500, {}); // should be fine and treated as failure

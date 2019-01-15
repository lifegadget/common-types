import { ILambdaSuccessCallback, ILambdaFailureCallback, LambdaCallback } from "../src";

const success: ILambdaSuccessCallback = function(err, content) {
  return;
};
const fail: ILambdaFailureCallback = (err, content) => {
  return;
};

const callback: LambdaCallback = function(err, content) {
  return;
};

success(null, {}); // should be a successs
success(500, {}); // should be an error

fail(500, {}); // expected outcome
fail(null, {}); // should be an error; NOT expected outcome
fail(new Error("test"));
fail({
  errorCode: 403,
  name: "mistake",
  message: "it pours when it rains"
});

callback(null, {}); // should be treated as success
callback(500, {}); // should be treated as failure
callback(new Error("test"));

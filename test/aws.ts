import {
  IAwsLambdaSuccessCallback,
  IAwsLambdaFailureCallback,
  IAwsLambdaCallback,
  IAwsHandlerFunction,
  getBodyFromPossibleLambdaProxyRequest
} from "../src";

const success: IAwsLambdaSuccessCallback = function(err, content) {
  return;
};
const fail: IAwsLambdaFailureCallback = (err, content) => {
  return;
};

const callback: IAwsLambdaCallback<any> = function(err, content) {
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

interface IMeasureRequest {
  height: number;
  width: number;
  uom: "inch" | "cm" | "mm";
}

const handler: IAwsHandlerFunction<IMeasureRequest> = (event, context, cb) => {
  const request = getBodyFromPossibleLambdaProxyRequest(event);
  console.log(request.height);
};

const asyncHandler: IAwsHandlerFunction<IMeasureRequest> = async (event, context, cb) => {
  const request = getBodyFromPossibleLambdaProxyRequest(event);
  console.log(request.height);
};

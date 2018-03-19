import {
  LambdaCallback,
  ILambdaSuccessCallback,
  ILambdaFailureCallback,
  IStepFunctionsConfiguration,
  IDictionary,
  IStateMachine,
  StepFunctionState,
  IStepFunctionTask,
  IStepFunctionChoice,
  IStepFunctionWait,
  IStepFunctionParallel,
  IStepFunctionSucceed,
  IStepFunctionPass
} from "../src/common-types";

// const success: ILambdaSuccessCallback = function(err, content) {
//   return;
// };
// const fail: ILambdaFailureCallback = function(err, content) {
//   return;
// };

// const either: LambdaCallback = function(err, content) {
//   return;
// };

// success(null, {}); // expected outcome
// success(500, {}); // should be an error; expected outcome

// fail(500, {}); // expected outcome
// fail(null, {}); // should be an error; NOT expected outcome
// fail(new Error("test"));

// either(null, {}); // should be fine and treated as success
// either(500, {}); // should be fine and treated as failure
// either(new Error("test"));

const stepFns: IStepFunctionsConfiguration = {
  stepFunctions: {
    stateMachines: {
      foobar: {
        definition: {
          StartAt: "xxx",
          Comment:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis at ab recusandae fugiat, saepe molestiae doloribus assumenda rem voluptates non illum nemo dolorem architecto animi obcaecati esse eius et iure",
          States: {
            xxx: {
              Type: "Task",
              Resource: "arn:test",
              End: true
            },
            yyy: {
              Type: "Task",
              Resource: "arn:yyy",
              Next: "xxx"
            },
            zzz: {
              Type: "Choice",
              Choices: [
                {
                  Variable: "$.foo",
                  NumericEquals: 10,
                  Next: "yyy"
                },
                {
                  Variable: "$.bar",
                  NumericEquals: 20,
                  Next: "xxx"
                }
              ]
            }
          }
        }
      }
    }
  }
};

const task: IStepFunctionTask = {
  xxx: {
    Type: "Task",
    Resource: "arn",
    Next: "x2"
  },
  x2: {
    Type: "Task",
    Resource: "arn2",
    End: true
  }
};

const wait: IStepFunctionWait = {
  yyy: {
    Type: "Wait",
    Seconds: 12,
    Next: "foo"
  }
};

const succeed: IStepFunctionSucceed = {
  sss: {
    Type: "Succeed"
  }
};

const pass: IStepFunctionPass = {
  ppp: {
    Type: "Pass",
    Result: {
      foo: 1,
      bar: 2
    },
    ResultPath: "$.info",
    Next: "baz"
  }
};

const parallel: IStepFunctionParallel = {
  ppp: {
    Type: "Parallel",
    Next: "foo",
    Branches: [
      {
        StartAt: "first",
        States: {
          first: {
            Type: "Task",
            Resource: "arn"
          }
        }
      }
    ]
  }
};

const choice: IStepFunctionChoice = {
  zzz: {
    Type: "Choice",
    Choices: [
      {
        Variable: "$.bar",
        NumericEquals: 1,
        Next: "xxx"
      }
    ]
  }
};

const mixedBag: StepFunctionState = {
  ...task,
  ...choice,
  ...wait,
  ...pass,
  ...succeed
};

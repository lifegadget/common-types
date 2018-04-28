import {
  IStepFunctionParallel,
  IStepFunctionChoice,
  StepFunctionState,
  IStepFunctionPass,
  IStepFunctionSucceed,
  IStepFunctionTask,
  IStepFunctionWait,
  IServerlessConfig,
  IDictionary
} from "../src";

const stepFns: IServerlessConfig = {
  service: "foobar",
  functions: {
    myFunc: {
      events: [
        {
          http: {
            method: "get",
            path: "myFunc/foobar",
            cors: true
          }
        }
      ],
      handler: "src/handle"
    }
  },
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

const task: IDictionary<IStepFunctionTask> = {
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

const wait: IDictionary<IStepFunctionWait> = {
  yyy: {
    Type: "Wait",
    Seconds: 12,
    Next: "foo"
  }
};

const succeed: IDictionary<IStepFunctionSucceed> = {
  sss: {
    Type: "Succeed"
  }
};

const pass: IDictionary<IStepFunctionPass> = {
  pass: {
    Type: "Pass",
    Result: {
      foo: 1,
      bar: 2
    },
    ResultPath: "$.info",
    Next: "baz"
  }
};

const choice: IDictionary<IStepFunctionChoice> = {
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

const parallel: IDictionary<IStepFunctionParallel> = {
  para: {
    Type: "Parallel",
    Next: "foo",
    Branches: [
      {
        StartAt: "first",
        States: {
          first: {
            Type: "Pass",
            Next: "second"
          }
        }
      },
      {
        StartAt: "a",
        States: {
          a: {
            Type: "Wait",
            Seconds: 10,
            Next: "b"
          },
          b: {
            Type: "Pass",
            Next: "c"
          }
        }
      }
    ]
  }
};

const mixedBag: IDictionary<StepFunctionState> = {
  ...task,
  ...choice,
  ...wait,
  ...succeed,
  ...pass,
  ...parallel
};

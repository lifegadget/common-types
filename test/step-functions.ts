import { IStepFunction, IStateMachine, IStepFunctionTask } from "../src/serverless";

const Itms: IStepFunctionTask = {
  Type: "Task",
  Resource: "arn:aws:lambda:us-east-1:9999999999:function:foobar-itms",
  Next: "Closure",
  Retry: [{ ErrorEquals: ["States.ALL"], MaxAttempts: 0 }],
  Catch: [
    { ErrorEquals: ["States.ALL"], ResultPath: "$.error-info", Next: "NotifyOfError" }
  ]
};

const steps: IStepFunction = {
  Comment:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis at ab recusandae fugiat, saepe molestiae doloribus assumenda rem voluptates non illum nemo dolorem architecto animi obcaecati esse eius et iure",
  StartAt: "Prep",
  States: {
    Prep: {
      Type: "Task",
      Resource: "arn:aws:lambda:us-east-1:9999999999:function:foobar-transportPrep",
      Next: "Itms",
      Catch: [
        { ErrorEquals: ["States.ALL"], ResultPath: "$.error-info", Next: "NotifyOfError" }
      ]
    },
    Itms,
    Closure: {
      Type: "Task",
      Resource: "arn:aws:lambda:us-east-1:9999999999:function:foobar-transportClosure",
      Next: "WaitForCloudWatch",
      Catch: [
        { ErrorEquals: ["States.ALL"], ResultPath: "$.error-info", Next: "NotifyOfError" }
      ]
    },
    WaitForCloudWatch: { Type: "Wait", Seconds: 15, Next: "Metrics" },
    Metrics: {
      Type: "Task",
      Resource: "arn:aws:lambda:us-east-1:9999999999:function:foobar-transportMetrics",
      End: true
    },
    NotifyOfError: {
      Type: "Task",
      Resource: "arn:aws:lambda:us-east-1:9999999999:function:foobar-errorNotification",
      Next: "ExitInDisgrace"
    },
    ExitInDisgrace: {
      Type: "Fail",
      Error: "TransporterFailure",
      Cause:
        "Errors, stack traces, etc. have been communicated via the tracking task and an appropriate combination of email and sms"
    }
  }
};

const stateMachine: IStateMachine = {
  definition: steps
};

export default steps;

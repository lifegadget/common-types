import { IServerlessProvider, IServerlessIAMRole } from "..";

const iamRoleStatements: IServerlessIAMRole[] = [
  {
    Effect: "Allow",
    Action: ["SNS:Publish"],
    Resource: ["arn:aws:sns:${self:custom.stage}:837955377040:transport-${opt:stage}"]
  }
];

const provider: IServerlessProvider = {
  name: "aws",
  runtime: "nodejs8.10",
  profile: "utransporter",
  stage: "dev",
  region: "us-east-1",
  iamRoleStatements
};

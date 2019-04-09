import { ILambdaFunctionType } from "./aws";

export default class LambdaSequence {
  /**
   * **add**
   *
   * adds another task to the sequence
   */
  public add(type: ILambdaFunctionType, arn: string, description?: string) {
    return this;
  }
}

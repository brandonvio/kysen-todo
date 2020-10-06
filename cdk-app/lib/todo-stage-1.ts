import { CfnOutput, Construct, Stage, StageProps } from "@aws-cdk/core";
import { TodoApiStack } from "./todo-api-stack";

/**
 * Deployable unit of web service app
 */
export class TodoStage1 extends Stage {
  public readonly distributionDomainName: CfnOutput;
  public readonly apiUrlOutput: CfnOutput;
  public readonly websiteUrlOutput: CfnOutput;

  constructor(scope: Construct, id: string, props?: StageProps) {
    super(scope, id, props);
    const stack = new TodoApiStack(this, "TodoAPI");
    this.apiUrlOutput = stack.apiUrlOutput;
    this.distributionDomainName = stack.distributionDomainName;
    this.websiteUrlOutput = stack.websiteUrlOutput;
  }
}

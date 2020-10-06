import { CfnOutput, Construct, Stage, StageProps } from "@aws-cdk/core";
import { TodoApiStack } from "./todo-api-stack";

/**
 * Deployable unit of web service app
 */
export class TodoStage1 extends Stage {
  public readonly urlOutput: CfnOutput;

  constructor(scope: Construct, id: string, props?: StageProps) {
    super(scope, id, props);

    const service = new TodoApiStack(this, "TodoAPI");

    // Expose CdkpipelinesDemoStack's output one level higher
    this.urlOutput = service.apiUrlOutput;
  }
}

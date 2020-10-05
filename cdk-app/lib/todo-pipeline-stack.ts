import * as codepipeline from "@aws-cdk/aws-codepipeline";
import * as codepipeline_actions from "@aws-cdk/aws-codepipeline-actions";
import { Construct, SecretValue, Stack, StackProps } from "@aws-cdk/core";
import { CdkPipeline, SimpleSynthAction } from "@aws-cdk/pipelines";
import { TodoStage1 } from "./todo-stage-1";
import { ShellScriptAction } from "@aws-cdk/pipelines";
/**
 * The stack that defines the application pipeline
 */
export class TodoCdkPipelineStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const sourceArtifact = new codepipeline.Artifact();
    const cloudAssemblyArtifact = new codepipeline.Artifact();

    const cdkPipeline = new CdkPipeline(this, "KysenTodoPipeline", {
      // The pipeline name
      pipelineName: "KysenTodoPipeline",
      cloudAssemblyArtifact,

      // Where the source can be found
      sourceAction: new codepipeline_actions.GitHubSourceAction({
        actionName: "GitHub",
        output: sourceArtifact,
        oauthToken: SecretValue.secretsManager("github-token"),
        owner: "brandonvio",
        repo: "kysen-todo",
      }),

      // How it will be built and synthesized
      synthAction: SimpleSynthAction.standardNpmSynth({
        sourceArtifact,
        cloudAssemblyArtifact,
        subdirectory: "cdk-app",
        buildCommand: "npm run build",
      }),
    });

    const stage1 = new TodoStage1(this, "TodoStage1", {
      env: { account: "705871014762", region: "us-west-2" },
    });

    const pipelineStage1 = cdkPipeline.addApplicationStage(stage1);

    pipelineStage1.addActions(
      new ShellScriptAction({
        actionName: "TestService",
        useOutputs: {
          // Get the stack Output from the Stage and make it available in
          // the shell script as $ENDPOINT_URL.
          ENDPOINT_URL: cdkPipeline.stackOutput(stage1.urlOutput),
        },
        commands: [
          // Use 'curl' to GET the given URL and fail if it returns an error
          "curl -Ssf $ENDPOINT_URL",
        ],
      })
    );

    // stage1.
  }
}

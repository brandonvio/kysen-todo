import * as codepipeline from "@aws-cdk/aws-codepipeline";
import * as codepipeline_actions from "@aws-cdk/aws-codepipeline-actions";
import { Construct, SecretValue, Stack, StackProps } from "@aws-cdk/core";
import { CdkPipeline, SimpleSynthAction } from "@aws-cdk/pipelines";
import { CdkAppStage1 } from "./cdk-app-stage-1";
/**
 * The stack that defines the application pipeline
 */
export class TodoCdkPipelineStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const sourceArtifact = new codepipeline.Artifact();
    const cloudAssemblyArtifact = new codepipeline.Artifact();

    const pipeline = new CdkPipeline(this, "KysenTodoPipeline", {
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

    pipeline.addApplicationStage(
      new CdkAppStage1(this, "PreProd", {
        env: { account: "705871014762", region: "us-west-2" },
      })
    );
  }
}

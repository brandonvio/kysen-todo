import * as codepipeline from "@aws-cdk/aws-codepipeline";
import * as codepipeline_actions from "@aws-cdk/aws-codepipeline-actions";
import { Construct, SecretValue, Stack, StackProps } from "@aws-cdk/core";
import { CdkPipeline, SimpleSynthAction } from "@aws-cdk/pipelines";
import { CdkAppStage1 } from "./cdk-app-stage-1";
import { ShellScriptAction } from "@aws-cdk/pipelines";
/**
 * The stack that defines the application pipeline
 */
export class CdkAppPipelineStack extends Stack {
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
        // We need a build step to compile the TypeScript Lambda
        buildCommand: "npm run build",
      }),
    });

    SimpleSynthAction.standardNpmSynth({
      sourceArtifact,
      cloudAssemblyArtifact,
      subdirectory: "lambda-app",
      // We need a build step to compile the TypeScript Lambda
      buildCommand: "npm run build",
    });

    // This is where we add the application stages
    // ...

    const preprod = new CdkAppStage1(this, "PreProd", {
      env: { account: "705871014762", region: "us-west-2" },
    });

    const preprodStage = pipeline.addApplicationStage(preprod);

    // preprodStage.addActions()

    // preprodStage.addActions(
    //   new ShellScriptAction({
    //     actionName: "build lambda-app",
    //     useOutputs: {
    //       // Get the stack Output from the Stage and make it available in
    //       // the shell script as $ENDPOINT_URL.
    //       ENDPOINT_URL: pipeline.stackOutput(preprod.urlOutput),
    //     },
    //     commands: [
    //       // Use 'curl' to GET the given URL and fail if it returns an error
    //       "curl -Ssf $ENDPOINT_URL",
    //     ],
    //   })
    // );
  }
}

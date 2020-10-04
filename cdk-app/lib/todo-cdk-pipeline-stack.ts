import * as codepipeline from "@aws-cdk/aws-codepipeline";
import * as codepipeline_actions from "@aws-cdk/aws-codepipeline-actions";
import * as codebuild from "@aws-cdk/aws-codebuild";
import { Construct, SecretValue, Stack, StackProps } from "@aws-cdk/core";
import { CdkPipeline, SimpleSynthAction } from "@aws-cdk/pipelines";
import { CdkAppStage1 } from "./cdk-app-stage-1";
/**
 * The stack that defines the application pipeline
 */
export class TodoCdkPipelineStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const sourceArtifact = new codepipeline.Artifact("todoSourceArtifact");
    const cloudAssemblyArtifact = new codepipeline.Artifact("todoCloudAssemblyArtifact");

    const cdkBuildOutput = new codepipeline.Artifact("CdkBuildOutput");
    const lambdaBuildOutput = new codepipeline.Artifact("LambdaBuildOutput");
    const reactBuildOuput = new codepipeline.Artifact("ReactBuildOuput");

    const todoCodePipeline = new codepipeline.Pipeline(this, "KysenBuildTodoCodePipeline", {
      pipelineName: "KysenBuildTodoCodePipeline",
    });

    // Source.
    const sourceAction = new codepipeline_actions.GitHubSourceAction({
      actionName: "GitHub",
      owner: "brandonvio",
      repo: "kysen-todo",
      oauthToken: SecretValue.secretsManager("github-token"),
      output: sourceArtifact,
      branch: "master", // default: 'master'
    });

    todoCodePipeline.addStage({
      stageName: "Source",
      actions: [sourceAction],
    });

    // Build Lambda
    const lambdaProject = new codebuild.PipelineProject(this, "lambdaProject", {
      buildSpec: codebuild.BuildSpec.fromObject({
        version: "0.2",
        env: {
          "exported-variables": ["MY_VAR"],
        },
        phases: {
          pre_build: {
            commands: ["cd lambda-app", "npm install"],
          },
          build: {
            commands: ["npm run build", "ls -al", "pwd"],
          },
        },
      }),
    });

    const buildLambdaAction = new codepipeline_actions.CodeBuildAction({
      actionName: "CodeBuild",
      project: lambdaProject,
      input: sourceArtifact,
      outputs: [lambdaBuildOutput],
    });

    todoCodePipeline.addStage({
      stageName: "BuildLambda",
      actions: [buildLambdaAction],
    });

    // Build React
    const reactProject = new codebuild.PipelineProject(this, "reactProject", {
      buildSpec: codebuild.BuildSpec.fromObject({
        version: "0.2",
        env: {
          "exported-variables": ["MY_VAR"],
        },
        phases: {
          pre_build: {
            commands: ["cd react-app", "npm install"],
          },
          build: {
            commands: ["npm run build", , "ls -al", "pwd"],
          },
        },
      }),
    });

    const buildReactAction = new codepipeline_actions.CodeBuildAction({
      actionName: "CodeBuild",
      project: reactProject,
      input: sourceArtifact,
      outputs: [reactBuildOuput],
    });

    todoCodePipeline.addStage({
      stageName: "BuildReact",
      actions: [buildReactAction],
    });

    // Synth.
    const synthAction = SimpleSynthAction.standardNpmSynth({
      sourceArtifact,
      cloudAssemblyArtifact,
      subdirectory: "cdk-app",
    });

    todoCodePipeline.addStage({
      stageName: "Synth",
      actions: [synthAction],
    });

    // CDK Pipeline
    const cdkPipeline = new CdkPipeline(this, "KysenBuildTodoCDKPipeline", {
      codePipeline: todoCodePipeline,
      cloudAssemblyArtifact,
    });

    cdkPipeline.addApplicationStage(
      new CdkAppStage1(this, "PreProd", {
        env: { account: "705871014762", region: "us-west-2" },
      })
    );
  }
}

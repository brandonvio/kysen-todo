#!/usr/bin/env node
import { App } from "@aws-cdk/core";
import { CdkAppPipelineStack } from "../lib/cdk-app-pipeline-stack";

const app = new App();

new CdkAppPipelineStack(app, "CdkAppPipelineStack", {
  env: { account: "705871014762", region: "us-west-2" },
});

app.synth();

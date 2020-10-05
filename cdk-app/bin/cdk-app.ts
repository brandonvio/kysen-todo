#!/usr/bin/env node
import { App } from "@aws-cdk/core";
// import { CdkAppPipelineStack } from "../lib/cdk-app-pipeline-stack";
import { TodoPipelineStack } from "../lib/todo-pipeline-stack";

const app = new App();

// new CdkAppPipelineStack(app, "CdkAppPipelineStack", {
//   env: { account: "780883706235", region: "us-west-2" },
// });

new TodoPipelineStack(app, "TodoPipelineStack", {
  env: { account: "780883706235", region: "us-west-2" },
});

app.synth();

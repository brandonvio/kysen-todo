#!/usr/bin/env node
import { App } from "@aws-cdk/core";
import { TodoStack } from "../lib/todo-stack"
const app = new App();

// new TodoStack(app, "TodoStack", {
//   stackName: "TodoStack",
//   env: { account: "780883706235", region: "us-west-2" },
// });

new TodoStack(app, "TodoStack", {
  stackName: "TodoStack"
});

app.synth();

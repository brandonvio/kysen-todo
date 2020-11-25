#!/usr/bin/env node
import { App } from "@aws-cdk/core";
import { TodoStack } from "../lib/todo-stack";
const app = new App();

new TodoStack(app, "TodoStack", {
  stackName: "TodoStack",
  env: {
    account: "705871014762",
    region: "us-west-2",
  },
});

app.synth();

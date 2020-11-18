import * as cdk from "@aws-cdk/core";
import { TodoApiStack } from "../lib/todo-api-stack"
import { TodoLambdaStack, ILambdaFunctions } from "../lib/lambda-stack"
import { TodoDynamodbStack } from "../lib/dynamodb-stack"
import { TodoWebsiteStack } from "../lib/website-stack"
// import { TodoApiStack } from "../lib/todo-api-stack"

/**
 * A stack for the Todo API.
 */
export class TodoStack extends cdk.Stack {

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const lambdaStack = new TodoLambdaStack(scope, "TodoLambdaStack",  {
      stackName: "TodoLambdaStack",
      env: props?.env
    });

    const apiStack = new TodoApiStack(
        scope, 
        "TodoApiStack", 
        lambdaStack.lambdaFunctions, {
          stackName: "TodoApiStack",
          env: props?.env
        });

    const dynamodbStack = new TodoDynamodbStack(
      scope, 
      "TodoDynamodbStack", 
      lambdaStack.lambdaFunctions, {
        stackName: "TodoDynamodbStack",
        env: props?.env
      });

    const websiteStack = new TodoWebsiteStack(
      scope, 
      "TodoWebsiteStack", {
        stackName: "TodoWebsiteStack",
        env: props?.env
      });
  }
}

import * as apigw from "@aws-cdk/aws-apigateway";
import * as lambda from "@aws-cdk/aws-lambda";
import { CfnOutput, Construct, Stack, StackProps } from "@aws-cdk/core";
import * as dynamodb from "@aws-cdk/aws-dynamodb";
import * as path from "path";

/**
 * A stack for our simple Lambda-powered web service
 */
export class TodoApiStack extends Stack {
  /**
   * The URL of the API Gateway endpoint, for use in the integ tests
   */
  public readonly urlOutput: CfnOutput;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const buildPath = path.resolve(__dirname, "../../lambda-app/build");

    // The Lambda function that contains the functionality
    const defaultTodoHandler = new lambda.Function(this, "defaultTodoHandler", {
      functionName: "defaultTodoHandler",
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: "index.defaultTodoHandler",
      code: lambda.Code.fromAsset(buildPath),
    });

    const getTodosHandler = new lambda.Function(this, "getTodosHandler", {
      functionName: "getTodosHandler",
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: "index.getTodosHandler",
      code: lambda.Code.fromAsset(buildPath),
    });

    const updateTodoHandler = new lambda.Function(this, "updateTodoHandler", {
      functionName: "updateTodoHandler",
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: "index.updateTodoHandler",
      code: lambda.Code.fromAsset(buildPath),
    });

    // An API Gateway to make the Lambda web-accessible
    const api = new apigw.LambdaRestApi(this, "TodoAPI", {
      restApiName: "TodoAPI",
      description: "Endpont for Todo application.",
      handler: defaultTodoHandler,
      defaultCorsPreflightOptions: {
        allowOrigins: apigw.Cors.ALL_ORIGINS,
        allowMethods: apigw.Cors.ALL_METHODS, // this is also the default
      },
    });

    const todos = api.root.addResource("todos");
    todos.addMethod("GET", new apigw.LambdaIntegration(getTodosHandler)); // GET /items
    todos.addMethod("POST", new apigw.LambdaIntegration(updateTodoHandler)); // POST /items

    this.urlOutput = new CfnOutput(this, "Url", {
      value: api.url,
    });

    const todoTable = new dynamodb.Table(this, "TodoTable", {
      partitionKey: { name: "pk", type: dynamodb.AttributeType.STRING },
      sortKey: { name: "sk", type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
    });

    todoTable.grantReadWriteData(getTodosHandler);
    todoTable.grantReadWriteData(updateTodoHandler);
  }
}

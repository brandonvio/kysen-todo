import * as lambda from "@aws-cdk/aws-lambda";
import * as cdk from "@aws-cdk/core";
import * as path from "path";


export interface ILambdaFunctions {
    defaultTodoHandler: lambda.Function;
    getTodosHandler: lambda.Function;
    saveTodoHandler: lambda.Function;
    testHandler: lambda.Function;
}

/**
 * A stack for the Todo API.
 */
export class TodoLambdaStack extends cdk.Stack {  
  public lambdaFunctions: ILambdaFunctions;
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const lambdaBuildPath = path.resolve(__dirname, "../builds/lambda-app-build/build");

    //*****************************************************************************/
    // Lambda functions.
    //*****************************************************************************/
    const defaultTodoHandler = new lambda.Function(this, "defaultTodoHandler", {
      functionName: "defaultTodoHandler",
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: "index.defaultTodoHandler",
      code: lambda.Code.fromAsset(lambdaBuildPath),
    });

    const getTodosHandler = new lambda.Function(this, "getTodosHandler", {
      functionName: "getTodosHandler",
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: "index.getTodosHandler",
      code: lambda.Code.fromAsset(lambdaBuildPath),
    });

    const saveTodoHandler = new lambda.Function(this, "saveTodoHandler", {
      functionName: "saveTodoHandler",
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: "index.saveTodoHandler",
      code: lambda.Code.fromAsset(lambdaBuildPath),
    });

    const testHandler = new lambda.Function(this, "testHandler", {
      functionName: "testHandler",
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: "index.testHandler",
      code: lambda.Code.fromAsset(lambdaBuildPath),
    });

    this.lambdaFunctions = {
        defaultTodoHandler: defaultTodoHandler,
        getTodosHandler: getTodosHandler,
        saveTodoHandler: saveTodoHandler, 
        testHandler: testHandler
    }
  }
}

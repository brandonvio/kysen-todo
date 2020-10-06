import * as apigw from "@aws-cdk/aws-apigateway";
import * as lambda from "@aws-cdk/aws-lambda";
import * as cdk from "@aws-cdk/core";
import * as dynamodb from "@aws-cdk/aws-dynamodb";
import * as s3 from "@aws-cdk/aws-s3";
import * as s3Deployment from "@aws-cdk/aws-s3-deployment";
import * as path from "path";

/**
 * A stack for our simple Lambda-powered web service
 */
export class TodoApiStack extends cdk.Stack {
  /**
   * The URL of the API Gateway endpoint, for use in the integ tests
   */
  public readonly urlOutput: cdk.CfnOutput;

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const buildPath = path.resolve(__dirname, "../../lambda-app/build");

    //*****************************************************************************/
    // Lambda functions.
    //*****************************************************************************/
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

    const saveTodoHandler = new lambda.Function(this, "saveTodoHandler", {
      functionName: "saveTodoHandler",
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: "index.saveTodoHandler",
      code: lambda.Code.fromAsset(buildPath),
    });

    const testHandler = new lambda.Function(this, "testHandler", {
      functionName: "testHandler",
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: "index.testHandler",
      code: lambda.Code.fromAsset(buildPath),
    });

    //*****************************************************************************/
    // API Gateway API.
    //*****************************************************************************/
    const api = new apigw.LambdaRestApi(this, "TodoAPI", {
      restApiName: "TodoAPI",
      description: "Endpont for Todo application.",
      handler: defaultTodoHandler,
      proxy: false,
      defaultCorsPreflightOptions: {
        allowOrigins: apigw.Cors.ALL_ORIGINS,
        allowMethods: apigw.Cors.ALL_METHODS,
      },
    });

    const todosApi = api.root.addResource("todos", {
      defaultCorsPreflightOptions: {
        allowOrigins: apigw.Cors.ALL_ORIGINS,
        allowMethods: apigw.Cors.ALL_METHODS,
      },
    });
    todosApi.addMethod("GET", new apigw.LambdaIntegration(getTodosHandler)); // GET
    todosApi.addMethod("POST", new apigw.LambdaIntegration(saveTodoHandler)); // POST

    const testApi = api.root.addResource("test");
    testApi.addMethod("GET", new apigw.LambdaIntegration(testHandler)); // GET

    this.urlOutput = new cdk.CfnOutput(this, "Url", {
      value: api.urlForPath("/test"),
    });

    //*****************************************************************************/
    // S3 website bucket.
    //*****************************************************************************/
    const myBucket = new s3.Bucket(this, "my-static-website-bucket", {
      publicReadAccess: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      websiteIndexDocument: "index.html",
    });

    const deployment = new s3Deployment.BucketDeployment(this, "deployStaticWebsite", {
      sources: [s3Deployment.Source.asset("../../react-app/build")],
      destinationBucket: myBucket,
    });

    //*****************************************************************************/
    // Lambda.
    //*****************************************************************************/
    const todoTable = new dynamodb.Table(this, "TodoTable", {
      tableName: "TodoTable",
      partitionKey: { name: "pk", type: dynamodb.AttributeType.STRING },
      sortKey: { name: "sk", type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
    });

    todoTable.grantReadWriteData(getTodosHandler);
    todoTable.grantReadWriteData(saveTodoHandler);
  }
}

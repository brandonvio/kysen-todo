import * as apigw from "@aws-cdk/aws-apigateway";
import * as lambda from "@aws-cdk/aws-lambda";
import * as cdk from "@aws-cdk/core";
import * as dynamodb from "@aws-cdk/aws-dynamodb";
import * as s3 from "@aws-cdk/aws-s3";
import * as s3Deployment from "@aws-cdk/aws-s3-deployment";
import * as path from "path";
import * as cloudfront from "@aws-cdk/aws-cloudfront";
import * as origins from "@aws-cdk/aws-cloudfront-origins";

/**
 * A stack for the Todo API.
 */
export class TodoApiStack extends cdk.Stack {
  public readonly distributionDomainName: cdk.CfnOutput;
  public readonly apiUrlOutput: cdk.CfnOutput;
  public readonly websiteUrlOutput: cdk.CfnOutput;

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const lambdaBuildPatah = path.resolve(__dirname, "../../lambda-app/build");
    const reactBuildPatah = path.resolve(__dirname, "../../react-app/build");

    //*****************************************************************************/
    // Lambda functions.
    //*****************************************************************************/
    const defaultTodoHandler = new lambda.Function(this, "defaultTodoHandler", {
      functionName: "defaultTodoHandler",
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: "index.defaultTodoHandler",
      code: lambda.Code.fromAsset(lambdaBuildPatah),
    });

    const getTodosHandler = new lambda.Function(this, "getTodosHandler", {
      functionName: "getTodosHandler",
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: "index.getTodosHandler",
      code: lambda.Code.fromAsset(lambdaBuildPatah),
    });

    const saveTodoHandler = new lambda.Function(this, "saveTodoHandler", {
      functionName: "saveTodoHandler",
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: "index.saveTodoHandler",
      code: lambda.Code.fromAsset(lambdaBuildPatah),
    });

    const testHandler = new lambda.Function(this, "testHandler", {
      functionName: "testHandler",
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: "index.testHandler",
      code: lambda.Code.fromAsset(lambdaBuildPatah),
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

    const todosResource = api.root.addResource("todos", {
      defaultCorsPreflightOptions: {
        allowHeaders: ["*"],
        allowOrigins: apigw.Cors.ALL_ORIGINS,
        allowMethods: apigw.Cors.ALL_METHODS,
      },
    });

    const userResource = todosResource.addResource("user", {
      defaultCorsPreflightOptions: {
        allowHeaders: ["*"],
        allowOrigins: apigw.Cors.ALL_ORIGINS,
        allowMethods: apigw.Cors.ALL_METHODS,
      },
    });

    todosResource.addMethod("POST", new apigw.LambdaIntegration(saveTodoHandler));
    userResource.addMethod("POST", new apigw.LambdaIntegration(getTodosHandler));

    const testApi = api.root.addResource("test");
    testApi.addMethod("GET", new apigw.LambdaIntegration(testHandler));

    this.apiUrlOutput = new cdk.CfnOutput(this, "apiUrlOutput", {
      value: api.urlForPath("/test"),
    });

    //*****************************************************************************/
    // S3 website bucket.
    //*****************************************************************************/
    const reactAppBucket = new s3.Bucket(this, "my-static-website-bucket", {
      bucketName: "kysen-build-todo-static-website",
      publicReadAccess: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      websiteIndexDocument: "index.html",
      websiteErrorDocument: "index.html",
    });

    this.websiteUrlOutput = new cdk.CfnOutput(this, "websiteUrlOutput", {
      value: reactAppBucket.bucketWebsiteUrl,
    });

    //*****************************************************************************/
    // CloudFront.
    //*****************************************************************************/
    const cloudFrontDist = new cloudfront.Distribution(this, "my-static-website-distribution", {
      defaultBehavior: {
        origin: new origins.S3Origin(reactAppBucket),
      },
    });

    this.distributionDomainName = new cdk.CfnOutput(this, "distributionDomainName", {
      value: cloudFrontDist.distributionDomainName,
    });

    //*****************************************************************************/
    // Deployment.
    //*****************************************************************************/
    const deployment = new s3Deployment.BucketDeployment(this, "deployStaticWebsite", {
      sources: [s3Deployment.Source.asset(reactBuildPatah)],
      destinationBucket: reactAppBucket,
      distribution: cloudFrontDist,
      distributionPaths: ["/*"],
    });

    //*****************************************************************************/
    // DynamoDB.
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

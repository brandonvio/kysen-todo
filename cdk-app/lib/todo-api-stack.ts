import * as apigw from "@aws-cdk/aws-apigateway";
import * as lambda from "@aws-cdk/aws-lambda";
import { CfnOutput, Construct, Stack, StackProps } from "@aws-cdk/core";
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
    const handler = new lambda.Function(this, "TodoHandler", {
      functionName: "TodoHandler",
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: "index.lambdaHandler",
      code: lambda.Code.fromAsset(buildPath),
    });

    // An API Gateway to make the Lambda web-accessible
    const gw = new apigw.LambdaRestApi(this, "TodoAPI", {
      restApiName: "TodoAPI",
      description: "Endpoint for a simple Lambda-powered web service",
      handler: handler,
    });

    this.urlOutput = new CfnOutput(this, "Url", {
      value: gw.url,
    });
  }
}

import * as apigw from "@aws-cdk/aws-apigateway";
import * as cdk from "@aws-cdk/core";
import { ILambdaFunctions } from "../lib/lambda-stack"

/**
 * A stack for the Todo API.
 */
export class TodoApiStack extends cdk.Stack {
  public readonly distributionDomainName: cdk.CfnOutput;
  public readonly apiUrlOutput: cdk.CfnOutput;
  public readonly websiteUrlOutput: cdk.CfnOutput;

  constructor(scope: cdk.Construct, id: string, lambdaFunctions: ILambdaFunctions, props?: cdk.StackProps) {
    super(scope, id, props);

    //*****************************************************************************/
    // API Gateway API.
    //*****************************************************************************/
    const api = new apigw.LambdaRestApi(this, "TodoAPI", {
      restApiName: "TodoAPI",
      description: "Endpont for Todo application.",
      handler: lambdaFunctions.defaultTodoHandler,
      proxy: false,
      defaultCorsPreflightOptions: {
        allowHeaders: ["*"],
        allowOrigins: apigw.Cors.ALL_ORIGINS,
        allowMethods: apigw.Cors.ALL_METHODS,
      },
    });

    const getTodosResource = api.root.addResource("gettodos", {
      defaultCorsPreflightOptions: {
        allowHeaders: ["*"],
        allowOrigins: apigw.Cors.ALL_ORIGINS,
        allowMethods: apigw.Cors.ALL_METHODS,
        allowCredentials: true,
      },
    });

    const saveTodosResource = api.root.addResource("savetodos", {
      defaultCorsPreflightOptions: {
        allowHeaders: ["*"],
        allowOrigins: apigw.Cors.ALL_ORIGINS,
        allowMethods: apigw.Cors.ALL_METHODS,
        allowCredentials: true,
      },
    });

    getTodosResource.addMethod("POST", new apigw.LambdaIntegration(lambdaFunctions.getTodosHandler));
    saveTodosResource.addMethod("POST", new apigw.LambdaIntegration(lambdaFunctions.saveTodoHandler));

    const testApi = api.root.addResource("test");
    testApi.addMethod("GET", new apigw.LambdaIntegration(lambdaFunctions.testHandler));

    this.apiUrlOutput = new cdk.CfnOutput(this, "apiUrlOutput", {
      value: api.urlForPath("/test"),
    });
  }
}

import * as apigw from "@aws-cdk/aws-apigateway";
import * as cdk from "@aws-cdk/core";
import { ILambdaFunctions } from "../lib/lambda-stack";
import * as acm from "@aws-cdk/aws-certificatemanager";
import * as route53 from "@aws-cdk/aws-route53";
import * as targets from "@aws-cdk/aws-route53-targets";
import { CognitoApiGatewayAuthorizer } from "../app/CognitoApiGatewayAuthorizer";

/**
 * A stack for the Todo API.
 */
export class TodoApiStack extends cdk.Stack {
  public readonly distributionDomainName: cdk.CfnOutput;
  public readonly apiUrlOutput: cdk.CfnOutput;
  public readonly websiteUrlOutput: cdk.CfnOutput;

  constructor(
    scope: cdk.Construct,
    id: string,
    lambdaFunctions: ILambdaFunctions,
    props?: cdk.StackProps
  ) {
    super(scope, id, props);

    // Certificate must be in same region as API.
    const sslCertificate = acm.Certificate.fromCertificateArn(
      this,
      "sslCertificate",
      "arn:aws:acm:us-west-2:705871014762:certificate/10c53402-9fb5-40d4-b330-2677424469f2"
    );

    const hostedZone = route53.PublicHostedZone.fromHostedZoneAttributes(this, "hostedZone", {
      hostedZoneId: "Z04032513RU0Y99VPUBXM",
      zoneName: "mytodos.xyz",
    });

    //*****************************************************************************/
    // API Gateway API.
    //*****************************************************************************/
    const api = new apigw.LambdaRestApi(this, "TodoAPI", {
      restApiName: "TodoAPI",
      description: "Endpont for Todo application.",
      handler: lambdaFunctions.defaultTodoHandler,
      proxy: false,
      domainName: {
        domainName: "api.mytodos.xyz",
        certificate: sslCertificate,
      },
      defaultCorsPreflightOptions: {
        allowHeaders: ["*"],
        allowOrigins: apigw.Cors.ALL_ORIGINS,
        allowMethods: apigw.Cors.ALL_METHODS,
      },
    });

    const auth = new CognitoApiGatewayAuthorizer(this, "adminSectionAuth", {
      restApiId: api.restApiId,
      type: "COGNITO_USER_POOLS",
      identitySource: "method.request.header.Authorization",
      providerArns: ["arn:aws:cognito-idp:us-west-2:705871014762:userpool/us-west-2_eKwrc4n2r"],
      name: "adminSectionAuth",
    });

    const apiArecord = new route53.ARecord(this, "arecord", {
      zone: hostedZone,
      recordName: "api",
      target: route53.RecordTarget.fromAlias(new targets.ApiGateway(api)),
    });

    const todoResource = api.root.addResource("todo", {
      defaultCorsPreflightOptions: {
        allowHeaders: ["*"],
        allowOrigins: apigw.Cors.ALL_ORIGINS,
        allowMethods: apigw.Cors.ALL_METHODS,
        allowCredentials: true,
      },
    });

    const m1 = todoResource.addMethod(
      "GET",
      new apigw.LambdaIntegration(lambdaFunctions.getTodosHandler),
      {
        authorizationType: apigw.AuthorizationType.COGNITO,
        authorizer: auth,
      }
    );

    const m2 = todoResource.addMethod(
      "POST",
      new apigw.LambdaIntegration(lambdaFunctions.saveTodoHandler),
      {
        authorizationType: apigw.AuthorizationType.COGNITO,
        authorizer: auth,
      }
    );

    const testApi = api.root.addResource("test");
    testApi.addMethod("GET", new apigw.LambdaIntegration(lambdaFunctions.testHandler));

    this.apiUrlOutput = new cdk.CfnOutput(this, "apiUrlOutput", {
      value: api.urlForPath("/test"),
    });
  }
}

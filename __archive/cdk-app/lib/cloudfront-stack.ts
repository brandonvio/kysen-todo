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

    const reactBuildPath = path.resolve(__dirname, "../../react-app/build");

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
      sources: [s3Deployment.Source.asset(reactBuildPath)],
      destinationBucket: reactAppBucket,
      distribution: cloudFrontDist,
      distributionPaths: ["/*"],
    });
  }
}

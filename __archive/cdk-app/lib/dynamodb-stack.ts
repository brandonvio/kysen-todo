import * as cdk from "@aws-cdk/core";
import * as dynamodb from "@aws-cdk/aws-dynamodb";
import { ILambdaFunctions } from "../lib/lambda-stack"

/**
 * A stack for the Todo API.
 */
export class TodoDynamodbStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, lambdaFunctions:ILambdaFunctions, props?: cdk.StackProps) {
    super(scope, id, props);

    //*****************************************************************************/
    // DynamoDB.
    //*****************************************************************************/
    const todoTable = new dynamodb.Table(this, "TodoTable", {
      tableName: "TodoTable",
      partitionKey: { name: "pk", type: dynamodb.AttributeType.STRING },
      sortKey: { name: "sk", type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
    });

    todoTable.grantReadWriteData(lambdaFunctions.getTodosHandler);
    todoTable.grantReadWriteData(lambdaFunctions.saveTodoHandler);
  }
}

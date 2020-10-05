import { DynamoDB, config } from "aws-sdk";
config.update({ region: "us-west-2" });

export class dbService {
  async getTodos(username: string): Promise<any> {
    try {
      const docClient = new DynamoDB.DocumentClient({ apiVersion: "2012-08-10" });
      const params = {
        ExpressionAttributeValues: {
          ":u": username,
        },
        KeyConditionExpression: "pk = :u",
        TableName: "TodoTable",
      };
      const items = await docClient.query(params).promise();
      return items;
    } catch (error) {
      console.error(error);
      Promise.reject("There was an error calling dbService.getTodos.");
    }
  }
}

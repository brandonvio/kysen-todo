import { DynamoDB, config } from "aws-sdk";
config.update({ region: "us-west-2" });

/**
 * Service for interacting with DynamoDB.
 */
export class DbService {
  /**
   * Get's Todo items for given user.
   * @param username Username of todos to get.
   */
  async getTodos(username: string): Promise<any> {
    try {
      const docClient = new DynamoDB.DocumentClient({ apiVersion: "2012-08-10" });
      const params: DynamoDB.DocumentClient.QueryInput = {
        ExpressionAttributeValues: {
          ":u": username,
          ":s": "archived",
        },
        FilterExpression: "todoState <> :s",
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

  /**
   * Saves respective Todo item.
   * @param todo Todo item to save.
   */
  async saveTodos(todo: any): Promise<any> {
    try {
      const docClient = new DynamoDB.DocumentClient({ apiVersion: "2012-08-10" });
      var params = {
        TableName: "TodoTable",
        Item: todo,
      };
      const result = await docClient.put(params).promise();
      console.log(result.$response.data);
    } catch (error) {
      console.error(error);
      Promise.reject("There was an error calling dbService.getTodos.");
    }
  }
}

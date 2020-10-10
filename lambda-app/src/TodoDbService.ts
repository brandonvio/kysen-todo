import { DynamoDB, config } from "aws-sdk";
import { ITodoDbService } from "./interfaces/ITodoDbService";
import { ITodoParser } from "./interfaces/ITodoParser";
import { ITodoItem } from "./interfaces/ITodoItem";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
config.update({ region: "us-west-2" });
const _docClient = new DynamoDB.DocumentClient({ apiVersion: "2012-08-10" });

/**
 * Service for interacting with DynamoDB.
 *
 */
export class TodoDbService implements ITodoDbService {
  private _todoParser: ITodoParser;

  constructor(todoParser: ITodoParser) {
    this._todoParser = todoParser;
  }

  /**
   * Get's Todo items for given user.
   * @param username Username of todos to get.
   */
  async getTodos(username: string): Promise<ITodoItem[] | undefined> {
    try {
      const queryInput: DynamoDB.DocumentClient.QueryInput = {
        ExpressionAttributeValues: {
          ":u": username,
          ":s": "archived",
        },
        FilterExpression: "todoState <> :s",
        KeyConditionExpression: "pk = :u",
        TableName: "TodoTable",
      };
      const response = await _docClient.query(queryInput).promise();
      if (response.Items !== undefined) {
        return response.Items?.map((p) => {
          const t: ITodoItem = {
            username: p.pk,
            todoId: p.pk,
            createdDate: p.createdDate,
            description: p.description,
            dueDate: p.dueDate,
            todoState: p.todoState,
          };
          return t;
        });
      }
    } catch (error) {
      console.error(error);
      Promise.reject("There was an error calling dbService.getTodos.");
    }
  }

  /**
   * Saves respective Todo item.
   * @param todo Todo item to save.
   */
  async saveTodo(todoPayload: string): Promise<string | undefined> {
    const todoItem = this._todoParser.parseTodoPayload(todoPayload);
    try {
      const putItemInput: DocumentClient.PutItemInput = {
        TableName: "TodoTable",
        Item: {
          pk: todoItem.username,
          sk: todoItem.todoId,
          createdDate: todoItem.createdDate,
          description: todoItem.description,
          todoState: todoItem.todoState,
          dueDate: todoItem.dueDate,
        },
      };
      const response = await _docClient.put(putItemInput).promise();
      console.log(response.$response.requestId);
      return response.$response.requestId;
    } catch (error) {
      console.error(error);
      Promise.reject("There was an error calling dbService.getTodos.");
    }
  }
}

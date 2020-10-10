import { DynamoDB, config } from "aws-sdk";
import { ITodoItem } from "./ITodoItem";
config.update({ region: "us-west-2" });

/**
 * Service for interacting with DynamoDB.
 *
 */
export interface ITodoDbService {
  /**
   * Get's Todo items for given user.
   * @param username Username of todos to get.
   */
  getTodos(username: string): Promise<ITodoItem[] | undefined>;

  /**
   * Saves respective Todo item.
   * @param todo Todo item to save.
   */
  saveTodo(todoItem: string): Promise<string | undefined>;
}

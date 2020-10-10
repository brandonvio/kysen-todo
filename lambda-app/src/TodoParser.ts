import { DynamoDB, config } from "aws-sdk";
import { ITodoItem } from "./interfaces/ITodoItem";
import { ITodoParser } from "./interfaces/ITodoParser";

/**
 * Service for interacting with DynamoDB.
 *
 */
export class TodoParser implements ITodoParser {
  /**
   * Saves respective Todo item.
   * @param todo Todo item to save.
   */
  parseTodoPayload(todoPayload: string): ITodoItem {
    const t = JSON.parse(todoPayload);
    try {
      const todoItem: ITodoItem = {
        username: this.parseNotNull("username", t.username),
        createdDate: this.parseNotNull("createdDate", t.createdDate),
        description: this.parseNotNull("description", t.description),
        dueDate: this.parseNotNull("dueDate", t.dueDate),
        todoState: this.parseNotNull("todoState", t.todoState),
        todoId: this.parseNotNull("todoId", t.todoId),
      };
      return todoItem;
    } catch (error) {
      console.error("There was an error calling parseTodoPayload.");
      console.error(error);
      throw error;
    }
  }

  parseNotNull(name: string, value: any): any {
    if (value === null || value === undefined || value === "") {
      throw new Error(`${name} is a required attribute.`);
    } else {
      return value;
    }
  }
}

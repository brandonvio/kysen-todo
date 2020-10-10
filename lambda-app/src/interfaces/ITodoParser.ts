import { ITodoItem } from "./ITodoItem";

export interface ITodoParser {
  parseTodoPayload(todoPayload: string): ITodoItem;
}

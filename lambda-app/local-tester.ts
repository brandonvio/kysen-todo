import { TodoDbService } from "./src/TodoDbService";
import { TodoParser } from "./src/TodoParser";
import { v4 as uuidv4 } from "uuid";
import { ITodoItem } from "./src/interfaces/ITodoItem";

const _todoParser = new TodoParser();
const _todoDbService = new TodoDbService(_todoParser);

const todoItem: ITodoItem = {
  username: "brandonv",
  todoId: uuidv4(),
  createdDate: new Date().toISOString(),
  description: "This Todo is for testing purposes.",
  todoState: "pending",
  dueDate: new Date().toISOString(),
};

_todoDbService
  .saveTodo(JSON.stringify(todoItem), "")
  .then((p) => {
    console.log(p);
  })
  .catch((e) => {
    console.log(e);
  });

_todoDbService
  .getTodos("brandonv")
  .then((p) => {
    console.log(p);
  })
  .catch((e) => {
    console.log(e);
  });

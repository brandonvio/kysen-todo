import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { IndexHandler } from "./src/IndexHandler";
import { TodoDbService } from "./src/TodoDbService";
import { TodoParser } from "./src/TodoParser";

const _todoParser = new TodoParser();
const _todoDbService = new TodoDbService(_todoParser);
const _indexHandler = new IndexHandler(_todoDbService);

export async function defaultTodoHandler(event: APIGatewayProxyEvent, context: Context) {
  return _indexHandler.defaultTodoHandler(event, context);
}

export async function testHandler(event: APIGatewayProxyEvent, context: Context) {
  return _indexHandler.testHandler(event, context);
}

export async function getTodosHandler(event: APIGatewayProxyEvent, context: Context) {
  return _indexHandler.getTodosHandler(event, context);
}

export async function saveTodoHandler(event: APIGatewayProxyEvent, context: Context) {
  return _indexHandler.saveTodoHandler(event, context);
}

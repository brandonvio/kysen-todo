import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { ITodoDbService } from "./interfaces/ITodoDbService";
import { IIndexHandler } from "./interfaces/IIndexHandler";
import { CorsHeaders } from "./CorsHeaders";

export class IndexHandler implements IIndexHandler {
  private _todoDbService: ITodoDbService;

  constructor(todoDbService: ITodoDbService) {
    this._todoDbService = todoDbService;
  }

  async defaultTodoHandler(event: APIGatewayProxyEvent, context: Context) {
    console.log(event);
    return {
      headers: CorsHeaders,
      body: "defaultTodoHandler",
      statusCode: 200,
    };
  }

  async testHandler(event: APIGatewayProxyEvent, context: Context) {
    console.log(event);
    return {
      headers: CorsHeaders,
      body: "testHandler",
      statusCode: 200,
    };
  }

  async getTodosHandler(event: APIGatewayProxyEvent, context: Context) {
    try {
      console.log(event);
      const username = event.headers["Authorization"];
      const todoItems = await this._todoDbService.getTodos(username);
      return {
        headers: CorsHeaders,
        body: JSON.stringify(todoItems),
        statusCode: 200,
      };
    } catch (error) {
      console.log(error);
      return {
        headers: CorsHeaders,
        body: JSON.stringify(error),
        statusCode: 500,
      };
    }
  }

  async saveTodoHandler(event: APIGatewayProxyEvent, context: Context) {
    try {
      console.log(event);
      if (event.body !== null) {
        await this._todoDbService.saveTodo(event.body);
      } else {
        throw new Error("Event.body is null.");
      }
      return {
        headers: CorsHeaders,
        statusCode: 200,
      };
    } catch (error) {
      console.log(error);
      return {
        headers: CorsHeaders,
        body: JSON.stringify(error),
        statusCode: 500,
      };
    }
  }
}

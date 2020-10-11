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
      if (event.body) {
        console.log(event);
        const body = JSON.parse(event.body);
        const todoItems = await this._todoDbService.getTodos(body.username);
        return {
          headers: CorsHeaders,
          body: JSON.stringify(todoItems),
          statusCode: 200,
        };
      } else {
        throw new Error("Event.body cannot be empty.");
      }
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
        throw new Error("Event.body cannot be empty.");
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

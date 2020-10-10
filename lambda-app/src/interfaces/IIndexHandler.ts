import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";

export interface IIndexHandler {
  defaultTodoHandler(event: APIGatewayProxyEvent, context: Context): Promise<any>;
  testHandler(event: APIGatewayProxyEvent, context: Context): Promise<any>;
  getTodosHandler(event: APIGatewayProxyEvent, context: Context): Promise<any>;
  saveTodoHandler(event: APIGatewayProxyEvent, context: Context): Promise<any>;
}

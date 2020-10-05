import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { DbService } from "./services/dbService";

const dbService = new DbService();

export async function defaultTodoHandler(event: APIGatewayProxyEvent, context: Context) {
  console.log(event);
  return {
    body: "defaultTodoHandler",
    statusCode: 200,
  };
}

export async function testHandler(event: APIGatewayProxyEvent, context: Context) {
  console.log(event);
  return {
    body: "testHandler",
    statusCode: 200,
  };
}

export async function getTodosHandler(event: APIGatewayProxyEvent, context: Context) {
  try {
    console.log(event);
    const result = await dbService.getTodos("brandonv");
    return {
      body: JSON.stringify(result.Items),
      statusCode: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      body: JSON.stringify(error),
      statusCode: 500,
    };
  }
}

export async function saveTodoHandler(event: any, context: Context) {
  try {
    console.log(event);
    const result = await dbService.saveTodos(JSON.parse(event.body));
    return {
      statusCode: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      body: JSON.stringify(error),
      statusCode: 500,
    };
  }
}

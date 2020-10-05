import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { DbService } from "./services/DbService";

const dbService = new DbService();
const corsHeaders = {
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Origin": "https://www.example.com",
  "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
};
export async function defaultTodoHandler(event: APIGatewayProxyEvent, context: Context) {
  console.log(event);
  return {
    headers: corsHeaders,
    body: "defaultTodoHandler",
    statusCode: 200,
  };
}

export async function testHandler(event: APIGatewayProxyEvent, context: Context) {
  console.log(event);
  return {
    headers: corsHeaders,
    body: "testHandler",
    statusCode: 200,
  };
}

export async function getTodosHandler(event: APIGatewayProxyEvent, context: Context) {
  try {
    console.log(event);
    const result = await dbService.getTodos("brandonv");
    return {
      headers: corsHeaders,
      body: JSON.stringify(result.Items),
      statusCode: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      headers: corsHeaders,
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
      headers: corsHeaders,
      statusCode: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      headers: corsHeaders,
      body: JSON.stringify(error),
      statusCode: 500,
    };
  }
}

import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";

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
  console.log(event);
  const payload = [
    {
      todo: "Go get some milk!",
      dueDate: "Monday ###!!#!#!",
      createdDate: "Today",
      createdBy: "Me",
    },
    {
      todo: "Go get some potatoes!",
      dueDate: "Tuesday",
      createdDate: "Today",
      createdBy: "You",
    },
    {
      todo: "Go get some bluebrries!",
      dueDate: "Wednesday",
      createdDate: "Today",
      createdBy: "You",
    },
    {
      todo: "Go get some batteries!",
      dueDate: "Thursday",
      createdDate: "Today",
      createdBy: "You",
    },
    {
      todo: "Go get some beer and cider!",
      dueDate: "Friday",
      createdDate: "Today",
      createdBy: "You",
    },
  ];

  return {
    body: JSON.stringify(payload),
    statusCode: 200,
  };
}

export async function updateTodoHandler(event: any, context: Context) {
  console.log(event);
  const payload = event.body;
  return {
    body: JSON.stringify(payload),
    statusCode: 200,
  };
}

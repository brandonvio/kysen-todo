import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";

export async function handler(
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> {
  const payload = [
    {
      todo: "Go get some milk!",
      dueDate: "Tomorrow",
      createdDate: "Today",
      createdBy: "Me",
    },
    {
      todo: "Go get some milk!",
      dueDate: "Tomorrow",
      createdDate: "Today",
      createdBy: "You",
    },
    {
      todo: "Go get some milk!",
      dueDate: "Tomorrow",
      createdDate: "Today",
      createdBy: "You",
    },
    {
      todo: "Go get some milk!",
      dueDate: "Tomorrow",
      createdDate: "Today",
      createdBy: "You",
    },
    {
      todo: "Go get some milk!",
      dueDate: "Tomorrow",
      createdDate: "Today",
      createdBy: "You",
    },
  ];

  return {
    body: JSON.stringify(payload),
    statusCode: 200,
  };
}

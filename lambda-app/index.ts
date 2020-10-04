import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";

/**
 * V2
 */
exports.lambdaHandler = async (event: APIGatewayProxyEvent, context: Context) => {
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
};

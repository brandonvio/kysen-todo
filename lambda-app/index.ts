import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";

/**
 * V2
 */
exports.lambdaHandler = async (event: APIGatewayProxyEvent, context: Context) => {
  console.log(event);
  const payload = [
    {
      todo: "Go get some milk!",
      dueDate: "Monday",
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
};

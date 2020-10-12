const axios = require("axios");
const apiEndpoint = "https://dzun420jh3.execute-api.us-west-2.amazonaws.com/prod";
const saveTodoUrl = `${apiEndpoint}/savetodos`;
const getTodosUrl = `${apiEndpoint}/gettodos`;
const uuid = require("uuid");

test("Should post, get and archive Todo.", async () => {
  try {
    console.log(uuid.v4());

    const createdDate = "2020-10-07T01:03:09.040Z";
    const dueDate = "2020-10-07T08:03:09.040Z";

    const pk = uuid.v4();
    const sk = uuid.v4();

    const postData = {
      username: pk,
      todoId: sk,
      createdDate: createdDate,
      dueDate: dueDate,
      description: "This todo is created as an integration test.",
      todoState: "pending",
    };

    let response = await axios.post(saveTodoUrl, postData);
    expect(response.status).toBe(200);

    const data = {
      username: pk,
    };
    response = await axios.post(getTodosUrl, data);
    expect(response.status).toBe(200);

    console.log(response.data);
  } catch (error) {
    console.log(error);
    throw error;
  }
});

test("Should post, get and archive Todo.", async () => {
  console.log(uuid.v4());

  const createdDate = "2020-10-07T01:03:09.040Z";
  const dueDate = "2020-10-07T08:03:09.040Z";

  // pk is the user.
  const pk = uuid.v4();
  const sk = uuid.v4();

  // Construct todo item.
  const postData = {
    username: pk,
    todoId: sk,
    createdDate: createdDate,
    dueDate: dueDate,
    description: "This todo is created as an integration test.",
    todoState: "pending",
  };

  // Post the todo item and expect a 200 response.
  let response = await axios.post(saveTodoUrl, postData);
  expect(response.status).toBe(200);

  const data = {
    username: pk,
  };
  response = await axios.post(getTodosUrl, data);

  // Expect a 200 and one item to be returned.
  expect(response.status).toBe(200);
  expect(response.data.length).toBe(1);
  let todoItem = response.data[0];
  console.log(todoItem);

  // Update the todo state to 'archived' and post.
  todoItem.todoState = "archived";
  response = await axios.post(saveTodoUrl, todoItem);
  expect(response.status).toBe(200);

  // Get the todos for pk (using same config as before) and expect there to be 0.
  // There are 0 items returned because we archived the only todo for pk.
  response = await axios.post(getTodosUrl, data);
  expect(response.status).toBe(200);
  expect(response.data.length).toBe(0);
  todoItem = response.data;
  console.log(todoItem);
});

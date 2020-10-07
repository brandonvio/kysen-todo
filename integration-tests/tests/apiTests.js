const axios = require("axios");
const apiUrl = "https://dzun420jh3.execute-api.us-west-2.amazonaws.com/prod/todos";
const uuid = require("uuid");

test("Should post, get and archive Todo.", async () => {
  console.log(uuid.v4());

  const createdDate = "2020-10-07T01:03:09.040Z";
  const dueDate = "2020-10-07T08:03:09.040Z";

  const pk = uuid.v4();
  const sk = uuid.v4();

  const postData = {
    pk: pk,
    sk: sk,
    createdDate: createdDate,
    dueDate: dueDate,
    description: "This todo is created as an integration test.",
    todoState: "pending",
  };

  let response = await axios.post(apiUrl, postData);
  expect(response.status).toBe(200);

  const config = {
    headers: {
      Authorization: pk,
    },
  };
  response = await axios.get(apiUrl, config);
  console.log(response.data);
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
    pk: pk,
    sk: sk,
    createdDate: createdDate,
    dueDate: dueDate,
    description: "This todo is created as an integration test.",
    todoState: "pending",
  };

  // Post the todo item and expect a 200 response.
  let response = await axios.post(apiUrl, postData);
  expect(response.status).toBe(200);

  // We are passing the username in on the Authorization header.
  // This will retrieve only the todo items for our pk user.
  const config = {
    headers: {
      Authorization: pk,
    },
  };
  response = await axios.get(apiUrl, config);

  // Expect a 200 and one item to be returned.
  expect(response.status).toBe(200);
  expect(response.data.length).toBe(1);
  let todoItem = response.data[0];
  console.log(todoItem);

  // Update the todo state to 'archived' and post.
  todoItem.todoState = "archived";
  response = await axios.post(apiUrl, todoItem);
  expect(response.status).toBe(200);

  // Get the todos for pk (using same config as before) and expect there to be 0.
  // There are 0 items returned because we archived the only todo for pk.
  response = await axios.get(apiUrl, config);
  expect(response.status).toBe(200);
  expect(response.data.length).toBe(0);
  todoItem = response.data;
  console.log(todoItem);
});

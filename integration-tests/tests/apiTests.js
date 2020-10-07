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
  expect(response.status).toBe(200);
  expect(response.data.length).toBe(1);
  let todoItem = response.data[0];
  console.log(todoItem);

  todoItem.todoState = "archived";
  response = await axios.post(apiUrl, todoItem);
  expect(response.status).toBe(200);

  response = await axios.get(apiUrl, config);
  expect(response.status).toBe(200);
  expect(response.data.length).toBe(0);
  todoItem = response.data;
  console.log(todoItem);
});

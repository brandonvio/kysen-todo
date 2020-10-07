const axios = require("axios");
const apiUrl = "https://dzun420jh3.execute-api.us-west-2.amazonaws.com/prod/todos";
const uuid = require("uuid");

test("Should post record to api.", async () => {
  console.log("passed.");
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

  const response = await axios.post(apiUrl, postData);
  expect(response.status).toBe(200);
});

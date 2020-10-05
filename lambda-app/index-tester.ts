import * as index from "./index";

const result1 = index.testHandler(null, null);
result1
  .then((p) => {
    console.log(p);
  })
  .catch((e) => {
    console.log(e);
  });

const result2 = index.getTodosHandler(null, null);
result2
  .then((p) => {
    console.log(p);
  })
  .catch((e) => {
    console.log(e);
  });

const updateEvent = {
  body: { todoId: "1", todo: "Go get milk!" },
};
const result3 = index.saveTodoHandler(updateEvent, null);
result3
  .then((p) => {
    console.log(p);
  })
  .catch((e) => {
    console.log(e);
  });

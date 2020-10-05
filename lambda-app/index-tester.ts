import * as index from "./index";

// index
//   .testHandler(null, null)
//   .then((p) => {
//     console.log(p);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

index
  .getTodosHandler(null, null)
  .then((p) => {
    console.log(p);
  })
  .catch((e) => {
    console.log(e);
  });

// const updateEvent = {
//   body: {
//     pk: "brandonv",
//     sk: "1",
//     description: "Go get milk!",
//     createdDate: "today",
//     dueDate: "tomorrow",
//   },
// };

// index
//   .saveTodoHandler(updateEvent, null)
//   .then((p) => {
//     console.log(p);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

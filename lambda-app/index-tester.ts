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
    console.log(JSON.stringify(JSON.parse(p.body), null, 2));
  })
  .catch((e) => {
    console.log(e);
  });

// const updateEvent = {
//   body: {
//     pk: "brandonv",
//     sk: "3",
//     description: "Go get milk!",
//     createdDate: "today",
//     dueDate: "tomorrow",
//     todoState: "deleted",
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

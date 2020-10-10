"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TodoDbService_1 = require("./src/TodoDbService");
var TodoParser_1 = require("./src/TodoParser");
var uuid_1 = require("uuid");
var _todoParser = new TodoParser_1.TodoParser();
var _todoDbService = new TodoDbService_1.TodoDbService(_todoParser);
var todoItem = {
    username: "brandonv",
    todoId: uuid_1.v4(),
    createdDate: new Date().toISOString(),
    description: "This Todo is for testing purposes.",
    todoState: "pending",
    dueDate: new Date().toISOString(),
};
_todoDbService
    .saveTodo(JSON.stringify(todoItem))
    .then(function (p) {
    console.log(p);
})
    .catch(function (e) {
    console.log(e);
});
_todoDbService
    .getTodos("brandonv")
    .then(function (p) {
    console.log(p);
})
    .catch(function (e) {
    console.log(e);
});
//# sourceMappingURL=local-tester.js.map
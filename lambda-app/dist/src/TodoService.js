"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoParser = void 0;
/**
 * Service for interacting with DynamoDB.
 *
 */
var TodoParser = /** @class */ (function () {
    function TodoParser() {
    }
    /**
     * Saves respective Todo item.
     * @param todo Todo item to save.
     */
    TodoParser.prototype.parseTodoPayload = function (todoPayload) {
        var t = JSON.parse(todoPayload);
        try {
            var todoItem = {
                username: this.parseNotNull("username", t.username),
                createdDate: this.parseNotNull("createdDate", t.createdDate),
                description: this.parseNotNull("description", t.description),
                dueDate: this.parseNotNull("dueDate", t.dueDate),
                todoState: this.parseNotNull("todoState", t.todoState),
                todoId: this.parseNotNull("todoId", t.todoId),
            };
            return todoItem;
        }
        catch (error) {
            console.error("There was an error calling parseTodoPayload.");
            console.error(error);
            throw error;
        }
    };
    TodoParser.prototype.parseNotNull = function (name, value) {
        if (value === null || value === undefined || value === "") {
            throw new Error(name + " is a required attribute.");
        }
        else {
            return value;
        }
    };
    return TodoParser;
}());
exports.TodoParser = TodoParser;
//# sourceMappingURL=TodoService.js.map
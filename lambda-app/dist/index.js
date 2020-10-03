"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lambdaHandler = async (event, context) => {
    const payload = [
        {
            todo: "Go get some milk!",
            dueDate: "Tomorrow",
            createdDate: "Today",
            createdBy: "Me",
        },
        {
            todo: "Go get some milk!",
            dueDate: "Tomorrow",
            createdDate: "Today",
            createdBy: "You",
        },
        {
            todo: "Go get some milk!",
            dueDate: "Tomorrow",
            createdDate: "Today",
            createdBy: "You",
        },
        {
            todo: "Go get some milk!",
            dueDate: "Tomorrow",
            createdDate: "Today",
            createdBy: "You",
        },
        {
            todo: "Go get some milk!",
            dueDate: "Tomorrow",
            createdDate: "Today",
            createdBy: "You",
        },
    ];
    return {
        body: JSON.stringify(payload),
        statusCode: 200,
    };
};
//# sourceMappingURL=index.js.map
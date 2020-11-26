"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("../src/common");
var save_todo_event_1 = require("./data/save-todo-event");
var fs = require("fs");
var jwt = require("jsonwebtoken");
var jwkToPem = require("jwk-to-pem");
test("test getExpireEpoch", function () {
    var x1 = common_1.getExpireEpoch(0, new Date("1978-07-01T09:30:00.000Z"));
    expect(x1).toBe(268133400);
    var x2 = common_1.getExpireEpoch(1, new Date("1978-07-01T09:30:00.000Z"));
    var x3 = x2 - x1;
    expect(x3).toBe(86400);
    var x4 = common_1.getExpireEpoch(26, new Date("1978-07-01T09:30:00.000Z"));
    var x5 = x4 - x1;
    expect(x5).toBe(86400 * 26);
});
test("parse JWT", function () {
    var token = fs.readFileSync("./tests/data/token.txt").toString();
    var decodedJwt = jwt.decode(token, { complete: true });
});
test("parse event", function () {
    var token = save_todo_event_1.saveTodoEvent.headers.Authorization;
    var decodedJwt = jwt.decode(token, { complete: true });
    var username = decodedJwt["payload"]["cognito:username"];
    expect(username).toBe("206b145a-c789-4d15-ad97-148a20a63e2c");
});
//# sourceMappingURL=test.js.map
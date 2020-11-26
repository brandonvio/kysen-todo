import { getExpireEpoch } from "../src/common";
import { saveTodoEvent } from "./data/save-todo-event";
const fs = require("fs");
var jwt = require("jsonwebtoken");
var jwkToPem = require("jwk-to-pem");

test("test getExpireEpoch", () => {
  const x1 = getExpireEpoch(0, new Date("1978-07-01T09:30:00.000Z"));
  expect(x1).toBe(268133400);

  const x2 = getExpireEpoch(1, new Date("1978-07-01T09:30:00.000Z"));
  const x3 = x2 - x1;
  expect(x3).toBe(86400);

  const x4 = getExpireEpoch(26, new Date("1978-07-01T09:30:00.000Z"));
  const x5 = x4 - x1;
  expect(x5).toBe(86400 * 26);
});

test("parse JWT", () => {
  const token = fs.readFileSync("./tests/data/token.txt").toString();
  const decodedJwt = jwt.decode(token, { complete: true });
});

test("parse event", () => {
  const token = saveTodoEvent.headers.Authorization;
  const decodedJwt = jwt.decode(token, { complete: true });
  const username = decodedJwt["payload"]["cognito:username"];
  expect(username).toBe("206b145a-c789-4d15-ad97-148a20a63e2c");
});

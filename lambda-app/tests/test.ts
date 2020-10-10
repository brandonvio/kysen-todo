import { getExpireEpoch } from "../src/common";

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

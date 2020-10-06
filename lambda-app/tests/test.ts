import { getExpireEpoch } from "../services/common";

test("test getExpireEpoch", () => {
  const x1 = getExpireEpoch(0, new Date("July 1, 1978 02:30:00"));
  expect(x1).toBe(268133400);

  const x2 = getExpireEpoch(1, new Date("July 1, 1978 02:30:00"));
  const x3 = x2 - x1;
  expect(x3).toBe(86400);

  const x4 = getExpireEpoch(26, new Date("July 1, 1978 02:30:00"));
  const x5 = x4 - x1;
  expect(x5).toBe(86400 * 26);
});

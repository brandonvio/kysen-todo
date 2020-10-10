"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("../src/common");
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
//# sourceMappingURL=test.js.map
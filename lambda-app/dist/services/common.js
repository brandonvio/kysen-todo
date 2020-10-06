"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExpireEpoch = void 0;
/**
 * Returns expire date in epoch time.
 * @param days Number of days to expire.
 * @param date Date to expire from. Uses current time if not provided.
 */
exports.getExpireEpoch = function (days, date) {
    if (date === void 0) { date = null; }
    if (date === null) {
        date = new Date();
    }
    var result = new Date(date);
    result.setDate(date.getDate() + days);
    var expireDateEpoch = Math.round(result.getTime() / 1000);
    return expireDateEpoch;
};
//# sourceMappingURL=common.js.map
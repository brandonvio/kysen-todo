/**
 * Returns expire date in epoch time.
 * @param days Number of days to expire.
 * @param date Date to expire from. Uses current time if not provided.
 */
export const getExpireEpoch = function (days: number, date: Date = null) {
  if (date === null) {
    date = new Date();
  }
  const result = new Date(date);
  result.setDate(date.getDate() + days);
  const expireDateEpoch = Math.round(result.getTime() / 1000);
  return expireDateEpoch;
};

export const fieldSorter = (fields) => (a, b) =>
  fields
    .map((o) => {
      let dir = 1;
      if (o[0] === "-") {
        dir = -1;
        o = o.substring(1);
      }
      return a[o] > b[o] ? dir : a[o] < b[o] ? -dir : 0;
    })
    .reduce((p, n) => (p ? p : n), 0);

export const ActionTypes = {
  SIGNUP_USER: "SIGNUP_USER",
  LOGIN_USER: "LOGIN_USER",
  COFIRM_USER: "COFIRM_USER",
};

export const LocalStorageKeys = {
  MYTODOS_AUTH_USER: "mytodos-auth-user",
};

export const logJsonStringify = (label, value) => {
  const log = {
    timestamp: new Date().toDateString(),
    label: label,
    value: value,
  };
  console.log(JSON.stringify(log, null, 2));
};

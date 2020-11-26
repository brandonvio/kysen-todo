const loggingEnabled = false;

// Enums
//-------------------------------------------------------------
export const ActionTypes = {
  SIGNUP_USER: "SIGNUP_USER",
  SIGNUP_USER_FAILED: "SIGNUP_USER_FAILED",
  LOGIN_USER: "LOGIN_USER",
  LOGIN_USER_FAILED: "LOGIN_USER_FAILED",
  COFIRM_USER: "COFIRM_USER",
  COFIRM_USER_FAILED: "COFIRM_USER_FAILED",
  LOGOUT_USER: "LOGOUT_USER",
};

// Constants
//-------------------------------------------------------------
export const LocalStorageKeys = {
  MYTODOS_AUTH_USER: "mytodos-auth-user",
};

// Functions
//-------------------------------------------------------------
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

export const logJsonStringify = (label, value) => {
  const now = new Date();
  const log = {
    timestamp: `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`,
    label: label,
    value: value,
  };

  if (loggingEnabled) {
    console.log(JSON.stringify(log, null, 2));
  }
};

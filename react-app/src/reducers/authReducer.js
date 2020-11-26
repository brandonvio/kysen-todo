import { ActionTypes, logJsonStringify, LocalStorageKeys } from "../common";

const getInitialState = () => {
  const authToken = localStorage.getItem(LocalStorageKeys.MYTODOS_AUTH_USER);
  logJsonStringify("authReducer:user", authToken);
  if (authToken) {
    const parsedToken = JSON.parse(authToken);
    return {
      auth: {
        authenticated: true,
        confirmed: true,
        signedup: true,
        error: undefined,
        authToken: parsedToken,
        name: parsedToken["idToken"]["payload"]["name"],
        username: parsedToken["idToken"]["payload"]["cognito:username"],
        jwtToken: parsedToken["idToken"]["jwtToken"],
      },
    };
  } else {
    return {
      auth: {
        authenticated: false,
        loginFailed: false,
        confirmed: false,
        confirmFailed: false,
        signedup: false,
        signupFailed: false,
        error: undefined,
        user: undefined,
        name: undefined,
        username: undefined,
      },
    };
  }
};

const initialState = getInitialState();

const authReducer = (state = initialState, action) => {
  logJsonStringify("authReducer:state", state);
  logJsonStringify("authReducer:action", action.type);
  switch (action.type) {
    case ActionTypes.SIGNUP_USER:
      return {
        ...state,
        auth: action.payload,
      };

    case ActionTypes.SIGNUP_USER_FAILED:
      return {
        ...state,
        auth: action.payload,
      };

    case ActionTypes.LOGIN_USER:
      return {
        ...state,
        auth: action.payload,
      };

    case ActionTypes.LOGIN_USER_FAILED:
      return {
        ...state,
        auth: action.payload,
      };

    case ActionTypes.COFIRM_USER:
      return {
        ...state,
        auth: action.payload,
      };

    case ActionTypes.COFIRM_USER_FAILED:
      return {
        ...state,
        auth: action.payload,
      };

    case ActionTypes.LOGOUT_USER:
      return {
        ...state,
        auth: action.payload,
      };

    default:
      return state;
  }
};

export default authReducer;

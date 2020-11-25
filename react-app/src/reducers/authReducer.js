import { ActionTypes, logJsonStringify, LocalStorageKeys } from "../common";

const getInitialState = () => {
  const user = localStorage.getItem(LocalStorageKeys.MYTODOS_AUTH_USER);
  logJsonStringify("authReducer:user", user);
  if (user) {
    const parsedUser = JSON.parse(user);
    return {
      auth: {
        authenticated: true,
        confirmed: true,
        signedup: true,
        error: undefined,
        user: parsedUser,
        name: parsedUser.idToken.payload.name,
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
    default:
      return state;
  }
};

export default authReducer;

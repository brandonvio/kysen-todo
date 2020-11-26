import { ActionTypes, logJsonStringify } from "../common";

const initialState = {
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

    case ActionTypes.VALIDATE_USER:
      return {
        ...state,
        auth: action.payload,
      };

    default:
      return state;
  }
};

export default authReducer;

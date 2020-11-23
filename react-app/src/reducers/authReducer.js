const initialState = {
  auth: {
    authenticated: false,
    user: undefined,
  },
};

const authReducer = (state = initialState, action) => {
  console.log("authReducer", state, action);
  switch (action.type) {
    case "SIGNUP_USER":
      return {
        ...state,
        auth: action.payload,
      };

    case "LOGIN_USER":
      return {
        ...state,
        auth: action.payload,
      };

    default:
      return state;
  }
};

export default authReducer;

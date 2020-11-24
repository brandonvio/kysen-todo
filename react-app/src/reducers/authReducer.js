const getInitialState = () => {
  const user = localStorage.getItem("mytodos-auth-user");
  console.log("authReducer:user", JSON.parse(user));
  if (user) {
    const parsedUser = JSON.parse(user);
    return {
      auth: {
        authenticated: true,
        user: parsedUser,
        name: parsedUser.idToken.payload.name,
      },
    };
  } else {
    return {
      auth: {
        authenticated: false,
        user: undefined,
      },
    };
  }
};

const initialState = getInitialState();

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

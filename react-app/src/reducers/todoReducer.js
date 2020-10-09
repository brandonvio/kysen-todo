const todoReducer = (state = { todos: [], relativeTimes: [] }, action) => {
  //   console.log(state, action);
  switch (action.type) {
    case "GET_TODOS":
      return {
        ...state,
        todos: action.payload.todoItems,
        relativeTimes: action.payload.relativeTimes,
      };
    case "SAVE_TODO":
      return {
        ...state,
        todos: action.payload.todoItems,
        relativeTimes: action.payload.relativeTimes,
      };
    default:
      return state;
  }
};

export default todoReducer;

import moment from "moment";

const todoReducer = (state = { todos: [], relativeTimes: [] }, action) => {
  //   console.log(state, action);
  switch (action.type) {
    case "GET_TODOS":
      return {
        ...state,
        todos: action.payload,
        relativeTimes: getRelativeTimes(),
      };
    case "SAVE_TODO":
      return {
        ...state,
        todos: action.payload,
        relativeTimes: getRelativeTimes(),
      };
    default:
      return state;
  }
};

const getRelativeTimes = () => {
  const relativeTimes = [
    {
      description: "Now (ish)...",
      when: moment().add(1, "hours").fromNow(),
      value: moment().add(1, "hours").toISOString(),
    },
    {
      description: "Today...",
      when: moment().endOf("day").fromNow(),
      value: moment().endOf("day").toISOString(),
    },
    {
      description: "Tomorrow...",
      when: moment().add(1, "days").fromNow(),
      value: moment().add(1, "days").toISOString(),
    },
    {
      description: "This week...",
      when: moment().add(3, "days").fromNow(),
      value: moment().add(3, "days").toISOString(),
    },
    {
      description: "Next week...",
      when: moment().add(7, "days").fromNow(),
      value: moment().add(7, "days").toISOString(),
    },
  ];
  return relativeTimes;
};

export default todoReducer;

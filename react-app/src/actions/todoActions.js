import axios from "axios";
import { fieldSorter } from "../common";
const todoUrl = "https://dzun420jh3.execute-api.us-west-2.amazonaws.com/prod/todos";

const getTodos = () => {
  return async (dispatch) => {
    console.log("getting data...");
    const config = {
      headers: {
        Authorization: "brandonv",
      },
    };
    const result = await axios.get(todoUrl, config);
    const todoData = result.data.sort(fieldSorter(["-todoState", "dueDate"]));
    return dispatch({
      type: "GET_TODOS",
      payload: todoData,
    });
  };
};

const saveTodo = (todoItem) => {
  return async (dispatch) => {
    await axios.post(todoUrl, todoItem);
    return dispatch(getTodos());
  };
};

export default {
  getTodos,
  saveTodo,
};

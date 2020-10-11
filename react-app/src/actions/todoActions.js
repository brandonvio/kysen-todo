import axios from "axios";
import moment from "moment";
import { fieldSorter } from "../common";
const apiEndpoint = "https://dzun420jh3.execute-api.us-west-2.amazonaws.com/prod";
const saveTodoUrl = `${apiEndpoint}/savetodos`;
const getTodosUrl = `${apiEndpoint}/gettodos`;

const getTodos = () => {
  return async (dispatch) => {
    try {
      console.log("getting data...");
      const data = {
        username: "brandonv",
      };
      const result = await axios.post(getTodosUrl, data);
      const todoItems = result.data.sort(fieldSorter(["-todoState", "dueDate"]));
      const payload = {
        todoItems,
        relativeTimes: getRelativeTimes(),
      };
      return dispatch({
        type: "GET_TODOS",
        payload,
      });
    } catch (error) {
      console.error(error);
      return Promise.reject("There was an error getting the todos from the API.");
    }
  };
};

const saveTodo = (todoItem) => {
  return async (dispatch) => {
    try {
      await axios.post(saveTodoUrl, todoItem);
      return dispatch(getTodos());
    } catch (error) {
      console.error(error);
      return Promise.reject("There was an error saving the todo to the API.");
    }
  };
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

export default {
  getTodos,
  saveTodo,
};

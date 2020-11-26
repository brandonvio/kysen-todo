import axios from "axios";
import moment from "moment";
import { fieldSorter, logJsonStringify } from "../common";
const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;
const todoEndpoint = `${apiEndpoint}/todo`;

const getTodos = (auth) => {
  return async (dispatch) => {
    try {
      logJsonStringify("todoActions:getTodos:username", auth.username);
      logJsonStringify("todoActions:getTodos:jwtToken", auth.jwtToken);
      const data = {
        username: auth.username,
      };
      const headers = {
        Authorization: auth.jwtToken,
      };
      const options = {};
      options["headers"] = headers;
      const result = await axios.get(todoEndpoint, data, options);
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

const saveTodo = (todoItem, auth) => {
  return async (dispatch) => {
    try {
      const headers = {
        Authorization: auth.jwtToken,
      };
      const options = {};
      options["headers"] = headers;
      await axios.post(todoEndpoint, todoItem, options);
      return dispatch(getTodos(todoItem.username));
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

import todoReducer from "./todoReducer";
import authReducer from "./authReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  todoReducer,
  authReducer,
});

export default rootReducer;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "react-bootstrap";
import allActions from "../actions";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

/**
 * TodoApp
 */
function TodoApp() {
  const relativeTimes = useSelector((state) => state.todoReducer.relativeTimes);
  const todoItems = useSelector((state) => state.todoReducer.todos);
  const auth = useSelector((state) => state.authReducer.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(allActions.authActions.validateUser());
  }, [dispatch]);
  if (auth.authenticated) {
    return (
      <>
        <h1>todo</h1>
        <TodoForm auth={auth} relativeTimes={relativeTimes} />
        <TodoList auth={auth} todoItems={todoItems} />
      </>
    );
  } else {
    // return <Redirect to="/auth/login" />;
    return (
      <>
        <h1>Unauthorized</h1>
        <Alert variant="info">
          You're not authenticated. <a href="/auth/login">Click here to login.</a>
        </Alert>
      </>
    );
  }
}

export default TodoApp;

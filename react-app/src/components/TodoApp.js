import React from "react";
import { useSelector } from "react-redux";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import { Redirect } from "react-router-dom";

/**
 * TodoApp
 */
function TodoApp() {
  const relativeTimes = useSelector((state) => state.todoReducer.relativeTimes);
  const todoItems = useSelector((state) => state.todoReducer.todos);
  const auth = useSelector((state) => state.authReducer.auth);
  if (auth.authenticated) {
    return (
      <>
        <TodoForm relativeTimes={relativeTimes} />
        <TodoList todoItems={todoItems} />
      </>
    );
  } else {
    return <Redirect to="/auth/login" />;
  }
}

export default TodoApp;

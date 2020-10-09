import React from "react";
import { useSelector } from "react-redux";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

/**
 * TodoApp()
 */
function TodoApp() {
  const relativeTimes = useSelector((state) => state.todoReducer.relativeTimes);
  const todoItems = useSelector((state) => state.todoReducer.todos);
  return (
    <>
      <TodoForm relativeTimes={relativeTimes} />
      <TodoList todoItems={todoItems} />
    </>
  );
}

export default TodoApp;

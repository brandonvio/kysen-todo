import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ListGroup } from "react-bootstrap";
import allActions from "../actions";
import TodoItem from "./TodoItem";

/**
 * TodoList
 * @description This class is the list component of the TodoList application.
 */
export default function TodoList({ todoItems, auth }) {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      dispatch(allActions.todoActions.getTodos(auth.username));
    };
    fetchData();
  }, [dispatch, auth]);
  return (
    <ListGroup variant="flush">
      {todoItems.map((item) => (
        <ListGroup.Item key={item.todoId}>
          <TodoItem item={item} />
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

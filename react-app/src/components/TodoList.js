import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ListGroup } from "react-bootstrap";
import allActions from "../actions";
import TodoItem from "./TodoItem";

/**
 * TodoList
 * @description This class is the list component of the TodoList application.
 */
export default function TodoList({ todoItems }) {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      dispatch(allActions.todoActions.getTodos());
    };
    fetchData();
  }, [dispatch]);
  return (
    <ListGroup variant="flush">
      {todoItems.map((item) => (
        <ListGroup.Item key={item.sk}>
          <TodoItem item={item} />
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

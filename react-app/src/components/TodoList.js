import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ListGroup, Button } from "react-bootstrap";
import moment from "moment";
import allActions from "../actions";

/**
 * TodoList
 * @description This class is the list component of the TodoList application.
 */
export default function TodoList() {
  const todos = useSelector((state) => state.todoReducer.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      dispatch(allActions.todoActions.getTodos());
    };
    fetchData();
  }, [dispatch]);

  const updateItem = async (todoItem) => {
    dispatch(allActions.todoActions.saveTodo(todoItem));
  };

  return (
    <ListGroup variant="flush">
      {todos.map((item) => (
        <ListGroup.Item key={item.sk}>
          <div>
            <div className="form-check">
              <input
                type="checkbox"
                id={item.sk}
                className="form-check-input"
                checked={item.todoState === "done"}
                data-keeper-edited="yes"
                onChange={(e) => {
                  if (item.todoState === "pending") {
                    item.todoState = "done";
                  } else {
                    item.todoState = "pending";
                  }
                  updateItem(item);
                }}
              />
              <label htmlFor={item.sk} className={item.todoState === "done" ? "line-through" : ""}>
                {item.description}
              </label>
            </div>
            <div className={item.todoState === "done" ? "line-through" : ""}>
              <span style={{ color: "lightblue" }}>Created</span>{" "}
              {moment(item.createdDate).fromNow()}
              {", "}
              <span style={{ color: "lightblue" }}>due</span> {moment(item.dueDate).fromNow()}.
            </div>
          </div>
          <div>
            <Button
              style={{ margin: "0px", padding: "0px" }}
              variant="link"
              onClick={(e) => {
                item.todoState = "archived";
                updateItem(item);
              }}
            >
              archive
            </Button>
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

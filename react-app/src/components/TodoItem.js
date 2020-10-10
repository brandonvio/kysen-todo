import React from "react";
import { useDispatch } from "react-redux";
import { Button, Badge } from "react-bootstrap";
import moment from "moment";
import allActions from "../actions";

/**
 * TodoItem
 * @description This class is the todo item in the list.
 */
export default function TodoItem({ item }) {
  const dispatch = useDispatch();
  const nowISO = new Date().toISOString();
  return (
    <>
      <div>
        <div className="form-check">
          <input
            type="checkbox"
            id={item.todoId}
            className="form-check-input"
            checked={item.todoState === "done"}
            data-keeper-edited="yes"
            onChange={(e) => {
              if (item.todoState === "pending") {
                item.todoState = "done";
              } else {
                item.todoState = "pending";
              }
              dispatch(allActions.todoActions.saveTodo(item));
            }}
          />
          <label htmlFor={item.todoId} className={item.todoState === "done" ? "line-through" : ""}>
            {nowISO > item.dueDate && item.todoState !== "done" && (
              <span>
                <Badge variant="danger">git-er-done</Badge>
                &nbsp;&nbsp;
              </span>
            )}
            {item.description}
          </label>
        </div>
        <div className={item.todoState === "done" ? "line-through" : ""}>
          <span style={{ color: "lightblue" }}>Created</span> {moment(item.createdDate).fromNow()}
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
            dispatch(allActions.todoActions.saveTodo(item));
          }}
        >
          archive
        </Button>
      </div>
    </>
  );
}

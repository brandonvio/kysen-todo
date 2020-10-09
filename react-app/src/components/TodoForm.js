import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Button, InputGroup, FormControl } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import allActions from "../actions";

/**
 * TodoList
 * @description This class is the main component of the TodoList application.
 */
export default function TodoForm() {
  const relativeTimes = useSelector((state) => state.todoReducer.relativeTimes);
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();

  const onSubmit = async (formData) => {
    const todoItem = {
      pk: "brandonv",
      sk: uuidv4(),
      createdDate: new Date().toISOString(),
      description: formData.description,
      todoState: "pending",
      dueDate: formData.dueDate,
    };
    dispatch(allActions.todoActions.saveTodo(todoItem));
    reset();
  };

  return (
    <div>
      <h1>Todo...</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="What do you need to do?"
            ref={register}
            name="description"
            required
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <Form.Control name="dueDate" as="select" defaultValue="" ref={register} required>
            <option value="">When does it need to be done?</option>
            {relativeTimes.map((item) => (
              <option key={item.value} value={item.value}>
                {item.description} {item.when}
              </option>
            ))}
          </Form.Control>
          <InputGroup.Append>
            <Button type="submit" variant="info">
              do it &nbsp; :)
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </form>
    </div>
  );
}

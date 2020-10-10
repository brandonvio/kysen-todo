import React from "react";
import { useDispatch } from "react-redux";
import { Form, Button, InputGroup, FormControl } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import allActions from "../actions";

/**
 * TodoForm
 * @description Form for adding new Todo items.
 */
export default function TodoForm({ relativeTimes }) {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const onSubmit = async (formData) => {
    const todoItem = {
      username: "brandonv",
      todoId: uuidv4(),
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
